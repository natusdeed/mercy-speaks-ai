/**
 * One-shot Phase 3 simulate verification (reads my-app/.env.local via Vite loadEnv).
 * Safe: uses simulate:true on CRM tools only; emits no secrets.
 */
import { Socket } from "node:net";
import { loadEnv } from "vite";
import { createClient } from "@supabase/supabase-js";
import { agentOrchestrationResponseBodySchema } from "../src/lib/agent-os/schemas";

const mode = process.env.NODE_ENV || "development";
Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

process.env.NODE_ENV = "development";

function probePort(host: string, port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const s = new Socket();
    s.setTimeout(500);
    s.once("connect", () => {
      s.destroy();
      resolve(true);
    });
    s.once("timeout", () => {
      s.destroy();
      resolve(false);
    });
    s.once("error", () => {
      s.destroy();
      resolve(false);
    });
    s.connect(port, host);
  });
}

type ProbeOpts = { authHeader: Record<string, string> };

async function pickAgentsRunOrigin(
  port: number,
  opts: ProbeOpts
): Promise<string | null> {
  const origins = [
    `http://127.0.0.1:${port}`,
    `http://localhost:${port}`,
    `http://[::1]:${port}`,
  ];
  const headers: Record<string, string> = { "Content-Type": "application/json", ...opts.authHeader };
  const body = JSON.stringify({ agent: "system.echo", input: { ping: "phase3_port_probe" }, tools: [] });
  for (const o of origins) {
    try {
      const res = await fetch(`${o}/api/agents/run`, {
        method: "POST",
        headers,
        body,
        signal: AbortSignal.timeout(15000),
      });
      const text = await res.text();
      let j: unknown;
      try {
        j = JSON.parse(text) as unknown;
      } catch {
        continue;
      }
      if (!j || typeof j !== "object") continue;
      const rec = j as { ok?: unknown; run_id?: unknown };
      const okProbe =
        typeof rec.run_id === "string" &&
        /^[0-9a-f-]{36}$/i.test(rec.run_id) &&
        (rec.ok === true || rec.ok === false);
      if (okProbe && res.ok) return o;
    } catch {
      /* try next */
    }
  }
  return null;
}

async function pickDevBase(opts: ProbeOpts): Promise<{ port: number; base: string } | null> {
  const raw = process.env.VITE_DEV_PORT;
  const prioritized: number[] = [];
  if (raw && /^\d+$/.test(raw)) {
    const p = Number(raw);
    if (p > 0 && p < 65536 && p !== 3001) prioritized.push(p);
  }
  for (const p of [3000, 3020, 3030, 5173, 5174, 8080]) {
    if (!prioritized.includes(p) && p !== 3001) prioritized.push(p);
  }
  for (const p of prioritized) {
    const tcp =
      (await probePort("127.0.0.1", p)) || (await probePort("::1", p));
    if (!tcp) continue;
    const origin = await pickAgentsRunOrigin(p, opts);
    if (origin) return { port: p, base: origin };
  }
  return null;
}

async function tableExists(sb: ReturnType<typeof createClient>, name: string): Promise<boolean | "unknown"> {
  const { error } = await sb.from(name).select("id", { head: true, count: "exact" });
  if (!error) return true;
  const msg = `${error.code ?? ""} ${error.message ?? ""}`;
  if (error.code === "PGRST205" || /Could not find the table/i.test(msg)) return false;
  return "unknown";
}

type CaseDef = {
  label: string;
  agent: string;
  tools: { name: string; input: Record<string, unknown> }[];
  input?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
};

