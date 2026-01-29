import { motion } from "framer-motion";
import { TrendingUp, Users, Calendar, Star, Phone } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";

const CASE_STUDIES = [
  {
    business: "Martinez HVAC",
    metric: "23 new leads",
    number: 23,
    prefix: "",
    suffix: " new leads",
    timeframe: "month 1",
    icon: TrendingUp,
    color: "electric-purple",
  },
  {
    business: "Elite Dental",
    metric: "$12,400 revenue",
    number: 12400,
    prefix: "$",
    suffix: " revenue",
    timeframe: "first month",
    icon: TrendingUp,
    color: "neon-cyan",
  },
  {
    business: "Chen's Auto",
    metric: "156 calls handled",
    number: 156,
    prefix: "",
    suffix: " calls handled",
    timeframe: "this month",
    icon: Phone,
    color: "electric-purple",
  },
];

export function Proof() {
  return (
    <section className="py-16 md:py-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
      
      <div className="max-w-7xl mx-auto relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            Real Results from Real Businesses
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {CASE_STUDIES.map((study, index) => {
            const Icon = study.icon;
            const { count, ref } = useCountUp({
              end: study.number,
              duration: 2000,
            });

            const formatNumber = (num: number) => {
              if (study.number >= 1000) {
                return num.toLocaleString("en-US");
              }
              return num.toString();
            };

            return (
              <motion.div
                key={study.business}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className={`p-3 rounded-lg w-fit mx-auto mb-4 ${
                  study.color === "electric-purple" 
                    ? "bg-electric-purple/20 text-electric-purple" 
                    : "bg-neon-cyan/20 text-neon-cyan"
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-50 mb-2">{study.business}</h3>
                <p ref={ref} className="text-6xl md:text-7xl font-bold text-neon-cyan mb-1">
                  {study.prefix}{formatNumber(count)}{study.suffix}
                </p>
                <p className="text-sm text-slate-400">in {study.timeframe}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto glass rounded-2xl p-8"
        >
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-electric-purple fill-electric-purple" />
            ))}
          </div>
          <p className="text-lg md:text-xl text-slate-300 mb-4 italic">
            "We were losing 3-4 leads every week after hours. Now our AI handles everything, 
            and we've captured 23 new leads in the first month alone. Best investment we've made."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-purple to-neon-cyan" />
            <div>
              <p className="font-semibold text-slate-50">Carlos Martinez</p>
              <p className="text-sm text-slate-400">Owner, Martinez HVAC</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
