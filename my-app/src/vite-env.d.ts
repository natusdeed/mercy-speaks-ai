/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical site origin, e.g. https://www.mercyspeaksdigital.com — no trailing slash */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
