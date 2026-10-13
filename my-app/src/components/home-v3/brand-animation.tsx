import { useEffect, useRef, useState } from "react";

/**
 * Brand animation panel (About page). Ordinary video with its own purple-dark
 * background, shown inside a dark rounded panel. No autoplay, no loop.
 * Reduced motion: still image only, no video or controls.
 */
const POSTER_WEBP = "/brand/logo-poster.webp";
const POSTER_PNG = "/brand/logo-poster.png";
const LABEL = "Mercy Speaks Digital logo: a woman with a headset inside a glass globe on a gold base engraved Mercy Speaks Digital";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function BrandAnimation() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };
  const onEnded = () => {
    const v = ref.current;
    setPlaying(false);
    if (v) v.load(); // return to poster
  };

  return (
    <figure className="mx-auto w-full max-w-md rounded-3xl bg-[#2a0b24] p-4 sm:p-6">
      {reduced ? (
        <picture>
          <source srcSet={POSTER_WEBP} type="image/webp" />
          <img src={POSTER_PNG} alt={LABEL} width={1080} height={1080} loading="lazy" className="block h-auto w-full rounded-2xl" />
        </picture>
      ) : (
        <>
          <video
            ref={ref}
            className="block h-auto w-full rounded-2xl"
            width={1080}
            height={1080}
            muted
            playsInline
            preload="metadata"
            poster={POSTER_WEBP}
            aria-label={LABEL}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={onEnded}
          >
            <source src="/brand/logo-web.webm" type="video/webm" />
            <source src="/brand/logo-web.mp4" type="video/mp4" />
          </video>
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause logo animation" : "Play logo animation"}
              aria-pressed={playing}
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-100 transition-colors hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2a0b24]"
            >
              <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
              {playing ? "Pause" : "Play"}
            </button>
          </div>
        </>
      )}
    </figure>
  );
}
