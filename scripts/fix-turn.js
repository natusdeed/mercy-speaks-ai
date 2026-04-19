const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.ELEVENLABS_API_KEY;
const AGENT_ID = 'agent_5601kmr4v057ebqvfjbg64jpatq2';

async function main() {
  console.log('📦 Reading fresh live agent config...');
  const config = JSON.parse(fs.readFileSync('agent_configs/Mercy-AI-Agent-LIVE.json', 'utf8'));

  console.log('🔧 Fixing turn settings...');
  config.conversation_config.turn.turn_timeout = 15;
  config.conversation_config.turn.silence_end_call_timeout = 10;
  config.conversation_config.turn.soft_timeout_config = {
    timeout_seconds: -1,
    message: "I'm still here if you need anything.",
    use_llm_generated_message: false
  };

  console.log('🔧 Cleaning up tools...');
  const prompt = config.conversation_config.agent.prompt;
  delete prompt.tool_ids;
  delete prompt.tools;
  delete prompt.system_tools;

  prompt.tool_ids = [
    'tool_2101kpf6mhsze1ntd11w6syx9nvf',
    'tool_6301kpf6mhxefndr7mcb6t00h8jt',
    'tool_2701kpf6mhzqefqatmcsp9aybbtq'
  ];

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
    console.log('✅ All fixes applied successfully!');
    console.log('🎙️ Turn timeout fixed to 15 seconds!');
    console.log('🔇 Soft timeout message fixed!');
    console.log('🔧 Tools cleaned up!');
  } else {
    console.log('❌ Error:', JSON.stringify(result, null, 2));
  }
}

main();
