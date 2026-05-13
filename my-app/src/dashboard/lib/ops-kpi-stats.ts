import type { OpsKpiItem } from "@/dashboard/components/ops-kpi-grid";
import type {
  OpsAgentRunsPayload,
  OpsApprovalsPayload,
  OpsBookingsPayload,
  OpsLeadsPayload,
  OpsMissedRevenuePayload,
  OpsTasksPayload,
  OpsToolCallsPayload,
} from "@/dashboard/lib/dashboard-ops-read-api";
import { formatOpsMoney } from "@/dashboard/lib/ops-format";
import { countWhere, statusMatchesAny, uniqueSorted } from "@/dashboard/lib/ops-client-filters";
import { LEAD_STATUS_LABEL } from "@/dashboard/lib/lead-labels";
import {
  Bot,
  Calendar,
  ClipboardCheck,
  Gauge,
  ListTodo,
  PiggyBank,
  Sparkles,
  Target,
  Timer,
  Users,
  Wrench,
} from "lucide-react";

function fmtCount(n: number): string {
  return n.toLocaleString();
}

function fmtPct(part: number, total: number): string {
  if (total === 0) return "0%";
  return `${Math.round((part / total) * 100)}%`;
}

function avgMs(values: Array<number | null | undefined>): string {
  const nums = values.filter((v): v is number => v != null && Number.isFinite(v));
  if (nums.length === 0) return "—";
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
  return `${Math.round(avg).toLocaleString()} ms`;
}

export function buildLeadOpsKpis(rows: OpsLeadsPayload["leads"]): OpsKpiItem[] {
  const newCount = countWhere(rows, (r) => r.status === "new");
  const pipeline = countWhere(rows, (r) => r.status === "qualified" || r.status === "booked");
  const sources = uniqueSorted(rows.map((r) => r.source));

  return [
    {
      key: "total",
      label: "Rows in view",
      value: fmtCount(rows.length),
      hint: "Loaded from Supabase",
      icon: Users,
      accent: "cyan",
    },
    {
      key: "new",
      label: "New leads",
      value: fmtCount(newCount),
      hint: "Needs first touch",
      icon: Sparkles,
      accent: "violet",
    },
    {
      key: "qualified",
      label: "Qualified or booked",
      value: fmtCount(pipeline),
      hint: "Revenue-adjacent",
      icon: Target,
      accent: "emerald",
    },
    {
      key: "sources",
      label: "Unique sources",
      value: fmtCount(sources.length),
      hint: "Channel breadth",
      icon: Gauge,
      accent: "sky",
    },
  ];
}

export function buildAgentRunKpis(rows: OpsAgentRunsPayload["agent_runs"]): OpsKpiItem[] {
  const completed = countWhere(rows, (r) =>
    statusMatchesAny(r.status, ["complete", "completed", "success", "succeeded", "done"])
  );
  const failed = countWhere(rows, (r) =>
    statusMatchesAny(r.status, ["fail", "failed", "error", "cancel"])
  );

  return [
    {
      key: "total",
      label: "Runs loaded",
      value: fmtCount(rows.length),
      hint: "Recent orchestration",
      icon: Bot,
      accent: "violet",
    },
    {
      key: "completed",
      label: "Completed",
      value: fmtCount(completed),
      hint: fmtPct(completed, rows.length) + " of view",
      icon: Gauge,
      accent: "emerald",
    },
    {
      key: "failed",
      label: "Failed / cancelled",
      value: fmtCount(failed),
      hint: "Needs review",
      icon: Target,
      accent: "rose",
    },
    {
      key: "avg",
      label: "Avg duration",
      value: avgMs(rows.map((r) => r.duration_ms)),
      hint: "Wall-clock signal",
      icon: Timer,
      accent: "cyan",
    },
  ];
}

export function buildToolCallKpis(rows: OpsToolCallsPayload["tool_calls"]): OpsKpiItem[] {
  const ok = countWhere(rows, (r) =>
    statusMatchesAny(r.status, ["success", "succeeded", "ok", "complete", "completed"])
  );
  const bad = countWhere(rows, (r) =>
    statusMatchesAny(r.status, ["fail", "failed", "error"])
  );

  return [
    {
      key: "total",
      label: "Tool calls",
      value: fmtCount(rows.length),
      hint: "Execution telemetry",
      icon: Wrench,
      accent: "cyan",
    },
    {
      key: "ok",
      label: "Successful",
      value: fmtCount(ok),
      hint: fmtPct(ok, rows.length) + " success rate",
      icon: Gauge,
      accent: "emerald",
    },
    {
      key: "bad",
      label: "Failed",
      value: fmtCount(bad),
      hint: "Debug candidates",
      icon: Target,
      accent: "rose",
    },
    {
      key: "avg",
      label: "Avg duration",
      value: avgMs(rows.map((r) => r.duration_ms)),
      hint: "Latency signal",
      icon: Timer,
      accent: "violet",
    },
  ];
}

