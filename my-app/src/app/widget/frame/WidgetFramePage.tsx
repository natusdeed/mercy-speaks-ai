"use client";

import { useEffect, useState, useCallback } from "react";
import type { WidgetConfigResponse } from "@/lib/widget-types";

type Message = { role: "user" | "assistant"; content: string };

export default function WidgetFramePage() {
  const [config, setConfig] = useState<WidgetConfigResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [tenantId, setTenantId] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const t = params.get("tenant") ?? "";
    const k = params.get("key") ?? "";
    setTenantId(t);
    setKey(k);
    if (!t) {
      setError("Missing tenant");
      return;
    }
    const url = `/api/widget/config?tenant=${encodeURIComponent(t)}${k ? `&key=${encodeURIComponent(k)}` : ""}`;
    fetch(url, { method: "GET", credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.allowed === false || !data.tenantId) {
          setError("Access not allowed");
          return;
        }
        setConfig(data);
        if (data.greeting) {
          setMessages([{ role: "assistant", content: data.greeting }]);
        }
      })
      .catch(() => setError("Failed to load config"));
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!config || !text.trim()) return;
      const userMessage = text.trim();
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      setInput("");
      setLoading(true);
      try {
        const body: Record<string, unknown> = {
          tenantId: config.tenantId,
          userMessage,
          conversationHistory: messages.concat([{ role: "user", content: userMessage }]).slice(-20),
        };
        if (key) body.key = key;
        const res = await fetch("/api/widget/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        });
        const data = await res.json();
        const reply =
          data.response ||
          data.fallbackMessage ||
          "I'm having trouble connecting. Please try again or use the booking link.";
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        if (data.askForLead) setShowLeadForm(true);
      } catch {
        setMessages((prev) =>
          prev.concat([
            {
              role: "assistant",
              content: "Connection issue. Please try again or use the booking link.",
            },
          ])
        );
      } finally {
        setLoading(false);
      }
    },
    [config, key, messages]
  );

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!config) return;
    const form = e.currentTarget;
    const name = (form.querySelector('[name="name"]') as HTMLInputElement)?.value?.trim() ?? "";
    const email = (form.querySelector('[name="email"]') as HTMLInputElement)?.value?.trim() ?? "";
    const phone = (form.querySelector('[name="phone"]') as HTMLInputElement)?.value?.trim() ?? "";
    if (!email || !phone) return;
    const body: Record<string, unknown> = { tenantId: config.tenantId, email, phone, name };
    if (key) body.key = key;
    try {
      const res = await fetch("/api/widget/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) setLeadSent(true);
    } catch {
      // show error in UI if needed
    }
  };

  const primaryColor = config?.branding?.primaryColor ?? "#06b6d4";
  const accentColor = config?.branding?.accentColor ?? "#8b5cf6";

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300 p-4">
        <p>{error}</p>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300 p-4">
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-[400px] bg-slate-950 text-slate-100 font-sans text-sm">
      {/* Header */}
      <header
        className="flex items-center justify-between shrink-0 px-4 py-3 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <span className="font-semibold">{config.companyName}</span>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-xl px-3 py-2 ${
              m.role === "user"
                ? "ml-auto bg-cyan-500/90 text-white"
                : "mr-auto bg-slate-800 text-slate-200"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="mr-auto max-w-[85%] rounded-xl px-3 py-2 bg-slate-800 text-slate-400">
            …
          </div>
        )}
      </div>

      {/* Quick replies */}
      {config.quickReplies && config.quickReplies.length > 0 && messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {config.quickReplies.map((q, i) => (
            <button
              key={i}
              type="button"
              onClick={() => sendMessage(q)}
              className="rounded-lg border border-slate-600 px-3 py-1.5 text-slate-300 hover:bg-slate-800 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Book Demo CTA */}
      {config.bookingUrl && (
        <div className="px-4 pb-2">
          <a
            href={config.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg px-4 py-2 font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            Book Demo
          </a>
        </div>
      )}

      {/* Lead form */}
      {showLeadForm && !leadSent && (
        <form onSubmit={handleLeadSubmit} className="px-4 py-3 border-t border-slate-700 space-y-2">
          <p className="text-slate-400 text-xs">Share your details and we’ll follow up.</p>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            required
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="submit"
            className="w-full rounded-lg px-4 py-2 font-medium text-white"
            style={{ backgroundColor: primaryColor }}
          >
            Submit
          </button>
        </form>
      )}
      {leadSent && (
        <p className="px-4 py-2 text-slate-400 text-sm">Thanks! We’ll be in touch soon.</p>
      )}

      {/* Input */}
      <div className="shrink-0 p-4 border-t border-slate-700">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-lg px-4 py-2 font-medium text-white disabled:opacity-50"
            style={{ backgroundColor: primaryColor }}
          >
            Send
          </button>
        </form>
        <div className="mt-2 text-center text-xs text-slate-500">
          <a
            href="https://mercyspeaks.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex max-w-full items-center justify-center gap-1 truncate hover:text-slate-300"
          >
            Powered by <span className="font-medium text-slate-300 hover:text-white">Mercy AI</span>
          </a>
        </div>
      </div>
    </div>
  );
}
