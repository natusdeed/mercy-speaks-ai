import { Link } from "react-router-dom";
import { SERVICES } from "@/content/offers";
import { divided, h2, inner, section } from "@/components/home-v3/v3-ui";

const linkCls =
  "mt-5 inline-flex min-h-11 items-center rounded font-medium text-slate-100 underline decoration-slate-500 underline-offset-4 hover:decoration-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

/** The three services, websites first (shared by Home and /services). */
export function ServiceSummaries({
  headingId = "services-heading",
  title = "What we do",
  headingLevel = 2,
}: {
  headingId?: string;
  title?: string;
  headingLevel?: 2 | 3;
}) {
  return (
    <section className={`${section} ${divided}`} aria-labelledby={headingId}>
      <div className={inner}>
        <h2 id={headingId} className={`${h2} mb-10`}>
          {title}
        </h2>
        <ul className="grid grid-cols-1 divide-y divide-slate-800 border-y border-slate-800 md:grid-cols-3 md:divide-x md:divide-y-0">
          {SERVICES.map((s) => {
            const H = headingLevel === 2 ? "h3" : "h4";
            return (
              <li key={s.key} className="flex flex-col py-8 md:px-8 md:first:pl-0 md:last:pr-0">
                <H className="text-lg font-semibold text-white">{s.name}</H>
                <p className="mt-1 text-sm font-medium text-violet-300">{s.priceNote}</p>
                <p className="mt-4 flex-1 text-base leading-relaxed text-slate-300">{s.summary}</p>
                <div>
                  <Link to={s.href} className={linkCls}>
                    {s.cta}
                    <span className="sr-only">: {s.name}</span>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
