import { useEffect, useRef, useState } from "react";

/**
 * Brand animation (About page): VP9 WebM with an alpha channel. No autoplay, no loop.
 * Browsers without VP9-alpha support (Safari / all iOS browsers) and reduced-motion
 * users get the still image (WebP with PNG fallback) and no video controls.
 */
const POSTER_WEBP = "/brand/logo-alpha-still.webp";
const POSTER_PNG = "/brand/logo-alpha-still.png";
const VIDEO_WEBM = "/brand/logo-alpha.webm";

/** VP9 alpha is decoded by Chromium and Firefox; WebKit plays VP9 but drops alpha. */
function supportsVp9Alpha(): boolean {
  if (typeof document === "undefined") return false;
  const ua = navigator.userAgent;
  const isWebKitOnly =
    /iPad|iPhone|iPod/.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) ||
    (/Safari\//.test(ua) && !/Chrome\/|Chromium\/|CriOS|FxiOS|Edg\/|Firefox\//.test(ua));
  if (isWebKitOnly) return false;
  return document.createElement("video").canPlayType('video/webm; codecs="vp09.00.10.08"') !== "";
}
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
  const [canAlpha, setCanAlpha] = useState(false);
  useEffect(() => setCanAlpha(supportsVp9Alpha()), []);
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
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    v.load(); // reset to start and redisplay the poster still
  };

  return (
    <figure className="mx-auto w-full max-w-md">
      {reduced || !canAlpha ? (
        <picture>
          <source srcSet={POSTER_WEBP} type="image/webp" />
          <img src={POSTER_PNG} alt={LABEL} width={1080} height={1080} loading="lazy" className="block h-auto w-full" />
        </picture>
      ) : (
        <>
          <video
            ref={ref}
            className="block h-auto w-full"
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
            <source src={VIDEO_WEBM} type="video/webm" />
          </video>
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause logo animation" : "Play logo animation"}
              aria-pressed={playing}
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-100 transition-colors hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
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
