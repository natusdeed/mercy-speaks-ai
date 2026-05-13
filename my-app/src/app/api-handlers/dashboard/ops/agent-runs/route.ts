import { requireOpsReadContext } from "../../../../../server/dashboard-ops-read";
import { opsAgentRunsResponseSchema } from "../../../../../server/ops-read-schemas";

export async function GET(request: Request) {
  const ctx = requireOpsReadContext(request);
  if (ctx instanceof Response) return ctx;

  const { supabase, limit } = ctx;
  const { data, error } = await supabase
    .from("agent_runs")
    .select("id, agent_name, status, trigger_source, started_at, duration_ms")
    .order("started_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[dashboard/ops/agent-runs GET]", error);
    return Response.json({ message: "Failed to load agent runs (database error)." }, { status: 500 });
  }

  const parsed = opsAgentRunsResponseSchema.safeParse({ agent_runs: data ?? [] });
  if (!parsed.success) {
    console.error("[dashboard/ops/agent-runs GET] schema mismatch", parsed.error.flatten());
    return Response.json(
      { message: "Agent runs response did not match expected schema (check migrations vs app)." },
      { status: 500 }
    );
  }

  return Response.json(parsed.data);
}
