import { z } from "zod";
import {
  CONVERSATION_CHANNELS,
  CONVERSATION_STATUSES,
} from "../lib/dashboard-conversations-types";
import { parseLeadIdFromPathname } from "./lead-models";

/** Columns for dashboard conversation list (no heavy transcript). */
export const CONVERSATION_DB_SELECT_LIST =
  "id, tenant_id, visitor_id, started_at, updated_at, channel, contact_name, last_message_preview, last_message_at, status, intent, outcome, metadata" as const;

/** Full row for conversation detail. */
export const CONVERSATION_DB_SELECT_DETAIL =
  "id, tenant_id, visitor_id, started_at, updated_at, channel, contact_name, last_message_preview, last_message_at, status, intent, outcome, transcript, ai_summary, qualification_result, internal_notes, metadata" as const;

export const conversationStatusSchema = z.enum(CONVERSATION_STATUSES);
export const conversationChannelSchema = z.enum(CONVERSATION_CHANNELS);

export const patchConversationBodySchema = z
  .object({
    internal_notes: z.string().max(20000).optional().nullable(),
  })
  .strict();

/** Path ends with a UUID (same as leads). */
export function parseConversationIdFromPathname(pathname: string): string | null {
  return parseLeadIdFromPathname(pathname);
}
