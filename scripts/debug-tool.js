const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.ELEVENLABS_API_KEY;

async function main() {
  const booking = JSON.parse(fs.readFileSync('tool_configs/mercy_booking_intent.json', 'utf8'));
  
  const response = await fetch('https://api.elevenlabs.io/v1/convai/tools', {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tool_config: booking })
  });
  
  console.log('Status:', response.status);
  const result = await response.json();
  console.log('Full result:', JSON.stringify(result, null, 2));
}

main();
