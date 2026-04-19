const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.ELEVENLABS_API_KEY;
/** Primary message-capture webhook (matches Mercy-AI-Agent-LIVE agent.prompt.tool_ids[2]). */
const MESSAGE_TOOL_ID = 'tool_8901kph79z4benja6tr7jn4cma6d';

async function main() {
  console.log('📦 Reading message capture tool config...');
  const toolConfig = JSON.parse(fs.readFileSync('tool_configs/mercy_message_capture.json', 'utf8'));

  console.log('🚀 Updating message capture tool on ElevenLabs...');
  const response = await fetch(`https://api.elevenlabs.io/v1/convai/tools/${MESSAGE_TOOL_ID}`, {
    method: 'PATCH',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tool_config: toolConfig })
  });

  const result = await response.json();

  if (response.ok) {
    console.log('✅ Message capture tool updated successfully!');
  } else {
    console.log('❌ Error:', JSON.stringify(result, null, 2));
  }
}

main();
