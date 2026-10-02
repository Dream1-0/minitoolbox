import type { MetadataRoute } from "next";

const BASE = "https://minitoolbox-ten.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/compress-image", priority: 0.9 },
    { path: "/convert-image", priority: 0.9 },
    { path: "/heic-to-jpg", priority: 0.9 },
    { path: "/merge-pdf", priority: 0.9 },
    { path: "/split-pdf", priority: 0.9 },
    { path: "/resize-image", priority: 0.9 },
    { path: "/qr-code-generator", priority: 0.9 },
    { path: "/word-counter", priority: 0.9 },
    { path: "/rotate-pdf", priority: 0.9 },
    { path: "/privacy-policy", priority: 0.3 },
  ];
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: r.priority,
  }));
}
