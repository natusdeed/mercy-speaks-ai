"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How fast can you set this up?",
    answer: "We can have your AI system up and running in 48 hours. Our team handles all the technical setup, integration, and training, so you don't have to worry about a thing.",
  },
  {
    question: "What if customers don't like talking to AI?",
    answer: "Our AI uses advanced natural language processing that makes conversations feel completely human. In fact, most customers can't tell the difference. We've had businesses report higher customer satisfaction scores after implementing our AI.",
  },
  {
    question: "Can it integrate with my current system?",
    answer: "Yes! Our AI integrates with most popular business systems including CRM platforms, scheduling software, payment processors, and more. We'll work with your existing tech stack to ensure seamless integration.",
  },
  {
    question: "What happens if I need to cancel?",
    answer: "No problem at all. You can cancel anytime with no penalties or fees. We're confident you'll love the results, but we want you to feel completely comfortable with your decision.",
  },
  {
    question: "Do I need technical knowledge to use this?",
    answer: "Not at all! We handle all the technical setup and provide you with a simple dashboard to monitor performance. You can start using it immediately without any technical training.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
      
      <div className="max-w-7xl mx-auto relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <HelpCircle className="w-6 h-6 text-neon-cyan" />
            <h2 className="text-4xl md:text-5xl font-bold text-slate-50">
              Common Questions
            </h2>
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-900/50 transition-colors group"
              >
                <span className="text-lg font-semibold text-slate-50 group-hover:text-neon-cyan transition-colors pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-slate-400 flex-shrink-0 transition-transform",
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
                    <div className="px-6 pb-6 text-slate-300">
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
