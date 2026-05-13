import { requireOpsReadContext } from "../../../../../server/dashboard-ops-read";
import { opsTasksResponseSchema } from "../../../../../server/ops-read-schemas";

export async function GET(request: Request) {
  const ctx = requireOpsReadContext(request);
  if (ctx instanceof Response) return ctx;

  const { supabase, limit } = ctx;
  const { data, error } = await supabase
    .from("tasks")
    .select("id, title, status, priority, due_at, assigned_to")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[dashboard/ops/tasks GET]", error);
    return Response.json({ message: "Failed to load tasks (database error)." }, { status: 500 });
  }

  const parsed = opsTasksResponseSchema.safeParse({ tasks: data ?? [] });
  if (!parsed.success) {
    console.error("[dashboard/ops/tasks GET] schema mismatch", parsed.error.flatten());
    return Response.json(
      { message: "Tasks response did not match expected schema (check migrations vs app)." },
      { status: 500 }
    );
  }

  return Response.json(parsed.data);
}
