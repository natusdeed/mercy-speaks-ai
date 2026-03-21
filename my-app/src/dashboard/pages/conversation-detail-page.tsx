import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ConversationChannelBadge, ConversationStatusBadge } from "@/dashboard/components/conversation-badges";
import { dashboardPanelClass, dashboardTextareaClass } from "@/dashboard/lib/dashboard-styles";
import { useDashboardAuth } from "@/dashboard/contexts/dashboard-auth-context";
import {
  fetchConversationById,
  patchConversationRequest,
} from "@/dashboard/lib/dashboard-conversations-api";
import { formatLeadDateTime } from "@/dashboard/lib/lead-display";
import type { ConversationDetailDto } from "@/dashboard/types/conversations";
import {
  ArrowLeft,
  Bot,
  CalendarClock,
  ClipboardList,
  Link2,
  MessageSquare,
  Sparkles,
  StickyNote,
  User,
} from "lucide-react";

const internalNotesSchema = z.string().max(20000);

export function ConversationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAccessToken, logout } = useDashboardAuth();
  const [conversation, setConversation] = useState<ConversationDetailDto | null>(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingNotes, setSavingNotes] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleUnauthorized = useCallback(() => {
    logout();
    navigate("/dashboard/login", { replace: true });
  }, [logout, navigate]);

  const load = useCallback(async () => {
    if (!id) {
      setLoading(false);
      setError("Missing conversation id.");
      return;
    }
    const token = getAccessToken();
    if (!token) return;
    setLoading(true);
    setError(null);
    setNotFound(false);
    const r = await fetchConversationById(token, id);
    setLoading(false);
    if (!r.ok) {
      if (r.status === 401) {
        handleUnauthorized();
        return;
      }
      if (r.status === 404) {
        setConversation(null);
        setNotFound(true);
        return;
      }
      setError(r.message);
      setConversation(null);
      return;
    }
    setConversation(r.conversation);
    setNotesDraft(r.conversation.internalNotes ?? "");
  }, [getAccessToken, handleUnauthorized, id]);

  useEffect(() => {
    void load();
  }, [load]);

  async function saveNotes() {
    if (!id) return;
    const parsed = internalNotesSchema.safeParse(notesDraft);
    if (!parsed.success) {
      setError(parsed.error.flatten().formErrors[0] ?? "Notes are too long.");
      return;
    }
    const token = getAccessToken();
    if (!token) return;
    setSavingNotes(true);
    setError(null);
    const r = await patchConversationRequest(token, id, { internal_notes: parsed.data.trim() || null });
    setSavingNotes(false);
    if (!r.ok) {
      if (r.status === 401) {
        handleUnauthorized();
        return;
      }
      setError(r.message);
      return;
    }
    setConversation(r.conversation);
    setNotesDraft(r.conversation.internalNotes ?? "");
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="-ml-2 mb-2 gap-1.5 text-zinc-500 hover:text-zinc-100"
          >
            <Link to="/dashboard/conversations">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Conversations
            </Link>
          </Button>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Thread</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
                {loading ? "Loading…" : conversation?.contactName ?? "Conversation"}
              </h1>
              {!loading && conversation ? (
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <CalendarClock className="h-3.5 w-3.5" aria-hidden />
                    {formatLeadDateTime(conversation.lastActivityAt)}
                  </span>
                  {conversation.visitorId ? (
                    <span className="font-mono text-[11px] text-zinc-600">visitor:{conversation.visitorId}</span>
                  ) : null}
                </p>
              ) : null}
            </div>
            {!loading && conversation ? (
              <div className="flex flex-wrap items-center gap-2">
                <ConversationChannelBadge channel={conversation.channel} />
                <ConversationStatusBadge status={conversation.status} />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {error && (conversation || notFound) ? (
        <Card className="border-red-900/50 bg-red-950/20 shadow-none">
          <CardContent className="py-3 text-sm text-red-300">{error}</CardContent>
        </Card>
      ) : null}

      {loading ? (
        <div className="grid gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className={cn("shadow-none", dashboardPanelClass)}>
              <CardContent className="p-6">
                <div className="h-4 w-1/3 animate-pulse rounded bg-zinc-800/80" />
                <div className="mt-4 h-32 animate-pulse rounded-lg bg-zinc-800/60" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : notFound || !conversation ? (
        <Card className={cn("shadow-none", dashboardPanelClass)}>
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-sm text-zinc-400">
              {notFound
                ? "This conversation was not found."
                : error ?? "Unable to load this thread. Return to the list and try again."}
            </p>
            <Button asChild variant="outline">
              <Link to="/dashboard/conversations">Back to conversations</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className={cn("shadow-none", dashboardPanelClass)}>
              <CardHeader className="border-b border-zinc-800/80 pb-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Transcript</p>
                <p className="mt-1 text-sm text-zinc-500">
                  Parsed from stored JSON. Voice and SMS adapters can write the same shape.
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                {conversation.transcript.length === 0 ? (
                  <p className="text-sm text-zinc-500">No transcript turns stored for this thread yet.</p>
                ) : (
                  <div className="max-h-[min(520px,70vh)] space-y-3 overflow-y-auto pr-1">
                    {conversation.transcript.map((turn, idx) => (
                      <div
                        key={`${idx}-${turn.at ?? ""}`}
                        className={cn(
                          "flex",
                          turn.role === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[min(100%,36rem)] rounded-2xl border px-4 py-3 text-sm leading-relaxed",
                            turn.role === "user" &&
                              "border-cyan-900/40 bg-cyan-950/25 text-cyan-50/95",
                            turn.role === "assistant" &&
                              "border-zinc-700/80 bg-zinc-900/60 text-zinc-200",
                            turn.role === "system" &&
                              "border-zinc-800 bg-zinc-950/80 text-zinc-500"
                          )}
                        >
                          <div className="mb-1 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                            {turn.role === "assistant" ? (
                              <Bot className="h-3 w-3" aria-hidden />
                            ) : turn.role === "user" ? (
                              <User className="h-3 w-3" aria-hidden />
                            ) : (
                              <MessageSquare className="h-3 w-3" aria-hidden />
                            )}
                            {turn.role}
                            {turn.at ? (
                              <span className="font-normal normal-case text-zinc-600">
                                · {formatLeadDateTime(turn.at)}
                              </span>
                            ) : null}
                          </div>
                          <p className="whitespace-pre-wrap">{turn.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className={cn("shadow-none", dashboardPanelClass)}>
              <CardHeader className="border-b border-zinc-800/80 pb-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">AI summary</p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex gap-3 rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-4">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-violet-400/80" aria-hidden />
                  <p className="text-sm leading-relaxed text-zinc-300">
                    {conversation.aiSummary?.trim()
                      ? conversation.aiSummary
                      : "No summary has been generated for this conversation yet."}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className={cn("shadow-none", dashboardPanelClass)}>
              <CardHeader className="border-b border-zinc-800/80 pb-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                  Intent & qualification
                </p>
              </CardHeader>
              <CardContent className="grid gap-4 pt-6">
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">Intent</p>
                  <p className="text-sm text-zinc-200">{conversation.intent ?? "—"}</p>
                </div>
                <div>
                  <p className="mb-1 flex items-center gap-2 text-xs font-medium text-zinc-500">
                    <ClipboardList className="h-3.5 w-3.5" aria-hidden />
                    Qualification
                  </p>
                  <p className="text-sm text-zinc-200">
                    {conversation.qualificationResult ?? "—"}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">Outcome</p>
                  <p className="text-sm text-zinc-200">{conversation.outcome ?? "—"}</p>
                </div>
              </CardContent>
            </Card>

            <Card className={cn("shadow-none", dashboardPanelClass)}>
              <CardHeader className="border-b border-zinc-800/80 pb-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Linked lead</p>
              </CardHeader>
              <CardContent className="pt-6">
                {conversation.linkedLead ? (
                  <div className="flex flex-col gap-3 rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-4">
                    <p className="text-sm font-medium text-zinc-100">{conversation.linkedLead.displayName}</p>
                    <p className="text-xs text-zinc-500">{conversation.linkedLead.email}</p>
                    <Button asChild size="sm" variant="outline" className="w-fit gap-2">
                      <Link to={`/dashboard/leads/${conversation.linkedLead.id}`}>
                        <Link2 className="h-4 w-4" aria-hidden />
                        Open lead record
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500">
                    No lead references this conversation yet. Widget submissions with{" "}
                    <span className="font-mono text-xs text-zinc-400">conversationId</span> will link automatically.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className={cn("shadow-none", dashboardPanelClass)}>
              <CardHeader className="border-b border-zinc-800/80 pb-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                  Internal notes
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  Visible only in the dashboard. Saved with your session via PATCH (notes field only).
                </p>
              </CardHeader>
              <CardContent className="space-y-3 pt-6">
                <div className="flex items-start gap-2 rounded-lg border border-zinc-800/60 bg-zinc-950/30 p-3 text-xs text-zinc-500">
                  <StickyNote className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" aria-hidden />
                  Team context, handoff details, and follow-ups stay out of the customer-facing transcript.
                </div>
                <textarea
                  rows={5}
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  className={cn(dashboardTextareaClass, "px-3")}
                  placeholder="Add internal notes…"
                />
                <div className="flex justify-end">
                  <Button type="button" disabled={savingNotes} onClick={() => void saveNotes()}>
                    {savingNotes ? "Saving…" : "Save notes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
