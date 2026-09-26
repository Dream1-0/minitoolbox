import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const TOOLS = [
  { href: "/compress-image", label: "Compress Image" },
  { href: "/convert-image", label: "Convert Image" },
  { href: "/merge-pdf", label: "Merge PDF" },
  { href: "/split-pdf", label: "Split PDF" },
];

export const metadata: Metadata = {
  metadataBase: new URL("https://minitoolbox-ten.vercel.app"),
  title: {
    default: "MiniToolbox — Free Online Image & PDF Tools, No Uploads",
    template: "%s | MiniToolbox",
  },
  description:
    "Free browser-based tools: compress images to an exact size, convert PNG/JPG/WebP, merge and split PDFs. 100% private — your files never leave your device.",
  keywords: [
    "compress image to 100kb",
    "compress png",
    "image compressor",
    "convert png to jpg",
    "webp converter",
    "merge pdf online",
    "split pdf online",
    "free file tools",
  ],
};

function Logo() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0" stopColor="#6366f1" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="7" fill="url(#lg)" />
      <path
        d="M13.2 4.5 6.6 13h4.4l-1.2 6.5L16.4 11H12l1.2-6.5Z"
        fill="#fff"
      />
    </svg>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="logo">
              <Logo />
              MiniToolbox
            </Link>
            <nav className="nav">
              {TOOLS.map((t) => (
                <Link key={t.href} href={t.href}>
                  {t.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container footer-inner">
            <span>
              © {new Date().getFullYear()} MiniToolbox. All files are processed
              locally in your browser.
            </span>
            <nav className="nav">
              {TOOLS.map((t) => (
                <Link key={t.href} href={t.href}>
                  {t.label}
                </Link>
              ))}
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
