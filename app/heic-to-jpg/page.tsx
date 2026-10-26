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
  {
    q: "Does conversion keep HDR and wide-colour information?",
    a: "The browser decodes and re-encodes the image as a standard 8-bit image, so extreme HDR highlights may be flattened. For everyday sharing, email and printing, the result looks the same as the original photo.",
  },
  {
    q: "Is there a file size or batch limit?",
    a: "No fixed limit. Everything is decoded on your device, so very large batches depend on your available memory. If a large batch slows down, convert it in smaller groups.",
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

        <h2>HEIC vs JPG: the practical differences</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>HEIC</th>
              <th>JPG</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>File size</td>
              <td>About half of JPG</td>
              <td>Larger</td>
            </tr>
            <tr>
              <td>Compatibility</td>
              <td>Apple devices; limited elsewhere</td>
              <td>Opens almost everywhere</td>
            </tr>
            <tr>
              <td>Quality at same size</td>
              <td>Better</td>
              <td>Good</td>
            </tr>
            <tr>
              <td>Transparency</td>
              <td>Supported by the format</td>
              <td>Not supported</td>
            </tr>
            <tr>
              <td>Typical use</td>
              <td>iPhone storage and iCloud</td>
              <td>Sharing, uploads, printing</td>
            </tr>
          </tbody>
        </table>

        <h2>Why Windows and Android struggle with HEIC</h2>
        <p>
          HEIC is built on the HEVC video codec, which carries patent licensing
          costs. That is the main reason it never became a default image format
          on Windows or Android. Windows 10 and 11 can install a HEIF Image
          Extensions package from the Microsoft Store, and some Android phones
          support HEIF, but support is inconsistent and many apps, websites and
          email clients still refuse the files.
        </p>
        <p>
          That is why the simplest fix is conversion rather than installing
          extra software on every device that needs to open the photo.
        </p>

        <h2>JPG or PNG output?</h2>
        <p>
          Choose JPG for photos you will share, email or upload. At the default
          quality the result is visually identical to the original and the file
          stays reasonably small. Choose PNG when you need a mathematically
          lossless copy — for editing, archiving or when the image has to be
          re-saved several times. PNG files are much larger, so it is a poor
          choice for sending a whole album.
        </p>

        <h2>Live Photos, bursts and edited photos</h2>
        <p>
          A Live Photo is actually two files: a HEIC still image and a short MOV
          video. This tool converts the still image only; the motion part stays
          behind. Burst photos arrive as separate HEIC files and convert
          normally. Photos edited on the iPhone keep their edits when the
          exported file includes the rendered image, which is what the camera
          roll normally provides.
        </p>

        <h2>More free tools</h2>
        <p>
          For a deeper comparison of the formats, read{" "}
          <Link href="/guides/heic-vs-jpg">
            HEIC vs JPG: which format should you use?
          </Link>
        </p>
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
