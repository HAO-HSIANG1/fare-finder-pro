import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useOutletContext } from "react-router-dom";

import { supabase } from "@/integrations/supabase/client";

type AuthState =
  | { status: "loading" }
  | { status: "authenticated"; user: User }
  | { status: "unauthenticated" };

type AuthContext = { user: User };

// Mirrors the previous route's beforeLoad guard: check the session, redirect
// unauthenticated visitors to /auth, and re-check on sign-in/out/user-update
// so a session change in another tab takes effect here too.
export function ProtectedRoute() {
  const [state, setState] = useState<AuthState>({ status: "loading" });
  const location = useLocation();

  useEffect(() => {
    let active = true;

    async function check() {
      const { data, error } = await supabase.auth.getUser();
      if (!active) return;
      setState(
        error || !data.user
          ? { status: "unauthenticated" }
          : { status: "authenticated", user: data.user },
      );
    }
    check();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") {
        return;
      }
      check();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (state.status === "loading") {
    return <div className="min-h-screen bg-background" />;
  }
  if (state.status === "unauthenticated") {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  return <Outlet context={{ user: state.user } satisfies AuthContext} />;
}

export function useAuthUser() {
  return useOutletContext<AuthContext>();
}
