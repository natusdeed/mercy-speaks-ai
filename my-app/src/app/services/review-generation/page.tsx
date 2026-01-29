import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Star,
  Zap,
  CheckCircle2,
  MessageSquare,
  TrendingUp,
  Shield,
  BarChart3,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ReviewGenerationPage() {
  const features = [
    {
      icon: Zap,
      title: "Automated Requests",
      description: "Automatically request reviews from satisfied customers at the perfect moment.",
    },
    {
      icon: MessageSquare,
      title: "Multi-Platform",
      description: "Generate reviews on Google, Yelp, Facebook, and industry-specific platforms.",
    },
    {
      icon: Shield,
      title: "Compliant & Ethical",
      description: "100% compliant with platform policies—authentic reviews from real customers.",
    },
    {
      icon: TrendingUp,
      title: "Increased Ratings",
      description: "See significant increases in your average rating and total review count.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track review generation rates, response rates, and review quality over time.",
    },
    {
      icon: Mail,
      title: "Smart Follow-up",
      description: "Intelligent follow-up sequences that maximize response rates without being annoying.",
    },
  ];

  const capabilities = [
    "Automatically request reviews after positive interactions",
    "Send review requests via SMS, email, or in-app messages",
    "Generate reviews on Google Business Profile",
    "Collect reviews on Yelp, Facebook, and other platforms",
    "Track review generation rates and response metrics",
    "Integrate with CRM and customer management systems",
    "Set up custom timing rules for optimal request timing",
    "Handle review responses and follow-up communications",
    "Monitor and respond to new reviews automatically",
    "Generate reports on review performance and trends",
  ];

  const benefits = [
    {
      stat: "5x",
      description: "More reviews generated",
    },
    {
      stat: "85%",
      description: "Response rate",
    },
    {
      stat: "30 min",
      description: "Setup time",
    },
    {
      stat: "100%",
      description: "Compliant & ethical",
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
                <Star className="w-4 h-4 text-neon-cyan" />
                <span className="text-sm text-neon-cyan font-medium">Review Generation</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 mb-6 title-3d">
                Automated{" "}
                <span className="bg-gradient-to-r from-neon-cyan to-electric-purple bg-clip-text text-transparent">
                  Review Generation
                </span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-slate-300 max-w-3xl mx-auto mb-8">
                Turn satisfied customers into valuable reviews automatically. Generate 5x more
                reviews while staying 100% compliant with platform policies.
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
                Complete Review Management
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

            {/* Why Reviews Matter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="glass rounded-2xl p-8 md:p-12 mb-16 border border-neon-cyan/30"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-8 text-center">
                Why Reviews Matter
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Higher Rankings",
                    description: "More reviews = better search rankings and increased visibility",
                  },
                  {
                    title: "More Trust",
                    description: "93% of consumers read reviews before making a purchase decision",
                  },
                  {
                    title: "More Revenue",
                    description: "Businesses with more reviews see 54% more revenue on average",
                  },
                ].map((point, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + idx * 0.1 }}
                    className="p-6 rounded-xl bg-slate-900/50 border border-slate-800/50 text-center"
                  >
                    <h3 className="text-lg font-semibold text-slate-50 mb-2">{point.title}</h3>
                    <p className="text-sm text-slate-400">{point.description}</p>
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
                  Ready to Generate More Reviews?
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-8">
                  Start automatically collecting reviews from satisfied customers today.
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