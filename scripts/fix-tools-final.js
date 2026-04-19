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

  console.log('🔧 Setting up tools correctly...');
  const prompt = config.conversation_config.agent.prompt;
  delete prompt.tool_ids;
  delete prompt.tools;
  delete prompt.system_tools;

  prompt.tool_ids = [
    'tool_2101kpf6mhsze1ntd11w6syx9nvf',
    'tool_6301kpf6mhxefndr7mcb6t00h8jt',
    'tool_2701kpf6mhzqefqatmcsp9aybbtq'
  ];

  prompt.system_tools = [
    {
      name: 'end_call',
      description: 'Use this tool to end the conversation after saying goodbye to the caller.',
      params: {
        system_tool_type: 'end_call'
      }
    },
    {
      name: 'transfer_to_number',
      description: 'Transfer the caller to Don when they ask to speak with a human, Don, the owner, or a manager.',
      params: {
        system_tool_type: 'transfer_to_number',
        transfers: [
          {
            transfer_destination: {
              type: 'phone',
              phone_number: '+17033325956'
            },
            condition: 'When the caller asks to speak with Don, the owner, a manager, or any human.',
            transfer_type: 'conference',
            client_message: 'Please hold while I connect you with Don.',
            agent_message: 'Hi Don, incoming call from a Mercy Speaks Digital caller needing your assistance.'
          }
        ]
      }
    }
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
    console.log('✅ All tools fixed successfully!');
    console.log('📞 Transfer tool is live!');
    console.log('🔇 End call tool is live!');
  } else {
    console.log('❌ Error:', JSON.stringify(result, null, 2));
  }
}

main();
