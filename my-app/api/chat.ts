import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Check if API key exists
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('❌ API key is missing!');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { message } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('📨 Got your message:', message);

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: `You are Mercy AI, a professional assistant for Mercy Speaks Digital - a digital marketing and technology company.
    
    Core Services: Web development, AI integration, SEO, social media management, brand development, digital strategy.
    
    Communication Style:
    - Professional and direct
    - Concise responses (2-3 sentences when possible)
    - No excessive formatting or asterisks
    - No unnecessary elaboration
    - Provide actionable information only
    
    When responding:
    - Answer the specific question asked
    - Skip introductions unless it's the first message
    - Use natural paragraphs, not bullet lists (unless specifically helpful)
    - Suggest contacting the team (703-332-5956 or don@mercyspeaksdigital.com) for detailed consultations only when truly needed
    
    Focus on being helpful and efficient. Quality over quantity.`,
      messages: [{ role: 'user', content: message }],
    });

    console.log('✅ Claude answered!');

    const responseText = response.content[0].type === 'text' 
      ? response.content[0].text 
      : 'Sorry, I could not generate a response.';

    return new Response(
      JSON.stringify({ response: responseText }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('❌ Something broke:', error.message);
    
    return new Response(
      JSON.stringify({ 
        error: 'I am having trouble connecting right now. Please call us at (703) 332-5956 or email don@mercyspeaksdigital.com and we will help you right away! 📞',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
