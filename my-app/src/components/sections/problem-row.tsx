"use client";

import { motion } from "framer-motion";
import { PhoneOff, Users, MessageSquareOff, CalendarX } from "lucide-react";

const BULLETS = [
  { icon: PhoneOff, text: "After-hours calls" },
  { icon: Users, text: "Busy staff" },
  { icon: MessageSquareOff, text: "No follow-up" },
  { icon: CalendarX, text: "Lost bookings" },
];

export function ProblemRow() {
  return (
    <section
      className="section bg-slate-950"
      aria-labelledby="problem-row-title"
    >
      <div className="section-inner">
        <motion.h2
          id="problem-row-title"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-slate-50 text-center mb-6 md:mb-8"
        >
          Sound familiar?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {BULLETS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="flex flex-col items-center text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800/60 text-slate-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
