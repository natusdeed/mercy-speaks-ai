"use client";

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardPageHeader } from "@/dashboard/components/dashboard-page-header";
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
import { formatOpsDateTime, formatOpsMoney } from "@/dashboard/lib/ops-format";
import { cn } from "@/lib/utils";
import { Activity, PiggyBank } from "lucide-react";

type Row = OpsMissedRevenuePayload["missed_revenue_events"][number];

export function RealMissedRevenuePage() {
  const navigate = useNavigate();
  const { getAccessToken, logout } = useDashboardAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Phase 4 · Live data (read-only)"
        title="Missed revenue signals"
        description="Structured leakage events your automation stack detected: type, severity, plain-language reason, estimated dollars at risk, recovery flags, and when the signal was logged."
        actions={
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-100">
            <Activity className="h-3.5 w-3.5 text-cyan-200" aria-hidden />
            Read-only
          </span>
        }
      />

      {error ? (
        <Card className="border-rose-500/30 bg-rose-950/30">
          <CardContent className="p-4 text-sm text-rose-100">{error}</CardContent>
        </Card>
      ) : null}

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
          <div className={cn("overflow-x-auto p-2", dashboardPanelClass)}>
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
                {!loading && rows.length === 0 ? (
                  <tr className={dashboardTableBodyRowClass}>
                    <td className={cn(dashboardTableTdClass, "text-zinc-500")} colSpan={6}>
                      No missed revenue events returned.
                    </td>
                  </tr>
                ) : null}
                {rows.map((row) => (
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
