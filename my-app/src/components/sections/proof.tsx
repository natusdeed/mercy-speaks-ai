"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Honest proof policy — no invented names, quotes, or metrics.
 * Verified results and labeled illustrative scenarios live on /results.
 */
export function Proof() {
  return (
    <section className="section bg-slate-950" aria-labelledby="proof-policy-title">
      <div className="section-inner max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 mb-4">
            <ShieldCheck className="w-4 h-4 text-neon-cyan" aria-hidden />
            <span className="text-sm text-slate-300 font-medium">Credibility</span>
          </div>
          <h2
            id="proof-policy-title"
            className="text-3xl md:text-4xl font-bold text-slate-50 mb-4"
          >
            Our proof policy
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            We only publish verified, permissioned results. Illustrative scenarios are always
            labeled. References are available on request.
          </p>
          <p>
            <Link
              to="/results"
              className="inline-flex items-center gap-2 text-neon-cyan font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/50 rounded-sm"
            >
              See results &amp; labeled scenarios
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
