import type { Metadata } from "next";
import Link from "next/link";
import ResizeImageTool from "@/components/ResizeImageTool";

export const metadata: Metadata = {
  title: "Resize Image — JPG, PNG, WebP Resizer Online",
  description:
    "Resize JPG, PNG or WebP images by pixels or percentage in your browser. Free, batch-friendly and 100% private — files never leave your device.",
  keywords: [
    "resize image online",
    "image resizer",
    "resize jpg",
    "resize png",
    "resize webp",
    "bulk image resize",
    "resize image without losing quality",
  ],
  alternates: { canonical: "/resize-image" },
  openGraph: {
    title: "Resize Image — JPG, PNG, WebP Resizer Online",
    description:
      "Resize JPG, PNG or WebP images by pixels or percentage in your browser. Free, batch-friendly and 100% private — files never leave your device.",
    url: "/resize-image",
    siteName: "MiniToolbox",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Image — JPG, PNG, WebP Resizer Online",
    description:
      "Resize images by pixels or percentage in your browser. Free, private, no uploads.",
  },
};

const faqs = [
  {
    q: "Can I resize multiple images at once?",
    a: "Yes. Drop as many images as you like, enter one target width (or percentage) and they are all resized in one go. With aspect ratio kept, each image keeps its own proportions.",
  },
  {
    q: "Will resizing reduce the image quality?",
    a: "Shrinking an image keeps it looking sharp at typical sizes. The tool uses the browser's highest-quality smoothing, and for JPG or WebP output you can also pick the compression quality yourself.",
  },
  {
    q: "What is the difference between resizing and compressing?",
    a: "Resizing changes the pixel dimensions (width × height) of an image. Compressing keeps the dimensions the same but reduces file size. If you need an image under a specific size like 100KB, use the Compress Image tool instead.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "No. Resizing runs entirely in your browser using the canvas API. Your images never leave your device — you can even go offline after the page loads.",
  },
  {
    q: "How do I resize an image to specific dimensions like 1280×720?",
    a: "Enter 1280 as the width, untick “Keep aspect ratio”, enter 720 as the height and click Resize. Note this may stretch the image unless the original has the same proportions.",
  },
  {
    q: "Does resizing change the DPI of my image?",
    a: "Resizing changes pixel dimensions, not physical print size. DPI is a printing instruction rather than real image data, so set the print size in your layout or photo app. What matters for sharpness is having enough pixels for the size you print.",
  },
  {
    q: "Can I resize iPhone HEIC photos here?",
    a: "Convert them to JPG first with the HEIC to JPG tool, then resize. Most browsers cannot decode HEIC images directly inside the canvas.",
  },
];

export default function ResizeImagePage() {
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
        <h1>Image Resizer</h1>
        <p className="sub">
          Resize JPG, PNG or WebP images by pixels or percentage — instantly,
          free and 100% private. Nothing is ever uploaded.
        </p>
      </div>

      <div className="container">
        <ResizeImageTool />
      </div>

      <div className="container prose">
        <h2>How to resize an image</h2>
        <ol>
          <li>Drop your images into the box above.</li>
          <li>
            Pick a target width in pixels (height is scaled automatically to
            keep proportions) or scale by percentage.
          </li>
          <li>
            Choose the output format, click Resize and download the results.
          </li>
        </ol>

        <h2>Common resize tasks</h2>
        <p>
          <strong>Avatar or profile pictures:</strong> most platforms use square
          images between 200 and 800 pixels wide. A width of 512px is a safe
          default and keeps uploads fast.
        </p>
        <p>
          <strong>Email attachments and forms:</strong> many portals reject
          large images. Resizing a photo to a width of 800–1200px usually
          brings a multi-megabyte photo down to a fraction of the size while
          still looking crisp.
        </p>
        <p>
          <strong>Web performance:</strong> an image displayed at 600px wide
          should not be shipped at 4000px. Resizing to the display size (plus a
          little for retina screens) is the single biggest speedup for a
          page that loads slowly.
        </p>
        <p>
          Need the file below an exact size like 100KB instead? The{" "}
          <Link href="/compress-image">Compress Image</Link> tool finds the
          best quality that fits a target size.
        </p>

        <h2>Pixels, percentages and print size</h2>
        <p>
          Pixels are the real dimensions of a digital image. A 3000×2000 photo
          contains three thousand pixels across and two thousand down, no matter
          how large it appears on screen. Percentage mode simply multiplies
          those numbers — 50% turns 3000×2000 into 1500×1000.
        </p>
        <p>
          Print size is a separate calculation: pixels ÷ DPI. At 300 DPI, which
          is the usual standard for photo prints, a 3000×2000 image prints at
          10×6.7 inches. For a 6×4 inch print at 300 DPI you need at least
          1800×1200 pixels. For web use, 72–150 DPI is plenty, because screens
          only care about pixel dimensions.
        </p>

        <h2>Keep the aspect ratio — or unlock it</h2>
        <p>
          With “Keep aspect ratio” enabled, you type one dimension and the other
          is calculated automatically. This is the safe default: circles stay
          circular and faces stay in proportion. Unlock it only when a portal
          demands exact dimensions and you are willing to stretch the image, for
          example forcing a rectangular photo into a square upload slot.
        </p>
        <p>
          Stretching is not cropping. The tool never cuts parts of the picture
          off; it either scales both sides equally or stretches them
          independently. If a specific crop is required, crop in your photo app
          first, then resize.
        </p>

        <h2>Resize first, then compress</h2>
        <p>
          If a photo must fit under a size limit, resizing to sensible
          dimensions first gives the compressor far less work and preserves more
          visible detail. A 12-megapixel photo pushed straight into a 50KB limit
          ends up heavily compressed and soft; the same photo resized to
          1200×800 can hit 50KB with much crisper detail.
        </p>

        <h2>What to avoid</h2>
        <ul>
          <li>
            <strong>Enlarging small images.</strong> Scaling up cannot invent
            detail; the result looks blurry or blocky.
          </li>
          <li>
            <strong>Repeated resizing.</strong> Each save re-encodes the file.
            Do all edits in one pass where possible.
          </li>
          <li>
            <strong>Shipping oversized images on websites.</strong> A 4000px
            image displayed at 600px wastes bandwidth and slows the page down.
          </li>
        </ul>

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
            <Link href="/heic-to-jpg">HEIC to JPG</Link> — convert iPhone
            photos to a universal format
          </li>
          <li>
            <Link href="/qr-code-generator">QR Code Generator</Link> — free
            PNG and SVG download
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
