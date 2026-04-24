import { useEffect, useState } from "react";

const CONSENT_STORAGE_KEY = "msd_cookie_consent";
const CONSENT_VERSION = "1.0";

type CookieConsentPreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: string;
  version: "1.0";
};

type PreferenceState = {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

export function getCookieConsent(): CookieConsentPreferences | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as CookieConsentPreferences;
    if (
      parsed &&
      parsed.necessary === true &&
      typeof parsed.analytics === "boolean" &&
      typeof parsed.marketing === "boolean" &&
      typeof parsed.functional === "boolean" &&
      typeof parsed.timestamp === "string" &&
      parsed.version === CONSENT_VERSION
    ) {
      return parsed;
    }

    return null;
  } catch {
    return null;
  }
}

function dispatchConsentEvents(consent: CookieConsentPreferences) {
  if (typeof window === "undefined") {
    return;
  }

  if (consent.analytics) {
    window.dispatchEvent(new CustomEvent("cookieConsentGranted", { detail: { analytics: true } }));
  }

  if (consent.marketing) {
    window.dispatchEvent(new CustomEvent("cookieConsentGranted", { detail: { marketing: true } }));
  }
}

function ToggleRow({
  label,
  description,
  checked,
  disabled = false,
  onToggle,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "16px",
        padding: "14px 0",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <div>
        <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>{label}</div>
        <div style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.5 }}>{description}</div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        aria-pressed={checked}
        aria-label={`Toggle ${label}`}
        style={{
          width: "46px",
          height: "26px",
          borderRadius: "999px",
          border: disabled ? "1px solid #334155" : "1px solid #00d4ff40",
          background: checked ? "linear-gradient(135deg, #00d4ff, #0ea5e9)" : "#0b1220",
          position: "relative",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.7 : 1,
          transition: "all 0.2s ease",
          padding: 0,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "2px",
            left: checked ? "22px" : "2px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#ffffff",
            transition: "left 0.2s ease",
          }}
        />
      </button>
    </div>
  );
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<PreferenceState>({
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const existing = getCookieConsent();
    if (!existing) {
      setShowBanner(true);
      return;
    }

    setPreferences({
      analytics: existing.analytics,
      marketing: existing.marketing,
      functional: existing.functional,
    });
  }, []);

  const saveConsent = (values: PreferenceState) => {
    const consent: CookieConsentPreferences = {
      necessary: true,
      analytics: values.analytics,
      marketing: values.marketing,
      functional: values.functional,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };

    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
    dispatchConsentEvents(consent);
    setPreferences(values);
    setShowModal(false);
    setShowBanner(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      analytics: true,
      marketing: true,
      functional: true,
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      analytics: false,
      marketing: false,
      functional: false,
    });
  };

  const handleOpenManagePreferences = () => {
    const existing = getCookieConsent();
    if (existing) {
      setPreferences({
        analytics: existing.analytics,
        marketing: existing.marketing,
        functional: existing.functional,
      });
    }
    setShowModal(true);
  };

  if (!showBanner && !showModal) {
    return null;
  }

  return (
    <>
      {showBanner ? (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            background: "#0d1117",
            borderTop: "2px solid #00d4ff",
            padding: "20px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.6, maxWidth: "600px" }}>
            <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>
              Cookie Preferences
            </div>
            We use cookies to keep this site secure, understand traffic, improve performance, and support marketing.
            You can accept all cookies, reject non-essential cookies, or manage your preferences.
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={handleAcceptAll}
              style={{
                background: "linear-gradient(135deg, #00d4ff, #0ea5e9)",
                color: "#0a0a0f",
                fontWeight: 800,
                padding: "10px 24px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "12px",
                letterSpacing: "2px",
                fontFamily: "Space Mono, monospace",
              }}
            >
              ACCEPT ALL
            </button>
            <button
              type="button"
              onClick={handleOpenManagePreferences}
              style={{
                background: "transparent",
                border: "1px solid #00d4ff40",
                color: "#00d4ff",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "12px",
                letterSpacing: "1.5px",
                fontFamily: "Space Mono, monospace",
              }}
            >
              MANAGE PREFERENCES
            </button>
            <button
              type="button"
              onClick={handleRejectNonEssential}
              style={{
                background: "transparent",
                border: "1px solid #1e293b",
                color: "#6b7280",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "12px",
                letterSpacing: "1.5px",
              }}
            >
              REJECT NON-ESSENTIAL
            </button>
          </div>
        </div>
      ) : null}

      {showModal ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "#0d1117",
              border: "1px solid #1e293b",
              borderRadius: "12px",
              padding: "32px",
              maxWidth: "480px",
              width: "90%",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <h2 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "22px", margin: "0 0 8px" }}>
              Manage Cookie Preferences
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.6, margin: "0 0 14px" }}>
              Choose which optional cookies you want to allow. Necessary cookies remain enabled to keep the site
              secure and functional.
            </p>

            <div>
              <ToggleRow
                label="Necessary Cookies"
                description="Required for session management, security, and your consent preference."
                checked
                disabled
                onToggle={() => {}}
              />
              <ToggleRow
                label="Analytics Cookies"
                description="Helps us understand page performance and visitor behavior."
                checked={preferences.analytics}
                onToggle={() =>
                  setPreferences((prev) => ({
                    ...prev,
                    analytics: !prev.analytics,
                  }))
                }
              />
              <ToggleRow
                label="Marketing Cookies"
                description="Used for ad conversion tracking and marketing campaign performance."
                checked={preferences.marketing}
                onToggle={() =>
                  setPreferences((prev) => ({
                    ...prev,
                    marketing: !prev.marketing,
                  }))
                }
              />
              <ToggleRow
                label="Functional Cookies"
                description="Stores chatbot context and user experience preferences."
                checked={preferences.functional}
                onToggle={() =>
                  setPreferences((prev) => ({
                    ...prev,
                    functional: !prev.functional,
                  }))
                }
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "18px" }}>
              <button
                type="button"
                onClick={() => saveConsent(preferences)}
                style={{
                  background: "transparent",
                  border: "1px solid #00d4ff40",
                  color: "#00d4ff",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                  fontFamily: "Space Mono, monospace",
                }}
              >
                SAVE PREFERENCES
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #0ea5e9)",
                  color: "#0a0a0f",
                  fontWeight: 800,
                  padding: "10px 24px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  fontFamily: "Space Mono, monospace",
                }}
              >
                ACCEPT ALL
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
