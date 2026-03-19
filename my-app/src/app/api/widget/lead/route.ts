/**
 * POST /api/widget/lead — Lead capture from embeddable widget.
 * Validates tenant id + public key + Origin/Referer (allowed_domains). Rate limit per tenant + IP.
 */

import { getTenant, validateTenantKey } from "../../../../lib/widget-tenant";
import type { WidgetLeadBody } from "../../../../lib/widget-types";
import { saveLead } from "../../../../lib/save-lead";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_LEADS = 10;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getOriginHost(request: Request): string | null {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).hostname;
    } catch {
      return null;
    }
  }
  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).hostname;
    } catch {
      return null;
    }
  }
  return null;
}

function isDomainAllowed(domains: string[], hostname: string): boolean {
  const n = hostname.toLowerCase().replace(/^www\./, "");
  return domains.some((d) => d.toLowerCase().replace(/^www\./, "") === n);
}

function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(tenantId: string, ip: string): { ok: boolean; retryAfter?: number } {
  const key = `lead:${tenantId}:${ip}`;
  const now = Date.now();
  let entry = rateLimitMap.get(key);
  if (!entry) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (now >= entry.resetAt) {
    entry = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
    return { ok: true };
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX_LEADS) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true };
}

export async function handleWidgetLeadRequest(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let body: WidgetLeadBody;
  try {
    body = (await request.json()) as WidgetLeadBody;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const tenantId = (typeof body.tenantId === "string" ? body.tenantId : "").trim();
  const email = (typeof body.email === "string" ? body.email : "").trim();
  const phone = (typeof body.phone === "string" ? body.phone : "").trim();
  const name = (typeof body.name === "string" ? body.name : "").trim();
  const businessName = (typeof body.businessName === "string" ? body.businessName : "").trim();
  const message = (typeof body.message === "string" ? body.message : "").trim();

  if (!tenantId || !email || !phone) {
    return Response.json(
      { error: "tenantId, email, and phone are required" },
      { status: 400 }
    );
  }

  const ip = getClientIp(request.headers);
  const rate = checkRateLimit(tenantId, ip);
  if (!rate.ok) {
    return Response.json(
      { error: "Too many submissions. Please try again later.", retryAfter: rate.retryAfter },
      { status: 429, headers: rate.retryAfter ? { "Retry-After": String(rate.retryAfter) } : undefined }
    );
  }

  const tenant = await getTenant(tenantId);
  if (!tenant) {
    return Response.json({ error: "Tenant not found" }, { status: 404 });
  }

  if (!validateTenantKey(tenant, body.key)) {
    return Response.json({ error: "Invalid key" }, { status: 403 });
  }

  const originHost = getOriginHost(request);
  if (!originHost || !isDomainAllowed(tenant.domains, originHost)) {
    return Response.json({ error: "Domain not allowed" }, { status: 403 });
  }

  const result = await saveLead({
    source: "chat",
    name: name || businessName || "Widget lead",
    email,
    phone,
    businessName: businessName || name || undefined,
    businessType: "Widget",
    message: message || undefined,
  });

  if (!result.ok) {
    return Response.json(
      { error: result.error ?? "Failed to save lead" },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}
