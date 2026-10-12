import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://oxipulse.dev/", changeFrequency: "monthly", priority: 1 },
    { url: "https://oxipulse.dev/changelog/", changeFrequency: "weekly", priority: 0.5 },
    { url: "https://oxipulse.dev/guides/", changeFrequency: "monthly", priority: 0.7 },
    ...guides.map((g) => ({ url: `https://oxipulse.dev/guides/${g.slug}/`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
