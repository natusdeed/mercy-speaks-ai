"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const PROOF_POLICY = [
  {
    label: "No fake testimonials",
    detail:
      "We don’t publish invented quotes, names, or “results.” If it’s not verified, it doesn’t go on the site.",
  },
  {
    label: "Live links + screenshots",
    detail:
      "Portfolio cards link to real work (or real demos) and use real screenshots—so prospects can verify quality fast.",
  },
  {
    label: "References on request",
    detail:
      "If you need references for a similar project, book a call and we’ll share what we can for your niche and scope.",
  },
] as const;

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
            Social proof
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Credibility only: verified proof, real screenshots, and references when appropriate.
          </p>
          <p className="mt-4">
            <Link
              to="/testimonials"
              className="text-neon-cyan font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/50 rounded-sm"
            >
              Read client testimonials
            </Link>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {PROOF_POLICY.map((item, index) => (
            <motion.article
              key={item.label}
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
                {item.detail}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-cyan/10 w-fit mb-4">
                <span className="text-sm font-semibold text-neon-cyan">
                  {item.label}
                </span>
              </div>
              <div>
                <p className="card-title text-slate-50 mb-0.5">Mercy Speaks Digital</p>
                <p className="card-body text-slate-400 mb-0">Proof policy</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
