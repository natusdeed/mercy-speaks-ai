/**
 * Industry landing pages under /industries/:slug.
 * Each page must keep unique body copy — do not share paragraphs across industries.
 */

export type IndustryPageSlug =
  | "hvac"
  | "plumbing"
  | "dental"
  | "legal"
  | "churches"
  | "auto-repair";

export type IndustryFaq = {
  id: string;
  question: string;
  answer: string;
};

export type IndustryInstallItem = {
  title: string;
  description: string;
};

export type IndustryStep = {
  title: string;
  description: string;
};

export type IndustryPricingPointer = {
  tierName: string;
  reason: string;
};

export type IndustryPageConfig = {
  slug: IndustryPageSlug;
  path: `/industries/${IndustryPageSlug}`;
  /** Short nav / card label */
  navLabel: string;
  /** One-line index description */
  indexBlurb: string;
  /** Schema.org audience label */
  audience: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  /** Industry-specific pain under the H1 */
  heroPain: string;
  problemTitle: string;
  problemLead: string;
  problems: string[];
  installTitle: string;
  installLead: string;
  installItems: IndustryInstallItem[];
  howTitle: string;
  steps: IndustryStep[];
  faqs: IndustryFaq[];
  pricing: IndustryPricingPointer;
  ctaTitle: string;
  ctaDescription: string;
  /** Optional extra HTML-safe note (e.g. HIPAA-aware, portfolio link text) */
  complianceNote?: string;
  portfolioNote?: {
    label: string;
    href: string;
    description: string;
  };
};

export const INDUSTRY_PAGE_ORDER: IndustryPageSlug[] = [
  "hvac",
  "plumbing",
  "dental",
  "legal",
  "churches",
  "auto-repair",
];

