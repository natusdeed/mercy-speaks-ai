/**
 * PATCH ElevenLabs ConvAI agent from disk WITHOUT mutating JSON.
 * Use after editing agent_configs/Mercy-AI-Agent-LIVE.json locally.
 * Requires ELEVENLABS_API_KEY in .env.local
 */
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

const API_KEY = process.env.ELEVENLABS_API_KEY;
const AGENT_ID = "agent_5601kmr4v057ebqvfjbg64jpatq2";
const LIVE = path.join(__dirname, "../agent_configs/Mercy-AI-Agent-LIVE.json");

/** API rejects PATCH when both prompt.tool_ids and prompt.tools are present (GET often returns both expanded). */
function sanitizeForPatch(config) {
  const c = JSON.parse(JSON.stringify(config));
  const prompt = c.conversation_config?.agent?.prompt;
  if (prompt && Array.isArray(prompt.tool_ids) && prompt.tool_ids.length > 0 && prompt.tools) {
    delete prompt.tools;
  }
  return c;
}

async function main() {
  if (!API_KEY) {
    console.error("Missing ELEVENLABS_API_KEY");
    process.exit(1);
  }
  const raw = JSON.parse(fs.readFileSync(LIVE, "utf8"));
  const config = sanitizeForPatch(raw);
  const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${AGENT_ID}`, {
    method: "PATCH",
    headers: {
      "xi-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(config),
  });
  const result = await response.json().catch(() => ({}));
  if (response.ok) {
    console.log("PATCH OK — live agent updated from Mercy-AI-Agent-LIVE.json");
  } else {
    console.error("PATCH failed:", response.status, JSON.stringify(result, null, 2));
    process.exit(1);
  }
}

main();
