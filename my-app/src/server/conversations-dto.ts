import {
  CONVERSATION_CHANNELS,
  CONVERSATION_STATUSES,
  type ConversationChannel,
  type ConversationStatus,
} from "../lib/dashboard-conversations-types";
import type {
  ConversationDetailDto,
  ConversationListItemDto,
  LinkedLeadSummary,
  TranscriptTurn,
} from "../dashboard/types/conversations";

export type ConversationRowDbList = {
  id: string;
  tenant_id: string;
  visitor_id: string | null;
  started_at: string;
  updated_at: string;
  channel: string;
  contact_name: string | null;
  last_message_preview: string | null;
  last_message_at: string | null;
  status: string;
  intent: string | null;
  outcome: string | null;
  metadata: Record<string, unknown> | null;
};

export type ConversationRowDbDetail = ConversationRowDbList & {
  transcript: unknown;
  ai_summary: string | null;
  qualification_result: string | null;
  internal_notes: string | null;
};

export type LeadLinkRowDb = {
  id: string;
  conversation_id: string | null;
  first_name: string | null;
  last_name: string | null;
  name: string | null;
  email: string;
  updated_at: string;
};

function normalizeStatus(raw: string): ConversationStatus {
  return CONVERSATION_STATUSES.includes(raw as ConversationStatus)
    ? (raw as ConversationStatus)
    : "open";
}

function normalizeChannel(raw: string): ConversationChannel {
  return CONVERSATION_CHANNELS.includes(raw as ConversationChannel)
    ? (raw as ConversationChannel)
    : "other";
}

function displayNameFromLead(row: Pick<LeadLinkRowDb, "first_name" | "last_name" | "name">): string {
  const combined = [row.first_name, row.last_name].filter(Boolean).join(" ").trim();
  if (combined) return combined;
  if (row.name?.trim()) return row.name.trim();
  return "—";
}

export function parseTranscript(raw: unknown): TranscriptTurn[] {
  if (!Array.isArray(raw)) return [];
  const out: TranscriptTurn[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    const role = o.role;
    const content = o.content;
    if (role !== "user" && role !== "assistant" && role !== "system") continue;
    if (typeof content !== "string") continue;
    const atRaw = o.at;
    const at = typeof atRaw === "string" ? atRaw : null;
    out.push({ role, content, at });
  }
  return out;
}

function lastActivityAt(row: ConversationRowDbList): string {
  return row.last_message_at ?? row.updated_at ?? row.started_at;
}

function contactNameFrom(row: ConversationRowDbList, lead: LeadLinkRowDb | null): string {
  const explicit = row.contact_name?.trim();
  if (explicit) return explicit;
  if (lead) {
    const n = displayNameFromLead(lead);
    if (n !== "—") return n;
  }
  const vid = row.visitor_id?.trim();
  if (vid) return `Visitor ${vid.slice(0, 8)}…`;
  return "Visitor";
}

function toLinkedLead(row: LeadLinkRowDb | null): LinkedLeadSummary | null {
  if (!row) return null;
  return {
    id: row.id,
    displayName: displayNameFromLead(row),
    email: row.email,
  };
}

export function mapConversationToListItem(
  row: ConversationRowDbList,
  lead: LeadLinkRowDb | null
): ConversationListItemDto {
  const linkedLead = toLinkedLead(lead);
  return {
    id: row.id,
    tenantId: row.tenant_id,
    contactName: contactNameFrom(row, lead),
    channel: normalizeChannel(row.channel),
    lastMessagePreview: row.last_message_preview?.trim() || null,
    status: normalizeStatus(row.status),
    intent: row.intent?.trim() || null,
    outcome: row.outcome?.trim() || null,
    lastActivityAt: lastActivityAt(row),
    linkedLead,
  };
}

export function mapConversationToDetail(
  row: ConversationRowDbDetail,
  lead: LeadLinkRowDb | null
): ConversationDetailDto {
  const base = mapConversationToListItem(row, lead);
  return {
    ...base,
    visitorId: row.visitor_id,
    startedAt: row.started_at,
    transcript: parseTranscript(row.transcript),
    aiSummary: row.ai_summary?.trim() || null,
    qualificationResult: row.qualification_result?.trim() || null,
    internalNotes: row.internal_notes,
    metadata: row.metadata && typeof row.metadata === "object" ? row.metadata : {},
  };
}
