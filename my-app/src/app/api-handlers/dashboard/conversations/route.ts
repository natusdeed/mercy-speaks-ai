import { requireDashboardSession } from "../../../../server/dashboard-request-auth";
import { getDashboardSupabase } from "../../../../server/supabase-dashboard";
import {
  CONVERSATION_DB_SELECT_LIST,
  conversationChannelSchema,
  conversationStatusSchema,
} from "../../../../server/conversation-models";
import {
  type LeadLinkRowDb,
  mapConversationToListItem,
  type ConversationRowDbList,
} from "../../../../server/conversations-dto";

function sanitizeIlike(q: string): string {
  return q.slice(0, 120).replace(/[%_,.]/g, " ").trim();
}

function bestLeadByConversation(rows: LeadLinkRowDb[]): Map<string, LeadLinkRowDb> {
  const map = new Map<string, LeadLinkRowDb>();
  for (const r of rows) {
    const cid = r.conversation_id;
    if (!cid) continue;
    const prev = map.get(cid);
    if (!prev || r.updated_at > prev.updated_at) map.set(cid, r);
  }
  return map;
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
  const channelFilter = url.searchParams.get("channel")?.trim() ?? "";
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") ?? "50") || 50));
  const offset = Math.max(0, Number(url.searchParams.get("offset") ?? "0") || 0);

  let query = supabase
    .from("conversations")
    .select(CONVERSATION_DB_SELECT_LIST)
    .order("updated_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (statusFilter && conversationStatusSchema.safeParse(statusFilter).success) {
    query = query.eq("status", statusFilter);
  }
  if (channelFilter && conversationChannelSchema.safeParse(channelFilter).success) {
    query = query.eq("channel", channelFilter);
  }

  const q = sanitizeIlike(qRaw);
  if (q.length > 0) {
    const pattern = `%${q}%`;
    query = query.or(
      `contact_name.ilike.${pattern},last_message_preview.ilike.${pattern},intent.ilike.${pattern},outcome.ilike.${pattern}`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error("[dashboard/conversations GET]", error);
    return Response.json({ message: "Failed to load conversations." }, { status: 500 });
  }

  const rows = (data ?? []) as ConversationRowDbList[];
  const ids = rows.map((r) => r.id);

  let leadMap = new Map<string, LeadLinkRowDb>();
  if (ids.length > 0) {
    const { data: leadRows, error: leadErr } = await supabase
      .from("leads")
      .select("id, conversation_id, first_name, last_name, name, email, updated_at")
      .in("conversation_id", ids);

    if (leadErr) {
      console.error("[dashboard/conversations GET] leads", leadErr);
      return Response.json({ message: "Failed to load linked leads." }, { status: 500 });
    }
    leadMap = bestLeadByConversation((leadRows ?? []) as LeadLinkRowDb[]);
  }

  const conversations = rows.map((r) => mapConversationToListItem(r, leadMap.get(r.id) ?? null));

  return Response.json({ conversations });
}
