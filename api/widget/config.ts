/**
 * Vercel serverless: GET /api/widget/config?tenant=TENANT_ID
 * Returns branding, greeting, booking URL. Only when Origin/Referer is in tenant's allowed domains.
 */

import { getWidgetConfig } from "../../my-app/src/lib/widget-tenant";

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "GET") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    const url = new URL(request.url);
    const tenantId = url.searchParams.get("tenant")?.trim();
    if (!tenantId) {
      return Response.json({ error: "tenant query is required" }, { status: 400 });
    }

    const { allowed, config } = await getWidgetConfig(request, tenantId);

    if (!allowed || !config) {
      return Response.json(
        { error: "Tenant not found or domain not allowed", allowed: false },
        { status: 403 }
      );
    }

    return Response.json(config, {
      headers: {
        "Cache-Control": "private, max-age=300",
      },
    });
  },
};
