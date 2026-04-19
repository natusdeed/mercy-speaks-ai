const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.ELEVENLABS_API_KEY;
const AGENT_ID = 'agent_5601kmr4v057ebqvfjbg64jpatq2';

async function main() {
  console.log('📦 Reading agent config...');
  const agentConfig = JSON.parse(fs.readFileSync('agent_configs/Mercy-AI-Agent.json', 'utf8'));

  delete agentConfig.conversation_config.agent.prompt.tools;

  agentConfig.conversation_config.agent.prompt.tool_ids = [
    'tool_2101kpf6mhsze1ntd11w6syx9nvf',
    'tool_6301kpf6mhxefndr7mcb6t00h8jt',
    'tool_2701kpf6mhzqefqatmcsp9aybbtq'
  ];

  agentConfig.conversation_config.agent.prompt.system_tools = [
    {
      type: 'system',
      name: 'transfer_to_number',
      description: 'Transfer the caller to a human when they ask to speak to Don, the owner, a manager, or a real person, or when the issue is urgent, sensitive, or outside Mercy scope.',
      params: {
        system_tool_type: 'transfer_to_number',
        transfers: [
          {
            transfer_destination: {
              type: 'phone',
              phone_number: '+17033325956'
            },
            condition: 'When the caller asks to speak to Don, the owner, a manager, or a human, or when the issue is urgent, sensitive, complex, or outside Mercy scope.',
            transfer_type: 'conference',
            client_message: 'Please hold for just a moment while I connect you with Don.',
            agent_message: 'Hi Don, you have an incoming call from a Mercy Speaks Digital caller. They need your assistance.'
          }
        ]
      }
    }
  ];

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
    console.log('✅ Transfer tool added successfully!');
    console.log('📞 Mercy can now transfer calls to +17033325956!');
  } else {
    console.log('❌ Error:', JSON.stringify(result, null, 2));
  }
}

main();
