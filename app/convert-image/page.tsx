import type { Metadata } from "next";
import Link from "next/link";
import ConvertImageTool from "@/components/ConvertImageTool";

export const metadata: Metadata = {
  title: "Convert Image Format — PNG, JPG, WebP, BMP",
  description:
    "Convert images between PNG, JPG, WebP and BMP formats directly in your browser. No uploads, no watermarks, no sign-up. Free and 100% private.",
  keywords: [
    "png to jpg converter",
    "jpg to webp",
    "webp to png",
    "image format converter",
    "heic to jpg free",
  ],
  alternates: { canonical: "/convert-image" },
  openGraph: {
    title: "Convert Image Format — PNG, JPG, WebP, BMP",
    description:
      "Convert images between PNG, JPG, WebP and BMP formats directly in your browser. No uploads, no watermarks, no sign-up.",
    url: "/convert-image",
    siteName: "MiniToolbox",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert Image Format — PNG, JPG, WebP, BMP",
    description:
      "Convert between PNG, JPG, WebP and BMP right in your browser. No uploads, no watermarks.",
  },
};

const faqs = [
  {
    q: "Which formats can I convert between?",
    a: "You can convert any browser-supported image (PNG, JPG, WebP, BMP, GIF) to PNG, JPG or WebP. JPG and WebP output let you choose a quality level.",
  },
  {
    q: "What happens to transparency when converting to JPG?",
    a: "JPG does not support transparency, so transparent areas are filled with a white background automatically.",
  },
  {
    q: "Which format should I choose for the smallest file?",
    a: "WebP usually produces the smallest files at the same visual quality, followed by JPG. PNG is best when you need transparency or lossless quality.",
  },
  {
    q: "Are my images uploaded anywhere?",
    a: "No. Conversion runs entirely in your browser — your files never leave your device.",
  },
  {
    q: "Can I convert HEIC photos with this tool?",
    a: "Use the dedicated HEIC to JPG tool instead. Most browsers cannot decode iPhone HEIC files directly, so that page loads a HEIC decoder and handles the conversion for you.",
  },
  {
    q: "Does converting change the image dimensions?",
    a: "No. Conversion only changes the encoding — the pixel width and height stay the same. To change dimensions, use the Image Resizer.",
  },
];

export default function ConvertImagePage() {
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
        <h1>Convert Image Format</h1>
        <p className="sub">
          Convert between PNG, JPG and WebP instantly — with a quality slider
          for full control. Free, unlimited and 100% private.
        </p>
      </div>

      <div className="container">
        <ConvertImageTool />
      </div>

      <div className="container prose">
        <h2>How to convert an image</h2>
        <ol>
          <li>Choose the output format: JPG, PNG or WebP.</li>
          <li>For JPG and WebP, pick a quality level (higher = better quality).</li>
          <li>Add your images, then click Convert.</li>
          <li>Download results individually or all at once.</li>
        </ol>

        <h2>When to use each format</h2>
        <ul>
          <li>
            <strong>JPG</strong> — the universal standard for photos. Opens
            everywhere, great for sharing and uploads.
          </li>
          <li>
            <strong>PNG</strong> — lossless with transparency support. Best for
            logos, screenshots and graphics.
          </li>
          <li>
            <strong>WebP</strong> — modern format, much smaller than JPG/PNG at
            similar quality. Great for websites and saving disk space.
          </li>
        </ul>

        <h2>PNG, JPG, WebP and BMP compared</h2>
        <table>
          <thead>
            <tr>
              <th>Format</th>
              <th>Transparency</th>
              <th>Compression</th>
              <th>Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>JPG</td>
              <td>No</td>
              <td>Lossy</td>
              <td>Photos, email attachments, uploads</td>
            </tr>
            <tr>
              <td>PNG</td>
              <td>Yes</td>
              <td>Lossless</td>
              <td>Logos, screenshots, sharp graphics</td>
            </tr>
            <tr>
              <td>WebP</td>
              <td>Yes</td>
              <td>Lossy or lossless</td>
              <td>Websites, smaller files at similar quality</td>
            </tr>
            <tr>
              <td>BMP</td>
              <td>Yes</td>
              <td>Uncompressed</td>
              <td>Legacy software; rarely the right choice</td>
            </tr>
          </tbody>
        </table>

        <h2>Choosing a quality level</h2>
        <p>
          For JPG, 85–92% is the sweet spot for photographs: the file is much
          smaller than the original and the difference is hard to see on a
          screen. Drop to around 75–80% when a portal enforces a size limit,
          and stay above 90% only for archival copies where every detail
          matters.
        </p>
        <p>
          WebP behaves similarly and usually produces an even smaller file at
          the same setting. For logos and screenshots where crisp edges matter,
          PNG or lossless WebP avoids the fuzzy artifacts that lossy formats
          introduce around text.
        </p>

        <h2>Transparency and backgrounds</h2>
        <p>
          JPG cannot store transparency, so transparent areas in a PNG or WebP
          are filled with white when converting to JPG. That is fine for
          photographs, but a logo with a transparent background will suddenly
          sit on a white box — choose PNG or WebP for anything that needs to
          blend into a coloured page, slide or app screen.
        </p>

        <h2>Screenshots, logos and photos</h2>
        <p>
          Screenshots and UI captures are dominated by flat colours and text.
          Lossless formats keep them razor-sharp, but the files can be large.
          If you need a smaller screenshot for a chat or email, JPG at 90% is
          usually acceptable; for a design handoff or a website asset, keep PNG.
        </p>
        <p>
          Photographs are the opposite case: they contain smooth gradients and
          fine noise, which JPG compresses efficiently. Converting a photo from
          PNG to JPG can shrink it five- or ten-fold with no visible change at
          normal viewing sizes.
        </p>

        <h2>What conversion cannot do</h2>
        <ul>
          <li>It cannot restore detail lost in an earlier compression pass.</li>
          <li>
            Converting a JPG to PNG does not improve quality; it usually makes
            the file much larger.
          </li>
          <li>
            It cannot add transparency to a photo that was saved with a solid
            background.
          </li>
        </ul>

        <h2>More free tools</h2>
        <ul>
          <li>
            <Link href="/heic-to-jpg">HEIC to JPG</Link> — convert iPhone
            photos to a universal format
          </li>
          <li>
            <Link href="/compress-image">Compress image to target size</Link> —
            hit exact KB requirements
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
