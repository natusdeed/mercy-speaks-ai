import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  businessType: z.string().min(1, "Please select your business type"),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  console.log("[API] /api/lead POST received");

  let json: unknown;
  try {
    json = await req.json();
  } catch (error) {
    console.error("[API] /api/lead invalid JSON payload", error);
    return Response.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const parsed = leadSchema.safeParse(json);

  if (!parsed.success) {
    const flattened = parsed.error.flatten();
    const fieldErrors = flattened.fieldErrors;

    console.warn("[API] /api/lead validation failed", fieldErrors);

    const message =
      fieldErrors.name?.[0] ||
      fieldErrors.email?.[0] ||
      fieldErrors.phone?.[0] ||
      fieldErrors.businessType?.[0] ||
      "Invalid form data submitted.";

    return Response.json(
      {
        ok: false,
        error: message,
        details: fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, phone, businessType, message } = parsed.data;

  console.log("[API] /api/lead validated lead", {
    name,
    email,
    phone,
    businessType,
    hasMessage: !!message,
  });

  try {
    // TODO: Integrate with CRM, email, or database.
    // This is a placeholder for side effects such as persisting the lead.

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[API] /api/lead internal error", error);
    return Response.json(
      {
        ok: false,
        error:
          "Something went wrong while submitting your request. Please try again.",
      },
      { status: 500 }
    );
  }
}

