/**
 * Pushes agent_configs/Mercy-AI-Agent-LIVE.json to ElevenLabs without mutating tool IDs.
 * Use this after editing the LIVE config locally (workflow, prompts, etc.).
 *
 * Historical note: an older version of this script swapped webhook tool IDs to stale
 * values (tool_2101… / tool_6301… / tool_2701…), which broke workflow tool nodes.
 */
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.ELEVENLABS_API_KEY;
const AGENT_ID = 'agent_5601kmr4v057ebqvfjbg64jpatq2';

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
    console.error('Missing ELEVENLABS_API_KEY in .env.local');
    process.exit(1);
  }

  console.log('📦 Reading Mercy-AI-Agent-LIVE.json...');
  const raw = JSON.parse(fs.readFileSync('agent_configs/Mercy-AI-Agent-LIVE.json', 'utf8'));
  const config = sanitizeForPatch(raw);

  console.log('🚀 PATCH agent to ElevenLabs...');
  const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${AGENT_ID}`, {
    method: 'PATCH',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });

  const result = await response.json();

  if (response.ok) {
    console.log('✅ Agent updated successfully.');
  } else {
    console.error('❌ Error:', JSON.stringify(result, null, 2));
    process.exit(1);
  }
}

main();
