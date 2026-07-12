import { Helmet } from "@/lib/react-helmet-compat";
import {
  absoluteUrl,
  BRAND_TAGLINE,
  BUSINESS,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  resolveOgImagePath,
} from "@/lib/site-config";

export type SeoHeadProps = {
  title: string;
  description?: string;
  /** Path starting with / (e.g. /contact) — used for og:url and matching route */
  path: string;
  /** When set, `<link rel="canonical">` and `og:url` use this path instead of `path` (consolidate duplicates). */
  canonicalPath?: string;
  /** If true, sets robots noindex,nofollow (unless `robots` overrides) */
  noindex?: boolean;
  /** Exact robots meta content (e.g. "noindex"). Wins over `noindex` when set. */
  robots?: string;
  /** Open Graph type; default website */
  ogType?: "website" | "article";
  /**
   * Absolute URL or site-root path for og:image / twitter:image.
   * Defaults to the mapped `/og/*.png` for known paths, else `/og-default.png`.
   */
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
  robots,
  ogType = "website",
  ogImagePath,
}: SeoHeadProps) {
  const canonical = absoluteUrl(canonicalPath ?? path);
  const resolvedPath = resolveOgImagePath(path, ogImagePath);
  const ogImage = resolvedPath.startsWith("http") ? resolvedPath : absoluteUrl(resolvedPath);
  // Use `title` as-is when it already includes the brand (custom suffixes / full SERP titles).
  // Otherwise append `| Mercy Speaks Digital` so short page titles stay unique and branded.
  const fullTitle = title.includes(BUSINESS.name) ? title : `${title} | ${BUSINESS.name}`;
  const robotsContent = robots ?? (noindex ? "noindex,nofollow" : "index,follow");

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      <meta name="author" content={BUSINESS.name} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={BUSINESS.name} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={OG_IMAGE_ALT} />
      <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
      <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />

      <link rel="canonical" href={canonical} />
      <meta name="theme-color" content="#020617" />
    </Helmet>
  );
}
