import { motion } from "framer-motion";
import { Check, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingLink } from "@/components/cta/booking-link";

/**
 * Legacy unused page (router uses app/portfolio → /results).
 * Scenarios are illustrative composites only — no invented business names.
 */
interface CaseStudy {
  id: string;
  industry: string;
  situation: string;
  installed: string;
  outcomes: [string, string, string];
  note: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "hvac-after-hours",
    industry: "HVAC / Plumbing",
    situation: "Missing a large share of after-hours emergency calls; revenue leaking monthly.",
    installed: "24/7 AI Phone Receptionist + Missed Revenue Dashboard.",
    outcomes: [
      "Captured after-hours calls that previously went to voicemail",
      "Bookings and staffing load improved during peak season",
      "Clearer visibility into missed-call patterns",
    ],
    note: "Illustrative scenario. References available on request.",
  },
  {
    id: "dental-scheduling",
    industry: "Dental / Med Spa",
    situation: "High no-show rate; staff buried in phone scheduling.",
    installed: "AI Phone Receptionist + Automated Appointment Reminders.",
    outcomes: [
      "No-shows reduced with automated reminders",
      "Front-desk time freed for in-person care",
      "Appointment bookings improved with 24/7 coverage",
    ],
    note: "Illustrative scenario. References available on request.",
  },
  {
    id: "auto-repair-intake",
    industry: "Auto Repair",
    situation: "Long wait times, no quick quotes; losing customers to competitors.",
    installed: "AI Phone Receptionist for instant quotes, scheduling, and FAQs 24/7.",
    outcomes: [
      "High call volume handled without adding headcount",
      "Wait times down; retention improved",
      "Additional revenue captured from after-hours inquiries",
    ],
    note: "Illustrative scenario. References available on request.",
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

      <p className="text-slate-500 text-sm border-l-2 border-slate-700 pl-4 mb-6 flex-1">
        {study.note}
      </p>

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
        <section className="section section-hero">
          <div className="section-inner max-w-3xl mx-auto text-center">
            <motion.h1
              {...fadeUp}
              className="text-4xl md:text-5xl font-bold text-slate-50 tracking-tight mb-4"
            >
              Results &amp;{" "}
              <span className="bg-linear-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent">
                labeled scenarios
              </span>
            </motion.h1>
            <motion.p
              {...fadeUp}
              transition={{ delay: 0.06 }}
              className="text-lg text-slate-400 mb-6"
            >
              How AI reception and automation can capture lost revenue—shown as illustrative composites.
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

        <section className="section border-t border-slate-800/40 pb-20 md:pb-28">
          <div className="section-inner max-w-2xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-400 mb-6"
            >
              Want to see what&apos;s possible for your business? Book a demo.
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
