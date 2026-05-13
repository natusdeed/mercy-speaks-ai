"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardPageHeader } from "@/dashboard/components/dashboard-page-header";
import { OpsEmptyState } from "@/dashboard/components/ops-empty-state";
import { OpsErrorState } from "@/dashboard/components/ops-error-state";
import { OpsKpiGrid } from "@/dashboard/components/ops-kpi-grid";
import { OpsLiveReadonlyBadge } from "@/dashboard/components/ops-live-readonly-badge";
import { OpsTableToolbar } from "@/dashboard/components/ops-table-toolbar";
import { useDashboardAuth } from "@/dashboard/contexts/dashboard-auth-context";
import { fetchOpsAgentRuns, type OpsAgentRunsPayload } from "@/dashboard/lib/dashboard-ops-read-api";
import {
  dashboardPanelClass,
  dashboardTableBodyRowClass,
  dashboardTableClass,
  dashboardTableHeadRowClass,
  dashboardTableTdClass,
  dashboardTableThClass,
} from "@/dashboard/lib/dashboard-styles";
import { matchesOpsSearch, matchesOpsStatusFilter } from "@/dashboard/lib/ops-client-filters";
import { buildAgentRunKpis, stringFilterOptions } from "@/dashboard/lib/ops-kpi-stats";
import { formatOpsDateTime } from "@/dashboard/lib/ops-format";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

type Row = OpsAgentRunsPayload["agent_runs"][number];

function fmtMs(ms: number | null): string {
  if (ms == null) return "—";
  return `${ms.toLocaleString()} ms`;
}

export function RealAgentRunsPage() {
  const navigate = useNavigate();
  const { getAccessToken, logout } = useDashboardAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const load = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;
    setLoading(true);
    setError(null);
    const r = await fetchOpsAgentRuns(token);
    setLoading(false);
    if (!r.ok) {
      if (r.status === 401) {
        logout();
        navigate("/dashboard/login", { replace: true });
        return;
      }
      setError(r.message);
      return;
    }
    setRows(r.data.agent_runs);
  }, [getAccessToken, logout, navigate]);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(
    () =>
      rows.filter(
        (row) =>
          matchesOpsStatusFilter(statusFilter, row.status) &&
          matchesOpsSearch(search, [row.agent_name, row.status, row.trigger_source, row.id])
      ),
    [rows, search, statusFilter]
  );

  const kpis = useMemo(() => buildAgentRunKpis(rows), [rows]);
  const statusOptions = useMemo(() => stringFilterOptions(rows.map((r) => r.status)), [rows]);
  const filteredView = Boolean(search.trim() || statusFilter);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Phase 4 · Live data (read-only)"
        title="AI employee runs"
        description="Recent orchestration runs: which agent executed, how it was triggered, lifecycle status, and wall-clock duration when recorded."
        actions={<OpsLiveReadonlyBadge />}
      />

      {error ? <OpsErrorState message={error} onRetry={() => void load()} retrying={loading} /> : null}

      <OpsKpiGrid items={kpis} loading={loading && !error} />

      <Card
        className={cn(
          "relative overflow-hidden border-zinc-800/80 bg-zinc-950/60 shadow-none backdrop-blur-md",
          "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-violet-400/35 before:to-transparent"
        )}
      >
        <CardContent className="p-0">
          <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 px-4 py-3">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
              <Bot className="h-3.5 w-3.5 text-violet-300/90" aria-hidden />
              <span>Table · agent_runs</span>
            </div>
            {loading ? <span className="text-xs text-zinc-500">Loading…</span> : null}
          </div>

          <div className="border-b border-zinc-800/80 p-2">
            <OpsTableToolbar
              searchId="ops-agent-runs-search"
              searchPlaceholder="Agent, status, trigger, id…"
              searchValue={search}
              onSearchChange={setSearch}
              statusFilterId="ops-agent-runs-status"
              statusValue={statusFilter}
              statusOptions={statusOptions}
              onStatusChange={setStatusFilter}
              totalCount={rows.length}
              visibleCount={filtered.length}
              loading={loading}
            />
          </div>

          <div className={cn("overflow-x-auto p-2", dashboardPanelClass)}>
            {!loading && filtered.length === 0 ? (
              <OpsEmptyState
                icon={Bot}
                filtered={filteredView && rows.length > 0}
                title={filteredView && rows.length > 0 ? "No runs match your filters" : "No agent runs yet"}
                description={
                  filteredView && rows.length > 0
                    ? "Try clearing search or choosing a different status. Filters are client-side only and never change Supabase."
                    : "When your AI employees execute workflows, orchestration runs will appear here. This screen is live read-only — no reruns or cancellations."
                }
              />
            ) : (
              <table className={dashboardTableClass}>
                <thead>
                  <tr className={dashboardTableHeadRowClass}>
                    <th className={dashboardTableThClass}>Agent</th>
                    <th className={dashboardTableThClass}>Status</th>
                    <th className={dashboardTableThClass}>Trigger</th>
                    <th className={dashboardTableThClass}>Started</th>
                    <th className={dashboardTableThClass}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr key={row.id} className={dashboardTableBodyRowClass}>
                      <td className={dashboardTableTdClass}>
                        <div className="font-medium text-slate-100">{row.agent_name}</div>
                        <div className="font-mono text-[11px] text-zinc-500">{row.id}</div>
                      </td>
                      <td className={dashboardTableTdClass}>{row.status}</td>
                      <td className={dashboardTableTdClass}>{row.trigger_source}</td>
                      <td className={dashboardTableTdClass}>{formatOpsDateTime(row.started_at)}</td>
                      <td className={dashboardTableTdClass}>{fmtMs(row.duration_ms)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
