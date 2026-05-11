import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardPageHeader } from "@/dashboard/components/dashboard-page-header";
import {
  MOCK_BEST_HOOKS,
  MOCK_CONTENT_APPROVALS,
  MOCK_CONTENT_CALENDAR,
  MOCK_MARKETING_AGENTS,
  MOCK_NEXT_ACTIONS,
  MOCK_PLATFORM_STATS,
  MOCK_SOCIAL_DRAFTS,
  MOCK_VIDEO_SCRIPTS,
  MOCK_WEEKLY_STRATEGY,
  type MockMarketingAccent,
} from "@/dashboard/content/marketing-social-mock-data";
import { dashboardPanelClass } from "@/dashboard/lib/dashboard-styles";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  CalendarRange,
  ClipboardCheck,
  Lightbulb,
  Megaphone,
  PenLine,
  Send,
  Sparkles,
  TrendingUp,
  Video,
} from "lucide-react";

const num = new Intl.NumberFormat("en-US");

function accentStyle(accent: MockMarketingAccent) {
  if (accent === "cyan") {
    return "ring-1 ring-cyan-500/25 shadow-[0_0_36px_-14px_rgba(6,182,212,0.4)]";
  }
  if (accent === "emerald") {
    return "ring-1 ring-emerald-500/25 shadow-[0_0_36px_-14px_rgba(16,185,129,0.35)]";
  }
  return "ring-1 ring-violet-500/25 shadow-[0_0_36px_-14px_rgba(139,92,246,0.38)]";
}

function accentBar(accent: MockMarketingAccent) {
  if (accent === "cyan") return "from-cyan-500/90 to-cyan-500/0";
  if (accent === "emerald") return "from-emerald-500/90 to-emerald-500/0";
  return "from-violet-500/90 to-violet-500/0";
}

function accentPill(accent: MockMarketingAccent) {
  if (accent === "cyan") return "border-cyan-500/30 bg-cyan-500/10 text-cyan-100/95";
  if (accent === "emerald") return "border-emerald-500/30 bg-emerald-500/10 text-emerald-100/95";
  return "border-violet-500/30 bg-violet-500/10 text-violet-100/95";
}

function draftStatusClass(status: (typeof MOCK_SOCIAL_DRAFTS)[number]["status"]) {
  const map = {
    Draft: "border-zinc-600 bg-zinc-900/70 text-zinc-300",
    "Ready for review": "border-amber-500/35 bg-amber-500/10 text-amber-100",
    Scheduled: "border-sky-500/35 bg-sky-500/10 text-sky-100",
  };
  return map[status];
}

