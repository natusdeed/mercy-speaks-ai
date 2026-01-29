import { Phone, Zap, Database, CheckCircle2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Link } from "react-router-dom";

interface Service {
  name: string;
  description: string;
  price: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  popular?: boolean;
}

const SERVICES: Service[] = [
  {
    name: "AI-Powered Website Design",
    description: "Modern websites for small businesses, local businesses, and churches",
    price: "Starting at $997",
    features: [
      "Modern, mobile-friendly design",
      "Built fast using AI",
      "SEO-ready",
      "Designed to convert",
    ],
    icon: <Globe className="w-6 h-6" />,
    color: "electric-purple",
    popular: true,
  },
  {
    name: "Voice AI Agents",
    description: "24/7 AI receptionist that never misses a call",
    price: "$197/month",
    features: [
      "24/7 call handling",
      "Natural conversations",
      "Appointment booking",
      "Lead qualification",
    ],
    icon: <Phone className="w-6 h-6" />,
    color: "neon-cyan",
  },
  {
    name: "Workflow Automation",
    description: "Automate repetitive tasks and workflows",
    price: "$297/month",
    features: [
      "Custom automations",
      "Multi-step workflows",
      "System integrations",
      "Analytics dashboard",
    ],
    icon: <Zap className="w-6 h-6" />,
    color: "electric-purple",
  },
];

export function TheSolution() {
  useScrollAnimation({ threshold: 0.1, rootMargin: "-50px", once: true });

  return (
    <section className="py-16 md:py-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/1 via-transparent to-neon-cyan/1" />
      
      <div className="max-w-7xl mx-auto relative z-10 pt-16">
        <div
          data-animate
          className="text-center mb-12 opacity-0"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            The Solution
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Enterprise-grade AI automation at small business prices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {SERVICES.map((service, index) => (
            <div
              key={service.name}
              data-animate
              className={cn(
                "glass rounded-2xl p-6 flex flex-col relative overflow-hidden opacity-0",
                service.popular && "border-2 border-electric-purple/50"
              )}
              style={{
                '--delay': `${index * 100}ms`,
                willChange: 'opacity, transform',
              } as React.CSSProperties}
            >
              {service.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-electric-purple/20 border border-electric-purple/50">
                  <span className="text-xs font-semibold text-electric-purple">Most Popular</span>
                </div>
              )}

              <div className={cn(
                "p-3 rounded-lg w-fit mb-4",
                service.color === "electric-purple" ? "bg-electric-purple/20" : "bg-neon-cyan/20"
              )}>
                <div className={cn(
                  service.color === "electric-purple" ? "text-electric-purple" : "text-neon-cyan"
                )}>
                  {service.icon}
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-slate-50 mb-2">{service.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{service.description}</p>

              <div className="mb-6">
                <div className="text-3xl font-bold text-slate-50 mb-1">{service.price}</div>
                <div className="text-xs text-slate-500">per month</div>
              </div>

              <ul className="flex-1 space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className={cn(
                      "w-4 h-4 flex-shrink-0",
                      service.color === "electric-purple" ? "text-electric-purple" : "text-neon-cyan"
                    )} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={service.popular ? "glow" : "outline"}
                className="w-full px-8 py-4 text-lg font-bold"
                asChild
              >
                <Link to={service.name === "AI-Powered Website Design" ? "/services/website-design" : "/book-demo"}>
                  {service.name === "AI-Powered Website Design" ? "Get Your Website" : "Get Started"}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
