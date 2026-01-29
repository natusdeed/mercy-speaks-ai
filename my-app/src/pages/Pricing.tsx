import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

interface PricingTier {
  name: string;
  price: number;
  description: string;
  employeeCostComparison: string;
  employeeHoursEquivalent: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaHref: string;
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: 197,
    description: "Perfect for small businesses getting started with AI automation",
    employeeCostComparison: "$3,646/month",
    employeeHoursEquivalent: "Less than 1 hour of employee wages",
    features: [
      "AI Phone Receptionist (24/7)",
      "Up to 500 calls/month",
      "Basic appointment scheduling",
      "Lead capture & qualification",
      "Email notifications",
      "Basic CRM integration",
      "48-hour setup",
      "Email support",
    ],
    ctaText: "Start Free Trial",
    ctaHref: "/contact",
  },
  {
    name: "Professional",
    price: 397,
    description: "For growing businesses that need advanced automation",
    employeeCostComparison: "$3,646/month",
    employeeHoursEquivalent: "Less than 2 hours of employee wages",
    features: [
      "Everything in Starter",
      "Up to 1,500 calls/month",
      "Advanced appointment scheduling",
      "Multi-language support",
      "Custom AI training",
      "Advanced CRM integration",
      "SMS notifications",
      "Priority support",
      "Custom workflows",
      "Analytics dashboard",
    ],
    popular: true,
    ctaText: "Get Started",
    ctaHref: "/contact",
  },
  {
    name: "Enterprise",
    price: 797,
    description: "For established businesses with high call volumes",
    employeeCostComparison: "$3,646/month",
    employeeHoursEquivalent: "Less than 4 hours of employee wages",
    features: [
      "Everything in Professional",
      "Unlimited calls/month",
      "Dedicated AI agent",
      "White-label options",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "24/7 phone support",
      "Advanced analytics & reporting",
      "Custom AI model training",
      "Multi-location support",
      "SLA guarantees",
    ],
    ctaText: "Contact Sales",
    ctaHref: "/contact",
  },
];

