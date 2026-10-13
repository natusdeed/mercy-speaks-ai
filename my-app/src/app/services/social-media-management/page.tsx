"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Accordion, type AccordionItemData } from "@/components/ui/Accordion";
import { BookingLink } from "@/components/cta/booking-link";
import { NAV_PATHS } from "@/lib/site-config";
import { breadcrumbSchema, faqPageSchema, serviceSchema, webPageSchema } from "@/lib/schema";

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

const trustBar = [
  "No Long Contracts",
  "Branded Content Monthly",
  "Review Monitoring",
  "Houston-Based Team",
] as const;

const included = [
  {
    title: "Branded Content Creation",
    body: "Custom-designed graphics and posts built around your business identity — no stock templates.",
  },
  {
    title: "Caption Writing",
    body: "Engaging, conversion-focused captions with calls to action tailored to your services and audience.",
  },
  {
    title: "Monthly Content Calendar",
    body: "Delivered 5 days before each month starts. You review, approve, and we handle the rest.",
  },
  {
    title: "Post Scheduling & Publishing",
    body: "Every post goes live at the right time. You never log into Facebook or Instagram for posting again.",
  },
  {
    title: "Review Request Automation",
    body: "Automated SMS and email requests sent after completed jobs — so you earn Google reviews without asking.",
  },
  {
    title: "Monthly Performance Report",
    body: "Simple, clear report on reach, engagement, follower growth, and what we're adjusting next month.",
  },
] as const;

const faqItems: AccordionItemData[] = [
  {
    id: "contract",
    question: "Do I have to sign a long contract?",
    answer: "No. After your first 30 days, we're month-to-month. Cancel anytime with 30 days' written notice.",
  },
  {
    id: "platforms",
    question: "What platforms do you manage?",
    answer:
      "Starter covers Facebook and Instagram. Growth adds Google Business Profile. Additional platforms available as add-ons.",
  },
  {
    id: "content",
    question: "Do I need to provide content or photos?",
    answer:
      "Not required — we create everything. But if you have job site photos or team photos, we'd love to use them. Real photos outperform graphics every time.",
  },
  {
    id: "approval",
    question: "How does the content approval process work?",
    answer:
      "We deliver your monthly content calendar 5 days before the month starts. You review and give feedback. We incorporate changes and publish. Simple.",
  },
  {
    id: "onboarding",
    question: "How long does onboarding take?",
    answer: "From signing to first post live: 10–13 days. We move fast.",
  },
  {
    id: "existing",
    question: "What if I already have social media accounts?",
    answer: "Great — we take over management of your existing accounts. No need to start fresh.",
  },
];

