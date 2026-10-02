import type { Metadata } from "next";
import Link from "next/link";
import RotatePdfTool from "@/components/RotatePdfTool";

export const metadata: Metadata = {
  title: "Rotate PDF — Rotate Pages & Save Online",
  description:
    "Rotate PDF pages 90, 180 or 270 degrees and save a new copy — all pages or just selected ones. Free and 100% private, your PDF never leaves the device.",
  keywords: [
    "rotate pdf",
    "rotate pdf pages",
    "rotate pdf and save",
    "turn pdf sideways",
    "fix pdf orientation",
    "rotate scanned pdf",
  ],
  alternates: { canonical: "/rotate-pdf" },
  openGraph: {
    title: "Rotate PDF — Rotate Pages & Save Online",
    description:
      "Rotate PDF pages 90, 180 or 270 degrees and save a new copy — all pages or just selected ones. Free and 100% private, your PDF never leaves the device.",
    url: "/rotate-pdf",
    siteName: "MiniToolbox",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate PDF — Rotate Pages & Save Online",
    description:
      "Rotate PDF pages and save a new copy. Free, private, no uploads.",
  },
};

const faqs = [
  {
    q: "Is the rotation permanent?",
    a: "Yes. The rotation is written into the downloaded PDF file itself, so every PDF reader — on phone, Windows, Mac or print — shows the pages the new way up. The original file on your device stays untouched.",
  },
  {
    q: "Can I rotate only some pages?",
    a: "Yes. In the Pages box type which pages to rotate, for example “1-3, 5” rotates pages 1, 2, 3 and 5 only. Leave it as “all” to rotate the whole document.",
  },
  {
    q: "Why are my scanned pages sideways or upside down?",
    a: "Scanners and phone scanning apps often save pages in a fixed orientation no matter how the paper was fed. Rotating 90° or 180° in this tool fixes the whole file permanently in one step.",
  },
  {
    q: "Is my PDF uploaded to a server?",
    a: "No. The rotation runs entirely in your browser using JavaScript. Your PDF never leaves your device — you can even go offline after the page loads.",
  },
  {
    q: "My PDF is password-protected — will it work?",
    a: "PDFs that need a password to open cannot be rotated. Files that are only restricted from editing (but open freely) usually work, because the tool reads and rewrites the pages.",
  },
];

export default function RotatePdfPage() {
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
        <h1>Rotate PDF</h1>
        <p className="sub">
          Rotate PDF pages 90°, 180° or 270° and save a new copy — instantly,
          free and 100% private. Nothing is ever uploaded.
        </p>
      </div>

      <div className="container">
        <RotatePdfTool />
      </div>

      <div className="container prose">
        <h2>How to rotate a PDF</h2>
        <ol>
          <li>Drop your PDF into the box above.</li>
          <li>
            Pick a rotation and which pages to apply it to (or leave “all”).
          </li>
          <li>Click Rotate &amp; download — a new, fixed copy is saved.</li>
        </ol>

        <h2>Rotating sideways scans and photos</h2>
        <p>
          Scanned contracts, receipts and book chapters frequently come out
          sideways because the scanner only records orientation from a sensor,
          not from what the page looks like. Rotating and saving fixes the file
          for good: print shops, email attachments and e-signature tools will
          all display it correctly afterwards.
        </p>
        <p>
          If you only need a few pages out of a big document, extract them
          first with the <Link href="/split-pdf">Split PDF</Link> tool, rotate
          the extract, and keep the original untouched.
        </p>

        <h2>More free tools</h2>
        <ul>
          <li>
            <Link href="/merge-pdf">Merge PDF</Link> — combine PDFs into one
          </li>
          <li>
            <Link href="/split-pdf">Split PDF</Link> — extract pages or split
            into single pages
          </li>
          <li>
            <Link href="/compress-image">Compress image to target size</Link> —
            hit exact KB requirements
          </li>
          <li>
            <Link href="/resize-image">Image Resizer</Link> — resize by pixels
            or percentage
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
