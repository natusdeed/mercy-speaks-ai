import {
  opsAgentRunsResponseSchema,
  opsApprovalsResponseSchema,
  opsBookingsResponseSchema,
  opsLeadsResponseSchema,
  opsMissedRevenueResponseSchema,
  opsTasksResponseSchema,
  opsToolCallsResponseSchema,
} from "@/server/ops-read-schemas";
import type { z } from "zod";

type ErrorBody = { message?: string };

async function parseJson(res: Response): Promise<unknown> {
  return res.json().catch(() => ({}));
}

type Ok<T> = { ok: true; data: T };
type Fail = { ok: false; status: number; message: string };

function fail(status: number, message: string): Fail {
  return { ok: false, status, message };
}

async function getAuthedJson(
  token: string,
  path: string
): Promise<{ res: Response; body: unknown }> {
  const res = await fetch(path, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await parseJson(res);
  return { res, body };
}

export type OpsLeadsPayload = z.infer<typeof opsLeadsResponseSchema>;
export type OpsAgentRunsPayload = z.infer<typeof opsAgentRunsResponseSchema>;
export type OpsToolCallsPayload = z.infer<typeof opsToolCallsResponseSchema>;
export type OpsBookingsPayload = z.infer<typeof opsBookingsResponseSchema>;
export type OpsTasksPayload = z.infer<typeof opsTasksResponseSchema>;
export type OpsApprovalsPayload = z.infer<typeof opsApprovalsResponseSchema>;
export type OpsMissedRevenuePayload = z.infer<typeof opsMissedRevenueResponseSchema>;

export async function fetchOpsLeads(token: string): Promise<Ok<OpsLeadsPayload> | Fail> {
  const { res, body } = await getAuthedJson(token, "/api/dashboard/ops/leads");
  const data = (body ?? {}) as ErrorBody;
  if (!res.ok) return fail(res.status, data.message ?? "Failed to load leads.");
  const parsed = opsLeadsResponseSchema.safeParse(body);
  if (!parsed.success) return fail(500, "Invalid leads payload from server.");
  return { ok: true, data: parsed.data };
}

export async function fetchOpsAgentRuns(token: string): Promise<Ok<OpsAgentRunsPayload> | Fail> {
  const { res, body } = await getAuthedJson(token, "/api/dashboard/ops/agent-runs");
  const data = (body ?? {}) as ErrorBody;
  if (!res.ok) return fail(res.status, data.message ?? "Failed to load agent runs.");
  const parsed = opsAgentRunsResponseSchema.safeParse(body);
  if (!parsed.success) return fail(500, "Invalid agent runs payload from server.");
  return { ok: true, data: parsed.data };
}

export async function fetchOpsToolCalls(token: string): Promise<Ok<OpsToolCallsPayload> | Fail> {
  const { res, body } = await getAuthedJson(token, "/api/dashboard/ops/tool-calls");
  const data = (body ?? {}) as ErrorBody;
  if (!res.ok) return fail(res.status, data.message ?? "Failed to load tool calls.");
  const parsed = opsToolCallsResponseSchema.safeParse(body);
  if (!parsed.success) return fail(500, "Invalid tool calls payload from server.");
  return { ok: true, data: parsed.data };
}

export async function fetchOpsBookings(token: string): Promise<Ok<OpsBookingsPayload> | Fail> {
  const { res, body } = await getAuthedJson(token, "/api/dashboard/ops/bookings");
  const data = (body ?? {}) as ErrorBody;
  if (!res.ok) return fail(res.status, data.message ?? "Failed to load bookings.");
  const parsed = opsBookingsResponseSchema.safeParse(body);
  if (!parsed.success) return fail(500, "Invalid bookings payload from server.");
  return { ok: true, data: parsed.data };
}

export async function fetchOpsTasks(token: string): Promise<Ok<OpsTasksPayload> | Fail> {
  const { res, body } = await getAuthedJson(token, "/api/dashboard/ops/tasks");
  const data = (body ?? {}) as ErrorBody;
  if (!res.ok) return fail(res.status, data.message ?? "Failed to load tasks.");
  const parsed = opsTasksResponseSchema.safeParse(body);
  if (!parsed.success) return fail(500, "Invalid tasks payload from server.");
  return { ok: true, data: parsed.data };
}

export async function fetchOpsApprovals(token: string): Promise<Ok<OpsApprovalsPayload> | Fail> {
  const { res, body } = await getAuthedJson(token, "/api/dashboard/ops/approvals");
  const data = (body ?? {}) as ErrorBody;
  if (!res.ok) return fail(res.status, data.message ?? "Failed to load approvals.");
  const parsed = opsApprovalsResponseSchema.safeParse(body);
  if (!parsed.success) return fail(500, "Invalid approvals payload from server.");
  return { ok: true, data: parsed.data };
}

export async function fetchOpsMissedRevenue(
  token: string
): Promise<Ok<OpsMissedRevenuePayload> | Fail> {
  const { res, body } = await getAuthedJson(token, "/api/dashboard/ops/missed-revenue");
  const data = (body ?? {}) as ErrorBody;
  if (!res.ok) return fail(res.status, data.message ?? "Failed to load missed revenue events.");
  const parsed = opsMissedRevenueResponseSchema.safeParse(body);
  if (!parsed.success) return fail(500, "Invalid missed revenue payload from server.");
  return { ok: true, data: parsed.data };
}
