/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical site origin, e.g. https://www.mercyspeaksdigital.com — no trailing slash */
  readonly VITE_SITE_URL?: string;
  /** Tenant ID for dogfooding `/widget.js` on this site. When unset, SiteChatWidget no-ops. */
  readonly VITE_MERCY_WIDGET_TENANT_ID?: string;
  /** Public key matching MERCY_WIDGET_PUBLIC_KEY / tenant.public_key (omit if tenant has none). */
  readonly VITE_MERCY_WIDGET_PUBLIC_KEY?: string;
  /** Optional widget host override; defaults to window.location.origin. */
  readonly VITE_MERCY_WIDGET_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
