import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";

type OpsLiveReadonlyBadgeProps = {
  className?: string;
};

export function OpsLiveReadonlyBadge({ className }: OpsLiveReadonlyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-100",
        className
      )}
    >
      <Activity className="h-3.5 w-3.5 text-cyan-200" aria-hidden />
      Live read-only
    </span>
  );
}
