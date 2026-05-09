import { z } from "zod";
import {
  AGENT_RUN_STATUSES,
  APPROVAL_STATUSES,
  INTEGRATION_PROVIDERS,
  MISSED_REVENUE_SEVERITIES,
  SOCIAL_POST_STATUSES,
  TASK_PRIORITIES,
  TASK_STATUSES,
  TOOL_CALL_STATUSES,
} from "./enums";

const uuidSchema = z.string().uuid();
const isoDatetimeSchema = z.string().datetime({ offset: true });
const jsonObjectSchema = z.record(z.unknown());

export const organizationSchema = z.object({
  id: uuidSchema,
  tenant_id: z.string().nullable(),
  name: z.string().min(1).max(240),
  legal_name: z.string().max(240).nullable(),
  industry: z.string().max(120).nullable(),
  website_url: z.string().url().nullable(),
  phone: z.string().max(40).nullable(),
  email: z.string().email().nullable(),
  timezone: z.string().min(2).max(120),
  status: z.enum(["active", "inactive", "archived"]),
  settings: jsonObjectSchema,
  created_at: isoDatetimeSchema,
  updated_at: isoDatetimeSchema,
});

export const leadReferenceSchema = z.object({
  lead_id: uuidSchema.nullable(),
  conversation_id: uuidSchema.nullable(),
  organization_id: uuidSchema.nullable(),
});

export const bookingSchema = z.object({
  id: uuidSchema,
  lead_id: uuidSchema.nullable(),
  conversation_id: uuidSchema.nullable(),
  organization_id: uuidSchema.nullable(),
  source: z.enum(["ai_agent", "owner", "human_staff", "widget", "other"]),
  provider: z.enum(["calcom", "calendly", "manual", "other"]),
  external_booking_id: z.string().max(255).nullable(),
  status: z.enum(["intent", "pending_confirmation", "confirmed", "completed", "cancelled", "no_show"]),
  booking_link: z.string().url().nullable(),
  starts_at: isoDatetimeSchema.nullable(),
  ends_at: isoDatetimeSchema.nullable(),
  timezone: z.string().max(120).nullable(),
  notes: z.string().max(10000).nullable(),
  metadata: jsonObjectSchema,
  created_at: isoDatetimeSchema,
  updated_at: isoDatetimeSchema,
});

export const callSchema = z.object({
  id: uuidSchema,
  conversation_id: uuidSchema.nullable(),
  lead_id: uuidSchema.nullable(),
  organization_id: uuidSchema.nullable(),
  external_call_id: z.string().max(255).nullable(),
  provider: z.enum(["twilio", "vapi", "other"]),
  direction: z.enum(["inbound", "outbound"]),
  status: z.enum(["initiated", "ringing", "in_progress", "completed", "missed", "failed", "voicemail"]),
  from_number: z.string().max(40).nullable(),
  to_number: z.string().max(40).nullable(),
  started_at: isoDatetimeSchema.nullable(),
  ended_at: isoDatetimeSchema.nullable(),
  duration_seconds: z.number().int().nonnegative().nullable(),
  transcript: z.string().nullable(),
  summary: z.string().nullable(),
  recording_url: z.string().url().nullable(),
  metadata: jsonObjectSchema,
  created_at: isoDatetimeSchema,
});

export const messageSchema = z.object({
  id: uuidSchema,
  conversation_id: uuidSchema,
  lead_id: uuidSchema.nullable(),
  organization_id: uuidSchema.nullable(),
  role: z.enum(["system", "assistant", "user", "tool", "human_agent"]),
  channel: z.enum(["widget", "sms", "voice", "email", "web", "other"]),
  direction: z.enum(["inbound", "outbound", "internal"]),
  content: z.string().min(1),
  metadata: jsonObjectSchema,
  sent_at: isoDatetimeSchema,
  created_at: isoDatetimeSchema,
});

export const missedRevenueEventSchema = z.object({
  id: uuidSchema,
  organization_id: uuidSchema.nullable(),
  lead_id: uuidSchema.nullable(),
  conversation_id: uuidSchema.nullable(),
  call_id: uuidSchema.nullable(),
  booking_id: uuidSchema.nullable(),
  event_type: z.enum(["missed_call", "abandoned_chat", "no_follow_up", "failed_handoff", "no_show", "other"]),
  severity: z.enum(MISSED_REVENUE_SEVERITIES),
  reason: z.string().min(3).max(2000),
  estimated_value: z.number().nonnegative().finite().nullable(),
  recovered: z.boolean(),
  recovered_at: isoDatetimeSchema.nullable(),
  metadata: jsonObjectSchema,
  created_at: isoDatetimeSchema,
});

