import { z } from "zod";
import {
  signDashboardSession,
  verifyDashboardPassword,
  verifyDashboardWorkEmail,
} from "../../../../lib/dashboard-session";
import type { DashboardRole } from "../../../../dashboard/types/roles";
import {
  DASHBOARD_AUTH_ENV_NAMES,
  getDashboardAuthEnv,
} from "../../../../server/dashboard-auth-env";

const bodySchema = z.object({
  password: z.string().min(1, "Password is required."),
  email: z
    .string()
    .trim()
    .min(1, "Work email is required.")
    .email("Enter a valid work email."),
});

function getEnv(name: string): string | undefined {
  const v = process.env[name];
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

export async function POST(request: Request) {
  const env = getDashboardAuthEnv();
  if (!env) {
    return Response.json(
      {
        message: `Dashboard sign-in is not configured. Set ${DASHBOARD_AUTH_ENV_NAMES} on the server. From the repo root run: npm run dashboard:bootstrap -- your@email.com — paste the printed lines into my-app/.env.local (local) or Vercel → Project → Settings → Environment Variables, then restart the dev server or redeploy.`,
      },
      { status: 503 }
    );
  }

  const { password, sessionSecret: secret, adminEmail } = env;

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    const msg =
      fe.email?.[0] ?? fe.password?.[0] ?? parsed.error.flatten().formErrors[0] ?? "Invalid request.";
    return Response.json({ message: msg }, { status: 400 });
  }

  if (!verifyDashboardWorkEmail(adminEmail, parsed.data.email)) {
    return Response.json({ message: "Invalid email or password." }, { status: 401 });
  }

  if (!verifyDashboardPassword(password, parsed.data.password)) {
    return Response.json({ message: "Invalid email or password." }, { status: 401 });
  }

  const role: DashboardRole =
    (getEnv("MERCY_DASHBOARD_DEFAULT_ROLE") as DashboardRole | undefined) ??
    "super_admin";

  const token = signDashboardSession(secret, role);

  return Response.json({
    token,
    role,
    email: parsed.data.email.trim(),
  });
}
