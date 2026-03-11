import { motion } from "framer-motion";
import { Phone, BarChart3, Globe, MessageSquare, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookingLink } from "@/components/cta/booking-link";

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

export default function ServicesPage() {
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
              Solutions That{" "}
              <span className="bg-linear-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent">
                Capture Revenue
              </span>
            </motion.h1>
            <motion.p
              {...fadeUp}
              transition={{ delay: 0.08 }}
              className="text-lg text-slate-400"
            >
              One flagship system to stop missed calls and lost leads, plus tools to convert and retain.
            </motion.p>
          </div>
        </section>

        {/* Flagship: 24/7 AI Receptionist + Missed Revenue Dashboard */}
        <section className="section border-t border-slate-800/50" aria-labelledby="flagship-heading">
          <div className="section-inner max-w-3xl mx-auto">
            <motion.article
              {...fadeUpInView}
              className="rounded-xl border border-slate-800/60 bg-slate-900/20 p-8 md:p-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-electric-purple/15 border border-electric-purple/25">
                  <Phone className="w-5 h-5 text-electric-purple" />
                </div>
                <span className="text-xs font-semibold text-electric-purple uppercase tracking-wider">
                  Flagship
                </span>
              </div>
              <h2 id="flagship-heading" className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">
                24/7 AI Receptionist + Missed Revenue Dashboard
              </h2>
              <p className="text-slate-400 mb-6">
                Answer every call, qualify leads, and book appointments around the clock. See exactly how much revenue was at risk and how much you capture—in one dashboard.
              </p>
              <ul className="space-y-1.5 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-neon-cyan shrink-0" />
                  Missed-call value and conversion in one place
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-neon-cyan shrink-0" />
                  Answer, qualify, and book in one system
                </li>
              </ul>
              <Button variant="primary" size="lg" asChild>
                <BookingLink className="flex items-center gap-2">
                  Book Demo
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
            </motion.article>
          </div>
        </section>

        {/* Supporting: Conversion Website + Booking */}
        <section className="section border-t border-slate-800/40" aria-labelledby="conversion-heading">
          <div className="section-inner max-w-3xl mx-auto">
            <motion.article
              {...fadeUpInView}
              className="rounded-xl border border-slate-800/50 bg-slate-900/10 p-8 md:p-10"
            >
              <div className="p-2 rounded-lg w-fit bg-neon-cyan/10 border border-neon-cyan/20 mb-3">
                <Globe className="w-5 h-5 text-neon-cyan" />
              </div>
              <h2 id="conversion-heading" className="text-xl md:text-2xl font-bold text-slate-50 mb-2">
                Conversion Website + Booking
              </h2>
              <p className="text-slate-400 mb-6">
                A site built to convert: clear offers, social proof, and booking that syncs with your AI receptionist and calendar. Visitors become appointments.
              </p>
              <Button variant="primary" size="lg" asChild>
                <BookingLink className="flex items-center gap-2">
                  Book Demo
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
            </motion.article>
          </div>
        </section>

        {/* Supporting: Website Chat That Books */}
        <section className="section border-t border-slate-800/40" aria-labelledby="chat-heading">
          <div className="section-inner max-w-3xl mx-auto">
            <motion.article
              {...fadeUpInView}
              className="rounded-xl border border-slate-800/50 bg-slate-900/10 p-8 md:p-10"
            >
              <div className="p-2 rounded-lg w-fit bg-electric-purple/10 border border-electric-purple/20 mb-3">
                <MessageSquare className="w-5 h-5 text-electric-purple" />
              </div>
              <h2 id="chat-heading" className="text-xl md:text-2xl font-bold text-slate-50 mb-2">
                Website Chat That Books
              </h2>
              <p className="text-slate-400 mb-6">
                Chat on your site that answers questions and books appointments. Captures leads 24/7 and hands them to your team or calendar—no forms left unanswered.
              </p>
              <Button variant="primary" size="lg" asChild>
                <BookingLink className="flex items-center gap-2">
                  Book Demo
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
            </motion.article>
          </div>
        </section>

        {/* Supporting: Reviews + Follow-up Automations */}
        <section className="section border-t border-slate-800/40 pb-20 md:pb-28" aria-labelledby="reviews-heading">
          <div className="section-inner max-w-3xl mx-auto">
            <motion.article
              {...fadeUpInView}
              className="rounded-xl border border-slate-800/50 bg-slate-900/10 p-8 md:p-10"
            >
              <div className="p-2 rounded-lg w-fit bg-neon-cyan/10 border border-neon-cyan/20 mb-3">
                <Star className="w-5 h-5 text-neon-cyan" />
              </div>
              <h2 id="reviews-heading" className="text-xl md:text-2xl font-bold text-slate-50 mb-2">
                Reviews + Follow-up Automations
              </h2>
              <p className="text-slate-400 mb-6">
                Turn completed work into reviews and repeat business. Automated follow-ups ask for reviews at the right time, then nurture leads so they come back.
              </p>
              <Button variant="primary" size="lg" asChild>
                <BookingLink className="flex items-center gap-2">
                  Book Demo
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
            </motion.article>
          </div>
        </section>
      </main>
    </div>
  );
}
