import { Card, CardContent } from "@/components/ui/card";
import { DashboardPageHeader } from "@/dashboard/components/dashboard-page-header";
import {
  MOCK_FUNNEL_STEPS,
  MOCK_MISSED_REVENUE_KPIS,
  MOCK_RECOVERY_PLAYS,
} from "@/dashboard/content/missed-revenue-mock-data";
import { dashboardPanelClass } from "@/dashboard/lib/dashboard-styles";
import { cn } from "@/lib/utils";
import { ArrowDownRight, PiggyBank, Sparkles, TrendingUp } from "lucide-react";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function effortClass(effort: "Low" | "Medium" | "High") {
  if (effort === "Low") return "border-emerald-500/35 bg-emerald-500/10 text-emerald-100";
  if (effort === "Medium") return "border-amber-500/35 bg-amber-500/10 text-amber-100";
  return "border-violet-500/35 bg-violet-500/10 text-violet-100";
}

export function MissedRevenueDemoPage() {
  const k = MOCK_MISSED_REVENUE_KPIS;

  return (
    <div className="space-y-10">
      <DashboardPageHeader
        eyebrow="Phase 4 preview · Revenue recovery"
        title="Missed revenue radar"
        description="Surface where pipeline value leaks between capture and booked revenue — without touching live CRM or finance systems. Every dollar shown is fictional mock data for executive storytelling and UI review."
        actions={
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-100">
            <Sparkles className="h-3.5 w-3.5 text-amber-200" aria-hidden />
            Mock data only
          </span>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          className={cn(
            "relative overflow-hidden border-zinc-800/80 bg-zinc-950/60 shadow-none backdrop-blur-md lg:col-span-1",
            "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-violet-400/40 before:to-transparent"
          )}
        >
          <CardContent className="space-y-2 p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Capture quality</p>
            <p className="text-3xl font-semibold tabular-nums text-zinc-50">{k.captureRatePct}%</p>
            <p className="text-sm text-zinc-400">Inbound touches that receive a same-day structured response in this mock cohort.</p>
          </CardContent>
        </Card>
        <Card
          className={cn(
            "relative overflow-hidden border-zinc-800/80 bg-zinc-950/60 shadow-none backdrop-blur-md lg:col-span-1",
            "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-cyan-400/40 before:to-transparent"
          )}
        >
          <CardContent className="space-y-2 p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Qualified → booked</p>
            <p className="text-3xl font-semibold tabular-nums text-zinc-50">{k.qualifiedToBookedPct}%</p>
            <p className="text-sm text-zinc-400">
              The conversion gap most teams feel first — automation here compounds ROI faster than top-of-funnel vanity metrics.
            </p>
          </CardContent>
        </Card>
        <Card
          className={cn(
            "relative overflow-hidden border-zinc-800/80 bg-zinc-950/60 shadow-none backdrop-blur-md lg:col-span-1",
            "ring-1 ring-amber-500/20 shadow-[0_0_48px_-16px_rgba(245,158,11,0.25)]"
          )}
        >
          <CardContent className="space-y-3 p-6">
            <div className="flex items-center gap-2 text-amber-200/90">
              <PiggyBank className="h-4 w-4" aria-hidden />
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-amber-200/80">At risk (30d · mock)</p>
            </div>
            <p className="font-mono text-3xl font-semibold tabular-nums text-zinc-50">{usd.format(k.revenueAtRisk30dUsd)}</p>
            <p className="text-sm text-zinc-400">
              Low-effort recoverable slice: <span className="font-mono text-emerald-200/90">{usd.format(k.recoverableLowEffortUsd)}</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <Card className={cn("xl:col-span-3", dashboardPanelClass, "border-zinc-800/80 bg-zinc-950/50 shadow-none backdrop-blur-md")}>
          <CardContent className="space-y-6 p-6">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500">Funnel integrity</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Bar width encodes volume; drop-off highlights where revenue bleeds before a human ever sees the lead.
              </p>
            </div>
            <ul className="space-y-5">
              {MOCK_FUNNEL_STEPS.map((step) => (
                  <li key={step.id} className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-sm font-medium text-zinc-200">{step.label}</span>
                      <span className="font-mono text-xs text-zinc-500">
                        {step.count.toLocaleString()} leads
                        {step.dropOffPct > 0 ? (
                          <span className="ml-2 inline-flex items-center gap-1 text-rose-300/90">
                            <ArrowDownRight className="h-3 w-3" aria-hidden />
                            −{step.dropOffPct}%
                          </span>
                        ) : null}
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-zinc-900/80">
                      <div
                        className={cn(
                          "h-full rounded-full bg-linear-to-r from-cyan-500/90 to-violet-500/80",
                          step.barWidthClass
                        )}
                      />
                    </div>
                    {step.revenueAtRiskUsd > 0 ? (
                      <p className="text-xs text-zinc-500">
                        Mock revenue at this step: <span className="font-mono text-zinc-300">{usd.format(step.revenueAtRiskUsd)}</span>
                      </p>
                    ) : (
                      <p className="text-xs text-zinc-600">Top of funnel — baseline volume for the mock scenario.</p>
                    )}
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>

        <Card className={cn("xl:col-span-2", dashboardPanelClass, "border-zinc-800/80 bg-zinc-950/50 shadow-none backdrop-blur-md")}>
          <CardContent className="space-y-5 p-6">
            <div className="flex items-start gap-3">
              <span className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-violet-300">
                <TrendingUp className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500">Recovery plays</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Prioritized ideas your team could run once approvals and CRM writes are live — nothing here executes automatically.
                </p>
              </div>
            </div>
            <ul className="space-y-4">
              {MOCK_RECOVERY_PLAYS.map((play) => (
                <li
                  key={play.id}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-4 backdrop-blur-sm transition-colors hover:border-zinc-700/80"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", effortClass(play.effort))}>
                      {play.effort} effort
                    </span>
                    <span className="font-mono text-sm text-emerald-200/90">{usd.format(play.impactUsd)}</span>
                  </div>
                  <p className="mt-3 text-sm font-medium leading-snug text-zinc-100">{play.title}</p>
                  <p className="mt-2 text-xs text-zinc-500">{play.window}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
