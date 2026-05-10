/**
 * One-off: probe Phase 3 tables via PostgREST (no DDL). Loads my-app/.env.local.
 */
import { loadEnv } from "vite";
import { createClient } from "@supabase/supabase-js";

const mode = process.env.NODE_ENV || "development";
Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    console.log(JSON.stringify({ error: "missing_supabase_env" }, null, 2));
    process.exit(1);
  }
  const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const tables = [
    "organizations",
    "leads",
    "conversations",
    "bookings",
    "tasks",
    "approvals",
    "missed_revenue_events",
    "agent_runs",
    "tool_calls",
  ];

  async function probe(name: string) {
    const { error } = await sb.from(name).select("id").limit(1);
    return {
      name,
      ok: !error,
      code: error?.code ?? null,
      hint: error?.message?.slice(0, 160) ?? null,
    };
  }

  const table_probes: Awaited<ReturnType<typeof probe>>[] = [];
  for (const t of tables) {
    table_probes.push(await probe(t));
  }

  const { data, error } = await sb.from("leads").select("metadata").limit(1);
  const leads_metadata_probe = error
    ? { ok: false, code: error.code, message: error.message?.slice(0, 220) }
    : { ok: true, sample_has_metadata_key: !!(data?.[0] && typeof data[0] === "object" && "metadata" in data[0]) };

  console.log(JSON.stringify({ table_probes, leads_metadata_probe }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
