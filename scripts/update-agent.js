const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.ELEVENLABS_API_KEY;
const AGENT_ID = 'agent_5601kmr4v057ebqvfjbg64jpatq2';

async function main() {
  console.log('📦 Reading agent config...');
  const agentConfig = JSON.parse(fs.readFileSync('agent_configs/Mercy-AI-Agent.json', 'utf8'));

  agentConfig.conversation_config.agent.prompt.tool_ids = [
    'tool_5301kph79z49fj2vz5p6xr6gcp2p',
    'tool_4701kph79z4aft4v3h5txqda90zj',
    'tool_8901kph79z4benja6tr7jn4cma6d'
  ];

  agentConfig.conversation_config.agent.prompt.temperature = 0.4;
  agentConfig.conversation_config.turn.turn_timeout = 15;

  console.log('🚀 Pushing updated agent to ElevenLabs...');
  const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${AGENT_ID}`, {
    method: 'PATCH',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(agentConfig)
  });

  const result = await response.json();

  if (response.ok) {
    console.log('✅ Agent updated successfully!');
    console.log('🎙️ Mercy AI Agent is now LIVE with real webhooks!');
  } else {
    console.log('❌ Error:', JSON.stringify(result, null, 2));
  }
}

main();
