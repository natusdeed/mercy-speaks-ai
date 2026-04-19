const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.ELEVENLABS_API_KEY;
/** Booking webhook (mercy_booking_intent; matches Mercy-AI-Agent-LIVE agent.prompt.tool_ids[0]). */
const BOOKING_TOOL_ID = 'tool_5301kph79z49fj2vz5p6xr6gcp2p';

async function main() {
  if (!API_KEY) {
    console.error('Missing ELEVENLABS_API_KEY in .env.local');
    process.exit(1);
  }

  console.log('📦 Reading mercy_booking_intent.json...');
  const toolConfig = JSON.parse(fs.readFileSync('tool_configs/mercy_booking_intent.json', 'utf8'));

  console.log('🚀 Updating booking tool on ElevenLabs...');
  const response = await fetch(`https://api.elevenlabs.io/v1/convai/tools/${BOOKING_TOOL_ID}`, {
    method: 'PATCH',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tool_config: toolConfig }),
  });

  const result = await response.json();

  if (response.ok) {
    console.log('✅ Booking tool updated successfully!');
  } else {
    console.log('❌ Error:', JSON.stringify(result, null, 2));
    process.exit(1);
  }
}

main();
