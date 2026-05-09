import { z } from "zod";

const isoDatetimeSchema = z.string().datetime({ offset: true });
const uuidSchema = z.string().uuid();
const tenantIdSchema = z.string().min(1).max(120);

const leadCRMStatusSchema = z.enum([
  "new",
  "contacted",
  "qualified",
  "booked",
  "proposal_sent",
  "won",
  "lost",
  "follow_up_later",
]);

const fitLabelSchema = z.enum(["cold", "warm", "hot", "unknown"]);

/** Common tool flag — skips database writes while still emitting validated JSON. */
export const phase3SimulateSchema = z.boolean().optional();

// --- saveLead ---

export const saveLeadToolInputSchema = z.object({
  simulate: phase3SimulateSchema,
  lead_id: uuidSchema.optional(),
  tenant_id: tenantIdSchema.nullable().optional(),
  organization_id: uuidSchema.nullable().optional(),
  conversation_id: uuidSchema.nullable().optional(),
  email: z.string().email(),
  phone: z.string().min(3).max(60),
  name: z.string().max(240).nullable().optional(),
  first_name: z.string().max(120).nullable().optional(),
  last_name: z.string().max(120).nullable().optional(),
  business_name: z.string().max(240).nullable().optional(),
  message: z.string().max(20000).nullable().optional(),
  service_interest: z.string().max(500).nullable().optional(),
  source: z.string().min(1).max(80).optional().default("employee.intake"),
  notes: z.string().max(20000).nullable().optional(),
  status: leadCRMStatusSchema.optional(),
  priority: z.enum(["low", "medium", "high", "hot"]).optional(),
  estimated_value: z.number().finite().nonnegative().nullable().optional(),
  metadata: z.record(z.unknown()).optional().default({}),
});

export type SaveLeadToolInput = z.infer<typeof saveLeadToolInputSchema>;

export const saveLeadToolOutputSchema = z.object({
  kind: z.literal("tool.saveLead"),
  simulated: z.boolean(),
  lead_id: uuidSchema.optional(),
  action: z.enum(["inserted", "updated", "validated_only"]),
});

// --- qualifyLead ---

export const qualifyLeadToolInputSchema = z.object({
  simulate: phase3SimulateSchema,
  lead_id: uuidSchema.nullable().optional(),
  conversation_id: uuidSchema.nullable().optional(),
  organization_id: uuidSchema.nullable().optional(),
  recommended_lead_status: leadCRMStatusSchema,
  fit_label: fitLabelSchema.optional().default("unknown"),
  rationale: z.string().min(3).max(2000),
  conversation_intent: z.string().max(1000).nullable().optional(),
  conversation_outcome: z.string().max(1000).nullable().optional(),
  qualification_result_text: z.string().min(3).max(4000),
  internal_notes_patch: z.string().max(10000).nullable().optional(),
  estimated_value: z.number().finite().nonnegative().nullable().optional(),
});

export type QualifyLeadToolInput = z.infer<typeof qualifyLeadToolInputSchema>;

export const qualifyLeadToolOutputSchema = z.object({
  kind: z.literal("tool.qualifyLead"),
  simulated: z.boolean(),
  lead_id: uuidSchema.nullable(),
  conversation_id: uuidSchema.nullable(),
  lead_updated: z.boolean(),
  conversation_updated: z.boolean(),
});

// --- createBookingIntent ---

export const createBookingIntentToolInputSchema = z.object({
  simulate: phase3SimulateSchema,
  lead_id: uuidSchema.nullable().optional(),
  conversation_id: uuidSchema.nullable().optional(),
  organization_id: uuidSchema.nullable().optional(),
  source: z
    .enum(["ai_agent", "owner", "human_staff", "widget", "other"])
    .optional()
    .default("ai_agent"),
  provider: z.enum(["calcom", "calendly", "manual", "other"]).optional().default("manual"),
  status: z.literal("intent").optional().default("intent"),
  booking_link: z.string().url().nullable().optional(),
  starts_at: isoDatetimeSchema.nullable().optional(),
  ends_at: isoDatetimeSchema.nullable().optional(),
  timezone: z.string().max(120).nullable().optional(),
  notes: z.string().max(10000).nullable().optional(),
  metadata: z.record(z.unknown()).optional().default({}),
});

