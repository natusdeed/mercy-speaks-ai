import { useLocation } from "react-router-dom";

/**
 * ElevenLabs ConvAI widget — official embed (script in index.html + custom element here).
 *
 * ```html
 * <elevenlabs-convai agent-id="agent_8701km3kg91aem4t0z0es35ft0t1"></elevenlabs-convai>
 * <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
 * ```
 *
 * Skipped on `/widget/frame` so the multi-tenant Mercy chat iframe stays a single chat surface.
 *
 * @see https://elevenlabs.io/docs/conversational-ai
 * Prompts / workflow copy: repo root docs/ELEVENLABS-AGENT-CONFIG.md
 */
const AGENT_ID = "agent_8701km3kg91aem4t0z0es35ft0t1";

export function ElevenLabsWidgetMount() {
  const pathname = useLocation().pathname;
  const skipForMercyWidgetFrame = pathname.startsWith("/widget/frame");

  if (skipForMercyWidgetFrame) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-6 right-6 z-100 max-w-full"
      data-elevenlabs-convai-host
    >
      <div className="pointer-events-auto inline-block max-w-full">
        <elevenlabs-convai agent-id={AGENT_ID} />
      </div>
    </div>
  );
}
