"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CalendarX,
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
  Megaphone,
  PhoneMissed,
  ShieldCheck,
  Sparkles,
  Timer,
  UserRound,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { BookingLink } from "@/components/cta/booking-link";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoHead } from "@/components/seo/seo-head";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
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

const problemItems = [
  {
    title: "Missed calls",
    body: "After-hours and overflow calls become voicemails your team never gets back to in time.",
    icon: PhoneMissed,
  },
  {
    title: "Slow follow-up",
    body: "Hot leads cool off while someone finds the right words—or remembers to send the text.",
    icon: Timer,
  },
  {
    title: "Unbooked leads",
    body: "People who wanted an appointment slip away because nobody had capacity to coordinate the slot.",
    icon: CalendarX,
  },
  {
    title: "Inconsistent social media",
    body: "Posting is feast-or-famine, so your brand looks quiet exactly when you need visibility.",
    icon: Megaphone,
  },
  {
    title: "No clear missed revenue tracking",
    body: "You feel the leakage but lack a simple number for what after-hours and dropped threads cost.",
    icon: BarChart3,
  },
] as const;

const agentRoles = [
  {
    title: "Intake Agent",
    body: "Captures calls, chats, and form fills into one clean thread so nothing gets lost between systems.",
    icon: Users,
  },
  {
    title: "Lead Qualifier Agent",
    body: "Scores urgency, service fit, and readiness so your humans spend time on deals that close.",
    icon: ClipboardList,
  },
  {
    title: "Booking Agent",
    body: "Proposes real slots and services in plain language—concierge scheduling without the back-and-forth.",
    icon: CalendarCheck,
  },
  {
    title: "Follow-Up Agent",
    body: "Drafts SMS and email touchpoints that match your tone while the homeowner still remembers you.",
    icon: Sparkles,
  },
  {
    title: "Human Handoff Agent",
    body: "Escalates high-value or sensitive requests with full context so the owner sees the full picture.",
    icon: UserRound,
  },
  {
    title: "Marketing / Social Agent",
    body: "Turns real lead questions into weekly themes, hooks, and platform-ready drafts your team approves.",
    icon: Megaphone,
  },
] as const;

const workflowSteps = [
  "Lead comes in",
  "AI qualifies",
  "Booking / follow-up",
  "Owner alert",
  "Dashboard insight",
  "Marketing content",
] as const;

/** False in production build and in Node prerender (no Vite `import.meta.env`). */
const viteEnv = typeof import.meta !== "undefined" && import.meta.env ? import.meta.env : undefined;
const showDevCommandCenter = viteEnv?.DEV === true;

