"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Users,
  CalendarCheck,
  Zap,
  BarChart3,
  Globe,
  MessageSquare,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { Link } from "react-router-dom";
import { BookingLink } from "@/components/cta/booking-link";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { BRAND_TAGLINE } from "@/lib/site-config";
import { breadcrumbSchema, organizationSchema, webPageSchema } from "@/lib/schema";

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

const outcomeBullets = [
  { icon: Phone, text: "Calls answered 24/7—every call, no voicemail jail." },
  { icon: Users, text: "Leads captured with qualification and contact details." },
  { icon: CalendarCheck, text: "Appointments booked and synced to your calendar." },
  { icon: Zap, text: "Instant follow-up: texts and emails while the lead is hot." },
  { icon: BarChart3, text: "Reporting and missed-revenue dashboard in real time." },
];

const supportingServices = [
  {
    icon: Globe,
    accent: "neon-cyan",
    title: "Conversion Website + Booking",
    description:
      "A site built to convert: clear offers, social proof, and booking that syncs with your AI receptionist and calendar. Visitors become appointments.",
  },
  {
    icon: MessageSquare,
    accent: "electric-purple",
    title: "Website Chat That Books",
    description:
      "Chat on your site that answers questions and books appointments. Captures leads 24/7 and hands them to your team—no more forms that go unanswered.",
  },
  {
    icon: Star,
    accent: "neon-cyan",
    title: "Reviews + Follow-Up Automations",
    description:
      "Turn completed work into reviews and repeat business. Automated follow-ups ask for reviews at the right time, then nurture leads so they come back.",
  },
] as const;

export default function SolutionsPage() {
  const description =
    "Flagship AI receptionist plus websites, chat, and automation—capture calls and leads 24/7. Mercy Speaks Digital solutions overview.";

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead path="/solutions" title="Solutions" description={description} />
      <JsonLd
        data={[
          organizationSchema(),
          webPageSchema({ name: "Solutions", description, path: "/solutions" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
          ]),
        ]}
      />
      <main>
        <section className="section pt-6 pb-0 border-b border-slate-800/30" aria-label="Summary">
          <div className="section-inner max-w-4xl mx-auto">
            <p className="text-slate-400 text-center text-sm sm:text-base leading-relaxed px-1">{BRAND_TAGLINE}</p>
          </div>
        </section>
        {/* Flagship — top section */}
        <section className="section pt-10 md:pt-12" aria-labelledby="flagship-title">
          <div className="section-inner max-w-4xl mx-auto">
            <motion.div {...fadeUp} className="text-center mb-3">
              <span className="text-xs font-semibold text-electric-purple uppercase tracking-widest">
                Flagship
              </span>
            </motion.div>
            <motion.h1
              id="flagship-title"
              {...fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-50 tracking-tight text-center mb-6 md:mb-8"
            >
              24/7 AI Receptionist + Missed Revenue Dashboard
            </motion.h1>
            <motion.ul
              {...fadeUp}
              className="space-y-4 mb-8 md:mb-10"
            >
              {outcomeBullets.map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-300">
                  <span className="mt-0.5 p-2 rounded-lg bg-neon-cyan/10 shrink-0">
                    <Icon className="w-5 h-5 text-neon-cyan" />
                  </span>
                  <span className="text-base md:text-lg text-slate-200">{text}</span>
                </li>
              ))}
            </motion.ul>
            <motion.div {...fadeUp} className="flex justify-center">
              <Button variant="primary" size="lg" asChild>
                <BookingLink className="flex items-center gap-2">
                  Book Demo
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Supporting services — short sections, no dense grids */}
        {supportingServices.map((service, index) => {
          const Icon = service.icon;
          const isPurple = service.accent === "electric-purple";
          return (
            <section
              key={service.title}
              className="section"
              aria-labelledby={`supporting-${index}-title`}
            >
              <div className="section-inner max-w-3xl mx-auto">
                <motion.div
                  {...fadeUpInView}
                  className="card-premium rounded-2xl"
                >
                  <div
                    className={`p-2.5 rounded-xl w-fit mb-5 ${
                      isPurple ? "bg-electric-purple/10" : "bg-neon-cyan/10"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${isPurple ? "text-electric-purple" : "text-neon-cyan"}`}
                    />
                  </div>
                  <h2
                    id={`supporting-${index}-title`}
                    className="text-2xl md:text-3xl font-bold text-slate-50 mb-3"
                  >
                    {service.title}
                  </h2>
                  <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                    {service.description}
                  </p>
                  <Button variant="outline" size="default" asChild>
                    <BookingLink className="flex items-center gap-2">
                      Book Demo
                      <ArrowRight className="w-4 h-4" />
                    </BookingLink>
                  </Button>
                </motion.div>
              </div>
            </section>
          );
        })}
      </main>
    </PageShell>
  );
}