export function buildBookingKpis(rows: OpsBookingsPayload["bookings"]): OpsKpiItem[] {
  const confirmed = countWhere(rows, (r) =>
    statusMatchesAny(r.status, ["confirm", "booked", "scheduled"])
  );
  const pending = countWhere(rows, (r) =>
    statusMatchesAny(r.status, ["pending", "intent", "draft", "requested"])
  );
  const providers = uniqueSorted(rows.map((r) => r.provider));

  return [
    {
      key: "total",
      label: "Booking rows",
      value: fmtCount(rows.length),
      hint: "Captured intents",
      icon: Calendar,
      accent: "sky",
    },
    {
      key: "confirmed",
      label: "Confirmed / scheduled",
      value: fmtCount(confirmed),
      hint: "Calendar-ready",
      icon: Gauge,
      accent: "emerald",
    },
    {
      key: "pending",
      label: "Pending intents",
      value: fmtCount(pending),
      hint: "Needs follow-up",
      icon: Timer,
      accent: "amber",
    },
    {
      key: "providers",
      label: "Providers",
      value: fmtCount(providers.length),
      hint: "Routing breadth",
      icon: Sparkles,
      accent: "cyan",
    },
  ];
}

export function buildTaskKpis(rows: OpsTasksPayload["tasks"]): OpsKpiItem[] {
  const open = countWhere(
    rows,
    (r) => !statusMatchesAny(r.status, ["done", "completed", "closed", "cancel"])
  );
  const high = countWhere(rows, (r) =>
    statusMatchesAny(r.priority, ["high", "hot", "urgent"])
  );
  const overdue = countWhere(rows, (r) => {
    if (!r.due_at) return false;
    const due = new Date(r.due_at);
    if (Number.isNaN(due.getTime())) return false;
    return due.getTime() < Date.now() && !statusMatchesAny(r.status, ["done", "completed", "closed"]);
  });

  return [
    {
      key: "total",
      label: "Tasks loaded",
      value: fmtCount(rows.length),
      hint: "Follow-up queue",
      icon: ListTodo,
      accent: "emerald",
    },
    {
      key: "open",
      label: "Open tasks",
      value: fmtCount(open),
      hint: "Still actionable",
      icon: Gauge,
      accent: "cyan",
    },
    {
      key: "high",
      label: "High priority",
      value: fmtCount(high),
      hint: "Escalation signal",
      icon: Target,
      accent: "amber",
    },
    {
      key: "overdue",
      label: "Overdue",
      value: fmtCount(overdue),
      hint: "Past due date",
      icon: Timer,
      accent: "rose",
    },
  ];
}

export function buildApprovalKpis(rows: OpsApprovalsPayload["approvals"]): OpsKpiItem[] {
  const pending = countWhere(rows, (r) =>
    statusMatchesAny(r.status, ["pending", "awaiting", "open", "requested"])
  );
  const approved = countWhere(rows, (r) =>
    statusMatchesAny(r.status, ["approved", "accepted", "granted"])
  );
  const rejected = countWhere(rows, (r) =>
    statusMatchesAny(r.status, ["reject", "denied", "declined"])
  );

  return [
    {
      key: "total",
      label: "Approval rows",
      value: fmtCount(rows.length),
      hint: "Human-in-the-loop",
      icon: ClipboardCheck,
      accent: "violet",
    },
    {
      key: "pending",
      label: "Awaiting decision",
      value: fmtCount(pending),
      hint: "Queue depth",
      icon: Timer,
      accent: "amber",
    },
    {
      key: "approved",
      label: "Approved",
      value: fmtCount(approved),
      hint: "Cleared requests",
      icon: Gauge,
      accent: "emerald",
    },
    {
      key: "rejected",
      label: "Rejected",
      value: fmtCount(rejected),
      hint: "Blocked actions",
      icon: Target,
      accent: "rose",
    },
  ];
}

export function buildMissedRevenueKpis(
  rows: OpsMissedRevenuePayload["missed_revenue_events"]
): OpsKpiItem[] {
  const recovered = countWhere(rows, (r) => r.recovered);
  const high = countWhere(rows, (r) =>
    statusMatchesAny(r.severity, ["high", "critical", "severe"])
  );
  const totalValue = rows.reduce((sum, r) => sum + (r.estimated_value ?? 0), 0);

  return [
    {
      key: "total",
      label: "Signals logged",
      value: fmtCount(rows.length),
      hint: "Leakage events",
      icon: PiggyBank,
      accent: "amber",
    },
    {
      key: "value",
      label: "Est. value at risk",
      value: formatOpsMoney(totalValue),
      hint: "Summed in view",
      icon: Gauge,
      accent: "rose",
    },
    {
      key: "recovered",
      label: "Recovered",
      value: fmtCount(recovered),
      hint: fmtPct(recovered, rows.length) + " recovery rate",
      icon: Target,
      accent: "emerald",
    },
    {
      key: "high",
      label: "High severity",
      value: fmtCount(high),
      hint: "Prioritize review",
      icon: Sparkles,
      accent: "violet",
    },
  ];
}

export function leadStatusFilterOptions(
  rows: OpsLeadsPayload["leads"]
): Array<{ value: string; label: string }> {
  return uniqueSorted(rows.map((r) => r.status)).map((status) => ({
    value: status,
    label: LEAD_STATUS_LABEL[status as keyof typeof LEAD_STATUS_LABEL] ?? status,
  }));
}

export function stringFilterOptions(
  rows: string[],
  labelFn?: (value: string) => string
): Array<{ value: string; label: string }> {
  return uniqueSorted(rows).map((value) => ({
    value,
    label: labelFn ? labelFn(value) : value,
  }));
}
