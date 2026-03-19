"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Globe, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingLink } from "@/components/cta/booking-link";

/**
 * Minimal hero: exact H1, subheadline, primary + secondary CTA, trust strip (3), one credibility line.
 * Single accent gradient in hero; primary button only has glow. No ROI/dashboard/task widgets.
 */
export function Hero() {
  return (
    <section
      className="section section-hero relative overflow-hidden"
      aria-label="Hero"
    >
      <div
        className="absolute inset-0 bg-slate-950 pointer-events-none"
        aria-hidden
      />
      <div className="absolute inset-0 bg-linear-to-b from-electric-purple/5 via-transparent to-transparent pointer-events-none" />

      <div className="section-inner relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 tracking-tight leading-[1.12] mb-5"
        >
          Premium Websites, E-commerce, AI Receptionists & Automation for Growing Businesses
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-6"
        >
          We build premium websites and storefronts, then add AI and automation that capture leads and follow up fast—so more visitors become booked customers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <Button variant="primary" size="lg" asChild className="w-full sm:w-auto">
            <BookingLink className="flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Book a Free Strategy Call
              <ArrowRight className="w-5 h-5" />
            </BookingLink>
          </Button>
          <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
            <a href="#portfolio" className="flex items-center justify-center gap-2">
              <Globe className="w-5 h-5" />
              View Website Work
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-5 text-sm text-slate-500"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0" />
            <span>Fast turnaround, premium finish</span>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0" />
            <span>Designed for trust + conversion</span>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0" />
            <span>Mobile-first, SEO-ready structure</span>
          </span>
        </motion.div>

        <p className="mt-6 text-sm text-slate-500">
          Based in Houston • Serving businesses across the U.S.
        </p>
      </div>
    </section>
  );
}
