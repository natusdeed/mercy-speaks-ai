/**
 * One-off: apply 005_phase3_completion.sql then 005_phase3_completion.verify.sql
 * using pg. Loads DATABASE_URL from my-app/.env.local, then repo-root .env.local.
 * Does not print secrets.
 *
 * Run from my-app (so pg resolves under npx -p pg):
 *   npx --yes -p pg -c "node scripts/apply-phase3-completion-pg-once.mjs"
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const myAppRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(myAppRoot, "..");

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  const raw = fs.readFileSync(filePath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"') && val.length >= 2) ||
      (val.startsWith("'") && val.endsWith("'") && val.length >= 2)
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function resolveDatabaseUrl() {
  const fromMyApp = parseEnvFile(path.join(myAppRoot, ".env.local"));
  const fromRoot = parseEnvFile(path.join(repoRoot, ".env.local"));
  const url = (fromMyApp.DATABASE_URL || fromRoot.DATABASE_URL || "").trim();
  return url || null;
}

/**
 * Split SQL on semicolons outside quotes, -- comments, block comments, and dollar-quoted bodies.
 */
function splitSqlStatements(sql) {
  const statements = [];
  let start = 0;
  let i = 0;
  const len = sql.length;
  let state = "normal"; // normal | sq | dq | line_comment | block_comment | dollar
  let dollarTag = "";

  const pushIfAny = (end) => {
    const chunk = sql.slice(start, end).trim();
    if (chunk) statements.push(chunk);
    start = end + 1;
  };

  while (i < len) {
    const c = sql[i];
    const n = i + 1 < len ? sql[i + 1] : "";

    if (state === "normal") {
      if (c === "'") {
        state = "sq";
        i++;
        continue;
      }
      if (c === '"') {
        state = "dq";
        i++;
        continue;
      }
      if (c === "-" && n === "-") {
        state = "line_comment";
        i += 2;
        continue;
      }
      if (c === "/" && n === "*") {
        state = "block_comment";
        i += 2;
        continue;
      }
      if (c === "$") {
        let j = i + 1;
        while (j < len && /[a-zA-Z0-9_]/.test(sql[j])) j++;
        if (j < len && sql[j] === "$") {
          dollarTag = sql.slice(i, j + 1);
          state = "dollar";
          i = j + 1;
          continue;
        }
      }
      if (c === ";") {
        pushIfAny(i);
      }
      i++;
      continue;
    }

    if (state === "sq") {
      if (c === "'") {
        if (n === "'") {
          i += 2;
          continue;
        }
        state = "normal";
      }
      i++;
      continue;
    }

    if (state === "dq") {
      if (c === '"') {
        if (n === '"') {
          i += 2;
          continue;
        }
        state = "normal";
      }
      i++;
      continue;
    }

    if (state === "line_comment") {
      if (c === "\n" || c === "\r") state = "normal";
      i++;
      continue;
    }

    if (state === "block_comment") {
      if (c === "*" && n === "/") {
        state = "normal";
        i += 2;
        continue;
      }
      i++;
      continue;
    }

    if (state === "dollar") {
      if (sql.startsWith(dollarTag, i)) {
        state = "normal";
        i += dollarTag.length;
        continue;
      }
      i++;
      continue;
    }
  }

  const tail = sql.slice(start).trim();
  if (tail) statements.push(tail);
  return statements;
}

async function main() {
  const databaseUrl = resolveDatabaseUrl();
  if (!databaseUrl) {
    console.error("DATABASE_URL missing in my-app/.env.local and repo-root .env.local");
    process.exit(1);
  }

  const client = new pg.Client({
    connectionString: databaseUrl,
    // Supabase / many hosts require TLS; URL sslmode is usually enough.
    ssl: databaseUrl.includes("sslmode=require") ? { rejectUnauthorized: false } : undefined,
  });

  try {
    await client.connect();
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.log(
      JSON.stringify(
        {
          migration_applied: false,
          migration_errors: [{ index: -1, message: `connect_failed: ${msg}` }],
          verification_ran: false,
        },
        null,
        2
      )
    );
    process.exit(1);
  }

  const migrationPath = path.join(repoRoot, "supabase", "migrations", "005_phase3_completion.sql");
  const verifyPath = path.join(repoRoot, "supabase", "migrations", "005_phase3_completion.verify.sql");

  const migrationSql = fs.readFileSync(migrationPath, "utf8");
  const verifySql = fs.readFileSync(verifyPath, "utf8");

  const migrationStmts = splitSqlStatements(migrationSql);
  const verifyStmts = splitSqlStatements(verifySql);

  const migrationErrors = [];

  for (let s = 0; s < migrationStmts.length; s++) {
    const stmt = migrationStmts[s];
    try {
      await client.query(stmt);
    } catch (e) {
      migrationErrors.push({
        index: s,
        message: e instanceof Error ? e.message : String(e),
      });
      try {
        await client.query("ROLLBACK");
      } catch {
        /* ignore */
      }
      await client.end();
      console.log(
        JSON.stringify(
          {
            migration_applied: false,
            migration_errors: migrationErrors,
            verification_ran: false,
          },
          null,
          2
        )
      );
      process.exit(1);
    }
  }

  const verifyResults = [];
  const verifyErrors = [];

  for (let s = 0; s < verifyStmts.length; s++) {
    const stmt = verifyStmts[s];
    try {
      const res = await client.query(stmt);
      verifyResults.push({
        index: s,
        rowCount: res.rowCount,
        fields: res.fields?.map((f) => f.name) ?? [],
        rows: res.rows,
      });
    } catch (e) {
      verifyErrors.push({
        index: s,
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }

  await client.end();

  console.log(
    JSON.stringify(
      {
        migration_applied: true,
        migration_statement_count: migrationStmts.length,
        verification_ran: true,
        verify_statement_count: verifyStmts.length,
        verify_errors: verifyErrors,
        verify_results: verifyResults,
      },
      null,
      2
    )
  );

  process.exit(verifyErrors.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
