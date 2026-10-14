import { useEffect, useId, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { AI_PILOT_RECORDING, DEMO_SCRIPT } from "@/content/ai-pilot-demo";

/**
 * "Recorded pilot demonstration" player — UNPUBLISHED (see content/ai-pilot-demo.ts).
 * Renders nothing when no approved recording exists, so it can never show a broken player.
 * Native <button> controls (Space/Enter), no autoplay, transcript always visible below.
 */
export function RecordedPilotDemo() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const transcriptId = useId();
  const seekId = useId();

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => setDuration(a.duration || 0);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  if (!AI_PILOT_RECORDING) return null;

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      await a.play().catch(() => undefined);
      setPlaying(!a.paused);
    } else {
      a.pause();
      setPlaying(false);
    }
  };
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <section aria-labelledby="pilot-demo-heading" className="rounded-xl border border-slate-800 p-6 md:p-8">
      <h2 id="pilot-demo-heading" className="text-xl font-semibold text-white">
        Recorded pilot demonstration
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        A test call with fictional caller details. Length {AI_PILOT_RECORDING.durationLabel}.
      </p>
      <audio ref={audioRef} preload="metadata" aria-describedby={transcriptId}>
        <source src={AI_PILOT_RECORDING.src} type={AI_PILOT_RECORDING.type} />
      </audio>
      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause recording" : "Play recording"}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          {playing ? <Pause className="h-5 w-5" aria-hidden /> : <Play className="h-5 w-5" aria-hidden />}
        </button>
        <label htmlFor={seekId} className="sr-only">
          Playback position
        </label>
        <input
          id={seekId}
          type="range"
          min={0}
          max={duration || 0}
          step={1}
          value={time}
          onChange={(e) => {
            const a = audioRef.current;
            if (a) a.currentTime = Number(e.target.value);
          }}
          aria-valuetext={`${fmt(time)} of ${fmt(duration)}`}
          className="h-11 flex-1 accent-violet-300"
        />
        <span className="w-24 text-right text-sm tabular-nums text-slate-400">
          {fmt(time)} / {fmt(duration)}
        </span>
      </div>
      <div id={transcriptId} className="mt-8">
        <h3 className="text-base font-semibold text-white">Transcript</h3>
        <ol className="mt-3 space-y-2 text-base leading-relaxed text-slate-300">
          {DEMO_SCRIPT.map((l, i) => (
            <li key={i}>
              <span className="font-medium text-slate-100">{l.speaker}:</span> {l.text}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
