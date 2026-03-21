import { verifyDashboardSession } from "../lib/dashboard-session";
import { getDashboardSessionSecret } from "./dashboard-auth-env";

function getBearerToken(request: Request): string | null {
  const raw = request.headers.get("authorization");
  if (!raw?.startsWith("Bearer ")) return null;
  const t = raw.slice(7).trim();
  return t.length > 0 ? t : null;
}

/**
 * Validates Mercy AI Dashboard session (server-only). Returns session or a JSON Response.
 */
export function requireDashboardSession(request: Request): { role: string } | Response {
  const secret = getDashboardSessionSecret();
  if (!secret) {
    return Response.json(
      { message: "Dashboard session is not configured on the server." },
      { status: 503 }
    );
  }

  const token = getBearerToken(request);
  if (!token) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  const session = verifyDashboardSession(secret, token);
  if (!session) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  return session;
}
