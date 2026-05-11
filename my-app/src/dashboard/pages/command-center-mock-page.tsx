import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardPageHeader } from "@/dashboard/components/dashboard-page-header";
import {
  MOCK_COMMAND_ACTIVITY,
  MOCK_COMMAND_KPIS,
  MOCK_COMMAND_OVERVIEW,
  MOCK_COMMAND_WORKFLOW,
  type CommandCenterAccent,
  type MockActivityKind,
} from "@/dashboard/content/command-center-mock-data";
import { dashboardPanelClass } from "@/dashboard/lib/dashboard-styles";
import { cn } from "@/lib/utils";
import {
  CalendarCheck,
  ChevronRight,
  Mail,
  Share2,
  Sparkles,
  UserPlus,
  UserRound,
} from "lucide-react";

function accentRing(accent: CommandCenterAccent) {
  if (accent === "cyan") {
    return "ring-1 ring-cyan-500/25 shadow-[0_0_40px_-12px_rgba(6,182,212,0.35)]";
  }
  if (accent === "emerald") {
    return "ring-1 ring-emerald-500/25 shadow-[0_0_40px_-12px_rgba(16,185,129,0.32)]";
  }
  return "ring-1 ring-violet-500/25 shadow-[0_0_40px_-12px_rgba(139,92,246,0.35)]";
}

function accentBar(accent: CommandCenterAccent) {
  if (accent === "cyan") return "from-cyan-500/90 to-cyan-500/0";
  if (accent === "emerald") return "from-emerald-500/90 to-emerald-500/0";
  return "from-violet-500/90 to-violet-500/0";
}

function activityIcon(kind: MockActivityKind) {
  const map = {
    lead: UserPlus,
    booking: CalendarCheck,
    followup: Mail,
    handoff: UserRound,
    social: Share2,
  } as const;
  return map[kind];
}

function activityIconWrap(kind: MockActivityKind) {
  const base = "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border";
  if (kind === "lead") return cn(base, "border-cyan-500/30 bg-cyan-500/10 text-cyan-200");
  if (kind === "booking") return cn(base, "border-emerald-500/30 bg-emerald-500/10 text-emerald-200");
  if (kind === "followup") return cn(base, "border-sky-500/30 bg-sky-500/10 text-sky-200");
  if (kind === "handoff") return cn(base, "border-amber-500/35 bg-amber-500/10 text-amber-100");
  return cn(base, "border-violet-500/30 bg-violet-500/10 text-violet-200");
}

export function CommandCenterMockPage() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-linear-to-br from-slate-950 via-slate-950 to-cyan-950/25 p-8 md:p-10">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-violet-600/10 blur-3xl"
          aria-hidden
        />
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-cyan-400/90">
          Revora AI Employee · Mercy AI Staff
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl md:leading-tight">
          Mercy AI Staff Command Center
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          One operating picture for AI employees that capture leads, qualify intent, propose bookings, draft follow-ups,
          escalate to humans when it matters, surface missed revenue, and feed marketing with real conversation signals —
          all before your calendar fills with busywork.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-500/35 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-100">
          <Sparkles className="h-3.5 w-3.5 text-amber-200" aria-hidden />
          Static mock — no database, no outbound actions
        </div>
      </section>

      <DashboardPageHeader
        eyebrow="System map"
        title="How the stack fits together"
        description="Each card is a slice of the Mercy AI Staff / Revora AI Employee loop. Counts and labels below are illustrative for internal demo and design review only."
        actions={
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-xs font-medium text-zinc-300">
            Mock overview
          </span>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {MOCK_COMMAND_OVERVIEW.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.id}
              className={cn(
                "relative overflow-hidden border-zinc-800/80 bg-zinc-950/55 shadow-none backdrop-blur-md",
                accentRing(item.accent)
              )}
            >
              <div className={cn("h-1 w-full bg-linear-to-r", accentBar(item.accent))} aria-hidden />
              <CardHeader className="space-y-3 pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base font-semibold text-zinc-50">{item.title}</CardTitle>
                  <span className="rounded-md border border-zinc-700/80 bg-zinc-900/60 p-2 text-zinc-300">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm leading-relaxed text-zinc-500">{item.blurb}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500">Workflow</h2>
          <p className="mt-1 max-w-2xl text-sm text-zinc-400">
            End-to-end signal path from first touch to marketing insight — simplified for stakeholders.
          </p>
        </div>
        <div
          className={cn(
            dashboardPanelClass,
            "flex flex-wrap items-center justify-center gap-2 px-4 py-6 backdrop-blur-md md:justify-between md:gap-1 md:px-6"
          )}
        >
          {MOCK_COMMAND_WORKFLOW.map((label, i) => (
            <div key={label} className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg border border-zinc-700/90 bg-slate-950/80 px-3 py-2 text-center text-xs font-medium text-zinc-200 md:min-w-[8.5rem] md:text-sm">
                {label}
              </span>
              {i < MOCK_COMMAND_WORKFLOW.length - 1 ? (
                <ChevronRight className="hidden h-5 w-5 shrink-0 text-zinc-600 md:block" aria-hidden />
              ) : null}
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-600">
          Arrows show the conceptual flow only; routing rules will be configurable when production wiring lands.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-5">
        <section className="space-y-4 lg:col-span-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500">Live activity</h2>
            <p className="mt-1 text-sm text-zinc-400">Representative events — not connected to a real inbox or CRM.</p>
          </div>
          <ul className="space-y-3">
            {MOCK_COMMAND_ACTIVITY.map((row) => {
              const Icon = activityIcon(row.kind);
              return (
                <li
                  key={row.id}
                  className={cn(
                    dashboardPanelClass,
                    "flex gap-4 border-zinc-800/80 p-4 backdrop-blur-md transition-colors hover:border-zinc-700/80"
                  )}
                >
                  <div className={activityIconWrap(row.kind)}>
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-medium text-zinc-100">{row.title}</p>
                      <span className="shrink-0 text-xs tabular-nums text-zinc-500">{row.timeLabel}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-500">{row.detail}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="space-y-4 lg:col-span-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500">KPI snapshot</h2>
            <p className="mt-1 text-sm text-zinc-400">Numbers are placeholders for dashboard tiles.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {MOCK_COMMAND_KPIS.map((k) => (
              <div
                key={k.id}
                className={cn(
                  dashboardPanelClass,
                  "border-zinc-800/80 bg-zinc-950/40 p-4 backdrop-blur-md"
                )}
              >
                <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">{k.label}</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-zinc-50">{k.value}</p>
                <p className="mt-1 text-xs text-zinc-600">{k.hint}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section
        className={cn(
          dashboardPanelClass,
          "border-cyan-500/20 bg-linear-to-r from-cyan-950/20 via-slate-950/40 to-violet-950/25 p-8 text-center backdrop-blur-md"
        )}
      >
        <h2 className="text-lg font-semibold text-zinc-50">Next step</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-zinc-100">
          Use this as the internal demo before production database wiring.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500">
          Supabase and Phase 4 hooks stay off this route by design. When the database blocker documented in{" "}
          <code className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-xs text-cyan-200/90">
            PHASE_3_DATABASE_BLOCKER.md
          </code>{" "}
          is resolved, replace mock slices with live queries — no change required to public marketing routes.
        </p>
      </section>
    </div>
  );
}
