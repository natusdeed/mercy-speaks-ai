/**
 * Multi-tenant widget: shared types and schema.
 * Used by widget API routes and optionally by the embeddable script.
 */

export type TenantBranding = {
  primaryColor?: string;
  accentColor?: string;
  companyName?: string;
  logoUrl?: string;
};

export type Tenant = {
  id: string;
  name: string;
  domains: string[];
  /** Optional public key for script tag (data-key). When set, API validates it. */
  public_key?: string | null;
  branding: TenantBranding;
  booking_url: string | null;
  system_prompt: string | null;
  greeting: string | null;
  created_at?: string;
  updated_at?: string;
};

export type WidgetConfigResponse = {
  tenantId: string;
  companyName: string;
  greeting: string;
  bookingUrl: string | null;
  branding: TenantBranding;
  allowed: boolean;
  /** Optional quick-reply buttons shown in the widget. */
  quickReplies?: string[];
};

export type WidgetChatBody = {
  tenantId: string;
  /** Public key from script tag (data-key); required when tenant has public_key set. */
  key?: string;
  userMessage: string;
  conversationHistory?: Array<{ role: "user" | "assistant"; content: string }>;
};

export type WidgetLeadBody = {
  tenantId: string;
  /** Public key from script tag (data-key); required when tenant has public_key set. */
  key?: string;
  email: string;
  phone: string;
  name?: string;
  businessName?: string;
  message?: string;
  conversationId?: string;
};