export const createBookingIntentToolOutputSchema = z.object({
  kind: z.literal("tool.createBookingIntent"),
  simulated: z.boolean(),
  booking_id: uuidSchema.optional(),
  status: z.literal("intent"),
});

// --- draftFollowUp ---

export const draftFollowUpToolInputSchema = z.object({
  simulate: phase3SimulateSchema,
  lead_id: uuidSchema.nullable().optional(),
  conversation_id: uuidSchema.nullable().optional(),
  organization_id: uuidSchema.nullable().optional(),
  subject: z.string().min(1).max(500),
  body: z.string().min(10).max(20000),
  channel_suggestion: z.enum(["email", "sms", "call", "widget", "other"]).optional().default("email"),
  urgency: z.enum(["low", "medium", "high", "urgent"]).optional().default("medium"),
  due_at: isoDatetimeSchema.nullable().optional(),
  metadata: z.record(z.unknown()).optional().default({}),
});

export const draftFollowUpToolOutputSchema = z.object({
  kind: z.literal("tool.draftFollowUp"),
  simulated: z.boolean(),
  task_id: uuidSchema.optional(),
  note: z.literal("draft_only_no_message_sent_phase3"),
});

// --- sendOwnerAlert ---

export const sendOwnerAlertToolInputSchema = z.object({
  simulate: phase3SimulateSchema,
  headline: z.string().min(3).max(240),
  summary: z.string().min(3).max(4000),
  urgency: z.enum(["low", "medium", "high", "critical"]),
  drafted_notice: z.string().min(3).max(8000),
  approval_type: z.enum(["publish_social", "send_email", "send_sms", "booking_confirmation", "price_quote", "other"]).optional().default("send_email"),
  recommendation: z.string().max(2000).nullable().optional(),
  mark_conversation_status: z.literal("handed_off").nullable().optional(),
  metadata_patch: z.record(z.unknown()).optional().default({}),
});

export const sendOwnerAlertToolOutputSchema = z.object({
  kind: z.literal("tool.sendOwnerAlert"),
  simulated: z.boolean(),
  approval_id: uuidSchema.optional(),
  conversation_status_patch_applied: z.boolean(),
});

// --- logMissedRevenue ---

export const missedRevenueEventTypeSchema = z.enum([
  "missed_call",
  "abandoned_chat",
  "no_follow_up",
  "failed_handoff",
  "no_show",
  "other",
]);

export const logMissedRevenueToolInputSchema = z.object({
  simulate: phase3SimulateSchema,
  organization_id: uuidSchema.nullable().optional(),
  lead_id: uuidSchema.nullable().optional(),
  conversation_id: uuidSchema.nullable().optional(),
  booking_id: uuidSchema.nullable().optional(),
  call_id: uuidSchema.nullable().optional(),
  event_type: missedRevenueEventTypeSchema,
  severity: z.enum(["low", "medium", "high", "critical"]),
  reason: z.string().min(3).max(2000),
  estimated_value: z.number().finite().nonnegative().nullable().optional(),
  metadata: z.record(z.unknown()).optional().default({}),
});

export const logMissedRevenueToolOutputSchema = z.object({
  kind: z.literal("tool.logMissedRevenue"),
  simulated: z.boolean(),
  missed_revenue_event_id: uuidSchema.optional(),
});

// --- Employee agent envelopes (validated `output_payload` summaries) ---

export const intakeAgentOutputSchema = z.object({
  kind: z.literal("employee.intake"),
  summary: z.string().min(1).max(2000),
  saveLead: saveLeadToolOutputSchema,
});

export const qualifierAgentOutputSchema = z.object({
  kind: z.literal("employee.qualifier"),
  summary: z.string().min(1).max(2000),
  qualifyLead: qualifyLeadToolOutputSchema,
});

export const bookingEmployeeAgentOutputSchema = z.object({
  kind: z.literal("employee.booking"),
  summary: z.string().min(1).max(2000),
  createBookingIntent: createBookingIntentToolOutputSchema,
});

export const followUpAgentOutputSchema = z.object({
  kind: z.literal("employee.follow_up"),
  summary: z.string().min(1).max(2000),
  draftFollowUp: draftFollowUpToolOutputSchema,
});

export const handoffAgentOutputSchema = z.object({
  kind: z.literal("employee.handoff"),
  summary: z.string().min(1).max(2000),
  sendOwnerAlert: sendOwnerAlertToolOutputSchema,
});
