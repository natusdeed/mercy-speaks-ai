import type { AccordionItemData } from "@/components/ui/Accordion";

/** Task 5 (audit) — AI Receptionist service FAQs */
export const AI_RECEPTIONIST_SERVICE_FAQS: AccordionItemData[] = [
  {
    id: "ai-receptionist-setup-time",
    question: "How quickly can the AI receptionist be set up?",
    answer: "Most clients are live within 48–72 hours of onboarding.",
  },
  {
    id: "ai-receptionist-robotic",
    question: "Will it sound robotic to my customers?",
    answer:
      "No. Our AI voices are indistinguishable from a real receptionist in most cases.",
  },
  {
    id: "ai-receptionist-complex",
    question: "What happens if a caller asks something complex?",
    answer:
      "The AI captures their information and flags it for your team to follow up — no call goes unanswered.",
  },
  {
    id: "ai-receptionist-after-hours",
    question: "Does it work after business hours?",
    answer: "Yes, 24/7 including weekends and holidays.",
  },
];

/** Task 5 (audit) — Business Automation (workflow) service FAQs */
export const BUSINESS_AUTOMATION_SERVICE_FAQS: AccordionItemData[] = [
  {
    id: "biz-auto-tasks",
    question: "What tasks can you automate for my business?",
    answer:
      "Lead follow-up, appointment reminders, missed-call texts, review requests, and more.",
  },
  {
    id: "biz-auto-tech",
    question: "Do I need to be tech-savvy to use this?",
    answer:
      "Not at all. We handle the entire setup and train your team on what to expect.",
  },
  {
    id: "biz-auto-replace-staff",
    question: "Will automation replace my staff?",
    answer:
      "No. It handles the repetitive tasks so your team can focus on revenue-generating work.",
  },
];
