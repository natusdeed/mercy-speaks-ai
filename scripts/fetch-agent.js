const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.ELEVENLABS_API_KEY;
const AGENT_ID = 'agent_5601kmr4v057ebqvfjbg64jpatq2';

async function main() {
  console.log('📦 Fetching live agent config from ElevenLabs...');
  const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${AGENT_ID}`, {
    method: 'GET',
    headers: {
      'xi-api-key': API_KEY
    }
  });

  const result = await response.json();
  // Debugger breadcrumbs concatenate agent name + node label with no separator ("...AgentBooking...").
  // Keep one trailing space on the agent title so joined text stays readable after each pull.
  if (result.name === 'Mercy AI Agent') {
    result.name = 'Mercy AI Agent ';
  }
  const assigned = result.phone_numbers?.[0]?.assigned_agent;
  if (assigned?.agent_name === 'Mercy AI Agent') {
    assigned.agent_name = 'Mercy AI Agent ';
  }
  const mainLabel = result.platform_settings?.widget?.text_contents?.main_label;
  if (mainLabel === 'Mercy AI Agent') {
    result.platform_settings.widget.text_contents.main_label = 'Mercy AI Agent ';
  }
  fs.writeFileSync('agent_configs/Mercy-AI-Agent-LIVE.json', JSON.stringify(result, null, 2));
  console.log('✅ Live config saved to agent_configs/Mercy-AI-Agent-LIVE.json');
}

main();
