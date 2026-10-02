import type { Metadata } from "next";
import Link from "next/link";
import QrCodeGeneratorTool from "@/components/QrCodeGeneratorTool";

export const metadata: Metadata = {
  title: "QR Code Generator — Free PNG & SVG Download",
  description:
    "Create QR codes for links, text or Wi-Fi right in your browser. Download as PNG or SVG, free with no sign-up — nothing is sent to a server.",
  keywords: [
    "qr code generator",
    "free qr code generator",
    "qr code maker",
    "create qr code for link",
    "wifi qr code generator",
    "qr code png download",
  ],
  alternates: { canonical: "/qr-code-generator" },
  openGraph: {
    title: "QR Code Generator — Free PNG & SVG Download",
    description:
      "Create QR codes for links, text or Wi-Fi right in your browser. Download as PNG or SVG, free with no sign-up — nothing is sent to a server.",
    url: "/qr-code-generator",
    siteName: "MiniToolbox",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator — Free PNG & SVG Download",
    description:
      "Create QR codes for links, text or Wi-Fi in your browser. Free, no sign-up, no expiry.",
  },
};

const faqs = [
  {
    q: "Do the QR codes expire or have a scan limit?",
    a: "No. These are static QR codes — the data is encoded directly in the image. They never expire, work offline and can be scanned unlimited times. Dynamic (trackable) QR codes that expire are a paid feature of other services; these are simply not that.",
  },
  {
    q: "Is it free? Are there watermarks?",
    a: "Completely free, no sign-up, no watermarks and no scan limits. The QR code is generated in your browser and downloaded as a clean PNG or vector SVG.",
  },
  {
    q: "Can I use the QR code for printing?",
    a: "Yes. For print, choose Download SVG — the vector format scales to any size without getting blurry, from business cards to posters. PNG is best for screens, presentations and messaging apps.",
  },
  {
    q: "Is anything I type sent to a server?",
    a: "No. The QR code is rendered entirely in your browser. Nothing is transmitted, logged or shared — you can even go offline after the page loads and it still works.",
  },
  {
    q: "How do I make a QR code that connects people to my Wi-Fi?",
    a: "Type your network details in this format: WIFI:T:WPA;S:YourNetworkName;P:YourPassword;; — replacing the network name and password. Phones that scan it will offer to join the Wi-Fi automatically.",
  },
];

export default function QrCodeGeneratorPage() {
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
        <h1>QR Code Generator</h1>
        <p className="sub">
          Turn links, text or Wi-Fi credentials into a QR code — instantly,
          free and 100% private. Download as PNG or print-ready SVG.
        </p>
      </div>

      <div className="container">
        <QrCodeGeneratorTool />
      </div>

      <div className="container prose">
        <h2>How to create a QR code</h2>
        <ol>
          <li>Type or paste a URL, text, phone number or Wi-Fi string above.</li>
          <li>The QR code appears instantly — pick a size and error level.</li>
          <li>Download as PNG (screens) or SVG (print).</li>
        </ol>

        <h2>Handy QR code formats</h2>
        <p>
          <strong>Wi-Fi:</strong> <code>WIFI:T:WPA;S:NetworkName;P:Password;;</code>{" "}
          — guests can join your network without typing a password. Use{" "}
          <code>T:WEP</code> for old networks or <code>T:nopass</code> for open
          ones.
        </p>
        <p>
          <strong>Email:</strong> <code>mailto:someone@example.com</code>{" "}
          opens a new email with the address filled in.
        </p>
        <p>
          <strong>Phone:</strong> <code>tel:+1234567890</code> starts a call,
          and <code>SMSTO:+1234567890:Hi!</code> opens a draft text message.
        </p>
        <p>
          <strong>vCard:</strong> paste a <code>BEGIN:VCARD … END:VCARD</code>{" "}
          block to share a full contact card with one scan.
        </p>

        <h2>Which error correction level should I pick?</h2>
        <p>
          Level M (standard) is right for most cases. Choose H (max) if the
          code will be printed small, placed where it might get worn or
          dirty — like stickers, packaging or flyers — or if you want to place
          a logo over the middle. Higher correction makes the pattern denser
          but more forgiving.
        </p>

        <h2>More free tools</h2>
        <ul>
          <li>
            <Link href="/resize-image">Image Resizer</Link> — resize by pixels
            or percentage
          </li>
          <li>
            <Link href="/compress-image">Compress image to target size</Link> —
            hit exact KB requirements
          </li>
          <li>
            <Link href="/convert-image">Convert image format</Link> — between
            PNG, JPG, WebP and BMP
          </li>
          <li>
            <Link href="/merge-pdf">Merge PDF</Link> — combine PDFs into one
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
