import { Helmet } from "@/lib/react-helmet-compat";

type JsonValue = Record<string, unknown> | Record<string, unknown>[];

function stripContext(obj: Record<string, unknown>) {
  const copy = { ...obj };
  delete copy["@context"];
  return copy;
}

/**
 * Renders JSON-LD for search and answer engines.
 * Uses Helmet so the script lives in <head> on the client; prerender also hoists
 * `application/ld+json` scripts into <head> so crawlers see them without JS.
 */
export function JsonLd({ data }: { data: JsonValue }) {
  const json = Array.isArray(data) ? data : [data];
  const payload =
    json.length === 1
      ? json[0]
      : { "@context": "https://schema.org", "@graph": json.map((node) => stripContext(node)) };

  // Escape `<` so the payload cannot break out of the script element.
  const html = JSON.stringify(payload).replace(/</g, "\\u003c");

  return (
    <Helmet>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: html }} />
    </Helmet>
  );
}
