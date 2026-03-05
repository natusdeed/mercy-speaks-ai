"use client";

import { motion } from "framer-motion";
import { Play, Mic, LayoutDashboard } from "lucide-react";

export function LiveDemoHome() {
  return (
    <section
      id="live-demo"
      className="section bg-slate-950 pt-8 md:pt-10"
      aria-labelledby="live-demo-title"
    >
      <div className="section-inner max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <h2
            id="live-demo-title"
            className="text-3xl md:text-4xl font-bold text-slate-50 mb-3"
          >
            See It In Action
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Hear a sample call, watch a short demo, and peek at the dashboard.
          </p>
        </motion.div>

        <div className="space-y-5 md:space-y-6">
          {/* Audio + Video placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl overflow-hidden bg-slate-900/20 shadow-sm"
            >
              <div className="aspect-video flex items-center justify-center bg-slate-800/40">
                <div className="flex flex-col items-center gap-2 text-slate-500">
                  <div className="w-14 h-14 rounded-full bg-slate-700/60 flex items-center justify-center">
                    <Mic className="w-7 h-7" />
                  </div>
                  <span className="text-sm">Audio sample</span>
                </div>
              </div>
              <div className="p-7">
                <p className="text-slate-400 text-sm">Sample call — placeholder</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="rounded-2xl overflow-hidden bg-slate-900/20 shadow-sm"
            >
              <div className="aspect-video flex items-center justify-center bg-slate-800/40">
                <div className="flex flex-col items-center gap-2 text-slate-500">
                  <div className="w-14 h-14 rounded-full bg-slate-700/60 flex items-center justify-center">
                    <Play className="w-7 h-7 ml-0.5" />
                  </div>
                  <span className="text-sm">Short demo video</span>
                </div>
              </div>
              <div className="p-7">
                <p className="text-slate-400 text-sm">Video — placeholder</p>
              </div>
            </motion.div>
          </div>

          {/* 3 dashboard screenshot placeholders */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-center gap-2 text-slate-500 mb-4">
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-sm font-medium">Dashboard</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {["Calls & leads", "Appointments", "Missed revenue"].map((label, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="rounded-2xl overflow-hidden bg-slate-900/20 shadow-sm p-7 flex items-center justify-center min-h-[120px]"
                >
                  <span className="text-slate-600 text-sm">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
