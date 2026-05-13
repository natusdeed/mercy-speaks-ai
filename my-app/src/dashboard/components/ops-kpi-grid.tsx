import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type OpsKpiItem = {
  key: string;
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  accent?: "cyan" | "violet" | "emerald" | "amber" | "sky" | "rose";
};

const accentBar: Record<NonNullable<OpsKpiItem["accent"]>, string> = {
  cyan: "before:via-cyan-400/40",
  violet: "before:via-violet-400/40",
  emerald: "before:via-emerald-400/40",
  amber: "before:via-amber-400/40",
  sky: "before:via-sky-400/40",
  rose: "before:via-rose-400/40",
};

const accentIcon: Record<NonNullable<OpsKpiItem["accent"]>, string> = {
  cyan: "text-cyan-300/90",
  violet: "text-violet-300/90",
  emerald: "text-emerald-300/90",
  amber: "text-amber-300/90",
  sky: "text-sky-300/90",
  rose: "text-rose-300/90",
};

type OpsKpiGridProps = {
  items: OpsKpiItem[];
  loading?: boolean;
};

export function OpsKpiGrid({ items, loading }: OpsKpiGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const accent = item.accent ?? "cyan";
        const Icon = item.icon;
        return (
          <Card
            key={item.key}
            className={cn(
              "relative overflow-hidden border-zinc-800/80 bg-zinc-950/60 shadow-none backdrop-blur-md",
              "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:to-transparent",
              accentBar[accent]
            )}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                    {item.hint}
                  </p>
                  <p className="mt-2 text-sm font-medium text-zinc-200">{item.label}</p>
                </div>
                <span className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-2">
                  <Icon className={cn("h-4 w-4", accentIcon[accent])} aria-hidden />
                </span>
              </div>
              <p className="mt-4 font-mono text-3xl font-semibold tabular-nums tracking-tight text-zinc-50">
                {loading ? "—" : item.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
