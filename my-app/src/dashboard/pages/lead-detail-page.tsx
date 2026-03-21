import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LeadPriorityBadge, LeadStatusBadge } from "@/dashboard/components/lead-badges";
import {
  dashboardInputClass,
  dashboardPanelClass,
  dashboardSelectMdClass,
  dashboardTextareaClass,
} from "@/dashboard/lib/dashboard-styles";
import { useDashboardAuth } from "@/dashboard/contexts/dashboard-auth-context";
import { fetchLeadById, patchLeadRequest } from "@/dashboard/lib/dashboard-leads-api";
import {
  leadDetailFormSchema,
  parseEstimatedValue,
  type LeadDetailFormValues,
} from "@/dashboard/lib/lead-detail-form";
import {
  displayLeadFullName,
  formatLeadCurrency,
  formatLeadDateTime,
} from "@/dashboard/lib/lead-display";
import { LEAD_PRIORITY_LABEL, LEAD_STATUS_LABEL } from "@/dashboard/lib/lead-labels";
import { LEAD_PRIORITIES, LEAD_STATUSES, type LeadDto } from "@/dashboard/types/leads";
import {
  ArrowLeft,
  Building2,
  CalendarClock,
  Hash,
  Link2,
  Mail,
  MessageSquare,
  Phone,
  Save,
  User,
} from "lucide-react";

function leadToForm(lead: LeadDto): LeadDetailFormValues {
  return {
    firstName: lead.firstName ?? "",
    lastName: lead.lastName ?? "",
    businessName: lead.businessName ?? "",
    email: lead.email,
    phone: lead.phone,
    serviceInterest: lead.serviceInterest ?? "",
    status: lead.status,
    priority: lead.priority,
    estimatedValue: lead.estimatedValue !== null ? String(lead.estimatedValue) : "",
    notes: lead.notes ?? "",
    assignedTo: lead.assignedTo ?? "",
  };
}

