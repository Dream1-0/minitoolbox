import type { Metadata } from "next";
import Link from "next/link";
import CompressImageTool from "@/components/CompressImageTool";

export const metadata: Metadata = {
  title: "Compress Image to 100KB, 50KB or Any Size",
  description:
    "Compress JPG, PNG or WebP images to an exact target size right in your browser. Free, unlimited and 100% private — files never leave your device.",
  keywords: [
    "compress image to 100kb",
    "compress jpeg to 50kb",
    "compress png to 20kb",
    "reduce image size kb",
    "photo size compressor",
  ],
  alternates: { canonical: "/compress-image" },
  openGraph: {
    title: "Compress Image to 100KB, 50KB or Any Size",
    description:
      "Compress JPG, PNG or WebP images to an exact target size right in your browser. Free, unlimited and 100% private.",
    url: "/compress-image",
    siteName: "MiniToolbox",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Image to 100KB, 50KB or Any Size",
    description:
      "Compress JPG, PNG or WebP to an exact target size in your browser. Free and 100% private.",
  },
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
  {
    q: "Does compressing remove metadata such as GPS location?",
    a: "Re-encoding an image normally drops extra metadata like camera details and location tags. Your original file is never modified, so you can keep it as a backup. For photos shared publicly, that is often a privacy advantage.",
  },
  {
    q: "Which file types can I compress?",
    a: "JPG, PNG, WebP, BMP and GIF images are supported. PNG, BMP and GIF are saved as JPG to achieve the smallest size, while JPG and WebP keep their original format.",
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

        <h2>What “under 100KB” actually means</h2>
        <p>
          When a form says “photo must be under 100KB”, it is talking about the
          file size on disk, not the image dimensions. Portals differ on
          whether they count 1KB as 1,000 or 1,024 bytes, so this tool targets
          the stricter 1,024-byte definition. A file that passes here will pass
          either rule.
        </p>
        <p>
          File size and pixel size are separate things: a 4000×3000 photo can
          end up at 40KB after aggressive compression, while a 600×600
          screenshot can be 300KB as PNG. If the requirements also mention
          dimensions, resize first with the{" "}
          <Link href="/resize-image">Image Resizer</Link>, then compress the
          result.
        </p>

        <h2>Common size requirements</h2>
        <ul>
          <li>
            <strong>Signatures:</strong> 10–20KB, usually JPG only.
          </li>
          <li>
            <strong>Passport and visa photos:</strong> 20–100KB, often with a
            fixed pixel size as well.
          </li>
          <li>
            <strong>Exam and job application photos:</strong> 50KB, 100KB or
            200KB.
          </li>
          <li>
            <strong>Website images:</strong> 100–300KB for large photos, 20–60KB
            for thumbnails.
          </li>
        </ul>
        <p>
          Always read the portal&apos;s exact wording. Many government forms
          specify both a maximum file size and a pixel size, and a file can
          pass one rule while failing the other.
        </p>

        <h2>What compression gives up</h2>
        <p>
          JPG compression discards fine detail the eye is unlikely to notice at
          normal viewing sizes. At 70–90% quality, photos look virtually
          identical to the original. Below roughly 50%, you start to see
          blocking around high-contrast edges, ringing around text, and banding
          in smooth gradients such as skies.
        </p>
        <p>
          Text-heavy images such as screenshots, scanned forms and diagrams
          suffer more, because JPG is designed for photographs rather than
          sharp black-on-white edges. If the portal accepts PNG and the file is
          already under the limit, keep PNG. If it only accepts JPG, compress at
          the highest quality that still fits.
        </p>

        <h2>When the target cannot be reached</h2>
        <ul>
          <li>
            An image that is already smaller than the target is returned as
            close as possible and marked in the results list.
          </li>
          <li>
            Extremely detailed images sometimes need a lower-resolution output.
            If a result is still above the target, resize it first and run the
            compression again.
          </li>
          <li>
            Transparent PNGs are flattened onto a white background when saved
            as JPG, because JPG has no transparency channel.
          </li>
        </ul>

        <h2>More free tools</h2>
        <p>
          Planning to upload to a government portal or job site? The guide{" "}
          <Link href="/guides/compress-image-for-online-forms">
            Compressing a photo for online forms
          </Link>{" "}
          walks through typical size limits and the order to resize and
          compress.
        </p>
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
