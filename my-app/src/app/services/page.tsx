"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Phone,
  MessageSquare,
  Calendar,
  Star,
  Zap,
  Database,
  Workflow,
  CheckCircle2,
  ArrowRight,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ServicesPage() {
  const categories = [
    {
      title: "AI Automation & Digital Employees",
      description: "AI-powered systems that work 24/7 to handle your business operations",
      services: [
        {
          name: "AI Phone Receptionist",
          description: "24/7 AI receptionist that never misses a call",
          href: "/services/ai-phone-receptionist",
          icon: Phone,
          color: "neon-cyan",
        },
        {
          name: "Website Chatbot",
          description: "AI chatbot that answers questions and captures leads",
          href: "/services/website-chatbot",
          icon: MessageSquare,
          color: "electric-purple",
        },
        {
          name: "Workflow Automation",
          description: "Automate repetitive tasks and business processes",
          href: "/services/workflow-automation",
          icon: Workflow,
          color: "neon-cyan",
        },
      ],
      icon: Bot,
      color: "electric-purple",
    },
    {
      title: "Smart Business Systems",
      description: "Intelligent systems that integrate your tools and automate your operations",
      services: [
        {
          name: "RAG Data Systems",
          description: "AI-powered knowledge base for your business",
          href: "/services/rag-data",
          icon: Database,
          color: "electric-purple",
        },
        {
          name: "Appointment Automation",
          description: "Automate scheduling and reduce no-shows",
          href: "/services/appointment-automation",
          icon: Calendar,
          color: "neon-cyan",
        },
        {
          name: "Review Generation",
          description: "Automatically generate and manage customer reviews",
          href: "/services/review-generation",
          icon: Star,
          color: "electric-purple",
        },
      ],
      icon: Zap,
      color: "neon-cyan",
    },
    {
      title: "AI-Powered Websites",
      description: "Modern, high-converting websites that serve as the foundation for your digital presence",
      services: [
        {
          name: "AI-Powered Website Design",
          description: "Modern, mobile-friendly websites built fast using AI for small businesses, local businesses, and churches",
          href: "/services/website-design",
          icon: Globe,
          color: "electric-purple",
          popular: true,
          features: [
            "Modern, mobile-friendly websites",
            "Built fast using AI",
            "SEO-ready",
            "Designed to convert visitors into customers",
          ],
          subServices: [
            "Business Websites",
            "Church Websites",
            "Local Business Websites",
            "Landing Pages",
            "Website Redesigns",
          ],
        },
      ],
      icon: Globe,
      color: "electric-purple",
    },
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
                <Bot className="w-4 h-4 text-electric-purple" />
                <span className="text-sm text-electric-purple font-medium">Our Services</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 mb-6 title-3d">
                We Install{" "}
                <span className="bg-gradient-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent">
                  Digital Employees
                </span>
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                AI automation, smart business systems, and digital workers that save time, save money, 
                and scale your business—working 24/7 while you focus on what matters most.
              </p>
            </motion.div>

            {/* Service Categories */}
            {categories.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.2 }}
                  className="mb-16"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-3 rounded-xl ${
                      category.color === "electric-purple" 
                        ? "bg-electric-purple/20" 
                        : "bg-neon-cyan/20"
                    }`}>
                      <CategoryIcon className={`w-6 h-6 ${
                        category.color === "electric-purple" 
                          ? "text-electric-purple" 
                          : "text-neon-cyan"
                      }`} />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-2">
                        {category.title}
                      </h2>
                      <p className="text-lg text-slate-400">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.services.map((service, serviceIndex) => {
                      const ServiceIcon = service.icon;
                      return (
                        <motion.div
                          key={service.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 + categoryIndex * 0.2 + serviceIndex * 0.1 }}
                          className={`glass rounded-xl p-6 hover:border-electric-purple/50 transition-all group relative ${
                            (service as any).popular ? "border-2 border-electric-purple/50" : ""
                          }`}
                        >
                          {(service as any).popular && (
                            <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-electric-purple/20 border border-electric-purple/50 z-10">
                              <span className="text-xs font-semibold text-electric-purple">Popular Entry Point</span>
                            </div>
                          )}
                          <div className={`p-3 rounded-lg w-fit mb-4 ${
                            service.color === "electric-purple"
                              ? "bg-electric-purple/20"
                              : "bg-neon-cyan/20"
                          }`}>
                            <ServiceIcon
                              className={`w-6 h-6 ${
                                service.color === "electric-purple"
                                  ? "text-electric-purple"
                                  : "text-neon-cyan"
                              }`}
                            />
                          </div>
                          <h3 className="text-xl font-bold text-slate-50 mb-2">{service.name}</h3>
                          <p className="text-sm text-slate-400 mb-4">{service.description}</p>
                          
                          {(service as any).features && (
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-slate-50 mb-2">What You Get:</h4>
                              <div className="space-y-2">
                                {(service as any).features.map((feature: string) => (
                                  <div key={feature} className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-neon-cyan mt-0.5 flex-shrink-0" />
                                    <span className="text-xs text-slate-300">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {(service as any).subServices && (
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-slate-50 mb-2">We Build:</h4>
                              <div className="flex flex-wrap gap-2">
                                {(service as any).subServices.map((subService: string) => (
                                  <span
                                    key={subService}
                                    className="px-2 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-xs"
                                  >
                                    {subService}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <Link
                            href={service.href}
                            className={`text-sm font-medium flex items-center gap-1 group/link mt-4 ${
                              service.color === "electric-purple"
                                ? "text-electric-purple hover:text-electric-purple/80"
                                : "text-neon-cyan hover:text-neon-cyan/80"
                            }`}
                          >
                            Learn More
                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <div className="glass rounded-2xl p-12 border border-electric-purple/30 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-50 mb-4">
                  Ready to Install Your Digital Employees?
                </h2>
                <p className="text-xl text-slate-400 mb-8">
                  Let's discuss how we can automate your business and install systems that work 24/7 for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="glow" size="lg" asChild>
                    <Link href="/book-demo">
                      Book a Demo
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
