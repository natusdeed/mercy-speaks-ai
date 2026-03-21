import type { ConversationChannel, ConversationStatus } from "@/dashboard/types/conversations";

export const CONVERSATION_STATUS_LABEL: Record<ConversationStatus, string> = {
  open: "Open",
  closed: "Closed",
  handed_off: "Handed off",
  archived: "Archived",
};

export const CONVERSATION_CHANNEL_LABEL: Record<ConversationChannel, string> = {
  widget: "Website widget",
  sms: "SMS",
  voice: "Voice",
  email: "Email",
  other: "Other",
};