export function MarketingSocialMockPage() {
  const strategy = MOCK_WEEKLY_STRATEGY;

  return (
    <div className="space-y-10">
      <DashboardPageHeader
        eyebrow="Marketing & Social · AI Employee system"
        title="Content engine — preview"
        description="Eight specialized agents collaborate on strategy, planning, copy, prompts, scheduling, community, and analytics. This screen is static mock data for UI review only — no Supabase, no outbound posts, and no scheduling API calls."
        actions={
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-100">
            <Sparkles className="h-3.5 w-3.5 text-amber-200" aria-hidden />
            Mock data only
          </span>
        }
      />

      {/* Agent roster */}
      <div>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500">AI employee roster</h2>
            <p className="mt-1 max-w-2xl text-sm text-zinc-400">
              Each agent owns a slice of the marketing loop. Counts are illustrative — not live telemetry.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {MOCK_MARKETING_AGENTS.map((agent) => (
            <Card
              key={agent.id}
              className={cn(
                "relative overflow-hidden border-zinc-800/80 bg-zinc-950/55 shadow-none backdrop-blur-md",
                accentStyle(agent.accent)
              )}
            >
              <div className={cn("h-1 w-full bg-linear-to-r", accentBar(agent.accent))} aria-hidden />
              <CardHeader className="space-y-2 pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base font-semibold leading-snug text-zinc-50">{agent.title}</CardTitle>
                  <Megaphone className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
                </div>
                <p className="font-mono text-[11px] text-zinc-500">{agent.subtitle}</p>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <p className="text-sm leading-relaxed text-zinc-400">{agent.description}</p>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800/80 pt-3">
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[11px] font-medium",
                      accentPill(agent.accent)
                    )}
                  >
                    {agent.mockTasks24h} tasks / 24h · mock
                  </span>
                  <span className="text-[11px] text-zinc-500">{agent.lastActivityLabel}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly strategy */}
        <Card className={cn("border-zinc-800/80 bg-zinc-950/50 shadow-none backdrop-blur-md", dashboardPanelClass)}>
          <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Weekly content strategy</p>
              <CardTitle className="mt-2 text-lg text-zinc-50">{strategy.weekLabel}</CardTitle>
            </div>
            <span className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-violet-300/90">
              <Lightbulb className="h-4 w-4" aria-hidden />
            </span>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-zinc-300">{strategy.theme}</p>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">Pillar beats</p>
              <ul className="list-inside list-disc space-y-1.5 text-sm text-zinc-400">
                {strategy.pillars.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="grid gap-3 rounded-lg border border-zinc-800/90 bg-zinc-950/40 p-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Audience</p>
                <p className="mt-1 text-sm text-zinc-300">{strategy.audienceFocus}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">CTA theme</p>
                <p className="mt-1 text-sm text-zinc-300">{strategy.ctaTheme}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform performance */}
        <Card className={cn("border-zinc-800/80 bg-zinc-950/50 shadow-none backdrop-blur-md", dashboardPanelClass)}>
          <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Platform performance</p>
              <CardTitle className="mt-2 text-lg text-zinc-50">Mock channel stats</CardTitle>
            </div>
            <span className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-cyan-300/90">
              <BarChart3 className="h-4 w-4" aria-hidden />
            </span>
          </CardHeader>
          <CardContent className="space-y-3">
            {MOCK_PLATFORM_STATS.map((p) => (
              <div
                key={p.platform}
                className="flex flex-col gap-2 rounded-lg border border-zinc-800/80 bg-zinc-950/35 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-zinc-100">{p.platform}</p>
                  <p className="font-mono text-xs text-zinc-500">{p.handle}</p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">Reach (mock)</p>
                    <p className="font-mono tabular-nums text-zinc-200">{num.format(p.reachMock)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">Eng. rate</p>
                    <p className="font-mono tabular-nums text-zinc-200">{p.engagementRatePct}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">Posts / wk</p>
                    <p className="font-mono tabular-nums text-zinc-200">{p.postsThisWeek}</p>
                  </div>
                </div>
                <p className="flex items-center gap-1 text-xs text-emerald-300/90 sm:justify-end">
                  <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                  {p.trendLabel}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 7-day calendar */}
      <Card className={cn("border-zinc-800/80 bg-zinc-950/50 shadow-none backdrop-blur-md", dashboardPanelClass)}>
        <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-2">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">7-day content calendar</p>
            <CardTitle className="mt-2 text-lg text-zinc-50">Scheduled beats (mock)</CardTitle>
          </div>
          <span className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-cyan-300/90">
            <CalendarRange className="h-4 w-4" aria-hidden />
          </span>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
            {MOCK_CONTENT_CALENDAR.map((d) => (
              <div
                key={d.day + d.dateLabel}
                className="rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-3"
              >
                <p className="text-xs font-semibold text-zinc-200">
                  {d.day} <span className="font-normal text-zinc-500">{d.dateLabel}</span>
                </p>
                <ul className="mt-3 space-y-3">
                  {d.slots.map((s, i) => (
                    <li key={`${d.day}-${i}`} className="border-l-2 border-cyan-500/40 pl-2">
                      <p className="font-mono text-[11px] text-cyan-300/90">{s.time}</p>
                      <p className="text-sm font-medium text-zinc-100">{s.topic}</p>
                      <p className="text-[11px] text-zinc-500">
                        {s.platform} · {s.format}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Post drafts */}
        <Card className={cn("border-zinc-800/80 bg-zinc-950/50 shadow-none backdrop-blur-md", dashboardPanelClass)}>
          <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Social post drafts</p>
              <CardTitle className="mt-2 text-lg text-zinc-50">Copy queue</CardTitle>
            </div>
            <span className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-violet-300/90">
              <PenLine className="h-4 w-4" aria-hidden />
            </span>
          </CardHeader>
          <CardContent className="space-y-4">
            {MOCK_SOCIAL_DRAFTS.map((d) => (
              <div key={d.id} className="rounded-lg border border-zinc-800/80 bg-zinc-950/35 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{d.platform}</p>
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[11px] font-medium",
                      draftStatusClass(d.status)
                    )}
                  >
                    {d.status}
                  </span>
                </div>
                <p className="mt-2 font-medium text-zinc-100">{d.headline}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{d.bodyPreview}</p>
              </div>
            ))}
            <p className="text-center text-xs text-zinc-600">Publishing is disabled in this preview.</p>
          </CardContent>
        </Card>

        {/* Video scripts */}
        <Card className={cn("border-zinc-800/80 bg-zinc-950/50 shadow-none backdrop-blur-md", dashboardPanelClass)}>
          <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Short-form video scripts</p>
              <CardTitle className="mt-2 text-lg text-zinc-50">Hook & beats</CardTitle>
            </div>
            <span className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-emerald-300/90">
              <Video className="h-4 w-4" aria-hidden />
            </span>
          </CardHeader>
          <CardContent className="space-y-4">
            {MOCK_VIDEO_SCRIPTS.map((v) => (
              <div key={v.id} className="rounded-lg border border-zinc-800/80 bg-zinc-950/35 p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-zinc-100">{v.title}</p>
                  <p className="font-mono text-xs text-zinc-500">~{v.durationSec}s · mock</p>
                </div>
                <p className="mt-3 border-l-2 border-violet-500/50 pl-3 text-sm italic text-violet-200/95">“{v.hook}”</p>
                <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-zinc-500">Beat outline</p>
                <ol className="mt-2 list-inside list-decimal space-y-1 text-sm text-zinc-400">
                  {v.beats.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ol>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Approvals */}
        <Card className={cn("border-zinc-800/80 bg-zinc-950/50 shadow-none backdrop-blur-md", dashboardPanelClass)}>
          <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Pending content approvals</p>
              <CardTitle className="mt-2 text-lg text-zinc-50">Human review queue</CardTitle>
            </div>
            <span className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-amber-300/90">
              <ClipboardCheck className="h-4 w-4" aria-hidden />
            </span>
          </CardHeader>
          <CardContent className="space-y-3">
            {MOCK_CONTENT_APPROVALS.map((a) => (
              <div
                key={a.id}
                className="flex flex-col gap-2 rounded-lg border border-zinc-800/80 bg-zinc-950/35 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-zinc-100">{a.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {a.type} · {a.submittedAtLabel}
                  </p>
                </div>
                <span
                  className={cn(
                    "w-fit rounded-full border px-2 py-0.5 text-[11px] font-medium",
                    a.priority === "High"
                      ? "border-rose-500/35 bg-rose-500/10 text-rose-100"
                      : "border-zinc-700 bg-zinc-900/80 text-zinc-400"
                  )}
                >
                  {a.priority}
                </span>
              </div>
            ))}
            <p className="text-center text-xs text-zinc-600">Approve / reject actions are not wired in this mock.</p>
          </CardContent>
        </Card>

        {/* Hooks + next actions */}
        <div className="space-y-6">
          <Card className={cn("border-zinc-800/80 bg-zinc-950/50 shadow-none backdrop-blur-md", dashboardPanelClass)}>
            <CardHeader className="pb-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Best hooks this week</p>
              <CardTitle className="mt-2 text-lg text-zinc-50">Scroll-stoppers (mock scoring)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_BEST_HOOKS.map((h) => (
                <div key={h.id} className="rounded-lg border border-zinc-800/70 bg-zinc-950/40 p-3">
                  <p className="text-sm font-medium text-zinc-100">“{h.text}”</p>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-cyan-100">
                      {h.scoreLabel}
                    </span>
                    <span className="text-zinc-500">{h.usedIn}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className={cn("border-zinc-800/80 bg-zinc-950/50 shadow-none backdrop-blur-md", dashboardPanelClass)}>
            <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-2">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Suggested next actions</p>
                <CardTitle className="mt-2 text-lg text-zinc-50">Coordinator handoff</CardTitle>
              </div>
              <span className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-cyan-300/90">
                <Send className="h-4 w-4" aria-hidden />
              </span>
            </CardHeader>
            <CardContent className="space-y-4">
              {MOCK_NEXT_ACTIONS.map((n) => (
                <div key={n.id} className="border-b border-zinc-800/60 pb-4 last:border-0 last:pb-0">
                  <p className="font-medium text-zinc-100">{n.title}</p>
                  <p className="mt-1 text-sm text-zinc-400">{n.detail}</p>
                  <p className="mt-2 font-mono text-[11px] text-zinc-500">{n.ownerAgent}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
