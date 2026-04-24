import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Megaphone, SlidersHorizontal, Cookie, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, organizationSchema, webPageSchema } from "@/lib/schema";

const cookieCategories = [
  {
    title: "Necessary (always active)",
    icon: ShieldCheck,
    accent: "text-neon-cyan",
    border: "border-neon-cyan/30",
    points: [
      "Session management",
      "Security tokens",
      "Cookie consent preference storage",
      "Cannot be disabled",
    ],
  },
  {
    title: "Analytics (requires consent)",
    icon: BarChart3,
    accent: "text-electric-purple",
    border: "border-electric-purple/30",
    points: [
      "Google Analytics tracks page views, session duration, and traffic sources",
      "Helps us understand how visitors use our site",
      "Data is anonymized",
    ],
  },
  {
    title: "Marketing (requires consent)",
    icon: Megaphone,
    accent: "text-neon-cyan",
    border: "border-neon-cyan/30",
    points: [
      "Meta Pixel (Facebook/Instagram ads)",
      "Google Ads conversion tracking",
      "Used to measure ad performance and support retargeting",
    ],
  },
  {
    title: "Functional (requires consent)",
    icon: SlidersHorizontal,
    accent: "text-electric-purple",
    border: "border-electric-purple/30",
    points: [
      "Chatbot session context",
      "User interface preferences",
      "Language and region settings",
    ],
  },
];

const thirdParties = [
  "Google Analytics (Google LLC)",
  "Meta Pixel (Meta Platforms Inc)",
  "Twilio (communications infrastructure)",
  "Vercel (hosting and performance)",
];

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-slate-950">
      <SeoHead
        title="Cookie Policy | Mercy Speaks Digital LLC"
        description="Cookie policy for Mercy Speaks Digital LLC, including cookie categories, third-party providers, and visitor controls."
        path="/cookie-policy"
      />
      <JsonLd
        data={[
          organizationSchema(),
          webPageSchema({
            name: "Cookie Policy",
            description:
              "Cookie policy for Mercy Speaks Digital LLC, including what cookies we use and how visitors can control them.",
            path: "/cookie-policy",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Cookie Policy", path: "/cookie-policy" },
          ]),
        ]}
      />

      <main className="pb-16">
        <section className="py-16 md:py-24 px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 mb-6">
                <Cookie className="w-4 h-4 text-neon-cyan" />
                <span className="text-sm text-neon-cyan font-medium">Legal</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-50 mb-4 title-3d">
                Cookie{" "}
                <span className="bg-linear-to-r from-neon-cyan to-electric-purple bg-clip-text text-transparent">
                  Policy
                </span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto">
                Mercy Speaks Digital LLC - Houston, Texas
              </p>
            </motion.div>

            <div className="space-y-8">
              <section className="glass rounded-2xl p-6 md:p-8 border border-slate-800/50">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-4">1. Introduction</h2>
                <div className="space-y-3 text-slate-300 leading-relaxed">
                  <p>
                    Mercy Speaks Digital LLC operates{" "}
                    <a
                      href="https://mercyspeaksdigital.com"
                      className="text-neon-cyan hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      mercyspeaksdigital.com
                    </a>
                    .
                  </p>
                  <p>
                    This Cookie Policy explains what cookies are, what cookies we use, and how you can control
                    cookie preferences while using our website.
                  </p>
                  <p>
                    <span className="font-semibold text-slate-200">Effective date:</span> April 2026.
                  </p>
                </div>
              </section>

              <section className="glass rounded-2xl p-6 md:p-8 border border-slate-800/50">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-4">2. What Are Cookies</h2>
                <p className="text-slate-300 leading-relaxed">
                  Cookies are small text files stored on your device when you visit a website. They help websites
                  remember your actions and preferences (such as login state, settings, and analytics choices) to
                  improve performance, security, and your overall browsing experience.
                </p>
              </section>

              <section className="glass rounded-2xl p-6 md:p-8 border border-slate-800/50">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-6">
                  3. Categories of Cookies We Use
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {cookieCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <article
                        key={category.title}
                        className={`rounded-xl border ${category.border} bg-slate-900/40 p-5`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <Icon className={`w-5 h-5 mt-0.5 ${category.accent}`} />
                          <h3 className="text-lg font-semibold text-slate-100">{category.title}</h3>
                        </div>
                        <ul className="space-y-2 text-slate-300 text-sm leading-relaxed">
                          {category.points.map((point) => (
                            <li key={point} className="flex gap-2">
                              <span className="text-slate-500">-</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    );
                  })}
                </div>
              </section>

              <section className="glass rounded-2xl p-6 md:p-8 border border-slate-800/50">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-4">4. How We Use Cookies</h2>
                <ul className="space-y-2 text-slate-300 leading-relaxed">
                  <li>- Improve site performance</li>
                  <li>- Understand visitor behavior</li>
                  <li>- Measure marketing campaign effectiveness</li>
                  <li>- Personalize your browsing experience</li>
                </ul>
              </section>

              <section className="glass rounded-2xl p-6 md:p-8 border border-slate-800/50">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-4">5. Third Party Cookies</h2>
                <ul className="space-y-2 text-slate-300 leading-relaxed">
                  {thirdParties.map((provider) => (
                    <li key={provider}>- {provider}</li>
                  ))}
                </ul>
              </section>

              <section className="glass rounded-2xl p-6 md:p-8 border border-slate-800/50">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-4">6. Your Cookie Choices</h2>
                <div className="space-y-3 text-slate-300 leading-relaxed">
                  <p>
                    You can manage cookie preferences through our consent banner. Necessary cookies remain active,
                    while optional categories (analytics, marketing, and functional) are enabled only with consent.
                  </p>
                  <p>
                    You can also clear or block cookies through your browser settings at any time. Blocking some
                    cookies may impact parts of the website experience.
                  </p>
                  <p>
                    To update your choices later, use the cookie preferences link in the banner located at the bottom
                    of the page.
                  </p>
                </div>
              </section>

              <section className="glass rounded-2xl p-6 md:p-8 border border-slate-800/50">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-4">7. Contact Us</h2>
                <div className="space-y-2 text-slate-300 leading-relaxed">
                  <p>Mercy Speaks Digital LLC</p>
                  <p>Houston, Texas</p>
                  <p>
                    <Link to="/contact" className="inline-flex items-center gap-2 text-neon-cyan hover:underline">
                      <Mail className="w-4 h-4" />
                      mercyspeaksdigital.com/contact
                    </Link>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
