import type {
  ConversationChannel,
  ConversationStatus,
} from "@/lib/dashboard-conversations-types";

export {
  CONVERSATION_CHANNELS,
  CONVERSATION_STATUSES,
  type ConversationChannel,
  type ConversationStatus,
} from "@/lib/dashboard-conversations-types";

export type TranscriptTurn = {
  role: "user" | "assistant" | "system";
  content: string;
  at: string | null;
};

export type LinkedLeadSummary = {
  id: string;
  displayName: string;
  email: string;
};

export type ConversationListItemDto = {
  id: string;
  tenantId: string;
  contactName: string;
  channel: ConversationChannel;
  lastMessagePreview: string | null;
  status: ConversationStatus;
  intent: string | null;
  outcome: string | null;
  lastActivityAt: string;
  linkedLead: LinkedLeadSummary | null;
};

export type ConversationDetailDto = ConversationListItemDto & {
  visitorId: string | null;
  startedAt: string;
  transcript: TranscriptTurn[];
  aiSummary: string | null;
  qualificationResult: string | null;
  internalNotes: string | null;
  metadata: Record<string, unknown>;
};
