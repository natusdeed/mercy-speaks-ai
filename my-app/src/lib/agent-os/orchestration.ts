import type { SupabaseClient } from "@supabase/supabase-js";
import { ZodError } from "zod";
import { getDashboardSupabase } from "@/server/supabase-dashboard";
import { getRegisteredAgent } from "./agent-registry";
import {
  agentOrchestrationRequestSchema,
  agentOrchestrationResponseBodySchema,
  type AgentOrchestrationRequest,
} from "./schemas";
import { getToolDefinition } from "./tool-registry";
import type { AgentToolAmbientContext } from "./tool-executor-types";
import type { JsonObject } from "./types";
import type { AgentRunStatus, ToolCallStatus } from "./enums";

type ToolRefs = Omit<AgentToolAmbientContext, "agent_run_id">;

type ToolCallSummary = {
  id: string;
  tool_name: string;
  status: ToolCallStatus;
  response: JsonObject;
  error_message?: string | null;
};

function assertAgentOsAuthorized(request: Request): Response | null {
  const isProd = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
  const secret = process.env.AGENT_OS_RUN_SECRET?.trim();
  if (isProd && !secret) {
    return jsonResponse(
      {
        ok: false,
        error: {
          code: "NOT_CONFIGURED",
          message:
            "Agent orchestration is not configured (set AGENT_OS_RUN_SECRET in production).",
        },
      },
      503
    );
  }
  if (secret) {
    const auth = request.headers.get("authorization")?.trim();
    if (auth !== `Bearer ${secret}`) {
      return jsonResponse(
        {
          ok: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Invalid or missing Authorization bearer token.",
          },
        },
        401
      );
    }
  }
  return null;
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function safeErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message.slice(0, 2000);
  return "Unexpected error";
}

async function readJsonBody(request: Request): Promise<unknown> {
  try {
    const text = await request.text();
    if (!text.trim()) return {};
    return JSON.parse(text) as unknown;
  } catch {
    throw new Error("INVALID_JSON");
  }
}

async function insertAgentRun(
  supabase: SupabaseClient,
  payload: AgentOrchestrationRequest,
  agentVersion: string | null
): Promise<{ id: string; started_at: string }> {
  const row = {
    organization_id: payload.organization_id ?? null,
    lead_id: payload.lead_id ?? null,
    conversation_id: payload.conversation_id ?? null,
    parent_run_id: payload.parent_run_id ?? null,
    agent_name: payload.agent,
    agent_version: payload.agent_version ?? agentVersion,
    trigger_source: "api" as const,
    input_payload: payload.input as JsonObject,
    output_payload: {} as JsonObject,
    status: "running" as AgentRunStatus,
    metadata: (payload.metadata ?? {}) as JsonObject,
  };

  const { data, error } = await supabase.from("agent_runs").insert(row).select("id, started_at").single();

  if (error || !data) {
    console.error("[agent-os] agent_runs insert failed", error);
    throw new Error("DB_AGENT_RUN_INSERT_FAILED");
  }

  return { id: data.id as string, started_at: data.started_at as string };
}

async function finalizeAgentRun(
  supabase: SupabaseClient,
  runId: string,
  patch: {
    status: AgentRunStatus;
    output_payload: JsonObject;
    error_code?: string | null;
    error_message?: string | null;
    startedAt: string;
  }
): Promise<number> {
  const completedAt = new Date().toISOString();
  const duration_ms = Math.max(0, Date.now() - Date.parse(patch.startedAt));

  const { error } = await supabase
    .from("agent_runs")
    .update({
      status: patch.status,
      output_payload: patch.output_payload,
      error_code: patch.error_code ?? null,
      error_message: patch.error_message ?? null,
      completed_at: completedAt,
      duration_ms,
    })
    .eq("id", runId);

  if (error) {
    console.error("[agent-os] agent_runs finalize failed", error);
  }

  return duration_ms;
}

