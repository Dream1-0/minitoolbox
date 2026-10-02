import Link from "next/link";

const TOOLS = [
  {
    href: "/compress-image",
    title: "Compress Image to Target Size",
    desc: "Shrink JPG, PNG or WebP to exactly 20KB, 50KB, 100KB and more — perfect for exam forms, visa photos and job applications.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 16 12 14 15 10 9 8 12 2 12" />
        <rect x="2" y="5" width="20" height="14" rx="2" />
      </svg>
    ),
  },
  {
    href: "/convert-image",
    title: "Convert Image Format",
    desc: "Convert between PNG, JPG, WebP and BMP right in your browser. No watermark, no quality surprises.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 3l4 4-4 4" />
        <path d="M21 7H8a5 5 0 0 0-5 5" />
        <path d="M7 21l-4-4 4-4" />
        <path d="M3 17h13a5 5 0 0 0 5-5" />
      </svg>
    ),
  },
  {
    href: "/heic-to-jpg",
    title: "HEIC to JPG",
    desc: "Convert iPhone HEIC photos to universal JPG or PNG. Fixes “can't open HEIC” on Windows in seconds.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    href: "/merge-pdf",
    title: "Merge PDF",
    desc: "Combine multiple PDF files into one document. Drag, reorder and merge in seconds — files never uploaded.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 7h12m0 0-3-3m3 3-3 3" />
        <path d="M16 17H4m0 0 3 3m-3-3 3-3" />
      </svg>
    ),
  },
  {
    href: "/split-pdf",
    title: "Split PDF",
    desc: "Extract page ranges or split a PDF into single pages. Type “1-3, 5” and get exactly the pages you need.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 3h5v5" />
        <path d="M8 3H3v5" />
        <path d="M21 3l-7 7" />
        <path d="M3 3l7 7" />
        <path d="M16 21h5v-5" />
        <path d="M21 21l-7-7" />
        <path d="M8 21H3v-5" />
        <path d="M3 21l7-7" />
      </svg>
    ),
  },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MiniToolbox",
    url: "https://minitoolbox-ten.vercel.app",
    description:
      "Free browser-based image and PDF tools. Files are processed locally and never uploaded to a server.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="container hero">
        <h1>Free Online File Tools.<br />Fast, Private, No Uploads.</h1>
        <p className="lead">
          Compress images to an exact size, convert formats, merge and split
          PDFs — everything runs inside your browser, so your files never
          leave your device.
        </p>
      </section>

      <section className="container">
        <div className="grid-tools">
          {TOOLS.map((t) => (
            <Link href={t.href} key={t.href} className="tool-card">
              <span className="icon-badge">{t.icon}</span>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <h2>Why MiniToolbox?</h2>
        <p className="section-sub">
          Most online tools upload your files to a server first. We do it
          differently.
        </p>
        <div className="privacy-grid">
          <div className="privacy-item">
            <span className="icon-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <div>
              <h3>100% Private</h3>
              <p>Your files are processed on your own device. Nothing is ever uploaded.</p>
            </div>
          </div>
          <div className="privacy-item">
            <span className="icon-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
            </span>
            <div>
              <h3>Instantly Fast</h3>
              <p>No waiting for uploads or downloads from a server. It just works.</p>
            </div>
          </div>
          <div className="privacy-item">
            <span className="icon-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <div>
              <h3>Free & Unlimited</h3>
              <p>No sign-up, no watermarks, no daily limits. Use it as much as you like.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container section faq">
        <h2>Frequently Asked Questions</h2>
        <p className="section-sub">Everything you need to know.</p>
        <details>
          <summary>Are my files really never uploaded?</summary>
          <p>
            Correct. All processing happens locally in your browser using
            JavaScript and WebAssembly. You can even disconnect from the
            internet after loading the page — the tools will still work.
          </p>
        </details>
        <details>
          <summary>Is it free?</summary>
          <p>
            Yes, all tools are completely free with no watermarks or page
            limits. The site is supported by ads.
          </p>
        </details>
        <details>
          <summary>How do I compress an image to exactly 100KB?</summary>
          <p>
            Open the <Link href="/compress-image">Compress Image</Link> tool,
            pick the 100KB target (or type a custom size), select your image
            and click Compress. The tool automatically finds the best quality
            that fits your target size.
          </p>
        </details>
        <details>
          <summary>Does it work on mobile?</summary>
          <p>
            Yes. The site works in any modern browser on Windows, macOS,
            Android and iOS — no app installation needed.
          </p>
        </details>
      </section>
    </>
  );
}
