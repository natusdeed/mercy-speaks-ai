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
  organization_id: string | null;
  created_at: string;
  channel: string;
  status: string;
};

export type ConversationRowDbDetail = ConversationRowDbList & {
  transcript: unknown;
  ai_summary: string | null;
  qualification_result: string | null;
  internal_notes: string | null;
  metadata: Record<string, unknown> | null;
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
    tenantId: row.organization_id,
    contactName: "Visitor",
    channel: normalizeChannel(row.channel),
    lastMessagePreview: null,
    status: normalizeStatus(row.status),
    intent: null,
    outcome: null,
    lastActivityAt: row.created_at,
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
    visitorId: null,
    startedAt: row.created_at,
    transcript: parseTranscript(row.transcript),
    aiSummary: row.ai_summary?.trim() || null,
    qualificationResult: row.qualification_result?.trim() || null,
    internalNotes: row.internal_notes,
    metadata: row.metadata && typeof row.metadata === "object" ? row.metadata : {},
  };
}
