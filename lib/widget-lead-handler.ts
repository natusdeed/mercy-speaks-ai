/**
 * Shared handler for POST /api/widget/lead (used by Vercel catch-all API).
 */
import { getTenant } from "../my-app/src/lib/widget-tenant";
import { isWidgetRequestOriginAllowed } from "../my-app/src/lib/widget-origin";
import type { WidgetLeadBody } from "../my-app/src/lib/widget-types";
import { logEvent } from "../my-app/src/lib/save-lead";

const WIDGET_LEAD_FAILURE =
  "We couldn't send your message right now. Please try again, or email don@mercyspeaksdigital.com.";

/** Non-sensitive error category: only a short code string, never message/details/hint. */
function errorCategory(e: unknown): string {
  const code = e && typeof e === "object" ? (e as { code?: unknown }).code : undefined;
  if (typeof code === "string" && /^[A-Za-z0-9_.-]{1,32}$/.test(code)) return code;
  if (e instanceof Error && /^[A-Za-z]{1,40}$/.test(e.name)) return e.name;
  return "unknown";
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

  if (!isWidgetRequestOriginAllowed(request, tenant.domains)) {
    return Response.json({ error: "Domain not allowed" }, { status: 403 });
  }

  /*
   * SUCCESS CONDITION: {"success":true} is returned ONLY when the lead was durably accepted:
   *   (a) Supabase is configured AND the leads insert succeeded (the durable record), or
   *   (b) Supabase is not configured AND the Resend notification email was accepted
   *       (saveLead().delivered === true), the email being the only record of the lead.
   * If Supabase saved the lead but the email failed, the lead is still durably stored, so
   * success is returned and only a non-sensitive widget_lead_delivery_failed event is logged.
   * If neither path accepted the lead, a generic 503 is returned (no provider details).
   */
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
  let persisted = false;
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
        logEvent("widget_lead_save_failed", { operation: "supabase.leads.insert", category: errorCategory(error) });
        return Response.json({ error: "Failed to save lead" }, { status: 500 });
      }
      persisted = true;
    } catch (e) {
      logEvent("widget_lead_save_failed", { operation: "supabase.leads.insert", category: errorCategory(e) });
      return Response.json({ error: "Failed to save lead" }, { status: 500 });
    }
  }

  const { saveLead } = await import("../my-app/src/lib/save-lead");
  const result = await saveLead({
    source: "chat",
    name,
    email,
    phone,
    businessName: body.businessName ?? name,
    businessType: "Widget",
    message: typeof body.message === "string" ? body.message.trim() : undefined,
  });
  if (!result.delivered) {
    logEvent("widget_lead_delivery_failed", { persisted });
    if (!persisted) {
      return Response.json({ error: WIDGET_LEAD_FAILURE }, { status: 503 });
    }
  }

  return Response.json({ success: true });
}
