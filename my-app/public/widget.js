/**
 * Mercy Speaks AI — Embeddable multi-tenant chat widget (iframe-based)
 * Paste script with data-tenant and data-key. Launcher opens iframe modal (bottom-right).
 * Desktop: 380x600; mobile: full-width bottom sheet.
 */
(function () {
  "use strict";

  var script = document.currentScript;
  if (!script) return;

  var tenantId = (script.getAttribute("data-tenant") || "").trim();
  var publicKey = (script.getAttribute("data-key") || "").trim();
  var baseUrl = (script.getAttribute("data-base-url") || "").trim();
  if (!baseUrl) {
    var src = script.getAttribute("src") || "";
    try {
      baseUrl = new URL(src).origin;
    } catch (e) {
      return;
    }
  }
  if (!tenantId) return;

  var container = null;
  var isOpen = false;
  var frameUrl = baseUrl + "/widget/frame?tenant=" + encodeURIComponent(tenantId);
  if (publicKey) {
    frameUrl += "&key=" + encodeURIComponent(publicKey);
  }

  function applyStyles(el, styles) {
    for (var k in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, k)) {
        el.style[k] = styles[k];
      }
    }
  }

  function isMobile() {
    return typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 640px)").matches;
  }

  function createButton() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", "Open chat");
    btn.innerHTML =
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    applyStyles(btn, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      border: "none",
      cursor: "pointer",
      backgroundColor: "#06b6d4",
      color: "#fff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "2147483646",
    });
    return btn;
  }

  function openFrame() {
    if (isOpen) return;
    isOpen = true;

    var overlay = document.createElement("div");
    overlay.setAttribute("data-mercy-widget", "overlay");
    applyStyles(overlay, {
      position: "fixed",
      inset: "0",
      backgroundColor: "rgba(0,0,0,0.3)",
      zIndex: "2147483645",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      padding: isMobile() ? "0" : "20px",
      paddingBottom: isMobile() ? "0" : "100px",
      boxSizing: "border-box",
    });

    var frameWrap = document.createElement("div");
    frameWrap.setAttribute("data-mercy-widget", "frame-wrap");
    applyStyles(frameWrap, {
      width: isMobile() ? "100%" : "380px",
      height: isMobile() ? "85vh" : "600px",
      maxHeight: "calc(100vh - 120px)",
      backgroundColor: "#0f172a",
      borderRadius: isMobile() ? "16px 16px 0 0" : "12px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    });

    var iframe = document.createElement("iframe");
    iframe.src = frameUrl;
    iframe.title = "Chat";
    applyStyles(iframe, {
      width: "100%",
      height: "100%",
      border: "none",
      flex: "1",
    });

    frameWrap.appendChild(iframe);
    overlay.appendChild(frameWrap);

    function close() {
      overlay.remove();
      isOpen = false;
    }

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });

    document.body.appendChild(overlay);
  }

  container = document.createElement("div");
  container.setAttribute("data-mercy-widget", "root");
  var btn = createButton();
  btn.addEventListener("click", openFrame);
  container.appendChild(btn);
  document.body.appendChild(container);
})();
