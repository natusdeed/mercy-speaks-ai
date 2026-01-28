"use client";

import { motion } from "framer-motion";
import {
  Database,
  MessageSquare,
  FileText,
  Search,
  Lock,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RAGDataPage() {
  const features = [
    {
      icon: Database,
      title: "Connect Your Data",
      description:
        "Integrate with your CRM, documents, databases, and knowledge bases.",
    },
    {
      icon: MessageSquare,
      title: "Natural Queries",
      description:
        "Ask questions in plain English. Get accurate answers from your business data.",
    },
    {
      icon: Search,
      title: "Intelligent Search",
      description:
        "Find relevant information across all your documents instantly.",
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description:
        "Your data stays private. All queries are encrypted and access-controlled.",
    },
  ];

  const useCases = [
    "Customer support knowledge base",
    "Internal documentation search",
    "Contract and legal document queries",
    "Product information database",
    "Training and onboarding materials",
    "Sales enablement resources",
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-purple/20 border border-electric-purple/30 mb-6">
              <Database className="w-4 h-4 text-electric-purple" />
              <span className="text-sm text-electric-purple font-medium">
                RAG / Data Intelligence
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 mb-6 title-3d">
              Chat with Your{" "}
              <span className="bg-gradient-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent">
                Business Data
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Transform your documents, databases, and knowledge bases into an intelligent
              AI assistant that understands your business and provides instant answers.
            </p>
            <Button variant="glow" size="lg" className="px-8 py-4 text-lg font-bold">
              Get Started
            </Button>
          </motion.div>

          {/* Chat Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/1 to-neon-cyan/1 opacity-5" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-6 h-6 text-electric-purple" />
                <h2 className="text-2xl font-semibold text-slate-50">
                  Query Your Business Data
                </h2>
              </div>

              {/* Chat Interface Preview */}
              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                  <p className="text-slate-300 text-sm mb-2">You:</p>
                  <p className="text-slate-50">
                    What are our refund policies for enterprise customers?
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-electric-purple/10 rounded-lg p-4 border border-electric-purple/30"
                >
                  <p className="text-electric-purple text-sm mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    AI Assistant:
                  </p>
                  <p className="text-slate-50">
                    Based on your enterprise contract terms, refunds are available within
                    30 days of purchase for annual subscriptions. Partial refunds apply
                    for mid-term cancellations...
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-400">
                      Source: contracts/enterprise-policy.pdf
                    </span>
                    <span className="text-xs px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-400">
                      Source: legal/refund-terms.docx
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass rounded-xl p-6 hover:border-electric-purple/50 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-electric-purple mb-4" />
                <h3 className="text-lg font-semibold text-slate-50 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Use Cases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-8 md:p-12 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-slate-50 mb-8">
              Perfect For Your Business
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {useCases.map((useCase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + idx * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-neon-cyan mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{useCase}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
