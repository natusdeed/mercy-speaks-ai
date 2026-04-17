import { motion } from "framer-motion";
import { MapPin, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Factual trust strip only—no ratings, guarantees, or metrics unless sourced elsewhere in the product.
 */
export function TrustSignals() {
  return (
    <section className="w-full border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-sm px-4 sm:px-6 pt-4">
      <div className="max-w-7xl mx-auto py-5">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-4">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-2 text-slate-300 min-h-[44px]"
          >
            <MapPin className="w-5 h-5 text-neon-cyan shrink-0" aria-hidden />
            <span className="text-sm md:text-base font-medium text-center sm:text-left">
              Based in <span className="text-slate-50">Richmond, TX</span> · Houston metro · US-wide
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-800/50 min-h-[44px]">
            <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0" aria-hidden />
            <span className="text-sm text-slate-300">Scope &amp; timeline on a strategy call</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-800/50 min-h-[44px]">
            <Clock className="w-4 h-4 text-electric-purple shrink-0" aria-hidden />
            <span className="text-sm text-slate-300">Guided onboarding</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="text-center"
        >
          <Link
            to="/pricing"
            className="inline-flex min-h-11 flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-5 py-3 rounded-xl bg-slate-800/40 border border-slate-700/20 backdrop-blur-sm text-slate-50 hover:border-neon-cyan/30 transition-colors"
          >
            <span className="text-base md:text-lg font-bold">
              View pricing <span className="text-neon-cyan">from $197/mo</span>
            </span>
            <span className="text-sm text-slate-400">AI receptionist tiers — websites quoted separately</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
