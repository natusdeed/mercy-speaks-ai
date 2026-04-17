import { requireDashboardSession } from "../../../../../server/dashboard-request-auth";
import { getDashboardSupabase } from "../../../../../server/supabase-dashboard";
import { mapLeadRow, type LeadRowDb } from "../../../../../server/leads-dto";
import {
  LEAD_DB_SELECT,
  parseLeadIdFromPathname,
  patchLeadBodySchema,
} from "../../../../../server/lead-models";

export async function GET(request: Request) {
  const auth = requireDashboardSession(request);
  if (auth instanceof Response) return auth;

  const id = parseLeadIdFromPathname(new URL(request.url).pathname);
  if (!id) {
    return Response.json({ message: "Invalid lead id." }, { status: 400 });
  }

  const supabase = getDashboardSupabase();
  if (!supabase) {
    return Response.json(
      { message: "Supabase is not configured (SUPABASE_URL / SUPABASE_SERVICE_KEY)." },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("leads")
    .select(LEAD_DB_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[dashboard/leads GET id]", error);
    return Response.json({ message: "Failed to load lead." }, { status: 500 });
  }

  if (!data) {
    return Response.json({ message: "Lead not found." }, { status: 404 });
  }

  return Response.json({ lead: mapLeadRow(data as LeadRowDb) });
}

export async function PATCH(request: Request) {
  const auth = requireDashboardSession(request);
  if (auth instanceof Response) return auth;

  const id = parseLeadIdFromPathname(new URL(request.url).pathname);
  if (!id) {
    return Response.json({ message: "Invalid lead id." }, { status: 400 });
  }

  const supabase = getDashboardSupabase();
  if (!supabase) {
    return Response.json(
      { message: "Supabase is not configured (SUPABASE_URL / SUPABASE_SERVICE_KEY)." },
      { status: 503 }
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = patchLeadBodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { message: parsed.error.flatten().formErrors[0] ?? "Invalid request." },
      { status: 400 }
    );
  }

  const b = parsed.data;
  if (Object.keys(b).length === 0) {
    return Response.json({ message: "No fields to update." }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};
  if (b.status !== undefined) patch.status = b.status;
  if (b.priority !== undefined) patch.priority = b.priority;
  if (b.notes !== undefined) {
    patch.notes = b.notes === null ? null : b.notes.trim() || null;
  }
  if (b.first_name !== undefined) patch.first_name = b.first_name?.trim() || null;
  if (b.last_name !== undefined) patch.last_name = b.last_name?.trim() || null;
  if (b.business_name !== undefined) patch.business_name = b.business_name?.trim() || null;
  if (b.email !== undefined) patch.email = b.email.trim();
  if (b.phone !== undefined) patch.phone = b.phone.trim();
  if (b.service_interest !== undefined) patch.service_interest = b.service_interest?.trim() || null;
  if (b.estimated_value !== undefined) patch.estimated_value = b.estimated_value;
  if (b.assigned_to !== undefined) {
    patch.assigned_to = b.assigned_to === null ? null : b.assigned_to.trim() || null;
  }

  if (b.first_name !== undefined || b.last_name !== undefined) {
    const { data: existing, error: fetchErr } = await supabase
      .from("leads")
      .select("first_name, last_name, name")
      .eq("id", id)
      .maybeSingle();

    if (fetchErr) {
      console.error("[dashboard/leads PATCH] fetch", fetchErr);
      return Response.json({ message: "Failed to update lead." }, { status: 500 });
    }

    const row = existing as { first_name: string | null; last_name: string | null; name: string | null } | null;
    const fn =
      b.first_name !== undefined ? (b.first_name?.trim() || null) : row?.first_name ?? null;
    const ln =
      b.last_name !== undefined ? (b.last_name?.trim() || null) : row?.last_name ?? null;
    const combined = [fn, ln]
      .filter((x): x is string => typeof x === "string" && x.length > 0)
      .join(" ");
    patch.name = combined.length > 0 ? combined : row?.name ?? null;
  }

  const { data, error } = await supabase
    .from("leads")
    .update(patch)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[dashboard/leads PATCH]", error);
    return Response.json({ message: "Failed to update lead." }, { status: 500 });
  }

  if (!data) {
    return Response.json({ message: "Lead not found." }, { status: 404 });
  }

  return Response.json({ lead: mapLeadRow(data as LeadRowDb) });
}
