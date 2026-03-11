import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Send, Minimize2, Maximize2, RefreshCw, Calendar, Mail } from 'lucide-react';
import { BookingLink } from '@/components/cta/booking-link';

// =============================================================================
// WEBSITE CHATBOT — OpenAI, conversion-focused: quick replies, lead capture, guardrails
// =============================================================================

const MAX_MESSAGE_LENGTH = 2000;
const FALLBACK_MESSAGE =
  "I'm having trouble connecting right now. Please call us at (703) 332-5956 or email don@mercyspeaksdigital.com and we'll help you right away! 📞";

const GREETING =
  "Hi! I'm Mercy AI, your guide here. I can help with **pricing**, **booking a demo**, or questions about **AI receptionists**, **automating follow-up**, and more. What would you like to know?";

const QUICK_REPLIES = [
  { label: "Pricing", value: "What are your pricing options?" },
  { label: "Book Demo", value: "I'd like to book a demo." },
  { label: "Stop missing calls", value: "We're missing calls after hours. What can you do?" },
  { label: "Automate follow-up", value: "How can we automate follow-up with leads?" },
  { label: "Talk to a human", value: "I'd prefer to talk to a human. How do I reach your team?" },
] as const;

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ClaudeChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: GREETING, timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<'idle' | 'error' | 'rate-limited'>('idle');
  const [retryCount, setRetryCount] = useState(0);

  // Lead capture: show after 2 assistant replies OR when API returns askForLead
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({ businessName: '', email: '', phone: '' });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => scrollToBottom(), [messages]);
  useEffect(() => {
    if (isOpen && !isMinimized) inputRef.current?.focus();
  }, [isOpen, isMinimized]);

  const assistantReplyCount = messages.filter((m) => m.role === 'assistant').length;

  const sendToApi = async (userMessage: string): Promise<{
    ok: boolean;
    response?: string;
    askForLead?: boolean;
    error?: string;
    fallbackMessage?: string;
    retryAfter?: number;
  }> => {
    const conversationHistory = messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({ role: m.role, content: m.content }));
    const context = typeof window !== 'undefined' ? window.location.pathname : undefined;

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userMessage: userMessage.slice(0, MAX_MESSAGE_LENGTH),
        conversationHistory: conversationHistory.slice(-20),
        context,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (response.status === 429) {
      return { ok: false, error: data.error || 'Too many requests', retryAfter: data.retryAfter };
    }
    if (response.status === 400) {
      return { ok: false, error: data.error || 'Invalid request' };
    }
    if (!response.ok) {
      return {
        ok: false,
        error: data.error || 'Request failed',
        fallbackMessage: data.fallbackMessage || FALLBACK_MESSAGE,
      };
    }
    return {
      ok: true,
      response: data.response,
      askForLead: Boolean(data.askForLead),
    };
  };

  const handleSend = async (overrideMessage?: string) => {
    const raw = (overrideMessage ?? input.trim()).slice(0, MAX_MESSAGE_LENGTH);
    if (!raw || isLoading) return;

    setInput('');
    setIsLoading(true);
    setErrorState('idle');

    const newUserMessage: Message = { role: 'user', content: raw, timestamp: new Date() };
    setMessages((prev) => [...prev, newUserMessage]);

    const result = await sendToApi(raw);
    setIsLoading(false);

    if (result.ok && result.response) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: result.response!, timestamp: new Date() },
      ]);
      setErrorState('idle');
      setRetryCount(0);
      // Show lead form after 2 assistant replies OR when API says askForLead
      const shouldAskLead = result.askForLead || assistantReplyCount + 1 >= 2;
      if (shouldAskLead && !showLeadForm && !leadSubmitted) setShowLeadForm(true);
      return;
    }

    if (result.retryAfter != null) setErrorState('rate-limited');
    else setErrorState('error');

    const fallback = result.fallbackMessage || result.error || FALLBACK_MESSAGE;
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: fallback, timestamp: new Date() },
    ]);
  };

  const handleRetry = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUser) {
      setMessages((prev) => prev.slice(0, -2));
      setRetryCount((c) => c + 1);
      handleSend(lastUser.content);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = (value: string) => {
    handleSend(value);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadError(null);
    const { businessName, email, phone } = leadForm;
    if (!businessName.trim() || !email.trim() || !phone.trim()) {
      setLeadError('Please fill in business name, email, and phone.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setLeadError('Please enter a valid phone number.');
      return;
    }
    setLeadSubmitting(true);
    try {
      const res = await fetch('/api/chat/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: businessName.trim(),
          name: businessName.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setLeadError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setLeadSubmitted(true);
    } catch {
      setLeadError('Network error. Please try again.');
    } finally {
      setLeadSubmitting(false);
    }
  };

  const showQuickReplies =
    messages.length <= 1 && !isLoading && !showLeadForm && !leadSubmitted;

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-linear-to-r from-purple-600 to-pink-600 p-2 rounded-full hover:scale-110 transition-transform duration-300 border-4 border-white animate-slow-glow"
          aria-label="Open chat"
        >
          <img
            src="/images/Mercy-avatar.png"
            alt="Mercy AI Assistant"
            width={60}
            height={60}
            className="rounded-full object-cover w-[60px] h-[60px]"
          />
        </button>
      )}

      {isOpen && (
        <div
          className={`fixed bottom-6 left-6 z-50 bg-slate-900 border-2 border-purple-500/30 rounded-2xl shadow-2xl transition-all ${
            isMinimized ? 'w-80 h-16' : 'w-96 h-[600px] max-h-[90vh]'
          } flex flex-col`}
        >
          <div className="bg-linear-to-r from-purple-500 to-pink-500 p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/images/Mercy-avatar.png"
                alt="Mercy AI"
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover shadow-lg"
              />
              <div>
                <div className="font-bold text-white text-lg">Mercy AI</div>
                <div className="text-xs text-purple-100 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Online • Responds instantly
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                aria-label={isMinimized ? 'Maximize' : 'Minimize'}
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
                        {message.content.replace(/\*\*(.*?)\*\*/g, '$1')}
                      </div>
                      <div
                        className={`text-xs mt-1.5 ${
                          message.role === 'user' ? 'text-purple-100' : 'text-slate-400'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700 border border-slate-600 rounded-2xl px-4 py-3 shadow-lg">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" />
                        <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}

                {showQuickReplies && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {QUICK_REPLIES.map(({ label, value }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => handleQuickReply(value)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-700/80 text-slate-200 border border-slate-600 hover:bg-slate-600 hover:border-slate-500 transition-colors"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}

                {showLeadForm && !leadSubmitted && (
                  <div className="rounded-2xl bg-slate-700/80 border border-slate-600 p-4 space-y-3">
                    <p className="text-sm text-slate-200 font-medium">
                      Get a tailored quote or demo — share your details and we&apos;ll follow up quickly.
                    </p>
                    <form onSubmit={handleLeadSubmit} className="space-y-2">
                      <input
                        type="text"
                        placeholder="Business name"
                        value={leadForm.businessName}
                        onChange={(e) => setLeadForm((f) => ({ ...f, businessName: e.target.value }))}
                        className="w-full rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm((f) => ({ ...f, phone: e.target.value }))}
                        className="w-full rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                      />
                      {leadError && (
                        <p className="text-xs text-amber-400" role="alert">{leadError}</p>
                      )}
                      <button
                        type="submit"
                        disabled={leadSubmitting}
                        className="w-full rounded-lg bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-medium py-2.5 hover:opacity-90 disabled:opacity-50"
                      >
                        {leadSubmitting ? 'Sending…' : 'Submit'}
                      </button>
                    </form>
                  </div>
                )}

                {leadSubmitted && (
                  <div className="rounded-2xl bg-slate-700/80 border border-slate-600 p-4 space-y-2">
                    <p className="text-sm text-slate-200 font-medium">
                      Thanks! We&apos;ve received your info and will reach out soon.
                    </p>
                    <BookingLink className="inline-flex items-center gap-1.5 text-sm font-medium text-neon-cyan hover:text-cyan-300">
                      <Calendar className="w-4 h-4" />
                      Schedule a demo
                    </BookingLink>
                  </div>
                )}

                {errorState !== 'idle' && !isLoading && (
                  <div className="rounded-2xl bg-slate-700/80 border border-slate-600 p-3 space-y-2">
                    <p className="text-xs text-slate-300">
                      {errorState === 'rate-limited'
                        ? 'Too many messages. Please wait a moment.'
                        : 'Something went wrong. You can still reach us directly:'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-600 text-slate-200 border border-slate-500 hover:bg-slate-500"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Try again
                      </button>
                      <BookingLink className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-600 text-white hover:bg-purple-500">
                        <Calendar className="w-3.5 h-3.5" />
                        Book a demo
                      </BookingLink>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-600 text-slate-200 border border-slate-500 hover:bg-slate-500"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Contact us
                      </Link>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 bg-slate-900 rounded-b-2xl border-t border-slate-700">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    maxLength={MAX_MESSAGE_LENGTH}
                    className="flex-1 bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-5 py-3 rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-xs text-slate-500 mt-2.5 text-center">
                  {input.length > MAX_MESSAGE_LENGTH * 0.9 && (
                    <span className="text-amber-400">{input.length}/{MAX_MESSAGE_LENGTH}</span>
                  )}
                  {' '}
                  Powered by AI • <a href="tel:7033325956" className="text-purple-400 hover:text-purple-300 font-medium">Call (703) 332-5956</a>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
