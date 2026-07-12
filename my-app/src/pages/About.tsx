"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import {
  Target,
  Zap,
  Heart,
  Users,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { BookingLink } from "@/components/cta/booking-link";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { BRAND_TAGLINE, BUSINESS, telHref } from "@/lib/site-config";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description:
        "We're on a mission to make AI automation accessible to businesses of all sizes, helping them compete and thrive in the digital age.",
    },
    {
      icon: Zap,
      title: "Innovation First",
      description:
        "We stay at the cutting edge of AI technology, continuously improving our solutions to deliver maximum value to our clients.",
    },
    {
      icon: Heart,
      title: "Client Success",
      description:
        "Your success is our success. We measure our performance by the ROI and growth we deliver to your business.",
    },
    {
      icon: Users,
      title: "Partnership Approach",
      description:
        "We don't just provide software—we become an extension of your team, working alongside you to achieve your goals.",
    },
  ];

  const differentiators = [
    "Based in Richmond, Texas—Houston metro area",
    "Specialized focus on websites for small businesses, local businesses, and churches",
    "Modern AI-assisted development workflow—faster delivery and more iteration at the same quality bar",
    "Premium creative and systems built for how local owners actually operate",
    "Simple, business-owner-friendly approach—no tech jargon",
    "Results-driven: we focus on outcomes like more customers and growth",
  ];

  const howWeWork = [
    {
      step: "01",
      title: "Strategy call",
      description:
        "We map your goals, current systems, and must-haves—so the build starts from a clear plan, not guesswork.",
    },
    {
      step: "02",
      title: "Build & install",
      description:
        "We design, build, and install your website and/or AI systems, wired into the tools your team already uses.",
    },
    {
      step: "03",
      title: "Iterate with reporting",
      description:
        "After launch we refine from real usage and share clear reporting—so improvements stay tied to outcomes.",
    },
  ];

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead
        path="/about"
        title="About Mercy Speaks Digital | Houston-Area Web & AI Agency"
        description="Houston-area web and AI agency building premium websites, AI receptionists, and automation for small businesses nationwide. See how we partner and deliver."
      />
      <JsonLd
        data={[
          webPageSchema({
            name: "About Mercy Speaks Digital",
            description: BRAND_TAGLINE,
            path: "/about",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <main className="pb-16">
        <section className="section !pt-6 md:!pt-8 pb-16 md:pb-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 mb-6">
                <Users className="w-4 h-4 text-neon-cyan" />
                <span className="text-sm text-neon-cyan font-medium">About Us</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-50 mb-6 title-3d">
                Modern Websites &{" "}
                <span className="bg-gradient-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent">
                  Digital Solutions
                </span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-slate-300 max-w-3xl mx-auto mb-8">
                We're Mercy Speaks Digital—your partner for modern websites and AI-powered systems.
                Based in Richmond, Texas (Houston metro), we help small businesses, local service
                companies, and churches build a credible online presence and communication stack
                that actually gets used.
              </p>
            </motion.div>

            {/* Company Story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-2xl p-8 md:p-12 mb-16 max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6">Our Story</h2>
              <div className="space-y-6 text-lg md:text-xl text-slate-300 leading-relaxed">
                <p>
                  Founded in Richmond, Texas—in the heart of the Houston metro—Mercy Speaks Digital
                  was built for small businesses, local service companies, and churches that need
                  premium websites and AI systems tailored to how they actually operate day to day.
                </p>
                <p>
                  Our modern AI-assisted development workflow lets us deliver faster and iterate
                  more—at the same quality bar. We're not just another agency; we're partners in
                  building a strong online presence for owners across Fort Bend, the greater Houston
                  area, and nationwide.
                </p>
                <p>
                  Today we help clients ship modern websites, automate phone systems, improve
                  customer follow-up, and streamline operations. Every project is built for real
                  business owners: clearer positioning, fewer missed leads, and systems your team
                  can run with confidence.
                </p>
                <p>
                  Our approach is simple: smart, modern, trustworthy, and results-driven. Behind
                  every site and AI install is a local owner trying to grow—so we focus on outcomes:
                  more customers, stronger credibility, and measurable growth.
                </p>
              </div>
            </motion.div>

            {/* How we work */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="glass rounded-2xl p-8 md:p-12 mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4 text-center">
                How we work
              </h2>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed text-center max-w-2xl mx-auto mb-10">
                A clear path from first conversation to live systems—then ongoing refinement with
                reporting you can act on.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                {howWeWork.map((item, idx) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.08 }}
                    className="text-center md:text-left"
                  >
                    <div className="text-sm font-semibold text-neon-cyan mb-2">{item.step}</div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center">
                <Button variant="primary" size="lg" asChild className="px-8 py-4 text-lg font-bold">
                  <BookingLink kind="generalStrategyCall">
                    Book a strategy call
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </BookingLink>
                </Button>
              </div>
            </motion.div>

            {/* Values Grid */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-8 text-center">
                What we stand for
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                {values.map((value, idx) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                    className="glass rounded-xl p-8 md:p-10 hover:border-electric-purple/50 hover:scale-105 transition-all"
                  >
                    <value.icon className="w-8 h-8 text-electric-purple mb-4" />
                    <h3 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-2">{value.title}</h3>
                    <p className="text-sm text-slate-400">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Focus — outcomes without unverified metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass rounded-2xl p-8 md:p-12 mb-16 max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-6 text-center">
                What we optimize for
              </h2>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed text-center max-w-2xl mx-auto">
                Clear positioning on your website, fewer missed calls and stalled leads, faster follow-up, and booking
                flows that are easy for customers to complete. We ship premium creative and systems you can actually
                run—not buzzwords or vanity dashboards.
              </p>
            </motion.div>

            {/* What Makes Us Different */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass rounded-2xl p-8 md:p-12 mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-8">
                What Makes Us Different
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {differentiators.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 + idx * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-neon-cyan mt-0.5 flex-shrink-0" />
                    <span className="text-lg md:text-xl text-slate-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Location & Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="glass rounded-2xl p-8 md:p-12 mb-16 border border-electric-purple/30"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-8 text-center">
                Located in the Heart of Houston Metro
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <MapPin className="w-10 h-10 text-electric-purple mb-4" />
                  <h3 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-2">Location</h3>
                  <p className="text-lg md:text-xl text-slate-300">
                    Richmond, Texas 77407
                    <br />
                    Houston Metro Area
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Phone className="w-10 h-10 text-neon-cyan mb-4" />
                  <h3 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-2">Phone</h3>
                  <a
                    href={telHref()}
                    className="text-xl md:text-2xl text-slate-300 hover:text-neon-cyan transition-colors"
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Mail className="w-10 h-10 text-electric-purple mb-4" />
                  <h3 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-2">Email</h3>
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="text-xl md:text-2xl text-slate-300 hover:text-neon-cyan transition-colors break-all"
                  >
                    {BUSINESS.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="text-center"
            >
              <div className="glass rounded-2xl p-12 border border-electric-purple/30 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
                  Ready to Get Your Website?
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-8">
                  Let's discuss how we can help you build a modern website that grows your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="primary" size="lg" asChild className="px-8 py-4 text-lg font-bold">
                    <BookingLink>
                      Get Your Website
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </BookingLink>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="px-8 py-4 text-lg font-bold">
                    <BookingLink>Book a Free Strategy Call</BookingLink>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
