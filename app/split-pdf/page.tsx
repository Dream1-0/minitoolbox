import type { Metadata } from "next";
import Link from "next/link";
import SplitPdfTool from "@/components/SplitPdfTool";

export const metadata: Metadata = {
  title: "Split PDF — Extract Pages or Split Every Page Online Free",
  description:
    "Split a PDF into single pages or extract a page range (e.g. 1-3, 5) into a new document. Runs entirely in your browser — free, instant and 100% private.",
  keywords: [
    "split pdf online",
    "extract pdf pages",
    "separate pdf pages",
    "pdf page remover free",
  ],
};

const faqs = [
  {
    q: "How do I extract specific pages from a PDF?",
    a: "Choose “Extract pages to one PDF”, then type the pages you want, for example 1-3, 5. A new PDF containing exactly those pages is created.",
  },
  {
    q: "How do I split a PDF into single pages?",
    a: "Choose “Split into single pages” and click Split. Each page becomes its own PDF file, ready to download individually or all at once.",
  },
  {
    q: "Is there a page limit?",
    a: "No fixed limit. Since processing happens on your device, very large documents simply take a few seconds longer.",
  },
  {
    q: "Are my documents uploaded anywhere?",
    a: "No. Splitting happens locally in your browser — nothing is sent to any server.",
  },
];

export default function SplitPdfPage() {
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
        <h1>Split PDF</h1>
        <p className="sub">
          Extract the exact pages you need — or burst a document into single
          pages. Type “1-3, 5” and you are done. Free and 100% private.
        </p>
      </div>

      <div className="container">
        <SplitPdfTool />
      </div>

      <div className="container prose">
        <h2>How to split a PDF</h2>
        <ol>
          <li>Drop a PDF into the box above — the page count appears instantly.</li>
          <li>Pick a mode: extract a page range, or split every page.</li>
          <li>
            For range mode, type pages like <strong>1-3, 5</strong>.
          </li>
          <li>Click Split PDF, then download the results.</li>
        </ol>

        <h2>Common use cases</h2>
        <ul>
          <li>Send only the relevant pages of a long contract.</li>
          <li>Extract one certificate page from a big scan.</li>
          <li>Split a combined bank statement into monthly files.</li>
          <li>Remove pages by extracting everything you need into a new PDF.</li>
        </ul>

        <h2>More free tools</h2>
        <ul>
          <li>
            <Link href="/merge-pdf">Merge PDF</Link> — combine PDFs back into
            one
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