const calculateEmployeeCost = (price: number, employeeCosts: { monthly: number; hourly: number }): { monthly: number; hourly: number } => {
  const equivalentHours = price / employeeCosts.hourly;
  return {
    monthly: employeeCosts.monthly,
    hourly: equivalentHours,
  };
};

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const employeeCosts = {
    salary: 35000,
    benefits: 8750,
    totalAnnual: 43750,
    monthly: 3646,
    hourly: 21,
  };

  const getPrice = (basePrice: number) => {
    if (billingCycle === 'monthly') {
      return basePrice;
    }
    if (basePrice === 197) return 1970;
    return Math.round(basePrice * 12 * 0.83);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="pb-16">
        <section className="py-16 md:py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800/50 mb-6">
              <DollarSign className="w-4 h-4 text-neon-cyan" />
              <span className="text-sm text-slate-300 font-medium">
                Transparent Pricing • No Hidden Fees
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 mb-6 title-3d">
              Simple Pricing That{" "}
              <span className="bg-gradient-to-r from-electric-purple via-neon-cyan to-electric-purple bg-clip-text text-transparent">
                Beats Hiring
              </span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-8">
              Starting at <span className="text-neon-cyan font-bold text-2xl">$197/month</span>{" "}
              — Less than 1 hour of employee wages
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50"
                    : "bg-slate-900/50 text-slate-400 border border-slate-800/50 hover:border-slate-700"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-lg font-medium transition-all relative ${
                  billingCycle === "yearly"
                    ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50"
                    : "bg-slate-900/50 text-slate-400 border border-slate-800/50 hover:border-slate-700"
                }`}
              >
                Yearly
                {billingCycle === "yearly" && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-electric-purple to-neon-cyan text-xs font-bold text-slate-950">
                    Save 17%
                  </span>
                )}
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-neon-cyan" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-neon-cyan" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-neon-cyan" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="max-w-2xl mx-auto mb-28 md:mb-36"
          >
            <div className="glass rounded-2xl p-8 flex flex-col relative overflow-hidden group border-2 border-neon-cyan/30 shadow-lg shadow-neon-cyan/20">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 via-electric-purple/20 to-neon-cyan/20 opacity-50 group-hover:opacity-75 transition-opacity" />
              
              <div className="relative z-10 flex flex-col">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/20 border border-neon-cyan/40 w-fit mb-4">
                  <Globe className="w-4 h-4 text-neon-cyan" />
                  <span className="text-sm text-neon-cyan font-semibold">
                    One-Time Service
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-slate-50 mb-2">AI-Powered Website Design</h3>
                <p className="text-slate-400 mb-6">
                  Modern websites for small businesses, local businesses, and churches
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl md:text-7xl font-bold text-slate-50">$997</span>
                    <span className="text-slate-300 text-lg md:text-xl">one-time</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    Starting price • Custom pricing available for larger projects
                  </p>
                </div>

                <div className="mb-6 p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                  <div className="text-sm font-semibold text-slate-300 mb-3">
                    What's Included:
                  </div>
                  <div className="space-y-2">
                    {[
                      "Modern, mobile-friendly design",
                      "Built fast using AI technology",
                      "SEO-optimized for search engines",
                      "Designed to convert visitors to customers",
                      "Fast setup in 48 hours",
                      "Ongoing support available",
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="glow" size="lg" className="w-full" asChild>
                  <Link to="/services/website-design">
                    Get Your Website
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="h-16 md:h-24" aria-hidden="true" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto mb-16">
            {PRICING_TIERS.map((tier, index) => {
              const price = getPrice(tier.price);
              const employeeCost = calculateEmployeeCost(price, {
                monthly: employeeCosts.monthly,
                hourly: employeeCosts.hourly,
              });
              const savings = employeeCost.monthly - price;
              const savingsPercentage = ((savings / employeeCost.monthly) * 100).toFixed(0);

              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`glass rounded-2xl p-8 md:p-10 flex flex-col relative overflow-visible group hover:scale-105 transition-transform ${
                    tier.popular
                      ? "border-2 border-electric-purple/50 shadow-lg shadow-electric-purple/20"
                      : "border border-slate-800/50"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute top-2 right-2 z-20 bg-gradient-to-r from-electric-purple to-neon-cyan text-slate-950 text-xs font-bold px-4 py-1.5 rounded-bl-lg rounded-tr-2xl">
                      MOST POPULAR
                    </div>
                  )}

                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    tier.popular
                      ? "from-electric-purple/20 via-neon-cyan/20 to-electric-purple/20"
                      : "from-slate-900/50 to-slate-900/30"
                  } opacity-50 group-hover:opacity-75 transition-opacity`} />

                  <div className="relative z-10 flex flex-col h-full">
                    {tier.popular && <div className="h-14 flex-shrink-0" />}
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-50 mb-2">{tier.name}</h3>
                    <p className="text-slate-400 text-sm mb-6">{tier.description}</p>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl md:text-7xl font-bold text-slate-50">${price}</span>
                        <span className="text-slate-300 text-lg md:text-xl">/{billingCycle === "monthly" ? "month" : "year"}</span>
                      </div>
                      {billingCycle === "yearly" && (
                        <div className="mt-2">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-electric-purple/20 to-neon-cyan/20 border border-electric-purple/30 text-sm font-semibold text-electric-purple">
                            Save 17%
                          </span>
                          <div className="text-xs text-slate-500 mt-1">
                            ${Math.round(price / 12)}/month when billed annually
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mb-6 p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-neon-cyan" />
                        <span className="text-xs text-slate-400 uppercase tracking-wide">
                          vs. Employee Cost
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-300">Employee Cost:</span>
                          <span className="text-sm font-semibold text-slate-400 line-through">
                            {tier.employeeCostComparison}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-300">You Pay:</span>
                          <span className="text-lg font-bold text-neon-cyan">
                            ${price}/{billingCycle === "monthly" ? "month" : "year"}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-slate-800/50 mt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-50">
                              You Save:
                            </span>
                            <span className="text-lg font-bold text-electric-purple">
                              ${savings.toLocaleString()}/month
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            {savingsPercentage}% less than hiring • Less than {Math.round(employeeCost.hourly * 10) / 10} hours of employee wages
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant={tier.popular ? "glow" : "outline"}
                      size="lg"
                      className="w-full mb-6"
                      asChild
                    >
                      <Link to={tier.ctaHref}>
                        {tier.ctaText}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>

                    <div className="flex-1 space-y-3">
                      <div className="text-sm font-semibold text-slate-300 mb-4">
                        Everything included:
                      </div>
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-5xl mx-auto mb-16"
          >
            <div className="glass rounded-2xl p-8 border border-slate-800/50">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6 text-center">
                AI Receptionist vs. Human Employee
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800/50">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-300">
                        Feature
                      </th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-neon-cyan">
                        AI Receptionist
                      </th>
                      <th className="text-center py-4 px-4 text-sm font-semibold text-slate-400">
                        Human Employee
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        feature: "Monthly Cost",
                        ai: "Starting at $197",
                        human: `$${employeeCosts.monthly.toLocaleString()}+ (wages + benefits)`,
                      },
                      {
                        feature: "Availability",
                        ai: "24/7/365",
                        human: "40 hours/week",
                      },
                      {
                        feature: "Response Time",
                        ai: "Instant",
                        human: "Varies",
                      },
                      {
                        feature: "Sick Days / Time Off",
                        ai: "Never",
                        human: "Yes (PTO, sick days)",
                      },
                      {
                        feature: "Training Time",
                        ai: "48 hours",
                        human: "Weeks to months",
                      },
                      {
                        feature: "Scalability",
                        ai: "Instant scaling",
                        human: "Hiring process required",
                      },
                      {
                        feature: "Consistency",
                        ai: "100% consistent",
                        human: "Varies by person",
                      },
                      {
                        feature: "Multilingual",
                        ai: "Yes (unlimited languages)",
                        human: "Limited",
                      },
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-slate-800/30 hover:bg-slate-900/30 transition-colors"
                      >
                        <td className="py-4 px-4 text-sm text-slate-300">{row.feature}</td>
                        <td className="py-4 px-4 text-sm text-center text-neon-cyan font-medium">
                          {row.ai}
                        </td>
                        <td className="py-4 px-4 text-sm text-center text-slate-400">
                          {row.human}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Can I change plans later?",
                  a: "Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect on your next billing cycle.",
                },
                {
                  q: "What happens if I exceed my call limit?",
                  a: "We'll notify you before you reach your limit. You can upgrade your plan or purchase additional call credits.",
                },
                {
                  q: "Do you offer refunds?",
                  a: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment.",
                },
                {
                  q: "How long does setup take?",
                  a: "Most businesses are up and running within 48 hours. We handle all the technical setup for you.",
                },
                {
                  q: "Can I use this for multiple locations?",
                  a: "Yes! The Enterprise plan includes multi-location support. Contact us for custom pricing.",
                },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
                  className="glass rounded-xl p-8 md:p-10 border border-slate-800/50"
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-slate-50 mb-2">{faq.q}</h3>
                  <p className="text-lg md:text-xl leading-relaxed text-slate-300">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="glass rounded-2xl p-12 border border-electric-purple/30 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
                Ready to Save Thousands Per Month?
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-8">
                Start your free trial today. No credit card required.
              </p>
              <Button variant="glow" size="lg" asChild className="px-8 py-4 text-lg font-bold">
                <Link to="/contact">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
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
