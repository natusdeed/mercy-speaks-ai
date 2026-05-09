export const AGENT_RUN_STATUSES = ["running", "success", "failed", "blocked", "cancelled"] as const;
export type AgentRunStatus = (typeof AGENT_RUN_STATUSES)[number];

export const TOOL_CALL_STATUSES = ["success", "failed", "blocked", "skipped"] as const;
export type ToolCallStatus = (typeof TOOL_CALL_STATUSES)[number];

export const APPROVAL_STATUSES = ["pending", "approved", "rejected", "expired", "cancelled"] as const;
export type ApprovalStatus = (typeof APPROVAL_STATUSES)[number];

export const SOCIAL_POST_STATUSES = [
  "draft",
  "pending_approval",
  "approved",
  "scheduled",
  "published",
  "failed",
  "rejected",
] as const;
export type SocialPostStatus = (typeof SOCIAL_POST_STATUSES)[number];

export const TASK_STATUSES = ["pending", "in_progress", "blocked", "completed", "cancelled"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const TASK_PRIORITIES = ["low", "medium", "high", "urgent"] as const;
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export const MISSED_REVENUE_SEVERITIES = ["low", "medium", "high", "critical"] as const;
export type MissedRevenueSeverity = (typeof MISSED_REVENUE_SEVERITIES)[number];

export const INTEGRATION_PROVIDERS = ["resend", "twilio", "calcom", "make", "supabase", "openai", "other"] as const;
export type IntegrationProvider = (typeof INTEGRATION_PROVIDERS)[number];
