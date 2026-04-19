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
    body: JSON.stringify({ tool_config: toolConfig })
  });
  const result = await response.json();
  return result.id;
}

async function main() {
  console.log('🔧 Creating all 3 tools on ElevenLabs...');

  const booking = JSON.parse(fs.readFileSync('tool_configs/mercy_booking_intent.json', 'utf8'));
  const handoff = JSON.parse(fs.readFileSync('tool_configs/mercy_handoff_request.json', 'utf8'));
  const message = JSON.parse(fs.readFileSync('tool_configs/mercy_message_capture.json', 'utf8'));

  const bookingId = await createTool(booking);
  console.log('✅ Booking Intent ID:', bookingId);

  const handoffId = await createTool(handoff);
  console.log('✅ Handoff Request ID:', handoffId);

  const messageId = await createTool(message);
  console.log('✅ Message Capture ID:', messageId);

  console.log('\n📋 All 3 Tool IDs:');
  console.log('Booking:', bookingId);
  console.log('Handoff:', handoffId);
  console.log('Message:', messageId);
}

main();
