type JsonValue = Record<string, unknown> | Record<string, unknown>[];

function stripContext(obj: Record<string, unknown>) {
  const copy = { ...obj };
  delete copy["@context"];
  return copy;
}

/**
 * Renders JSON-LD for search and answer engines. Prefer factual data from site-config only.
 */
export function JsonLd({ data }: { data: JsonValue }) {
  const json = Array.isArray(data) ? data : [data];
  const payload =
    json.length === 1
      ? json[0]
      : { "@context": "https://schema.org", "@graph": json.map((node) => stripContext(node)) };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
