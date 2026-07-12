# Domain redirects (manual DNS / hosting)

Cursor cannot configure DNS or registrar settings. Complete these steps in your DNS provider and hosting dashboard (e.g. Vercel, Cloudflare, Namecheap).

## Goal

All traffic from the legacy `mercyspeaks.ai` hostname should permanently land on the canonical marketing site:

| From | To |
|------|-----|
| `https://mercyspeaks.ai/*` | `https://www.mercyspeaksdigital.com/*` |
| `http://mercyspeaks.ai/*` | `https://www.mercyspeaksdigital.com/*` |
| `http://www.mercyspeaksdigital.com/*` | `https://www.mercyspeaksdigital.com/*` |
| Apex `mercyspeaksdigital.com` | `https://www.mercyspeaksdigital.com` (same path) |

Path and query string should be preserved (`/results?x=1` → `/results?x=1`).

## Checklist

### 1. Legacy domain → canonical site (301)

- [ ] Add `mercyspeaks.ai` (and `www.mercyspeaks.ai` if used) as a domain on the project that serves `www.mercyspeaksdigital.com`, **or** configure a reverse-proxy / redirect-only project.
- [ ] Set a **permanent 301** redirect:
  - `https://mercyspeaks.ai/*` → `https://www.mercyspeaksdigital.com/*`
  - `https://www.mercyspeaks.ai/*` → `https://www.mercyspeaksdigital.com/*` (if that hostname exists)
- [ ] Confirm the redirect is **301** (not 302 temporary). Search engines and bookmarks should update to the www digital domain.

### 2. Apex → www on the primary domain (301, permanent)

- [ ] Confirm `mercyspeaksdigital.com` (apex / bare domain) **301** redirects to `https://www.mercyspeaksdigital.com` with path preserved.
- [ ] This must remain permanent (301), not a temporary redirect.

### 3. HTTP → HTTPS (both hosts)

- [ ] `http://mercyspeaks.ai` and `http://www.mercyspeaks.ai` → HTTPS (then follow the 301s above to www digital).
- [ ] `http://mercyspeaksdigital.com` and `http://www.mercyspeaksdigital.com` → HTTPS.
- [ ] Prefer a single hop where possible (e.g. HTTP apex → HTTPS www), but correctness matters more than hop count.

### 4. Verify after deploy

- [ ] `curl -I http://mercyspeaks.ai` → eventually `https://www.mercyspeaksdigital.com/` with 301s.
- [ ] `curl -I https://mercyspeaks.ai/results` → `https://www.mercyspeaksdigital.com/results`.
- [ ] `curl -I http://mercyspeaksdigital.com` → `https://www.mercyspeaksdigital.com/`.
- [ ] Browser: open legacy URLs and confirm address bar shows `www.mercyspeaksdigital.com`.

## Notes

- **Widget / allowlists:** Functional domain lists (tenant allowlists, env examples) may still include `mercyspeaks.ai` so embeds and redirects keep working during transition. Marketing and portfolio links must use `https://www.mercyspeaksdigital.com`.
- **DNS vs app redirects:** Prefer hosting-level redirects (Vercel Domains / Redirects, Cloudflare Rules) over app-only redirects so HTTP and apex cases are covered before the app runs.
- Do not use a soft meta refresh or JavaScript-only redirect for SEO; use HTTP **301**.
