/**
 * POST /api/book-demo — receives lead form payload.
 * Use in Next.js App Router as app/api/book-demo/route.ts (this file).
 * For Vite, proxy /api to a backend or replace fetch URL with your API.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, businessType, message } = body as Record<string, unknown>;

    if (!name || !email || !phone || !businessType) {
      return Response.json(
        { message: "Name, email, phone, and business type are required." },
        { status: 400 }
      );
    }

    // TODO: persist to DB, send to CRM, or send email notification
    // e.g. await saveLead({ source: "book-demo", name, email, phone, businessType, message });

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { message: "Invalid request body." },
      { status: 400 }
    );
  }
}
