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
import { fetchOpsLeads, type OpsLeadsPayload } from "@/dashboard/lib/dashboard-ops-read-api";
import {
  dashboardPanelClass,
  dashboardTableBodyRowClass,
  dashboardTableClass,
  dashboardTableHeadRowClass,
  dashboardTableTdClass,
  dashboardTableThClass,
} from "@/dashboard/lib/dashboard-styles";
import { matchesOpsSearch, matchesOpsStatusFilter } from "@/dashboard/lib/ops-client-filters";
import { buildLeadOpsKpis, leadStatusFilterOptions } from "@/dashboard/lib/ops-kpi-stats";
import { LEAD_STATUS_LABEL } from "@/dashboard/lib/lead-labels";
import { formatOpsDateTime } from "@/dashboard/lib/ops-format";
import { cn } from "@/lib/utils";
import { Sparkles, Users } from "lucide-react";

type Row = OpsLeadsPayload["leads"][number];

function leadLabel(row: Row): string {
  return row.name?.trim() || row.email?.trim() || "—";
}

export function RealLeadOpsPage() {
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
    const r = await fetchOpsLeads(token);
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
    setRows(r.data.leads);
  }, [getAccessToken, logout, navigate]);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(
    () =>
      rows.filter(
        (row) =>
          matchesOpsStatusFilter(statusFilter, row.status) &&
          matchesOpsSearch(search, [
            row.name,
            row.email,
            row.source,
            row.service_interest,
            LEAD_STATUS_LABEL[row.status],
            row.status,
          ])
      ),
    [rows, search, statusFilter]
  );

  const kpis = useMemo(() => buildLeadOpsKpis(rows), [rows]);
  const statusOptions = useMemo(() => leadStatusFilterOptions(rows), [rows]);
  const filteredView = Boolean(search.trim() || statusFilter);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Phase 4 · Live data (read-only)"
        title="Lead operations"
        description="Recent leads from Supabase: status, source, service interest, and intake timestamps. No edits or outbound automation from this screen."
        actions={<OpsLiveReadonlyBadge />}
      />

      {error ? <OpsErrorState message={error} onRetry={() => void load()} retrying={loading} /> : null}

      <OpsKpiGrid items={kpis} loading={loading && !error} />

      <Card
        className={cn(
          "relative overflow-hidden border-zinc-800/80 bg-zinc-950/60 shadow-none backdrop-blur-md",
          "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-cyan-400/35 before:to-transparent"
        )}
      >
        <CardContent className="p-0">
          <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300/90" aria-hidden />
                <span>Table · leads</span>
              </div>
              {loading ? <span className="text-xs text-zinc-500">Loading…</span> : null}
            </div>

            <div className="border-b border-zinc-800/80 p-2">
              <OpsTableToolbar
                searchId="ops-leads-search"
                searchPlaceholder="Name, email, source, service…"
                searchValue={search}
                onSearchChange={setSearch}
                statusFilterId="ops-leads-status"
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
                  icon={Users}
                  filtered={filteredView && rows.length > 0}
                  title={filteredView && rows.length > 0 ? "No leads match your filters" : "No leads yet"}
                  description={
                    filteredView && rows.length > 0
                      ? "Try clearing search or choosing a different status. Filters are client-side only and never change Supabase."
                      : "When Mercy AI captures leads, they will appear here automatically. This screen is live read-only — no outbound email, SMS, or booking actions."
                  }
                />
              ) : (
                <table className={dashboardTableClass}>
                  <thead>
                    <tr className={dashboardTableHeadRowClass}>
                      <th className={dashboardTableThClass}>Lead</th>
                      <th className={dashboardTableThClass}>Status</th>
                      <th className={dashboardTableThClass}>Source</th>
                      <th className={dashboardTableThClass}>Service needed</th>
                      <th className={dashboardTableThClass}>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row) => (
                      <tr key={row.id} className={dashboardTableBodyRowClass}>
                        <td className={dashboardTableTdClass}>
                          <div className="font-medium text-slate-100">{leadLabel(row)}</div>
                          {row.email ? <div className="text-xs text-zinc-500">{row.email}</div> : null}
                        </td>
                        <td className={dashboardTableTdClass}>{LEAD_STATUS_LABEL[row.status]}</td>
                        <td className={dashboardTableTdClass}>{row.source}</td>
                        <td className={dashboardTableTdClass}>{row.service_interest?.trim() || "—"}</td>
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
