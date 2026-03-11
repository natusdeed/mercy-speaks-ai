import { motion } from "framer-motion";
import { Phone, BarChart3, Globe, MessageSquare, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { Link } from "react-router-dom";
import { BookingLink } from "@/components/cta/booking-link";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const fadeUpInView = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

export default function ServicesPage() {
  return (
    <PageShell className="min-h-screen bg-slate-950">
      <main>
        {/* Hero */}
        <section className="section">
          <div className="section-inner text-center">
            <motion.div {...fadeUp}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-50 tracking-tight mb-6">
                Solutions That{" "}
                <span className="text-neon-cyan">
                  Capture Revenue
                </span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                One flagship system to stop missed calls and lost leads, plus supporting solutions to convert and retain customers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Flagship: 24/7 AI Receptionist + Missed Revenue Dashboard */}
        <section className="section">
          <div className="section-inner">
            <motion.div
              {...fadeUpInView}
              className="card p-10 md:p-14"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-electric-purple/20">
                  <Phone className="w-6 h-6 text-electric-purple" />
                </div>
                <span className="text-sm font-semibold text-electric-purple uppercase tracking-wider">
                  Flagship
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">
                24/7 AI Receptionist + Missed Revenue Dashboard
              </h2>
              <p className="text-lg text-slate-400 mb-6 max-w-2xl">
                Never miss a call again. Our AI answers every call, qualifies leads, and books appointments around the clock. 
                The dashboard shows you exactly how much revenue was at risk and how much you're now capturing—so you see the ROI in real time.
              </p>
              <ul className="space-y-2 text-slate-300 mb-10">
                <li className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-neon-cyan shrink-0" />
                  See missed-call value and conversion in one place
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-neon-cyan shrink-0" />
                  One system for answer, qualify, and book
                </li>
              </ul>
              <Button variant="primary" size="lg" asChild>
                <BookingLink className="flex items-center gap-2">
                  Book Demo
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Supporting solutions intro */}
        <section className="section">
          <div className="section-inner text-center">
            <motion.p {...fadeUp} className="text-lg text-slate-400">
              Pair your receptionist with conversion and retention tools.
            </motion.p>
          </div>
        </section>

        {/* Supporting: Conversion Website + Booking */}
        <section className="section">
          <div className="section-inner">
            <motion.div
              {...fadeUpInView}
              className="card p-10 md:p-12"
            >
              <div className="p-2.5 rounded-xl w-fit bg-neon-cyan/10 mb-4">
                <Globe className="w-6 h-6 text-neon-cyan" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">
                Conversion Website + Booking
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl">
                A site built to convert: clear offers, social proof, and booking that syncs with your AI receptionist and calendar. 
                Visitors become appointments without extra back-and-forth.
              </p>
              <Button variant="primary" size="lg" asChild>
                <BookingLink className="flex items-center gap-2">
                  Book Demo
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Supporting: Website Chat That Books */}
        <section className="section">
          <div className="section-inner">
            <motion.div
              {...fadeUpInView}
              className="card p-10 md:p-12"
            >
              <div className="p-2.5 rounded-xl w-fit bg-electric-purple/10 mb-4">
                <MessageSquare className="w-6 h-6 text-electric-purple" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">
                Website Chat That Books
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl">
                Chat on your site that answers questions and books appointments. 
                Captures leads 24/7 and hands them to your team or calendar—no more forms that go unanswered.
              </p>
              <Button variant="primary" size="lg" asChild>
                <BookingLink className="flex items-center gap-2">
                  Book Demo
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Supporting: Reviews + Follow-up Automations */}
        <section className="section pb-24 md:pb-32">
          <div className="section-inner">
            <motion.div
              {...fadeUpInView}
              className="card p-10 md:p-12"
            >
              <div className="p-2.5 rounded-xl w-fit bg-neon-cyan/10 mb-4">
                <Star className="w-6 h-6 text-neon-cyan" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">
                Reviews + Follow-up Automations
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl">
                Turn completed work into reviews and repeat business. Automated follow-ups ask for reviews at the right time, 
                then nurture leads so they come back—without you chasing them.
              </p>
              <Button variant="primary" size="lg" asChild>
                <BookingLink className="flex items-center gap-2">
                  Book Demo
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
