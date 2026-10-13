"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";
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
  "Automated Review Requests",
  "Google & Facebook Monitoring",
  "Response Templates Included",
  "Monthly Review Report",
] as const;

const faqItems: AccordionItemData[] = [
  {
    id: "platforms",
    question: "Which review platforms do you monitor?",
    answer:
      "Google Business Profile, Facebook, and Yelp. Google is the priority — it directly impacts your local search ranking.",
  },
  {
    id: "negative",
    question: "What if a customer leaves a negative review?",
    answer:
      "We alert you immediately and provide a professionally written response template. We can also respond on your behalf if you prefer (included in Growth plan).",
  },
  {
    id: "gbp",
    question: "Do I need a Google Business Profile?",
    answer: "Yes — and if you don't have one, we'll set it up for you as part of onboarding at no extra charge.",
  },
  {
    id: "requests",
    question: "How many review requests does it send per month?",
    answer: "As many as jobs you complete. Every completed job triggers one request. There's no cap.",
  },
  {
    id: "customize",
    question: "Can I customize the review request message?",
    answer:
      "Absolutely. We write the initial message for you during onboarding and you approve it before it goes live.",
  },
  {
    id: "crm",
    question: "Does this work with my existing CRM?",
    answer:
      "We integrate with most major CRMs via Make.com. If yours isn't supported, we'll find a workaround during onboarding.",
  },
];

export default function ReviewGenerationPage() {
  const description =
    "Automatically collect more 5-star Google reviews after every job. We monitor, alert, and grow your online reputation for local service businesses.";
  const intro =
    "We automate review requests, monitor your reputation across platforms, and help you respond professionally — so your stars keep rising.";

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead
        path={NAV_PATHS.reviewGeneration}
        title="Google Review Automation | Mercy Speaks Digital"
        description={description}
      />
      <JsonLd
        data={[
          webPageSchema({
            name: "Reputation Management",
            description,
            path: NAV_PATHS.reviewGeneration,
          }),
          serviceSchema({
            name: "Reputation Management",
            description: intro,
            path: NAV_PATHS.reviewGeneration,
            serviceType: "Reputation management",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: NAV_PATHS.services },
            { name: "Reputation management", path: NAV_PATHS.reviewGeneration },
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
                { name: "Reputation management" },
              ]}
            />
            <motion.div {...fadeUp} className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/15 border border-neon-cyan/20 mb-5">
                <Shield className="w-4 h-4 text-neon-cyan" />
                <span className="text-xs sm:text-sm text-neon-cyan font-semibold tracking-wide">
                  Reputation Management
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-50 tracking-tight mb-5 title-3d">
                Your Reputation Is Your Most Valuable Business Asset. We Protect and Grow It.
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto mb-7">
                {intro}
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center">
                <Button variant="primary" size="lg" asChild className="rounded-xl">
                  <BookingLink kind="generalStrategyCall" className="flex items-center justify-center gap-2">
                    Get More 5-Star Reviews
                    <ArrowRight className="w-5 h-5" />
                  </BookingLink>
                </Button>
                <Button variant="outline" size="lg" asChild className="rounded-xl">
                  <a href="#how-it-works" className="flex items-center justify-center gap-2">
                    See How It Works
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
              <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-4">The Real Cost of Too Few Reviews</h2>
              {/* P0 hotfix: unsourced statistics and comparison quote removed. */}
              <p className="text-slate-300 text-sm md:text-base">
                Prospects compare reviews before they call. A thin or stale review profile can cost you jobs to
                competitors with more recent, visible feedback.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="how-it-works" className="section pt-0">
          <div className="section-inner max-w-6xl mx-auto">
            <motion.div {...fadeUpInView} className="mb-7">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">
                Set It Up Once. Reviews Come In Automatically.
              </h2>
            </motion.div>
            <div className="space-y-4">
              {[
                {
                  title: "Job Completed",
                  body: "Your team marks a job done in your CRM or scheduler, or sends a simple signal via our Make.com integration.",
                },
                {
                  title: "Automated Request Sent",
                  body: "Within minutes, your customer receives a personalized SMS and/or email asking for a Google review. Timing and message are customized to your brand.",
                },
                {
                  title: "Customer Leaves Review",
                  body: "The request links directly to your Google Business Profile — zero friction, one tap to leave a review.",
                },
                {
                  title: "We Monitor & Alert",
                  body: "We monitor Google, Facebook, and Yelp for new reviews. You get notified of anything that needs attention.",
                },
                {
                  title: "Monthly Report",
                  body: "You receive a monthly reputation summary: new reviews, star rating trend, total review count, and competitor comparison.",
                },
              ].map((step, index) => (
                <motion.article key={step.title} {...fadeUpInView} className="card-premium rounded-2xl">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-electric-purple/15 text-electric-purple font-semibold text-sm shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-slate-50 mb-1">{step.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="section pt-0">
          <div className="section-inner max-w-6xl mx-auto">
            <motion.div {...fadeUpInView} className="mb-7">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">Reputation Management Pricing</h2>
              <p className="text-slate-400 text-base md:text-lg">
                Available as a standalone service or included in our SMM Growth plan.
              </p>
            </motion.div>

            <div className="rounded-2xl border border-neon-cyan/30 bg-neon-cyan/10 p-4 mb-5 text-sm text-neon-cyan">
              Bundle with{" "}
              <Link to={NAV_PATHS.socialMediaManagement} className="underline underline-offset-2 hover:text-slate-50">
                Social Media Management
              </Link>
            </div>

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
              <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">Start Earning More Reviews This Month</h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-7">
                Book a free 15-minute call. We'll review your current Google profile, show you what's hurting you, and
                explain exactly how our system works.
              </p>
              <Button variant="primary" size="lg" asChild className="rounded-xl">
                <BookingLink kind="generalStrategyCall" className="flex items-center justify-center gap-2">
                  Book Free Reputation Audit
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