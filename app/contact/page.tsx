import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact MiniToolbox",
  description:
    "Report a bug, suggest a tool, or ask a question about MiniToolbox, Pro licenses or privacy. Contact details and reporting checklist.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact MiniToolbox",
    description:
      "Report a bug, suggest a tool, or ask about Pro licenses and privacy.",
    url: "/contact",
    siteName: "MiniToolbox",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact MiniToolbox",
    description: "Report a bug, suggest a tool, or ask about privacy.",
  },
};

export default function ContactPage() {
  return (
    <div className="container prose">
      <h1>Contact</h1>
      <p className="section-sub">
        Bugs, feature requests and privacy questions are all welcome.
      </p>

      <h2>How to reach us</h2>
      <p>
        The fastest and most reliable channel is the{" "}
        <a
          href="https://github.com/Dream1-0/minitoolbox/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          issue tracker on GitHub
        </a>
        . Open a new issue and describe what happened — public issues also help
        other visitors with the same problem find the answer.
      </p>
      <p>
        If you are reporting a security or privacy problem, please say so in the
        issue title so it can be looked at first.
      </p>

      <h2>What to include in a bug report</h2>
      <ul>
        <li>The tool you were using (for example Compress Image).</li>
        <li>Your browser and operating system.</li>
        <li>The file type and approximate size — not the file itself.</li>
        <li>What you expected to happen and what actually happened.</li>
        <li>Any error message shown on the page.</li>
      </ul>
      <p>
        Please do not attach documents that contain personal or confidential
        information. A description and, if possible, a screenshot of the
        interface is enough to reproduce most problems.
      </p>

      <h2>Pro licenses</h2>
      <p>
        If a license key does not activate, first check that you copied all four
        groups of characters, including the hyphens. Keys are validated locally
        in your browser, so no account or email is involved. If the key still
        fails, include the first group only in your message — never post the full
        key publicly.
      </p>

      <h2>About your files</h2>
      <p>
        Because every tool runs locally, we cannot see or recover files you
        processed. Reopening the page and processing the file again is always
        the right first step. Our <Link href="/privacy-policy">privacy policy</Link>{" "}
        explains what is stored and what is not.
      </p>

      <h2>Feature requests</h2>
      <p>
        Tell us which file format or task you are missing, and what you use it
        for. Requests that fit the local-processing model — formats a browser
        can decode or encode without a server — are the easiest to add.
      </p>

      <p>
        <Link href="/">← Back to all tools</Link>
      </p>
    </div>
  );
}
