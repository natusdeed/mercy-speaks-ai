"use client";

import { motion } from "framer-motion";
import { Globe, Zap, CheckCircle2, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function WebsiteOfferTile() {
  const benefits = [
    {
      icon: Zap,
      text: "Built with AI in days, not months",
      color: "neon-cyan",
    },
    {
      icon: TrendingUp,
      text: "High-converting & mobile-optimized",
      color: "electric-purple",
    },
    {
      icon: Sparkles,
      text: "Foundation for automation systems",
      color: "neon-cyan",
    },
  ];

  const features = [
    "SEO-optimized for maximum visibility",
    "Designed to convert visitors to customers",
    "Integration-ready for digital employees",
    "Fast setup with 48-hour delivery",
  ];

  return (
    <div className="glass rounded-2xl p-6 md:p-8 h-full flex flex-col relative overflow-hidden group">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/1 via-transparent to-neon-cyan/1 opacity-5" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-electric-purple/1 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-neon-cyan/1 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-electric-purple/20 backdrop-blur-sm">
              <Globe className="w-6 h-6 text-electric-purple" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-slate-50">AI-Powered Business Website</h3>
              <p className="text-sm text-slate-400 mt-1">Your Digital Foundation</p>
            </div>
          </div>
        </div>

        {/* Strategic Value Proposition - Horizontal Layout */}
        <div className="mb-6 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Value Prop & Benefits */}
          <div>
            <p className="text-sm md:text-base text-slate-300 mb-6 leading-relaxed">
              One of the ways we help businesses get started is by building modern, 
              high-converting websites—the foundation where your digital employees first engage with customers.
            </p>

            {/* Key Benefits */}
            <div className="space-y-4 mb-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`p-2 rounded-lg ${
                      benefit.color === "electric-purple" 
                        ? "bg-electric-purple/20" 
                        : "bg-neon-cyan/20"
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        benefit.color === "electric-purple" 
                          ? "text-electric-purple" 
                          : "text-neon-cyan"
                      }`} />
                    </div>
                    <span className="text-sm text-slate-300 leading-relaxed font-medium">{benefit.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Features */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-50 mb-4">What You Get:</h4>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-neon-cyan mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 lg:mt-0">
              <Button 
                variant="glow" 
                size="lg" 
                className="w-full group/btn" 
                asChild
              >
                <Link to="/services/website-design" className="flex items-center justify-center gap-2">
                  Get Your Website
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <p className="text-sm text-center text-slate-400 mt-3 font-medium">
                Starting at $997 • 48-Hour Setup
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
