import { requireOpsReadContext } from "../../../../../server/dashboard-ops-read";
import { opsApprovalsResponseSchema } from "../../../../../server/ops-read-schemas";

export async function GET(request: Request) {
  const ctx = requireOpsReadContext(request);
  if (ctx instanceof Response) return ctx;

  const { supabase, limit } = ctx;
  const { data, error } = await supabase
    .from("approvals")
    .select("id, approval_type, status, requested_by, created_at, decision_reason")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[dashboard/ops/approvals GET]", error);
    return Response.json({ message: "Failed to load approvals (database error)." }, { status: 500 });
  }

  const parsed = opsApprovalsResponseSchema.safeParse({ approvals: data ?? [] });
  if (!parsed.success) {
    console.error("[dashboard/ops/approvals GET] schema mismatch", parsed.error.flatten());
    return Response.json(
      { message: "Approvals response did not match expected schema (check migrations vs app)." },
      { status: 500 }
    );
  }

  return Response.json(parsed.data);
}
