import { Link } from "react-router-dom";
import { BUSINESS, telHref } from "@/lib/site-config";
import { MAILING_ADDRESS } from "@/components/home-v3/v3-ui";

/** Site-wide footer. Mailing address is display-only (never used in schema). */
const GROUPS = [
  {
    title: "Services",
    links: [
      { name: "Conversion Websites", href: "/websites" },
      { name: "Website Care & Optimization", href: "/website-care" },
      { name: "AI Receptionist — Pilot", href: "/ai-pilot" },
      { name: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Home", href: "/" },
      { name: "Our Work", href: "/results" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Industries we serve", href: "/industries" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
] as const;

const linkCls =
  "inline-flex min-h-11 items-center [overflow-wrap:anywhere] text-slate-300 underline-offset-4 hover:text-slate-50 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 rounded";

export function HomeFooterV3() {
  return (
    <footer id="site-footer" className="border-t border-slate-800 bg-slate-950 px-5 py-14 sm:px-8">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="min-w-0">
          <p className="flex items-center gap-2.5 text-base font-semibold text-white">
            <img src="/brand/logo-mark-96.webp" alt="" width={26} height={32} className="h-8 w-auto" />
            Mercy Speaks Digital
          </p>
          <address className="mt-4 space-y-2 not-italic text-base text-slate-300">
            <p>
              <span className="text-slate-400">Phone: </span>
              <a href={telHref()} className={linkCls}>
                {BUSINESS.phoneDisplay}
              </a>
            </p>
            <p>
              <span className="text-slate-400">Email: </span>
              <a href={`mailto:${BUSINESS.email}`} className={linkCls}>
                {BUSINESS.email}
              </a>
            </p>
            <p>
              <span className="text-slate-400">Mailing address: </span>
              {MAILING_ADDRESS}
            </p>
          </address>
        </div>
        {GROUPS.map((g) => (
          <nav key={g.title} aria-label={`Footer: ${g.title}`} className="min-w-0">
            <p className="text-sm font-medium text-slate-400">{g.title}</p>
            <ul className="mt-2">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className={linkCls}>
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-5xl text-sm text-slate-400">© 2026 Mercy Speaks Digital. All rights reserved.</p>
    </footer>
  );
}
