import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DashboardPageHeader } from "@/dashboard/components/dashboard-page-header";
import { useDashboardAuth } from "@/dashboard/contexts/dashboard-auth-context";
import {
  dashboardInputClass,
  dashboardInputSmClass,
  dashboardPanelClass,
  dashboardSelectClass,
  dashboardSelectMdClass,
  dashboardSelectSmClass,
  dashboardTextareaClass,
  dashboardTableBodyRowClass,
  dashboardTableClass,
  dashboardTableHeadRowClass,
  dashboardTableTdClass,
  dashboardTableThClass,
} from "@/dashboard/lib/dashboard-styles";
import {
  createLeadRequest,
  fetchLeadsList,
  patchLeadRequest,
} from "@/dashboard/lib/dashboard-leads-api";
import { displayLeadFullName, formatLeadShortDate } from "@/dashboard/lib/lead-display";
import { LEAD_PRIORITY_LABEL, LEAD_STATUS_LABEL } from "@/dashboard/lib/lead-labels";
import {
  LEAD_PRIORITIES,
  LEAD_STATUSES,
  type LeadDto,
  type LeadPriority,
  type LeadStatus,
} from "@/dashboard/types/leads";
import { ChevronRight, Plus, StickyNote } from "lucide-react";

export function LeadsPage() {
  const navigate = useNavigate();
  const { getAccessToken, logout } = useDashboardAuth();
  const [leads, setLeads] = useState<LeadDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qInput, setQInput] = useState("");
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [notesTarget, setNotesTarget] = useState<LeadDto | null>(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const [createForm, setCreateForm] = useState({
    first_name: "",
    last_name: "",
    business_name: "",
    email: "",
    phone: "",
    service_interest: "",
    source: "dashboard",
    status: "new" as LeadStatus,
    priority: "medium" as LeadPriority,
    notes: "",
    estimated_value: "",
  });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setQ(qInput), 300);
    return () => clearTimeout(t);
  }, [qInput]);

  const load = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;
    setLoading(true);
    setError(null);
    const r = await fetchLeadsList(token, {
      q,
      status: statusFilter || undefined,
      priority: priorityFilter || undefined,
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
    setLeads(r.leads);
  }, [getAccessToken, logout, navigate, q, statusFilter, priorityFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleUnauthorized = useCallback(() => {
    logout();
    navigate("/dashboard/login", { replace: true });
  }, [logout, navigate]);

  const patchAndMerge = useCallback(
    async (id: string, body: Record<string, unknown>) => {
      const token = getAccessToken();
      if (!token) return;
      const r = await patchLeadRequest(token, id, body);
      if (!r.ok) {
        if (r.status === 401) {
          handleUnauthorized();
          return;
        }
        setError(r.message);
        void load();
        return;
      }
      setLeads((prev) => prev.map((l) => (l.id === id ? r.lead : l)));
    },
    [getAccessToken, handleUnauthorized, load]
  );

  async function submitCreate(e: React.FormEvent) {
    e.preventDefault();
    const token = getAccessToken();
    if (!token) return;
    setCreating(true);
    setError(null);
    const evRaw = createForm.estimated_value.trim();
    const estimated_value = evRaw === "" ? null : Number(evRaw);
    if (evRaw !== "" && (estimated_value === null || Number.isNaN(estimated_value) || estimated_value < 0)) {
      setError("Estimated value must be a valid non-negative number.");
      setCreating(false);
      return;
    }
    const r = await createLeadRequest(token, {
      first_name: createForm.first_name.trim() || null,
      last_name: createForm.last_name.trim() || null,
      business_name: createForm.business_name.trim() || null,
      email: createForm.email.trim(),
      phone: createForm.phone.trim(),
      service_interest: createForm.service_interest.trim() || null,
      source: createForm.source.trim() || "dashboard",
      status: createForm.status,
      priority: createForm.priority,
      notes: createForm.notes.trim() || null,
      estimated_value,
    });
    setCreating(false);
    if (!r.ok) {
      if (r.status === 401) {
        handleUnauthorized();
        return;
      }
      setError(r.message);
      return;
    }
    setCreateOpen(false);
    setCreateForm({
      first_name: "",
      last_name: "",
      business_name: "",
      email: "",
      phone: "",
      service_interest: "",
      source: "dashboard",
      status: "new",
      priority: "medium",
      notes: "",
      estimated_value: "",
    });
    setLeads((prev) => [r.lead, ...prev]);
  }

  async function saveNotes() {
    if (!notesTarget) return;
    const token = getAccessToken();
    if (!token) return;
    setSavingNotes(true);
    setError(null);
    const r = await patchLeadRequest(token, notesTarget.id, { notes: notesDraft });
    setSavingNotes(false);
    if (!r.ok) {
      if (r.status === 401) {
        handleUnauthorized();
        return;
      }
      setError(r.message);
      return;
    }
    setLeads((prev) => prev.map((l) => (l.id === r.lead.id ? r.lead : l)));
    setNotesTarget(null);
  }

  const activeFilters = Boolean(q || statusFilter || priorityFilter);

  return (
    <div className="space-y-10">
      <DashboardPageHeader
        eyebrow="Pipeline"
        title="Leads"
        description="Search and update stages in one place. Reads and writes go through authenticated APIs."
        actions={
          <>
            <p className="text-sm tabular-nums text-zinc-500">
              <span className="font-medium text-zinc-200">{loading ? "—" : leads.length}</span>
              {!loading ? (
                <span>
                  {" "}
                  {leads.length === 1 ? "lead" : "leads"}
                  {activeFilters ? " · filtered" : ""}
                </span>
              ) : null}
            </p>
            <Button type="button" onClick={() => setCreateOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" aria-hidden />
              New lead
            </Button>
          </>
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
          <label htmlFor="lead-search" className="mb-1.5 block text-xs font-medium text-zinc-500">
            Search
          </label>
          <input
            id="lead-search"
            type="search"
            value={qInput}
            onChange={(e) => setQInput(e.target.value)}
            placeholder="Name, email, phone, business…"
            className={dashboardInputClass}
          />
        </div>
        <div className="w-full min-w-[140px] md:w-44">
          <label htmlFor="filter-status" className="mb-1.5 block text-xs font-medium text-zinc-500">
            Status
          </label>
          <select
            id="filter-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={dashboardSelectMdClass}
          >
            <option value="">All</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {LEAD_STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full min-w-[140px] md:w-44">
          <label htmlFor="filter-priority" className="mb-1.5 block text-xs font-medium text-zinc-500">
            Priority
          </label>
          <select
            id="filter-priority"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className={dashboardSelectMdClass}
          >
            <option value="">All</option>
            {LEAD_PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {LEAD_PRIORITY_LABEL[p]}
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
                <th className={cn(dashboardTableThClass, "text-left")}>Name</th>
                <th className={cn(dashboardTableThClass, "text-left")}>Business</th>
                <th className={cn(dashboardTableThClass, "text-left")}>Email</th>
                <th className={cn(dashboardTableThClass, "text-left")}>Phone</th>
                <th className={cn(dashboardTableThClass, "text-left")}>Service</th>
                <th className={cn(dashboardTableThClass, "text-left")}>Source</th>
                <th className={cn(dashboardTableThClass, "text-left")}>Status</th>
                <th className={cn(dashboardTableThClass, "text-left")}>Priority</th>
                <th className={cn(dashboardTableThClass, "text-left")}>Updated</th>
                <th className={cn(dashboardTableThClass, "text-left")}>Created</th>
                <th className={cn(dashboardTableThClass, "text-right")}>Actions</th>
              </tr>
            </thead>
            <tbody>
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className={dashboardTableBodyRowClass}>
                      {Array.from({ length: 11 }).map((__, j) => (
                        <td key={j} className={dashboardTableTdClass}>
                          <div className="h-4 animate-pulse rounded bg-zinc-800/80" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : leads.length === 0 ? (
                  <tr className={dashboardTableBodyRowClass}>
                    <td colSpan={11} className={cn(dashboardTableTdClass, "py-16 text-center text-sm text-zinc-500")}>
                      No leads match your filters. Add a lead or adjust search.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className={cn(dashboardTableBodyRowClass, "cursor-pointer")}
                      onClick={() => navigate(`/dashboard/leads/${lead.id}`)}
                    >
                      <td className={cn(dashboardTableTdClass, "font-medium text-zinc-100")}>
                        {displayLeadFullName(lead)}
                      </td>
                      <td className={cn(dashboardTableTdClass, "max-w-[140px] truncate text-zinc-500")}>
                        {lead.businessName ?? "—"}
                      </td>
                      <td className={cn(dashboardTableTdClass, "max-w-[160px] truncate")}>{lead.email}</td>
                      <td className={cn(dashboardTableTdClass, "whitespace-nowrap text-zinc-500")}>
                        {lead.phone}
                      </td>
                      <td className={cn(dashboardTableTdClass, "max-w-[120px] truncate text-zinc-500")}>
                        {lead.serviceInterest ?? "—"}
                      </td>
                      <td className={cn(dashboardTableTdClass, "text-zinc-500")}>{lead.source}</td>
                      <td className={dashboardTableTdClass} onClick={(e) => e.stopPropagation()}>
                        <select
                          aria-label={`Status for ${displayLeadFullName(lead)}`}
                          value={lead.status}
                          onChange={(e) => void patchAndMerge(lead.id, { status: e.target.value })}
                          className={cn(dashboardSelectClass, "max-w-[170px]")}
                        >
                          {LEAD_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {LEAD_STATUS_LABEL[s]}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className={dashboardTableTdClass} onClick={(e) => e.stopPropagation()}>
                        <select
                          aria-label={`Priority for ${displayLeadFullName(lead)}`}
                          value={lead.priority}
                          onChange={(e) => void patchAndMerge(lead.id, { priority: e.target.value })}
                          className={cn(dashboardSelectClass, "max-w-[140px]")}
                        >
                          {LEAD_PRIORITIES.map((p) => (
                            <option key={p} value={p}>
                              {LEAD_PRIORITY_LABEL[p]}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className={cn(dashboardTableTdClass, "whitespace-nowrap text-zinc-500 tabular-nums")}>
                        {formatLeadShortDate(lead.updatedAt)}
                      </td>
                      <td className={cn(dashboardTableTdClass, "whitespace-nowrap text-zinc-500 tabular-nums")}>
                        {formatLeadShortDate(lead.createdAt)}
                      </td>
                      <td className={cn(dashboardTableTdClass, "text-right")} onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-zinc-500 hover:text-zinc-100"
                            onClick={() => {
                              setNotesTarget(lead);
                              setNotesDraft(lead.notes ?? "");
                            }}
                            aria-label={`Notes for ${displayLeadFullName(lead)}`}
                          >
                            <StickyNote className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="gap-0.5 text-zinc-400 hover:text-zinc-100"
                            onClick={() => navigate(`/dashboard/leads/${lead.id}`)}
                            aria-label={`Open ${displayLeadFullName(lead)}`}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-zinc-800/80 bg-slate-950 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New lead</DialogTitle>
            <DialogDescription>
              Creates a row in Supabase. Email and phone are required (same as widget captures).
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-3" onSubmit={submitCreate}>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-xs text-zinc-500">First name</label>
                <input
                  value={createForm.first_name}
                  onChange={(e) => setCreateForm((f) => ({ ...f, first_name: e.target.value }))}
                  className={dashboardInputSmClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Last name</label>
                <input
                  value={createForm.last_name}
                  onChange={(e) => setCreateForm((f) => ({ ...f, last_name: e.target.value }))}
                  className={dashboardInputSmClass}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Business</label>
              <input
                value={createForm.business_name}
                onChange={(e) => setCreateForm((f) => ({ ...f, business_name: e.target.value }))}
                className={dashboardInputSmClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Email *</label>
              <input
                required
                type="email"
                value={createForm.email}
                onChange={(e) => setCreateForm((f) => ({ ...f, email: e.target.value }))}
                className={dashboardInputSmClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Phone *</label>
              <input
                required
                value={createForm.phone}
                onChange={(e) => setCreateForm((f) => ({ ...f, phone: e.target.value }))}
                className={dashboardInputSmClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Service interest</label>
              <input
                value={createForm.service_interest}
                onChange={(e) => setCreateForm((f) => ({ ...f, service_interest: e.target.value }))}
                className={dashboardInputSmClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Source</label>
              <input
                value={createForm.source}
                onChange={(e) => setCreateForm((f) => ({ ...f, source: e.target.value }))}
                className={dashboardInputSmClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Status</label>
                <select
                  value={createForm.status}
                  onChange={(e) =>
                    setCreateForm((f) => ({ ...f, status: e.target.value as LeadStatus }))
                  }
                  className={dashboardSelectSmClass}
                >
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {LEAD_STATUS_LABEL[s]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Priority</label>
                <select
                  value={createForm.priority}
                  onChange={(e) =>
                    setCreateForm((f) => ({ ...f, priority: e.target.value as LeadPriority }))
                  }
                  className={dashboardSelectSmClass}
                >
                  {LEAD_PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {LEAD_PRIORITY_LABEL[p]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Estimated value (optional)</label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={createForm.estimated_value}
                onChange={(e) => setCreateForm((f) => ({ ...f, estimated_value: e.target.value }))}
                className={dashboardInputSmClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-500">Notes</label>
              <textarea
                rows={3}
                value={createForm.notes}
                onChange={(e) => setCreateForm((f) => ({ ...f, notes: e.target.value }))}
                className={dashboardTextareaClass}
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={creating}>
                {creating ? "Saving…" : "Create lead"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={notesTarget !== null}
        onOpenChange={(open) => {
          if (!open) setNotesTarget(null);
        }}
      >
        <DialogContent className="border-zinc-800/80 bg-slate-950">
          <DialogHeader>
            <DialogTitle>Notes</DialogTitle>
            <DialogDescription>
              {notesTarget ? displayLeadFullName(notesTarget) : ""} — internal notes only; not shown on the public
              site.
            </DialogDescription>
          </DialogHeader>
          <textarea
            rows={5}
            value={notesDraft}
            onChange={(e) => setNotesDraft(e.target.value)}
            className={cn(dashboardTextareaClass, "px-3")}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setNotesTarget(null)}>
              Cancel
            </Button>
            <Button type="button" disabled={savingNotes} onClick={() => void saveNotes()}>
              {savingNotes ? "Saving…" : "Save notes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