export default function AiEmployeeSystemPage() {
  const description =
    "Mercy AI Staff and Revora AI Employee: a 24/7 AI team for lead capture, bookings, follow-up, handoffs, missed revenue visibility, and marketing support—built for local service businesses.";
  const path = "/ai-employee-system";

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead path={path} title="AI Employee System" description={description} />
      <JsonLd
        data={[
          organizationSchema(),
          webPageSchema({ name: "AI Employee System", description, path }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "AI Employee System", path },
          ]),
        ]}
      />
      <main>
        {/* Hero */}
        <section className="section pt-10 md:pt-14 pb-4 md:pb-6" aria-labelledby="ai-employee-hero-title">
          <div className="section-inner max-w-4xl mx-auto text-center">
            <motion.p
              {...fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-cyan mb-4"
            >
              Mercy AI Staff · Revora AI Employee
            </motion.p>
            <motion.h1
              id="ai-employee-hero-title"
              {...fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-50 tracking-tight mb-6 md:mb-8 leading-tight"
            >
              Your 24/7 AI Employee Team for Leads, Bookings, Follow-Up, and Growth
            </motion.h1>
            <motion.p
              {...fadeUp}
              className="text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-10"
            >
              An AI receptionist answers and qualifies around the clock. Specialized agents handle lead intake,
              scheduling intent, follow-up drafts, and human handoffs—then feed your dashboard and marketing with the
              same conversation truth your crew would trust on a job site.
            </motion.p>
            <motion.div
              {...fadeUp}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
            >
              <Button variant="primary" size="lg" asChild>
                <BookingLink className="flex items-center justify-center gap-2">
                  Book a Demo
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
              {showDevCommandCenter ? (
                <Button variant="outline" size="lg" asChild>
                  <Link to="/demo/command-center" className="flex items-center justify-center gap-2">
                    View Demo Command Center
                    <LayoutDashboard className="w-5 h-5" />
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" size="lg" asChild>
                  <Link to="/book-demo" className="flex items-center justify-center gap-2">
                    See the command center live
                    <LayoutDashboard className="w-5 h-5" />
                  </Link>
                </Button>
              )}
            </motion.div>
          </div>
        </section>

        {/* Problem */}
        <section className="section border-t border-slate-800/40" aria-labelledby="problem-heading">
          <div className="section-inner max-w-5xl mx-auto">
            <motion.div {...fadeUpInView} className="text-center mb-10 md:mb-12">
              <h2 id="problem-heading" className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">
                The revenue leaks every local owner knows
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
                None of this is a people problem—it is a capacity problem. AI employees fill the gaps without replacing
                your judgment.
              </p>
            </motion.div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {problemItems.map(({ title, body, icon: Icon }) => (
                <motion.li key={title} {...fadeUpInView}>
                  <div className="card-premium rounded-2xl p-6 h-full flex flex-col gap-3">
                    <span className="p-2.5 rounded-xl w-fit bg-electric-purple/10">
                      <Icon className="w-6 h-6 text-electric-purple" aria-hidden />
                    </span>
                    <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1">{body}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* AI team */}
        <section className="section" aria-labelledby="team-heading">
          <div className="section-inner max-w-5xl mx-auto">
            <motion.div {...fadeUpInView} className="text-center mb-10 md:mb-12">
              <h2 id="team-heading" className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">
                Your AI employee team
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
                Six focused roles—each one designed for how homeowners and commercial buyers actually reach you.
              </p>
            </motion.div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {agentRoles.map(({ title, body, icon: Icon }) => (
                <motion.li key={title} {...fadeUpInView}>
                  <div className="card-premium rounded-2xl p-6 h-full border-neon-cyan/10">
                    <span className="p-2.5 rounded-xl w-fit bg-neon-cyan/10 mb-4 inline-block">
                      <Icon className="w-6 h-6 text-neon-cyan" aria-hidden />
                    </span>
                    <h3 className="text-lg font-semibold text-slate-50 mb-2">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* Workflow */}
        <section className="section" aria-labelledby="workflow-heading">
          <div className="section-inner max-w-5xl mx-auto">
            <motion.div {...fadeUpInView} className="text-center mb-8">
              <h2 id="workflow-heading" className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">
                One workflow, end to end
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                From first ring to marketing insight—so growth is a system, not a scramble.
              </p>
            </motion.div>
            <motion.div
              {...fadeUpInView}
              className="card-premium rounded-2xl px-4 py-6 md:px-8 md:py-8 flex flex-wrap items-center justify-center gap-2 md:justify-between md:gap-1"
            >
              {workflowSteps.map((label, i) => (
                <div key={label} className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg border border-slate-700/90 bg-slate-950/80 px-3 py-2 text-center text-xs font-medium text-slate-200 md:min-w-36 md:text-sm">
                    {label}
                  </span>
                  {i < workflowSteps.length - 1 ? (
                    <ChevronRight className="hidden h-5 w-5 shrink-0 text-slate-600 md:block" aria-hidden />
                  ) : null}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Demo preview */}
        <section className="section" aria-labelledby="demo-preview-heading">
          <div className="section-inner max-w-3xl mx-auto">
            <motion.div {...fadeUpInView} className="card-premium rounded-2xl p-8 md:p-10 text-center">
              <LayoutDashboard className="w-10 h-10 text-neon-cyan mx-auto mb-4" aria-hidden />
              <h2 id="demo-preview-heading" className="text-xl md:text-2xl font-bold text-slate-50 mb-4">
                Command center preview
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Behind the scenes we use a single command-center layout to storyboard how leads, bookings, follow-ups,
                handoffs, missed revenue, and marketing drafts show up in one executive view—built so your team sees
                the whole AI employee system at a glance.
              </p>
              {showDevCommandCenter ? (
                <Button variant="outline" asChild>
                  <Link to="/demo/command-center" className="inline-flex items-center gap-2">
                    Open demo command center
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              ) : (
                <p className="text-sm text-slate-500">
                  The interactive preview runs in our local development environment only; on the public site we walk
                  through this view live on your strategy call.
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Safety */}
        <section className="section" aria-labelledby="safety-heading">
          <div className="section-inner max-w-3xl mx-auto">
            <motion.div {...fadeUpInView} className="flex flex-col sm:flex-row gap-6 items-start">
              <span className="p-3 rounded-xl bg-neon-cyan/10 shrink-0">
                <ShieldCheck className="w-8 h-8 text-neon-cyan" aria-hidden />
              </span>
              <div>
                <h2 id="safety-heading" className="text-xl md:text-2xl font-bold text-slate-50 mb-3">
                  You stay in control
                </h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Outbound emails, SMS, calendar bookings, and social posts can all sit behind human approval. The AI
                  proposes drafts and next steps—you decide what actually goes out under your brand. That keeps quality
                  high and surprises low while you still get 24/7 capture and qualification.
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Rollout is staged: we tune tone, escalation rules, and approval gates with you before anything
                  customer-facing runs unattended.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section pb-4" aria-labelledby="final-cta-heading">
          <div className="section-inner max-w-3xl mx-auto text-center">
            <motion.div {...fadeUpInView} className="card-premium rounded-2xl p-10 md:p-12 border-neon-cyan/20">
              <h2 id="final-cta-heading" className="text-2xl md:text-3xl font-bold text-slate-50 mb-4">
                Book Your AI Employee Demo
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Walk through Mercy AI Staff / Revora with your trade, your seasonality, and your calendar in mind—no
                obligation, no technical homework.
              </p>
              <Button variant="primary" size="lg" asChild>
                <BookingLink className="inline-flex items-center gap-2">
                  Book Your AI Employee Demo
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
