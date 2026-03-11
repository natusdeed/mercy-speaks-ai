/**
 * POST /api/chat/lead — lead capture from chatbot (business name, email, phone).
 * Stores via saveLead (Resend email if configured, else console log).
 */
import { saveLead } from "../../../lib/save-lead";

export type ChatLeadBody = {
  businessName?: string;
  name?: string;
  email: string;
  phone: string;
  message?: string;
};

export async function handleChatLeadRequest(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let body: ChatLeadBody;
  try {
    body = (await request.json()) as ChatLeadBody;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const name =
    (typeof body.name === "string" ? body.name.trim() : null) ||
    (typeof body.businessName === "string" ? body.businessName.trim() : null) ||
    "";

  if (!email || !phone) {
    return Response.json(
      { error: "Email and phone are required." },
      { status: 400 }
    );
  }
  if (name.length < 2) {
    return Response.json(
      { error: "Business name or contact name is required (at least 2 characters)." },
      { status: 400 }
    );
  }

  const result = await saveLead({
    source: "chat",
    name,
    email,
    phone,
    businessName: body.businessName ?? name,
    businessType: "Chat",
    message: typeof body.message === "string" ? body.message.trim() : undefined,
  });

  if (!result.ok) {
    return Response.json(
      { error: result.error ?? "Failed to save lead." },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}
