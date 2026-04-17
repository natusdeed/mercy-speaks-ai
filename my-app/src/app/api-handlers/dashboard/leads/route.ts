import { requireDashboardSession } from "../../../../server/dashboard-request-auth";
import { getDashboardSupabase } from "../../../../server/supabase-dashboard";
import { mapLeadRow, type LeadRowDb } from "../../../../server/leads-dto";
import {
  createLeadBodySchema,
  LEAD_DB_SELECT,
} from "../../../../server/lead-models";
import {
  LEAD_PRIORITIES,
  LEAD_STATUSES,
  type LeadPriority,
  type LeadStatus,
} from "../../../../lib/dashboard-leads-types";

function sanitizeIlike(q: string): string {
  /* PostgREST `.or()` uses `.` as a delimiter; strip chars that break parsing. */
  return q.slice(0, 120).replace(/[%_,.]/g, " ").trim();
}

export async function GET(request: Request) {
  const auth = requireDashboardSession(request);
  if (auth instanceof Response) return auth;

  const supabase = getDashboardSupabase();
  if (!supabase) {
    return Response.json(
      { message: "Supabase is not configured (SUPABASE_URL / SUPABASE_SERVICE_KEY)." },
      { status: 503 }
    );
  }

  const url = new URL(request.url);
  const qRaw = url.searchParams.get("q")?.trim() ?? "";
  const statusFilter = url.searchParams.get("status")?.trim() ?? "";
  const priorityFilter = url.searchParams.get("priority")?.trim() ?? "";
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") ?? "50") || 50));
  const offset = Math.max(0, Number(url.searchParams.get("offset") ?? "0") || 0);

  let query = supabase
    .from("leads")
    .select(LEAD_DB_SELECT)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (statusFilter && LEAD_STATUSES.includes(statusFilter as LeadStatus)) {
    query = query.eq("status", statusFilter);
  }
  if (priorityFilter && LEAD_PRIORITIES.includes(priorityFilter as LeadPriority)) {
    query = query.eq("priority", priorityFilter);
  }

  const q = sanitizeIlike(qRaw);
  if (q.length > 0) {
    const pattern = `%${q}%`;
    query = query.or(
      `email.ilike.${pattern},phone.ilike.${pattern},name.ilike.${pattern},business_name.ilike.${pattern},first_name.ilike.${pattern},last_name.ilike.${pattern}`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error("[dashboard/leads GET]", error);
    return Response.json({ message: "Failed to load leads." }, { status: 500 });
  }

  const leads = (data ?? []).map((r) => mapLeadRow(r as LeadRowDb));

  return Response.json({ leads });
}

export async function POST(request: Request) {
  const auth = requireDashboardSession(request);
  if (auth instanceof Response) return auth;

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

  const parsed = createLeadBodySchema.safeParse(json);
  if (!parsed.success) {
    const msg =
      parsed.error.flatten().fieldErrors.email?.[0] ??
      parsed.error.flatten().fieldErrors.phone?.[0] ??
      "Invalid request.";
    return Response.json({ message: msg }, { status: 400 });
  }

  const b = parsed.data;
  const defaultTenant = process.env.MERCY_DASHBOARD_DEFAULT_TENANT_ID?.trim() || null;
  const displayName = [b.first_name, b.last_name].filter(Boolean).join(" ").trim() || null;

  const insert = {
    tenant_id: defaultTenant,
    conversation_id: null,
    email: b.email.trim(),
    phone: b.phone.trim(),
    name: displayName,
    first_name: b.first_name?.trim() || null,
    last_name: b.last_name?.trim() || null,
    business_name: b.business_name?.trim() || null,
    message: null,
    service_interest: b.service_interest?.trim() || null,
    source: b.source.trim() || "dashboard",
    status: b.status ?? "new",
    priority: b.priority ?? "medium",
    notes: b.notes?.trim() || null,
    estimated_value: b.estimated_value ?? null,
    metadata: {},
  };

  const { data, error } = await supabase.from("leads").insert(insert).select().single();

  if (error) {
    console.error("[dashboard/leads POST]", error);
    return Response.json({ message: "Failed to create lead." }, { status: 500 });
  }

  const lead = mapLeadRow(data as LeadRowDb);
  return Response.json({ lead }, { status: 201 });
}
