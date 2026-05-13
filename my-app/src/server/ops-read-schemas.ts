import { z } from "zod";
import { LEAD_STATUSES } from "../lib/dashboard-leads-types";

/** PostgREST may return Postgres `numeric` as string; normalize for UI. */
export const flexDecimalNullable = z
  .union([z.number(), z.string(), z.null()])
  .transform((v) => {
    if (v === null || v === undefined) return null;
    if (typeof v === "number") return Number.isFinite(v) ? v : null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  });

export const flexIntNullable = z
  .union([z.number(), z.string(), z.null()])
  .transform((v) => {
    if (v === null || v === undefined) return null;
    if (typeof v === "number") return Number.isFinite(v) ? Math.trunc(v) : null;
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : null;
  });

const isoTimestamptz = z.string();

export const opsLeadRowSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  /** DB is NOT NULL in normal migrations; allow null so a partial row never bricks the whole table. */
  email: z.string().nullable(),
  source: z.string(),
  status: z.enum(LEAD_STATUSES),
  service_interest: z.string().nullable(),
  created_at: isoTimestamptz,
});

export const opsLeadsResponseSchema = z.object({
  leads: z.array(opsLeadRowSchema),
});

export const opsAgentRunRowSchema = z.object({
  id: z.string().uuid(),
  agent_name: z.string(),
  status: z.string(),
  trigger_source: z.string(),
  started_at: isoTimestamptz,
  duration_ms: flexIntNullable,
});

export const opsAgentRunsResponseSchema = z.object({
  agent_runs: z.array(opsAgentRunRowSchema),
});

export const opsToolCallRowSchema = z.object({
  id: z.string().uuid(),
  tool_name: z.string(),
  status: z.string(),
  agent_run_id: z.string().uuid(),
  started_at: isoTimestamptz,
  duration_ms: flexIntNullable,
});

export const opsToolCallsResponseSchema = z.object({
  tool_calls: z.array(opsToolCallRowSchema),
});

export const opsBookingRowSchema = z.object({
  id: z.string().uuid(),
  status: z.string(),
  provider: z.string(),
  starts_at: isoTimestamptz.nullable(),
  notes: z.string().nullable(),
});

export const opsBookingsResponseSchema = z.object({
  bookings: z.array(opsBookingRowSchema),
});

export const opsTaskRowSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  status: z.string(),
  priority: z.string(),
  due_at: isoTimestamptz.nullable(),
  assigned_to: z.string().nullable(),
});

export const opsTasksResponseSchema = z.object({
  tasks: z.array(opsTaskRowSchema),
});

export const opsApprovalRowSchema = z.object({
  id: z.string().uuid(),
  approval_type: z.string(),
  status: z.string(),
  requested_by: z.string(),
  created_at: isoTimestamptz,
  decision_reason: z.string().nullable(),
});

export const opsApprovalsResponseSchema = z.object({
  approvals: z.array(opsApprovalRowSchema),
});

export const opsMissedRevenueRowSchema = z.object({
  id: z.string().uuid(),
  event_type: z.string(),
  severity: z.string(),
  reason: z.string(),
  estimated_value: flexDecimalNullable,
  recovered: z.boolean(),
  created_at: isoTimestamptz,
});

export const opsMissedRevenueResponseSchema = z.object({
  missed_revenue_events: z.array(opsMissedRevenueRowSchema),
});
