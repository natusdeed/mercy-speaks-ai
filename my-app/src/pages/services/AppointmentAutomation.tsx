import { CalendarClock } from "lucide-react";
import { ServiceMarketingPage } from "@/components/templates/service-marketing-page";
import { NAV_PATHS } from "@/lib/site-config";

export default function ServiceAppointmentAutomation() {
  return (
    <ServiceMarketingPage
      path={NAV_PATHS.appointmentAutomation}
      seoTitle="Appointment automation"
      seoDescription="Automation for scheduling, reminders, and handoffs—fewer no-shows and less phone tag. Mercy Speaks Digital."
      icon={CalendarClock}
      h1="Appointment automation"
      intro="Make booking and reminders reliable: fewer empty slots, less back-and-forth, clearer expectations for customers and staff."
      atAGlance="We tie your calendar, notifications, and receptionist or chat flows together so appointments are created with the right buffers, confirmations go out automatically, and your team sees prepared context before the meeting or visit."
      serviceType="Appointment scheduling"
      sections={[
        {
          title: "What it is",
          body: "Appointment automation is the layer around your calendar—self-serve booking where appropriate, plus confirmations, reschedules, and prep messages that run on rules instead of ad hoc texts.",
        },
        {
          title: "Who it helps",
          body: "Anyone who lives in their calendar: clinics, consultants, home services, salons, and sales teams that book discovery calls. If no-shows or scheduling friction cost you revenue, this is high leverage.",
        },
        {
          title: "Outcomes",
          body: "Cleaner calendar data, higher show rates from proactive reminders, and faster rebooking when plans change—without your front desk living in manual follow-up mode.",
        },
        {
          title: "Implementation notes",
          body: "We align on booking policies (deposit, cancellation windows, service durations, staff assignments). Then we connect the channels—phone AI, web forms, chat—that feed the same calendar truth.",
        },
      ]}
      related={[
        { to: NAV_PATHS.aiReceptionist, label: "AI receptionist" },
        { to: NAV_PATHS.websiteDesign, label: "Websites & booking UX" },
        { to: NAV_PATHS.workflowAutomation, label: "Workflow automation" },
      ]}
    />
  );
}
