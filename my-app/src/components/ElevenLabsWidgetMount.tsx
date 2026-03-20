import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ElevenLabs ConvAI widget — same embed as the official snippet, mounted once for the SPA.
 * Skipped on `/widget/frame` so the multi-tenant Mercy chat iframe stays a single chat surface.
 *
 * @see https://elevenlabs.io/docs/conversational-ai
 * Prompts / workflow copy: repo root docs/ELEVENLABS-AGENT-CONFIG.md
 */
const SCRIPT_ID = "elevenlabs-convai-widget-embed";
const SCRIPT_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed";
const AGENT_ID = "agent_8701km3kg91aem4t0z0es35ft0t1";

export function ElevenLabsWidgetMount() {
  const { pathname } = useLocation();
  const skipForMercyWidgetFrame = pathname.startsWith("/widget/frame");

  useEffect(() => {
    if (skipForMercyWidgetFrame) return;
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, [skipForMercyWidgetFrame]);

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
