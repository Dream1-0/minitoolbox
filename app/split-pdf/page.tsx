import type { Metadata } from "next";
import Link from "next/link";
import SplitPdfTool from "@/components/SplitPdfTool";

export const metadata: Metadata = {
  title: "Split PDF — Extract Pages or Split Every Page",
  description:
    "Split a PDF into single pages or extract a page range (e.g. 1-3, 5) into a new document. Runs entirely in your browser — free, instant and 100% private.",
  keywords: [
    "split pdf online",
    "extract pdf pages",
    "separate pdf pages",
    "pdf page remover free",
  ],
  alternates: { canonical: "/split-pdf" },
  openGraph: {
    title: "Split PDF — Extract Pages or Split Every Page",
    description:
      "Split a PDF into single pages or extract a page range (e.g. 1-3, 5) into a new document. Runs entirely in your browser — free and 100% private.",
    url: "/split-pdf",
    siteName: "MiniToolbox",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF — Extract Pages or Split Every Page",
    description:
      "Extract page ranges or split every page into its own PDF, right in your browser. Free and 100% private.",
  },
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
  {
    q: "Can I split a password-protected PDF?",
    a: "PDFs that require a password to open cannot be read, so they cannot be split. Files with editing restrictions only usually work fine.",
  },
  {
    q: "Does splitting reduce the quality of my pages?",
    a: "No. Pages are copied into the new document as they are — no re-rendering, no re-compression, so text stays sharp and images keep their original resolution.",
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

        <h2>Page range syntax</h2>
        <p>
          In extract mode, type page numbers and ranges separated by commas.
          For example:
        </p>
        <ul>
          <li>
            <code>1-3, 5</code> — pages 1, 2, 3 and 5.
          </li>
          <li>
            <code>4</code> — a single page.
          </li>
          <li>
            <code>2-6</code> — a continuous block of five pages.
          </li>
        </ul>
        <p>
          Pages are placed in their original document order, lowest number
          first, so the output always reads the same way as the source. Always
          check the page count shown after the file is loaded so you do not
          reference a page beyond the end of the document.
        </p>

        <h2>Extract pages vs split every page</h2>
        <p>
          <strong>Extract pages</strong> produces one PDF containing only the
          pages you selected — the right choice when you need to send a few
          relevant pages of a long report. <strong>Split into single pages</strong>{" "}
          produces one file per page, which is useful for separating scanned
          forms, turning a booklet into individual handouts, or preparing pages
          for a signing workflow.
        </p>

        <h2>What the output keeps</h2>
        <p>
          The selected pages are copied without re-rendering, so fonts, images
          and page sizes are preserved exactly. Document-level features that
          reference other pages — such as bookmarks, cross-page links and form
          fields — may not survive, because they belong to the original file
          rather than to an individual page. Digital signatures also become
          invalid once the document is changed.
        </p>

        <h2>Scanned documents and booklets</h2>
        <p>
          A scanned booklet often arrives as one long PDF where two physical
          pages share a single sheet, or where pages are in the wrong reading
          order. Splitting into individual pages gives you files you can
          inspect, rename and send separately. If the order is wrong, split
          everything into single pages first and then combine the pages you need
          with the <Link href="/merge-pdf">Merge PDF</Link> tool. Splitting does
          not shrink the pages themselves: the extracted files together are
          still roughly the size of the original scan, so compression may still
          be needed before sending.
        </p>

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
          <li>
            <Link href="/rotate-pdf">Rotate PDF</Link> — turn pages sideways
            or upside down
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
