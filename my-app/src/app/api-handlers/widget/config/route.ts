/**
 * GET /api/widget/config — Multi-tenant widget config.
 * Query: tenant, key (optional). Validates tenant + public key + Origin/Referer (allowed_domains).
 * Returns JSON with allowed, tenantId, companyName, greeting, bookingUrl, branding, quickReplies.
 */

import { getWidgetConfig } from "../../../../lib/widget-tenant";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const tenantId = (url.searchParams.get("tenant") ?? "").trim();
  const key = (url.searchParams.get("key") ?? "").trim() || undefined;

  if (!tenantId) {
    return Response.json({ allowed: false, error: "tenant required" }, { status: 400 });
  }

  const result = await getWidgetConfig(request, tenantId, key);

  if (!result.allowed) {
    return Response.json({ allowed: false }, { status: 403 });
  }

  return Response.json(result.config);
}
