import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DashboardPageHeader } from "@/dashboard/components/dashboard-page-header";
import { ConversationChannelBadge, ConversationStatusBadge } from "@/dashboard/components/conversation-badges";
import { useDashboardAuth } from "@/dashboard/contexts/dashboard-auth-context";
import {
  dashboardInputClass,
  dashboardPanelClass,
  dashboardSelectMdClass,
  dashboardTableBodyRowClass,
  dashboardTableClass,
  dashboardTableHeadRowClass,
  dashboardTableTdClass,
  dashboardTableThClass,
} from "@/dashboard/lib/dashboard-styles";
import { fetchConversationsList } from "@/dashboard/lib/dashboard-conversations-api";
import { formatLeadDateTime } from "@/dashboard/lib/lead-display";
import {
  CONVERSATION_CHANNELS,
  CONVERSATION_STATUSES,
  type ConversationChannel,
  type ConversationListItemDto,
  type ConversationStatus,
} from "@/dashboard/types/conversations";
import { CONVERSATION_CHANNEL_LABEL, CONVERSATION_STATUS_LABEL } from "@/dashboard/lib/conversation-labels";
import { ChevronRight, UserCircle2 } from "lucide-react";

export function ConversationsPage() {
  const navigate = useNavigate();
  const { getAccessToken, logout } = useDashboardAuth();
  const [rows, setRows] = useState<ConversationListItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qInput, setQInput] = useState("");
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [channelFilter, setChannelFilter] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setQ(qInput), 300);
    return () => clearTimeout(t);
  }, [qInput]);

  const load = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;
    setLoading(true);
    setError(null);
    const r = await fetchConversationsList(token, {
      q,
      status: statusFilter || undefined,
      channel: channelFilter || undefined,
    });
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
    setRows(r.conversations);
  }, [getAccessToken, logout, navigate, q, statusFilter, channelFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  const activeFilters = Boolean(q || statusFilter || channelFilter);

  return (
    <div className="space-y-10">
      <DashboardPageHeader
        eyebrow="Channels"
        title="Conversations"
        description="Cross-channel threads with intent, outcomes, and lead links. All reads use the authenticated dashboard API."
        actions={
          <p className="text-sm tabular-nums text-zinc-500">
            <span className="font-medium text-zinc-200">{loading ? "—" : rows.length}</span>
            {!loading ? (
              <span>
                {" "}
                {rows.length === 1 ? "thread" : "threads"}
                {activeFilters ? " · filtered" : ""}
              </span>
            ) : null}
          </p>
        }
      />

      {error ? (
        <Card className="border-red-900/50 bg-red-950/20 shadow-none">
          <CardContent className="py-3 text-sm text-red-300">{error}</CardContent>
        </Card>
      ) : null}

      <div
        className={cn(
          "flex flex-col gap-5 p-5 md:flex-row md:flex-wrap md:items-end",
          dashboardPanelClass
        )}
      >
        <div className="min-w-[200px] flex-1">
          <label htmlFor="conv-search" className="mb-1.5 block text-xs font-medium text-zinc-500">
            Search
          </label>
          <input
            id="conv-search"
            type="search"
            value={qInput}
            onChange={(e) => setQInput(e.target.value)}
            placeholder="Contact, preview, intent, outcome…"
            className={dashboardInputClass}
          />
        </div>
        <div className="w-full min-w-[140px] md:w-44">
          <label htmlFor="filter-conv-status" className="mb-1.5 block text-xs font-medium text-zinc-500">
            Status
          </label>
          <select
            id="filter-conv-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={dashboardSelectMdClass}
          >
            <option value="">All</option>
            {CONVERSATION_STATUSES.map((s: ConversationStatus) => (
              <option key={s} value={s}>
                {CONVERSATION_STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full min-w-[140px] md:w-44">
          <label htmlFor="filter-conv-channel" className="mb-1.5 block text-xs font-medium text-zinc-500">
            Channel
          </label>
          <select
            id="filter-conv-channel"
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className={dashboardSelectMdClass}
          >
            <option value="">All</option>
            {CONVERSATION_CHANNELS.map((c: ConversationChannel) => (
              <option key={c} value={c}>
                {CONVERSATION_CHANNEL_LABEL[c]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={cn("overflow-hidden", dashboardPanelClass)}>
        <div className="overflow-x-auto">
          <table className={dashboardTableClass}>
            <thead>
              <tr className={dashboardTableHeadRowClass}>
                <th className={cn(dashboardTableThClass, "text-left")}>Contact</th>
                <th className={cn(dashboardTableThClass, "text-left")}>Channel</th>
                <th className={cn(dashboardTableThClass, "text-left")}>Last message</th>
                <th className={cn(dashboardTableThClass, "text-left")}>Status</th>
                <th className={cn(dashboardTableThClass, "text-left")}>Intent</th>
                <th className={cn(dashboardTableThClass, "text-left")}>Outcome</th>
                <th className={cn(dashboardTableThClass, "text-left")}>Lead</th>
                <th className={cn(dashboardTableThClass, "text-left")}>Updated</th>
                <th className={cn(dashboardTableThClass, "text-right")}> </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className={dashboardTableBodyRowClass}>
                    {Array.from({ length: 9 }).map((__, j) => (
                      <td key={j} className={dashboardTableTdClass}>
                        <div className="h-4 animate-pulse rounded bg-zinc-800/80" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : rows.length === 0 ? (
                <tr className={dashboardTableBodyRowClass}>
                  <td colSpan={9} className={cn(dashboardTableTdClass, "py-16 text-center text-sm text-zinc-500")}>
                    No conversations yet. When the widget or voice layer writes threads to Supabase, they will show up
                    here with previews and lead links.
                  </td>
                </tr>
              ) : (
                rows.map((c) => (
                  <tr
                    key={c.id}
                    className={cn(dashboardTableBodyRowClass, "cursor-pointer")}
                    onClick={() => navigate(`/dashboard/conversations/${c.id}`)}
                  >
                    <td className={cn(dashboardTableTdClass, "font-medium text-zinc-100")}>{c.contactName}</td>
                    <td className={dashboardTableTdClass}>
                      <ConversationChannelBadge channel={c.channel} />
                    </td>
                    <td className={cn(dashboardTableTdClass, "max-w-[220px] truncate text-zinc-400")}>
                      {c.lastMessagePreview ?? "—"}
                    </td>
                    <td className={dashboardTableTdClass}>
                      <ConversationStatusBadge status={c.status} />
                    </td>
                    <td className={cn(dashboardTableTdClass, "max-w-[140px] truncate text-zinc-500")}>
                      {c.intent ?? "—"}
                    </td>
                    <td className={cn(dashboardTableTdClass, "max-w-[140px] truncate text-zinc-500")}>
                      {c.outcome ?? "—"}
                    </td>
                    <td className={dashboardTableTdClass}>
                      {c.linkedLead ? (
                        <span className="inline-flex items-center gap-1 text-xs text-cyan-200/90">
                          <UserCircle2 className="h-3.5 w-3.5 opacity-70" aria-hidden />
                          <span className="max-w-[120px] truncate">{c.linkedLead.displayName}</span>
                        </span>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>
                    <td className={cn(dashboardTableTdClass, "whitespace-nowrap text-zinc-500 tabular-nums")}>
                      {formatLeadDateTime(c.lastActivityAt)}
                    </td>
                    <td className={cn(dashboardTableTdClass, "text-right")} onClick={(e) => e.stopPropagation()}>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="gap-0.5 text-zinc-400 hover:text-zinc-100"
                        onClick={() => navigate(`/dashboard/conversations/${c.id}`)}
                        aria-label={`Open conversation ${c.contactName}`}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
