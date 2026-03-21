import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DashboardRole } from "@/dashboard/types/roles";
import {
  DASHBOARD_EMAIL_STORAGE_KEY,
  DASHBOARD_TOKEN_STORAGE_KEY,
} from "@/dashboard/constants";

const TOKEN_KEY = DASHBOARD_TOKEN_STORAGE_KEY;
const EMAIL_KEY = DASHBOARD_EMAIL_STORAGE_KEY;

export type DashboardAuthStatus = "unknown" | "guest" | "authed";

type DashboardAuthContextValue = {
  status: DashboardAuthStatus;
  role: DashboardRole | null;
  displayEmail: string | null;
  /** Bearer token for dashboard API calls (null if unavailable). */
  getAccessToken: () => string | null;
  login: (password: string, email?: string) => Promise<{ ok: true } | { ok: false; message: string }>;
  logout: () => void;
};

const DashboardAuthContext = createContext<DashboardAuthContextValue | null>(null);

async function postJson<T>(url: string, body: unknown): Promise<{ ok: boolean; data: T; status: number }> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as T;
  return { ok: res.ok, data, status: res.status };
}

export function DashboardAuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<DashboardAuthStatus>("unknown");
  const [role, setRole] = useState<DashboardRole | null>(null);
  const [displayEmail, setDisplayEmail] = useState<string | null>(null);

  const verifyStoredSession = useCallback(async () => {
    const token =
      typeof sessionStorage !== "undefined" ? sessionStorage.getItem(TOKEN_KEY) : null;
    const storedEmail =
      typeof sessionStorage !== "undefined" ? sessionStorage.getItem(EMAIL_KEY) : null;
    if (storedEmail) setDisplayEmail(storedEmail);

    if (!token) {
      setStatus("guest");
      setRole(null);
      return;
    }

    const { ok, data } = await postJson<{ ok?: boolean; role?: DashboardRole; message?: string }>(
      "/api/dashboard/verify",
      { token }
    );

    if (ok && data && typeof data === "object" && data.ok === true && data.role) {
      setRole(data.role);
      setStatus("authed");
      return;
    }

    sessionStorage.removeItem(TOKEN_KEY);
    setRole(null);
    setDisplayEmail(null);
    sessionStorage.removeItem(EMAIL_KEY);
    setStatus("guest");
  }, []);

  useEffect(() => {
    void verifyStoredSession();
  }, [verifyStoredSession]);

  const login = useCallback(
    async (password: string, email?: string) => {
      const { ok, data } = await postJson<{
        token?: string;
        role?: DashboardRole;
        email?: string | null;
        message?: string;
      }>("/api/dashboard/login", {
        password,
        email: email?.trim() || "",
      });

      if (
        ok &&
        data &&
        typeof data === "object" &&
        typeof data.token === "string" &&
        data.role
      ) {
        sessionStorage.setItem(TOKEN_KEY, data.token);
        setRole(data.role);
        const shown =
          typeof data.email === "string" && data.email.length > 0
            ? data.email
            : email?.trim() || null;
        if (shown) {
          sessionStorage.setItem(EMAIL_KEY, shown);
          setDisplayEmail(shown);
        } else {
          sessionStorage.removeItem(EMAIL_KEY);
          setDisplayEmail(null);
        }
        setStatus("authed");
        return { ok: true as const };
      }

      const message =
        data && typeof data === "object" && typeof data.message === "string"
          ? data.message
          : "Sign-in failed.";
      return { ok: false as const, message };
    },
    []
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(EMAIL_KEY);
    setRole(null);
    setDisplayEmail(null);
    setStatus("guest");
  }, []);

  const getAccessToken = useCallback(() => {
    if (typeof sessionStorage === "undefined") return null;
    return sessionStorage.getItem(TOKEN_KEY);
  }, []);

  const value = useMemo(
    () => ({
      status,
      role,
      displayEmail,
      getAccessToken,
      login,
      logout,
    }),
    [status, role, displayEmail, getAccessToken, login, logout]
  );

  return (
    <DashboardAuthContext.Provider value={value}>{children}</DashboardAuthContext.Provider>
  );
}

export function useDashboardAuth(): DashboardAuthContextValue {
  const ctx = useContext(DashboardAuthContext);
  if (!ctx) {
    throw new Error("useDashboardAuth must be used within DashboardAuthProvider");
  }
  return ctx;
}
