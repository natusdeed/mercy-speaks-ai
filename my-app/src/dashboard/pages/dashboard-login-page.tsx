import { useState } from "react";
import { Navigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDashboardAuth } from "@/dashboard/contexts/dashboard-auth-context";

const loginSchema = z.object({
  email: z.string().trim().min(1, "Work email is required.").email("Enter a valid work email."),
  password: z.string().min(1, "Password is required."),
});

export function DashboardLoginPage() {
  const { status, login } = useDashboardAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (status === "authed") {
    return <Navigate to="/dashboard" replace />;
  }

  if (status === "unknown") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="h-10 w-10 animate-pulse rounded-full border-2 border-zinc-700 border-t-zinc-400" />
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.flatten().formErrors[0] ?? parsed.error.errors[0]?.message ?? "Check your input.");
      return;
    }
    setSubmitting(true);
    const result = await login(parsed.data.password, parsed.data.email.trim());
    setSubmitting(false);
    if (!result.ok) {
      setError(result.message);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 py-12">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Mercy Speaks Digital</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
          Mercy AI Dashboard
        </h1>
        <p className="mt-2 max-w-md text-sm text-zinc-400">
          Sign in to manage leads, AI conversations, bookings, and client operations.
        </p>
      </div>

      <Card className="w-full max-w-md border-zinc-800/80 bg-zinc-950/50 shadow-none">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-zinc-100">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="dashboard-email" className="mb-1.5 block text-xs font-medium text-zinc-400">
                Work email <span className="text-red-400/90" aria-hidden="true">*</span>
              </label>
              <input
                id="dashboard-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                aria-required="true"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className={cn(
                  "h-11 w-full rounded-lg border border-zinc-800/90 bg-zinc-950/50 px-3 text-sm text-zinc-100",
                  "placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700/50"
                )}
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="dashboard-password" className="mb-1.5 block text-xs font-medium text-zinc-400">
                Password
              </label>
              <input
                id="dashboard-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className={cn(
                  "h-11 w-full rounded-lg border border-zinc-800/90 bg-zinc-950/50 px-3 text-sm text-zinc-100",
                  "placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700/50"
                )}
                placeholder="••••••••"
              />
            </div>
            {error ? (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Signing in…" : "Continue"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="mt-10 max-w-sm text-center text-xs text-zinc-600">
        Authorized personnel only. Sessions expire after seven days of inactivity on the server clock.
      </p>
    </div>
  );
}
