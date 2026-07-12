import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ServiceMarketingPage } from "@/components/templates/service-marketing-page";
import { MISSED_CALL_TEXT_BACK_FAQS } from "@/content/service-page-faqs";
import { NAV_PATHS } from "@/lib/site-config";

export default function ServiceMissedCallTextBack() {
  return (
    <ServiceMarketingPage
      path={NAV_PATHS.missedCallTextBack}
      seoTitle="Missed-Call Text Back | Mercy Speaks Digital"
      seoDescription="Automatically text callers within seconds of a missed call. Keep your number, win back leads before they dial the next Google result. Included on all plans."
      icon={MessageCircle}
      h1="Missed-Call Text Back: Win Back Every Caller You Couldn't Answer"
      intro="When you miss a call, the next listing on Google is one tap away. Missed-call text-back sends an automatic SMS within seconds so you stay in the conversation—and keep the lead."
      atAGlance="Mercy Speaks Digital installs missed-call text-back on your existing business number: detect the miss, send a customizable first text in seconds, continue or hand off the conversation, and report what converted. It is included on every plan and pairs cleanly with our AI phone receptionist when you want calls answered and texts covering the gaps."
      serviceType="Missed-call text-back"
      sections={[
        {
          title: "What it is",
          body: "Missed-call text-back is an automation that sends a polite, on-brand SMS within seconds whenever a caller does not reach you. Instead of hoping they leave a voicemail, you open a text thread immediately—ask how you can help, offer a booking link, or invite them to reply with what they need.",
        },
        {
          title: "Why it matters",
          body: "Most callers will not wait. After one or two rings with no answer, they hang up and try the next Google result—often a competitor who picks up or texts first. Speed-to-lead is the difference between a booked job and a silent number. Text-back buys you that second chance without hiring another person to watch the phone.",
        },
        {
          title: "How it works",
          body: "1) A call to your business line goes unanswered or hits voicemail.\n2) Our system detects the miss and fires your approved first text—usually within seconds.\n3) The caller replies in SMS; you (or your AI stack) continue the conversation, book the appointment, or hand off to a human.\n\nYou keep your existing number. Nothing changes for how customers find and dial you.",
        },
        {
          title: "What's included",
          body: "Customizable first text so the opener sounds like your business, not a generic blast. Conversation handoff so replies reach the right person or workflow. Reporting so you see missed calls, texts sent, and which threads turned into booked work. Setup covers quiet hours, opt-out language, and the tone you approve before go-live.",
        },
        {
          title: "Which plans include it",
          body: (
            <>
              Missed-call text-back ships on all Mercy Speaks tiers—from Starter up—so you are not paying a separate add-on just to stop leaking callers. Compare packages and what is included on our{" "}
              <Link to={NAV_PATHS.pricing}>pricing page</Link>.
            </>
          ),
        },
        {
          title: "Pair it with the AI receptionist",
          body: (
            <>
              Text-back covers the calls you cannot take. Pair it with our{" "}
              <Link to={NAV_PATHS.aiReceptionist}>AI phone receptionist</Link>{" "}
              so fewer calls miss in the first place: the AI answers 24/7, qualifies, and books, while text-back still catches edge cases—busy lines, after-hours overflows, or moments your team steps away. Together they close the loop from ring to reply to calendar.
            </>
          ),
        },
      ]}
      related={[
        { to: NAV_PATHS.aiReceptionist, label: "AI phone receptionist" },
        { to: NAV_PATHS.pricing, label: "Pricing & plans" },
        { to: NAV_PATHS.workflowAutomation, label: "Workflow automation" },
        { to: NAV_PATHS.services, label: "All services" },
      ]}
      faqs={MISSED_CALL_TEXT_BACK_FAQS}
    />
  );
}
