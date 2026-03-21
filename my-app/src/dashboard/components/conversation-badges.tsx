import { cn } from "@/lib/utils";
import { CONVERSATION_CHANNEL_LABEL, CONVERSATION_STATUS_LABEL } from "@/dashboard/lib/conversation-labels";
import type { ConversationChannel, ConversationStatus } from "@/dashboard/types/conversations";

const STATUS_STYLE: Record<ConversationStatus, string> = {
  open: "border-cyan-800/50 bg-cyan-950/30 text-cyan-100/90",
  closed: "border-zinc-600 bg-zinc-900/80 text-zinc-300",
  handed_off: "border-violet-800/50 bg-violet-950/35 text-violet-100/90",
  archived: "border-zinc-700 bg-zinc-900/90 text-zinc-500",
};

const CHANNEL_STYLE: Record<ConversationChannel, string> = {
  widget: "border-slate-600 bg-slate-900/80 text-slate-200",
  sms: "border-emerald-800/45 bg-emerald-950/25 text-emerald-100/85",
  voice: "border-sky-800/45 bg-sky-950/30 text-sky-100/90",
  email: "border-amber-800/40 bg-amber-950/25 text-amber-100/85",
  other: "border-zinc-600 bg-zinc-900/80 text-zinc-400",
};

export function ConversationStatusBadge({
  status,
  className,
}: {
  status: ConversationStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        STATUS_STYLE[status],
        className
      )}
    >
      {CONVERSATION_STATUS_LABEL[status]}
    </span>
  );
}

export function ConversationChannelBadge({
  channel,
  className,
}: {
  channel: ConversationChannel;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        CHANNEL_STYLE[channel],
        className
      )}
    >
      {CONVERSATION_CHANNEL_LABEL[channel]}
    </span>
  );
}
