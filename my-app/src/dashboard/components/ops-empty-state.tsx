import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Inbox, SearchX } from "lucide-react";

type OpsEmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description: string;
  filtered?: boolean;
  className?: string;
};

export function OpsEmptyState({
  icon: Icon = Inbox,
  title,
  description,
  filtered,
  className,
}: OpsEmptyStateProps) {
  const DisplayIcon = filtered ? SearchX : Icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-6 py-16 text-center",
        className
      )}
    >
      <span className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-zinc-400">
        <DisplayIcon className="h-8 w-8" aria-hidden />
      </span>
      <p className="mt-5 text-base font-medium text-zinc-200">{title}</p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500">{description}</p>
    </div>
  );
}
