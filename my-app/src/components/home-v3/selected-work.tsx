import { h2, inner, section, divided, smallPrint } from "@/components/home-v3/v3-ui";
import { VERIFIED_WORK as WORK } from "@/content/verified-work";

const linkCls =
  "mt-4 inline-flex min-h-11 items-center rounded font-medium text-slate-100 underline decoration-slate-500 underline-offset-4 hover:decoration-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

/**
 * Shared portfolio section — every page that shows work uses this (source: content/verified-work.ts).
 * "detailed" shows business need, what we built and verified features; "compact" shows the summary only.
 */
export function SelectedWork({
  headingId = "work-heading",
  title = "Selected website work",
  intro,
  variant = "detailed",
  bordered = true,
}: {
  headingId?: string;
  title?: string;
  intro?: string;
  variant?: "detailed" | "compact";
  bordered?: boolean;
}) {
  return (
    <section className={`${section} ${bordered ? divided : ""}`} aria-labelledby={headingId}>
      <div className={inner}>
        <h2 id={headingId} className={h2}>
          {title}
        </h2>
        {intro && <p className="mx-0 mt-4 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">{intro}</p>}
        {variant === "compact" ? (
          <ul className="mt-10 grid gap-12 md:grid-cols-2 md:gap-8">
            {WORK.map((w) => (
              <li key={w.title} className="min-w-0">
                <WorkImage w={w} />
                <p className="mt-5 text-sm font-medium text-violet-300">{w.label}</p>
                <h3 className="mt-1 text-lg font-semibold text-white">{w.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-300">{w.description}</p>
                <WorkLink w={w} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-10 space-y-16 md:space-y-20">
            {WORK.map((w, i) => (
              <li key={w.title} className="grid min-w-0 gap-8 md:grid-cols-2 md:items-start md:gap-12">
                <div className={`min-w-0 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <WorkImage w={w} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-violet-300">{w.label}</p>
                  <h3 className="mt-1 text-xl font-semibold text-white md:text-2xl">{w.title}</h3>
                  <dl className="mt-5 space-y-4 text-base leading-relaxed">
                    <div>
                      <dt className="text-sm font-medium text-slate-400">The need</dt>
                      <dd className="mt-1 text-slate-200">{w.need}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-slate-400">What we built</dt>
                      <dd className="mt-1 text-slate-200">{w.built}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-slate-400">Features on the live site</dt>
                      <dd className="mt-2">
                        <ul className="space-y-1.5 text-slate-300">
                          {w.features.map((f) => (
                            <li key={f} className="border-l border-slate-700 pl-3">
                              {f}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                  <WorkLink w={w} />
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className={`${smallPrint} mt-12`}>Screenshots show each site's homepage at the time of capture.</p>
      </div>
    </section>
  );
}

function WorkImage({ w }: { w: (typeof WORK)[number] }) {
  return (
    <img
      src={w.image}
      alt={`Homepage of ${w.title}`}
      width={w.width}
      height={w.height}
      loading="lazy"
      decoding="async"
      className="block h-auto w-full rounded-lg border border-slate-800"
    />
  );
}

function WorkLink({ w }: { w: (typeof WORK)[number] }) {
  return (
    <a href={w.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
      {w.linkText}
      <span className="sr-only"> for {w.title} (opens in a new tab)</span>
    </a>
  );
}
