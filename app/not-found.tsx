import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

const TOOLS = [
  { href: "/compress-image", label: "Compress Image" },
  { href: "/convert-image", label: "Convert Image" },
  { href: "/heic-to-jpg", label: "HEIC to JPG" },
  { href: "/merge-pdf", label: "Merge PDF" },
  { href: "/split-pdf", label: "Split PDF" },
];

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: "center", padding: "72px 0" }}>
      <p style={{ fontSize: 64, fontWeight: 800, margin: 0, lineHeight: 1 }}>
        404
      </p>
      <h1 style={{ marginTop: 8 }}>Page not found</h1>
      <p className="sub" style={{ maxWidth: 460, margin: "12px auto 24px" }}>
        The page you are looking for doesn&apos;t exist or has been moved.
        Try one of our free tools instead.
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
        }}
      >
        {TOOLS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="btn btn-ghost"
            style={{ textDecoration: "none" }}
          >
            {t.label}
          </Link>
        ))}
      </div>
      <p style={{ marginTop: 24 }}>
        <Link href="/">← Back to homepage</Link>
      </p>
    </div>
  );
}
