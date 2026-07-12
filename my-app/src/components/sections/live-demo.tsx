"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Play, Pause, X, Calendar } from "lucide-react";
import { BookingLink } from "@/components/cta/booking-link";
import { trackEvent } from "@/lib/track-event";
import {
  demoPhoneDisplay,
  demoTelHref,
  NAV_PATHS,
  siteConfig,
  siteContent,
} from "@/lib/site-config";

const STICKY_DISMISS_KEY = "msd-live-demo-sticky-dismissed";

type LiveDemoProps = {
  /** Analytics location label, e.g. "home" | "ai-phone-receptionist" */
  location?: string;
};

function SampleCallPlayer({
  audioUrl,
  transcriptUrl,
  location,
}: {
  audioUrl: string | null;
  transcriptUrl: string | null;
  location: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el || !audioUrl) return;
    if (el.paused) {
      void el.play();
      setPlaying(true);
      trackEvent("live_demo_sample_play", { location });
    } else {
      el.pause();
      setPlaying(false);
    }
  }, [audioUrl, location]);

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
      {audioUrl ? (
        <>
          <audio
            ref={audioRef}
            src={audioUrl}
            preload="metadata"
            onEnded={() => setPlaying(false)}
            className="sr-only"
          />
          <button
            type="button"
            onClick={toggle}
            data-analytics-event="live_demo_sample_play"
            data-analytics-location={location}
            className="inline-flex items-center justify-center gap-3 min-h-14 px-8 rounded-2xl bg-neon-cyan/15 border border-neon-cyan/40 text-neon-cyan text-lg sm:text-xl font-semibold hover:bg-neon-cyan/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/50 transition-colors w-full sm:w-auto"
          >
            {playing ? (
              <Pause className="w-6 h-6 shrink-0" aria-hidden />
            ) : (
              <Play className="w-6 h-6 shrink-0" aria-hidden />
            )}
            Hear a sample call
          </button>
        </>
      ) : (
        <div
          className="inline-flex items-center justify-center gap-3 min-h-14 px-8 rounded-2xl bg-slate-900/50 border border-slate-700/60 text-slate-300 text-lg sm:text-xl font-semibold w-full sm:w-auto"
          role="status"
        >
          <Play className="w-6 h-6 shrink-0 text-slate-500" aria-hidden />
          Hear a sample call
        </div>
      )}
      {transcriptUrl ? (
        <a
          href={transcriptUrl}
          className="text-sm text-neon-cyan font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/50 rounded-sm"
          data-analytics-event="live_demo_transcript"
          data-analytics-location={location}
          onClick={() => trackEvent("live_demo_transcript", { location })}
        >
          Read the full transcript
        </a>
      ) : !audioUrl ? (
        <p className="text-sm text-slate-400 text-center max-w-sm">
          Sample audio is coming soon. Book a demo to hear the AI live on a guided call.
        </p>
      ) : null}
    </div>
  );
}

