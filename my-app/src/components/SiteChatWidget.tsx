"use client";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SCRIPT_ATTR = "data-mercy-widget-embed";
const INTERACTION_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

function removeSiteWidgetDom() {
  document.querySelectorAll('[data-mercy-widget="root"], [data-mercy-widget="overlay"]').forEach((el) => {
    el.remove();
  });
  document.querySelectorAll(`script[${SCRIPT_ATTR}]`).forEach((el) => {
    el.remove();
  });
}

/**
 * Dogfoods the product embed (`/widget.js`) on our own marketing site.
 * Loads after idle or first interaction so it does not compete with LCP/INP.
 * No-ops when tenant env is unset or on /widget/* and /dashboard.
 */
export function SiteChatWidget() {
  const { pathname } = useLocation();
  const skip =
    pathname.startsWith("/widget") || pathname.startsWith("/dashboard");

  useEffect(() => {
    if (skip) {
      removeSiteWidgetDom();
      return;
    }
    if (typeof window === "undefined") return;

    const tenantId = (import.meta.env.VITE_MERCY_WIDGET_TENANT_ID ?? "").trim();
    if (!tenantId) return;

    const publicKey = (import.meta.env.VITE_MERCY_WIDGET_PUBLIC_KEY ?? "").trim();
    const baseUrl = (import.meta.env.VITE_MERCY_WIDGET_BASE_URL ?? "").trim();

    let cancelled = false;
    let loaded = false;
    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;

    const cleanupListeners = () => {
      for (const event of INTERACTION_EVENTS) {
        window.removeEventListener(event, onInteract);
      }
    };

    const load = () => {
      if (cancelled || loaded) return;
      loaded = true;
      cleanupListeners();

      if (document.querySelector(`script[${SCRIPT_ATTR}]`)) return;
      if (document.querySelector('[data-mercy-widget="root"]')) return;

      const script = document.createElement("script");
      script.src = `${baseUrl || window.location.origin}/widget.js`;
      script.async = true;
      script.setAttribute(SCRIPT_ATTR, "true");
      script.setAttribute("data-tenant", tenantId);
      if (publicKey) script.setAttribute("data-key", publicKey);
      if (baseUrl) script.setAttribute("data-base-url", baseUrl);
      document.body.appendChild(script);
    };

    const onInteract = () => load();

    for (const event of INTERACTION_EVENTS) {
      window.addEventListener(event, onInteract, { once: true, passive: true });
    }

    const win = window as Window & {
      requestIdleCallback?: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === "function") {
      idleHandle = win.requestIdleCallback(() => load(), { timeout: 4000 });
    } else {
      timeoutHandle = setTimeout(load, 3000);
    }

    return () => {
      cancelled = true;
      cleanupListeners();
      if (idleHandle !== undefined && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
    };
  }, [skip]);

  return null;
}
