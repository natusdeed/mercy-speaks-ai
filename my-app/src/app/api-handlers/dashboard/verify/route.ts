import { z } from "zod";
import { verifyDashboardSession } from "../../../../lib/dashboard-session";
import { getDashboardSessionSecret } from "../../../../server/dashboard-auth-env";

const bodySchema = z.object({
  token: z.string().min(10),
});

export async function POST(request: Request) {
  const secret = getDashboardSessionSecret();
  if (!secret) {
    return Response.json({ ok: false, message: "Session verification unavailable." }, { status: 503 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ ok: false, message: "Invalid token." }, { status: 400 });
  }

  const session = verifyDashboardSession(secret, parsed.data.token);
  if (!session) {
    return Response.json({ ok: false, message: "Session expired or invalid." }, { status: 401 });
  }

  return Response.json({ ok: true, role: session.role });
}
