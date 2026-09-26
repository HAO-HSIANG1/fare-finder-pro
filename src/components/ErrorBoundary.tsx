import { Component, type ErrorInfo, type ReactNode } from "react";

import { reportLovableError } from "@/lib/lovable-error-reporting";

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  override state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
    reportLovableError(error, { boundary: "app_error_boundary" });
  }

  override render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            This page didn't load
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong on our end. You can try refreshing or head back home.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => {
                this.setState({ error: null });
                window.location.reload();
              }}
              className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-md hover:shadow-primary/25"
            >
              Try again
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:bg-accent/40"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    );
  }
}