export const INDUSTRY_PAGES: Record<IndustryPageSlug, IndustryPageConfig> = {
  hvac: {
    slug: "hvac",
    path: "/industries/hvac",
    navLabel: "HVAC",
    indexBlurb:
      "After-hours emergencies, peak-season overflow, and dispatch triage so heat/AC calls become booked jobs.",
    audience: "HVAC companies and mechanical contractors",
    seoTitle: "AI Receptionist for HVAC | Mercy Speaks Digital",
    seoDescription:
      "AI receptionist and missed-call text-back for HVAC companies—capture after-hours emergencies and peak-season overflow without adding CSRs.",
    h1: "AI Receptionist & Missed-Call Text Back for HVAC Companies",
    heroPain:
      "When a compressor dies at 9 p.m. or a heat wave triples your inbound volume, the shop that answers first wins the ticket. Voicemail is how your competitor steals the job while your techs are still in attics.",
    problemTitle: "The problem",
    problemLead:
      "HVAC phones do not fail evenly—they fail exactly when revenue is highest. Missed rings during peak season and after-hours emergencies are not “lost leads.” They are booked jobs sitting on someone else’s schedule.",
    problems: [
      "Emergency no-cool / no-heat calls after closing go to voicemail; homeowners call the next company that picks up.",
      "Peak summer and winter spikes overwhelm the front desk—hold times climb, callers abandon, and membership renewals never get offered.",
      "Technicians cannot triage while on a rooftop; dispatch gets incomplete addresses, equipment ages, and symptom notes.",
      "Missed-call follow-up is manual or nonexistent, so the homeowner who hung up at lunch books a competitor by dinner.",
    ],
    installTitle: "What we install",
    installLead:
      "A 24/7 AI receptionist trained on your service menu, travel radius, membership rules, and urgency cues—plus automations that keep overflow from becoming voicemail.",
    installItems: [
      {
        title: "AI phone receptionist",
        description:
          "Answers every ring with your script: service area check, emergency vs. maintenance, membership status prompts, and the next real arrival window your calendar can keep.",
      },
      {
        title: "Missed-call text-back",
        description:
          "If a line drops or a tech’s cell goes unanswered, an SMS goes out in seconds with a booking link and a short form so the homeowner can still book without calling again.",
      },
      {
        title: "Dispatch triage notes",
        description:
          "Capture system type, age, error codes if known, access notes, and preferred arrival windows so the right tech shows up with the right truck stock.",
      },
      {
        title: "Tune-up & membership capture",
        description:
          "When the call is not an emergency, the agent can offer maintenance slots and membership inquiries instead of letting routine revenue slip during peak chaos.",
      },
    ],
    howTitle: "How it works for HVAC",
    steps: [
      {
        title: "1. Map your dispatch rules",
        description:
          "We encode after-hours fees, emergency definitions, ZIP coverage, and which jobs need a senior tech versus a tune-up tech—so the AI never overpromises an ETA you cannot hit.",
      },
      {
        title: "2. Connect calendar and notifications",
        description:
          "Bookings and lead summaries land in your calendar and inbox (or CRM). Your on-call tech gets the context; office staff wake up to a clean queue instead of a voicemail pile.",
      },
      {
        title: "3. Run peak season without adding CSRs",
        description:
          "Overflow and nights are covered. You review transcripts and booked jobs weekly, then tighten scripts—without hiring a seasonal phone team you will lay off in October.",
      },
    ],
    faqs: [
      {
        id: "hvac-after-hours",
        question: "Can the AI handle true HVAC emergencies after hours?",
        answer:
          "Yes. We define emergencies for your shop and train the agent to book priority windows or escalate to on-call when a human must decide.",
      },
      {
        id: "hvac-peak",
        question: "Will it keep up when a heat wave floods the phones?",
        answer:
          "That is the main use case. AI answers overflow instantly; missed-call text-back recovers callers who hang up mid-ring.",
      },
      {
        id: "hvac-dispatch",
        question: "How does dispatch get usable notes?",
        answer:
          "The agent captures address, system type, age, symptoms, and access details, then posts a structured summary with the booking.",
      },
      {
        id: "hvac-pricing-fit",
        question: "Which plan do most HVAC companies choose?",
        answer:
          "Most land on Mercy Growth for peak volume, SMS automation, and booking sync. Multi-location shops often move to Pro.",
      },
      {
        id: "hvac-sounds-robot",
        question: "Will customers know they are talking to AI?",
        answer:
          "We configure disclosure language you approve. Callers care that someone answered and booked them before the house got hotter.",
      },
    ],
    pricing: {
      tierName: "Mercy Growth",
      reason:
        "Growth covers peak call volume, SMS follow-up, and booking sync so emergencies and tune-ups convert—without a seasonal CSR desk.",
    },
    ctaTitle: "Hear how HVAC overflow sounds with Mercy on the line",
    ctaDescription:
      "Play the live demo, then book a walkthrough of after-hours triage, text-back, and dispatch notes for your service area.",
  },

  plumbing: {
    slug: "plumbing",
    path: "/industries/plumbing",
    navLabel: "Plumbing",
    indexBlurb:
      "Burst-pipe emergencies and weekend calls answered instantly—with triage that books the right tech before water damage spreads.",
    audience: "Plumbing and drain companies",
    seoTitle: "AI Receptionist for Plumbing | Mercy Speaks Digital",
    seoDescription:
      "AI receptionist for plumbing companies—answer burst-pipe and weekend emergencies 24/7, triage shutoffs, and book jobs before callers dial the next plumber.",
    h1: "AI Receptionist & Missed-Call Text Back for Plumbing Companies",
    heroPain:
      "Water does not wait for Monday. A burst supply line at Saturday brunch or a sewer backup on a holiday weekend will go to whichever plumber answers first—and that is rarely the shop still finishing a slab leak across town.",
    problemTitle: "The problem",
    problemLead:
      "Plumbing emergencies compress decision time. Homeowners who hit voicemail do not leave thoughtful messages; they scroll Google and call the next listing with a green “Open” badge.",
    problems: [
      "Burst pipes and active leaks need an immediate answer plus shutoff guidance—not a callback two hours later when the ceiling is already soaked.",
      "Weekend and holiday volume hits when the office is closed; cell phones on trucks get buried under job-site noise.",
      "Drain, water heater, and jetting leads mix with true emergencies; without triage, the wrong tech rolls or the urgent job waits behind a routine snake.",
      "After-hours rate questions get answered inconsistently—or not at all—so price-shopping callers bounce before you can quote.",
    ],
    installTitle: "What we install",
    installLead:
      "An AI receptionist built for plumbing urgency: shutoff prompts, emergency vs. routine sorting, and automations that recover the callers who hang up mid-ring.",
    installItems: [
      {
        title: "AI phone receptionist",
        description:
          "Answers with your emergency script—asks if water is still running, whether the main is shut, and whether the issue is sewer, supply, or fixture—then books the right skill set.",
      },
      {
        title: "Missed-call text-back",
        description:
          "Anyone who cannot get through gets an SMS with a short intake form and booking options so a soaked homeowner is not left refreshing your voicemail.",
      },
      {
        title: "Weekend & after-hours coverage",
        description:
          "Your published emergency fee and arrival windows stay consistent every night and holiday—no improvising rates over a noisy truck radio.",
      },
      {
        title: "Job-type routing",
        description:
          "Separate hydro-jetting, water heater, slab leak, and drain calls so dispatch does not send a junior tech to a main-line backup.",
      },
    ],
    howTitle: "How it works for plumbing",
    steps: [
      {
        title: "1. Define emergency vs. next-day work",
        description:
          "We document shutoff guidance, fee language, and which symptoms escalate to on-call. The AI follows that playbook instead of guessing under pressure.",
      },
      {
        title: "2. Wire booking and tech alerts",
        description:
          "Confirmed jobs and structured notes hit your calendar and notify the on-call plumber. Photos or video links from the text-back form travel with the ticket when you want them.",
      },
      {
        title: "3. Protect weekend revenue",
        description:
          "Saturday floods and holiday backups stop being a coin flip. You review booked emergencies weekly and refine which ZIPs and job types stay on the emergency board.",
      },
    ],
    faqs: [
      {
        id: "plumb-burst",
        question: "Can the AI help a caller with a burst pipe right now?",
        answer:
          "It walks through your approved shutoff guidance, collects address and access notes, then books or escalates. It does not replace a plumber on site—it turns the ring into a dispatched job.",
      },
      {
        id: "plumb-weekend",
        question: "Do you cover weekends and holidays?",
        answer:
          "Yes. Weekend and after-hours coverage is the core plumbing use case, using the emergency rates and windows you approve.",
      },
      {
        id: "plumb-fees",
        question: "How are after-hours fees explained?",
        answer:
          "You write the fee language; we put it in the script so sticker shock happens on the phone—not in the driveway.",
      },
      {
        id: "plumb-tier",
        question: "What pricing tier fits most plumbing shops?",
        answer:
          "Most choose Mercy Growth for volume, SMS automation, and booking. Solo operators sometimes start on Starter and upgrade when nights stay busy.",
      },
      {
        id: "plumb-integrate",
        question: "Will this work with our existing scheduling tools?",
        answer:
          "We integrate with common calendars and many field-service tools. Unusual stacks get scoped in the demo before install week.",
      },
    ],
    pricing: {
      tierName: "Mercy Growth",
      reason:
        "Growth pairs after-hours answering with missed-call text-back and booking sync—the combination that protects weekend emergency tickets.",
    },
    ctaTitle: "See plumbing emergency intake on a live demo",
    ctaDescription:
      "Hear a burst-pipe style call, then book a demo to map your shutoff script, fees, and weekend dispatch rules.",
  },

  dental: {
    slug: "dental",
    path: "/industries/dental",
    navLabel: "Dental",
    indexBlurb:
      "Front-desk overflow, recall reminders, and no-show reduction—with HIPAA-aware configuration scoped during onboarding.",
    audience: "Dental offices and group practices",
    seoTitle: "AI Receptionist for Dental Offices | Mercy Speaks Digital",
    seoDescription:
      "AI receptionist for dental offices—cover front-desk overflow, automate recall reminders, and reduce no-shows with HIPAA-aware setup scoped at onboarding.",
    h1: "AI Receptionist for Dental Offices",
    heroPain:
      "Your hygienists are fully booked and the front desk is juggling check-in, insurance questions, and a ringing multi-line. New patients who hear endless hold music book the practice that answered on the first ring—often across the street.",
    problemTitle: "The problem",
    problemLead:
      "Dental phones fail quietly. Missed new-patient inquiries, unconfirmed hygiene visits, and recall lists that never get worked show up as empty chairs—not as an obvious “missed call” report.",
    problems: [
      "Front-desk overflow during morning rush and lunch means new-patient calls bounce to voicemail while staff seat patients.",
      "Recall and reminder outreach is inconsistent—hygiene openings sit open while the list ages in the PMS.",
      "No-shows and late cancels wreck the schedule; confirming by phone alone does not scale across two or three providers.",
      "After-hours emergency dental calls (toothache, trauma, swelling) need calm triage and next-open booking—not a full inbox on Monday.",
    ],
    installTitle: "What we install",
    installLead:
      "An AI receptionist that covers overflow and after-hours, plus reminder and recall automations scoped to how your office already runs—without pretending AI replaces your treatment coordinator.",
    installItems: [
      {
        title: "AI phone receptionist",
        description:
          "Answers overflow and after-hours: new-patient scheduling, office hours, insurance-plan FAQs you approve, and routing of clinical questions to your team with a clean summary.",
      },
      {
        title: "Recall & reminder automation",
        description:
          "Outbound reminders and recall nudges (SMS/email as scoped) that confirm appointments and fill hygiene openings—with quiet hours and opt-out handling built into the design.",
      },
      {
        title: "No-show reduction workflows",
        description:
          "Confirmation sequences and same-day fill offers for cancellations so empty chairs get offered to waitlist patients instead of staying dark.",
      },
      {
        title: "HIPAA-aware configuration",
        description:
          "Patient-privacy guardrails are scoped during onboarding—what the agent may collect, what must escalate to a human, and how recordings/disclosures are worded. We do not claim HIPAA certification; we configure systems carefully for dental workflows.",
      },
    ],
    howTitle: "How it works for dental offices",
    steps: [
      {
        title: "1. Scope privacy and escalation rules",
        description:
          "During onboarding we define HIPAA-aware configuration for your practice: allowed intake fields, clinical escalation triggers, disclosure language, and who receives summaries. Sensitive decisions stay with your team.",
      },
      {
        title: "2. Connect scheduling and reminder flows",
        description:
          "We wire the AI to your booking rules and set confirmation/recall sequences that match provider templates and office hours—not a generic spa script.",
      },
      {
        title: "3. Cover the desk without burning out staff",
        description:
          "Overflow and nights are answered. Front desk keeps complex insurance and treatment conversations; AI handles volume, reminders, and routine scheduling so chairs stay full.",
      },
    ],
    faqs: [
      {
        id: "dental-hipaa",
        question: "Are you HIPAA certified?",
        answer:
          "No. We do not claim HIPAA certification. For dental clients we apply HIPAA-aware configuration scoped during onboarding—privacy guardrails, escalation rules, and disclosure language. Your compliance obligations remain with your practice.",
      },
      {
        id: "dental-overflow",
        question: "Can this cover our front desk during the morning rush?",
        answer:
          "Yes. The agent books routine and new-patient openings per your rules while staff stay with patients in the lobby.",
      },
      {
        id: "dental-noshow",
        question: "How does this reduce no-shows?",
        answer:
          "Confirmation reminders and optional waitlist fill offers when a slot opens—channels scoped to your consent practices and PMS.",
      },
      {
        id: "dental-emergency",
        question: "What about after-hours dental emergencies?",
        answer:
          "The agent collects high-level symptoms, shares your after-hours instructions, and books or escalates. It does not diagnose or give clinical advice.",
      },
      {
        id: "dental-tier",
        question: "Which plan fits dental practices?",
        answer:
          "Most choose Mercy Pro for custom flows, higher volume, and recall/reminder automation. Smaller offices sometimes start on Growth after scoping.",
      },
      {
        id: "dental-pms",
        question: "Do you integrate with our practice management software?",
        answer:
          "Depends on your PMS APIs or calendar bridges. We confirm the handoff in the demo and onboarding plan.",
      },
    ],
    pricing: {
      tierName: "Mercy Pro",
      reason:
        "Dental needs custom flows, recall automation, and privacy scoping—not a contractor after-hours script. Pro fits that complexity.",
    },
    complianceNote:
      "Patient-privacy guardrails use HIPAA-aware configuration scoped during onboarding. Mercy Speaks Digital does not claim HIPAA certification.",
    ctaTitle: "See dental overflow and reminder flows on a demo",
    ctaDescription:
      "Hear the live demo, then book a call to scope front-desk coverage, recall automation, and HIPAA-aware configuration.",
  },

  legal: {
    slug: "legal",
    path: "/industries/legal",
    navLabel: "Legal",
    indexBlurb:
      "After-hours intake, consultation booking, and conflict-check handoff to humans—so prospects never hit a dead line.",
    audience: "Law firms and legal practices",
    seoTitle: "AI Receptionist for Law Firms | Mercy Speaks Digital",
    seoDescription:
      "AI receptionist for law firms—capture after-hours intake, book consultations, and hand conflict checks to humans so potential clients never hit voicemail.",
    h1: "AI Receptionist for Law Firms",
    heroPain:
      "Someone searching for counsel at 10 p.m. after an arrest, an injury, or a business dispute will hire the firm that responds. An unanswered line is not neutral—it is a referral to whoever picks up next.",
    problemTitle: "The problem",
    problemLead:
      "Legal intake is time-sensitive and reputation-sensitive. Missed after-hours calls and slow consultation booking leak high-intent matters before a conflict check ever starts.",
    problems: [
      "After-hours and weekend inquiries for criminal, personal injury, family, and business matters go to voicemail while competing firms offer night intake.",
      "Reception is buried in scheduling; qualified consultation requests wait in a callback queue that never shrinks.",
      "Conflict checks and matter-sensitive questions must stay with attorneys or intake staff—but callers still need a professional first response tonight.",
      "No-show consults waste attorney calendar blocks when reminders and confirmations are inconsistent.",
    ],
    installTitle: "What we install",
    installLead:
      "An AI receptionist for first-response intake and consultation booking—with hard handoffs to humans for conflict checks, legal advice, and anything that must stay inside your ethical walls.",
    installItems: [
      {
        title: "AI phone receptionist",
        description:
          "Greets callers with your practice areas, captures contact details, matter category at a high level, urgency, and preferred consult times—without giving legal advice.",
      },
      {
        title: "Consultation booking",
        description:
          "Books intro calls or in-office consults against attorney calendars you approve, with clear expectations about what the meeting is (and is not).",
      },
      {
        title: "Conflict-check handoff",
        description:
          "When a matter needs a conflict check or attorney judgment, the agent collects the minimum facts you allow and routes a structured summary to intake staff—never “resolving” conflicts in the bot.",
      },
      {
        title: "Missed-call & reminder automation",
        description:
          "Text-back for abandoned rings plus consult reminders so booked time with counsel actually happens.",
      },
    ],
    howTitle: "How it works for law firms",
    steps: [
      {
        title: "1. Draw the ethical boundary in the script",
        description:
          "We define practice areas the AI may discuss, phrases that must trigger human handoff, and what never gets collected on a recorded line. Attorneys approve before go-live.",
      },
      {
        title: "2. Connect intake and calendars",
        description:
          "Consultation slots, notification rules, and the conflict-check queue are wired so after-hours leads arrive as structured intake—not a rambling voicemail.",
      },
      {
        title: "3. Staff the bot; lawyers keep judgment",
        description:
          "AI covers nights and overflow. Humans own conflict checks, engagement decisions, and advice. You review transcripts and tune the handoff weekly.",
      },
    ],
    faqs: [
      {
        id: "legal-advice",
        question: "Will the AI give legal advice?",
        answer:
          "No. It handles intake, scheduling, and routing only. Anything requiring legal judgment escalates to your team—never an automated opinion.",
      },
      {
        id: "legal-conflict",
        question: "How do conflict checks work?",
        answer:
          "The AI does not clear conflicts. It gathers allowed intake details and hands the package to a human for conflict check.",
      },
      {
        id: "legal-after-hours",
        question: "Can this cover nights and weekends?",
        answer:
          "Yes. After-hours intake is the primary firm use case—especially when prospects call right after an incident.",
      },
      {
        id: "legal-recording",
        question: "What about call recording and confidentiality?",
        answer:
          "We configure disclosure language you approve and limit intake fields to what your firm allows on that channel.",
      },
      {
        id: "legal-tier",
        question: "Which pricing tier fits most firms?",
        answer:
          "Many firms choose Mercy Growth for after-hours intake and booking. High-volume or multi-office firms often need Pro.",
      },
    ],
    pricing: {
      tierName: "Mercy Growth",
      reason:
        "Growth covers after-hours intake and consult booking without a night desk. Pro is there when multi-attorney routing gets complex.",
    },
    ctaTitle: "Preview after-hours legal intake on a live demo",
    ctaDescription:
      "Hear a first-response call, then book a demo to map practice areas, conflict-check handoff, and consult calendars.",
  },

  churches: {
    slug: "churches",
    path: "/industries/churches",
    navLabel: "Churches",
    indexBlurb:
      "Service times, event info, prayer-line routing—and church websites like our RCCG Shiloh Mega Parish build.",
    audience: "Churches and ministries",
    seoTitle: "AI Receptionist for Churches | Mercy Speaks Digital",
    seoDescription:
      "AI receptionist for churches—answer service times and event questions, route prayer-line calls, plus church websites like RCCG Shiloh Mega Parish.",
    h1: "AI Receptionist for Churches & Ministries",
    heroPain:
      "Visitors calling about service times, midweek events, or pastoral care should never land in a full mailbox. A warm, immediate answer is hospitality—and a missed call is a family that visits somewhere else on Sunday.",
    problemTitle: "The problem",
    problemLead:
      "Church phones carry logistics and care in the same ring. When volunteers and staff cannot answer, newcomers hang up, and prayer or crisis calls wait in a queue that feels anything but pastoral.",
    problems: [
      "Repeated questions—“What time is Sunday service?” “Is there children’s ministry?” “Where do we park?”—eat staff hours every week.",
      "Event and conference callers need dates, registration links, and directions outside office hours.",
      "Prayer-line and care calls need respectful routing to the right pastor or team—not a generic voicemail box.",
      "Many churches still run on outdated websites that bury service times and make first-time guests guess.",
    ],
    installTitle: "What we install",
    installLead:
      "An AI receptionist that knows your service schedule and events, plus optional church website design—the same craft we shipped for RCCG Shiloh Mega Parish.",
    installItems: [
      {
        title: "AI phone receptionist",
        description:
          "Answers with current service times, campus/location details, event basics, and office hours—updated when your calendar changes.",
      },
      {
        title: "Prayer-line & care routing",
        description:
          "Sensitive calls are routed to the pastoral care path you define (voicemail to a care team, on-call pastor rules, or a warm transfer)—never handled as a casual FAQ.",
      },
      {
        title: "Event & visitor intake",
        description:
          "Capture visitor interest, event registration intent, and callback requests so the hospitality team follows up with context.",
      },
      {
        title: "Church website design",
        description:
          "When the phone and the web must match, we design and build modern church sites—service times, sermons, and giving paths that load fast on mobile. See our live work for RCCG Shiloh Mega Parish.",
      },
    ],
    howTitle: "How it works for churches",
    steps: [
      {
        title: "1. Load your ministry calendar and care rules",
        description:
          "We encode service times, campuses, recurring events, and which call types escalate to pastoral care versus admin staff.",
      },
      {
        title: "2. Go live on phone (and web if needed)",
        description:
          "The AI answers routine rings; prayer and crisis paths follow your routing. If you need a new site, we build it to match the same visitor journey—as we did for RCCG Shiloh Mega Parish.",
      },
      {
        title: "3. Keep hospitality consistent all week",
        description:
          "Staff and volunteers stop repeating the same logistics answers. You update schedules when seasons change; callers always hear the current information.",
      },
    ],
    faqs: [
      {
        id: "church-service-times",
        question: "Can the AI share our service times and event schedule?",
        answer:
          "Yes. We load your current schedule and update it when services, events, or campus hours change.",
      },
      {
        id: "church-prayer",
        question: "How are prayer-line calls handled?",
        answer:
          "Prayer and care calls follow a routing plan you approve—warm handoff or dedicated care voicemail—not automated counseling.",
      },
      {
        id: "church-website",
        question: "Do you also build church websites?",
        answer:
          "Yes. We build guest-friendly church sites with clear service times and next steps. Featured example: RCCG Shiloh Mega Parish (rccgshilohmega.org).",
      },
      {
        id: "church-volunteers",
        question: "Will this replace our volunteer reception team?",
        answer:
          "No. It covers nights and repeat logistics so volunteers focus on in-person hospitality. Humans stay at the center of care.",
      },
      {
        id: "church-tier",
        question: "Which plan do churches usually pick?",
        answer:
          "Most fit Mercy Starter. Larger multi-campus ministries may need Growth.",
      },
    ],
    pricing: {
      tierName: "Mercy Starter",
      reason:
        "Churches need reliable answering for service times, events, and visitor intake—not contractor dispatch. Starter is the ministry-friendly entry; add a website project when the guest path needs a rebuild.",
    },
    portfolioNote: {
      label: "RCCG Shiloh Mega Parish",
      href: "https://www.rccgshilohmega.org/",
      description:
        "Live church website we designed and built—service information, modern layout, and a guest-friendly mobile experience.",
    },
    ctaTitle: "Hear the church receptionist demo—then book a walkthrough",
    ctaDescription:
      "Try the live demo, then map service times, prayer-line routing, and whether you need a site like RCCG Shiloh Mega Parish.",
  },

  "auto-repair": {
    slug: "auto-repair",
    path: "/industries/auto-repair",
    navLabel: "Auto Repair",
    indexBlurb:
      "Appointment booking, status-call deflection, and reminder automation so the service desk stays on the bays—not the phone.",
    audience: "Auto repair shops and service centers",
    seoTitle: "AI Receptionist for Auto Repair | Mercy Speaks Digital",
    seoDescription:
      "AI receptionist for auto repair shops—book appointments, deflect status-check calls, and automate reminders so advisors can stay on the bays.",
    h1: "AI Receptionist for Auto Repair Shops",
    heroPain:
      "Your advisors are writing estimates while the line lights up with “is my car done?” calls. Every status check that steals a bay conversation is a delayed RO—and every missed booking ring is a vehicle that goes to the shop down the road.",
    problemTitle: "The problem",
    problemLead:
      "Auto service phones mix high-value appointment requests with repetitive status checks. Without deflection and booking automation, the desk becomes a call center and the shop loses throughput.",
    problems: [
      "Appointment requests during peak drop-off hours hit hold or voicemail while advisors check in cars at the counter.",
      "Status-check calls (“Is it ready?” “Did parts land?”) interrupt technicians and advisors dozens of times a day.",
      "Reminder gaps create no-shows for alignments, diagnostics, and fleet slots you already reserved on the board.",
      "After-hours breakdown callers need a next-day appointment or tow guidance—not silence until the writer unlocks the door.",
    ],
    installTitle: "What we install",
    installLead:
      "An AI receptionist that books service appointments, answers routine status questions from rules you set, and runs reminders so the desk stays focused on vehicles in the bay.",
    installItems: [
      {
        title: "AI phone receptionist",
        description:
          "Books oil, brakes, diagnostics, and general service appointments against your hours and bay capacity rules—and captures year/make/model and concern notes for the advisor.",
      },
      {
        title: "Status-call deflection",
        description:
          "For in-progress ROs, the agent can share the status language you authorize (or push callers to a text/portal update) instead of pulling a writer off a customer at the counter.",
      },
      {
        title: "Reminder automation",
        description:
          "Appointment reminders and follow-ups reduce no-shows and bring deferred work back when the customer is ready to schedule.",
      },
      {
        title: "Missed-call text-back",
        description:
          "Anyone who cannot get through gets an SMS with booking options so a broken-down driver still puts a hold on your schedule.",
      },
    ],
    howTitle: "How it works for auto repair",
    steps: [
      {
        title: "1. Set services, hours, and status rules",
        description:
          "We load what you book over the phone, after-hours messaging, and what the AI may say about vehicle status versus what must stay with an advisor.",
      },
      {
        title: "2. Connect the appointment book",
        description:
          "Slots sync to your calendar or shop system where supported. Advisors get vehicle details and concern notes with every new appointment.",
      },
      {
        title: "3. Keep writers on the counter—and the bays moving",
        description:
          "Routine booking and status deflection drop off the human queue. You review transcripts and tighten scripts around the jobs that make you money.",
      },
    ],
    faqs: [
      {
        id: "auto-status",
        question: "Can the AI tell customers when their car is ready?",
        answer:
          "Only from rules and data you approve—or via text/portal deflection. It will not invent ETAs; uncertain cases route to an advisor.",
      },
      {
        id: "auto-book",
        question: "Will it book the right amount of time on the board?",
        answer:
          "We map appointment types to durations and bay rules you provide so mornings do not get overbooked.",
      },
      {
        id: "auto-after-hours",
        question: "What happens with after-hours breakdown calls?",
        answer:
          "The agent collects vehicle and location basics, shares your tow or next-day guidance, and books the next available slot.",
      },
      {
        id: "auto-reminders",
        question: "Do reminders really cut no-shows?",
        answer:
          "Shops that confirm appointments see fewer empty slots. Timing and channels match how your customers already communicate, with opt-out handling.",
      },
      {
        id: "auto-tier",
        question: "Which plan fits most auto shops?",
        answer:
          "Most multi-bay shops choose Mercy Growth. Single-bay shops sometimes start on Starter.",
      },
    ],
    pricing: {
      tierName: "Mercy Growth",
      reason:
        "Auto repair needs booking, status deflection, and reminders—not just a night greeting. Growth keeps advisors off repetitive phone loops.",
    },
    ctaTitle: "Hear how shop status and booking calls sound with Mercy",
    ctaDescription:
      "Play the live demo, then walk through appointment booking, status deflection, and reminder automation for your desk.",
  },
};

export function getIndustryPage(slug: string): IndustryPageConfig | undefined {
  if (slug in INDUSTRY_PAGES) {
    return INDUSTRY_PAGES[slug as IndustryPageSlug];
  }
  return undefined;
}

export function getAllIndustryPages(): IndustryPageConfig[] {
  return INDUSTRY_PAGE_ORDER.map((slug) => INDUSTRY_PAGES[slug]);
}