async function insertToolCallRow(
  supabase: SupabaseClient,
  args: {
    agent_run_id: string;
    tool_name: string;
    tool_version: string | null;
    request_payload: JsonObject;
    response_payload: JsonObject;
    status: ToolCallStatus;
    error_message?: string | null;
    started_at: string;
    completed_at: string | null;
    duration_ms: number | null;
  }
): Promise<string | null> {
  const { data, error } = await supabase
    .from("tool_calls")
    .insert({
      agent_run_id: args.agent_run_id,
      tool_name: args.tool_name,
      tool_version: args.tool_version,
      request_payload: args.request_payload,
      response_payload: args.response_payload,
      status: args.status,
      error_message: args.error_message ?? null,
      started_at: args.started_at,
      completed_at: args.completed_at,
      duration_ms: args.duration_ms,
      requires_approval: false,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[agent-os] tool_calls insert failed", error);
    return null;
  }
  return data.id as string;
}

async function executeToolsForRun(
  supabase: SupabaseClient,
  runId: string,
  tools: AgentOrchestrationRequest["tools"],
  refs: ToolRefs
): Promise<{ summaries: ToolCallSummary[]; abortedReason: string | null }> {
  const summaries: ToolCallSummary[] = [];
  const list = tools ?? [];

  const ambientBase: AgentToolAmbientContext = {
    organization_id: refs.organization_id,
    lead_id: refs.lead_id,
    conversation_id: refs.conversation_id,
    agent_run_id: runId,
  };

  for (const spec of list) {
    const t0 = Date.now();
    const startedAt = new Date().toISOString();
    const def = getToolDefinition(spec.name);

    if (!def) {
      const rowId = await insertToolCallRow(supabase, {
        agent_run_id: runId,
        tool_name: spec.name,
        tool_version: null,
        request_payload: spec.input as JsonObject,
        response_payload: {},
        status: "failed",
        error_message: `Unknown tool: ${spec.name}`,
        started_at: startedAt,
        completed_at: new Date().toISOString(),
        duration_ms: Date.now() - t0,
      });
      if (!rowId) {
        return {
          summaries,
          abortedReason: `Failed to log unknown tool "${spec.name}" (database error).`,
        };
      }
      summaries.push({
        id: rowId,
        tool_name: spec.name,
        status: "failed",
        response: {},
        error_message: `Unknown tool: ${spec.name}`,
      });
      return {
        summaries,
        abortedReason: `Unknown tool "${spec.name}" — see tool_calls row for this run.`,
      };
    }

    try {
      const output = await def.execute(spec.input as JsonObject, ambientBase);
      const id = await insertToolCallRow(supabase, {
        agent_run_id: runId,
        tool_name: spec.name,
        tool_version: def.version,
        request_payload: spec.input as JsonObject,
        response_payload: output,
        status: "success",
        started_at: startedAt,
        completed_at: new Date().toISOString(),
        duration_ms: Date.now() - t0,
      });
      if (!id) {
        return {
          summaries,
          abortedReason: `Failed to log tool "${spec.name}" success row (database error).`,
        };
      }

      summaries.push({
        id,
        tool_name: spec.name,
        status: "success",
        response: output,
      });
    } catch (e) {
      const msg = safeErrorMessage(e);
      const id = await insertToolCallRow(supabase, {
        agent_run_id: runId,
        tool_name: spec.name,
        tool_version: def.version,
        request_payload: spec.input as JsonObject,
        response_payload: {},
        status: "failed",
        error_message: msg,
        started_at: startedAt,
        completed_at: new Date().toISOString(),
        duration_ms: Date.now() - t0,
      });
      if (!id) {
        return {
          summaries,
          abortedReason: `Tool "${spec.name}" failed and could not be logged (database error).`,
        };
      }

      summaries.push({
        id,
        tool_name: spec.name,
        status: "failed",
        response: {},
        error_message: msg,
      });
      return { summaries, abortedReason: `Tool "${spec.name}" failed: ${msg}` };
    }
  }

  return { summaries, abortedReason: null };
}

async function logSkippedMockTools(
  supabase: SupabaseClient,
  runId: string,
  names: string[]
): Promise<void> {
  const now = new Date().toISOString();
  for (const name of names) {
    await insertToolCallRow(supabase, {
      agent_run_id: runId,
      tool_name: name,
      tool_version: null,
      request_payload: {},
      response_payload: { skipped: true, note: "declared mock tool — not executed in Phase 2" },
      status: "skipped",
      started_at: now,
      completed_at: now,
      duration_ms: 0,
    });
  }
}

export async function runAgentOrchestration(request: Request): Promise<Response> {
  const authFail = assertAgentOsAuthorized(request);
  if (authFail) return authFail;

  const supabase = getDashboardSupabase();
  if (!supabase) {
    return jsonResponse(
      {
        ok: false,
        error: {
          code: "NOT_CONFIGURED",
          message: "Database client unavailable (set SUPABASE_URL and SUPABASE_SERVICE_KEY).",
        },
      },
      503
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await readJsonBody(request);
  } catch {
    return jsonResponse(
      {
        ok: false,
        error: { code: "BAD_REQUEST", message: "Request body must be valid JSON." },
      },
      400
    );
  }

  let parsed: AgentOrchestrationRequest;
  try {
    parsed = agentOrchestrationRequestSchema.parse(rawBody);
  } catch (e) {
    if (e instanceof ZodError) {
      return jsonResponse(
        {
          ok: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Request validation failed.",
            details: e.flatten(),
          },
        },
        400
      );
    }
    return jsonResponse(
      { ok: false, error: { code: "VALIDATION_ERROR", message: "Invalid request." } },
      400
    );
  }

  const definition = getRegisteredAgent(parsed.agent);
  const agentVersion = definition?.version ?? null;

  let runId: string;
  let startedAt: string;
  try {
    const row = await insertAgentRun(supabase, parsed, agentVersion);
    runId = row.id;
    startedAt = row.started_at;
  } catch {
    return jsonResponse(
      {
        ok: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Could not create agent run (check migrations and credentials).",
        },
      },
      503
    );
  }

  if (!definition) {
    await finalizeAgentRun(supabase, runId, {
      status: "failed",
      output_payload: {},
      error_code: "AGENT_NOT_REGISTERED",
      error_message: `Unknown agent: ${parsed.agent}`,
      startedAt: startedAt,
    });
    const body = {
      ok: false as const,
      run_id: runId,
      error: {
        code: "AGENT_NOT_REGISTERED",
        message: `Agent "${parsed.agent}" is not registered.`,
      },
    };
    const parsedOut = agentOrchestrationResponseBodySchema.safeParse(body);
    return jsonResponse(parsedOut.success ? parsedOut.data : body, 200);
  }

  try {
    const toolExec = await executeToolsForRun(supabase, runId, parsed.tools, {
      organization_id: parsed.organization_id ?? undefined,
      lead_id: parsed.lead_id ?? undefined,
      conversation_id: parsed.conversation_id ?? undefined,
    });
    if (toolExec.abortedReason) {
      await finalizeAgentRun(supabase, runId, {
        status: "failed",
        output_payload: { tool_calls: toolExec.summaries },
        error_code: "TOOL_EXECUTION_FAILED",
        error_message: toolExec.abortedReason,
        startedAt: startedAt,
      });
      const body = {
        ok: false as const,
        run_id: runId,
        error: {
          code: "TOOL_EXECUTION_FAILED",
          message: toolExec.abortedReason,
        },
      };
      const parsedOut = agentOrchestrationResponseBodySchema.safeParse(body);
      return jsonResponse(parsedOut.success ? parsedOut.data : body, 200);
    }

    const toolResults = toolExec.summaries
      .filter((t) => t.status === "success")
      .map((t) => ({ tool: t.tool_name, output: t.response }));

    if (definition.plannedMockTools?.length) {
      await logSkippedMockTools(supabase, runId, definition.plannedMockTools);
    }

    const output = await definition.run({
      input: parsed.input as JsonObject,
      toolResults,
      metadata: (parsed.metadata ?? {}) as JsonObject,
    });

    const duration_ms = await finalizeAgentRun(supabase, runId, {
      status: "success",
      output_payload: output,
      startedAt: startedAt,
    });

    const completedAt = new Date().toISOString();

    const successBody = {
      ok: true as const,
      run_id: runId,
      agent: parsed.agent,
      status: "success" as AgentRunStatus,
      output,
      tool_calls: toolExec.summaries.map((t) => ({
        id: t.id,
        tool_name: t.tool_name,
        status: t.status,
        response: t.response,
        error_message: t.error_message ?? null,
      })),
      meta: {
        duration_ms,
        started_at: startedAt,
        completed_at: completedAt,
      },
    };

    const validated = agentOrchestrationResponseBodySchema.safeParse(successBody);
    return jsonResponse(validated.success ? validated.data : successBody, 200);
  } catch (e) {
    const msg = safeErrorMessage(e);
    await finalizeAgentRun(supabase, runId, {
      status: "failed",
      output_payload: {},
      error_code: "AGENT_EXECUTION_FAILED",
      error_message: msg,
      startedAt: startedAt,
    });

    const body = {
      ok: false as const,
      run_id: runId,
      error: {
        code: "AGENT_EXECUTION_FAILED",
        message: msg,
      },
    };
    const parsedOut = agentOrchestrationResponseBodySchema.safeParse(body);
    return jsonResponse(parsedOut.success ? parsedOut.data : body, 200);
  }
}
