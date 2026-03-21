import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  Calendar,
  LayoutDashboard,
  ListTodo,
  MessageSquare,
  Settings,
  SlidersHorizontal,
  Users,
  UserSquare2,
} from "lucide-react";

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
};

export const DASHBOARD_NAV: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/leads", label: "Leads", icon: Users },
  { to: "/dashboard/conversations", label: "Conversations", icon: MessageSquare },
  { to: "/dashboard/appointments", label: "Appointments", icon: Calendar },
  { to: "/dashboard/clients", label: "Clients", icon: UserSquare2 },
  { to: "/dashboard/ai-settings", label: "AI settings", icon: SlidersHorizontal },
  { to: "/dashboard/knowledge-base", label: "Knowledge base", icon: BookOpen },
  { to: "/dashboard/follow-up", label: "Follow-up", icon: ListTodo },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];
