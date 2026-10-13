import { Link } from "react-router-dom";
import { BUSINESS, telHref } from "@/lib/site-config";

/** Homepage V3 footer (CEO-locked copy). Mailing address is footer-only — never used in schema. */
const LINKS = [
  { name: "Websites", href: "/websites" },
  { name: "Website Care", href: "/website-care" },
  { name: "AI Pilot", href: "/ai-pilot" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
] as const;

const linkCls =
  "inline-flex min-h-11 min-w-11 items-center text-slate-300 underline-offset-4 hover:text-slate-50 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 rounded";

export function HomeFooterV3() {
  return (
    <footer id="site-footer" className="border-t border-slate-800 bg-slate-950 px-5 py-14 sm:px-8">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <p className="text-base font-semibold text-white">Mercy Speaks Digital</p>
          <address className="mt-4 space-y-2 not-italic text-base text-slate-300">
            <p>
              <span className="text-slate-400">Mailing address: </span>
              Mercy Speaks Digital, 5554 S Peek Road, PMB #2144, Katy, TX 77450
            </p>
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
          </address>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className={linkCls}>
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-5xl text-sm text-slate-400">© 2026 Mercy Speaks Digital. All rights reserved.</p>
    </footer>
  );
}
