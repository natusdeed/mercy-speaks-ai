import { requireOpsReadContext } from "../../../../../server/dashboard-ops-read";
import { opsBookingsResponseSchema } from "../../../../../server/ops-read-schemas";

export async function GET(request: Request) {
  const ctx = requireOpsReadContext(request);
  if (ctx instanceof Response) return ctx;

  const { supabase, limit } = ctx;
  const { data, error } = await supabase
    .from("bookings")
    .select("id, status, provider, starts_at, notes")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[dashboard/ops/bookings GET]", error);
    return Response.json({ message: "Failed to load bookings (database error)." }, { status: 500 });
  }

  const parsed = opsBookingsResponseSchema.safeParse({ bookings: data ?? [] });
  if (!parsed.success) {
    console.error("[dashboard/ops/bookings GET] schema mismatch", parsed.error.flatten());
    return Response.json(
      { message: "Bookings response did not match expected schema (check migrations vs app)." },
      { status: 500 }
    );
  }

  return Response.json(parsed.data);
}
