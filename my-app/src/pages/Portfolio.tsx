import { motion } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CaseStudy {
  logo: string;
  business: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: string;
}

export default function Portfolio() {
  const caseStudies: CaseStudy[] = [
    {
      logo: "🔧",
      business: "Martinez HVAC",
      industry: "HVAC & Plumbing",
      challenge: "Missing 40% of after-hours emergency calls, losing $8,000+ monthly in potential revenue. Staff overwhelmed during peak season.",
      solution: "Installed 24/7 AI Phone Receptionist that handles all calls, schedules appointments, and routes emergencies instantly.",
      results: [
        "Captured 100% of after-hours calls",
        "Increased bookings by 180%",
        "Saved $4,200/month in staffing costs",
        "Improved customer satisfaction by 45%",
      ],
      testimonial: "We went from missing calls to capturing every opportunity. The AI handles everything perfectly, and we've seen a massive increase in bookings.",
    },
    {
      logo: "🦷",
      business: "Elite Dental Group",
      industry: "Healthcare & Dental",
      challenge: "High no-show rate (35%), staff spending hours on phone scheduling, missing appointment opportunities.",
      solution: "AI Phone Receptionist + Automated Appointment Reminders that confirm and reschedule appointments automatically.",
      results: [
        "Reduced no-shows by 60%",
        "Freed up 20 hours/week of staff time",
        "Increased appointment bookings by 150%",
        "Improved patient satisfaction scores",
      ],
      testimonial: "Our no-show rate dropped dramatically, and our team can focus on patient care instead of scheduling. Game changer!",
    },
    {
      logo: "🚗",
      business: "Bayou Auto Repair",
      industry: "Auto Repair",
      challenge: "Customers frustrated with long wait times, unable to get quick quotes, losing business to competitors.",
      solution: "AI Phone Receptionist that provides instant quotes, schedules appointments, and answers common questions 24/7.",
      results: [
        "Handled 500+ calls/month automatically",
        "Reduced wait times by 80%",
        "Increased customer retention by 40%",
        "Captured $12,000+ in additional revenue",
      ],
      testimonial: "Customers love the instant service. We're booking more appointments and our team isn't overwhelmed anymore.",
    },
    {
      logo: "⚖️",
      business: "Gulf Coast Legal",
      industry: "Legal Services",
      challenge: "Missing initial consultation requests, leads falling through cracks, unable to respond quickly enough.",
      solution: "AI Phone Receptionist + Website Chatbot that qualifies leads, schedules consultations, and captures all inquiries instantly.",
      results: [
        "Qualified 3x more leads automatically",
        "Increased consultation bookings by 250%",
        "Responded to inquiries in under 30 seconds",
        "Freed up 15 hours/week of admin time",
      ],
      testimonial: "We're capturing every lead now and converting at a much higher rate. The AI handles initial qualification perfectly.",
    },
  ];

  const industries = [
    { icon: "🔧", name: "HVAC & Plumbing" },
    { icon: "🦷", name: "Healthcare & Dental" },
    { icon: "🚗", name: "Auto Repair" },
    { icon: "⚖️", name: "Legal Services" },
    { icon: "🏠", name: "Real Estate" },
    { icon: "💇", name: "Salons & Spas" },
    { icon: "🏋️", name: "Fitness & Gyms" },
    { icon: "🍕", name: "Restaurants" },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="pt-20 md:pt-24 pb-16 md:pb-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Real Results from{" "}
              <span className="bg-gradient-to-r from-electric-purple to-neon-cyan bg-clip-text text-transparent">
                Real Businesses
              </span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-slate-300 max-w-3xl mx-auto">
              See how local businesses transformed their operations and captured thousands in lost revenue with AI automation.
            </p>
          </motion.div>

          {/* Case Studies */}
          <div className="space-y-12 md:space-y-16 mb-16">
            {caseStudies.map((study, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-slate-800/50 border border-electric-purple/20 rounded-2xl overflow-hidden hover:border-electric-purple/40 transition-colors"
              >
                <div className="grid lg:grid-cols-3 gap-8 md:gap-12 p-8 md:p-10 lg:p-12">
                  {/* Left: Business Info */}
                  <div>
                    <div className="text-6xl mb-4">{study.logo}</div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-slate-50">{study.business}</h3>
                    <p className="text-electric-purple font-medium mb-4">{study.industry}</p>

                    <div className="mb-4">
                      <h4 className="font-bold text-red-400 mb-2">❌ Challenge</h4>
                      <p className="text-slate-300 text-sm">{study.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-neon-cyan mb-2">✅ Solution</h4>
                      <p className="text-slate-300 text-sm">{study.solution}</p>
                    </div>
                  </div>

                  {/* Middle: Results */}
                  <div>
                    <h4 className="font-bold mb-4 text-lg text-slate-50">📊 Results</h4>
                    <div className="space-y-3">
                      {study.results.map((result, rIdx) => (
                        <div
                          key={rIdx}
                          className="flex items-start gap-3 bg-slate-900/50 p-3 rounded-lg"
                        >
                          <Check className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                          <span className="text-slate-300">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Testimonial */}
                  <div className="bg-electric-purple/10 border border-electric-purple/30 rounded-xl p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-lg md:text-xl leading-relaxed text-slate-300 italic mb-4">"{study.testimonial}"</p>
                    <Link
                      to="/book-demo"
                      className="inline-flex items-center gap-2 text-electric-purple hover:text-neon-cyan transition-colors font-bold group"
                    >
                      Get Similar Results{" "}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Industries Served */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 md:mt-24 lg:mt-28 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-slate-50">Industries We Serve</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              {industries.map((industry, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-slate-800/50 border border-electric-purple/20 rounded-xl p-4 hover:border-electric-purple/40 transition-colors cursor-pointer group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {industry.icon}
                  </div>
                  <div className="text-sm text-slate-300">{industry.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 md:mt-24 lg:mt-28 text-center bg-gradient-to-r from-electric-purple/20 to-neon-cyan/20 border border-electric-purple/30 rounded-2xl p-8 md:p-12 lg:p-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-50">
              Want Results Like These?
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-6">
              Book a free demo and see how AI can transform your business
            </p>
            <Link
              to="/book-demo"
              className="inline-block bg-gradient-to-r from-electric-purple to-neon-cyan px-12 py-5 rounded-xl font-bold text-xl hover:scale-105 transition-transform text-slate-50"
            >
              Book Your Free Demo
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
