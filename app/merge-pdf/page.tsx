import type { Metadata } from "next";
import Link from "next/link";
import MergePdfTool from "@/components/MergePdfTool";

export const metadata: Metadata = {
  title: "Merge PDF — Combine PDF Files Online Free",
  description:
    "Combine multiple PDF files into one document, right in your browser. Reorder files before merging. Free and 100% private — no uploads.",
  keywords: [
    "merge pdf online",
    "combine pdf files",
    "join pdf free",
    "pdf merger no upload",
  ],
  alternates: { canonical: "/merge-pdf" },
  openGraph: {
    title: "Merge PDF — Combine PDF Files Online Free",
    description:
      "Combine multiple PDF files into one document, right in your browser. Reorder files before merging. Free and 100% private — no uploads.",
    url: "/merge-pdf",
    siteName: "MiniToolbox",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF — Combine PDF Files Online Free",
    description:
      "Combine multiple PDF files into one, right in your browser. Free and 100% private.",
  },
};

const faqs = [
  {
    q: "How do I merge PDF files into one?",
    a: "Add two or more PDF files, arrange them in the desired order with the ↑ ↓ buttons, then click Merge. A single combined PDF is created instantly.",
  },
  {
    q: "Is there a file size or page limit?",
    a: "No hard limit — the only constraint is your device memory, since everything is processed locally. Most documents merge in under a second.",
  },
  {
    q: "Are my documents uploaded to a server?",
    a: "Never. The merging happens inside your browser, so contracts, invoices and personal documents stay on your device.",
  },
  {
    q: "Will the quality of my PDF change?",
    a: "No. Pages are copied 1:1 into the new document with their original quality, fonts and layout intact.",
  },
];

export default function MergePdfPage() {
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
        <h1>Merge PDF Files</h1>
        <p className="sub">
          Combine any number of PDFs into a single document — in the exact
          order you choose. Free, instant and 100% private.
        </p>
      </div>

      <div className="container">
        <MergePdfTool />
      </div>

      <div className="container prose">
        <h2>How to merge PDFs</h2>
        <ol>
          <li>Drop two or more PDF files into the box above.</li>
          <li>
            Arrange the order with the <strong>↑ ↓</strong> buttons — pages are
            appended top to bottom.
          </li>
          <li>Click Merge, then download the combined file.</li>
        </ol>

        <h2>Why merge PDFs locally?</h2>
        <p>
          Online PDF mergers typically upload your documents to their servers.
          That is a real privacy risk for contracts, bank statements, medical
          records and identity documents. MiniToolbox merges everything on your
          own device — your files never leave your hands.
        </p>

        <h2>More free tools</h2>
        <ul>
          <li>
            <Link href="/split-pdf">Split PDF</Link> — extract pages or split
            into single pages
          </li>
          <li>
            <Link href="/compress-image">Compress image to target size</Link> —
            hit exact KB requirements
          </li>
          <li>
            <Link href="/convert-image">Convert image format</Link> — PNG, JPG,
            WebP and BMP
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
