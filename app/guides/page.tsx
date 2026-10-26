import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guides — Practical File Tips",
  description:
    "Practical guides for compressing photos for online forms, choosing between HEIC and JPG, and merging PDFs without uploading them to a server.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Guides — Practical File Tips | MiniToolbox",
    description:
      "Practical guides for compressing photos for online forms, choosing between HEIC and JPG, and merging PDFs without uploading them.",
    url: "/guides",
    siteName: "MiniToolbox",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guides — Practical File Tips | MiniToolbox",
    description:
      "Practical guides for photos, PDFs and everyday file tasks.",
  },
};

const GUIDES = [
  {
    href: "/guides/compress-image-for-online-forms",
    title: "Compress a Photo for Online Forms",
    desc: "How to hit 20KB, 50KB or 100KB limits — and why a file can pass the size rule but still be rejected.",
  },
  {
    href: "/guides/heic-vs-jpg",
    title: "HEIC vs JPG: Which to Use",
    desc: "The real differences between iPhone photos and the universal format, and when converting is worth it.",
  },
  {
    href: "/guides/merge-pdf-without-uploading",
    title: "Merge PDFs Without Uploading",
    desc: "What happens to your documents on an online merger, and how to combine PDFs entirely on your own device.",
  },
];

export default function GuidesPage() {
  return (
    <>
      <div className="container tool-head">
        <h1>Guides</h1>
        <p className="sub">
          Short, practical explanations of the file problems people actually
          run into — written to be useful even if you never open one of our
          tools.
        </p>
      </div>

      <section className="container section">
        <div className="grid-tools">
          {GUIDES.map((g) => (
            <Link href={g.href} key={g.href} className="tool-card">
              <h3>{g.title}</h3>
              <p>{g.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="container prose">
        <h2>Why we publish guides</h2>
        <p>
          Tool pages explain how to click the buttons. Guides explain the
          decisions around them: which format to pick, what a size limit really
          means, and what happens to your files along the way. They are kept
          short on purpose — no filler, no keyword padding.
        </p>
        <p>
          Have a question that is not covered? Tell us through the{" "}
          <Link href="/contact">contact page</Link>.
        </p>
      </div>
    </>
  );
}
