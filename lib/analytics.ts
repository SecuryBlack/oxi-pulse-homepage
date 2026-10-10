"use client";

// Same consent key, GA4 property and PostHog project as securyblack.com, so the
// OxiPulse → SecuryBlack journey can be followed by hostname.
// Nothing loads and no cookie is set until the visitor accepts.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const CONSENT_KEY = "cookie-consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

let loaded = false;
let posthog: typeof import("posthog-js").default | undefined;

export function storedConsent(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function saveConsent(granted: boolean) {
  try {
    localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
  } catch {}
  if (granted) loadAnalytics();
}

export function loadAnalytics() {
  if (loaded) return;
  loaded = true;

  if (GA_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
  }

  if (POSTHOG_KEY) {
    import("posthog-js").then(({ default: ph }) => {
      ph.init(POSTHOG_KEY, {
        api_host: "/ingest",
        ui_host: "https://eu.posthog.com",
        person_profiles: "identified_only",
        capture_pageleave: true,
        disable_surveys: true,
        // Same as securyblack.com: session replay on, dead clicks and exceptions off.
        capture_dead_clicks: false,
        capture_exceptions: false,
      });
      posthog = ph;
    });
  }
}

/** Sends the event to GA4 and PostHog. No-op without consent. */
export function track(event: string, properties: Record<string, string> = {}) {
  if (!loaded) return;
  window.gtag?.("event", event, properties);
  posthog?.capture(event, properties);
}
