const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.ELEVENLABS_API_KEY;
/** Handoff webhook (mercy_handoff_request; matches Mercy-AI-Agent-LIVE agent.prompt.tool_ids[1]). */
const HANDOFF_TOOL_ID = 'tool_4701kph79z4aft4v3h5txqda90zj';

async function main() {
  if (!API_KEY) {
    console.error('Missing ELEVENLABS_API_KEY in .env.local');
    process.exit(1);
  }

  console.log('📦 Reading mercy_handoff_request.json...');
  const toolConfig = JSON.parse(fs.readFileSync('tool_configs/mercy_handoff_request.json', 'utf8'));

  console.log('🚀 Updating handoff tool on ElevenLabs...');
  const response = await fetch(`https://api.elevenlabs.io/v1/convai/tools/${HANDOFF_TOOL_ID}`, {
    method: 'PATCH',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tool_config: toolConfig }),
  });

  const result = await response.json();

  if (response.ok) {
    console.log('✅ Handoff tool updated successfully!');
  } else {
    console.log('❌ Error:', JSON.stringify(result, null, 2));
    process.exit(1);
  }
}

main();
