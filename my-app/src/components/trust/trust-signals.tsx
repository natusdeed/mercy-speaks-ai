"use client";

import { motion } from "framer-motion";
import { MapPin, Star, ShieldCheck, CheckCircle2, Clock, X } from "lucide-react";

export function TrustSignals() {
  return (
    <section className="w-full border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-sm px-6 pt-4">
      <div className="max-w-7xl mx-auto py-6">
        {/* Main Trust Signals - Above the Fold */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-6">
          {/* Location */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-slate-300"
          >
            <MapPin className="w-5 h-5 text-neon-cyan" />
            <span className="text-sm md:text-base font-medium">
              Serving: <span className="text-slate-50">Houston, TX & Surrounding Areas</span>
            </span>
          </motion.div>

          {/* Rating */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 text-slate-300"
          >
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-electric-purple fill-electric-purple" />
              <span className="text-sm md:text-base font-semibold text-slate-50">4.9/5</span>
            </div>
            <span className="text-sm md:text-base">
              rating from <span className="text-slate-50 font-medium">47 local businesses</span>
            </span>
          </motion.div>

          {/* ROI Guarantee */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 text-slate-300"
          >
            <ShieldCheck className="w-5 h-5 text-neon-cyan" />
            <span className="text-sm md:text-base">
              <span className="text-slate-50 font-semibold">ROI Guarantee:</span> Make your money back in 30 days
            </span>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-6"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-800/50">
            <CheckCircle2 className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-slate-300">No Setup Fees</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-800/50">
            <Clock className="w-4 h-4 text-electric-purple" />
            <span className="text-sm text-slate-300">48-Hour Setup</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-800/50">
            <X className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-300">Cancel Anytime</span>
          </div>
        </motion.div>

        {/* Pricing Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-purple/20 via-neon-cyan/20 to-electric-purple/20 border border-electric-purple/30 backdrop-blur-sm">
            <span className="text-lg md:text-xl font-bold text-slate-50">
              Starting at <span className="text-neon-cyan">$197/month</span>
            </span>
            <span className="text-sm text-slate-400 hidden md:inline">
              (Less than 1 hour of employee wages)
            </span>
            <span className="text-xs text-slate-400 md:hidden">
              (&lt;1hr wages)
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
