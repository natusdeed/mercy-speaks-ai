import type {
  AgentRunStatus,
  ApprovalStatus,
  IntegrationProvider,
  MissedRevenueSeverity,
  SocialPostStatus,
  TaskPriority,
  TaskStatus,
  ToolCallStatus,
} from "./enums";

export type JsonObject = Record<string, unknown>;

export type OrganizationRecord = {
  id: string;
  tenant_id: string | null;
  name: string;
  legal_name: string | null;
  industry: string | null;
  website_url: string | null;
  phone: string | null;
  email: string | null;
  timezone: string;
  status: "active" | "inactive" | "archived";
  settings: JsonObject;
  created_at: string;
  updated_at: string;
};

export type AgentRunRecord = {
  id: string;
  organization_id: string | null;
  lead_id: string | null;
  conversation_id: string | null;
  parent_run_id: string | null;
  agent_name: string;
  agent_version: string | null;
  trigger_source: "api" | "webhook" | "schedule" | "manual" | "dashboard" | "other";
  input_payload: JsonObject;
  output_payload: JsonObject;
  status: AgentRunStatus;
  error_code: string | null;
  error_message: string | null;
  started_at: string;
  completed_at: string | null;
  duration_ms: number | null;
  metadata: JsonObject;
};

export type ToolCallRecord = {
  id: string;
  agent_run_id: string;
  tool_name: string;
  tool_version: string | null;
  request_payload: JsonObject;
  response_payload: JsonObject;
  status: ToolCallStatus;
  error_message: string | null;
  started_at: string;
  completed_at: string | null;
  duration_ms: number | null;
  requires_approval: boolean;
  approved_by: string | null;
  approved_at: string | null;
};

export type MissedRevenueEventRecord = {
  id: string;
  organization_id: string | null;
  lead_id: string | null;
  conversation_id: string | null;
  call_id: string | null;
  booking_id: string | null;
  event_type: "missed_call" | "abandoned_chat" | "no_follow_up" | "failed_handoff" | "no_show" | "other";
  severity: MissedRevenueSeverity;
  reason: string;
  estimated_value: number | null;
  recovered: boolean;
  recovered_at: string | null;
  metadata: JsonObject;
  created_at: string;
};

export type TaskRecord = {
  id: string;
  organization_id: string | null;
  lead_id: string | null;
  conversation_id: string | null;
  created_by_agent_run_id: string | null;
  title: string;
  description: string | null;
  task_type: "follow_up" | "callback" | "proposal" | "content_review" | "approval" | "integration_check" | "other";
  status: TaskStatus;
  priority: TaskPriority;
  due_at: string | null;
  assigned_to: string | null;
  metadata: JsonObject;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
};

export type SocialPostRecord = {
  id: string;
  organization_id: string | null;
  campaign_id: string | null;
  content_idea_id: string | null;
  generated_by_agent_run_id: string | null;
  platform: "instagram" | "facebook" | "tiktok" | "youtube" | "linkedin" | "x" | "threads" | "other";
  post_type: "feed" | "story" | "reel" | "short" | "carousel" | "thread" | "other";
  status: SocialPostStatus;
  title: string | null;
  caption: string;
  hashtags: string[];
  visual_prompt: string | null;
  scheduled_for: string | null;
  published_at: string | null;
  external_post_id: string | null;
  metadata: JsonObject;
  created_at: string;
  updated_at: string;
};

export type ApprovalRecord = {
  id: string;
  organization_id: string | null;
  agent_run_id: string | null;
  tool_call_id: string | null;
  social_post_id: string | null;
  approval_type: "publish_social" | "send_email" | "send_sms" | "booking_confirmation" | "price_quote" | "other";
  status: ApprovalStatus;
  requested_by: string;
  requested_payload: JsonObject;
  decision_reason: string | null;
  approved_by: string | null;
  decided_at: string | null;
  expires_at: string | null;
  metadata: JsonObject;
  created_at: string;
};

export type IntegrationRecord = {
  id: string;
  organization_id: string | null;
  provider: IntegrationProvider;
  status: "connected" | "disconnected" | "error" | "disabled";
  config: JsonObject;
  secrets_ref: JsonObject;
  last_tested_at: string | null;
  last_error: string | null;
  created_at: string;
  updated_at: string;
};

export type AuditLogRecord = {
  id: string;
  organization_id: string | null;
  actor_type: "ai_agent" | "user" | "system" | "integration";
  actor_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  severity: "info" | "warning" | "error" | "critical";
  message: string | null;
  before_state: JsonObject;
  after_state: JsonObject;
  metadata: JsonObject;
  occurred_at: string;
  created_at: string;
};
