/**
 * Industry and location pages (2026-10-13 correction): website-first, no outcome claims, no AI booking claims,
 * no text-back, no availability guarantees. Prices/terms come from content/offers.ts via the template.
 * Each page keeps its own short copy; portfolio comes from content/verified-work.ts.
 */
export type MarketPage = {
  path: string;
  kind: "industry" | "location";
  navLabel: string;
  indexBlurb: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  needsTitle: string;
  needs: string[];
  pilotNote?: string;
};

const pilotHvac =
  "For HVAC companies we're also running HVAC Call Recovery as a limited pilot: AI-assisted answering during the hours you set, capturing each caller's details and service request for your team to review. It's separate from website packages.";

export const INDUSTRY_SLUGS = ["hvac", "plumbing", "dental", "legal", "churches", "auto-repair"] as const;
export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number];

export const INDUSTRY_MARKET_PAGES: Record<IndustrySlug, MarketPage> = {
  hvac: {
    path: "/industries/hvac",
    kind: "industry",
    navLabel: "HVAC",
    indexBlurb: "Websites that make your services, service area and phone number easy to find when a system fails.",
    seoTitle: "Websites for HVAC Companies | Mercy Speaks Digital",
    seoDescription: "Conversion websites for HVAC companies: clear service pages, tap-to-call and quote requests. HVAC Call Recovery offered as a limited pilot.",
    h1: "Websites for HVAC companies",
    intro: "When a homeowner's AC or heat stops working, they look for a company they can call right away. Your website should show what you fix, where you work and how to reach you in seconds.",
    needsTitle: "What an HVAC website needs",
    needs: [
      "Separate pages for repair, installation and maintenance services",
      "Your service area stated clearly",
      "Tap-to-call at the top of every page on a phone",
      "A short service-request form for non-urgent work",
    ],
    pilotNote: pilotHvac,
  },
  plumbing: {
    path: "/industries/plumbing",
    kind: "industry",
    navLabel: "Plumbing",
    indexBlurb: "Clear service pages and quick ways to call or request a quote for plumbing companies.",
    seoTitle: "Websites for Plumbing Companies | Mercy Speaks Digital",
    seoDescription: "Conversion websites for plumbing companies: service pages, service area, tap-to-call and quote requests.",
    h1: "Websites for plumbing companies",
    intro: "People searching for a plumber usually need help soon. A clear website shows your services and makes it easy to call or ask for a quote.",
    needsTitle: "What a plumbing website needs",
    needs: [
      "Pages for the services you want more of, such as water heaters or drain work",
      "Your service area and business hours",
      "Tap-to-call and a quote-request form",
      "Licensing and warranty details you provide and approve",
    ],
  },
  dental: {
    path: "/industries/dental",
    kind: "industry",
    navLabel: "Dental",
    indexBlurb: "Calm, clear websites that help patients understand your services and contact your office.",
    seoTitle: "Websites for Dental Practices | Mercy Speaks Digital",
    seoDescription: "Conversion websites for dental practices: services, office information and easy ways for patients to call or send a request.",
    h1: "Websites for dental practices",
    intro: "New patients want to know what you offer, where you are and how to reach your office. Your website should answer those questions plainly.",
    needsTitle: "What a dental website needs",
    needs: [
      "Clear pages for the treatments you offer",
      "Office hours, location and a map",
      "Tap-to-call and a simple contact form for appointment requests your office confirms",
      "Team and office photos you supply or approve",
    ],
  },
  legal: {
    path: "/industries/legal",
    kind: "industry",
    navLabel: "Law firms",
    indexBlurb: "Professional websites that explain your practice areas and make it easy to request a consultation.",
    seoTitle: "Websites for Law Firms | Mercy Speaks Digital",
    seoDescription: "Conversion websites for law firms: practice-area pages, attorney profiles and consultation requests.",
    h1: "Websites for law firms",
    intro: "Someone looking for a lawyer wants to know quickly whether you handle their kind of matter. Your website should make that clear and make the next step easy.",
    needsTitle: "What a law firm website needs",
    needs: [
      "A page for each practice area",
      "Attorney profiles with the details you approve",
      "A consultation-request form and tap-to-call",
      "Any required disclaimers you provide",
    ],
  },
  churches: {
    path: "/industries/churches",
    kind: "industry",
    navLabel: "Churches",
    indexBlurb: "Welcoming church websites with service times, ministries and a clear plan-your-visit path.",
    seoTitle: "Websites for Churches | Mercy Speaks Digital",
    seoDescription: "Church websites with service times, ministries, events and a clear path for first-time guests. See our RCCG Shiloh Mega Parish client work.",
    h1: "Websites for churches",
    intro: "Guests and members check your website for service times, directions and what's happening this week. We build church websites that make that easy, especially on a phone.",
    needsTitle: "What a church website needs",
    needs: [
      "Service times on the homepage",
      "A Plan Your Visit page for first-time guests",
      "Ministry pages, events and recent messages",
      "A giving link and easy ways to contact the church office",
    ],
  },
  "auto-repair": {
    path: "/industries/auto-repair",
    kind: "industry",
    navLabel: "Auto repair",
    indexBlurb: "Straightforward websites that show your repair services and make it easy to call or request a quote.",
    seoTitle: "Websites for Auto Repair Shops | Mercy Speaks Digital",
    seoDescription: "Conversion websites for auto repair shops: service pages, hours, location, tap-to-call and quote requests.",
    h1: "Websites for auto repair shops",
    intro: "Drivers want to know whether you can fix their problem, when you're open and how to reach you. A clear website answers that before they call.",
    needsTitle: "What an auto repair website needs",
    needs: [
      "Pages for your main repair and maintenance services",
      "Hours, location and a map",
      "Tap-to-call and a quote-request form",
      "Shop photos and certifications you provide",
    ],
  },
};

