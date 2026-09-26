import { Plane, LogOut, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuthUser } from "@/components/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";

export function Dashboard() {
  const { user } = useAuthUser();
  const navigate = useNavigate();

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          background:
            "radial-gradient(560px 300px at 90% -10%, oklch(0.78 0.09 222 / 0.28), transparent 70%), radial-gradient(480px 280px at 0% 100%, oklch(0.68 0.16 38 / 0.16), transparent 70%)",
        }}
      />
      <header className="relative border-b border-border/50 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
              <Plane className="size-4" />
            </span>
            Flight Price Notifier
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-full border border-input px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-secondary hover:shadow-sm"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="relative flex flex-1 items-center justify-center px-4 py-12">
        <div className="animate-fade-in-up w-full max-w-md rounded-3xl border border-border/60 bg-card/70 p-10 text-center shadow-sm backdrop-blur-sm">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-accent/25 text-accent-foreground">
            <Compass className="size-6" />
          </span>
          <h1 className="mt-6 text-2xl font-bold">Hi {user.email}</h1>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            你的航線追蹤儀表板即將上線 —
            下一個里程碑會加上訂閱航線的功能。
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Your dashboard is coming soon. Route-subscription will be added in
            the next milestone.
          </p>
        </div>
      </main>

      <footer className="relative border-t border-border/50">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm text-muted-foreground sm:px-6">
          © 2026 Flight Price Notifier
        </div>
      </footer>
    </div>
  );
}