const CASES: CaseDef[] = [
  {
    label: "employee.intake / saveLead",
    agent: "employee.intake",
    tools: [
      {
        name: "saveLead",
        input: {
          email: "phase3-verify@example.com",
          phone: "555-0100",
          simulate: true,
        },
      },
    ],
    metadata: { phase: "3_verify", case: "intake" },
  },
  {
    label: "employee.qualifier / qualifyLead",
    agent: "employee.qualifier",
    tools: [
      {
        name: "qualifyLead",
        input: {
          simulate: true,
          recommended_lead_status: "qualified",
          rationale: "Phase 3 live verify — simulate path only.",
          qualification_result_text: "Validated qualification summary for dry run.",
          fit_label: "warm",
        },
      },
    ],
    metadata: { phase: "3_verify", case: "qualifier" },
  },
  {
    label: "employee.booking / createBookingIntent",
    agent: "employee.booking",
    tools: [{ name: "createBookingIntent", input: { simulate: true } }],
    metadata: { phase: "3_verify", case: "booking" },
  },
  {
    label: "employee.follow_up / draftFollowUp",
    agent: "employee.follow_up",
    tools: [
      {
        name: "draftFollowUp",
        input: {
          simulate: true,
          subject: "Phase 3 verify — follow-up draft",
          body: "This is a simulate-only follow-up body for orchestration verification (no send).",
        },
      },
    ],
    metadata: { phase: "3_verify", case: "follow_up" },
  },
  {
    label: "employee.handoff / sendOwnerAlert",
    agent: "employee.handoff",
    tools: [
      {
        name: "sendOwnerAlert",
        input: {
          simulate: true,
          headline: "Phase 3 verify handoff",
          summary: "Simulated owner alert — no delivery attempted.",
          urgency: "high",
          drafted_notice: "Please review when convenient; this was a dry run.",
        },
      },
    ],
    metadata: { phase: "3_verify", case: "handoff" },
  },
  {
    label: "system.echo / logMissedRevenue",
    agent: "system.echo",
    input: { note: "phase3 verify echo" },
    tools: [
      {
        name: "logMissedRevenue",
        input: {
          simulate: true,
          event_type: "abandoned_chat",
          severity: "medium",
          reason: "Simulated missed-revenue log for Phase 3 verification only.",
        },
      },
    ],
    metadata: { phase: "3_verify", case: "echo_log_missed" },
  },
];

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  const secret = process.env.AGENT_OS_RUN_SECRET?.trim();

  const tables = [
    "leads",
    "conversations",
    "bookings",
    "tasks",
    "approvals",
    "missed_revenue_events",
    "organizations",
    "agent_runs",
    "tool_calls",
  ];

  console.log("--- DB table presence (SELECT/head via PostgREST) ---");
  if (!url || !key) {
    console.log("SKIP: SUPABASE_URL or SUPABASE_SERVICE_KEY missing in env");
  } else {
    const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    for (const t of tables) {
      const ex = await tableExists(sb, t);
      console.log(`${t}: ${ex === true ? "exists" : ex === false ? "missing_or_not_exposed" : "unknown_error"}`);
    }
  }

  const authPrep: ProbeOpts = {
    authHeader: secret ? { Authorization: `Bearer ${secret}` } : {},
  };
  const picked = await pickDevBase(authPrep);
  if (picked == null) {
    console.log("\nERROR: No dev server exposes working POST /api/agents/run (start `npm run dev` from my-app; check AGENT_OS_RUN_SECRET).");
    process.exit(2);
  }
  const { base } = picked;
  console.log(`\nDetected dev base: ${base}`);

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (secret) headers.Authorization = `Bearer ${secret}`;

  console.log("\n--- POST /api/agents/run (simulate tools) ---");
  const results: {
    label: string;
    httpOk: boolean;
    responseOk?: boolean;
    runId?: string;
    dbStatus?: string | null;
    toolCallCount?: number;
    toolName: string;
    zodValid: boolean;
    errors: string[];
  }[] = [];

  const sb =
    url && key
      ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
      : null;

  for (const c of CASES) {
    const body = {
      agent: c.agent,
      input: c.input ?? {},
      tools: c.tools,
      metadata: c.metadata ?? {},
    };
    const toolName = c.tools[0]?.name ?? "(none)";
    const errors: string[] = [];

    let httpOkFlag = false;
    let parsedJson: unknown;
    try {
      const res = await fetch(`${base}/api/agents/run`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(60000),
      });
      httpOkFlag = res.ok;
      const text = await res.text();
      try {
        parsedJson = JSON.parse(text) as unknown;
      } catch {
        errors.push("response_not_json");
        parsedJson = null;
      }
    } catch (e) {
      errors.push(`fetch_error:${e instanceof Error ? e.message : String(e)}`);
      results.push({
        label: c.label,
        httpOk: false,
        toolName,
        zodValid: false,
        errors,
      });
      continue;
    }

    const zod = agentOrchestrationResponseBodySchema.safeParse(parsedJson);
    const zodValid = zod.success;

    const runId =
      parsedJson && typeof parsedJson === "object" && "run_id" in parsedJson
        ? String((parsedJson as { run_id?: unknown }).run_id ?? "")
        : "";
    const responseOk =
      parsedJson &&
      typeof parsedJson === "object" &&
      "ok" in parsedJson &&
      (parsedJson as { ok: unknown }).ok === true;

    if (!zodValid && zod.success === false) {
      errors.push("response_body_failed_agentOrchestrationResponseBodySchema");
    }

    let dbStatus: string | null | undefined;
    let toolCallCount: number | undefined;
    if (sb && runId && /^[0-9a-f-]{36}$/i.test(runId)) {
      const { data: row, error: er1 } = await sb.from("agent_runs").select("status").eq("id", runId).single();
      if (er1) errors.push(`agent_runs_lookup:${er1.code ?? er1.message}`);
      else dbStatus = (row as { status?: string } | null)?.status ?? null;

      const { count, error: er2 } = await sb
        .from("tool_calls")
        .select("id", { count: "exact", head: true })
        .eq("agent_run_id", runId);
      if (er2) errors.push(`tool_calls_count:${er2.code ?? er2.message}`);
      else toolCallCount = count ?? 0;
    } else if (sb) {
      errors.push("missing_or_invalid_run_id_for_db_followup");
    }

    results.push({
      label: c.label,
      httpOk: httpOkFlag,
      responseOk: !!responseOk,
      runId: runId || undefined,
      dbStatus,
      toolCallCount,
      toolName,
      zodValid,
      errors,
    });
  }

  for (const r of results) {
    console.log(
      JSON.stringify({
        case: r.label,
        endpoint_http_ok: r.httpOk,
        response_ok_true: r.responseOk,
        run_id: r.runId,
        agent_runs_status: r.dbStatus,
        tool_calls_count: r.toolCallCount,
        tool_tested: r.toolName,
        payload_validates_zod: r.zodValid,
        errors: r.errors,
      })
    );
  }

  const allGreen =
    results.length === CASES.length &&
    results.every((r) => r.httpOk && r.responseOk && r.zodValid && (r.toolCallCount ?? 0) >= 1 && !r.errors.length);

  console.log(
    `\nPhase 3 simulate verification summary: ${allGreen ? "ALL_CHECKS_PASSED" : "SOME_CHECKS_FAILED"}`
  );
  process.exit(allGreen ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
