/**
 * Phase 3 real-write smoke (fake data only, simulate:false on CRM tools).
 * Loads my-app/.env.local via Vite loadEnv; probes dev server for POST /api/agents/run.
 */
import { Socket } from "node:net";
import { loadEnv } from "vite";
import { createClient } from "@supabase/supabase-js";

const mode = process.env.NODE_ENV || "development";
Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
process.env.NODE_ENV = "development";

const SMOKE = "phase3-real-write-smoke-test" as const;
const META = { test: SMOKE };

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

async function pickAgentsRunOrigin(port: number, opts: ProbeOpts): Promise<string | null> {
  const origins = [`http://127.0.0.1:${port}`, `http://localhost:${port}`, `http://[::1]:${port}`];
  const headers: Record<string, string> = { "Content-Type": "application/json", ...opts.authHeader };
  const body = JSON.stringify({ agent: "system.echo", input: { ping: "phase3_smoke_probe" }, tools: [] });
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
      /* next */
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
    const tcp = (await probePort("127.0.0.1", p)) || (await probePort("::1", p));
    if (!tcp) continue;
    const origin = await pickAgentsRunOrigin(p, opts);
    if (origin) return { port: p, base: origin };
  }
  return null;
}

type RunReport = {
  step: string;
  endpoint_ok: boolean;
  run_id: string | null;
  tool_name: string;
  table: string;
  record_id: string | null;
  agent_runs_status: string | null;
  tool_calls_count: number | null;
  errors: string[];
};

async function postRun(
  base: string,
  headers: Record<string, string>,
  body: Record<string, unknown>
): Promise<{ httpOk: boolean; json: unknown; text: string }> {
  const res = await fetch(`${base}/api/agents/run`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(120000),
  });
  const text = await res.text();
  let json: unknown;
  try {
    json = JSON.parse(text) as unknown;
  } catch {
    json = null;
  }
  return { httpOk: res.ok, json, text: text.slice(0, 4000) };
}

