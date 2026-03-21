import type { ConversationDetailDto, ConversationListItemDto } from "@/dashboard/types/conversations";

type ErrorBody = { message?: string };

async function parseJson<T>(res: Response): Promise<T> {
  return (await res.json().catch(() => ({}))) as T;
}

export async function fetchConversationsList(
  token: string,
  params: { q?: string; status?: string; channel?: string }
): Promise<
  { ok: true; conversations: ConversationListItemDto[] } | { ok: false; status: number; message: string }
> {
  const sp = new URLSearchParams();
  if (params.q?.trim()) sp.set("q", params.q.trim());
  if (params.status) sp.set("status", params.status);
  if (params.channel) sp.set("channel", params.channel);
  const qs = sp.toString();
  const res = await fetch(`/api/dashboard/conversations${qs ? `?${qs}` : ""}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await parseJson<{ conversations?: ConversationListItemDto[] } & ErrorBody>(res);
  if (!res.ok) {
    return { ok: false, status: res.status, message: data.message ?? "Failed to load conversations." };
  }
  return { ok: true, conversations: data.conversations ?? [] };
}

export async function fetchConversationById(
  token: string,
  id: string
): Promise<
  { ok: true; conversation: ConversationDetailDto } | { ok: false; status: number; message: string }
> {
  const res = await fetch(`/api/dashboard/conversations/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await parseJson<{ conversation?: ConversationDetailDto } & ErrorBody>(res);
  if (!res.ok) {
    return { ok: false, status: res.status, message: data.message ?? "Failed to load conversation." };
  }
  if (!data.conversation) {
    return { ok: false, status: 500, message: "Invalid response from server." };
  }
  return { ok: true, conversation: data.conversation };
}

export async function patchConversationRequest(
  token: string,
  id: string,
  body: { internal_notes: string | null }
): Promise<
  { ok: true; conversation: ConversationDetailDto } | { ok: false; status: number; message: string }
> {
  const res = await fetch(`/api/dashboard/conversations/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await parseJson<{ conversation?: ConversationDetailDto } & ErrorBody>(res);
  if (!res.ok) {
    return { ok: false, status: res.status, message: data.message ?? "Failed to update conversation." };
  }
  if (!data.conversation) {
    return { ok: false, status: 500, message: "Invalid response from server." };
  }
  return { ok: true, conversation: data.conversation };
}
