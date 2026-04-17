import { motion } from "framer-motion";
import { TrendingUp, Star, Phone } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";

const CASE_STUDIES = [
  {
    business: "Martinez HVAC",
    number: 6800,
    prefix: "$",
    suffix: "",
    suffixAfterNumber: " in recovered jobs",
    contextLine: "Peak season · every after-hours call captured",
    icon: TrendingUp,
    color: "electric-purple" as const,
  },
  {
    business: "Elite Dental",
    number: 80,
    prefix: "",
    suffix: "%",
    suffixAfterNumber: " missed consultations reduced",
    contextLine: "~$4,200/mo potential revenue recovered",
    icon: TrendingUp,
    color: "neon-cyan" as const,
  },
  {
    business: "Chen's Auto",
    number: 12,
    prefix: "",
    suffix: "",
    suffixAfterNumber: " extra appointments",
    contextLine: "First 30 days · 100% of after-hours calls answered",
    icon: Phone,
    color: "electric-purple" as const,
  },
];

function formatAnimatedNumber(num: number, studyNumber: number) {
  if (studyNumber >= 1000) {
    return num.toLocaleString("en-US");
  }
  return num.toString();
}

function ProofMetricCard({
  study,
  index,
}: {
  study: (typeof CASE_STUDIES)[number];
  index: number;
}) {
  const Icon = study.icon;
  const { count, ref } = useCountUp({
    end: study.number,
    duration: 2000,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card text-center"
    >
      <div
        className={`p-3 rounded-lg w-fit mx-auto mb-4 ${
          study.color === "electric-purple"
            ? "bg-electric-purple/20 text-electric-purple"
            : "bg-neon-cyan/20 text-neon-cyan"
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-slate-50 mb-2">{study.business}</h3>
      <p ref={ref} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neon-cyan mb-1 leading-tight wrap-break-word px-1">
        {study.prefix}
        {formatAnimatedNumber(count, study.number)}
        {study.suffix}
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{study.suffixAfterNumber}</span>
      </p>
      <p className="text-sm text-slate-400 px-2">{study.contextLine}</p>
    </motion.div>
  );
}

export function Proof() {
  return (
    <section className="section relative overflow-hidden">
      <div className="section-inner relative z-10 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-3">
            Real Results from Real Businesses
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-8">
          {CASE_STUDIES.map((study, index) => (
            <ProofMetricCard key={study.business} study={study} index={index} />
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto card"
        >
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-electric-purple fill-electric-purple" />
            ))}
          </div>
          <p className="text-lg md:text-xl text-slate-300 mb-4 italic">
            &ldquo;Peak season used to mean missed emergency calls. Now we capture every after-hours call and we&apos;ve
            added $6,800 in recovered jobs—best investment we&apos;ve made.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-700" />
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