function isSuccessBody(j: unknown): j is {
  ok: true;
  run_id: string;
  output: Record<string, unknown>;
  tool_calls: { id: string; tool_name: string; status: string }[];
} {
  return (
    !!j &&
    typeof j === "object" &&
    (j as { ok?: unknown }).ok === true &&
    typeof (j as { run_id?: unknown }).run_id === "string"
  );
}

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  const secret = process.env.AGENT_OS_RUN_SECRET?.trim();

  const authPrep: ProbeOpts = {
    authHeader: secret ? { Authorization: `Bearer ${secret}` } : {},
  };
  const picked = await pickDevBase(authPrep);
  if (picked == null) {
    console.error("No dev server with working POST /api/agents/run. Start `npm run dev` from my-app.");
    process.exit(2);
  }
  const { base } = picked;
  console.log(`Detected dev base: ${base}`);

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (secret) headers.Authorization = `Bearer ${secret}`;

  const sb =
    url && key
      ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
      : null;

  async function dbFollowup(runId: string | null): Promise<{ status: string | null; tc: number | null; errs: string[] }> {
    const errs: string[] = [];
    if (!sb || !runId || !/^[0-9a-f-]{36}$/i.test(runId)) {
      if (sb && runId) errs.push("invalid_run_id_for_db");
      return { status: null, tc: null, errs };
    }
    const { data: row, error: e1 } = await sb.from("agent_runs").select("status").eq("id", runId).single();
    if (e1) errs.push(`agent_runs:${e1.code ?? e1.message}`);
    const { count, error: e2 } = await sb
      .from("tool_calls")
      .select("id", { count: "exact", head: true })
      .eq("agent_run_id", runId);
    if (e2) errs.push(`tool_calls:${e2.code ?? e2.message}`);
    return { status: (row as { status?: string } | null)?.status ?? null, tc: count ?? 0, errs };
  }

  const reports: RunReport[] = [];
  let leadId: string | null = null;
  let bookingId: string | null = null;

  // 1) saveLead
  {
    const body = {
      agent: "employee.intake",
      input: {},
      lead_id: null,
      metadata: META,
      tools: [
        {
          name: "saveLead",
          input: {
            simulate: false,
            email: "phase3.test@example.com",
            phone: "+15555550123",
            name: "Test Lead Phase Three",
            business_name: "Phase Three Test Dental",
            service_interest: "AI receptionist",
            message: "This is a fake smoke test lead.",
            source: "employee.intake",
            metadata: {
              ...META,
            },
          },
        },
      ],
    };
    const { httpOk, json } = await postRun(base, headers, body);
    const runId = typeof json === "object" && json && "run_id" in json ? String((json as { run_id: unknown }).run_id) : null;
    const db = await dbFollowup(runId);
    const errs = [...db.errs];
    let recordId: string | null = null;
    let endpointOk = httpOk && isSuccessBody(json);
    if (isSuccessBody(json)) {
      const save = (json.output as { saveLead?: { lead_id?: string } }).saveLead;
      recordId = save?.lead_id ?? null;
      leadId = recordId;
    } else {
      errs.push("response_not_success");
      if (json && typeof json === "object" && "error" in json) errs.push(JSON.stringify((json as { error: unknown }).error));
    }
    reports.push({
      step: "1 intake",
      endpoint_ok: !!endpointOk,
      run_id: runId,
      tool_name: "saveLead",
      table: "leads",
      record_id: recordId,
      agent_runs_status: db.status,
      tool_calls_count: db.tc,
      errors: errs,
    });
  }

  if (!leadId) {
    console.log(JSON.stringify({ aborted: true, reports }, null, 2));
    process.exit(1);
  }

  // 2) qualifyLead
  {
    const body = {
      agent: "employee.qualifier",
      input: {},
      lead_id: leadId,
      metadata: META,
      tools: [
        {
          name: "qualifyLead",
          input: {
            simulate: false,
            recommended_lead_status: "qualified",
            rationale: "Phase 3 real-write smoke — fake lead only; no external actions.",
            qualification_result_text: "Smoke test qualification summary (fake data).",
            fit_label: "warm",
          },
        },
      ],
    };
    const { httpOk, json } = await postRun(base, headers, body);
    const runId = typeof json === "object" && json && "run_id" in json ? String((json as { run_id: unknown }).run_id) : null;
    const db = await dbFollowup(runId);
    const errs = [...db.errs];
    const endpointOk = httpOk && isSuccessBody(json);
    if (!endpointOk && json && typeof json === "object" && "error" in json)
      errs.push(JSON.stringify((json as { error: unknown }).error));
    if (!endpointOk) errs.push("response_not_success");
    reports.push({
      step: "2 qualifier",
      endpoint_ok: endpointOk,
      run_id: runId,
      tool_name: "qualifyLead",
      table: "leads (updated)",
      record_id: leadId,
      agent_runs_status: db.status,
      tool_calls_count: db.tc,
      errors: endpointOk ? db.errs : errs,
    });
  }

  // 3) createBookingIntent
  {
    const body = {
      agent: "employee.booking",
      input: {},
      lead_id: leadId,
      metadata: META,
      tools: [
        {
          name: "createBookingIntent",
          input: {
            simulate: false,
            metadata: META,
            notes: "Phase 3 smoke — intent row only; no external calendar.",
          },
        },
      ],
    };
    const { httpOk, json } = await postRun(base, headers, body);
    const runId = typeof json === "object" && json && "run_id" in json ? String((json as { run_id: unknown }).run_id) : null;
    const db = await dbFollowup(runId);
    const errs = [...db.errs];
    let recordId: string | null = null;
    let endpointOk = httpOk && isSuccessBody(json);
    if (isSuccessBody(json)) {
      const b = (json.output as { createBookingIntent?: { booking_id?: string } }).createBookingIntent;
      recordId = b?.booking_id ?? null;
      bookingId = recordId;
    } else {
      errs.push("response_not_success");
      if (json && typeof json === "object" && "error" in json) errs.push(JSON.stringify((json as { error: unknown }).error));
    }
    reports.push({
      step: "3 booking",
      endpoint_ok: !!endpointOk,
      run_id: runId,
      tool_name: "createBookingIntent",
      table: "bookings",
      record_id: recordId,
      agent_runs_status: db.status,
      tool_calls_count: db.tc,
      errors: errs,
    });
  }

  // 4) draftFollowUp
  {
    const body = {
      agent: "employee.follow_up",
      input: {},
      lead_id: leadId,
      metadata: META,
      tools: [
        {
          name: "draftFollowUp",
          input: {
            simulate: false,
            metadata: META,
            subject: "Phase 3 smoke — follow-up draft (no send)",
            body: "This is a fake draft body for the Phase 3 real-write smoke test. No message was sent.",
            channel_suggestion: "email",
            urgency: "low",
          },
        },
      ],
    };
    const { httpOk, json } = await postRun(base, headers, body);
    const runId = typeof json === "object" && json && "run_id" in json ? String((json as { run_id: unknown }).run_id) : null;
    const db = await dbFollowup(runId);
    const errs = [...db.errs];
    let recordId: string | null = null;
    let endpointOk = httpOk && isSuccessBody(json);
    if (isSuccessBody(json)) {
      const t = (json.output as { draftFollowUp?: { task_id?: string } }).draftFollowUp;
      recordId = t?.task_id ?? null;
    } else {
      errs.push("response_not_success");
      if (json && typeof json === "object" && "error" in json) errs.push(JSON.stringify((json as { error: unknown }).error));
    }
    reports.push({
      step: "4 follow_up",
      endpoint_ok: !!endpointOk,
      run_id: runId,
      tool_name: "draftFollowUp",
      table: "tasks",
      record_id: recordId,
      agent_runs_status: db.status,
      tool_calls_count: db.tc,
      errors: errs,
    });
  }

  // 5) sendOwnerAlert
  {
    const body = {
      agent: "employee.handoff",
      input: {},
      lead_id: leadId,
      metadata: META,
      tools: [
        {
          name: "sendOwnerAlert",
          input: {
            simulate: false,
            headline: "Phase 3 smoke owner alert (no delivery)",
            summary: "Fake smoke test — approval row only; no email or SMS sent.",
            urgency: "low",
            drafted_notice: "This is a test handoff draft. No outbound delivery.",
            metadata_patch: META,
          },
        },
      ],
    };
    const { httpOk, json } = await postRun(base, headers, body);
    const runId = typeof json === "object" && json && "run_id" in json ? String((json as { run_id: unknown }).run_id) : null;
    const db = await dbFollowup(runId);
    const errs = [...db.errs];
    let recordId: string | null = null;
    let endpointOk = httpOk && isSuccessBody(json);
    if (isSuccessBody(json)) {
      const a = (json.output as { sendOwnerAlert?: { approval_id?: string } }).sendOwnerAlert;
      recordId = a?.approval_id ?? null;
    } else {
      errs.push("response_not_success");
      if (json && typeof json === "object" && "error" in json) errs.push(JSON.stringify((json as { error: unknown }).error));
    }
    reports.push({
      step: "5 handoff",
      endpoint_ok: !!endpointOk,
      run_id: runId,
      tool_name: "sendOwnerAlert",
      table: "approvals",
      record_id: recordId,
      agent_runs_status: db.status,
      tool_calls_count: db.tc,
      errors: errs,
    });
  }

  // 6) logMissedRevenue via system.echo
  {
    const body = {
      agent: "system.echo",
      input: { note: "phase3 real-write smoke" },
      lead_id: leadId,
      metadata: META,
      tools: [
        {
          name: "logMissedRevenue",
          input: {
            simulate: false,
            event_type: "abandoned_chat",
            severity: "medium",
            reason: "Phase 3 smoke — synthetic missed-revenue log; not a real funnel event.",
            metadata: META,
            ...(bookingId ? { booking_id: bookingId } : {}),
          },
        },
      ],
    };
    const { httpOk, json } = await postRun(base, headers, body);
    const runId = typeof json === "object" && json && "run_id" in json ? String((json as { run_id: unknown }).run_id) : null;
    const db = await dbFollowup(runId);
    const errs = [...db.errs];
    let recordId: string | null = null;
    let endpointOk = httpOk && isSuccessBody(json);
    if (isSuccessBody(json)) {
      const tr = (json.output as { tool_results?: { tool: string; output: { missed_revenue_event_id?: string } }[] })
        .tool_results;
      const hit = tr?.find((x) => x.tool === "logMissedRevenue");
      recordId = hit?.output?.missed_revenue_event_id ?? null;
    } else {
      errs.push("response_not_success");
      if (json && typeof json === "object" && "error" in json) errs.push(JSON.stringify((json as { error: unknown }).error));
    }
    reports.push({
      step: "6 echo",
      endpoint_ok: !!endpointOk,
      run_id: runId,
      tool_name: "logMissedRevenue",
      table: "missed_revenue_events",
      record_id: recordId,
      agent_runs_status: db.status,
      tool_calls_count: db.tc,
      errors: errs,
    });
  }

  const runIds = reports.map((r) => r.run_id).filter(Boolean) as string[];
  const allGreen = reports.every((r) => r.endpoint_ok && r.errors.length === 0);

  console.log(JSON.stringify({ dev_base: base, reports, summary: { allGreen, run_ids: runIds, lead_id: leadId, booking_id: bookingId } }, null, 2));
  process.exit(allGreen ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
