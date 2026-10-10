"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { loadAnalytics, saveConsent, storedConsent, track } from "@/lib/analytics";

function placement(el: Element): string {
  if (el.closest("nav, header")) return "nav";
  if (el.closest("footer")) return "footer";
  return el.closest("section")?.id || "hero";
}

// One listener for every outbound link instead of a handler per link.
function onClick(e: MouseEvent) {
  const a = (e.target as Element | null)?.closest?.("a[href]");
  if (!a) return;
  const href = a.getAttribute("href") ?? "";
  const props = { placement: placement(a) };
  if (/securyblack\.com/.test(href)) track("cloud_cta_click", props);
  else if (/github\.com\/securyblack\/oxi-pulse\/(blob|tree)\//i.test(href) || href.includes("#readme")) track("docs_click", props);
  else if (/github\.com\/securyblack\/oxi-pulse/i.test(href)) track("github_click", props);
}

const noop = () => () => {};

export function Analytics() {
  // "ssr" on the server and during hydration, so the banner never flashes for returning visitors.
  const consent = useSyncExternalStore(noop, storedConsent, () => "ssr");
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (consent === "granted") loadAnalytics();
  }, [consent]);

  useEffect(() => {
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (consent !== null || answered) return null;

  const respond = (granted: boolean) => {
    saveConsent(granted);
    setAnswered(true);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white p-4 text-sm text-zinc-900 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-center sm:text-left">
          We use analytics cookies (Google Analytics, PostHog) to see which pages help people try OxiPulse. Nothing is
          loaded unless you accept.{" "}
          <a
            href="https://securyblack.com/en/legal/cookies"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Cookie policy
          </a>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => respond(false)}
            className="rounded-lg border border-zinc-300 px-4 py-2 font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Reject
          </button>
          <button
            onClick={() => respond(true)}
            className="rounded-lg bg-[var(--agent-primary)] px-4 py-2 font-semibold text-zinc-950 hover:bg-[var(--agent-primary-dark)]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
