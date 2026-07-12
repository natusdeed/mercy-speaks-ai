/**
 * Local / geo landing pages. Copy must be genuinely local — not city-name swaps.
 * Do not invent client names, review counts, or star ratings here.
 */

export type LocalServiceLink = {
  label: string;
  href: string;
  blurb: string;
};

export type LocalFaq = {
  id: string;
  question: string;
  answer: string;
};

export type LocalPageConfig = {
  slug: "houston" | "richmond-tx";
  path: "/houston" | "/richmond-tx";
  /** Footer / nav label */
  navLabel: string;
  breadcrumbLabel: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  lead: string;
  /** Main local-context paragraphs (unique per page) */
  contextParagraphs: string[];
  /** Cities listed in LocalBusiness areaServed */
  areaServedCities: string[];
  portfolio: {
    title: string;
    description: string;
    href: string;
  };
  servicesIntro: string;
  serviceLinks: LocalServiceLink[];
  industryLinks: LocalServiceLink[];
  faqs: LocalFaq[];
  ctaTitle: string;
  ctaDescription: string;
};

export const LOCAL_PAGES: Record<"houston" | "richmond-tx", LocalPageConfig> = {
  houston: {
    slug: "houston",
    path: "/houston",
    navLabel: "Houston, TX",
    breadcrumbLabel: "Houston",
    seoTitle: "Houston Web Design & AI Receptionists | Mercy Speaks Digital",
    seoDescription:
      "Houston-metro web design and AI receptionists from Fort Bend. Sites, missed-call text-back, and booking automation for local service businesses.",
    h1: "Web Design & AI Receptionists in Houston, TX",
    lead:
      "Houston small businesses win on speed to answer and clarity online—not on who has the flashiest billboard on I-10. We build the websites and AI phone systems that turn metro searchers into booked jobs.",
    contextParagraphs: [
      "The Houston market is dense with service businesses that live and die by the phone: HVAC and plumbing trucks racing summer heat, roofers after Gulf storms, auto shops along the feeder roads, and dental and medical corridors from the Medical Center out through the suburbs. When those lines go to voicemail during a lunch rush or after 6 p.m., the next Google listing gets the work.",
      "Mercy Speaks Digital is based in Richmond in Fort Bend County—not a downtown agency floor. We work across the metro every week: Sugar Land and Missouri City, Katy and the Energy Corridor, Richmond and Rosenberg, The Woodlands and Pearland. That means kickoffs and demos can happen in person when it helps, and remote when your calendar is already packed.",
      "If you already have a site that looks fine on a laptop but buries your service area, phone number, or booking path on mobile, we rebuild for how Houston customers actually search. If your phones overflow when the weather turns or the waiting room fills, we install an AI receptionist with missed-call text-back so after-hours rings still become appointments.",
    ],
    areaServedCities: [
      "Houston",
      "Sugar Land",
      "Katy",
      "Richmond",
      "The Woodlands",
      "Pearland",
    ],
    portfolio: {
      title: "Church website in Sugar Land",
      description:
        "We designed and built the live site for RCCG Shiloh Mega Parish in Sugar Land—service times, ministries, and a guest-friendly mobile experience. It is a real Fort Bend project you can open and click through.",
      href: "https://www.rccgshilohmega.org/",
    },
    servicesIntro:
      "Most Houston clients start with a site refresh, an AI receptionist, or both. Here is where those paths live on this site:",
    serviceLinks: [
      {
        label: "Website design & development",
        href: "/services/website-design",
        blurb: "Fast, mobile-first sites that make service area, phone, and booking obvious.",
      },
      {
        label: "AI phone receptionist",
        href: "/services/ai-phone-receptionist",
        blurb: "24/7 answering, lead capture, and missed-call text-back for busy desks.",
      },
      {
        label: "Appointment automation",
        href: "/services/appointment-automation",
        blurb: "Reminders and booking flows that cut no-shows without adding staff.",
      },
      {
        label: "Pricing",
        href: "/pricing",
        blurb: "Starter, Growth, and Pro plans—see which tier fits your call volume.",
      },
    ],
    industryLinks: [
      {
        label: "HVAC",
        href: "/industries/hvac",
        blurb: "Peak-season overflow and after-hours emergency triage.",
      },
      {
        label: "Plumbing",
        href: "/industries/plumbing",
        blurb: "Burst-pipe and weekend call coverage.",
      },
      {
        label: "Dental",
        href: "/industries/dental",
        blurb: "Front-desk overflow and recall reminders with privacy-aware scoping.",
      },
      {
        label: "Churches",
        href: "/industries/churches",
        blurb: "Service times, events, prayer-line routing, and church sites.",
      },
      {
        label: "Auto repair",
        href: "/industries/auto-repair",
        blurb: "Appointment booking and status-call deflection.",
      },
      {
        label: "Legal",
        href: "/industries/legal",
        blurb: "After-hours intake and consultation booking.",
      },
    ],
    faqs: [
      {
        id: "houston-in-person",
        question: "Do you meet in person?",
        answer:
          "Yes, when it helps. We are based in Richmond (Fort Bend County) and can meet across the Houston metro—Sugar Land, Katy, The Woodlands, Pearland, and nearby. Many kickoffs and demos also run on video if that is easier for your team.",
      },
      {
        id: "houston-only",
        question: "Do you only serve Houston?",
        answer:
          "No. Houston and Fort Bend are our home base, and we work with businesses across the U.S. remotely. Local pages like this one exist because many of our clients are here—not because we refuse work outside the metro.",
      },
      {
        id: "houston-contractors",
        question: "Do you work with Houston contractors and trades?",
        answer:
          "Yes. HVAC, plumbing, roofing, and auto repair are core fits—especially shops that lose after-hours and storm-driven calls. See our industry pages for trade-specific workflows.",
      },
      {
        id: "houston-dental",
        question: "Can you help dental offices in the Houston medical corridors?",
        answer:
          "Yes. We cover front-desk overflow, reminders, and booking with HIPAA-aware configuration scoped during onboarding. We do not claim HIPAA certification. Details are on the dental industry page.",
      },
    ],
    ctaTitle: "Book a Houston-metro demo",
    ctaDescription:
      "Walk through website options or an AI receptionist for your service area—no fabricated case studies, just a clear plan for your phones and site.",
  },

  "richmond-tx": {
    slug: "richmond-tx",
    path: "/richmond-tx",
    navLabel: "Richmond, TX",
    breadcrumbLabel: "Richmond, TX",
    seoTitle: "Website Design & AI in Richmond, TX | Mercy Speaks Digital",
    seoDescription:
      "Website design and AI receptionists based in Richmond, TX 77407. Fort Bend web design and booking automation for Richmond, Rosenberg, and Sugar Land.",
    h1: "Website Design & AI Automation in Richmond, TX 77407",
    lead:
      "We are a Fort Bend shop—based in Richmond 77407—building websites and AI phone systems for businesses that answer to neighbors, not national call centers.",
    contextParagraphs: [
      "Richmond and Rosenberg sit at the center of Fort Bend growth: new neighborhoods, busy FM corridors, and owners who still pick up the phone when a tech is on a job. That is when a clear site and after-hours AI receptionist matter—so a homeowner in Greatwood is not stuck on voicemail.",
      "From 77407 we meet across Fort Bend and into Sugar Land or Katy when a whiteboard beats another Zoom. Our Sugar Land build for RCCG Shiloh Mega Parish shows the quality we ship from this zip.",
    ],
    areaServedCities: [
      "Richmond",
      "Rosenberg",
      "Sugar Land",
      "Missouri City",
      "Katy",
      "Houston",
    ],
    portfolio: {
      title: "Sugar Land church site (nearby)",
      description:
        "RCCG Shiloh Mega Parish in Sugar Land—designed and developed by Mercy Speaks Digital. Open the live site for service times and guest paths built for Fort Bend ministries.",
      href: "https://www.rccgshilohmega.org/",
    },
    servicesIntro: "Start with the service that matches your bottleneck:",
    serviceLinks: [
      {
        label: "Website design",
        href: "/services/website-design",
        blurb: "Local-first sites with clear NAP, services, and mobile booking paths.",
      },
      {
        label: "AI phone receptionist",
        href: "/services/ai-phone-receptionist",
        blurb: "Answer Fort Bend after-hours and overflow without a night desk.",
      },
      {
        label: "Industries we serve",
        href: "/industries",
        blurb: "HVAC, plumbing, dental, churches, auto repair, and more.",
      },
      {
        label: "Houston metro overview",
        href: "/houston",
        blurb: "Wider metro context if you serve beyond Fort Bend.",
      },
    ],
    industryLinks: [
      {
        label: "Churches",
        href: "/industries/churches",
        blurb: "Service times, events, and prayer-line routing.",
      },
      {
        label: "HVAC",
        href: "/industries/hvac",
        blurb: "Heat-wave overflow across Fort Bend summers.",
      },
      {
        label: "Plumbing",
        href: "/industries/plumbing",
        blurb: "Weekend emergency intake for west-side homes.",
      },
      {
        label: "Dental",
        href: "/industries/dental",
        blurb: "Front-desk coverage for suburban practices.",
      },
    ],
    faqs: [
      {
        id: "richmond-in-person",
        question: "Do you meet in person in Richmond?",
        answer:
          "Yes. We are based in Richmond 77407 and can meet in Fort Bend or nearby Sugar Land / Katy. Video demos work when that is faster.",
      },
      {
        id: "richmond-only-houston",
        question: "Do you only serve Houston?",
        answer:
          "Fort Bend and Houston are home base; we also work with U.S. clients remotely. Local pages show where we are grounded—not a hard service fence.",
      },
      {
        id: "richmond-fort-bend",
        question: "What does “Fort Bend focus” mean for a project?",
        answer:
          "Kickoffs can be local, and your site or AI scripts can name real service areas (Richmond, Rosenberg, Sugar Land, nearby ZIPs) without generic filler.",
      },
    ],
    ctaTitle: "Talk with a Richmond-based team",
    ctaDescription:
      "Book a short demo for website design or AI automation—built from 77407 for Fort Bend businesses first.",
  },
};

export function getLocalPage(slug: string): LocalPageConfig | undefined {
  if (slug === "houston" || slug === "richmond-tx") {
    return LOCAL_PAGES[slug];
  }
  return undefined;
}
