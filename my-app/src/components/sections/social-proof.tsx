import { motion } from "framer-motion";
import { Users, Building2 } from "lucide-react";

export function SocialProof() {
  return (
    <section className="py-16 md:py-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/5 via-transparent to-neon-cyan/5" />
      
      <div className="max-w-7xl mx-auto relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-electric-purple/20 via-neon-cyan/20 to-electric-purple/20 border border-electric-purple/40 backdrop-blur-sm mb-4">
            <Users className="w-5 h-5 text-neon-cyan" />
            <span className="text-base text-slate-300 font-medium">
              Trusted by <span className="text-neon-cyan font-bold text-lg">47+ Houston Businesses</span>
            </span>
          </div>
        </motion.div>

        {/* Logo Cloud / Testimonial Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center justify-center p-6 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-electric-purple/50 transition-all"
            >
              <Building2 className="w-12 h-12 text-slate-600" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
