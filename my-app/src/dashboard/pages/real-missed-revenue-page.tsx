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
import {
  fetchOpsMissedRevenue,
  type OpsMissedRevenuePayload,
} from "@/dashboard/lib/dashboard-ops-read-api";
import {
  dashboardPanelClass,
  dashboardTableBodyRowClass,
  dashboardTableClass,
  dashboardTableHeadRowClass,
  dashboardTableTdClass,
  dashboardTableThClass,
} from "@/dashboard/lib/dashboard-styles";
import { matchesOpsSearch, matchesOpsStatusFilter } from "@/dashboard/lib/ops-client-filters";
import { buildMissedRevenueKpis, stringFilterOptions } from "@/dashboard/lib/ops-kpi-stats";
import { formatOpsDateTime, formatOpsMoney } from "@/dashboard/lib/ops-format";
import { cn } from "@/lib/utils";
import { PiggyBank } from "lucide-react";

type Row = OpsMissedRevenuePayload["missed_revenue_events"][number];

export function RealMissedRevenuePage() {
  const navigate = useNavigate();
  const { getAccessToken, logout } = useDashboardAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");

  const load = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;
    setLoading(true);
    setError(null);
    const r = await fetchOpsMissedRevenue(token);
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
    setRows(r.data.missed_revenue_events);
  }, [getAccessToken, logout, navigate]);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(
    () =>
      rows.filter(
        (row) =>
          matchesOpsStatusFilter(severityFilter, row.severity) &&
          matchesOpsSearch(search, [row.event_type, row.severity, row.reason, row.id])
      ),
    [rows, search, severityFilter]
  );

  const kpis = useMemo(() => buildMissedRevenueKpis(rows), [rows]);
  const severityOptions = useMemo(() => stringFilterOptions(rows.map((r) => r.severity)), [rows]);
  const filteredView = Boolean(search.trim() || severityFilter);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Phase 4 · Live data (read-only)"
        title="Missed revenue signals"
        description="Structured leakage events your automation stack detected: type, severity, plain-language reason, estimated dollars at risk, recovery flags, and when the signal was logged."
        actions={<OpsLiveReadonlyBadge />}
      />

      {error ? <OpsErrorState message={error} onRetry={() => void load()} retrying={loading} /> : null}

      <OpsKpiGrid items={kpis} loading={loading && !error} />

      <Card
        className={cn(
          "relative overflow-hidden border-zinc-800/80 bg-zinc-950/60 shadow-none backdrop-blur-md",
          "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-amber-400/35 before:to-transparent"
        )}
      >
        <CardContent className="p-0">
          <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 px-4 py-3">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
              <PiggyBank className="h-3.5 w-3.5 text-amber-300/90" aria-hidden />
              <span>Table · missed_revenue_events</span>
            </div>
            {loading ? <span className="text-xs text-zinc-500">Loading…</span> : null}
          </div>

          <div className="border-b border-zinc-800/80 p-2">
            <OpsTableToolbar
              searchId="ops-missed-revenue-search"
              searchPlaceholder="Event type, severity, reason, id…"
              searchValue={search}
              onSearchChange={setSearch}
              statusFilterId="ops-missed-revenue-severity"
              statusLabel="Severity"
              statusValue={severityFilter}
              statusOptions={severityOptions}
              onStatusChange={setSeverityFilter}
              totalCount={rows.length}
              visibleCount={filtered.length}
              loading={loading}
            />
          </div>

          <div className={cn("overflow-x-auto p-2", dashboardPanelClass)}>
            {!loading && filtered.length === 0 ? (
              <OpsEmptyState
                icon={PiggyBank}
                filtered={filteredView && rows.length > 0}
                title={filteredView && rows.length > 0 ? "No signals match your filters" : "No missed revenue signals yet"}
                description={
                  filteredView && rows.length > 0
                    ? "Try clearing search or choosing a different severity. Filters are client-side only and never change Supabase."
                    : "When your automation stack detects revenue leakage, structured signals will appear here. This screen is live read-only."
                }
              />
            ) : (
              <table className={dashboardTableClass}>
                <thead>
                  <tr className={dashboardTableHeadRowClass}>
                    <th className={dashboardTableThClass}>Event</th>
                    <th className={dashboardTableThClass}>Severity</th>
                    <th className={dashboardTableThClass}>Reason</th>
                    <th className={dashboardTableThClass}>Est. value</th>
                    <th className={dashboardTableThClass}>Recovered</th>
                    <th className={dashboardTableThClass}>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr key={row.id} className={dashboardTableBodyRowClass}>
                      <td className={dashboardTableTdClass}>
                        <div className="font-medium text-slate-100">{row.event_type}</div>
                        <div className="font-mono text-[11px] text-zinc-500">{row.id}</div>
                      </td>
                      <td className={dashboardTableTdClass}>{row.severity}</td>
                      <td className={cn(dashboardTableTdClass, "max-w-md truncate")}>{row.reason}</td>
                      <td className={dashboardTableTdClass}>{formatOpsMoney(row.estimated_value)}</td>
                      <td className={dashboardTableTdClass}>{row.recovered ? "Yes" : "No"}</td>
                      <td className={dashboardTableTdClass}>{formatOpsDateTime(row.created_at)}</td>
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
