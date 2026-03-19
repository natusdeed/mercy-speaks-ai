/**
 * Vercel serverless: POST /api/widget/lead — capture lead for a tenant.
 * Validates tenant + domain allowlist, then stores lead (Supabase and/or Resend).
 */

import { getTenant } from "../../my-app/src/lib/widget-tenant";
import type { WidgetLeadBody } from "../../my-app/src/lib/widget-types";

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
  const normalized = hostname.toLowerCase().replace(/^www\./, "");
  return domains.some((d) => d.toLowerCase().replace(/^www\./, "") === normalized);
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    let body: WidgetLeadBody;
    try {
      body = (await request.json()) as WidgetLeadBody;
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const tenantId = typeof body.tenantId === "string" ? body.tenantId.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const name =
      (typeof body.name === "string" ? body.name.trim() : null) ||
      (typeof body.businessName === "string" ? body.businessName.trim() : null) ||
      "";

    if (!tenantId) {
      return Response.json({ error: "tenantId is required" }, { status: 400 });
    }
    if (!email || !phone) {
      return Response.json({ error: "Email and phone are required" }, { status: 400 });
    }
    if (name.length < 2) {
      return Response.json(
        { error: "Name or business name is required (at least 2 characters)" },
        { status: 400 }
      );
    }

    const tenant = await getTenant(tenantId);
    if (!tenant) {
      return Response.json({ error: "Tenant not found" }, { status: 404 });
    }

    const originHost = getOriginHost(request);
    if (!originHost || !isDomainAllowed(tenant.domains, originHost)) {
      return Response.json({ error: "Domain not allowed" }, { status: 403 });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { error } = await supabase.from("leads").insert({
          tenant_id: tenantId,
          conversation_id: body.conversationId ?? null,
          email,
          phone,
          name: name || null,
          business_name: body.businessName ?? name ?? null,
          message: typeof body.message === "string" ? body.message.trim() : null,
          source: "widget",
          metadata: {},
        });
        if (error) {
          console.error("[widget-lead] Supabase error:", error);
          return Response.json({ error: "Failed to save lead" }, { status: 500 });
        }
      } catch (e) {
        console.error("[widget-lead] Error:", e);
        return Response.json({ error: "Failed to save lead" }, { status: 500 });
      }
    }

    const { saveLead } = await import("../../my-app/src/lib/save-lead");
    const result = await saveLead({
      source: "chat",
      name,
      email,
      phone,
      businessName: body.businessName ?? name,
      businessType: "Widget",
      message: typeof body.message === "string" ? body.message.trim() : undefined,
    });
    if (!result.ok) {
      return Response.json({ error: result.error ?? "Failed to save lead" }, { status: 500 });
    }

    return Response.json({ success: true });
  },
};
