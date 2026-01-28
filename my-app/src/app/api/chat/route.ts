// #region agent log
fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:1',message:'API route module loading',data:{step:'module_init'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
// #endregion
import Anthropic from '@anthropic-ai/sdk';
// #region agent log
fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:3',message:'Anthropic SDK import',data:{hasAnthropic:typeof Anthropic!=='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion
import { NextRequest } from 'next/server';

// #region agent log
const logDebug = async (location: string, message: string, data: any, hypothesisId: string) => {
  try {
    await fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location, message, data, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId })
    }).catch(() => {});
  } catch {}
};
// #endregion

// #region agent log
fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:12',message:'Anthropic client initialization',data:{hasApiKey:!!process.env.ANTHROPIC_API_KEY,apiKeyLength:process.env.ANTHROPIC_API_KEY?.length||0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
// #endregion
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
// #region agent log
fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'route.ts:18',message:'Anthropic client created',data:{hasClient:!!anthropic},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
// #endregion

export async function POST(req: NextRequest) {
  // #region agent log
  await logDebug('route.ts:15', 'POST handler entry', { hasReq: !!req }, 'A');
  // #endregion
  
  try {
    // #region agent log
    const apiKey = process.env.ANTHROPIC_API_KEY || '';
    const apiKeyPublic = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '';
    await logDebug('route.ts:20', 'Environment variables check', {
      hasANTHROPIC_API_KEY: !!apiKey,
      apiKeyLength: apiKey.length,
      apiKeyPrefix: apiKey.substring(0, 8) + '...',
      hasNEXT_PUBLIC_ANTHROPIC_API_KEY: !!apiKeyPublic,
      apiKeyPublicLength: apiKeyPublic.length,
      allEnvKeys: Object.keys(process.env).filter(k => k.includes('ANTHROPIC') || k.includes('ANTHROPIC'))
    }, 'A');
    // #endregion
    
    // Check if API key exists
    if (!process.env.ANTHROPIC_API_KEY) {
      // #region agent log
      await logDebug('route.ts:30', 'API key missing - returning error', { 
        checkedKey: 'ANTHROPIC_API_KEY',
        hasNEXT_PUBLIC: !!apiKeyPublic
      }, 'A');
      // #endregion
      console.error('❌ API key is missing!');
      return Response.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // #region agent log
    await logDebug('route.ts:40', 'Before req.json()', { hasReq: !!req }, 'B');
    // #endregion
    
    const { message } = await req.json();

    // #region agent log
    await logDebug('route.ts:45', 'After req.json()', { 
      hasMessage: !!message,
      messageType: typeof message,
      messageLength: typeof message === 'string' ? message.length : 0,
      messagePreview: typeof message === 'string' ? message.substring(0, 50) : String(message).substring(0, 50)
    }, 'B');
    // #endregion

    if (!message) {
      // #region agent log
      await logDebug('route.ts:55', 'Message validation failed', { message }, 'B');
      // #endregion
      return Response.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    console.log('📨 Got your message:', message);

    // #region agent log
    await logDebug('route.ts:65', 'Before anthropic.messages.create', {
      model: 'claude-3-5-sonnet',
      hasApiKey: !!process.env.ANTHROPIC_API_KEY,
      apiKeyLength: process.env.ANTHROPIC_API_KEY?.length || 0,
      messageLength: typeof message === 'string' ? message.length : 0
    }, 'C');
    // #endregion

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

    // #region agent log
    await logDebug('route.ts:75', 'After anthropic.messages.create - success', {
      hasResponse: !!response,
      hasContent: !!response?.content,
      contentLength: response?.content?.length || 0,
      firstContentType: response?.content?.[0]?.type
    }, 'C');
    // #endregion

    console.log('✅ Claude answered!');

    const responseText = response.content[0].type === 'text' 
      ? response.content[0].text 
      : 'Sorry, I could not generate a response.';

    // #region agent log
    await logDebug('route.ts:85', 'Before returning success response', {
      responseTextLength: responseText.length,
      responseTextPreview: responseText.substring(0, 100)
    }, 'C');
    // #endregion

    return Response.json({ response: responseText });

  } catch (error: any) {
    // #region agent log
    const errorDetails = {
      name: error?.name,
      message: error?.message,
      stack: error?.stack?.substring(0, 500),
      cause: error?.cause,
      status: error?.status,
      statusCode: error?.statusCode,
      code: error?.code,
      type: typeof error
    };
    await logDebug('route.ts:95', 'Exception caught in POST handler', errorDetails, 'D');
    // #endregion
    
    console.error('❌ Something broke:', error.message);
    
    return Response.json(
      { 
        error: 'I am having trouble connecting right now. Please call us at (703) 332-5956 or email don@mercyspeaksdigital.com and we will help you right away! 📞',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
