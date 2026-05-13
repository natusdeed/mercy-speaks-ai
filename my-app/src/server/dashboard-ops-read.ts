import type { SupabaseClient } from "@supabase/supabase-js";
import { requireDashboardSession } from "./dashboard-request-auth";
import { getDashboardSupabase } from "./supabase-dashboard";

export type OpsReadContext = { supabase: SupabaseClient; limit: number };

export function parseOpsListLimit(url: URL, fallback = 50, cap = 100): number {
  const raw = url.searchParams.get("limit");
  const n = raw == null || raw === "" ? NaN : Number(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(cap, Math.max(1, Math.floor(n)));
}

/**
 * Dashboard session + service-role Supabase (server-only). Returns a JSON Response on failure.
 */
export function requireOpsReadContext(request: Request): OpsReadContext | Response {
  const auth = requireDashboardSession(request);
  if (auth instanceof Response) return auth;

  const supabase = getDashboardSupabase();
  if (!supabase) {
    return Response.json(
      { message: "Supabase is not configured (SUPABASE_URL / SUPABASE_SERVICE_KEY)." },
      { status: 503 }
    );
  }

  const url = new URL(request.url);
  return { supabase, limit: parseOpsListLimit(url) };
}