function LiveDemoStickyBar({
  location,
  hasPhone,
  tel,
}: {
  location: string;
  hasPhone: boolean;
  tel: string | null;
}) {
  const [dismissed, setDismissed] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(STICKY_DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    const footer = document.getElementById("site-footer") ?? document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setFooterVisible(entries.some((e) => e.isIntersecting));
      },
      { rootMargin: "0px", threshold: 0.01 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visible = !dismissed && !footerVisible;

  useEffect(() => {
    const layout = document.getElementById("public-layout");
    if (!layout) return;
    if (visible) {
      layout.classList.add("has-live-demo-sticky");
    } else {
      layout.classList.remove("has-live-demo-sticky");
    }
    return () => layout.classList.remove("has-live-demo-sticky");
  }, [visible]);

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(STICKY_DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    trackEvent("live_demo_sticky_dismiss", { location });
  };

  if (!visible) return null;

  return (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-slate-700/60 bg-slate-950/95 backdrop-blur-md pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]"
      role="region"
      aria-label="Call the AI demo"
    >
      <div className="flex items-center gap-2 px-3 py-2 max-w-lg mx-auto">
        {hasPhone && tel ? (
          <a
            href={tel}
            data-analytics-event="live_demo_call_click"
            data-analytics-location={`${location}-sticky`}
            onClick={() =>
              trackEvent("live_demo_call_click", { location: `${location}-sticky` })
            }
            className="flex-1 inline-flex items-center justify-center gap-2 min-h-11 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-sm font-semibold transition-colors"
          >
            <Phone className="w-4 h-4 shrink-0" aria-hidden />
            Call the AI demo
          </a>
        ) : (
          <a
            href="#live-demo"
            data-analytics-event="live_demo_sample_scroll"
            data-analytics-location={`${location}-sticky`}
            onClick={() =>
              trackEvent("live_demo_sample_scroll", { location: `${location}-sticky` })
            }
            className="flex-1 inline-flex items-center justify-center gap-2 min-h-11 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-sm font-semibold transition-colors"
          >
            <Play className="w-4 h-4 shrink-0" aria-hidden />
            Hear a sample
          </a>
        )}
        <BookingLink
          kind="aiReceptionistDemo"
          data-analytics-event="live_demo_book_click"
          data-analytics-location={`${location}-sticky`}
          onClick={() =>
            trackEvent("live_demo_book_click", { location: `${location}-sticky` })
          }
          className="flex-1 inline-flex items-center justify-center gap-2 min-h-11 rounded-xl border border-slate-500/60 bg-transparent text-slate-200 text-sm font-semibold hover:bg-slate-800/50 transition-colors"
        >
          <Calendar className="w-4 h-4 shrink-0" aria-hidden />
          Book demo
        </BookingLink>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss demo bar"
          className="shrink-0 inline-flex items-center justify-center min-h-11 min-w-11 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}

/**
 * Prominent "call our AI" experience — phone when configured, sample-call fallback otherwise.
 * Includes a dismissible mobile sticky bar that hides when the footer is in view.
 */
export function LiveDemo({ location = "unknown" }: LiveDemoProps) {
  const titleId = useId();
  const hasPhone = Boolean(siteConfig.demoPhoneNumber);
  const tel = demoTelHref();
  const display = demoPhoneDisplay();
  const { audioUrl, audioTranscriptUrl } = siteContent.demoMedia;

  return (
    <>
      <section
        id="live-demo"
        className="section bg-slate-950 border-y border-slate-800/40"
        aria-labelledby={titleId}
      >
        <div className="section-inner max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5 md:space-y-6"
          >
            <div className="inline-flex p-3 rounded-full bg-neon-cyan/15 border border-neon-cyan/30 mb-1">
              <Phone className="w-7 h-7 text-neon-cyan" aria-hidden />
            </div>

            <h2
              id={titleId}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-50 tracking-tight leading-tight px-1"
            >
              Don&apos;t take our word for it — call our AI right now.
            </h2>

            {hasPhone && tel && display ? (
              <a
                href={tel}
                data-analytics-event="live_demo_call_click"
                data-analytics-location={location}
                onClick={() => trackEvent("live_demo_call_click", { location })}
                className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neon-cyan tracking-tight hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/50 rounded-lg transition-colors py-2"
              >
                {display}
              </a>
            ) : (
              <SampleCallPlayer
                audioUrl={audioUrl}
                transcriptUrl={audioTranscriptUrl}
                location={location}
              />
            )}

            <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto">
              Ask it anything a customer would. It answers 24/7.
            </p>

            <p className="pt-1">
              <BookingLink
                kind="aiReceptionistDemo"
                data-analytics-event="live_demo_book_click"
                data-analytics-location={location}
                onClick={() => trackEvent("live_demo_book_click", { location })}
                className="text-sm sm:text-base text-slate-300 underline-offset-4 hover:underline hover:text-neon-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/50 rounded-sm transition-colors"
              >
                Prefer a guided walkthrough? Book a demo
              </BookingLink>
            </p>

            {/* Keep /book-demo discoverable for crawlers even if BookingLink is external later */}
            <span className="sr-only">
              Book a demo at {NAV_PATHS.bookDemo}
            </span>
          </motion.div>
        </div>
      </section>

      <LiveDemoStickyBar location={location} hasPhone={hasPhone} tel={tel} />
    </>
  );
}
