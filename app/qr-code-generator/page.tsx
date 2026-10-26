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
  {
    q: "Can I change the link after the QR code is printed?",
    a: "No. These are static codes, so the destination is fixed in the pattern. If you need to change a link after printing, you would need a redirect service that provides its own editable QR code.",
  },
  {
    q: "What PNG size should I download?",
    a: "512px is enough for slides, chat and small screen use; 1024px suits posters viewed close up. For anything printed, download SVG instead — vector scales without blur.",
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

        <h2>Static vs dynamic QR codes</h2>
        <p>
          A static QR code permanently encodes the data you type — a URL, a
          phone number, a Wi-Fi password. It works forever, needs no server and
          can be scanned offline. The trade-off is that the content cannot be
          edited afterwards. Dynamic QR codes use a short link that redirects to
          a destination you can change, and they usually come with scan
          analytics, but they depend on a paid service staying online.
        </p>
        <p>
          For business cards, menus, product labels and Wi-Fi signs, a static
          code is usually the more robust choice: nothing can expire and
          nothing can break.
        </p>

        <h2>Size and placement for print</h2>
        <ul>
          <li>
            <strong>Minimum size:</strong> about 2×2 cm (0.8×0.8 in) for codes
            scanned at arm&apos;s length. Smaller codes become unreliable on
            phone cameras.
          </li>
          <li>
            <strong>Quiet zone:</strong> keep a clear margin of at least four
            modules on every side. Do not place artwork, text or a border right
            against the pattern.
          </li>
          <li>
            <strong>Contrast:</strong> dark modules on a light background scan
            best. Avoid low-contrast colour combinations and glossy finishes
            that reflect light.
          </li>
          <li>
            <strong>Distance:</strong> a code on a poster needs to be much
            larger than one on a table card, because the scan distance grows.
          </li>
        </ul>

        <h2>Keep the encoded data short</h2>
        <p>
          The more characters you encode, the denser the pattern becomes. A
          long URL with tracking parameters produces a busy grid of tiny
          squares that is harder to scan at small print sizes. If a code is
          meant for a business card or sticker, consider a short link first —
          or accept a larger print size.
        </p>

        <h2>Test before you print</h2>
        <p>
          Scan the downloaded file with at least two different phones before
          committing to a print run. Test at the size and distance people will
          actually use, and check that the link opens the page you expect —
          including on mobile, where many sites redirect differently.
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
