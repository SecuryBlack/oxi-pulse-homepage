import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://oxipulse.dev/", changeFrequency: "monthly", priority: 1 },
    { url: "https://oxipulse.dev/changelog/", changeFrequency: "weekly", priority: 0.5 },
  ];
}
