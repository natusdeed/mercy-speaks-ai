"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Clock,
  Globe,
  Zap,
  CheckCircle2,
  Volume2,
  MessageSquare,
  Calendar,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AIPhoneReceptionistPage() {
  const features = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Never miss a call. Your AI receptionist works around the clock, handling calls even on holidays and weekends.",
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Communicate with customers in their preferred language. No language barriers.",
    },
    {
      icon: Zap,
      title: "Instant Response",
      description: "Zero wait times. Customers get immediate assistance without being put on hold.",
    },
    {
      icon: Phone,
      title: "Natural Conversations",
      description: "Human-like interactions powered by advanced AI that understands context and nuance.",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Automatically schedule appointments, check availability, and send confirmations.",
    },
    {
      icon: Users,
      title: "Lead Qualification",
      description: "Qualify leads, gather information, and route high-value opportunities to your team.",
    },
  ];

  const capabilities = [
    "Answer frequently asked questions instantly",
    "Schedule and manage appointments automatically",
    "Qualify leads and gather contact information",
    "Route calls to the right department or person",
    "Provide product information and pricing",
    "Handle after-hours and overflow calls",
    "Send SMS and email notifications",
    "Integrate with your CRM and calendar systems",
    "Provide call transcripts and analytics",
    "Handle multiple calls simultaneously",
  ];

  const benefits = [
    {
      stat: "$3,649/month",
      description: "Savings vs. hiring a receptionist",
    },
    {
      stat: "24/7",
      description: "Always available coverage",
    },
    {
      stat: "0 seconds",
      description: "Average wait time",
    },
    {
      stat: "100%",
      description: "Consistency across all calls",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <main>
        {/* Hero Section */}
        <section className="pt-20 md:pt-24 pb-16 md:pb-24 px-6 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-purple/20 border border-electric-purple/30 mb-6">
                <Phone className="w-4 h-4 text-electric-purple" />
                <span className="text-sm text-electric-purple font-medium">
                  AI Phone Receptionist
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 mb-6 title-3d">
                24/7 AI{" "}
                <span className="bg-gradient-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent">
                  Receptionist
                </span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-slate-300 max-w-3xl mx-auto mb-8">
                Replace your phone support team with intelligent AI agents that never sleep,
                never get tired, and provide consistent, professional service every time—all for
                less than 1 hour of employee wages per month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="glow" size="lg" asChild>
                  <Link to="/book-demo">Schedule a Demo</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </motion.div>

            {/* Benefits Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                  className="glass rounded-xl p-8 md:p-10 text-center hover:scale-105 transition-transform"
                >
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent mb-2">
                    {benefit.stat}
                  </div>
                  <div className="text-base md:text-lg text-slate-300">{benefit.description}</div>
                </motion.div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  className="glass rounded-xl p-8 md:p-10 hover:border-electric-purple/50 hover:scale-105 transition-all"
                >
                  <feature.icon className="w-8 h-8 text-electric-purple mb-4" />
                  <h3 className="text-lg font-semibold text-slate-50 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass rounded-2xl p-8 md:p-12 mb-16"
            >
              <h2 className="text-3xl font-bold text-slate-50 mb-8">
                What Your AI Receptionist Can Do
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {capabilities.map((capability, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + idx * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-neon-cyan mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{capability}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ROI Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="glass rounded-2xl p-8 md:p-12 mb-16 border border-neon-cyan/30"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6 text-center">
                Massive Cost Savings
              </h2>
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="text-center p-6 rounded-xl bg-slate-900/50">
                    <div className="text-2xl font-semibold text-slate-400 mb-2">
                      Hiring a Receptionist
                    </div>
                    <div className="text-4xl font-bold text-slate-300 mb-2 line-through">
                      $3,646/month
                    </div>
                    <div className="text-sm text-slate-500">
                      Salary + Benefits + Overhead
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-electric-purple/20 to-neon-cyan/20 border border-electric-purple/30">
                    <div className="text-2xl font-semibold text-slate-50 mb-2">
                      AI Receptionist
                    </div>
                    <div className="text-4xl font-bold text-neon-cyan mb-2">
                      Starting at $197/month
                    </div>
                    <div className="text-sm text-slate-300">
                      Less than 1 hour of employee wages
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-electric-purple mb-2">
                    Save $3,449+ per month
                  </div>
                  <div className="text-slate-400">
                    Plus 24/7 coverage, zero training time, and perfect consistency
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <div className="glass rounded-2xl p-12 border border-electric-purple/30 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
                  Ready to Replace Your Receptionist?
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-8">
                  Get started in 48 hours. No setup fees. Cancel anytime.
                </p>
                <Button variant="glow" size="lg" asChild>
                  <Link to="/book-demo">
                    Schedule a Demo
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}