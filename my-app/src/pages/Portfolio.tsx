import { motion } from "framer-motion";
import { Check, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CaseStudy {
  id: string;
  industry: string;
  situation: string;
  installed: string;
  outcomes: [string, string, string];
  testimonial: string;
}

import { BookingLink } from "@/components/cta/booking-link";

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "martinez-hvac",
    industry: "HVAC / Plumbing",
    situation: "Missing 40% of after-hours emergency calls; $8K+ lost monthly.",
    installed: "24/7 AI Phone Receptionist + Missed Revenue Dashboard.",
    outcomes: [
      "Captured 100% of after-hours calls",
      "Bookings up 180%; $4,200/mo saved on staffing",
      "Customer satisfaction up 45%",
    ],
    testimonial: "We went from missing calls to capturing every opportunity. The AI handles everything perfectly.",
  },
  {
    id: "elite-dental",
    industry: "Dental / Med Spa",
    situation: "35% no-show rate; staff buried in phone scheduling.",
    installed: "AI Phone Receptionist + Automated Appointment Reminders.",
    outcomes: [
      "No-shows reduced by 60%",
      "20 hours/week freed for patient care",
      "Appointment bookings up 150%",
    ],
    testimonial: "Our no-show rate dropped dramatically. Our team focuses on patients, not scheduling. Game changer.",
  },
  {
    id: "bayou-auto",
    industry: "Auto Repair",
    situation: "Long wait times, no quick quotes; losing customers to competitors.",
    installed: "AI Phone Receptionist for instant quotes, scheduling, and FAQs 24/7.",
    outcomes: [
      "500+ calls/month handled automatically",
      "Wait times down 80%; retention up 40%",
      "$12K+ additional revenue captured",
    ],
    testimonial: "Customers love the instant service. We're booking more and our team isn't overwhelmed anymore.",
  },
];

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

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <motion.article
      {...fadeUpInView}
      transition={{ delay: index * 0.08 }}
      className="rounded-xl border border-slate-800/50 bg-slate-900/10 p-8 flex flex-col"
    >
      <p className="text-sm font-medium text-electric-purple mb-1">{study.industry}</p>
      <p className="text-slate-300 text-sm mb-5">{study.situation}</p>

      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">What we installed</p>
      <p className="text-slate-300 text-sm mb-6">{study.installed}</p>

      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Outcomes</p>
      <ul className="space-y-2 mb-6">
        {study.outcomes.map((outcome) => (
          <li key={outcome} className="flex items-start gap-2 text-sm text-slate-300">
            <Check className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
            {outcome}
          </li>
        ))}
      </ul>

      <blockquote className="text-slate-400 text-sm italic border-l-2 border-slate-700 pl-4 mb-6 flex-1">
        &ldquo;{study.testimonial}&rdquo;
      </blockquote>

      <Button variant="outline" size="default" asChild className="w-fit mt-auto">
        <BookingLink className="flex items-center gap-2">
          Book Demo
          <ArrowRight className="w-4 h-4" />
        </BookingLink>
      </Button>
    </motion.article>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-950">
      <main className="w-full">
        {/* Hero */}
        <section className="section section-hero">
          <div className="section-inner max-w-3xl mx-auto text-center">
            <motion.h1
              {...fadeUp}
              className="text-4xl md:text-5xl font-bold text-slate-50 tracking-tight mb-4"
            >
              Results from{" "}
              <span className="bg-linear-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent">
                Real Businesses
              </span>
            </motion.h1>
            <motion.p
              {...fadeUp}
              transition={{ delay: 0.06 }}
              className="text-lg text-slate-400 mb-6"
            >
              How we helped local businesses capture lost revenue and run smoother with AI.
            </motion.p>
            <motion.p
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="text-sm text-slate-500 max-w-xl mx-auto"
            >
              These are sample / pilot scenarios illustrating typical outcomes. Actual results vary by business.
            </motion.p>
          </div>
        </section>

        {/* 3 featured case studies */}
        <section className="section border-t border-slate-800/50" aria-labelledby="case-studies-heading">
          <div className="section-inner">
            <h2 id="case-studies-heading" className="sr-only">
              Featured case studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
              {CASE_STUDIES.map((study, index) => (
                <CaseStudyCard key={study.id} study={study} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section border-t border-slate-800/40 pb-20 md:pb-28">
          <div className="section-inner max-w-2xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-400 mb-6"
            >
              Want results like these? Book a demo and we’ll show you what’s possible for your business.
            </motion.p>
            <Button variant="primary" size="lg" asChild>
              <BookingLink className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Book Demo
                <ArrowRight className="w-5 h-5" />
              </BookingLink>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
