import type { Metadata } from "next";
import Link from "next/link";
import ConvertImageTool from "@/components/ConvertImageTool";

export const metadata: Metadata = {
  title: "Convert Image Format — PNG, JPG, WebP, BMP",
  description:
    "Convert images between PNG, JPG, WebP and BMP formats directly in your browser. No uploads, no watermarks, no sign-up. Free and 100% private.",
  keywords: [
    "png to jpg converter",
    "jpg to webp",
    "webp to png",
    "image format converter",
    "heic to jpg free",
  ],
};

const faqs = [
  {
    q: "Which formats can I convert between?",
    a: "You can convert any browser-supported image (PNG, JPG, WebP, BMP, GIF) to PNG, JPG or WebP. JPG and WebP output let you choose a quality level.",
  },
  {
    q: "What happens to transparency when converting to JPG?",
    a: "JPG does not support transparency, so transparent areas are filled with a white background automatically.",
  },
  {
    q: "Which format should I choose for the smallest file?",
    a: "WebP usually produces the smallest files at the same visual quality, followed by JPG. PNG is best when you need transparency or lossless quality.",
  },
  {
    q: "Are my images uploaded anywhere?",
    a: "No. Conversion runs entirely in your browser — your files never leave your device.",
  },
];

export default function ConvertImagePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container tool-head">
        <h1>Convert Image Format</h1>
        <p className="sub">
          Convert between PNG, JPG and WebP instantly — with a quality slider
          for full control. Free, unlimited and 100% private.
        </p>
      </div>

      <div className="container">
        <ConvertImageTool />
      </div>

      <div className="container prose">
        <h2>How to convert an image</h2>
        <ol>
          <li>Choose the output format: JPG, PNG or WebP.</li>
          <li>For JPG and WebP, pick a quality level (higher = better quality).</li>
          <li>Add your images, then click Convert.</li>
          <li>Download results individually or all at once.</li>
        </ol>

        <h2>When to use each format</h2>
        <ul>
          <li>
            <strong>JPG</strong> — the universal standard for photos. Opens
            everywhere, great for sharing and uploads.
          </li>
          <li>
            <strong>PNG</strong> — lossless with transparency support. Best for
            logos, screenshots and graphics.
          </li>
          <li>
            <strong>WebP</strong> — modern format, much smaller than JPG/PNG at
            similar quality. Great for websites and saving disk space.
          </li>
        </ul>

        <h2>More free tools</h2>
        <ul>
          <li>
            <Link href="/compress-image">Compress image to target size</Link> —
            hit exact KB requirements
          </li>
          <li>
            <Link href="/merge-pdf">Merge PDF</Link> — combine PDFs into one
          </li>
          <li>
            <Link href="/split-pdf">Split PDF</Link> — extract pages or split
            into single pages
          </li>
        </ul>

        <h2>Frequently asked questions</h2>
        {faqs.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
