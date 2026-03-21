import { createHmac, timingSafeEqual } from "node:crypto";

const TOKEN_VERSION = 1;
const DEFAULT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function timingSafeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function verifyDashboardPassword(
  expected: string | undefined,
  attempt: string
): boolean {
  if (!expected || expected.length === 0) return false;
  return timingSafeStringEqual(expected, attempt);
}

/** Normalize work email for comparison (trim + lowercase). */
export function normalizeDashboardEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * True when `attempt` matches the allowed dashboard work email (timing-safe).
 * Both sides are normalized; empty `allowed` never matches.
 */
export function verifyDashboardWorkEmail(
  allowed: string | undefined,
  attempt: string
): boolean {
  if (!allowed || allowed.trim().length === 0) return false;
  return timingSafeStringEqual(
    normalizeDashboardEmail(allowed),
    normalizeDashboardEmail(attempt)
  );
}

export function signDashboardSession(
  secret: string,
  role: string,
  ttlMs: number = DEFAULT_TTL_MS
): string {
  const exp = Date.now() + ttlMs;
  const payload = Buffer.from(
    JSON.stringify({ v: TOKEN_VERSION, exp, role }),
    "utf8"
  ).toString("base64url");
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyDashboardSession(
  secret: string,
  token: string
): { role: string } | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expectedSig = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
  const a = Buffer.from(sig, "utf8");
  const b = Buffer.from(expectedSig, "utf8");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const json = Buffer.from(payload, "base64url").toString("utf8");
    const data = JSON.parse(json) as { v?: number; exp?: number; role?: string };
    if (data.v !== TOKEN_VERSION) return null;
    if (typeof data.exp !== "number" || typeof data.role !== "string") return null;
    if (Date.now() > data.exp) return null;
    return { role: data.role };
  } catch {
    return null;
  }
}
