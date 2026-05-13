import { requireOpsReadContext } from "../../../../../server/dashboard-ops-read";
import { opsMissedRevenueResponseSchema } from "../../../../../server/ops-read-schemas";

export async function GET(request: Request) {
  const ctx = requireOpsReadContext(request);
  if (ctx instanceof Response) return ctx;

  const { supabase, limit } = ctx;
  const { data, error } = await supabase
    .from("missed_revenue_events")
    .select("id, event_type, severity, reason, estimated_value, recovered, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[dashboard/ops/missed-revenue GET]", error);
    return Response.json({ message: "Failed to load missed revenue events (database error)." }, { status: 500 });
  }

  const parsed = opsMissedRevenueResponseSchema.safeParse({ missed_revenue_events: data ?? [] });
  if (!parsed.success) {
    console.error("[dashboard/ops/missed-revenue GET] schema mismatch", parsed.error.flatten());
    return Response.json(
      { message: "Missed revenue response did not match expected schema (check migrations vs app)." },
      { status: 500 }
    );
  }

  return Response.json(parsed.data);
}
