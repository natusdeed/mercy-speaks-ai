import { Star, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface Testimonial {
  id: number;
  name: string;
  business: string;
  businessType: string;
  quote: string;
  rating: number;
  result: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Maria Rodriguez",
    business: "Rodriguez Law Firm",
    businessType: "Legal Services",
    quote: "We were losing 15-20 potential clients per month to missed calls after hours. Since implementing the AI receptionist, we've captured every single call and converted 8 new clients in the first month alone. That's $24,000 in new revenue we would have lost.",
    rating: 5,
    result: "$24K new revenue in first month",
  },
  {
    id: 2,
    name: "James Chen",
    business: "Chen's Auto Repair",
    businessType: "Automotive Services",
    quote: "The AI handles all our appointment scheduling, sends reminders, and even follows up on service completion. We've reduced no-shows by 40% and our receptionist can focus on in-person customers. Best $197 we spend every month.",
    rating: 5,
    result: "40% reduction in no-shows",
  },
  {
    id: 3,
    name: "Sarah Martinez",
    business: "Martinez HVAC Solutions",
    businessType: "HVAC Services",
    quote: "Our AI agent answers emergency calls at 2 AM, qualifies leads, and books service calls automatically. We've increased our emergency service bookings by 60% and never miss a hot lead. The ROI was immediate.",
    rating: 5,
    result: "60% increase in emergency bookings",
  },
];

export function Testimonials() {
  useScrollAnimation({ threshold: 0.1, rootMargin: "-50px", once: true });

  return (
    <section className="section relative overflow-hidden">
      <div className="section-inner relative z-10">
        <div
          data-animate
          className="text-center mb-8 opacity-0"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 mb-4">
            <Quote className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-slate-300 font-medium">
              Real Results from Real Businesses
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            Don't Just Take Our Word For It
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-slate-300 max-w-2xl mx-auto">
            See how Houston businesses are using AI automation to capture more leads and grow revenue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={testimonial.id}
              data-animate
              className="card flex flex-col relative overflow-hidden group opacity-0"
              style={{
                '--delay': `${index * 100}ms`,
                willChange: 'opacity, transform',
              } as React.CSSProperties}
            >
              <div className="relative z-10 flex flex-col h-full">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-electric-purple fill-electric-purple"
                    />
                  ))}
                </div>

                {/* Quote */}
                <div className="flex-1 mb-4">
                  <p className="text-slate-300 leading-relaxed text-lg md:text-xl italic">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Result Badge */}
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-cyan/10">
                    <span className="text-sm font-semibold text-neon-cyan">
                      {testimonial.result}
                    </span>
                  </div>
                </div>

                {/* Author Info */}
                <div className="pt-4">
                  <p className="text-slate-50 font-semibold text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {testimonial.business}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    {testimonial.businessType}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
