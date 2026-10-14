import { DAVITA_AUTO_LOGISTICS_URL } from "@/lib/site-config";

/**
 * Single source of truth for every portfolio section (Home, /websites, /results, /services/website-design,
 * industry and location pages). Only items with verified evidence.
 * "features" lists only things checked on the live project site (2026-10-13, HTTP 200, page markup reviewed).
 * PRIME Global Logistics is omitted pending Donatus's confirmation of client permission
 * (assets remain in /public/portfolio, unreferenced). No results, metrics, or testimonials are claimed.
 */
export type WorkItem = {
  title: string;
  label: "Client work" | "Demo build";
  /** One-line summary for compact lists. */
  description: string;
  need: string;
  built: string;
  features: string[];
  href: string;
  linkText: string;
  image: string;
  width: number;
  height: number;
};

export const VERIFIED_WORK: WorkItem[] = [
  {
    title: "RCCG Shiloh Mega Parish",
    label: "Client work",
    description: "Church website in Sugar Land with service times, ministries, and a guest-friendly mobile experience.",
    need: "A Sugar Land church needed first-time guests and members to find service times, plan a visit and keep up with messages and events, especially on a phone.",
    built: "A mobile-friendly church website with a clear welcome, the weekly schedule on the homepage, and dedicated pages for visiting, sermons, ministries and events.",
    features: [
      "Service schedule on the homepage",
      "Plan Your Visit page for first-time guests",
      "Sermon page with watch and listen options",
      "Ministry pages and an events calendar",
      "Online giving link and tap-to-call contact",
    ],
    href: "https://www.rccgshilohmega.org/",
    linkText: "Visit the live site",
    image: "/portfolio/rccg-shiloh-church-960.webp",
    width: 960,
    height: 442,
  },
  {
    title: "Davita Auto Logistics",
    label: "Demo build",
    description: "Demo build for a solar-supply and shipping brand: product catalog, shipment booking and quote requests.",
    need: "A solar-supply and international shipping business concept needed to present its products and shipping options clearly and collect detailed quote requests.",
    built: "A demo website with a product catalog, shipping options by item type, and a step-by-step quote request.",
    features: [
      "Product catalog for panels, inverters, batteries and accessories",
      "Step-by-step quote request form",
      "Book Shipment path for standard items, vehicles and solar equipment",
      "FAQ and product gallery",
      "Tap-to-call and WhatsApp contact",
    ],
    href: DAVITA_AUTO_LOGISTICS_URL,
    linkText: "View the demo build",
    image: "/portfolio/davita-auto-logistics-960.webp",
    width: 960,
    height: 432,
  },
];
