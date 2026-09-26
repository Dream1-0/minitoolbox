import type { MetadataRoute } from "next";

const BASE = "https://minitoolbox.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/compress-image", priority: 0.9 },
    { path: "/convert-image", priority: 0.9 },
    { path: "/merge-pdf", priority: 0.9 },
    { path: "/split-pdf", priority: 0.9 },
  ];
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: r.priority,
  }));
}
