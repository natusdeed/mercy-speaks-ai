#!/usr/bin/env node
/**
 * One-time (repeatable) generator for Mercy AI Dashboard env values.
 * Does not touch Supabase Auth — dashboard auth is env + HMAC sessions only.
 * There is no public signup; only the configured work email can sign in.
 *
 * Usage (repo root, any shell):
 *   npm run dashboard:bootstrap -- you@company.com
 *
 * Windows PowerShell: the `--` passes the email to the script (required).
 *
 * Copy the printed block into:
 *   - Local: my-app/.env.local  (recommended) or repo-root .env.local
 *   Vite loads both the repo root and my-app when you run `npm run dev`.
 *
 *   - Vercel: Project → Settings → Environment Variables
 *     Add each name for Production (and Preview if you use preview deploys).
 *
 * Restart `npm run dev` after editing .env.local. Redeploy after changing Vercel env.
 *
 * Re-run this script to rotate password + session secret; update env everywhere
 * before old sessions expire (existing browser sessions become invalid when secret changes).
 */

import { randomBytes } from "node:crypto";

const email = process.argv.slice(2).find((a) => !a.startsWith("-"));

if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error(
    "Usage: npm run dashboard:bootstrap -- <work-email@domain.com>\n" +
      "Example: npm run dashboard:bootstrap -- admin@mercyspeaksdigital.com"
  );
  process.exit(1);
}

const password = randomBytes(24).toString("base64url");
const sessionSecret = randomBytes(32).toString("hex");

console.log("\nMercy AI Dashboard — add these to your environment (keep secret):\n");
console.log(
  [
    `MERCY_DASHBOARD_ADMIN_EMAIL=${email}`,
    `MERCY_DASHBOARD_PASSWORD=${password}`,
    `MERCY_DASHBOARD_SESSION_SECRET=${sessionSecret}`,
    "",
    "# Optional:",
    "# MERCY_DASHBOARD_DEFAULT_ROLE=super_admin",
    "# MERCY_DASHBOARD_DEFAULT_TENANT_ID=demo",
  ].join("\n")
);
console.log(
  "\nLogin form:\n" +
    `  Email:    ${email}  (must match MERCY_DASHBOARD_ADMIN_EMAIL; comparison is case-insensitive)\n` +
    "  Password: the value of MERCY_DASHBOARD_PASSWORD above (copy exactly).\n" +
    "\nOptional alias: MERCY_DASHBOARD_ADMIN_PASSWORD=... (same as MERCY_DASHBOARD_PASSWORD).\n"
);
