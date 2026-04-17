import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": { "agent-id": string };
    }
  }
}

export {};

const CONVAI_SCRIPT_SRC =
  "https://unpkg.com/@elevenlabs/convai-widget-embed";
const AGENT_ID = "agent_5601kmr4v057ebqvfjbg64jpatq2";

export function ElevenLabsWidget() {
  const { pathname } = useLocation();
  const skipForMercyWidgetFrame = pathname.startsWith("/widget/frame");
  const skipDashboard = pathname.startsWith("/dashboard");

  useEffect(() => {
    if (document.querySelector(`script[src="${CONVAI_SCRIPT_SRC}"]`)) {
      return;
    }
    const script = document.createElement("script");
    script.src = CONVAI_SCRIPT_SRC;
    script.async = true;
    script.type = "text/javascript";
    document.head.appendChild(script);
  }, []);

  if (skipForMercyWidgetFrame || skipDashboard) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed right-6 z-100 max-w-full bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))]"
      data-elevenlabs-convai-host
    >
      <div className="pointer-events-auto inline-block max-w-full">
        <elevenlabs-convai agent-id={AGENT_ID}></elevenlabs-convai>
      </div>
    </div>
  );
}
