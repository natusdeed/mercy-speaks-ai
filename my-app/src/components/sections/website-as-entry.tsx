"use client";

import { motion } from "framer-motion";
import { Globe, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function WebsiteAsEntry() {
  const websiteBenefits = [
    "Modern, high-converting websites that attract customers",
    "Foundation for automation and digital employee systems",
    "Mobile-friendly and SEO-optimized for maximum visibility",
    "Fast setup using AI—get online in days, not months",
  ];

  return (
    <section className="py-16 md:py-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/1 via-transparent to-neon-cyan/1" />
      
      <div className="max-w-7xl mx-auto relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 md:p-12 border-2 border-electric-purple/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-electric-purple/1 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-cyan/1 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-purple/20 border border-electric-purple/30 mb-6">
                <Globe className="w-4 h-4 text-electric-purple" />
                <span className="text-sm text-electric-purple font-medium">Starting Point</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6">
                Get Started with a{" "}
                <span className="bg-gradient-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent">
                  Modern Website
                </span>
              </h2>
              <p className="text-lg text-slate-300 mb-6">
                One of the ways we help businesses get started is by building modern, 
                high-converting websites. This serves as the foundation for your digital 
                employee systems and automation.
              </p>
              <p className="text-base text-slate-400 mb-8">
                Your website isn't just a digital presence—it's the entry point where customers 
                discover you, where automation begins, and where your digital employees first 
                engage with your audience.
              </p>
              <div className="space-y-3 mb-8">
                {websiteBenefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-neon-cyan mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              <Button variant="glow" size="lg" asChild className="px-8 py-4 text-lg font-bold group/btn">
                <Link to="/services/website-design" className="flex items-center gap-2">
                  Learn About Website Design
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="glass rounded-xl p-8 border border-slate-800">
                <div className="aspect-video bg-gradient-to-br from-electric-purple/20 to-neon-cyan/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-24 h-24 text-electric-purple/50" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
