/**
 * Resolve tenant config for widget API.
 * Uses Supabase when SUPABASE_URL + SUPABASE_SERVICE_KEY are set; otherwise fallback for single-tenant (e.g. our own site).
 */

import type { Tenant, WidgetConfigResponse } from "./widget-types";

const FALLBACK_GREETING =
  "Hi! I'm here to help. Ask about pricing, booking a demo, or anything else.";

function getOriginFromRequest(request: Request): string | null {
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

function isDomainAllowed(tenant: Tenant, hostname: string): boolean {
  const normalized = hostname.toLowerCase().replace(/^www\./, "");
  return tenant.domains.some((d) => {
    const rule = d.toLowerCase().trim().replace(/^www\./, "");
    if (!rule) return false;
    if (rule === normalized) return true;
    // Support simple wildcard patterns like "*.vercel.app"
    if (rule.startsWith("*.")) {
      const suffix = rule.slice(1); // ".vercel.app"
      return normalized.endsWith(suffix) && normalized.length > suffix.length;
    }
    return false;
  });
}

/** Fetch tenant from Supabase by id. */
async function getTenantFromSupabase(tenantId: string): Promise<Tenant | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("tenants")
    .select("*")
    .eq("id", tenantId)
    .single();

  if (error || !data) return null;
  return {
    id: data.id,
    name: data.name ?? "",
    domains: Array.isArray(data.domains) ? data.domains : [],
    public_key: data.public_key ?? null,
    branding: (data.branding && typeof data.branding === "object") ? data.branding : {},
    booking_url: data.booking_url ?? null,
    system_prompt: data.system_prompt ?? null,
    greeting: data.greeting ?? null,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}

/** Fallback when no DB: single tenant from env (e.g. MERCY_TENANT_ID + MERCY_*). */
function getFallbackTenant(tenantId: string): Tenant | null {
  // Built-in "demo" tenant for local/dev MVP. Works even when DB isn't configured.
  if (tenantId === "demo") {
    return {
      id: "demo",
      name: "Mercy AI",
      domains: ["localhost", "127.0.0.1", "*.vercel.app", "mercyspeaksdigital.com"],
      public_key: "demo_public_key",
      branding: {
        companyName: "Mercy AI",
        primaryColor: "#06b6d4",
        accentColor: "#8b5cf6",
        logoUrl: "/images/Mercy-avatar.png",
      },
      booking_url: process.env.BOOKING_URL ?? null,
      system_prompt: null,
      greeting: FALLBACK_GREETING,
    };
  }

  const fallbackId = process.env.MERCY_TENANT_ID ?? "default";
  if (tenantId !== fallbackId) return null;
  const domainsStr = process.env.MERCY_WIDGET_DOMAINS ?? "";
  const domains = domainsStr ? domainsStr.split(",").map((d) => d.trim()).filter(Boolean) : [];
  return {
    id: fallbackId,
    name: process.env.MERCY_WIDGET_NAME ?? "Mercy Speaks Digital",
    domains,
    public_key: process.env.MERCY_WIDGET_PUBLIC_KEY ?? null,
    branding: {
      companyName: process.env.MERCY_WIDGET_NAME ?? "Mercy Speaks Digital",
      primaryColor: process.env.MERCY_WIDGET_PRIMARY_COLOR ?? "#06b6d4",
      accentColor: process.env.MERCY_WIDGET_ACCENT_COLOR ?? "#8b5cf6",
    },
    booking_url: process.env.BOOKING_URL ?? process.env.MERCY_BOOKING_URL ?? null,
    system_prompt: process.env.MERCY_WIDGET_SYSTEM_PROMPT ?? null,
    greeting: process.env.MERCY_WIDGET_GREETING ?? FALLBACK_GREETING,
  };
}

/** Get tenant by id (DB or fallback). */
export async function getTenant(tenantId: string): Promise<Tenant | null> {
  if (!tenantId || typeof tenantId !== "string") return null;
  const trimmed = tenantId.trim();
  if (!trimmed) return null;

  const fromDb = await getTenantFromSupabase(trimmed);
  if (fromDb) return fromDb;
  return getFallbackTenant(trimmed);
}

/** Validate tenant public key when tenant has public_key set. */
export function validateTenantKey(tenant: Tenant, key: string | undefined): boolean {
  const expected = tenant.public_key?.trim();
  if (!expected) return true;
  return typeof key === "string" && key.trim() === expected;
}

/**
 * Resolve widget config for GET /api/widget/config.
 * Returns 403-style allowed:false when origin is not in tenant's domains or key is invalid.
 */
export async function getWidgetConfig(
  request: Request,
  tenantId: string,
  key?: string
): Promise<{ allowed: boolean; config?: WidgetConfigResponse }> {
  const tenant = await getTenant(tenantId);
  if (!tenant) {
    return { allowed: false };
  }

  if (!validateTenantKey(tenant, key)) {
    return { allowed: false };
  }

  const originHost = getOriginFromRequest(request);
  if (!originHost) {
    return { allowed: false };
  }

  if (!isDomainAllowed(tenant, originHost)) {
    return { allowed: false };
  }

  const branding = tenant.branding && typeof tenant.branding === "object" ? tenant.branding : {};
  const config: WidgetConfigResponse = {
    tenantId: tenant.id,
    companyName: branding.companyName ?? tenant.name,
    greeting: tenant.greeting ?? FALLBACK_GREETING,
    bookingUrl: tenant.booking_url ?? null,
    branding: {
      primaryColor: branding.primaryColor,
      accentColor: branding.accentColor,
      companyName: branding.companyName ?? tenant.name,
      logoUrl: branding.logoUrl,
    },
    allowed: true,
    quickReplies: ["What can you help with?", "Book a demo", "Pricing"],
  };
  return { allowed: true, config };
}
