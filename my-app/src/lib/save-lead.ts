/**
 * Store a lead: optional Resend email notification.
 * Logs only operational, non-PII events (no name/email/phone/message).
 */
export type LeadPayload = {
  source: "book-demo" | "contact" | "chat";
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  businessType?: string;
  message?: string;
};

const SAFE_EMAIL_RE =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

/** Returns the email if it is safe to place in a Reply-To header, otherwise undefined. */
export function safeReplyTo(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const email = raw.trim();
  if (!email || email.length > 254) return undefined;
  if (/[\r\n,;<>\s]/.test(email)) return undefined;
  if (!SAFE_EMAIL_RE.test(email)) return undefined;
  return email;
}

/** Strip control chars/CR/LF, collapse whitespace, cap length. */
function cleanHeaderText(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  // eslint-disable-next-line no-control-regex
  const s = v.replace(/[\u0000-\u001F\u007F-\u009F]/g, " ").replace(/\s+/g, " ").trim();
  return s.length > max ? s.slice(0, max - 1).trimEnd() + "…" : s;
}

export function buildLeadSubject(name?: string, businessName?: string): string {
  const base = "New Website Lead";
  const label = cleanHeaderText(businessName, 200) || cleanHeaderText(name, 200);
  if (!label) return base;
  const prefix = `${base} — `;
  return prefix + cleanHeaderText(label, 80 - prefix.length);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildLeadBody(p: LeadPayload): { text: string; html: string } {
  const rows: Array<[string, string]> = [
    ["Source", p.source],
    ["Name", p.name],
    ...(p.businessName ? ([["Business", p.businessName]] as Array<[string, string]>) : []),
    ["Email", p.email],
    ["Phone", p.phone],
    ...(p.businessType ? ([["Type", p.businessType]] as Array<[string, string]>) : []),
    ...(p.message ? ([["Message", p.message]] as Array<[string, string]>) : []),
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html =
    "<!doctype html><html><body><table cellpadding=\"4\">" +
    rows
      .map(
        ([k, v]) =>
          `<tr><td valign="top"><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v).replace(/\r?\n/g, "<br>")}</td></tr>`
      )
      .join("") +
    "</table></body></html>";
  return { text, html };
}

export function logEvent(event: string, extra: Record<string, unknown> = {}) {
  const line = JSON.stringify({ event, ts: new Date().toISOString(), ...extra });
  if (event.endsWith("failed")) console.error("[lead]", line);
  else console.log("[lead]", line);
}

export async function saveLead(payload: LeadPayload): Promise<{ ok: boolean; error?: string; delivered: boolean }> {
  const { source } = payload;
  logEvent("submission_received", { source });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "onboarding@resend.dev";

  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      const to = process.env.LEAD_NOTIFICATION_EMAIL ?? "don@mercyspeaksdigital.com";
      const subject = buildLeadSubject(payload.name, payload.businessName);
      const { text, html } = buildLeadBody(payload);
      const replyTo = safeReplyTo(payload.email);

      const { data, error } = await resend.emails.send({
        from,
        to: [to],
        subject,
        text,
        html,
        ...(replyTo ? { replyTo } : {}),
      });
      if (error) {
        logEvent("delivery_failed", { source, category: "provider_rejected", provider: (error as { name?: string }).name ?? null });
        return { ok: false, error: error.message, delivered: false };
      }
      logEvent("delivery_accepted", { source, id: data?.id ?? null, replyTo: replyTo ? "set" : "omitted" });
      return { ok: true, delivered: true };
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e);
      logEvent("delivery_failed", { source, category: e instanceof Error ? e.name : "unknown_error" });
      return { ok: false, error: err, delivered: false };
    }
  }

  logEvent("delivery_failed", { source, category: "not_configured" });
  return { ok: true, delivered: false };
}
