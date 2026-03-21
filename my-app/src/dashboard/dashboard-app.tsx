import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardAuthProvider } from "@/dashboard/contexts/dashboard-auth-context";
import { AuthGate } from "@/dashboard/components/auth-gate";
import { DashboardShell } from "@/dashboard/components/dashboard-shell";
import { SectionPlaceholder } from "@/dashboard/components/section-placeholder";
import { DashboardLoginPage } from "@/dashboard/pages/dashboard-login-page";
import { DashboardHomePage } from "@/dashboard/pages/dashboard-home-page";
import { LeadDetailPage } from "@/dashboard/pages/lead-detail-page";
import { ConversationDetailPage } from "@/dashboard/pages/conversation-detail-page";
import { ConversationsPage } from "@/dashboard/pages/conversations-page";
import { LeadsPage } from "@/dashboard/pages/leads-page";

export function DashboardApp() {
  return (
    <DashboardAuthProvider>
      <Routes>
        <Route path="login" element={<DashboardLoginPage />} />
        <Route element={<AuthGate />}>
          <Route element={<DashboardShell />}>
            <Route index element={<DashboardHomePage />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="leads/:id" element={<LeadDetailPage />} />
            <Route path="conversations" element={<ConversationsPage />} />
            <Route path="conversations/:id" element={<ConversationDetailPage />} />
            <Route
              path="appointments"
              element={
                <SectionPlaceholder
                  eyebrow="Calendar"
                  title="Appointments"
                  description="Bookings and no-shows will appear here when calendar data is connected."
                />
              }
            />
            <Route
              path="clients"
              element={
                <SectionPlaceholder
                  eyebrow="Accounts"
                  title="Clients"
                  description="Account list and status will live here when CRM-style data is available."
                />
              }
            />
            <Route
              path="clients/:id"
              element={
                <SectionPlaceholder
                  eyebrow="Accounts"
                  title="Client"
                  description="Per-account detail and integrations will open here when the clients API exists."
                />
              }
            />
            <Route
              path="ai-settings"
              element={
                <SectionPlaceholder
                  eyebrow="Behavior"
                  title="AI settings"
                  description="Persona, rules, and escalation — forms will land here behind the same auth as leads."
                />
              }
            />
            <Route
              path="knowledge-base"
              element={
                <SectionPlaceholder
                  eyebrow="Training"
                  title="Knowledge base"
                  description="Searchable training content and edits will be added when the backend is ready."
                />
              }
            />
            <Route
              path="follow-up"
              element={
                <SectionPlaceholder
                  eyebrow="Recovery"
                  title="Follow-up"
                  description="Queues for stale leads and missed touchpoints will appear when automation is connected."
                />
              }
            />
            <Route
              path="analytics"
              element={
                <SectionPlaceholder
                  eyebrow="Performance"
                  title="Analytics"
                  description="Funnel and source metrics will chart here once event data is aggregated."
                />
              }
            />
            <Route
              path="settings"
              element={
                <SectionPlaceholder
                  eyebrow="Workspace"
                  title="Settings"
                  description="Profile, notifications, and integrations will be grouped here."
                />
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardAuthProvider>
  );
}