export default function SocialMediaManagementPage() {
  const description =
    "End-to-end social media management for contractors—branded posts, scheduling, captions, and monthly reporting so you stay visible without posting yourself.";
  const intro =
    "We handle everything — content creation, post scheduling, caption writing, and review automation — so local business owners can stay focused on the work, not the feed.";

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead
        path={NAV_PATHS.socialMediaManagement}
        title="Social Media Management | Mercy Speaks Digital"
        description={description}
      />
      <JsonLd
        data={[
          webPageSchema({
            name: "Social Media Management",
            description,
            path: NAV_PATHS.socialMediaManagement,
          }),
          serviceSchema({
            name: "Social Media Management",
            description: intro,
            path: NAV_PATHS.socialMediaManagement,
            serviceType: "Social media management",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: NAV_PATHS.services },
            { name: "Social media management", path: NAV_PATHS.socialMediaManagement },
          ]),
          faqPageSchema(
            faqItems.map((f) => ({ question: f.question, answer: f.answer }))
          ),
        ]}
      />
      <main>
        <section className="section section-hero">
          <div className="section-inner max-w-6xl mx-auto">
            <Breadcrumbs
              className="mb-5 text-left"
              items={[
                { name: "Services", path: NAV_PATHS.services },
                { name: "Social media management" },
              ]}
            />
            <motion.div {...fadeUp} className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-purple/15 border border-electric-purple/20 mb-5">
                <Megaphone className="w-4 h-4 text-electric-purple" />
                <span className="text-xs sm:text-sm text-violet-300 font-semibold tracking-wide">
                  Social Media Management
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-50 tracking-tight mb-5 title-3d">
                Your Business Deserves a Social Media Presence That Never Goes Quiet
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto mb-7">
                {intro}
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center">
                <Button variant="primary" size="lg" asChild className="rounded-xl">
                  <BookingLink kind="generalStrategyCall" className="flex items-center justify-center gap-2">
                    Book a Free Strategy Call
                    <ArrowRight className="w-5 h-5" />
                  </BookingLink>
                </Button>
                <Button variant="outline" size="lg" asChild className="rounded-xl">
                  <a href="#pricing" className="flex items-center justify-center gap-2">
                    See Our Packages
                  </a>
                </Button>
              </div>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
                {trustBar.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-xl bg-slate-900/30 border border-slate-800/60 text-xs text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section pt-0">
          <div className="section-inner max-w-6xl mx-auto">
            <motion.div {...fadeUpInView} className="card-premium rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-4">
                If Your Social Media Looks Like This, You're Losing Business
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6">
                Before a customer picks up the phone, they check you out online. Here's what an inconsistent social
                presence costs you:
              </p>
              <div className="overflow-x-auto rounded-2xl border border-slate-800/60" tabIndex={0} role="region" aria-label="Comparison table">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-slate-900/40">
                    <tr>
                      <th className="text-left text-sm text-slate-300 px-4 py-3">What prospects see</th>
                      <th className="text-left text-sm text-slate-300 px-4 py-3">What they think</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Last post: 8 months ago", '"Are they even still open?"'],
                      ["No photos, stock images only", "\"I don't trust this company.\""],
                      ["3 reviews, 3.1 stars", '"There must be a better option."'],
                      ["Zero responses to comments", "\"They don't care about customers.\""],
                      ["No consistency in branding", "\"They don't seem professional.\""],
                    ].map(([left, right]) => (
                      <tr key={left} className="border-t border-slate-800/60">
                        <td className="px-4 py-3 text-sm text-slate-300">{left}</td>
                        <td className="px-4 py-3 text-sm text-slate-200">{right}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-200 text-sm md:text-base">
                "We fix all of this — and we do it without you having to think about it."
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section pt-0">
          <div className="section-inner max-w-6xl mx-auto">
            <motion.div {...fadeUpInView} className="mb-7">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">
                Everything Your Social Media Needs — Done For You
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {included.map((item) => (
                <motion.article key={item.title} {...fadeUpInView} className="card-premium rounded-2xl">
                  <h3 className="text-base font-semibold text-slate-50 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="section pt-0">
          <div className="section-inner max-w-6xl mx-auto">
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center text-neon-cyan underline underline-offset-2 hover:text-slate-50"
            >
              Contact us about this service
            </Link>
          </div>
        </section>

        <section className="section pt-0">
          <div className="section-inner max-w-4xl mx-auto">
            <motion.div {...fadeUpInView} className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-3">Common Questions</h2>
            </motion.div>
            <Accordion items={faqItems} />
          </div>
        </section>

        <section className="section pt-0 pb-24 md:pb-32">
          <div className="section-inner max-w-4xl mx-auto">
            <motion.div {...fadeUpInView} className="card-premium rounded-2xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">
                Ready to Show Up Consistently Online?
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-7">
                Book a free 15-minute strategy call. We'll audit your current social presence and show you exactly what
                we'd do for your business.
              </p>
              <Button variant="primary" size="lg" asChild className="rounded-xl">
                <BookingLink kind="generalStrategyCall" className="flex items-center justify-center gap-2">
                  Book a Free Strategy Call
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
              <p className="mt-4 text-sm text-slate-500">No credit card required  •  No pressure  •  Just clarity</p>
            </motion.div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