export const ROOFING_PAGE: MarketPage = {
  path: "/roofing",
  kind: "industry",
  navLabel: "Roofing",
  indexBlurb: "Websites that show your roofing services and make it easy to request an inspection or quote.",
  seoTitle: "Websites for Roofing Companies | Mercy Speaks Digital",
  seoDescription: "Conversion websites for roofing companies: service pages, service area, project photos and quote requests.",
  h1: "Websites for roofing companies",
  intro: "Homeowners comparing roofers look for clear services, real project photos and an easy way to ask for an inspection or quote.",
  needsTitle: "What a roofing website needs",
  needs: [
    "Pages for repair, replacement and inspection services",
    "Your service area",
    "Project photos you supply",
    "Tap-to-call and a quote-request form",
  ],
};

export const LOCATION_PAGES: Record<"houston" | "richmond-tx", MarketPage> = {
  houston: {
    path: "/houston",
    kind: "location",
    navLabel: "Houston",
    indexBlurb: "Conversion websites for Houston-area businesses.",
    seoTitle: "Website Design for Houston Businesses | Mercy Speaks Digital",
    seoDescription: "Conversion websites and website care for Houston-area businesses. Packages from $997. See our Sugar Land church client work.",
    h1: "Websites for Houston-area businesses",
    intro: "We build conversion websites for growing businesses across the Houston area, including our client work for a church in nearby Sugar Land.",
    needsTitle: "What we focus on",
    needs: [
      "Clear pages for each service you offer",
      "Your Houston-area service locations stated plainly",
      "Tap-to-call and quote-request forms on every page",
      "Mobile-first layouts that load quickly",
    ],
  },
  "richmond-tx": {
    path: "/richmond-tx",
    kind: "location",
    navLabel: "Richmond, TX",
    indexBlurb: "Conversion websites for Richmond and Fort Bend County businesses.",
    seoTitle: "Website Design in Richmond, TX | Mercy Speaks Digital",
    seoDescription: "Conversion websites and website care for Richmond, TX and Fort Bend County businesses. Packages from $997.",
    h1: "Websites for Richmond, TX businesses",
    intro: "We build conversion websites for businesses in Richmond and across Fort Bend County, including our client work for a church in nearby Sugar Land.",
    needsTitle: "What we focus on",
    needs: [
      "Clear pages for each service you offer",
      "The Fort Bend County areas you serve",
      "Tap-to-call and quote-request forms on every page",
      "Mobile-first layouts that load quickly",
    ],
  },
};

export function getIndustryMarketPage(slug: string): MarketPage | undefined {
  return (INDUSTRY_SLUGS as readonly string[]).includes(slug) ? INDUSTRY_MARKET_PAGES[slug as IndustrySlug] : undefined;
}
