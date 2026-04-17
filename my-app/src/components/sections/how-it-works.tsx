"use client";

import { motion } from "framer-motion";
import { Phone, Bot, BarChart3, Play } from "lucide-react";
import { BookingLink } from "@/components/cta/booking-link";

const STEPS = [
  {
    number: "1",
    icon: Phone,
    title: "Connect number",
    description: "We connect your existing business number. No new lines or hardware—you keep your number.",
  },
  {
    number: "2",
    icon: Bot,
    title: "Train AI",
    description: "We configure your AI to match your business: services, hours, booking rules, and follow-up flow.",
  },
  {
    number: "3",
    icon: BarChart3,
    title: "Start booking + reporting",
    description: "Your AI answers calls and books appointments 24/7. You get a dashboard for calls, leads, and missed revenue.",
  },
];

export function HowItWorks() {
  return (
    <section
      className="section bg-slate-950"
      aria-labelledby="how-it-works-title"
    >
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2
            id="how-it-works-title"
            className="text-3xl md:text-4xl font-bold text-slate-50 mb-3"
          >
            How It Works
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Connect your number, train your AI, start booking and reporting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-slate-800/60 text-neon-cyan mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <span className="absolute top-0 right-1/2 translate-x-12 -translate-y-1 text-5xl font-bold text-slate-800/70">
                  {step.number}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-slate-50 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  {step.description}
                </p>
                <BookingLink
                  className="text-sm font-medium text-neon-cyan hover:text-neon-cyan/80 transition-colors"
                >
                  Book Demo →
                </BookingLink>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 md:mt-14 max-w-4xl mx-auto w-full"
        >
          {/* TODO: Replace with real Loom/YouTube embed URL. */}
          <div className="rounded-xl overflow-hidden border border-slate-800/60 bg-slate-900/90 shadow-lg shadow-black/20">
            <div
              className="aspect-video flex items-center justify-center bg-slate-950"
              role="img"
              aria-label="Video preview placeholder"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/90 ring-2 ring-neon-cyan/30">
                <Play className="h-8 w-8 translate-x-0.5 text-neon-cyan" aria-hidden />
              </div>
            </div>
            <p className="px-4 py-3 text-center text-sm text-slate-400">
              Watch: AI Receptionist handling a real inbound call.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
