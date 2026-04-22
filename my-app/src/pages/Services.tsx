import { motion } from "framer-motion";
import { Phone, BarChart3, Globe, MessageSquare, Star, ArrowRight, Bot, Workflow, CalendarClock, Database, Megaphone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookingLink } from "@/components/cta/booking-link";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { BRAND_TAGLINE, NAV_PATHS } from "@/lib/site-config";
import {
  breadcrumbSchema,
  itemListSchema,
  organizationSchema,
  webPageSchema,
  serviceSchema,
} from "@/lib/schema";

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

const serviceLinks = [
  { to: NAV_PATHS.aiReceptionist, label: "AI phone receptionist", icon: Phone },
  { to: NAV_PATHS.websiteDesign, label: "Website design & development", icon: Globe },
  { to: NAV_PATHS.websiteChatbot, label: "Website chat that books", icon: MessageSquare },
  { to: NAV_PATHS.workflowAutomation, label: "Workflow automation", icon: Workflow },
  { to: NAV_PATHS.appointmentAutomation, label: "Appointment automation", icon: CalendarClock },
  { to: NAV_PATHS.reviewGeneration, label: "Reviews & follow-up", icon: Star },
  {
    to: NAV_PATHS.socialMediaManagement,
    label: "Social Media Management",
    icon: Megaphone,
    description:
      "Branded content, scheduling, and captions — posted consistently every month without you lifting a finger.",
  },
  {
    to: NAV_PATHS.reviewGeneration,
    label: "Reputation Management",
    icon: Shield,
    description:
      "Automated Google review requests after every job, plus monitoring across Google, Facebook, and Yelp.",
  },
  { to: NAV_PATHS.voiceAgents, label: "Voice agents", icon: Bot },
  { to: NAV_PATHS.ragData, label: "Knowledge & RAG data", icon: Database },
] as const;

