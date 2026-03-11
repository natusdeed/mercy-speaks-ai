/**
 * POST /api/book-demo — receives lead form payload.
 * Stores via saveLead (Resend if configured, else console log).
 */
import { saveLead } from "../../../lib/save-lead";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const businessType = typeof body.businessType === "string" ? body.businessType.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : undefined;

    if (!name || !email || !phone || !businessType) {
      return Response.json(
        { message: "Name, email, phone, and business type are required." },
        { status: 400 }
      );
    }

    const result = await saveLead({
      source: "book-demo",
      name,
      email,
      phone,
      businessType,
      message,
    });

    if (!result.ok) {
      return Response.json(
        { message: result.error ?? "Submission failed. Please try again." },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (e) {
    const isBodyError =
      e instanceof SyntaxError ||
      (e instanceof Error && (e.message?.includes("JSON") ?? false));
    return Response.json(
      {
        message: isBodyError
          ? "Invalid request body."
          : "A server error occurred. Please try again.",
      },
      { status: isBodyError ? 400 : 500 }
    );
  }
}
