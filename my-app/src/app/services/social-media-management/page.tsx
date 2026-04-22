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
import { NAV_PATHS } from "@/lib/site-config";
import { breadcrumbSchema, serviceSchema, webPageSchema } from "@/lib/schema";

const CAL_LINK = "https://cal.com/natusdeed/free-ai-receptionist-demo";

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
  "24/7 Review Monitoring",
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
    "Mercy Speaks Digital manages your social media end-to-end — branded posts, scheduling, review automation, and monthly reporting. Built for contractors and local service businesses in Houston.";

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead
        path={NAV_PATHS.socialMediaManagement}
        title="Social Media Management for Contractors & Local Businesses | Mercy Speaks Digital"
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
            description,
            path: NAV_PATHS.socialMediaManagement,
            serviceType: "Social media management",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: NAV_PATHS.services },
            { name: "Social media management", path: NAV_PATHS.socialMediaManagement },
          ]),
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
                <span className="text-xs sm:text-sm text-electric-purple font-semibold tracking-wide">
                  Social Media Management
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-50 tracking-tight mb-5 title-3d">
                Your Business Deserves a Social Media Presence That Never Goes Quiet
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto mb-7">
                We handle everything — content creation, post scheduling, caption writing, and review automation — so
                local business owners can stay focused on the work, not the feed.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center">
                <Button variant="primary" size="lg" asChild className="rounded-xl">
                  <a href={CAL_LINK} className="flex items-center justify-center gap-2">
                    Book a Free Strategy Call
                    <ArrowRight className="w-5 h-5" />
                  </a>
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
              <div className="overflow-x-auto rounded-2xl border border-slate-800/60">
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
            <motion.div {...fadeUpInView} className="mb-7">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">
                Simple, Flat-Rate Pricing. No Surprises.
              </h2>
              <p className="text-slate-400 text-base md:text-lg">
                One-time onboarding fee of $197 covers brand kit setup, account configuration, and strategy session.
                Month-to-month after your first 30 days.
              </p>
            </motion.div>

            <div className="rounded-2xl border border-neon-cyan/30 bg-neon-cyan/10 p-4 mb-5 text-sm text-neon-cyan">
              Want reviews too? Our Growth plan includes{" "}
              <Link to={NAV_PATHS.reviewGeneration} className="underline underline-offset-2 hover:text-slate-50">
                Reputation Management.
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <motion.article {...fadeUpInView} className="card-premium rounded-2xl">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Starter</p>
                <h3 className="text-3xl font-bold text-slate-50 mb-1">$397 / month</h3>
                <p className="text-sm text-slate-400 mb-6">Perfect for businesses getting consistent online</p>
                <ul className="space-y-2.5 mb-7">
                  {[
                    "12 branded posts / month",
                    "Facebook + Instagram management",
                    "Custom captions for every post",
                    "Monthly content calendar",
                    "Post scheduling & publishing",
                    "Basic monthly performance report",
                    "1 revision round per content batch",
                    "Email support (48hr response)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="default" className="w-full" asChild>
                  <a href={CAL_LINK}>Get Started</a>
                </Button>
              </motion.article>

              <motion.article {...fadeUpInView} className="relative rounded-2xl overflow-hidden bg-slate-900/50 shadow-lg shadow-electric-purple/5 p-7">
                <div className="absolute top-0 left-0 right-0 py-2 text-center text-xs font-semibold text-slate-950 bg-electric-purple">
                  Most Popular
                </div>
                <div className="pt-7">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Growth</p>
                  <h3 className="text-3xl font-bold text-slate-50 mb-1">$697 / month</h3>
                  <p className="text-sm text-slate-400 mb-6">For businesses ready to dominate their local market</p>
                  <ul className="space-y-2.5 mb-7">
                    {[
                      "20 branded posts / month",
                      "Facebook + Instagram + Google Business Profile",
                      "Custom captions + hashtag strategy",
                      "Content calendar + strategy session",
                      "Post scheduling & publishing",
                      "Stories / Reels (4x per month)",
                      "Review request automation included",
                      "Full monthly report + strategy call",
                      "Priority support (24hr response)",
                      "Quarterly strategy review",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="primary" size="default" className="w-full" asChild>
                    <a href={CAL_LINK}>Get Started</a>
                  </Button>
                </div>
              </motion.article>
            </div>

            <motion.div {...fadeUpInView} className="card-premium rounded-2xl overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr className="border-b border-slate-800/60">
                    <th className="text-left text-sm text-slate-300 px-4 py-3">Add-On Service</th>
                    <th className="text-left text-sm text-slate-300 px-4 py-3">Starter</th>
                    <th className="text-left text-sm text-slate-300 px-4 py-3">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Extra 8 posts / month", "+$147/mo", "Included"],
                    ["Google Business posting (4x/month)", "+$97/mo", "Included"],
                    ["Facebook/Instagram paid ad management", "+$297/mo", "+$297/mo"],
                    ["Review response management", "+$97/mo", "+$97/mo"],
                    ["Reels / Short-form video (4x/month)", "+$197/mo", "Included"],
                  ].map(([name, starter, growth]) => (
                    <tr key={name} className="border-b border-slate-800/40 last:border-0">
                      <td className="px-4 py-3 text-sm text-slate-200">{name}</td>
                      <td className="px-4 py-3 text-sm text-slate-300">{starter}</td>
                      <td className="px-4 py-3 text-sm text-slate-300">{growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
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
                <a href={CAL_LINK} className="flex items-center justify-center gap-2">
                  Book a Free Strategy Call
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <p className="mt-4 text-sm text-slate-500">No credit card required  •  No pressure  •  Just clarity</p>
            </motion.div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
