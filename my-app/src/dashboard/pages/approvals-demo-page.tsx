import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardPageHeader } from "@/dashboard/components/dashboard-page-header";
import { MOCK_APPROVAL_ITEMS, type MockApprovalItem, type MockApprovalRisk } from "@/dashboard/content/approvals-mock-data";
import { dashboardPanelClass } from "@/dashboard/lib/dashboard-styles";
import { cn } from "@/lib/utils";
import { Check, Shield, Sparkles, X } from "lucide-react";

type Decision = "pending" | "approved" | "rejected";

function riskStyles(risk: MockApprovalRisk) {
  if (risk === "High") return "border-rose-500/40 bg-rose-500/10 text-rose-100";
  if (risk === "Medium") return "border-amber-500/40 bg-amber-500/10 text-amber-100";
  return "border-emerald-500/35 bg-emerald-500/10 text-emerald-100";
}

function channelStyles(channel: MockApprovalItem["channel"]) {
  const base = "rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider";
  if (channel === "SMS") return cn(base, "border-cyan-500/35 bg-cyan-500/10 text-cyan-100");
  if (channel === "Email") return cn(base, "border-sky-500/35 bg-sky-500/10 text-sky-100");
  if (channel === "Voice script") return cn(base, "border-violet-500/35 bg-violet-500/10 text-violet-100");
  if (channel === "Social draft") return cn(base, "border-fuchsia-500/35 bg-fuchsia-500/10 text-fuchsia-100");
  return cn(base, "border-amber-500/35 bg-amber-500/10 text-amber-100");
}

export function ApprovalsDemoPage() {
  const [decisions, setDecisions] = useState<Record<string, Decision>>(() =>
    Object.fromEntries(MOCK_APPROVAL_ITEMS.map((i) => [i.id, "pending" as const]))
  );

  const counts = useMemo(() => {
    let pending = 0;
    let approved = 0;
    let rejected = 0;
    for (const item of MOCK_APPROVAL_ITEMS) {
      const d = decisions[item.id] ?? "pending";
      if (d === "pending") pending += 1;
      else if (d === "approved") approved += 1;
      else rejected += 1;
    }
    return { pending, approved, rejected };
  }, [decisions]);

  function setDecision(id: string, next: Exclude<Decision, "pending">) {
    setDecisions((prev) => ({ ...prev, [id]: next }));
  }

  function resetAll() {
    setDecisions(Object.fromEntries(MOCK_APPROVAL_ITEMS.map((i) => [i.id, "pending" as const])));
  }

  return (
    <div className="space-y-10">
      <DashboardPageHeader
        eyebrow="Phase 4 preview · Human in the loop"
        title="Approvals queue"
        description="Govern high-impact AI outputs before they reach customers. Approve and Reject buttons below only update this browser session — they do not send messages, write to Supabase, or trigger workflows."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-100">
              <Sparkles className="h-3.5 w-3.5 text-amber-200" aria-hidden />
              Mock data only
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-zinc-700 bg-zinc-950/60 text-xs text-zinc-200 hover:bg-zinc-900/80"
              onClick={resetAll}
            >
              Reset demo state
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {(
          [
            { label: "Awaiting review", value: counts.pending, hint: "Session state" },
            { label: "Approved (mock)", value: counts.approved, hint: "Local UI only" },
            { label: "Rejected (mock)", value: counts.rejected, hint: "No side effects" },
          ] as const
        ).map((stat) => (
          <Card
            key={stat.label}
            className={cn(
              "relative overflow-hidden border-zinc-800/80 bg-zinc-950/60 shadow-none backdrop-blur-md",
              "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-violet-400/35 before:to-transparent"
            )}
          >
            <CardContent className="p-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">{stat.hint}</p>
              <p className="mt-2 text-sm font-medium text-zinc-200">{stat.label}</p>
              <p className="mt-4 font-mono text-3xl font-semibold tabular-nums text-zinc-50">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500">Review inbox</h2>
            <p className="mt-1 max-w-2xl text-sm text-zinc-400">
              Cards mirror what a production approvals rail could feel like after Phase 4 database work. Until then, treat every action as a
              prototype control with zero integrations.
            </p>
          </div>
          <p className="text-xs text-zinc-600">No email, SMS, bookings, or social posts are sent from this page.</p>
        </div>

        <ul className="grid gap-4 lg:grid-cols-1">
          {MOCK_APPROVAL_ITEMS.map((item) => {
            const decision = decisions[item.id] ?? "pending";
            return (
              <li key={item.id}>
                <Card
                  className={cn(
                    dashboardPanelClass,
                    "border-zinc-800/80 bg-zinc-950/50 shadow-none backdrop-blur-md transition-colors",
                    decision === "approved" && "border-emerald-500/25 ring-1 ring-emerald-500/15",
                    decision === "rejected" && "border-zinc-800 opacity-75"
                  )}
                >
                  <CardContent className="space-y-4 p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={channelStyles(item.channel)}>{item.channel}</span>
                        <span className={cn("rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider", riskStyles(item.risk))}>
                          {item.risk} risk
                        </span>
                        {decision === "approved" ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-200">
                            <Check className="h-3 w-3" aria-hidden />
                            Approved · UI only
                          </span>
                        ) : null}
                        {decision === "rejected" ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-zinc-600 bg-zinc-900/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                            <X className="h-3 w-3" aria-hidden />
                            Rejected · UI only
                          </span>
                        ) : null}
                      </div>
                      <p className="text-xs text-zinc-500">{item.createdAtLabel}</p>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold tracking-tight text-zinc-50">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.summary}</p>
                      <p className="mt-3 text-xs text-zinc-500">
                        <span className="font-medium text-zinc-400">Requested by:</span> {item.requestedBy}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 border-t border-zinc-800/80 pt-4">
                      <Button
                        type="button"
                        size="sm"
                        disabled={decision !== "pending"}
                        className="bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40"
                        onClick={() => setDecision(item.id, "approved")}
                      >
                        <Check className="mr-1.5 h-4 w-4" aria-hidden />
                        Approve (demo)
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={decision !== "pending"}
                        className="border-zinc-700 bg-transparent text-zinc-200 hover:bg-zinc-900/80 disabled:opacity-40"
                        onClick={() => setDecision(item.id, "rejected")}
                      >
                        <X className="mr-1.5 h-4 w-4" aria-hidden />
                        Reject (demo)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>

      <Card className="border-zinc-800/80 bg-zinc-950/40 shadow-none backdrop-blur-md">
        <CardContent className="flex flex-wrap items-center gap-3 p-4 text-sm text-zinc-400">
          <Shield className="h-4 w-4 shrink-0 text-cyan-400/80" aria-hidden />
          <p>
            When Supabase-backed approvals ship, these controls will write audit events and optionally release outbound content. For now, refresh
            the page or use <span className="text-zinc-200">Reset demo state</span> to return every card to pending.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
