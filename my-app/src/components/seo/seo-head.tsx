import { Helmet } from "@/lib/react-helmet-compat";
import { absoluteUrl, BRAND_TAGLINE, BUSINESS, defaultOgImageUrl } from "@/lib/site-config";

export type SeoHeadProps = {
  title: string;
  description?: string;
  /** Path starting with / (e.g. /contact) — used for og:url and matching route */
  path: string;
  /** When set, `<link rel="canonical">` and `og:url` use this path instead of `path` (consolidate duplicates). */
  canonicalPath?: string;
  /** If true, sets robots noindex,nofollow */
  noindex?: boolean;
  /** Open Graph type; default website */
  ogType?: "website" | "article";
  /** Absolute or site-root path for og:image / twitter:image (defaults to brand icon) */
  ogImagePath?: string;
};

const DEFAULT_DESCRIPTION = BRAND_TAGLINE;

/**
 * Declarative document metadata. Works with client navigation and with static prerender (React 19 hoists tags).
 */
export function SeoHead({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  canonicalPath,
  noindex = false,
  ogType = "website",
  ogImagePath,
}: SeoHeadProps) {
  const canonical = absoluteUrl(canonicalPath ?? path);
  const ogImage = ogImagePath?.startsWith("http")
    ? ogImagePath
    : ogImagePath
      ? absoluteUrl(ogImagePath)
      : defaultOgImageUrl();
  const fullTitle =
    path === "/" ? `${BUSINESS.name} | AI Receptionists, Websites & Automation` : `${title} | ${BUSINESS.name}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <meta name="author" content={BUSINESS.name} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={BUSINESS.name} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${BUSINESS.name} — ${BRAND_TAGLINE.slice(0, 80)}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="canonical" href={canonical} />
      <meta name="theme-color" content="#020617" />
    </Helmet>
  );
}
