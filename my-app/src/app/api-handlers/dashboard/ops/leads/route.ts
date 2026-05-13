import { requireOpsReadContext } from "../../../../../server/dashboard-ops-read";
import { opsLeadsResponseSchema } from "../../../../../server/ops-read-schemas";

export async function GET(request: Request) {
  const ctx = requireOpsReadContext(request);
  if (ctx instanceof Response) return ctx;

  const { supabase, limit } = ctx;
  const { data, error } = await supabase
    .from("leads")
    .select("id, name, email, source, status, service, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[dashboard/ops/leads GET]", error);
    return Response.json({ message: "Failed to load leads (database error)." }, { status: 500 });
  }

  const leads = (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    source: row.source,
    status: row.status,
    service_interest: row.service ?? null,
    created_at: row.created_at,
  }));

  const parsed = opsLeadsResponseSchema.safeParse({ leads });
  if (!parsed.success) {
    console.error("[dashboard/ops/leads GET] schema mismatch", parsed.error.flatten());
    return Response.json(
      { message: "Leads response did not match expected schema (check migrations vs app)." },
      { status: 500 }
    );
  }

  return Response.json(parsed.data);
}