export const agentRunSchema = z.object({
  id: uuidSchema,
  organization_id: uuidSchema.nullable(),
  lead_id: uuidSchema.nullable(),
  conversation_id: uuidSchema.nullable(),
  parent_run_id: uuidSchema.nullable(),
  agent_name: z.string().min(1).max(120),
  agent_version: z.string().max(60).nullable(),
  trigger_source: z.enum(["api", "webhook", "schedule", "manual", "dashboard", "other"]),
  input_payload: jsonObjectSchema,
  output_payload: jsonObjectSchema,
  status: z.enum(AGENT_RUN_STATUSES),
  error_code: z.string().max(80).nullable(),
  error_message: z.string().max(2000).nullable(),
  started_at: isoDatetimeSchema,
  completed_at: isoDatetimeSchema.nullable(),
  duration_ms: z.number().int().nonnegative().nullable(),
  metadata: jsonObjectSchema,
});

export const toolCallSchema = z.object({
  id: uuidSchema,
  agent_run_id: uuidSchema,
  tool_name: z.string().min(1).max(120),
  tool_version: z.string().max(60).nullable(),
  request_payload: jsonObjectSchema,
  response_payload: jsonObjectSchema,
  status: z.enum(TOOL_CALL_STATUSES),
  error_message: z.string().max(2000).nullable(),
  started_at: isoDatetimeSchema,
  completed_at: isoDatetimeSchema.nullable(),
  duration_ms: z.number().int().nonnegative().nullable(),
  requires_approval: z.boolean(),
  approved_by: z.string().max(120).nullable(),
  approved_at: isoDatetimeSchema.nullable(),
});

export const taskSchema = z.object({
  id: uuidSchema,
  organization_id: uuidSchema.nullable(),
  lead_id: uuidSchema.nullable(),
  conversation_id: uuidSchema.nullable(),
  created_by_agent_run_id: uuidSchema.nullable(),
  title: z.string().min(1).max(240),
  description: z.string().max(10000).nullable(),
  task_type: z.enum(["follow_up", "callback", "proposal", "content_review", "approval", "integration_check", "other"]),
  status: z.enum(TASK_STATUSES),
  priority: z.enum(TASK_PRIORITIES),
  due_at: isoDatetimeSchema.nullable(),
  assigned_to: z.string().max(120).nullable(),
  metadata: jsonObjectSchema,
  created_at: isoDatetimeSchema,
  updated_at: isoDatetimeSchema,
  completed_at: isoDatetimeSchema.nullable(),
});

export const campaignSchema = z.object({
  id: uuidSchema,
  organization_id: uuidSchema.nullable(),
  name: z.string().min(1).max(240),
  objective: z.string().min(1).max(2000),
  channel: z.enum(["social", "email", "sms", "ads", "mixed"]),
  audience: z.string().max(1000).nullable(),
  status: z.enum(["draft", "planned", "active", "paused", "completed", "archived"]),
  start_date: z.string().date().nullable(),
  end_date: z.string().date().nullable(),
  budget: z.number().nonnegative().finite().nullable(),
  metadata: jsonObjectSchema,
  created_at: isoDatetimeSchema,
  updated_at: isoDatetimeSchema,
});

export const contentIdeaSchema = z.object({
  id: uuidSchema,
  organization_id: uuidSchema.nullable(),
  campaign_id: uuidSchema.nullable(),
  generated_by_agent_run_id: uuidSchema.nullable(),
  title: z.string().min(1).max(240),
  angle: z.string().max(1000).nullable(),
  target_platform: z.enum(["instagram", "facebook", "tiktok", "youtube", "linkedin", "x", "blog", "email", "other"]),
  funnel_stage: z.enum(["awareness", "consideration", "conversion", "retention"]),
  hook: z.string().max(500).nullable(),
  cta: z.string().max(500).nullable(),
  status: z.enum(["draft", "approved", "rejected", "archived"]),
  metadata: jsonObjectSchema,
  created_at: isoDatetimeSchema,
  updated_at: isoDatetimeSchema,
});

export const socialPostSchema = z.object({
  id: uuidSchema,
  organization_id: uuidSchema.nullable(),
  campaign_id: uuidSchema.nullable(),
  content_idea_id: uuidSchema.nullable(),
  generated_by_agent_run_id: uuidSchema.nullable(),
  platform: z.enum(["instagram", "facebook", "tiktok", "youtube", "linkedin", "x", "threads", "other"]),
  post_type: z.enum(["feed", "story", "reel", "short", "carousel", "thread", "other"]),
  status: z.enum(SOCIAL_POST_STATUSES),
  title: z.string().max(240).nullable(),
  caption: z.string().min(1),
  hashtags: z.array(z.string().min(1).max(80)),
  visual_prompt: z.string().max(4000).nullable(),
  scheduled_for: isoDatetimeSchema.nullable(),
  published_at: isoDatetimeSchema.nullable(),
  external_post_id: z.string().max(255).nullable(),
  metadata: jsonObjectSchema,
  created_at: isoDatetimeSchema,
  updated_at: isoDatetimeSchema,
});

