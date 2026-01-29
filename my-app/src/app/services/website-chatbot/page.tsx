import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Zap,
  Globe,
  Clock,
  CheckCircle2,
  Bot,
  FileText,
  Shield,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function WebsiteChatbotPage() {
  const features = [
    {
      icon: Zap,
      title: "Instant Responses",
      description: "Respond to visitors instantly, 24/7. No waiting, no delays—immediate engagement.",
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Communicate with visitors in their preferred language, automatically detecting and responding.",
    },
    {
      icon: Bot,
      title: "Intelligent Conversations",
      description: "Understands context, remembers conversations, and provides relevant, helpful answers.",
    },
    {
      icon: FileText,
      title: "Knowledge Base Integration",
      description: "Connected to your documentation, FAQs, and product information for accurate answers.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security ensuring all conversations and data remain protected.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track conversations, identify common questions, and optimize your customer experience.",
    },
  ];

  const capabilities = [
    "Answer product and service questions instantly",
    "Qualify leads and capture contact information",
    "Schedule appointments and consultations",
    "Guide visitors through your website",
    "Handle common support requests",
    "Escalate complex issues to human agents",
    "Provide pricing and quote information",
    "Process orders and bookings",
    "Collect feedback and reviews",
    "Integrate with CRM and email marketing tools",
  ];

  const benefits = [
    {
      stat: "3x",
      description: "More leads captured",
    },
    {
      stat: "80%",
      description: "Faster response time",
    },
    {
      stat: "24/7",
      description: "Always available",
    },
    {
      stat: "40%",
      description: "Higher conversion rate",
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 mb-6">
                <MessageSquare className="w-4 h-4 text-neon-cyan" />
                <span className="text-sm text-neon-cyan font-medium">Website Chatbot</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 mb-6 title-3d">
                AI{" "}
                <span className="bg-gradient-to-r from-neon-cyan to-electric-purple bg-clip-text text-transparent">
                  Website Chatbot
                </span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-slate-300 max-w-3xl mx-auto mb-8">
                Engage every visitor instantly with an intelligent chatbot that answers questions,
                qualifies leads, and drives conversions—all while your team focuses on what matters
                most.
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
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-neon-cyan to-electric-purple bg-clip-text text-transparent mb-2">
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
                  className="glass rounded-xl p-8 md:p-10 hover:border-neon-cyan/50 hover:scale-105 transition-all"
                >
                  <feature.icon className="w-8 h-8 text-neon-cyan mb-4" />
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
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-8">
                What Your Chatbot Can Do
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {capabilities.map((capability, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + idx * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-neon-cyan mt-0.5 flex-shrink-0" />
                    <span className="text-lg md:text-xl text-slate-300">{capability}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Use Cases */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="glass rounded-2xl p-8 md:p-12 mb-16 border border-neon-cyan/30"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-8 text-center">
                Perfect For Every Industry
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "E-commerce",
                    description: "Product recommendations, order tracking, and support",
                  },
                  {
                    title: "Healthcare",
                    description: "Appointment scheduling, insurance verification, and FAQs",
                  },
                  {
                    title: "Legal",
                    description: "Initial consultations, case assessments, and document requests",
                  },
                  {
                    title: "Real Estate",
                    description: "Property inquiries, viewing scheduling, and agent connections",
                  },
                  {
                    title: "Education",
                    description: "Course information, enrollment assistance, and support",
                  },
                  {
                    title: "Services",
                    description: "Quote requests, booking, and customer onboarding",
                  },
                ].map((useCase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + idx * 0.05 }}
                    className="p-6 rounded-xl bg-slate-900/50 border border-slate-800/50"
                  >
                    <h3 className="text-lg font-semibold text-slate-50 mb-2">{useCase.title}</h3>
                    <p className="text-sm text-slate-400">{useCase.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-center"
            >
              <div className="glass rounded-2xl p-12 border border-neon-cyan/30 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
                  Ready to Engage Every Visitor?
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-8">
                  Transform your website into a 24/7 lead generation machine.
                </p>
                <Button variant="glow" size="lg" asChild>
                  <Link to="/book-demo">Schedule a Demo</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}