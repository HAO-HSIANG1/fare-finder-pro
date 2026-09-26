import { Plane } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "@/integrations/supabase/client";

type Mode = "sign-in" | "sign-up";

export function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Sign in — Flight Price Notifier";
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "sign-in") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
      }
      // Email confirmation is disabled: both paths end signed in.
      navigate("/app");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          background:
            "radial-gradient(560px 300px at 85% -10%, oklch(0.78 0.09 222 / 0.3), transparent 70%), radial-gradient(480px 280px at 5% 100%, oklch(0.68 0.16 38 / 0.18), transparent 70%)",
        }}
      />
      <header className="relative border-b border-border/50">
        <div className="mx-auto flex max-w-5xl items-center px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
              <Plane className="size-4" />
            </span>
            Flight Price Notifier
          </Link>
        </div>
      </header>

      <main className="relative flex flex-1 items-center justify-center px-4 py-12">
        <div className="animate-fade-in-up w-full max-w-sm rounded-3xl border border-border/60 bg-card/80 p-8 shadow-xl shadow-primary/5 backdrop-blur-md">
          <h1 className="text-2xl font-bold">
            {mode === "sign-in" ? "Sign in / 登入" : "Sign up / 註冊"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "sign-in"
              ? "Welcome back — your fare alerts are waiting."
              : "Create an account to start watching fares."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-input bg-background/80 px-3.5 py-2.5 text-sm outline-none transition-colors duration-200 placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-primary/15"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete={
                  mode === "sign-in" ? "current-password" : "new-password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-input bg-background/80 px-3.5 py-2.5 text-sm outline-none transition-colors duration-200 placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-primary/15"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-2xl border border-destructive/40 bg-destructive/10 px-3.5 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-md hover:shadow-primary/25 disabled:pointer-events-none disabled:opacity-60"
            >
              {loading
                ? "…"
                : mode === "sign-in"
                  ? "Sign in / 登入"
                  : "Create account / 建立帳號"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "sign-in" ? (
              <>
                No account yet?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("sign-up");
                    setError(null);
                  }}
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("sign-in");
                    setError(null);
                  }}
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </main>
    </div>
  );
}
