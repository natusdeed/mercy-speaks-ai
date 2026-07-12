"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/Accordion";
import { HOME_PAGE_FAQS } from "@/content/home-faqs";

/** Same array as FAQPage JSON-LD on the homepage (`HOME_PAGE_FAQS`). */
const FAQ_ITEMS = HOME_PAGE_FAQS.map((f, index) => ({
  id: `home-${index}`,
  question: f.question,
  answer: f.answer,
}));

export function FAQ() {
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

        <Accordion items={FAQ_ITEMS} className="max-w-3xl mx-auto" />
      </div>
    </section>
  );
}
