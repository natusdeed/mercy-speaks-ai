import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Search,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Building2,
  Church,
  MapPin,
  FileText,
  RefreshCw,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function WebsiteDesignPage() {
  const features = [
    {
      icon: Smartphone,
      title: "Mobile-Friendly",
      description: "Your website looks perfect on phones, tablets, and desktops—so customers can find you anywhere.",
    },
    {
      icon: Zap,
      title: "Built Fast with AI",
      description: "We use modern AI tools to build your website quickly, without sacrificing quality or attention to detail.",
    },
    {
      icon: Search,
      title: "SEO-Ready",
      description: "Your website is optimized so customers can find you when they search online for what you offer.",
    },
    {
      icon: TrendingUp,
      title: "Designed to Convert",
      description: "Every page is crafted to turn visitors into customers—clear calls to action and easy navigation.",
    },
  ];

  const subServices = [
    {
      name: "Business Websites",
      description: "Professional websites that showcase your business and help you stand out online.",
      icon: Building2,
    },
    {
      name: "Church Websites",
      description: "Warm, welcoming websites that help your congregation stay connected and grow.",
      icon: Church,
    },
    {
      name: "Local Business Websites",
      description: "Designed to help local customers find you, learn about your services, and visit your location.",
      icon: MapPin,
    },
    {
      name: "Landing Pages",
      description: "Single-page websites focused on one goal—getting visitors to take action.",
      icon: FileText,
    },
    {
      name: "Website Redesigns",
      description: "Give your existing website a modern makeover that better represents your business today.",
      icon: RefreshCw,
    },
  ];

  const benefits = [
    "More customers find you online",
    "Professional image that builds trust",
    "Easy to update and manage",
    "Works on all devices",
    "Helps you compete with bigger businesses",
    "Grows with your business",
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
                <Globe className="w-4 h-4 text-electric-purple" />
                <span className="text-sm text-electric-purple font-medium">
                  AI-Powered Website Design
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 mb-6 title-3d">
                Modern Websites for{" "}
                <span className="bg-gradient-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent">
                  Small Businesses & Churches
                </span>
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                We build modern, mobile-friendly websites fast using AI—so you get a professional 
                online presence without the high agency costs. Perfect for small businesses, local 
                businesses, churches, and organizations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="glow" size="lg" asChild className="px-8 py-4 text-lg font-bold">
                  <Link to="/book-demo" className="flex items-center gap-2">
                    Get Your Website
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="px-8 py-4 text-lg font-bold">
                  <Link to="/book-demo">Book a Free Strategy Call</Link>
                </Button>
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
                  <h3 className="text-lg font-semibold text-slate-50 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* What We Build Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass rounded-2xl p-8 md:p-12 mb-16"
            >
              <h2 className="text-3xl font-bold text-slate-50 mb-8 text-center">
                What We Build For You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subServices.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + idx * 0.05 }}
                      className="glass rounded-xl p-6 border border-slate-800 hover:border-electric-purple/50 transition-colors"
                    >
                      <Icon className="w-8 h-8 text-neon-cyan mb-4" />
                      <h3 className="text-lg font-semibold text-slate-50 mb-2">{service.name}</h3>
                      <p className="text-sm text-slate-400">{service.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass rounded-2xl p-8 md:p-12 mb-16"
            >
              <h2 className="text-3xl font-bold text-slate-50 mb-8 text-center">
                Why Your Business Needs a Modern Website
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + idx * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-neon-cyan mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass rounded-2xl p-8 md:p-12 mb-16"
            >
              <h2 className="text-3xl font-bold text-slate-50 mb-8 text-center">
                How We Build Your Website
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-electric-purple/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-electric-purple">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-50 mb-2">We Listen</h3>
                  <p className="text-slate-400">
                    We start with a free strategy call to understand your business, your goals, and 
                    what makes you unique.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-neon-cyan/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-neon-cyan">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-50 mb-2">We Build</h3>
                  <p className="text-slate-400">
                    Using modern AI tools, we build your website quickly—without cutting corners on 
                    quality or design.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-electric-purple/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-electric-purple">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-50 mb-2">You Grow</h3>
                  <p className="text-slate-400">
                    Your new website helps you attract more customers, build credibility, and grow 
                    your business.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-center"
            >
              <div className="glass rounded-2xl p-12 border border-electric-purple/30 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-50 mb-4">
                  Ready to Get Your Website?
                </h2>
                <p className="text-xl text-slate-400 mb-8">
                  Let's talk about how we can help you build a modern website that grows your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="glow" size="lg" asChild className="px-8 py-4 text-lg font-bold">
                    <Link to="/book-demo" className="flex items-center gap-2">
                      Get Your Website
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="px-8 py-4 text-lg font-bold">
                    <Link to="/book-demo">Book a Free Strategy Call</Link>
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
