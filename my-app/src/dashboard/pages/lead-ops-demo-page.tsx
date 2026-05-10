import { Card, CardContent } from "@/components/ui/card";
import { DashboardPageHeader } from "@/dashboard/components/dashboard-page-header";
import {
  MOCK_LEAD_OPS_KPIS,
  MOCK_LEAD_OPS_ROWS,
  type MockLeadStage,
} from "@/dashboard/content/lead-ops-mock-data";
import { dashboardPanelClass, dashboardTableBodyRowClass, dashboardTableClass, dashboardTableHeadRowClass, dashboardTableTdClass, dashboardTableThClass } from "@/dashboard/lib/dashboard-styles";
import { cn } from "@/lib/utils";
import { Clock3, Gauge, Sparkles, Target, Users } from "lucide-react";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function stagePill(stage: MockLeadStage) {
  const map: Record<MockLeadStage, string> = {
    New: "border-cyan-500/35 bg-cyan-500/10 text-cyan-100",
    Working: "border-violet-500/35 bg-violet-500/10 text-violet-100",
    Qualified: "border-emerald-500/35 bg-emerald-500/10 text-emerald-100",
    Booked: "border-sky-500/35 bg-sky-500/10 text-sky-100",
    Nurture: "border-amber-500/35 bg-amber-500/10 text-amber-100",
    Lost: "border-rose-500/35 bg-rose-500/10 text-rose-100",
  };
  return map[stage];
}

const KPI_ICONS = {
  active: Users,
  response: Clock3,
  qualified: Target,
  booked: Gauge,
} as const;

export function LeadOpsDemoPage() {
  const k = MOCK_LEAD_OPS_KPIS;

  return (
    <div className="space-y-10">
      <DashboardPageHeader
        eyebrow="Phase 4 preview · Lead operations"
        title="Lead ops command center"
        description="A SaaS-grade operations view for how Mercy AI keeps response times tight and stages honest. All numbers and rows are static mock data — no Supabase reads and no outbound automation from this screen."
        actions={
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-100">
            <Sparkles className="h-3.5 w-3.5 text-amber-200" aria-hidden />
            Mock data only
          </span>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {(
          [
            { key: "active" as const, label: "Active leads", value: k.activeLeads.toLocaleString(), hint: "Pipeline breadth" },
            {
              key: "response" as const,
              label: "Median first response",
              value: `${k.medianFirstResponseMins} min`,
              hint: "Speed-to-lead signal",
            },
            {
              key: "qualified" as const,
              label: "Qualified rate",
              value: `${k.qualifiedRatePct}%`,
              hint: "Mock funnel quality",
            },
            {
              key: "booked" as const,
              label: "Meetings booked (wk)",
              value: k.meetingsBookedWeek.toLocaleString(),
              hint: "Revenue-adjacent outcome",
            },
          ] as const
        ).map((item) => {
          const Icon = KPI_ICONS[item.key];
          return (
            <Card
              key={item.key}
              className={cn(
                "relative overflow-hidden border-zinc-800/80 bg-zinc-950/60 shadow-none backdrop-blur-md",
                "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-cyan-400/40 before:to-transparent"
              )}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">{item.hint}</p>
                    <p className="mt-2 text-sm font-medium text-zinc-200">{item.label}</p>
                  </div>
                  <span className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-cyan-300/90">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                </div>
                <p className="mt-4 font-mono text-3xl font-semibold tabular-nums tracking-tight text-zinc-50">{item.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className={cn("overflow-hidden border-zinc-800/80 bg-zinc-950/50 shadow-none backdrop-blur-md", dashboardPanelClass)}>
        <CardContent className="p-0">
          <div className="border-b border-zinc-800/80 px-6 py-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500">Pipeline board</h2>
            <p className="mt-1 max-w-3xl text-sm text-zinc-400">
              Stages, owners, and SLA minutes are illustrative. Production wiring waits on the database milestone documented in{" "}
              <span className="text-zinc-200">PHASE_3_DATABASE_BLOCKER.md</span>. This table does not create tasks, send SMS, or book
              appointments.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className={dashboardTableClass}>
              <thead>
                <tr className={dashboardTableHeadRowClass}>
                  <th className={dashboardTableThClass}>Lead</th>
                  <th className={dashboardTableThClass}>Stage</th>
                  <th className={dashboardTableThClass}>Source</th>
                  <th className={dashboardTableThClass}>SLA (mock)</th>
                  <th className={dashboardTableThClass}>Owner</th>
                  <th className={cn(dashboardTableThClass, "text-right")}>Est. value</th>
                  <th className={dashboardTableThClass}>Last touch</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_LEAD_OPS_ROWS.map((row) => (
                  <tr key={row.id} className={dashboardTableBodyRowClass}>
                    <td className={dashboardTableTdClass}>
                      <div className="font-medium text-zinc-100">{row.leadName}</div>
                      <div className="text-xs text-zinc-500">{row.company}</div>
                    </td>
                    <td className={dashboardTableTdClass}>
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                          stagePill(row.stage)
                        )}
                      >
                        {row.stage}
                      </span>
                    </td>
                    <td className={dashboardTableTdClass}>{row.source}</td>
                    <td className={cn(dashboardTableTdClass, "font-mono text-zinc-200")}>{row.responseSlaMins}m</td>
                    <td className={dashboardTableTdClass}>{row.owner}</td>
                    <td className={cn(dashboardTableTdClass, "text-right font-mono text-zinc-200")}>{usd.format(row.estValueUsd)}</td>
                    <td className={cn(dashboardTableTdClass, "text-xs text-zinc-500")}>{row.lastTouchLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
