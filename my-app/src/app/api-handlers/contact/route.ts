/**
 * POST /api/contact — receives contact form payload.
 *
 * Success (2xx) is returned ONLY when the existing delivery mechanism (Resend)
 * accepted the message. If email delivery is not configured or fails, a generic
 * 503 is returned so the UI can show a retry / direct-contact fallback.
 * Never returns provider errors, stack traces, or configuration details.
 */
import { saveLead } from "../../../lib/save-lead";

const GENERIC_FAILURE =
  "We couldn't send your message right now. Please try again, or email don@mercyspeaksdigital.com.";

const LIMITS = { name: 100, email: 254, phone: 30, businessType: 100, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function bad(message: string, status = 400) {
  return Response.json({ ok: false, message }, { status });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed = (await request.json()) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return bad("Invalid request.");
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return bad("Invalid request.");
  }

  // Honeypot: real users never fill this hidden field. Accept silently, send nothing.
  if (str(body.website) || str(body.company_website)) {
    return Response.json({ success: true });
  }

  const name = str(body.name);
  const email = str(body.email);
  const phone = str(body.phone);
  const businessType = str(body.businessType);
  const message = str(body.message) || undefined;
  // Service interest from the contact form choice; unknown values fall back to a website quote.
  const rawInterest = str(body.interest);
  const interest = rawInterest === "care" || rawInterest === "ai-pilot" ? rawInterest : "website";

  if (!name || !email || !phone || !businessType) {
    return bad("Name, email, phone, and business type are required.");
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    phone.length > LIMITS.phone ||
    businessType.length > LIMITS.businessType ||
    (message?.length ?? 0) > LIMITS.message
  ) {
    return bad("One or more fields are too long.");
  }
  if (!EMAIL_RE.test(email)) {
    return bad("Please enter a valid email address.");
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return bad("Please enter a valid phone number.");
  }

  try {
    const result = await saveLead({ source: "contact", interest, name, email, phone, businessType, message });
    if (!result.ok || !result.delivered) {
      console.error("[api/contact]", JSON.stringify({ event: "lead_not_delivered", ts: new Date().toISOString(), category: result.ok ? "not_configured" : "delivery_failed" }));
      return bad(GENERIC_FAILURE, 503);
    }
    return Response.json({ success: true });
  } catch {
    console.error("[api/contact]", JSON.stringify({ event: "unexpected_failure", ts: new Date().toISOString() }));
    return bad(GENERIC_FAILURE, 503);
  }
}
