import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compress a Photo to 100KB for Online Forms",
  description:
    "A practical walkthrough for meeting photo size limits on exam, visa and job portals: what KB limits mean, when to resize, how to compress, and why uploads still fail.",
  alternates: { canonical: "/guides/compress-image-for-online-forms" },
  openGraph: {
    title: "Compress a Photo to 100KB for Online Forms",
    description:
      "What size limits really mean, when to resize before compressing, and how to avoid rejected uploads.",
    url: "/guides/compress-image-for-online-forms",
    siteName: "MiniToolbox",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress a Photo to 100KB for Online Forms",
    description:
      "What size limits really mean and how to avoid rejected uploads.",
  },
};

export default function CompressForFormsGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to compress a photo for online forms",
    description:
      "A practical walkthrough for meeting photo size limits on exam, visa and job portals.",
    datePublished: "2026-10-26",
    dateModified: "2026-10-26",
    author: { "@type": "Organization", name: "MiniToolbox" },
    publisher: { "@type": "Organization", name: "MiniToolbox" },
    mainEntityOfPage:
      "https://minitoolbox-ten.vercel.app/guides/compress-image-for-online-forms",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="container prose">
        <h1>How to compress a photo for online forms</h1>
        <p className="section-sub">
          A step-by-step method for meeting “photo must be under 100KB” rules
          without ruining the picture.
        </p>

        <p>
          Exam registrations, visa applications, job portals and university
          admission systems all impose photo limits. The rules look simple —
          “JPG, maximum 100KB, 600×600 pixels” — but a file can satisfy one
          requirement and fail another. This guide walks through the order that
          actually works.
        </p>

        <h2>Step 1: Read the requirement precisely</h2>
        <p>
          Two numbers matter, and they are often mixed up:
        </p>
        <ul>
          <li>
            <strong>File size</strong> — how many kilobytes the file occupies on
            disk, such as “under 100KB”.
          </li>
          <li>
            <strong>Pixel dimensions</strong> — how many pixels wide and tall
            the image is, such as “600×600” or “minimum 1000px on the long
            edge”.
          </li>
        </ul>
        <p>
          A 600×600 photo compressed to 40KB meets both. A 4000×3000 photo
          compressed to 40KB meets the size rule but still fails a dimension
          rule. Check the form wording and write both numbers down before
          touching the file.
        </p>

        <h2>Typical limits, for orientation</h2>
        <table>
          <thead>
            <tr>
              <th>Document type</th>
              <th>Typical file size</th>
              <th>Typical pixels</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Signature scan</td>
              <td>10–20KB</td>
              <td>140×60 to 300×100</td>
            </tr>
            <tr>
              <td>Passport / visa photo</td>
              <td>20–100KB</td>
              <td>600×600 or 35×45mm</td>
            </tr>
            <tr>
              <td>Exam application photo</td>
              <td>50–200KB</td>
              <td>Usually fixed, e.g. 600×800</td>
            </tr>
            <tr>
              <td>Job portal photo</td>
              <td>100KB–2MB</td>
              <td>Varies widely</td>
            </tr>
          </tbody>
        </table>
        <p>
          These are common ranges, not universal rules. Always trust the form
          you are filling in over any table on the internet, including this one.
        </p>

        <h2>Step 2: Resize or crop before compressing</h2>
        <p>
          Compression works best when the pixel count is already close to the
          required size. Shrinking a 12-megapixel phone photo to 600×600 first
          removes most of the data the compressor would otherwise have to
          discard. The result is a smaller file <em>and</em> a sharper image.
        </p>
        <p>
          Use the <Link href="/resize-image">Image Resizer</Link> with the
          aspect ratio locked if the form only specifies one edge, or unlock it
          and enter both dimensions if a square is required. If the person must
          be centred or the background cropped, do that in your phone&apos;s
          photo editor first — resizing scales the whole picture, it does not
          crop.
        </p>

        <h2>Step 3: Compress to the target size</h2>
        <p>
          Open the <Link href="/compress-image">Compress Image</Link> tool,
          choose the preset that matches the limit (20KB, 50KB, 100KB or a
          custom value) and add your image. The tool steps the quality down, and
          the resolution if necessary, until the file fits. You then download
          the result and the original stays untouched.
        </p>
        <p>
          For photos, a JPG output at 70–90% quality is usually indistinguishable
          from the original at form-photo sizes. For scanned signatures and
          documents, watch for fuzzy edges around the strokes; if the portal
          accepts PNG and the file is already small enough, keep PNG.
        </p>

        <h2>Step 4: Check the file before uploading</h2>
        <ul>
          <li>Confirm the file size in your downloads folder.</li>
          <li>Confirm the extension is exactly what the form requires (.jpg, not .jpeg or .png).</li>
          <li>Open the file and check the photo is the right way up.</li>
          <li>Confirm the dimensions if the form specified any.</li>
        </ul>

        <h2>Why an upload can still be rejected</h2>
        <p>
          <strong>Wrong dimensions.</strong> The most common cause. The file is
          under 100KB but 3000px wide, while the form wanted 600px.
        </p>
        <p>
          <strong>Wrong format despite the right extension.</strong> Renaming a
          PNG to .jpg does not convert it. The portal reads the file header and
          rejects it. Convert properly with the{" "}
          <Link href="/convert-image">Convert Image</Link> tool.
        </p>
        <p>
          <strong>Rotated photos.</strong> Phone photos store orientation as
          metadata. Some portals ignore that metadata, so a portrait photo
          appears sideways. Re-saving the image after resizing usually bakes the
          orientation into the pixels.
        </p>
        <p>
          <strong>Colour profile or bit depth.</strong> Rare, but some strict
          government systems only accept standard 8-bit sRGB JPG files. A
          normal re-encode produces exactly that.
        </p>

        <h2>A note on privacy</h2>
        <p>
          Passport photos, signatures and ID scans are exactly the files you
          should not upload to an unfamiliar “free compressor”. Every tool on
          this site processes files in your browser, so nothing is transmitted.
          You can test that claim by disconnecting from the internet after the
          page loads — the tool keeps working.
        </p>

        <h2>Applying from a phone</h2>
        <p>
          Mobile adds a few wrinkles. iPhone Safari often converts a HEIC photo
          to JPG automatically when a site only accepts JPG, but this depends on
          the site and the iOS version, so it is safer to convert the photo
          yourself first. Android photo pickers may hand over the original file
          untouched, including its full resolution, which can be far above the
          limit.
        </p>
        <p>
          Also check the photo itself before compressing: portrait-mode photos
          have a blurred background that is part of the image, not something a
          form will remove, and some phones add a location tag that a portal may
          object to. Re-encoding during compression usually strips that metadata,
          which is one more reason to process the file before uploading.
        </p>

        <h2>Signatures and documents, not just photos</h2>
        <p>
          Signature uploads usually demand 10–20KB and JPG only. Sign on plain
          white paper in even light, photograph it straight on, crop tightly,
          and convert to greyscale if the portal allows it — a black-and-white
          document compresses far better than a colour photo of paper. Avoid
          filters that add texture or shadows: they increase file size and make
          the signature look edited.
        </p>

        <h2>Related tools</h2>
        <ul>
          <li>
            <Link href="/compress-image">Compress Image</Link> — hit an exact KB
            target
          </li>
          <li>
            <Link href="/resize-image">Image Resizer</Link> — set pixel
            dimensions
          </li>
          <li>
            <Link href="/convert-image">Convert Image</Link> — change the format
            properly
          </li>
          <li>
            <Link href="/heic-to-jpg">HEIC to JPG</Link> — convert iPhone photos
            first
          </li>
        </ul>

        <p>
          <Link href="/guides">← All guides</Link>
        </p>
      </article>
    </>
  );
}
