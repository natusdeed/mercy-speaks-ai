import { DAVITA_AUTO_LOGISTICS_URL } from "@/lib/site-config";

/**
 * Single source of truth for portfolio items shown on Home, /websites and /results.
 * Only items with verified evidence. Labels: "Client work" only where the repo states we built the live client site.
 * PRIME Global Logistics is omitted pending Donatus's confirmation of client permission
 * (assets remain in /public/portfolio, unreferenced). No results, metrics, or testimonials are claimed.
 */
export type WorkItem = {
  title: string;
  label: "Client work" | "Our own website" | "Demo build";
  description: string;
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
    href: "https://www.rccgshilohmega.org/",
    linkText: "Visit the live site",
    image: "/portfolio/rccg-shiloh-church-960.webp",
    width: 960,
    height: 442,
  },
  {
    title: "Davita Auto Logistics",
    label: "Demo build",
    description: "Demo build for a clean-energy logistics brand: solar supply, auto transport, and quote flows.",
    href: DAVITA_AUTO_LOGISTICS_URL,
    linkText: "View the demo build",
    image: "/portfolio/davita-auto-logistics-960.webp",
    width: 960,
    height: 432,
  },
];
