import type { Metadata } from "next";
import Link from "next/link";
import HeicToJpgTool from "@/components/HeicToJpgTool";

export const metadata: Metadata = {
  title: "HEIC to JPG — Convert iPhone Photos Free",
  description:
    "Convert iPhone HEIC photos to JPG right in your browser. Free, batch-friendly and 100% private — your photos never leave your device.",
  keywords: [
    "heic to jpg",
    "heic to jpg converter",
    "convert heic to jpg free",
    "open heic file on windows",
    "heic to png",
  ],
  alternates: { canonical: "/heic-to-jpg" },
  openGraph: {
    title: "HEIC to JPG — Convert iPhone Photos Free",
    description:
      "Convert iPhone HEIC photos to JPG right in your browser. Free, batch-friendly and 100% private — your photos never leave your device.",
    url: "/heic-to-jpg",
    siteName: "MiniToolbox",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HEIC to JPG — Convert iPhone Photos Free",
    description:
      "Convert iPhone HEIC photos to JPG in your browser. Free, private, no uploads.",
  },
};

const faqs = [
  {
    q: "Why can't I open HEIC photos on my Windows PC?",
    a: "HEIC is Apple's image format, used by default on iPhones since iOS 11. Windows and many apps can't display it without extra software. Converting to JPG makes the photo open everywhere.",
  },
  {
    q: "Does converting HEIC to JPG lose quality?",
    a: "JPG is a compressed format, so there is a small quality reduction — at the default 92% quality it is visually indistinguishable from the original. Choose PNG output if you need a mathematically lossless copy.",
  },
  {
    q: "Can I convert multiple HEIC files at once?",
    a: "Yes. Drop as many HEIC photos as you like and they are converted one by one, then you can download them individually or all at once.",
  },
  {
    q: "Are my photos uploaded to a server?",
    a: "No. The HEIC decoder runs entirely inside your browser using WebAssembly. Your photos never leave your device — you can even go offline after the page loads.",
  },
  {
    q: "How do I stop my iPhone from taking HEIC photos?",
    a: "On your iPhone go to Settings → Camera → Formats and choose “Most Compatible”. New photos will then be saved as JPG.",
  },
];

export default function HeicToJpgPage() {
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
        <h1>HEIC to JPG Converter</h1>
        <p className="sub">
          Turn iPhone HEIC photos into universal JPG (or lossless PNG) —
          instantly, free and 100% private. Nothing is ever uploaded.
        </p>
      </div>

      <div className="container">
        <HeicToJpgTool />
      </div>

      <div className="container prose">
        <h2>How to convert HEIC to JPG</h2>
        <ol>
          <li>Drop your HEIC or HEIF photos into the box above.</li>
          <li>Pick JPG (universal) or PNG (lossless with transparency).</li>
          <li>Click Convert, then download the results.</li>
        </ol>

        <h2>What is HEIC, anyway?</h2>
        <p>
          HEIC (High Efficiency Image Container) is the format Apple uses by
          default for iPhone and iPad photos since iOS 11. It stores photos at
          roughly half the size of JPG — great for storage, but a headache
          when you move photos to a Windows PC, an Android phone, or many
          websites and apps that only accept JPG.
        </p>
        <p>
          Converting to JPG is the simplest fix: the resulting file opens on
          every device and uploads to every form, email and social network.
        </p>

        <h2>More free tools</h2>
        <ul>
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
