export const CONVERSATION_STATUSES = [
  "open",
  "closed",
  "handed_off",
  "archived",
] as const;

export type ConversationStatus = (typeof CONVERSATION_STATUSES)[number];

export const CONVERSATION_CHANNELS = ["widget", "sms", "voice", "email", "other"] as const;

export type ConversationChannel = (typeof CONVERSATION_CHANNELS)[number];
