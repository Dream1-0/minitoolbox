import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MiniToolbox — Free Online Image & PDF Tools",
    short_name: "MiniToolbox",
    description:
      "Free browser-based tools: compress images to an exact size, convert formats, merge and split PDFs. Files never leave your device.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#6366f1",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
