import { z } from "zod";
import { logEvent } from "../../../lib/save-lead";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  businessType: z.string().min(1, "Please select your business type"),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  logEvent("submission_received", { source: "lead" });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    logEvent("validation_failed", { source: "lead", category: "invalid_json" });
    return Response.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const parsed = leadSchema.safeParse(json);

  if (!parsed.success) {
    const flattened = parsed.error.flatten();
    const fieldErrors = flattened.fieldErrors;

    logEvent("validation_failed", {
      source: "lead",
      category: "invalid_fields",
      fields: Object.keys(fieldErrors),
    });

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

  const { message } = parsed.data;

  logEvent("submission_validated", { source: "lead", hasMessage: !!message });

  try {
    // TODO: Integrate with CRM, email, or database.
    // This is a placeholder for side effects such as persisting the lead.

    return Response.json({ ok: true });
  } catch (error) {
    logEvent("submission_failed", {
      source: "lead",
      category: error instanceof Error ? error.name : "unknown",
    });
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

