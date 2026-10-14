import { h2, inner, section, divided, smallPrint } from "@/components/home-v3/v3-ui";
import { DAVITA_AUTO_LOGISTICS_URL } from "@/lib/site-config";

/**
 * Selected Website Work — reuses only existing, verified repo material:
 * screenshots in /public/portfolio, descriptions from /results and content/local-pages.ts.
 * Labels follow existing evidence: "Client work" only where the repo states we built the live client site;
 * Davita is marked "Demo build" in /results. No results, metrics, or testimonials are claimed.
 */
type WorkItem = {
  title: string;
  label: "Client work" | "Our own website" | "Demo build";
  description: string;
  href: string;
  linkText: string;
  image: string;
  width: number;
  height: number;
};

const WORK: WorkItem[] = [
  {
    title: "RCCG Shiloh Mega Parish",
    label: "Client work",
    description: "Church website in Sugar Land with service times, ministries, and a guest-friendly mobile experience.",
    href: "https://www.rccgshilohmega.org/",
    linkText: "Visit the live site",
    image: "/portfolio/rccg-shiloh-church-960.webp",
    width: 960,
    height: 442,
  },
  {
    title: "PRIME Global Logistics",
    label: "Client work",
    description:
      "Marketing site for solar supply and Africa logistics with product categories, gallery, FAQs, and a quote flow.",
    href: "https://primeglogistics.com/",
    linkText: "Visit the live site",
    image: "/portfolio/primeglobal-logistics-960.webp",
    width: 960,
    height: 414,
  },
  {
    title: "Davita Auto Logistics",
    label: "Demo build",
    description: "Demo build for a clean-energy logistics brand: solar supply, auto transport, and quote flows.",
    href: DAVITA_AUTO_LOGISTICS_URL,
    linkText: "View the demo build",
    image: "/portfolio/davita-auto-logistics-960.webp",
    width: 960,
    height: 432,
  },
];

export function SelectedWork({ headingId = "work-heading" }: { headingId?: string }) {
  return (
    <section className={`${section} ${divided}`} aria-labelledby={headingId}>
      <div className={inner}>
        <h2 id={headingId} className={`${h2} mb-10`}>
          Selected Website Work
        </h2>
        <ul className="grid gap-12 md:grid-cols-3 md:gap-8">
          {WORK.map((w) => (
            <li key={w.title} className="min-w-0">
              <img
                src={w.image}
                alt={`Homepage of ${w.title}`}
                width={w.width}
                height={w.height}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full rounded-lg border border-slate-800"
              />
              <p className="mt-5 text-sm font-medium text-slate-400">{w.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-white">{w.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-slate-300">{w.description}</p>
              <a
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 items-center rounded font-medium text-slate-100 underline decoration-slate-500 underline-offset-4 hover:decoration-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {w.linkText}
                <span className="sr-only"> for {w.title} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        <p className={`${smallPrint} mt-10`}>Screenshots show each site's homepage at the time of capture.</p>
      </div>
    </section>
  );
}
