import { absoluteUrl, BRAND_TAGLINE, BUSINESS, DEFAULT_OG_IMAGE_PATH } from "@/lib/site-config";

const CONTEXT = "https://schema.org";

const ORG_ID = `${absoluteUrl("/")}#organization`;

function postalAddress() {
  const a: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: BUSINESS.address.addressLocality,
    addressRegion: BUSINESS.address.addressRegion,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.addressCountry,
  };
  if (BUSINESS.address.streetAddress) {
    a.streetAddress = BUSINESS.address.streetAddress;
  }
  return a;
}

/** Topics we work on—factual, not keyword stuffing; helps answer engines summarize the business. */
const KNOWS_ABOUT = [
  "Website design and development",
  "AI phone receptionist systems",
  "Business workflow automation",
  "Lead capture and booking automation",
] as const;

export function organizationSchema() {
  return {
    "@context": CONTEXT,
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": ORG_ID,
    name: BUSINESS.name,
    description: BRAND_TAGLINE,
    url: absoluteUrl("/"),
    logo: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    address: postalAddress(),
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    sameAs: [...BUSINESS.sameAs],
    knowsAbout: [...KNOWS_ABOUT],
  };
}

export function websiteSchema() {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: BUSINESS.name,
    url: absoluteUrl("/"),
    description: BRAND_TAGLINE,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": CONTEXT,
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType ?? input.name,
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    url: absoluteUrl(input.path),
  };
}

export function contactPageSchema() {
  return {
    "@context": CONTEXT,
    "@type": "ContactPage",
    name: `Contact ${BUSINESS.name}`,
    description: `Contact ${BUSINESS.name} for website, AI receptionist, and automation inquiries.`,
    url: absoluteUrl("/contact"),
    mainEntity: { "@id": ORG_ID },
  };
}

export function webPageSchema(input: { name: string; description: string; path: string }) {
  return {
    "@context": CONTEXT,
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    /* Inline WebSite avoids a dangling @id when this page’s JSON-LD graph omits websiteSchema() */
    isPartOf: {
      "@type": "WebSite",
      name: BUSINESS.name,
      url: absoluteUrl("/"),
    },
    inLanguage: "en-US",
  };
}

/** Service hub / directory lists for crawlers and answer engines */
export function itemListSchema(input: { name: string; items: { name: string; path: string }[] }) {
  return {
    "@context": CONTEXT,
    "@type": "ItemList",
    name: input.name,
    numberOfItems: input.items.length,
    itemListElement: input.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "WebPage",
        name: item.name,
        url: absoluteUrl(item.path),
      },
    })),
  };
}
