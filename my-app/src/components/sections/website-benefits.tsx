"use client";

import { motion } from "framer-motion";
import { Zap, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function WebsiteBenefits() {
  const benefits = [
    {
      icon: Zap,
      title: "Built Faster",
      description: "AI accelerates development, so you get your website in days, not months.",
    },
    {
      icon: DollarSign,
      title: "More Affordable",
      description: "Smart AI tools mean lower costs—high-quality websites without high agency prices.",
    },
    {
      icon: Clock,
      title: "Smarter Solutions",
      description: "Modern websites designed to convert visitors into customers and grow your business.",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/1 via-transparent to-neon-cyan/1" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-50 mb-6">
            We Build Your Website{" "}
            <span className="bg-gradient-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent">
              Faster, Smarter, and More Affordably
            </span>{" "}
            Using AI
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            So you can focus on your business—not building websites. We use modern AI tools to deliver 
            professional websites that help small businesses, local businesses, and churches grow their 
            online presence without breaking the bank.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-xl p-6 hover:border-electric-purple/50 transition-all group"
              >
                <div className="p-3 rounded-lg bg-electric-purple/20 w-fit mb-4">
                  <Icon className="w-6 h-6 text-electric-purple" />
                </div>
                <h3 className="text-xl font-bold text-slate-50 mb-2">{benefit.title}</h3>
                <p className="text-slate-400">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button variant="glow" size="lg" asChild className="text-lg px-8 py-6 group/btn">
            <Link to="/book-demo" className="flex items-center gap-3">
              Get Your Website Today
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
