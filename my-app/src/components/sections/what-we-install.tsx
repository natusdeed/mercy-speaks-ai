"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { BookingLink } from "@/components/cta/booking-link";

const INSTALLS = [
  {
    icon: Phone,
    title: "AI Receptionist",
    description: "24/7 phone answering: qualify leads, book appointments, take messages. Never miss a call.",
    href: "/services/ai-phone-receptionist",
    color: "neon-cyan",
    useBookingLink: false,
  },
  {
    icon: MessageCircle,
    title: "Missed-Call Text Back",
    description: "Automatically text callers who don't reach you. Re-engage leads before they go to a competitor.",
    href: "/book-demo",
    color: "electric-purple",
    useBookingLink: true,
  },
  {
    icon: BarChart3,
    title: "Missed Revenue Dashboard",
    description: "See every missed call, dropped lead, and dollar left on the table—so you can fix it.",
    href: "/book-demo",
    color: "neon-cyan",
    useBookingLink: true,
  },
];

export function WhatWeInstall() {
  return (
    <section
      className="section bg-slate-950"
      aria-labelledby="what-we-install-title"
    >
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2
            id="what-we-install-title"
            className="text-3xl md:text-4xl font-bold text-slate-50 mb-3"
          >
            What We Install
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Answer calls. Text back missed callers. See your missed revenue.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {INSTALLS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="card-premium flex flex-col"
              >
                <div
                  className={`inline-flex p-3 rounded-lg mb-4 w-fit ${
                    item.color === "electric-purple"
                      ? "bg-electric-purple/15 text-electric-purple"
                      : "bg-neon-cyan/15 text-neon-cyan"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-50 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                  {item.description}
                </p>
                {item.useBookingLink ? (
                  <BookingLink
                    className={`text-sm font-medium ${
                      item.color === "electric-purple"
                        ? "text-electric-purple hover:text-electric-purple/80"
                        : "text-neon-cyan hover:text-neon-cyan/80"
                    } transition-colors`}
                  >
                    Book Demo →
                  </BookingLink>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-sm font-medium ${
                      item.color === "electric-purple"
                        ? "text-electric-purple hover:text-electric-purple/80"
                        : "text-neon-cyan hover:text-neon-cyan/80"
                    } transition-colors`}
                  >
                    Learn more →
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
