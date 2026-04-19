const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.ELEVENLABS_API_KEY;

async function createTool(toolConfig) {
  const response = await fetch('https://api.elevenlabs.io/v1/convai/tools', {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toolConfig)
  });
  const result = await response.json();
  console.log('Full response:', JSON.stringify(result, null, 2));
  return result;
}

async function main() {
  console.log('🔧 Creating tools on ElevenLabs...');
  const booking = JSON.parse(fs.readFileSync('tool_configs/mercy_booking_intent.json', 'utf8'));
  await createTool(booking);
}

main();
