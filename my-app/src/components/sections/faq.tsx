"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How fast can you set this up?",
    answer: "We get you live in 48 hours. We handle setup and integration; you don't need to do anything technical.",
  },
  {
    question: "What if customers don't like talking to AI?",
    answer: "Our AI sounds natural and helpful. Most callers don't notice. Many businesses see better satisfaction after switching.",
  },
  {
    question: "Can it work with my current system?",
    answer: "Yes. We integrate with common CRMs, scheduling tools, and payment systems. We plug into what you already use.",
  },
  {
    question: "What if I need to cancel?",
    answer: "Cancel anytime. No fees or penalties.",
  },
  {
    question: "Do I need to be technical?",
    answer: "No. We set everything up and give you a simple dashboard. You can use it from day one.",
  },
  {
    question: "What's included in the Missed Revenue Dashboard?",
    answer: "You see missed calls, dropped leads, and estimated revenue left on the table—so you know exactly what to fix.",
  },
  {
    question: "Do you serve businesses outside Houston?",
    answer: "Yes. We're based in Houston and serve clients nationwide. Setup and support are remote.",
  },
  {
    question: "Is there a long-term contract?",
    answer: "No. Month-to-month. You can cancel anytime with no early-exit fees.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="section relative overflow-hidden bg-slate-950"
      aria-labelledby="faq-title"
    >
      <div className="section-inner relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 id="faq-title" className="text-3xl md:text-4xl font-bold text-slate-50 mb-3">
            Common Questions
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Quick answers about setup, integration, and support.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="rounded-2xl bg-slate-900/20 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-7 flex items-center justify-between text-left hover:bg-slate-800/20 transition-colors group"
              >
                <span className="card-title text-slate-50 group-hover:text-neon-cyan transition-colors pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-slate-400 shrink-0 transition-transform",
                    openIndex === index && "rotate-180 text-neon-cyan"
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-7 pb-7 pt-0 text-slate-300 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
