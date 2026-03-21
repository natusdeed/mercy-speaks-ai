import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardPageHeader } from "@/dashboard/components/dashboard-page-header";
import { dashboardPanelClass } from "@/dashboard/lib/dashboard-styles";
import { cn } from "@/lib/utils";

const KPI_LABELS = [
  { label: "Total leads", hint: "All sources" },
  { label: "New today", hint: "Last 24 hours" },
  { label: "Booked appointments", hint: "Upcoming window" },
  { label: "Open conversations", hint: "AI + handoff" },
] as const;

export function DashboardHomePage() {
  return (
    <div className="space-y-10">
      <DashboardPageHeader
        eyebrow="Overview"
        title="Mercy AI"
        description="KPIs and activity will appear here as data is connected. Layout is ready for daily review."
        actions={
          <Link
            to="/dashboard/follow-up"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-200"
          >
            Follow-up
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPI_LABELS.map(({ label, hint }) => (
          <Card key={label} className={cn("shadow-none", dashboardPanelClass)}>
            <CardContent className="p-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">{hint}</p>
              <p className="mt-2 text-sm font-medium text-zinc-200">{label}</p>
              <p className="mt-4 font-mono text-2xl font-semibold tabular-nums tracking-tight text-zinc-100">
                —
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className={cn("shadow-none lg:col-span-2", dashboardPanelClass)}>
          <CardContent className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <p className="text-sm font-medium text-zinc-300">Performance</p>
            <p className="max-w-md text-sm text-zinc-500">
              Conversion and volume charts will render here when analytics are wired.
            </p>
          </CardContent>
        </Card>
        <Card className={cn("shadow-none", dashboardPanelClass)}>
          <CardContent className="p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Needs attention</p>
            <p className="mt-3 text-sm text-zinc-500">Hot leads, escalations, and stale follow-ups will list here.</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-500">
              <li className="rounded-lg border border-dashed border-zinc-800 px-3 py-4 text-center text-zinc-600">
                No urgent items
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
