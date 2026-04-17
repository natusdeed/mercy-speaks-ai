/**
 * Single entry for all Vercel /api/* routes — keeps deployment to one serverless function
 * (Hobby plan limit: 12 functions).
 */
import { handleChatRequest } from "../my-app/src/app/api-handlers/chat/chat-handler";
import { handleChatLeadRequest } from "../my-app/src/app/api-handlers/chat/lead-route";
import { POST as postContact } from "../my-app/src/app/api-handlers/contact/route";
import { POST as postBookDemo } from "../my-app/src/app/api-handlers/book-demo/route";
import { POST as postDashboardLogin } from "../my-app/src/app/api-handlers/dashboard/login/route";
import { POST as postDashboardVerify } from "../my-app/src/app/api-handlers/dashboard/verify/route";
import { GET as getConversations } from "../my-app/src/app/api-handlers/dashboard/conversations/route";
import {
  GET as getConversationById,
  PATCH as patchConversationById,
} from "../my-app/src/app/api-handlers/dashboard/conversations/[id]/route";
import {
  GET as getLeads,
  POST as postLeads,
} from "../my-app/src/app/api-handlers/dashboard/leads/route";
import {
  GET as getLeadById,
  PATCH as patchLeadById,
} from "../my-app/src/app/api-handlers/dashboard/leads/[id]/route";
import { handleWidgetChatRequest } from "../my-app/src/app/api-handlers/widget/chat-handler";
import { getWidgetConfig } from "../my-app/src/lib/widget-tenant";
import { handleWidgetLeadRequest } from "./widget-lead-handler";

function normalizePathname(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export async function dispatchVercelApi(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const path = normalizePathname(url.pathname);
  const method = request.method;

  // --- More specific paths first ---
  if (path === "/api/chat/lead" && method === "POST") {
    return handleChatLeadRequest(request);
  }
  if (path === "/api/chat" && method === "POST") {
    return handleChatRequest(request);
  }
  if (path === "/api/contact" && method === "POST") {
    return postContact(request);
  }
  if (path === "/api/book-demo" && method === "POST") {
    try {
      return await postBookDemo(request);
    } catch (e) {
      console.error("[api/book-demo]", e);
      return new Response(
        JSON.stringify({
          message:
            "A server error occurred. Please try again or use the Cal.com link to book directly.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
  if (path === "/api/dashboard/login" && method === "POST") {
    try {
      return await postDashboardLogin(request);
    } catch (e) {
      console.error("[api/dashboard/login]", e);
      return new Response(JSON.stringify({ message: "Sign-in failed." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  if (path === "/api/dashboard/verify" && method === "POST") {
    try {
      return await postDashboardVerify(request);
    } catch (e) {
      console.error("[api/dashboard/verify]", e);
      return new Response(
        JSON.stringify({ ok: false, message: "Verification failed." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  if (path === "/api/dashboard/conversations") {
    try {
      if (method === "GET") return await getConversations(request);
      return Response.json({ message: "Method not allowed" }, { status: 405 });
    } catch (e) {
      console.error("[api/dashboard/conversations]", e);
      return Response.json({ message: "Request failed." }, { status: 500 });
    }
  }

  const convDetail = /^\/api\/dashboard\/conversations\/([^/]+)$/.exec(path);
  if (convDetail) {
    try {
      if (method === "GET") return await getConversationById(request);
      if (method === "PATCH") return await patchConversationById(request);
      return Response.json({ message: "Method not allowed" }, { status: 405 });
    } catch (e) {
      console.error("[api/dashboard/conversations/[id]]", e);
      return Response.json({ message: "Request failed." }, { status: 500 });
    }
  }

  if (path === "/api/dashboard/leads") {
    try {
      if (method === "GET") return await getLeads(request);
      if (method === "POST") return await postLeads(request);
      return Response.json({ message: "Method not allowed" }, { status: 405 });
    } catch (e) {
      console.error("[api/dashboard/leads]", e);
      return Response.json({ message: "Request failed." }, { status: 500 });
    }
  }

  const leadDetail = /^\/api\/dashboard\/leads\/([^/]+)$/.exec(path);
  if (leadDetail) {
    try {
      if (method === "GET") return await getLeadById(request);
      if (method === "PATCH") return await patchLeadById(request);
      return Response.json({ message: "Method not allowed" }, { status: 405 });
    } catch (e) {
      console.error("[api/dashboard/leads/[id]]", e);
      return Response.json({ message: "Request failed." }, { status: 500 });
    }
  }

  if (path === "/api/widget/chat" && method === "POST") {
    return handleWidgetChatRequest(request);
  }

  if (path === "/api/widget/config" && method === "GET") {
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
  }

  if (path === "/api/widget/lead" && method === "POST") {
    return handleWidgetLeadRequest(request);
  }

  return Response.json({ error: "Not found" }, { status: 404 });
}
