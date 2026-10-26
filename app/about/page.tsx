import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About MiniToolbox — Browser-Based File Tools",
  description:
    "Free image and PDF tools that run entirely in your browser. How local processing works, why files are never uploaded, and how the site is funded.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About MiniToolbox",
    description:
      "Free image and PDF tools that run entirely in your browser. No uploads, no accounts, no stored files.",
    url: "/about",
    siteName: "MiniToolbox",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About MiniToolbox",
    description:
      "Free image and PDF tools that run entirely in your browser. No uploads, no accounts.",
  },
};

export default function AboutPage() {
  return (
    <div className="container prose">
      <h1>About MiniToolbox</h1>
      <p className="section-sub">
        Free image and PDF tools that run on your device, not on a server.
      </p>

      <h2>What this site is</h2>
      <p>
        MiniToolbox is a small collection of everyday file utilities: compress
        an image to an exact size, convert between formats, resize a photo,
        merge or split PDFs, rotate pages, generate QR codes and count words.
        Every tool is free to use, requires no account, and works on desktop and
        mobile browsers.
      </p>
      <p>
        The site exists for a simple reason: most “free online converter”
        websites ask you to upload your files to their servers. For a holiday
        photo that is a minor inconvenience. For a passport scan, a signed
        contract or a medical document, it is an unnecessary privacy risk.
      </p>

      <h2>How it works</h2>
      <p>
        All processing happens inside your browser. Images are decoded and
        re-encoded with the Canvas API, PDFs are read and rewritten with a
        JavaScript PDF library, and the HEIC converter uses a WebAssembly
        decoder. Nothing is transmitted to us, because there is no upload step
        at all.
      </p>
      <p>
        This has a practical consequence you can verify yourself: open any tool,
        load a file, then switch off your network connection. The tool keeps
        working. If files were being uploaded, it would stop.
      </p>

      <h2>What this site is not</h2>
      <ul>
        <li>It is not a file storage or sharing service.</li>
        <li>It does not keep copies of anything you process.</li>
        <li>It does not require an email address or an account.</li>
        <li>It does not sell your documents or their contents.</li>
      </ul>

      <h2>How the site is funded</h2>
      <p>
        MiniToolbox is free and supported by advertising. Ads are clearly
        labelled, and they are never mixed into tool results. Visitors who
        prefer an ad-free experience can activate MiniToolbox Pro with a
        license key, which hides advertising on every page in that browser.
      </p>
      <p>
        You can read exactly what data is and is not collected in our{" "}
        <Link href="/privacy-policy">privacy policy</Link>.
      </p>

      <h2>Feedback and corrections</h2>
      <p>
        If a tool produces a wrong result, a page is confusing, or a file format
        is not supported, we want to know. The{" "}
        <Link href="/contact">contact page</Link> explains the fastest way to
        report an issue.
      </p>

      <p>
        <Link href="/">← Back to all tools</Link>
      </p>
    </div>
  );
}
