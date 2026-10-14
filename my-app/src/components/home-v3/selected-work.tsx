import { h2, inner, section, divided, smallPrint } from "@/components/home-v3/v3-ui";

import { VERIFIED_WORK as WORK } from "@/content/verified-work";

export function SelectedWork({
  headingId = "work-heading",
  title = "Selected Website Work",
}: {
  headingId?: string;
  title?: string;
}) {
  return (
    <section className={`${section} ${divided}`} aria-labelledby={headingId}>
      <div className={inner}>
        <h2 id={headingId} className={`${h2} mb-10`}>
          {title}
        </h2>
        <ul className="grid gap-12 md:grid-cols-2 md:gap-8">
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
