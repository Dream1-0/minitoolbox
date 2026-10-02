import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "MiniToolbox privacy policy: all files are processed locally in your browser and never uploaded. No accounts, no tracking of your documents.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | MiniToolbox",
    description:
      "All files are processed locally in your browser and never uploaded. No accounts, no tracking of your documents.",
    url: "/privacy-policy",
    siteName: "MiniToolbox",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | MiniToolbox",
    description:
      "All files are processed locally in your browser and never uploaded.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container prose">
      <h1>Privacy Policy</h1>
      <p className="section-sub">Last updated: October 2, 2026</p>

      <h2>Overview</h2>
      <p>
        MiniToolbox (&quot;we&quot;, &quot;the site&quot;) provides free online
        tools for working with images and PDF files. This policy explains what
        data we handle — and, just as importantly, what we do not.
      </p>

      <h2>Your files never leave your device</h2>
      <p>
        Every tool on this site — image compression, format conversion, HEIC
        conversion, PDF merging and splitting — runs entirely inside your web
        browser using JavaScript and WebAssembly.
      </p>
      <p>
        When you select a file, it is read directly from your device into your
        browser&apos;s memory, processed locally, and returned to you as a
        download. <strong>No file is ever uploaded to our servers or any
        third-party server.</strong> You can even disconnect from the internet
        after the page has loaded and the tools will continue to work.
      </p>
      <p>
        Because of this architecture, we never see, store, or have access to
        the documents, photos or any other files you process.
      </p>

      <h2>Information we do not collect</h2>
      <ul>
        <li>We do not require an account, sign-up or login.</li>
        <li>We do not collect your files or their contents.</li>
        <li>We do not ask for your name, email address or payment details.</li>
      </ul>

      <h2>Automatic technical data</h2>
      <p>
        Like virtually all websites, our hosting provider (Vercel) processes
        standard technical request data such as your IP address, browser type
        and the pages you visit, in order to serve the site and protect it from
        abuse. This data is handled under Vercel&apos;s own privacy policy and
        is not used by us to identify you.
      </p>

      <h2>Cookies and local storage</h2>
      <p>
        The site does not use advertising or analytics cookies today. If we
        later add analytics or advertising (for example, Google AdSense), this
        policy will be updated before that happens, and any such usage will
        comply with applicable consent requirements.
      </p>

      <h2>Third-party links</h2>
      <p>
        Some pages link to other websites or tools. We are not responsible for
        the privacy practices of third-party sites, and we encourage you to
        read their policies.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        The site is safe for all ages and does not knowingly collect any
        personal information from anyone, including children under 13.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we make material changes to this policy, we will update the
        &quot;Last updated&quot; date above and, for significant changes, add a
        notice on the homepage.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? You can reach us through the{" "}
        <a
          href="https://github.com/Dream1-0/minitoolbox"
          target="_blank"
          rel="noopener noreferrer"
        >
          project repository on GitHub
        </a>
        .
      </p>

      <p>
        <Link href="/">← Back to all tools</Link>
      </p>
    </div>
  );
}
