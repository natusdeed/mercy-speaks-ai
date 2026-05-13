import { requireOpsReadContext } from "../../../../../server/dashboard-ops-read";
import { opsToolCallsResponseSchema } from "../../../../../server/ops-read-schemas";

export async function GET(request: Request) {
  const ctx = requireOpsReadContext(request);
  if (ctx instanceof Response) return ctx;

  const { supabase, limit } = ctx;
  const { data, error } = await supabase
    .from("tool_calls")
    .select("id, tool_name, status, agent_run_id, started_at, duration_ms")
    .order("started_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[dashboard/ops/tool-calls GET]", error);
    return Response.json({ message: "Failed to load tool calls (database error)." }, { status: 500 });
  }

  const parsed = opsToolCallsResponseSchema.safeParse({ tool_calls: data ?? [] });
  if (!parsed.success) {
    console.error("[dashboard/ops/tool-calls GET] schema mismatch", parsed.error.flatten());
    return Response.json(
      { message: "Tool calls response did not match expected schema (check migrations vs app)." },
      { status: 500 }
    );
  }

  return Response.json(parsed.data);
}