export const approvalSchema = z.object({
  id: uuidSchema,
  organization_id: uuidSchema.nullable(),
  agent_run_id: uuidSchema.nullable(),
  tool_call_id: uuidSchema.nullable(),
  social_post_id: uuidSchema.nullable(),
  approval_type: z.enum(["publish_social", "send_email", "send_sms", "booking_confirmation", "price_quote", "other"]),
  status: z.enum(APPROVAL_STATUSES),
  requested_by: z.string().min(1).max(120),
  requested_payload: jsonObjectSchema,
  decision_reason: z.string().max(2000).nullable(),
  approved_by: z.string().max(120).nullable(),
  decided_at: isoDatetimeSchema.nullable(),
  expires_at: isoDatetimeSchema.nullable(),
  metadata: jsonObjectSchema,
  created_at: isoDatetimeSchema,
});

export const integrationSchema = z.object({
  id: uuidSchema,
  organization_id: uuidSchema.nullable(),
  provider: z.enum(INTEGRATION_PROVIDERS),
  status: z.enum(["connected", "disconnected", "error", "disabled"]),
  config: jsonObjectSchema,
  secrets_ref: jsonObjectSchema,
  last_tested_at: isoDatetimeSchema.nullable(),
  last_error: z.string().max(2000).nullable(),
  created_at: isoDatetimeSchema,
  updated_at: isoDatetimeSchema,
});

export const auditLogSchema = z.object({
  id: uuidSchema,
  organization_id: uuidSchema.nullable(),
  actor_type: z.enum(["ai_agent", "user", "system", "integration"]),
  actor_id: z.string().max(120).nullable(),
  action: z.string().min(1).max(160),
  entity_type: z.string().min(1).max(120),
  entity_id: z.string().max(120).nullable(),
  severity: z.enum(["info", "warning", "error", "critical"]),
  message: z.string().max(5000).nullable(),
  before_state: jsonObjectSchema,
  after_state: jsonObjectSchema,
  metadata: jsonObjectSchema,
  occurred_at: isoDatetimeSchema,
  created_at: isoDatetimeSchema,
});

// --- API orchestration (Phase 2) — request/response envelopes only; not DB row shapes. ---

export const agentOrchestrationToolInvocationSchema = z.object({
  name: z.string().min(1).max(120),
  input: jsonObjectSchema.optional().default({}),
});

export const agentOrchestrationRequestSchema = z.object({
  agent: z.string().min(1).max(120),
  agent_version: z.string().max(60).optional(),
  input: jsonObjectSchema.optional().default({}),
  tools: z.array(agentOrchestrationToolInvocationSchema).max(32).optional(),
  organization_id: uuidSchema.nullable().optional(),
  lead_id: uuidSchema.nullable().optional(),
  conversation_id: uuidSchema.nullable().optional(),
  parent_run_id: uuidSchema.nullable().optional(),
  metadata: jsonObjectSchema.optional(),
});

export type AgentOrchestrationRequest = z.infer<typeof agentOrchestrationRequestSchema>;

export const agentOrchestrationToolCallSummarySchema = z.object({
  id: uuidSchema,
  tool_name: z.string(),
  status: z.enum(TOOL_CALL_STATUSES),
  response: jsonObjectSchema,
  error_message: z.string().nullable().optional(),
});

export const agentOrchestrationSuccessBodySchema = z.object({
  ok: z.literal(true),
  run_id: uuidSchema,
  agent: z.string(),
  status: z.enum(AGENT_RUN_STATUSES),
  output: jsonObjectSchema,
  tool_calls: z.array(agentOrchestrationToolCallSummarySchema),
  meta: z.object({
    duration_ms: z.number().int().nonnegative(),
    started_at: isoDatetimeSchema,
    completed_at: isoDatetimeSchema.nullable(),
  }),
});

export const agentOrchestrationErrorBodySchema = z.object({
  ok: z.literal(false),
  run_id: uuidSchema.optional(),
  error: z.object({
    code: z.string().min(1).max(80),
    message: z.string().min(1).max(2000),
    details: z.unknown().optional(),
  }),
});

export const agentOrchestrationResponseBodySchema = z.discriminatedUnion("ok", [
  agentOrchestrationSuccessBodySchema,
  agentOrchestrationErrorBodySchema,
]);

export type AgentOrchestrationResponseBody = z.infer<typeof agentOrchestrationResponseBodySchema>;
