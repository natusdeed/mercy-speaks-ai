"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
};

const fadeUpInView = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45 },
};

const CASE_STUDIES = [
  {
    industry: "Legal",
    situation: "Small firm was missing 15–20 potential clients per month to after-hours and overflow calls.",
    installed: "24/7 AI receptionist + calendar sync; missed-revenue dashboard.",
    outcomes: [
      "Captured every after-hours call; 8 new clients in first month.",
      "Clear view of previously missed revenue; now tracked and closed.",
      "Receptionist freed for in-person work; no more call chaos.",
    ],
    quote: "We went from losing leads to capturing every call. The dashboard alone was worth it.",
  },
  {
    industry: "Auto repair",
    situation: "Shop struggled with no-shows and back-and-forth scheduling during busy hours.",
    installed: "AI receptionist + automated reminders and follow-up; booking tied to calendar.",
    outcomes: [
      "No-shows dropped significantly; reminders and confirmations automated.",
      "Scheduling handled 24/7; front desk focused on customers in the shop.",
      "Every inquiry captured and followed up.",
    ],
    quote: "Best investment we make every month. Our team can actually focus on the work.",
  },
  {
    industry: "HVAC / home services",
    situation: "Emergency calls at night and on weekends were going to voicemail; leads went cold.",
    installed: "24/7 AI that qualifies emergencies, books same-day/next-day slots, and notifies the team.",
    outcomes: [
      "Emergency bookings up; no more 2 AM voicemails going unanswered.",
      "Leads qualified and scheduled before they call a competitor.",
      "ROI visible in first month; missed-call value now captured.",
    ],
    quote: "We never miss a hot lead now. The ROI was immediate.",
  },
];

export default function ResultsPage() {
  return (
    <PageShell className="min-h-screen bg-slate-950">
      <main>
        {/* Hero + pilot label */}
        <section className="section" aria-labelledby="results-title">
          <div className="section-inner max-w-4xl mx-auto text-center">
            <motion.div {...fadeUp}>
              <span className="inline-block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                Pilot examples
              </span>
              <h1
                id="results-title"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-50 tracking-tight mb-4"
              >
                Results
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Representative outcomes from the kinds of setups we build. Not yet verified client results—we’re sharing these as pilot examples for v1.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 3 featured case studies — scannable, premium */}
        <section className="section" aria-label="Featured case studies">
          <div className="section-inner max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {CASE_STUDIES.map((study, index) => (
                <motion.article
                  key={study.industry + index}
                  {...fadeUpInView}
                  className="card-premium flex flex-col rounded-2xl"
                >
                  <p className="text-xs font-semibold text-neon-cyan uppercase tracking-wider mb-3">
                    {study.industry}
                  </p>
                  <h2 className="text-xl font-bold text-slate-50 mb-3">
                    {study.industry}
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {study.situation}
                  </p>
                  <p className="text-slate-400 text-sm mb-5">
                    <span className="text-slate-500 font-medium">What we installed: </span>
                    {study.installed}
                  </p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {study.outcomes.map((outcome, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-slate-300 text-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                  <p className="text-slate-400 text-sm italic mb-6 border-l-2 border-slate-700/50 pl-4">
                    &ldquo;{study.quote}&rdquo;
                  </p>
                  <Button variant="primary" size="default" className="w-full" asChild>
                    <Link to="/book-demo" className="flex items-center justify-center gap-2">
                      Book Demo
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="section" aria-label="Book a demo">
          <div className="section-inner max-w-2xl mx-auto text-center">
            <motion.div {...fadeUp}>
              <p className="text-slate-400 mb-6">
                Want outcomes like these? Book a demo and we’ll show you how we can do the same for your business.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link to="/book-demo" className="flex items-center justify-center gap-2">
                  Book Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