export function LeadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAccessToken, logout } = useDashboardAuth();
  const [lead, setLead] = useState<LeadDto | null>(null);
  const [form, setForm] = useState<LeadDetailFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleUnauthorized = useCallback(() => {
    logout();
    navigate("/dashboard/login", { replace: true });
  }, [logout, navigate]);

  const load = useCallback(async () => {
    if (!id) {
      setLoading(false);
      setError("Missing lead id.");
      return;
    }
    const token = getAccessToken();
    if (!token) return;
    setLoading(true);
    setError(null);
    setNotFound(false);
    const r = await fetchLeadById(token, id);
    setLoading(false);
    if (!r.ok) {
      if (r.status === 401) {
        handleUnauthorized();
        return;
      }
      if (r.status === 404) {
        setLead(null);
        setForm(null);
        setNotFound(true);
        return;
      }
      setError(r.message);
      setLead(null);
      setForm(null);
      return;
    }
    setLead(r.lead);
    setForm(leadToForm(r.lead));
  }, [getAccessToken, handleUnauthorized, id]);

  useEffect(() => {
    void load();
  }, [load]);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!id || !form) return;
    setError(null);
    const parsed = leadDetailFormSchema.safeParse(form);
    if (!parsed.success) {
      const msg =
        parsed.error.flatten().fieldErrors.email?.[0] ??
        parsed.error.flatten().fieldErrors.phone?.[0] ??
        "Check the form and try again.";
      setError(msg);
      return;
    }
    const ev = parseEstimatedValue(parsed.data.estimatedValue);
    if (!ev.ok) {
      setError(ev.message);
      return;
    }
    const token = getAccessToken();
    if (!token) return;
    setSaving(true);
    setError(null);
    const r = await patchLeadRequest(token, id, {
      first_name: parsed.data.firstName.trim() || null,
      last_name: parsed.data.lastName.trim() || null,
      business_name: parsed.data.businessName.trim() || null,
      email: parsed.data.email.trim(),
      phone: parsed.data.phone.trim(),
      service_interest: parsed.data.serviceInterest.trim() || null,
      status: parsed.data.status,
      priority: parsed.data.priority,
      estimated_value: ev.value,
      notes: parsed.data.notes.trim() || null,
      assigned_to: parsed.data.assignedTo.trim() || null,
    });
    setSaving(false);
    if (!r.ok) {
      if (r.status === 401) {
        handleUnauthorized();
        return;
      }
      setError(r.message);
      return;
    }
    setLead(r.lead);
    setForm(leadToForm(r.lead));
  }

  function onReset() {
    if (lead) setForm(leadToForm(lead));
    setError(null);
  }

  const initials =
    lead &&
    (() => {
      const a = lead.firstName?.[0] ?? lead.name?.[0] ?? lead.email[0] ?? "?";
      const b = lead.lastName?.[0] ?? "";
      return (a + b).toUpperCase().slice(0, 2);
    })();

  return (
    <div className="space-y-10">
      <div className={cn("p-6 md:p-8", dashboardPanelClass)}>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 flex-1 gap-4">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="shrink-0 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100"
              aria-label="Back to leads"
            >
              <Link to="/dashboard/leads">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex min-w-0 gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-sm font-semibold text-zinc-200">
                {loading ? <span className="animate-pulse text-zinc-600">…</span> : initials}
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Lead</p>
                <h1 className="mt-1 truncate text-2xl font-semibold tracking-tight text-zinc-50 md:text-[1.75rem]">
                  {loading ? "Loading…" : notFound ? "Lead not found" : lead ? displayLeadFullName(lead) : "Lead"}
                </h1>
                {lead?.businessName ? (
                  <p className="mt-1 flex items-center gap-2 truncate text-sm text-zinc-500">
                    <Building2 className="h-4 w-4 shrink-0 text-zinc-600" aria-hidden />
                    {lead.businessName}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          {lead ? (
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              <LeadStatusBadge status={lead.status} />
              <LeadPriorityBadge priority={lead.priority} />
            </div>
          ) : null}
        </div>
      </div>

      {error && lead ? (
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
                <div className="mt-4 h-24 animate-pulse rounded-lg bg-zinc-800/60" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : notFound || !lead || !form ? (
        <Card className={cn("shadow-none", dashboardPanelClass)}>
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-sm text-zinc-400">
              {notFound
                ? "This lead no longer exists or the link is invalid."
                : error ?? "Unable to load this lead. Return to the list and try again."}
            </p>
            <Button asChild variant="outline">
              <Link to="/dashboard/leads">Back to leads</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={onSave} className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className={cn("shadow-none", dashboardPanelClass)}>
              <CardHeader className="border-b border-zinc-800/80 pb-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Contact</p>
                <p className="mt-1 text-sm text-zinc-500">
                  Changes are validated and saved with your dashboard session.
                </p>
              </CardHeader>
              <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
                <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-zinc-500">
                      <User className="h-3.5 w-3.5" aria-hidden />
                      First name
                    </label>
                    <input
                      value={form.firstName}
                      onChange={(e) => setForm((f) => (f ? { ...f, firstName: e.target.value } : f))}
                      className={dashboardInputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-zinc-500">
                      <User className="h-3.5 w-3.5" aria-hidden />
                      Last name
                    </label>
                    <input
                      value={form.lastName}
                      onChange={(e) => setForm((f) => (f ? { ...f, lastName: e.target.value } : f))}
                      className={dashboardInputClass}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-zinc-500">
                    <Building2 className="h-3.5 w-3.5" aria-hidden />
                    Business
                  </label>
                  <input
                    value={form.businessName}
                    onChange={(e) => setForm((f) => (f ? { ...f, businessName: e.target.value } : f))}
                    className={dashboardInputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-zinc-500">
                    <Mail className="h-3.5 w-3.5" aria-hidden />
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => (f ? { ...f, email: e.target.value } : f))}
                    className={dashboardInputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-zinc-500">
                    <Phone className="h-3.5 w-3.5" aria-hidden />
                    Phone
                  </label>
                  <input
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => (f ? { ...f, phone: e.target.value } : f))}
                    className={dashboardInputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 text-xs font-medium text-zinc-500">Service interest</label>
                  <input
                    value={form.serviceInterest}
                    onChange={(e) => setForm((f) => (f ? { ...f, serviceInterest: e.target.value } : f))}
                    className={dashboardInputClass}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className={cn("shadow-none", dashboardPanelClass)}>
              <CardHeader className="border-b border-zinc-800/80 pb-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Inbound message</p>
                <p className="mt-1 text-sm text-zinc-500">From the widget or chat flow. Read-only.</p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex gap-3 rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-4">
                  <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-zinc-600" aria-hidden />
                  <p className="text-sm leading-relaxed text-zinc-300">
                    {lead.message?.trim() ? lead.message : "No message was stored for this lead."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className={cn("shadow-none", dashboardPanelClass)}>
              <CardHeader className="border-b border-zinc-800/80 pb-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Pipeline</p>
              </CardHeader>
              <CardContent className="grid gap-4 pt-6">
                <div>
                  <label htmlFor="lead-status" className="mb-1.5 block text-xs font-medium text-zinc-500">
                    Status
                  </label>
                  <select
                    id="lead-status"
                    value={form.status}
                    onChange={(e) =>
                      setForm((f) =>
                        f ? { ...f, status: e.target.value as LeadDetailFormValues["status"] } : f
                      )
                    }
                    className={dashboardSelectMdClass}
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {LEAD_STATUS_LABEL[s]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="lead-priority" className="mb-1.5 block text-xs font-medium text-zinc-500">
                    Priority
                  </label>
                  <select
                    id="lead-priority"
                    value={form.priority}
                    onChange={(e) =>
                      setForm((f) =>
                        f ? { ...f, priority: e.target.value as LeadDetailFormValues["priority"] } : f
                      )
                    }
                    className={dashboardSelectMdClass}
                  >
                    {LEAD_PRIORITIES.map((p) => (
                      <option key={p} value={p}>
                        {LEAD_PRIORITY_LABEL[p]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-500">Estimated value (USD)</label>
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={form.estimatedValue}
                    onChange={(e) => setForm((f) => (f ? { ...f, estimatedValue: e.target.value } : f))}
                    className={dashboardInputClass}
                  />
                  <p className="mt-1 text-xs text-zinc-600">Shown as {formatLeadCurrency(lead.estimatedValue)}</p>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-500">Assigned to</label>
                  <input
                    value={form.assignedTo}
                    onChange={(e) => setForm((f) => (f ? { ...f, assignedTo: e.target.value } : f))}
                    placeholder="e.g. sales@yourcompany.com"
                    className={dashboardInputClass}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className={cn("shadow-none", dashboardPanelClass)}>
              <CardHeader className="border-b border-zinc-800/80 pb-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Internal notes</p>
                <p className="mt-1 text-sm text-zinc-500">Not shown on the public site or widget.</p>
              </CardHeader>
              <CardContent className="pt-6">
                <textarea
                  rows={6}
                  value={form.notes}
                  onChange={(e) => setForm((f) => (f ? { ...f, notes: e.target.value } : f))}
                  className={cn(dashboardTextareaClass, "px-3")}
                />
              </CardContent>
            </Card>

            <Card className={cn("shadow-none", dashboardPanelClass)}>
              <CardHeader className="border-b border-zinc-800/80 pb-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Record</p>
              </CardHeader>
              <CardContent className="space-y-3 pt-6 text-sm text-zinc-400">
                <div className="flex items-start gap-2">
                  <Hash className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" aria-hidden />
                  <div>
                    <p className="text-xs text-zinc-500">Lead id</p>
                    <p className="font-mono text-xs text-zinc-300">{lead.id}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Link2 className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" aria-hidden />
                  <div>
                    <p className="text-xs text-zinc-500">Source</p>
                    <p className="text-zinc-200">{lead.source}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" aria-hidden />
                  <div>
                    <p className="text-xs text-zinc-500">Created</p>
                    <p className="text-zinc-200">{formatLeadDateTime(lead.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" aria-hidden />
                  <div>
                    <p className="text-xs text-zinc-500">Updated</p>
                    <p className="text-zinc-200">{formatLeadDateTime(lead.updatedAt)}</p>
                  </div>
                </div>
                {lead.conversationId ? (
                  <div className="pt-2">
                    <Link
                      to={`/dashboard/conversations/${lead.conversationId}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-zinc-100"
                    >
                      Open linked conversation
                    </Link>
                  </div>
                ) : (
                  <p className="pt-1 text-xs text-zinc-600">No conversation linked yet.</p>
                )}
              </CardContent>
            </Card>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={onReset} disabled={saving}>
                Reset
              </Button>
              <Button type="submit" disabled={saving} className="gap-2">
                <Save className="h-4 w-4" aria-hidden />
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
