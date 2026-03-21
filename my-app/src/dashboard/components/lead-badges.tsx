import { cn } from "@/lib/utils";
import { LEAD_PRIORITY_LABEL, LEAD_STATUS_LABEL } from "@/dashboard/lib/lead-labels";
import type { LeadPriority, LeadStatus } from "@/dashboard/types/leads";

/** Muted semantic chips — readable at a glance without neon chrome */
const STATUS_STYLE: Record<LeadStatus, string> = {
  new: "border-zinc-600 bg-zinc-900/80 text-zinc-200",
  contacted: "border-zinc-600 bg-zinc-900/80 text-zinc-200",
  qualified: "border-zinc-500/60 bg-zinc-900/70 text-zinc-100",
  booked: "border-emerald-800/60 bg-emerald-950/40 text-emerald-100/90",
  proposal_sent: "border-amber-800/50 bg-amber-950/30 text-amber-100/85",
  won: "border-emerald-700/50 bg-emerald-950/35 text-emerald-50",
  lost: "border-zinc-700 bg-zinc-900/90 text-zinc-400",
  follow_up_later: "border-zinc-600 bg-zinc-900/80 text-zinc-300",
};

const PRIORITY_STYLE: Record<LeadPriority, string> = {
  low: "border-zinc-700 bg-zinc-900/80 text-zinc-400",
  medium: "border-zinc-600 bg-zinc-900/80 text-zinc-300",
  high: "border-amber-800/45 bg-amber-950/25 text-amber-100/90",
  hot: "border-rose-900/50 bg-rose-950/35 text-rose-100/90",
};

export function LeadStatusBadge({ status, className }: { status: LeadStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        STATUS_STYLE[status],
        className
      )}
    >
      {LEAD_STATUS_LABEL[status]}
    </span>
  );
}

export function LeadPriorityBadge({ priority, className }: { priority: LeadPriority; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        PRIORITY_STYLE[priority],
        className
      )}
    >
      {LEAD_PRIORITY_LABEL[priority]}
    </span>
  );
}
