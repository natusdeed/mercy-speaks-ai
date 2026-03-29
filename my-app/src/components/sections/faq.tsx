"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import { HOME_PAGE_FAQS } from "@/content/home-faqs";

const FAQS = HOME_PAGE_FAQS.map((f) => ({ question: f.question, answer: f.answer }));

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
                type="button"
                id={`faq-trigger-${index}`}
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-5 sm:p-7 flex items-center justify-between text-left hover:bg-slate-800/20 transition-colors group min-h-[52px]"
              >
                <span className="card-title text-slate-50 group-hover:text-neon-cyan transition-colors pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-slate-400 shrink-0 transition-transform",
                    openIndex === index && "rotate-180 text-neon-cyan"
                  )}
                  aria-hidden
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-7 pb-5 sm:pb-7 pt-0 text-slate-300 text-sm leading-relaxed">
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
