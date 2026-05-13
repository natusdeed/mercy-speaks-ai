"use client";

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardPageHeader } from "@/dashboard/components/dashboard-page-header";
import { useDashboardAuth } from "@/dashboard/contexts/dashboard-auth-context";
import { fetchOpsToolCalls, type OpsToolCallsPayload } from "@/dashboard/lib/dashboard-ops-read-api";
import {
  dashboardPanelClass,
  dashboardTableBodyRowClass,
  dashboardTableClass,
  dashboardTableHeadRowClass,
  dashboardTableTdClass,
  dashboardTableThClass,
} from "@/dashboard/lib/dashboard-styles";
import { formatOpsDateTime } from "@/dashboard/lib/ops-format";
import { cn } from "@/lib/utils";
import { Activity, Wrench } from "lucide-react";

type Row = OpsToolCallsPayload["tool_calls"][number];

function fmtMs(ms: number | null): string {
  if (ms == null) return "—";
  return `${ms.toLocaleString()} ms`;
}

export function RealToolCallsPage() {
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
    const r = await fetchOpsToolCalls(token);
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
    setRows(r.data.tool_calls);
  }, [getAccessToken, logout, navigate]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Phase 4 · Live data (read-only)"
        title="Tool call telemetry"
        description="Recent tool executions tied to agent runs: name, outcome, parent run, and timing. Useful for proving automation ROI and debugging stuck workflows."
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
          "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-cyan-400/35 before:to-transparent"
        )}
      >
        <CardContent className="p-0">
          <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 px-4 py-3">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
              <Wrench className="h-3.5 w-3.5 text-cyan-300/90" aria-hidden />
              <span>Table · tool_calls</span>
            </div>
            {loading ? <span className="text-xs text-zinc-500">Loading…</span> : null}
          </div>
          <div className={cn("overflow-x-auto p-2", dashboardPanelClass)}>
            <table className={dashboardTableClass}>
              <thead>
                <tr className={dashboardTableHeadRowClass}>
                  <th className={dashboardTableThClass}>Tool</th>
                  <th className={dashboardTableThClass}>Status</th>
                  <th className={dashboardTableThClass}>Agent run</th>
                  <th className={dashboardTableThClass}>Started</th>
                  <th className={dashboardTableThClass}>Duration</th>
                </tr>
              </thead>
              <tbody>
                {!loading && rows.length === 0 ? (
                  <tr className={dashboardTableBodyRowClass}>
                    <td className={cn(dashboardTableTdClass, "text-zinc-500")} colSpan={5}>
                      No tool calls returned.
                    </td>
                  </tr>
                ) : null}
                {rows.map((row) => (
                  <tr key={row.id} className={dashboardTableBodyRowClass}>
                    <td className={dashboardTableTdClass}>
                      <div className="font-medium text-slate-100">{row.tool_name}</div>
                      <div className="font-mono text-[11px] text-zinc-500">{row.id}</div>
                    </td>
                    <td className={dashboardTableTdClass}>{row.status}</td>
                    <td className={cn(dashboardTableTdClass, "font-mono text-xs text-zinc-300")}>
                      {row.agent_run_id}
                    </td>
                    <td className={dashboardTableTdClass}>{formatOpsDateTime(row.started_at)}</td>
                    <td className={dashboardTableTdClass}>{fmtMs(row.duration_ms)}</td>
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
