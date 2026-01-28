'use client';

// #region agent log
if (typeof window !== 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ClaudeChatbot.tsx:2',message:'ClaudeChatbot module loaded',data:{moduleType:'tsx',hasReact:typeof React!=='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'H'})}).catch(()=>{}); }
// #endregion
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { MessageSquare, X, Send, Minimize2, Maximize2 } from 'lucide-react';

// =============================================================================
// CLAUDE CHATBOT WIDGET - NEXT.JS VERSION
// =============================================================================
// Built for: Mercy Speaks Digital
// Framework: Next.js
// Purpose: Lead capture, service demo, client conversations
// Cost: ~$5-10/month (Claude API)
// =============================================================================

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// #region agent log
export default function ClaudeChatbot() {
  if (typeof window !== 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ClaudeChatbot.tsx:19',message:'ClaudeChatbot function entry',data:{functionType:typeof ClaudeChatbot,isFunction:typeof ClaudeChatbot==='function'},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'I'})}).catch(()=>{}); }
  // #endregion
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm here to help. You can chat with me about our services, or I can connect you with our team. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Note: This widget sends messages to our server route (`/api/chat`),
  // so no client-side Anthropic API key is required.

  // Send message
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
  
    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
  
    // Add user message to chat
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);
  
    try {
      console.log('🚀 Sending message to API...');
      
      // #region agent log
      if (typeof window !== 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ClaudeChatbot.tsx:196',message:'Before fetch to /api/chat',data:{userMessageLength:userMessage.length,userMessagePreview:userMessage.substring(0,50),endpoint:'/api/chat'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{}); }
      // #endregion
  
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
  
      // #region agent log
      if (typeof window !== 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ClaudeChatbot.tsx:205',message:'After fetch - response received',data:{ok:response.ok,status:response.status,statusText:response.statusText,headers:Object.fromEntries(response.headers.entries())},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{}); }
      // #endregion
  
      console.log('📡 Got response from API');
  
      const data = await response.json();
      
      // #region agent log
      if (typeof window !== 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ClaudeChatbot.tsx:212',message:'Response JSON parsed',data:{hasError:!!data.error,hasResponse:!!data.response,errorMessage:data.error,responseLength:data.response?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{}); }
      // #endregion
  
      if (!response.ok) {
        // #region agent log
        if (typeof window !== 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ClaudeChatbot.tsx:216',message:'Response not OK - throwing error',data:{status:response.status,statusText:response.statusText,error:data.error,details:data.details},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{}); }
        // #endregion
        console.error('❌ API said no:', data.error);
        throw new Error(data.error || 'Failed to get response');
      }
  
      console.log('✅ Success! Claude replied:', data.response);
  
      const newAIMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
  
      setMessages(prev => [...prev, newAIMessage]);
  
    } catch (error: any) {
      // #region agent log
      const errorDetails = error instanceof Error ? {name:error.name,message:error.message,stack:error.stack?.substring(0,500)} : {type:typeof error,value:String(error)};
      if (typeof window !== 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ClaudeChatbot.tsx:230',message:'Exception caught in handleSend',data:errorDetails,timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{}); }
      // #endregion
      
      console.error('💥 Error happened:', error);
      
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please call us at (703) 332-5956 or email don@mercyspeaksdigital.com and we'll help you right away! 📞",
        timestamp: new Date()
      };
  
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple lead detection
  const checkForLeadCapture = (userMsg: string) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/;
    
    if (emailRegex.test(userMsg) || phoneRegex.test(userMsg)) {
      // Lead info detected - send notification
      sendLeadNotification(userMsg);
    }
  };

  // Send lead notification
  const sendLeadNotification = async (message: string) => {
    try {
      // You can connect this to your email service or database
      const leadData = {
        conversation: messages,
        lastMessage: message,
        timestamp: new Date().toISOString(),
        email: 'don@mercyspeaksdigital.com'
      };

      console.log('🎯 New lead detected:', leadData);
      
      // TODO: Connect to your backend API
      // await fetch('/api/send-lead', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(leadData)
      // });
    } catch (error) {
      console.error('Lead notification error:', error);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
    {/* Chat Button */}
{!isOpen && (
  <button
    onClick={() => setIsOpen(true)}
className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full hover:scale-110 transition-transform duration-300 border-4 border-white animate-slow-glow"
    aria-label="Open chat"
  >
    <Image
      src="/images/mercy-avatar.png"
      alt="Mercy AI Assistant"
      width={60}
      height={60}
      className="rounded-full object-cover"
    />
  </button>
)}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 left-6 z-50 bg-slate-900 border-2 border-purple-500/30 rounded-2xl shadow-2xl transition-all ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px] max-h-[90vh]'
        } flex flex-col`}>
          
          {/* Header */}
          <div className="bg-linear-to-r from-purple-500 to-pink-500 p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg">
                🤖
              </div>
              <div>
                <div className="font-bold text-white text-lg">Mercy AI</div>
                <div className="text-xs text-purple-100 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Online • Responds instantly
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-linear-to-b from-slate-800/50 to-slate-900/50">
                {messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-lg ${
                        message.role === 'user'
                          ? 'bg-linear-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-slate-700 text-slate-100 border border-slate-600'
                      }`}
                    >
                      <div className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </div>
                      <div className={`text-xs mt-1.5 ${
                        message.role === 'user' ? 'text-purple-100' : 'text-slate-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700 border border-slate-600 rounded-2xl px-4 py-3 shadow-lg">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-slate-900 rounded-b-2xl border-t border-slate-700">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-5 py-3 rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-xs text-slate-500 mt-2.5 text-center">
                  Powered by Claude AI • <a href="tel:7033325956" className="text-purple-400 hover:text-purple-300 font-medium">Call (703) 332-5956</a>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
