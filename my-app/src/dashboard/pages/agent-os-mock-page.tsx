import { Card, CardContent } from "@/components/ui/card";
import { DashboardPageHeader } from "@/dashboard/components/dashboard-page-header";
import {
  MOCK_AGENT_OS_AGENTS,
  MOCK_AGENT_OS_STATS,
  type MockAgentAccent,
} from "@/dashboard/content/agent-os-mock-data";
import { dashboardPanelClass } from "@/dashboard/lib/dashboard-styles";
import { cn } from "@/lib/utils";
import {
  Bot,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

function accentRing(accent: MockAgentAccent) {
  return accent === "cyan"
    ? "ring-1 ring-cyan-500/25 shadow-[0_0_40px_-12px_rgba(6,182,212,0.35)]"
    : "ring-1 ring-violet-500/25 shadow-[0_0_40px_-12px_rgba(139,92,246,0.35)]";
}

function accentGlowBar(accent: MockAgentAccent) {
  return accent === "cyan" ? "from-cyan-500/80 to-cyan-500/0" : "from-violet-500/80 to-violet-500/0";
}

function accentPill(accent: MockAgentAccent) {
  return accent === "cyan"
    ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-200"
    : "border-violet-500/30 bg-violet-500/10 text-violet-200";
}

const STAT_ICONS = {
  runs: CalendarClock,
  rate: TrendingUp,
  tasks: CheckCircle2,
  approvals: ClipboardList,
} as const;

export function AgentOsMockPage() {
  const s = MOCK_AGENT_OS_STATS;

  return (
    <div className="space-y-10">
      <DashboardPageHeader
        eyebrow="AI Employee Operating System"
        title="Digital workforce — preview"
        description="A premium layout for how Mercy AI routes work across specialized agents. Everything below is static mock data for design review; it does not read from Supabase or live runs."
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
            {
              key: "runs",
              label: "Runs today",
              value: s.runsToday.toLocaleString(),
              hint: "Simulated org-wide volume",
            },
            {
              key: "rate",
              label: "Success rate",
              value: `${s.successRatePct.toFixed(1)}%`,
              hint: "Mock quality signal",
            },
            {
              key: "tasks",
              label: "Tasks completed",
              value: s.tasksCompleted.toLocaleString(),
              hint: "Follow-ups & drafts closed",
            },
            {
              key: "approvals",
              label: "Pending approvals",
              value: s.pendingApprovals.toLocaleString(),
              hint: "Owner review queue",
            },
          ] as const
        ).map((item) => {
          const Icon = STAT_ICONS[item.key];
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
                <p className="mt-4 font-mono text-3xl font-semibold tabular-nums tracking-tight text-zinc-50">
                  {item.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500">Agent roster</h2>
            <p className="mt-1 max-w-2xl text-sm text-zinc-400">
              Each card represents a lane in the operating system. Production wiring waits on database completion —
              see <span className="text-zinc-300">PHASE_3_DATABASE_BLOCKER.md</span> in the repo root.
            </p>
          </div>
          <p className="text-xs text-zinc-600">No outbound email, SMS, bookings, or social posts from this page.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {MOCK_AGENT_OS_AGENTS.map((agent) => (
            <Card
              key={agent.id}
              className={cn(
                "relative overflow-hidden bg-zinc-950/40 backdrop-blur-md",
                dashboardPanelClass,
                accentRing(agent.accent)
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r",
                  accentGlowBar(agent.accent)
                )}
              />
              <CardContent className="space-y-4 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-zinc-900/80",
                        agent.accent === "cyan"
                          ? "border-cyan-500/35 text-cyan-300"
                          : "border-violet-500/35 text-violet-300"
                      )}
                    >
                      <Bot className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight text-zinc-50">{agent.title}</h3>
                      <p className="font-mono text-[11px] text-zinc-500">{agent.subtitle}</p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                      accentPill(agent.accent)
                    )}
                  >
                    {agent.lane}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-zinc-400">{agent.description}</p>

                <div className="grid grid-cols-2 gap-3 border-t border-zinc-800/80 pt-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">Runs (mock)</p>
                    <p className="mt-1 font-mono text-lg text-zinc-100">{agent.mockRunsToday}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">Success (mock)</p>
                    <p className="mt-1 font-mono text-lg text-zinc-100">{agent.mockSuccessPct}%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1.5 text-zinc-500">
                    <Target className="h-3.5 w-3.5 text-zinc-600" aria-hidden />
                    {agent.lastActivityLabel}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
