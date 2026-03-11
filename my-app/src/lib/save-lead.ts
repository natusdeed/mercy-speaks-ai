/**
 * Store a lead: optional DB, optional Resend email. Always logs to console for conversion measurement.
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

export async function saveLead(payload: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  const { source, name, email, phone, businessName, businessType, message } = payload;

  // Always log for conversion measurement (optional DB table can consume this later)
  console.log("[lead]", JSON.stringify({
    ts: new Date().toISOString(),
    source,
    name,
    email,
    phone,
    businessName: businessName ?? null,
    businessType: businessType ?? null,
    messageLength: message?.length ?? 0,
  }));

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "onboarding@resend.dev";

  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      const to = process.env.LEAD_NOTIFICATION_EMAIL ?? "don@mercyspeaksdigital.com";
      const subject = `[${source}] Lead: ${name}`;
      const text = [
        `Source: ${source}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        businessName ? `Business: ${businessName}` : null,
        businessType ? `Type: ${businessType}` : null,
        message ? `Message: ${message}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const { error } = await resend.emails.send({
        from,
        to: [to],
        subject,
        text,
      });
      if (error) return { ok: false, error: error.message };
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e);
      console.error("[lead] Resend error:", err);
      return { ok: false, error: err };
    }
  }

  return { ok: true };
}
