import {
  absoluteUrl,
  BRAND_TAGLINE,
  BUSINESS,
  LOGO_PATH,
} from "@/lib/site-config";
import type { AiReceptionistTier, WebsiteTier } from "@/content/pricing-tiers";

const CONTEXT = "https://schema.org";

export const ORGANIZATION_ID = `${absoluteUrl("/")}#organization`;

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

function areaServedNodes() {
  return BUSINESS.areaServed.map((name) =>
    name === "United States"
      ? { "@type": "Country", name }
      : { "@type": "AdministrativeArea", name }
  );
}

/** Topics we work on—factual, not keyword stuffing; helps answer engines summarize the business. */
const KNOWS_ABOUT = [
  "Website design and development",
  "AI phone receptionist systems",
  "Business workflow automation",
  "Lead capture and booking automation",
] as const;

/**
 * Site-wide Organization + ProfessionalService (LocalBusiness subtype).
 * All fields come from `BUSINESS` / `BRAND_TAGLINE` in site-config.
 */
export function organizationSchema() {
  const logoUrl = absoluteUrl(BUSINESS.logoPath ?? LOGO_PATH);
  return {
    "@context": CONTEXT,
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORGANIZATION_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BRAND_TAGLINE,
    url: absoluteUrl("/"),
    logo: logoUrl,
    image: logoUrl,
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    address: postalAddress(),
    areaServed: areaServedNodes(),
    openingHours: BUSINESS.openingHours,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
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
    publisher: { "@id": ORGANIZATION_ID },
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
  /** Industry / vertical audience for industry landing pages */
  audience?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": CONTEXT,
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType ?? input.name,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: areaServedNodes(),
    url: absoluteUrl(input.path),
  };
  if (input.audience) {
    schema.audience = {
      "@type": "Audience",
      audienceType: input.audience,
    };
  }
  return schema;
}

export function contactPageSchema() {
  return {
    "@context": CONTEXT,
    "@type": "ContactPage",
    name: `Contact ${BUSINESS.name}`,
    description: `Contact ${BUSINESS.name} for website, AI receptionist, and automation inquiries.`,
    url: absoluteUrl("/contact"),
    mainEntity: { "@id": ORGANIZATION_ID },
  };
}

/**
 * Local geo landing pages — LocalBusiness + ProfessionalService with city-level areaServed.
 * Address / NAP still come from BUSINESS (Richmond, TX 77407).
 */
export function localBusinessSchema(input: {
  path: string;
  description: string;
  areaServedCities: string[];
}) {
  const logoUrl = absoluteUrl(BUSINESS.logoPath ?? LOGO_PATH);
  return {
    "@context": CONTEXT,
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${absoluteUrl(input.path)}#localbusiness`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: input.description,
    url: absoluteUrl(input.path),
    logo: logoUrl,
    image: logoUrl,
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    address: postalAddress(),
    areaServed: input.areaServedCities.map((name) => ({
      "@type": "City",
      name,
    })),
    openingHours: BUSINESS.openingHours,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [...BUSINESS.sameAs],
    parentOrganization: { "@id": ORGANIZATION_ID },
    knowsAbout: [...KNOWS_ABOUT],
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

/** Blog article — BlogPosting for rich results / answer engines. */
export function blogPostingSchema(input: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
  imagePath?: string;
  tags?: string[];
}) {
  const url = absoluteUrl(input.path);
  const image = absoluteUrl(input.imagePath ?? LOGO_PATH);
  const schema: Record<string, unknown> = {
    "@context": CONTEXT,
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    author: {
      "@type": "Organization",
      name: input.authorName,
      url: absoluteUrl("/"),
    },
    publisher: { "@id": ORGANIZATION_ID },
    image,
    inLanguage: "en-US",
  };
  if (input.tags && input.tags.length > 0) {
    schema.keywords = input.tags.join(", ");
  }
  return schema;
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

function offerNode(input: {
  name: string;
  description?: string;
  price?: number | null;
  priceCurrency?: string;
  url?: string;
}) {
  const offer: Record<string, unknown> = {
    "@type": "Offer",
    name: input.name,
    priceCurrency: input.priceCurrency ?? "USD",
    availability: "https://schema.org/InStock",
    seller: { "@id": ORGANIZATION_ID },
  };
  if (input.description) offer.description = input.description;
  if (input.url) offer.url = input.url;
  if (input.price != null) {
    offer.price = String(input.price);
  }
  return offer;
}

/**
 * Pricing page OfferCatalog — AI receptionist monthly plans + website tiers.
 * Pass the same arrays rendered in the UI (`AI_RECEPTIONIST_TIERS`, `WEBSITE_TIERS`).
 */
export function offerCatalogSchema(input: {
  path?: string;
  aiTiers: AiReceptionistTier[];
  websiteTiers: WebsiteTier[];
}) {
  const path = input.path ?? "/pricing";
  const url = absoluteUrl(path);
  const aiOffers = input.aiTiers.map((tier) =>
    offerNode({
      name: `${tier.name} — AI receptionist`,
      description: `${tier.previewDescription} ${tier.setup}. ${tier.callVolume}.`,
      price: tier.price,
      priceCurrency: tier.priceCurrency,
      url,
    })
  );
  const websiteOffers = input.websiteTiers.map((tier) =>
    offerNode({
      name: tier.name,
      description: tier.audience,
      price: tier.price,
      priceCurrency: tier.priceCurrency,
      url,
    })
  );

  return {
    "@context": CONTEXT,
    "@type": "OfferCatalog",
    name: `${BUSINESS.name} pricing`,
    description: `AI receptionist plans and website packages from ${BUSINESS.name}.`,
    url,
    itemListElement: [...aiOffers, ...websiteOffers].map((offer, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: offer,
    })),
  };
}
