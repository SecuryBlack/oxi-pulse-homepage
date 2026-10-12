import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { guides } from "@/lib/guides";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Backend guides — OxiPulse",
  description: "Send server metrics from OxiPulse to SigNoz, OpenObserve, Uptrace, VictoriaMetrics or Prometheus over OpenTelemetry. Tested end to end in CI.",
  alternates: { canonical: "/guides/" },
};

export default function GuidesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2">Backend guides</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8">
          OxiPulse sends OTLP/gRPC to any OpenTelemetry backend. Each guide is tested end to end in CI on every change, except SigNoz for now.
        </p>
        <ul className="divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800">
          {[...guides, { slug: "", name: "Prometheus + Grafana", summary: "Through an OTel Collector, with a ready-made dashboard." }].map((g) => (
            <li key={g.name}>
              <a
                href={g.slug ? `/guides/${g.slug}/` : "https://github.com/SecuryBlack/oxi-pulse/tree/main/examples/prometheus-grafana"}
                className="flex items-center justify-between gap-4 py-4 group"
              >
                <span>
                  <span className="block font-semibold text-zinc-900 dark:text-white">{g.name}</span>
                  <span className="block text-sm text-zinc-600 dark:text-zinc-400">{g.summary}</span>
                </span>
                <ArrowRight className="size-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white shrink-0" />
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
