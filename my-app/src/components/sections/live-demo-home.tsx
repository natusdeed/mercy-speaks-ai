"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard } from "lucide-react";
import { hasDemoMedia, siteContent } from "@/lib/site-config";

function LazyDemoVideo({
  src,
  poster,
}: {
  src: string;
  poster: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="aspect-video bg-slate-950">
      <video
        className="h-full w-full object-cover"
        controls
        playsInline
        preload="none"
        poster={poster ?? undefined}
        aria-label="Product demo video"
      >
        {shouldLoad ? <source src={src} /> : null}
        Your browser does not support the video element.
      </video>
    </div>
  );
}

/**
 * Homepage "See It In Action" — gated by `siteContent.demoMedia`.
 * Renders nothing until at least one of audioUrl / videoUrl is set.
 */
export function LiveDemoHome() {
  if (!hasDemoMedia()) {
    return null;
  }

  const {
    audioUrl,
    audioTranscriptUrl,
    videoUrl,
    videoPosterUrl,
    dashboardScreenshots,
  } = siteContent.demoMedia;

  const screenshots = dashboardScreenshots ?? [];

  return (
    <section
      id="live-demo"
      className="section bg-slate-950 pt-8 md:pt-10"
      aria-labelledby="live-demo-title"
    >
      <div className="section-inner max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <h2
            id="live-demo-title"
            className="text-3xl md:text-4xl font-bold text-slate-50 mb-3"
          >
            See It In Action
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Hear a sample call, watch a short demo, and peek at the dashboard.
          </p>
        </motion.div>

        <div className="space-y-5 md:space-y-6">
          <div
            className={`grid grid-cols-1 gap-5 md:gap-6 ${
              audioUrl && videoUrl ? "md:grid-cols-2" : "md:grid-cols-1 max-w-2xl mx-auto"
            }`}
          >
            {audioUrl ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl overflow-hidden bg-slate-900/20 shadow-sm"
              >
                <div className="p-7 space-y-4">
                  <h3 className="text-lg font-semibold text-slate-50">Sample call</h3>
                  <audio className="w-full" controls preload="metadata" src={audioUrl}>
                    Your browser does not support the audio element.
                  </audio>
                  {audioTranscriptUrl ? (
                    <p className="text-sm text-slate-400">
                      <a
                        href={audioTranscriptUrl}
                        className="text-neon-cyan font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/50 rounded-sm"
                      >
                        Read the full transcript
                      </a>
                    </p>
                  ) : null}
                </div>
              </motion.div>
            ) : null}

            {videoUrl ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="rounded-2xl overflow-hidden bg-slate-900/20 shadow-sm"
              >
                <LazyDemoVideo src={videoUrl} poster={videoPosterUrl} />
                <div className="p-7">
                  <h3 className="text-lg font-semibold text-slate-50">Short demo video</h3>
                </div>
              </motion.div>
            ) : null}
          </div>

          {screenshots.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-center gap-2 text-slate-500 mb-4">
                <LayoutDashboard className="w-5 h-5" aria-hidden />
                <span className="text-sm font-medium">Dashboard</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                {screenshots.map((shot, index) => (
                  <motion.figure
                    key={shot.src}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="rounded-2xl overflow-hidden bg-slate-900/20 shadow-sm"
                  >
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      width={640}
                      height={360}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-video object-cover"
                    />
                    <figcaption className="p-4 text-sm text-slate-400 text-center">
                      {shot.label}
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
