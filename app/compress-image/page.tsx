import type { Metadata } from "next";
import Link from "next/link";
import CompressImageTool from "@/components/CompressImageTool";

export const metadata: Metadata = {
  title: "Compress Image to 100KB, 50KB or Any Size — Free, No Upload",
  description:
    "Compress JPG, PNG or WebP images to an exact target size (20KB, 50KB, 100KB and more) right in your browser. Perfect for exam forms, job applications and visa photos. Free, unlimited and 100% private.",
  keywords: [
    "compress image to 100kb",
    "compress jpeg to 50kb",
    "compress png to 20kb",
    "reduce image size kb",
    "photo size compressor",
  ],
};

const faqs = [
  {
    q: "How do I compress an image to exactly 100KB?",
    a: "Select the 100KB preset (or type a custom size), choose your image and click Compress. The tool automatically lowers quality and dimensions step by step until your file fits the target size.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "No. All compression happens locally in your browser. Your files never leave your device, which makes it safe for ID photos and sensitive documents.",
  },
  {
    q: "Why is my PNG converted to JPG?",
    a: "PNG is a lossless format and often stays large. Converting to JPG achieves much smaller sizes, which is usually required by exam forms and application portals.",
  },
  {
    q: "What if my image is already smaller than the target?",
    a: "If the image cannot reach the target size (for example a very small image), we keep the closest possible result and mark it in the file list.",
  },
];

export default function CompressImagePage() {
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
        <h1>Compress Image to Target Size</h1>
        <p className="sub">
          Shrink JPG, PNG or WebP to exactly the size you need — 20KB, 50KB,
          100KB or any custom size. 100% private, nothing is uploaded.
        </p>
      </div>

      <div className="container">
        <CompressImageTool />
      </div>

      <div className="container prose">
        <h2>How to compress an image</h2>
        <ol>
          <li>Pick a target size preset or type a custom size in KB.</li>
          <li>Click the drop zone (or drag images in) and select your files.</li>
          <li>
            Click <strong>Compress</strong> — each result shows the original and
            compressed size.
          </li>
          <li>Click Download for individual files, or Download all.</li>
        </ol>

        <h2>Perfect for online forms and applications</h2>
        <p>
          Government exam forms, university applications, visa portals and job
          application sites often reject photos that are too large. Common
          requirements include “photo must be under 50KB”, “signature image
          below 20KB” or “maximum 100KB”. This tool hits those exact targets
          automatically — no trial and error.
        </p>

        <h2>Private by design</h2>
        <p>
          Unlike most online compressors, your photos are processed entirely on
          your own device. Nothing is uploaded, stored or shared — ideal for ID
          photos, passports and confidential documents.
        </p>

        <h2>More free tools</h2>
        <ul>
          <li>
            <Link href="/convert-image">Convert image format</Link> — PNG, JPG,
            WebP and BMP conversion
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
