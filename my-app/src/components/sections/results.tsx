"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const CASE_STUDIES = [
  {
    name: "Maria Rodriguez",
    business: "Rodriguez Law Firm",
    result: "$24K new revenue in first month",
    quote: "We were losing 15-20 potential clients per month to missed calls. Since the AI receptionist, we've captured every call and converted 8 new clients in the first month.",
  },
  {
    name: "James Chen",
    business: "Chen's Auto Repair",
    result: "40% reduction in no-shows",
    quote: "The AI handles scheduling, reminders, and follow-ups. Our receptionist can focus on in-person customers. Best $197 we spend every month.",
  },
  {
    name: "Sarah Martinez",
    business: "Martinez HVAC Solutions",
    result: "60% increase in emergency bookings",
    quote: "Our AI answers emergency calls at 2 AM, qualifies leads, and books service calls. We never miss a hot lead. The ROI was immediate.",
  },
];

export function Results() {
  return (
    <section
      className="section bg-slate-950"
      aria-labelledby="results-title"
    >
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <h2
            id="results-title"
            className="text-3xl md:text-4xl font-bold text-slate-50 mb-3"
          >
            Results
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Real outcomes from Houston businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {CASE_STUDIES.map((study, index) => (
            <motion.article
              key={study.business}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="card-premium flex flex-col"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-electric-purple fill-electric-purple"
                  />
                ))}
              </div>
              <p className="card-body text-slate-300 flex-1 mb-4">
                "{study.quote}"
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-cyan/10 w-fit mb-4">
                <span className="text-sm font-semibold text-neon-cyan">
                  {study.result}
                </span>
              </div>
              <div>
                <p className="card-title text-slate-50 mb-0.5">{study.name}</p>
                <p className="card-body text-slate-400 mb-0">{study.business}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
