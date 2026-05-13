"use client";

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardPageHeader } from "@/dashboard/components/dashboard-page-header";
import { useDashboardAuth } from "@/dashboard/contexts/dashboard-auth-context";
import { fetchOpsTasks, type OpsTasksPayload } from "@/dashboard/lib/dashboard-ops-read-api";
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
import { Activity, ListTodo } from "lucide-react";

type Row = OpsTasksPayload["tasks"][number];

export function RealTasksPage() {
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
    const r = await fetchOpsTasks(token);
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
    setRows(r.data.tasks);
  }, [getAccessToken, logout, navigate]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Phase 4 · Live data (read-only)"
        title="Follow-up tasks"
        description="Operational follow-ups created by your AI employees: titles, workflow state, priority, due dates, and assignee hints. No task mutations from this screen."
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
          "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-emerald-400/35 before:to-transparent"
        )}
      >
        <CardContent className="p-0">
          <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 px-4 py-3">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
              <ListTodo className="h-3.5 w-3.5 text-emerald-300/90" aria-hidden />
              <span>Table · tasks</span>
            </div>
            {loading ? <span className="text-xs text-zinc-500">Loading…</span> : null}
          </div>
          <div className={cn("overflow-x-auto p-2", dashboardPanelClass)}>
            <table className={dashboardTableClass}>
              <thead>
                <tr className={dashboardTableHeadRowClass}>
                  <th className={dashboardTableThClass}>Title</th>
                  <th className={dashboardTableThClass}>Status</th>
                  <th className={dashboardTableThClass}>Priority</th>
                  <th className={dashboardTableThClass}>Due</th>
                  <th className={dashboardTableThClass}>Assigned to</th>
                </tr>
              </thead>
              <tbody>
                {!loading && rows.length === 0 ? (
                  <tr className={dashboardTableBodyRowClass}>
                    <td className={cn(dashboardTableTdClass, "text-zinc-500")} colSpan={5}>
                      No tasks returned.
                    </td>
                  </tr>
                ) : null}
                {rows.map((row) => (
                  <tr key={row.id} className={dashboardTableBodyRowClass}>
                    <td className={dashboardTableTdClass}>
                      <div className="font-medium text-slate-100">{row.title}</div>
                      <div className="font-mono text-[11px] text-zinc-500">{row.id}</div>
                    </td>
                    <td className={dashboardTableTdClass}>{row.status}</td>
                    <td className={dashboardTableTdClass}>{row.priority}</td>
                    <td className={dashboardTableTdClass}>{formatOpsDateTime(row.due_at)}</td>
                    <td className={dashboardTableTdClass}>{row.assigned_to?.trim() || "—"}</td>
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
