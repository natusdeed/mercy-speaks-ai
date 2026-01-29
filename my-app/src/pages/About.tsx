import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Target,
  Zap,
  Heart,
  Users,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description:
        "We're on a mission to make AI automation accessible to businesses of all sizes, helping them compete and thrive in the digital age.",
    },
    {
      icon: Zap,
      title: "Innovation First",
      description:
        "We stay at the cutting edge of AI technology, continuously improving our solutions to deliver maximum value to our clients.",
    },
    {
      icon: Heart,
      title: "Client Success",
      description:
        "Your success is our success. We measure our performance by the ROI and growth we deliver to your business.",
    },
    {
      icon: Users,
      title: "Partnership Approach",
      description:
        "We don't just provide software—we become an extension of your team, working alongside you to achieve your goals.",
    },
  ];

  const teamStats = [
    { number: "500+", label: "Businesses Automated" },
    { number: "10M+", label: "Calls Handled" },
    { number: "$50M+", label: "Cost Savings Delivered" },
    { number: "99.9%", label: "Uptime Guarantee" },
  ];

  const differentiators = [
    "Based in Richmond, Texas—Houston metro area",
    "Specialized focus on websites for small businesses, local businesses, and churches",
    "Modern AI tools (like Cursor AI) for faster, smarter development",
    "High-quality websites without high agency costs",
    "Simple, business-owner-friendly approach—no tech jargon",
    "Results-driven: we focus on outcomes like more customers and growth",
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="pb-16">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 mb-6">
                <Users className="w-4 h-4 text-neon-cyan" />
                <span className="text-sm text-neon-cyan font-medium">About Us</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 mb-6 title-3d">
                Modern Websites &{" "}
                <span className="bg-gradient-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent">
                  Digital Solutions
                </span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-slate-300 max-w-3xl mx-auto mb-8">
                We're Mercy Speaks Digital—your partner for modern websites and AI-powered tools. 
                Based in Richmond, Texas, we help small businesses, local businesses, and churches 
                build their online presence using smart, modern technology.
              </p>
            </motion.div>

            {/* Company Story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-2xl p-8 md:p-12 mb-16 max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6">Our Story</h2>
              <div className="space-y-6 text-lg md:text-xl text-slate-300 leading-relaxed">
                <p>
                  Founded in the heart of the Houston metro area, Mercy Speaks Digital was born from
                  a simple realization: small businesses, local businesses, and churches deserve 
                  high-quality websites and digital tools without the high agency costs.
                </p>
                <p>
                  We saw a better way. Using modern AI tools like Cursor AI, we can build websites 
                  faster, smarter, and more affordably—delivering professional results that help 
                  businesses compete and grow. We're not just another agency; we're your partners 
                  in building a strong online presence.
                </p>
                <p>
                  Today, we help businesses across industries get modern websites, automate their 
                  phone systems, improve customer service, and streamline operations—all while keeping 
                  costs reasonable and results exceptional. We believe every business, no matter the 
                  size, deserves access to the same quality tools that big companies use.
                </p>
                <p>
                  Our approach is simple: smart, modern, trustworthy, and results-driven. We use 
                  cutting-edge AI tools to work efficiently, but we never forget that behind every 
                  website is a real business owner trying to grow. That's why we focus on outcomes: 
                  more customers, better image, growth, and credibility.
                </p>
              </div>
            </motion.div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
              {values.map((value, idx) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  className="glass rounded-xl p-8 md:p-10 hover:border-electric-purple/50 hover:scale-105 transition-all"
                >
                  <value.icon className="w-8 h-8 text-electric-purple mb-4" />
                  <h3 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-400">{value.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass rounded-2xl p-8 md:p-12 mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-8 text-center">By The Numbers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {teamStats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-base md:text-lg text-slate-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* What Makes Us Different */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass rounded-2xl p-8 md:p-12 mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-8">
                What Makes Us Different
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {differentiators.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 + idx * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-neon-cyan mt-0.5 flex-shrink-0" />
                    <span className="text-lg md:text-xl text-slate-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Location & Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="glass rounded-2xl p-8 md:p-12 mb-16 border border-electric-purple/30"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-8 text-center">
                Located in the Heart of Houston Metro
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <MapPin className="w-10 h-10 text-electric-purple mb-4" />
                  <h3 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-2">Location</h3>
                  <p className="text-lg md:text-xl text-slate-300">
                    Richmond, Texas 77407
                    <br />
                    Houston Metro Area
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Phone className="w-10 h-10 text-neon-cyan mb-4" />
                  <h3 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-2">Phone</h3>
                  <a
                    href="tel:7033325956"
                    className="text-xl md:text-2xl text-slate-300 hover:text-neon-cyan transition-colors"
                  >
                    (703) 332-5956
                  </a>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Mail className="w-10 h-10 text-electric-purple mb-4" />
                  <h3 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-2">Email</h3>
                  <a
                    href="mailto:don@mercyspeaksdigital.com"
                    className="text-xl md:text-2xl text-slate-300 hover:text-neon-cyan transition-colors break-all"
                  >
                    don@mercyspeaksdigital.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="text-center"
            >
              <div className="glass rounded-2xl p-12 border border-electric-purple/30 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
                  Ready to Get Your Website?
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-8">
                  Let's discuss how we can help you build a modern website that grows your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="glow" size="lg" asChild className="px-8 py-4 text-lg font-bold">
                    <Link to="/book-demo">
                      Get Your Website
                      <ArrowRight className="w-5 h-5 ml-2" />
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
