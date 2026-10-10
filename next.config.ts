import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  // PostHog first-party proxy (same as securyblack.com). Its endpoints end in "/"
  // inconsistently and sendBeacon does not follow redirects, so /ingest must not
  // be redirected; the rewrite below covers both forms.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: "https://eu-assets.i.posthog.com/static/:path*" },
      { source: "/ingest/:path*", destination: "https://eu.i.posthog.com/:path*" },
    ];
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
