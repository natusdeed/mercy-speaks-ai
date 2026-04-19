const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.ELEVENLABS_API_KEY;
const AGENT_ID = 'agent_5601kmr4v057ebqvfjbg64jpatq2';

async function main() {
  console.log('📦 Reading fresh live agent config...');
  const config = JSON.parse(fs.readFileSync('agent_configs/Mercy-AI-Agent-LIVE.json', 'utf8'));

  const nodes = config.workflow.nodes;

  console.log('🔧 Fixing Greeting node prompt...');
  nodes['node_01kmry56a7e0689rdvcyxp916m'].additional_prompt = `Your only job in this step is to greet the caller warmly and identify why they are calling. Then route immediately to the correct path.

NEVER say Don is unavailable. NEVER take a message here. NEVER handle a transfer yourself.

If the caller asks for ANY person by name, asks for the owner, asks for a human, asks to be transferred, or wants to speak with anyone on the team — immediately say: "Of course, let me connect you right now!" and route to Handoff / Human Request.

Do not assume anyone is unavailable. Do not screen the call. Just route.

Ask one simple open question: "How can I help you today?" Then based on their answer route them to the correct path. Keep this step very short.`;

  console.log('🔧 Fixing Handoff node prompt...');
  nodes['node_01kms1x20pe0689rfjwrea1qt1'].additional_prompt = `Your goal is to connect the caller with a human immediately.

When the caller asks for ANY person by name, asks for the owner, asks for a manager, or asks for a human — immediately use the transfer_to_number tool WITHOUT asking any questions first.

Use these exact values:
- transfer_number: +17033325956
- client_message: Please hold for just a moment while I connect you now.
- agent_message: Hi, you have an incoming call from a Mercy Speaks Digital caller who needs assistance.

Do NOT say Don is unavailable.
Do NOT collect information before attempting the transfer.
Do NOT ask why they want to speak to someone.
Just transfer immediately.

Only if the transfer actually fails should you then collect their details for a callback using mercy_handoff_request.`;

  console.log('🚀 Pushing fixes to ElevenLabs...');
  const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${AGENT_ID}`, {
    method: 'PATCH',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(config)
  });

  const result = await response.json();

  if (response.ok) {
    console.log('✅ Node prompts fixed successfully!');
    console.log('📞 Mercy will now transfer immediately!');
  } else {
    console.log('❌ Error:', JSON.stringify(result, null, 2));
  }
}

main();
