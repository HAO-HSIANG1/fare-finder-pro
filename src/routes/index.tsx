import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, Radar, BellRing, CalendarX } from "lucide-react";

import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Price Notifier — 機票降價通知" },
      {
        name: "description",
        content:
          "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops.",
      },
      { property: "og:title", content: "Flight Price Notifier — 機票降價通知" },
      {
        property: "og:description",
        content:
          "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const features = [
  {
    icon: Radar,
    title: "盯緊熱門航線",
    subtitle: "Always-on route watching",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: BellRing,
    title: "達標自動通知",
    subtitle: "Target-price email alerts",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: CalendarX,
    title: "隨時取消",
    subtitle: "Cancel anytime",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Plane className="size-4" />
            </span>
            Flight Price Notifier
          </div>
          <Link
            to="/auth"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Sign in / 登入
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px 300px at 50% -5%, oklch(0.62 0.22 292 / 0.28), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <p className="animate-fade-in text-sm font-medium tracking-widest text-primary uppercase">
            Flight Price Notifier
          </p>
          <h1
            className="animate-fade-in-up mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl"
            style={{ animationDelay: "100ms" }}
          >
            設定航線與目標價，機票降價就通知你
          </h1>
          <p
            className="animate-fade-in-up mt-6 text-lg text-muted-foreground"
            style={{ animationDelay: "200ms" }}
          >
            Set a route and a target price — we email you when the fare drops.
          </p>
          <div
            className="animate-fade-in-up mt-10"
            style={{ animationDelay: "300ms" }}
          >
            <Link
              to="/auth"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/85"
            >
              Sign in / 登入
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 120}>
              <article className="h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <f.icon className="size-5" />
                </span>
                <h2 className="mt-4 text-lg font-semibold">{f.title}</h2>
                <p className="text-sm font-medium text-primary">{f.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm text-muted-foreground sm:px-6">
          © 2026 Flight Price Notifier
        </div>
      </footer>
    </div>
  );
}