export default function ServicesPage() {
  const hubDescription =
    "Explore AI receptionists, conversion websites, chat, and automation—one hub for services from Mercy Speaks Digital.";

  const directoryItems = serviceLinks.map(({ to, label }) => ({ name: label, path: to }));

  const ld = [
    organizationSchema(),
    webPageSchema({
      name: "AI receptionists, websites & automation services",
      description: hubDescription,
      path: NAV_PATHS.services,
    }),
    serviceSchema({
      name: "AI receptionist & lead capture systems",
      description:
        "24/7 AI receptionist with qualification, booking, and reporting—paired with websites and automation.",
      path: NAV_PATHS.services,
      serviceType: "AI receptionist",
    }),
    itemListSchema({
      name: "Mercy Speaks Digital service pages",
      items: directoryItems,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: NAV_PATHS.services },
    ]),
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <SeoHead title="Services" description={hubDescription} path={NAV_PATHS.services} />
      <JsonLd data={ld} />
      <main className="w-full">
        <section className="section section-hero">
          <div className="section-inner max-w-3xl mx-auto">
            <Breadcrumbs items={[{ name: "Services" }]} className="mb-6 text-left opacity-90" />
            <motion.h1
              {...fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-50 tracking-tight mb-4 title-3d px-1"
            >
              Services That{" "}
              <span className="bg-linear-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent">
                Capture Revenue
              </span>
            </motion.h1>
            <motion.p
              {...fadeUp}
              transition={{ delay: 0.08 }}
              className="text-base sm:text-lg text-slate-400 px-1"
            >
              {BRAND_TAGLINE}
            </motion.p>
            <motion.p
              {...fadeUp}
              transition={{ delay: 0.12 }}
              className="mt-4 text-sm sm:text-base text-slate-500 px-1 leading-relaxed max-w-2xl"
            >
              In plain terms: we build or upgrade your website, then connect phone and web experiences so new leads get
              answered, qualified, and booked—even when your team is busy. Pick a service page below for specifics, or
              start from the{" "}
              <Link to={NAV_PATHS.aiReceptionist} className="text-neon-cyan hover:underline">
                AI receptionist
              </Link>{" "}
              or{" "}
              <Link to={NAV_PATHS.websiteDesign} className="text-neon-cyan hover:underline">
                website design
              </Link>{" "}
              overview.
            </motion.p>
          </div>
        </section>

        <section className="section border-t border-slate-800/50 pb-6" aria-labelledby="service-directory">
          <div className="section-inner max-w-4xl mx-auto">
            <h2 id="service-directory" className="text-lg font-semibold text-slate-50 mb-4">
              Browse service pages
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {serviceLinks.map(({ to, label, icon: Icon, description }) => (
                <li key={`${label}-${to}`}>
                  <Link
                    to={to}
                    className="flex items-start gap-3 rounded-xl border border-slate-800/60 bg-slate-900/25 px-4 py-3.5 text-slate-200 hover:border-neon-cyan/35 hover:text-neon-cyan transition-colors min-h-[52px]"
                  >
                    <Icon className="w-5 h-5 text-electric-purple shrink-0" aria-hidden />
                    <span className="flex-1">
                      <span className="block font-medium">{label}</span>
                      {description ? (
                        <span className="block text-xs text-slate-400 mt-1">{description}</span>
                      ) : null}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-auto shrink-0 opacity-60" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-500">
              Prefer the narrative overview?{" "}
              <Link to="/solutions" className="text-neon-cyan hover:underline">
                View solutions
              </Link>{" "}
              or{" "}
              <Link to="/contact" className="text-neon-cyan hover:underline">
                contact us
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Flagship */}
        <section className="section border-t border-slate-800/50" aria-labelledby="flagship-heading">
          <div className="section-inner max-w-3xl mx-auto">
            <motion.article
              {...fadeUpInView}
              className="rounded-xl border border-slate-800/60 bg-slate-900/20 p-6 sm:p-8 md:p-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-electric-purple/15 border border-electric-purple/25">
                  <Phone className="w-5 h-5 text-electric-purple" />
                </div>
                <span className="text-xs font-semibold text-electric-purple uppercase tracking-wider">
                  Flagship
                </span>
              </div>
              <h2 id="flagship-heading" className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-50 mb-3">
                24/7 AI receptionist + missed revenue visibility
              </h2>
              <p className="text-slate-400 mb-6 text-base sm:text-lg">
                Answer and qualify calls around the clock, book onto your calendar, and see missed-call patterns in one
                place—paired with follow-up workflows when you need them.
              </p>
              <ul className="space-y-1.5 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-neon-cyan shrink-0" />
                  Reporting oriented around calls, leads, and booking outcomes
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-neon-cyan shrink-0" />
                  Built to work with your phone line and scheduling tools
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="primary" size="lg" asChild>
                  <Link to={NAV_PATHS.aiReceptionist} className="flex items-center justify-center gap-2">
                    AI receptionist details
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <BookingLink className="flex items-center justify-center gap-2">
                    Book a call
                    <ArrowRight className="w-5 h-5" />
                  </BookingLink>
                </Button>
              </div>
            </motion.article>
          </div>
        </section>

        {/* Conversion website */}
        <section className="section border-t border-slate-800/40" aria-labelledby="conversion-heading">
          <div className="section-inner max-w-3xl mx-auto">
            <motion.article
              {...fadeUpInView}
              className="rounded-xl border border-slate-800/50 bg-slate-900/10 p-6 sm:p-8 md:p-10"
            >
              <div className="p-2 rounded-lg w-fit bg-neon-cyan/10 border border-neon-cyan/20 mb-3">
                <Globe className="w-5 h-5 text-neon-cyan" />
              </div>
              <h2 id="conversion-heading" className="text-lg sm:text-xl md:text-2xl font-bold text-slate-50 mb-2">
                Conversion website + booking
              </h2>
              <p className="text-slate-400 mb-6 text-base sm:text-lg">
                Clear offers, proof, and CTAs—structured so visitors understand the next step and can book or inquire
                without friction.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link to={NAV_PATHS.websiteDesign} className="flex items-center gap-2">
                  Website design
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.article>
          </div>
        </section>

        {/* Chat */}
        <section className="section border-t border-slate-800/40" aria-labelledby="chat-heading">
          <div className="section-inner max-w-3xl mx-auto">
            <motion.article
              {...fadeUpInView}
              className="rounded-xl border border-slate-800/50 bg-slate-900/10 p-6 sm:p-8 md:p-10"
            >
              <div className="p-2 rounded-lg w-fit bg-electric-purple/10 border border-electric-purple/20 mb-3">
                <MessageSquare className="w-5 h-5 text-electric-purple" />
              </div>
              <h2 id="chat-heading" className="text-lg sm:text-xl md:text-2xl font-bold text-slate-50 mb-2">
                Website chat that books
              </h2>
              <p className="text-slate-400 mb-6 text-base sm:text-lg">
                On-site chat that answers common questions and routes people to a booking or lead capture path—so
                traffic does not go quiet after hours.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link to={NAV_PATHS.websiteChatbot} className="flex items-center gap-2">
                  Website chat service
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.article>
          </div>
        </section>

        {/* Reviews */}
        <section className="section border-t border-slate-800/40 pb-16 md:pb-24" aria-labelledby="reviews-heading">
          <div className="section-inner max-w-3xl mx-auto">
            <motion.article
              {...fadeUpInView}
              className="rounded-xl border border-slate-800/50 bg-slate-900/10 p-6 sm:p-8 md:p-10"
            >
              <div className="p-2 rounded-lg w-fit bg-neon-cyan/10 border border-neon-cyan/20 mb-3">
                <Star className="w-5 h-5 text-neon-cyan" />
              </div>
              <h2 id="reviews-heading" className="text-lg sm:text-xl md:text-2xl font-bold text-slate-50 mb-2">
                Reviews + follow-up automations
              </h2>
              <p className="text-slate-400 mb-6 text-base sm:text-lg">
                Prompts and sequences that ask for reviews at the right time and keep leads from going cold—without
                manual hand-holding on every step.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link to={NAV_PATHS.reviewGeneration} className="flex items-center gap-2">
                  Review & follow-up
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.article>
          </div>
        </section>
      </main>
    </div>
  );
}
