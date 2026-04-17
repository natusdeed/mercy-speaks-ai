import { requireDashboardSession } from "../../../../../server/dashboard-request-auth";
import { getDashboardSupabase } from "../../../../../server/supabase-dashboard";
import {
  CONVERSATION_DB_SELECT_DETAIL,
  parseConversationIdFromPathname,
  patchConversationBodySchema,
} from "../../../../../server/conversation-models";
import {
  type LeadLinkRowDb,
  mapConversationToDetail,
  type ConversationRowDbDetail,
} from "../../../../../server/conversations-dto";

export async function GET(request: Request) {
  const auth = requireDashboardSession(request);
  if (auth instanceof Response) return auth;

  const id = parseConversationIdFromPathname(new URL(request.url).pathname);
  if (!id) {
    return Response.json({ message: "Invalid conversation id." }, { status: 400 });
  }

  const supabase = getDashboardSupabase();
  if (!supabase) {
    return Response.json(
      { message: "Supabase is not configured (SUPABASE_URL / SUPABASE_SERVICE_KEY)." },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("conversations")
    .select(CONVERSATION_DB_SELECT_DETAIL)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[dashboard/conversations GET id]", error);
    return Response.json({ message: "Failed to load conversation." }, { status: 500 });
  }

  if (!data) {
    return Response.json({ message: "Conversation not found." }, { status: 404 });
  }

  const row = data as ConversationRowDbDetail;

  const { data: leadRows, error: leadErr } = await supabase
    .from("leads")
    .select("id, conversation_id, first_name, last_name, name, email, updated_at")
    .eq("conversation_id", id)
    .order("updated_at", { ascending: false })
    .limit(1);

  if (leadErr) {
    console.error("[dashboard/conversations GET id] lead", leadErr);
    return Response.json({ message: "Failed to load linked lead." }, { status: 500 });
  }

  const lead = ((leadRows ?? [])[0] as LeadLinkRowDb | undefined) ?? null;

  return Response.json({ conversation: mapConversationToDetail(row, lead) });
}

export async function PATCH(request: Request) {
  const auth = requireDashboardSession(request);
  if (auth instanceof Response) return auth;

  const id = parseConversationIdFromPathname(new URL(request.url).pathname);
  if (!id) {
    return Response.json({ message: "Invalid conversation id." }, { status: 400 });
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

  const parsed = patchConversationBodySchema.safeParse(json);
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
  if (b.internal_notes !== undefined) {
    patch.internal_notes = b.internal_notes === null ? null : b.internal_notes.trim() || null;
  }

  const { data, error } = await supabase
    .from("conversations")
    .update(patch)
    .eq("id", id)
    .select(CONVERSATION_DB_SELECT_DETAIL)
    .single();

  if (error) {
    console.error("[dashboard/conversations PATCH]", error);
    return Response.json({ message: "Failed to update conversation." }, { status: 500 });
  }

  if (!data) {
    return Response.json({ message: "Conversation not found." }, { status: 404 });
  }

  const row = data as ConversationRowDbDetail;

  const { data: leadRows, error: leadErr } = await supabase
    .from("leads")
    .select("id, conversation_id, first_name, last_name, name, email, updated_at")
    .eq("conversation_id", id)
    .order("updated_at", { ascending: false })
    .limit(1);

  if (leadErr) {
    console.error("[dashboard/conversations PATCH] lead", leadErr);
    return Response.json({ message: "Failed to load linked lead." }, { status: 500 });
  }

  const lead = ((leadRows ?? [])[0] as LeadLinkRowDb | undefined) ?? null;

  return Response.json({ conversation: mapConversationToDetail(row, lead) });
}
