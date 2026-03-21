import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type DashboardPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function DashboardPageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: DashboardPageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-6 border-b border-zinc-800/80 pb-8 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="min-w-0 max-w-2xl space-y-2">
        {eyebrow ? (
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-[1.75rem] md:leading-tight">
          {title}
        </h1>
        {description ? (
          <p className="text-sm leading-relaxed text-zinc-500">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>
      ) : null}
    </header>
  );
}
