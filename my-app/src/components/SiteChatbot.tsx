'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Minimize2, Maximize2, RefreshCw, Calendar, Mail, Phone } from 'lucide-react';
import { BookingLink } from '@/components/cta/booking-link';
// Contact links use <a href> for compatibility with current Vite build. On Next.js App Router, use: import Link from 'next/link' and <Link href="/contact">.

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

/** Lightweight intent check: user wants to book/schedule/call/talk — show CTA card without calling API. */
function isBookingIntent(text: string): boolean {
  const lower = text.toLowerCase().trim();
  const triggers = [
    'book a demo', 'book demo', 'schedule a demo', 'schedule demo',
    'schedule', 'book a call', 'book call', 'schedule a call', 'schedule a meeting',
    'call', 'talk', 'meeting', 'set up a call', 'set up call',
    'speak with', 'speak to', 'talk to someone', 'talk with',
  ];
  return triggers.some((t) => lower.includes(t));
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  /** When true, render Book a Demo + Contact CTA card below this message. */
  showBookingCta?: boolean;
}

export default function SiteChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: GREETING, timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<'idle' | 'error' | 'rate-limited'>('idle');
  const [retryCount, setRetryCount] = useState(0);
  /** When true, show the calm premium fallback card (Book demo, Contact, Call) instead of spamming history. */
  const [showPremiumFallback, setShowPremiumFallback] = useState(false);

  // Lead capture: show after 2 assistant replies OR when API returns askForLead
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({ businessName: '', email: '', phone: '' });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const userScrolledUpRef = useRef(false);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const isNearBottom = (el: HTMLDivElement, threshold = 120) => {
    const { scrollTop, scrollHeight, clientHeight } = el;
    return scrollHeight - scrollTop - clientHeight <= threshold;
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || !messages.length) return;
    if (userScrolledUpRef.current) return;
    scrollToBottom('smooth');
  }, [messages, isLoading]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const onScroll = () => {
      userScrolledUpRef.current = !isNearBottom(el);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized) inputRef.current?.focus();
  }, [isOpen, isMinimized]);

  // #region agent log
  useEffect(() => {
    if (!isOpen || isMinimized || !messages.length) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    const t = setTimeout(() => {
      const bubbles = el.querySelectorAll('[data-chat-bubble]');
      bubbles.forEach((b, i) => {
        const div = b as HTMLDivElement;
        const content = div.querySelector('[data-chat-bubble-content]') as HTMLDivElement | null;
        const ow = div.offsetWidth;
        const sw = div.scrollWidth;
        const oh = div.offsetHeight;
        const sh = div.scrollHeight;
        const overflowX = sw > ow;
        const overflowY = sh > oh;
        const msg = messages[i];
        const hid = overflowX ? 'H1' : (overflowY ? 'H2' : 'H0');
        const ancestors: { tag: string; overflow: string; overflowY: string }[] = [];
        let node: HTMLElement | null = div;
        while (node && node !== el) {
          const cs = window.getComputedStyle(node);
          ancestors.push({ tag: node.tagName + (node.className ? '.' + (node.className as string).slice(0, 40) : ''), overflow: cs.overflow, overflowY: cs.overflowY });
          node = node.parentElement;
        }
        const scrollEl = el;
        const scrollCs = window.getComputedStyle(scrollEl);
        fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1d1fa1'},body:JSON.stringify({sessionId:'1d1fa1',location:'SiteChatbot.tsx:bubble-measure',message:'bubble dimensions',data:{index:i,role:msg?.role,overflowX,overflowY,offsetWidth:ow,scrollWidth:sw,offsetHeight:oh,scrollHeight:sh,contentLen:msg?.content?.length,ancestors,scrollOverflow:scrollCs.overflow,scrollOverflowY:scrollCs.overflowY},timestamp:Date.now(),hypothesisId:hid})}).catch(()=>{});
      });
    }, 100);
    return () => clearTimeout(t);
  }, [messages, isOpen, isMinimized]);
  // #endregion

  const assistantReplyCount = messages.filter((m) => m.role === 'assistant').length;

  const sendToApi = async (userMessage: string): Promise<{
    ok: boolean;
    response?: string;
    askForLead?: boolean;
    fallbackCta?: boolean;
    error?: string;
    fallbackMessage?: string;
    retryAfter?: number;
    networkError?: boolean;
  }> => {
    const logUrl = 'http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504';
    const conversationHistory = messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({ role: m.role, content: m.content }));
    const context = typeof window !== 'undefined' ? window.location.pathname : undefined;

    let response: Response;
    // #region agent log
    try {
      fetch(logUrl,{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'7bd99d'},body:JSON.stringify({sessionId:'7bd99d',location:'SiteChatbot.tsx:sendToApi',message:'fetch start',data:{url:'/api/chat'},timestamp:Date.now(),hypothesisId:'H2'})}).catch(()=>{});
      response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: userMessage.slice(0, MAX_MESSAGE_LENGTH),
          conversationHistory: conversationHistory.slice(-20),
          context,
        }),
        cache: 'no-store',
      });
    } catch (e) {
      fetch(logUrl,{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'7bd99d'},body:JSON.stringify({sessionId:'7bd99d',location:'SiteChatbot.tsx:sendToApi',message:'fetch threw',data:{networkError:true,err:String(e)},timestamp:Date.now(),hypothesisId:'H2'})}).catch(()=>{});
      return { ok: false, error: 'Failed to fetch', networkError: true };
    }
    // #endregion

    let data: Record<string, unknown> = {};
    const contentType = response.headers.get('content-type');
    // #region agent log
    fetch(logUrl,{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'7bd99d'},body:JSON.stringify({sessionId:'7bd99d',location:'SiteChatbot.tsx:sendToApi',message:'response',data:{status:response.status,ok:response.ok,contentType:contentType ?? 'null'},timestamp:Date.now(),hypothesisId:'H1'})}).catch(()=>{});
    // #endregion
    if (contentType?.includes('application/json')) {
      data = await response.json().catch(() => ({}));
    } else {
      fetch(logUrl,{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'7bd99d'},body:JSON.stringify({sessionId:'7bd99d',location:'SiteChatbot.tsx:sendToApi',message:'non-json response',data:{status:response.status},timestamp:Date.now(),hypothesisId:'H3'})}).catch(()=>{});
      await response.text().catch(() => '');
      return {
        ok: false,
        error: 'Invalid response from server. Please try again or use the options below.',
        fallbackMessage: FALLBACK_MESSAGE,
      };
    }

    if (response.status === 429) {
      return { ok: false, error: (data.error as string) || 'Too many requests', retryAfter: data.retryAfter as number | undefined };
    }
    if (response.status === 400) {
      return { ok: false, error: (data.error as string) || 'Invalid request' };
    }
    if (!response.ok) {
      fetch(logUrl,{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'7bd99d'},body:JSON.stringify({sessionId:'7bd99d',location:'SiteChatbot.tsx:sendToApi',message:'not ok',data:{status:response.status,error:data.error},timestamp:Date.now(),hypothesisId:'H1'})}).catch(()=>{});
      return {
        ok: false,
        error: (data.error as string) || 'Request failed',
        fallbackMessage: (data.fallbackMessage as string) || FALLBACK_MESSAGE,
      };
    }
    return {
      ok: true,
      response: data.response as string | undefined,
      askForLead: Boolean(data.askForLead),
      fallbackCta: Boolean(data.fallbackCta),
    };
  };

  const handleSend = async (overrideMessage?: string) => {
    const raw = (overrideMessage ?? input.trim()).slice(0, MAX_MESSAGE_LENGTH);
    if (!raw || isLoading) return;

    setInput('');
    setIsLoading(true);
    setErrorState('idle');
    setShowPremiumFallback(false);
    userScrolledUpRef.current = false;

    const newUserMessage: Message = { role: 'user', content: raw, timestamp: new Date() };
    setMessages((prev) => [...prev, newUserMessage]);

    // Intent routing: if user clearly wants to book/schedule/call, show CTA card immediately (no API call).
    if (isBookingIntent(raw)) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'd love to help you get on the calendar or connect with the team. What industry are you in?",
          timestamp: new Date(),
          showBookingCta: true,
        },
      ]);
      setIsLoading(false);
      return;
    }

    let result = await sendToApi(raw);
    if (!result.ok && result.networkError) {
      result = await sendToApi(raw);
    }
    setIsLoading(false);

    if (result.ok && result.response) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: result.response!,
          timestamp: new Date(),
          showBookingCta: result.fallbackCta ?? false,
        },
      ]);
      setErrorState('idle');
      setRetryCount(0);
      const shouldAskLead = result.askForLead || assistantReplyCount + 1 >= 2;
      if (shouldAskLead && !showLeadForm && !leadSubmitted) setShowLeadForm(true);
      return;
    }

    if (result.retryAfter != null) setErrorState('rate-limited');
    else setErrorState('error');
    setShowPremiumFallback(true);
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'7bd99d'},body:JSON.stringify({sessionId:'7bd99d',location:'SiteChatbot.tsx:handleSend',message:'showing connection error',data:{retryAfter:result.retryAfter,error:result.error,networkError:result.networkError},timestamp:Date.now(),hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    // Show only the premium fallback card (Retry / Book demo / Contact / Call); do not append fallback text to history to avoid spam
  };

  const handleRetry = async () => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUser) return;
    // Remove only the last assistant (fallback) message if present, then retry once
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.role === 'assistant') return prev.slice(0, -1);
      return prev;
    });
    setRetryCount((c) => c + 1);
    setIsLoading(true);
    setErrorState('idle');
    setShowPremiumFallback(false);
    userScrolledUpRef.current = false;

    let result = await sendToApi(lastUser.content);
    if (!result.ok && result.networkError) result = await sendToApi(lastUser.content);
    setIsLoading(false);

    if (result.ok && result.response) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: result.response!,
          timestamp: new Date(),
          showBookingCta: result.fallbackCta ?? false,
        },
      ]);
      setErrorState('idle');
      setRetryCount(0);
      const count = messages.filter((m) => m.role === 'assistant').length + 1;
      if ((result.askForLead || count >= 2) && !showLeadForm && !leadSubmitted) setShowLeadForm(true);
      return;
    }
    if (result.retryAfter != null) setErrorState('rate-limited');
    else setErrorState('error');
    setShowPremiumFallback(true);
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
          className="fixed bottom-6 right-6 z-50 bg-[#6D28D9] p-2 rounded-full hover:bg-[#5B21B6] hover:scale-110 transition-all duration-300 border-2 border-[#24324A] animate-slow-glow"
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
          className={`fixed bottom-6 left-6 z-50 bg-[#0B1220] border border-[#24324A] rounded-2xl shadow-2xl transition-all ${
            isMinimized ? 'w-80 h-16' : 'w-96 h-[600px] max-h-[90vh]'
          } flex flex-col`}
        >
          <div className="bg-linear-to-b from-[#111B2E] to-[#0B1220] p-4 rounded-t-2xl flex items-center justify-between border-b border-[#24324A]">
            <div className="flex items-center gap-3">
              <img
                src="/images/Mercy-avatar.png"
                alt="Mercy AI"
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover shadow-lg"
              />
              <div>
                <div className="font-bold text-[#E5E7EB] text-lg">Mercy AI</div>
                <div className="text-xs text-[#94A3B8] flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-500/80 rounded-full animate-pulse" />
                  Online • Responds instantly
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-[#E5E7EB] hover:bg-[#24324A]/50 p-2 rounded-lg transition-colors"
                aria-label={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#E5E7EB] hover:bg-[#24324A]/50 p-2 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-10 bg-[#0B1220] min-h-0"
              >
                <div className="space-y-5 pb-10">
                  {messages.map((message, idx) => (
                    <div key={idx} className="space-y-2 flex-shrink-0">
                      <div
                        className={`flex flex-shrink-0 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          data-chat-bubble
                          className={`inline-flex flex-col w-fit max-w-[85%] rounded-2xl px-4 py-3.5 shadow-lg ${
                            message.role === 'user'
                              ? 'bg-linear-to-r from-[#6D28D9] to-[#4F46E5] text-white'
                              : 'bg-[#111B2E] text-[#E5E7EB] border border-[#24324A]'
                          }`}
                        >
                          <div data-chat-bubble-content className="text-[15px] leading-[1.6] whitespace-pre-wrap break-words font-normal antialiased min-h-[1.6em]">
                            {message.content.replace(/\*\*(.*?)\*\*/g, '$1')}
                          </div>
                          <div
                            className={`text-[11px] mt-1 opacity-80 antialiased ${
                              message.role === 'user' ? 'text-white' : 'text-[#94A3B8]'
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                      {message.showBookingCta && (
                        <div className="flex justify-start">
                          <div className="rounded-xl bg-[#111B2E] border border-[#24324A] px-3 py-2.5 inline-flex flex-wrap gap-1.5">
                            <BookingLink className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium text-[#E5E7EB] hover:bg-[#6D28D9]/20 hover:text-white transition-colors">
                              <Calendar className="w-3 h-3" />
                              Book a Demo
                            </BookingLink>
                            <a
                              href="/contact"
                              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium text-[#94A3B8] hover:text-[#E5E7EB] transition-colors"
                            >
                              <Mail className="w-3 h-3" />
                              Contact us
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl bg-[#111B2E] border border-[#24324A] px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-1.5" aria-label="Mercy is typing">
                          <span className="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce [animation-delay:0ms]" />
                          <span className="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce [animation-delay:150ms]" />
                          <span className="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce [animation-delay:300ms]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {showQuickReplies && (
                  <div className="flex flex-wrap gap-2 pt-2 mt-2">
                    {QUICK_REPLIES.map(({ label, value }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => handleQuickReply(value)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-transparent text-[#E5E7EB] border border-[#24324A] hover:bg-[#24324A]/50 transition-colors"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}

                {showLeadForm && !leadSubmitted && (
                  <div className="rounded-2xl bg-[#111B2E] border border-[#24324A] p-4 space-y-3 mt-4">
                    <p className="text-sm text-[#E5E7EB] font-medium">
                      Get a tailored quote or demo — share your details and we&apos;ll follow up quickly.
                    </p>
                    <form onSubmit={handleLeadSubmit} className="space-y-2">
                      <input
                        type="text"
                        placeholder="Business name"
                        value={leadForm.businessName}
                        onChange={(e) => setLeadForm((f) => ({ ...f, businessName: e.target.value }))}
                        className="w-full rounded-lg bg-[#0B1220] border border-[#24324A] px-3 py-2 text-sm text-[#E5E7EB] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full rounded-lg bg-[#0B1220] border border-[#24324A] px-3 py-2 text-sm text-[#E5E7EB] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20"
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm((f) => ({ ...f, phone: e.target.value }))}
                        className="w-full rounded-lg bg-[#0B1220] border border-[#24324A] px-3 py-2 text-sm text-[#E5E7EB] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20"
                      />
                      {leadError && (
                        <p className="text-xs text-amber-400" role="alert">{leadError}</p>
                      )}
                      <button
                        type="submit"
                        disabled={leadSubmitting}
                        className="w-full rounded-lg bg-[#6D28D9] text-white text-sm font-medium py-2.5 hover:bg-[#5B21B6] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50 disabled:opacity-50 transition-colors"
                      >
                        {leadSubmitting ? 'Sending…' : 'Submit'}
                      </button>
                    </form>
                  </div>
                )}

                {leadSubmitted && (
                  <div className="rounded-2xl bg-[#111B2E] border border-[#24324A] p-4 space-y-2 mt-4">
                    <p className="text-sm text-[#E5E7EB] font-medium">
                      Thanks! We&apos;ve received your info and will reach out soon.
                    </p>
                    <BookingLink className="inline-flex items-center gap-1.5 text-sm font-medium text-[#22D3EE] hover:text-[#22D3EE]/90">
                      <Calendar className="w-4 h-4" />
                      Schedule a demo
                    </BookingLink>
                  </div>
                )}

                {errorState !== 'idle' && !isLoading && (
                  <div className="rounded-xl bg-[#111B2E] border border-[#24324A] px-3 py-2.5 mt-4">
                    <p className="text-xs text-[#94A3B8] mb-2">
                      {errorState === 'rate-limited'
                        ? 'Too many messages. Wait a moment or use the links below.'
                        : 'Connection issue. Reach us:'}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium bg-transparent text-[#E5E7EB] border border-[#24324A] hover:bg-[#24324A]/50 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Retry
                      </button>
                      <BookingLink className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium text-[#E5E7EB] hover:bg-[#6D28D9]/20 hover:text-white transition-colors">
                        <Calendar className="w-3 h-3" />
                        Book demo
                      </BookingLink>
                      <a
                        href="/contact"
                        className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium text-[#94A3B8] hover:text-[#E5E7EB] transition-colors"
                      >
                        <Mail className="w-3 h-3" />
                        Contact
                      </a>
                      <a
                        href="tel:+17033325956"
                        className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium text-[#22D3EE] hover:text-[#22D3EE]/90 transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        Call
                      </a>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} className="h-0" aria-hidden />
              </div>

              <div className="shrink-0 p-4 pt-3 bg-[#0B1220] rounded-b-2xl border-t border-[#24324A]">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    maxLength={MAX_MESSAGE_LENGTH}
                    className="flex-1 bg-[#111B2E] text-[#E5E7EB] border border-[#24324A] rounded-lg px-4 py-3 placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 transition-all"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="bg-[#6D28D9] text-white px-5 py-3 rounded-lg hover:bg-[#5B21B6] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-xs text-[#94A3B8] mt-2.5 text-center">
                  {input.length > MAX_MESSAGE_LENGTH * 0.9 && (
                    <span className="text-amber-400">{input.length}/{MAX_MESSAGE_LENGTH}</span>
                  )}
                  {' '}
                  Powered by AI • <a href="tel:7033325956" className="text-[#22D3EE] hover:text-[#22D3EE]/90 font-medium">Call (703) 332-5956</a>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
