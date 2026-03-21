/**
 * Server-only env for the internal Mercy AI Dashboard (Vite dev middleware + Vercel /api).
 * No database user table — one allowed work email + shared password + HMAC session secret.
 */

function trimEnv(name: string): string | undefined {
  const v = process.env[name];
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t.length > 0 ? t : undefined;
}

export type DashboardAuthEnv = {
  adminEmail: string;
  password: string;
  sessionSecret: string;
};

/**
 * Canonical password var: MERCY_DASHBOARD_PASSWORD.
 * MERCY_DASHBOARD_ADMIN_PASSWORD is accepted as an alias (common naming mistake).
 */
export function getDashboardPasswordFromEnv(): string | undefined {
  return trimEnv("MERCY_DASHBOARD_PASSWORD") ?? trimEnv("MERCY_DASHBOARD_ADMIN_PASSWORD");
}

export function getDashboardSessionSecret(): string | undefined {
  return trimEnv("MERCY_DASHBOARD_SESSION_SECRET");
}

export function getDashboardAuthEnv(): DashboardAuthEnv | null {
  const adminEmail = trimEnv("MERCY_DASHBOARD_ADMIN_EMAIL");
  const password = getDashboardPasswordFromEnv();
  const sessionSecret = getDashboardSessionSecret();
  if (!adminEmail || !password || !sessionSecret) return null;
  return { adminEmail, password, sessionSecret };
}

/** Short hint for 503 responses and logs (no secrets). */
export const DASHBOARD_AUTH_ENV_NAMES =
  "MERCY_DASHBOARD_ADMIN_EMAIL, MERCY_DASHBOARD_PASSWORD (or MERCY_DASHBOARD_ADMIN_PASSWORD), and MERCY_DASHBOARD_SESSION_SECRET";
