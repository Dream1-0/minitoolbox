import type { Metadata } from "next";
import Link from "next/link";
import ProActivate from "@/components/ProActivate";

export const metadata: Metadata = {
  title: "Go Pro — Remove Ads & Support MiniToolbox",
  description:
    "Activate MiniToolbox Pro with your license key: an ad-free experience on every tool, everywhere. One-time purchase, no account, everything stays local.",
  keywords: [
    "minitoolbox pro",
    "remove ads",
    "ad-free tools",
    "license key activation",
  ],
  alternates: { canonical: "/pro" },
  openGraph: {
    title: "Go Pro — Remove Ads & Support MiniToolbox",
    description:
      "Activate MiniToolbox Pro with your license key: an ad-free experience on every tool, everywhere. One-time purchase, no account, everything stays local.",
    url: "/pro",
    siteName: "MiniToolbox",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Go Pro — Remove Ads & Support MiniToolbox",
    description:
      "Ad-free access to every tool. One-time purchase, no account.",
  },
};

export default function ProPage() {
  return (
    <>
      <div className="container tool-head">
        <h1>Go Pro</h1>
        <p className="sub">
          An ad-free MiniToolbox on every tool, on every device you use —
          with a one-time purchase instead of a subscription.
        </p>
      </div>

      <div className="container">
        <ProActivate />
      </div>

      <div className="container prose">
        <h2>What you get</h2>
        <ul>
          <li>
            <strong>No ads anywhere</strong> — every tool page, homepage and
            article, on all your browsers and devices.
          </li>
          <li>
            <strong>Everything else stays the same</strong> — all tools remain
            free, unlimited and local-first. Pro only removes the ads.
          </li>
          <li>
            <strong>You support the site</strong> — MiniToolbox runs without
            accounts or uploads; Pro is what keeps it that way.
          </li>
        </ul>

        <h2>How activation works</h2>
        <ol>
          <li>Purchase a Pro license (checkout opens when sales go live).</li>
          <li>A license key arrives in your confirmation email.</li>
          <li>Paste it above and click Activate — done.</li>
        </ol>
        <p>
          There is no account to create. The key is checked and stored in your
          browser only, so nothing about you is sent to or stored on a server.
          Re-enter the same key on any other device to remove ads there too.
        </p>

        <h2>Frequently asked questions</h2>
        <details>
          <summary>Is Pro a subscription?</summary>
          <p>
            No — it is a one-time purchase. Your license key keeps working
            forever, including on future tools added to the site.
          </p>
        </details>
        <details>
          <summary>I lost my key. What now?</summary>
          <p>
            Search your email for your purchase receipt — the key is in the
            confirmation message. If you cannot find it, contact support from
            the address you purchased with.
          </p>
        </details>
        <details>
          <summary>Does activation track me?</summary>
          <p>
            No. Validation happens in your browser and the key is saved in
            local storage on that device. There are no accounts, cookies set
            for Pro, or server-side profiles.
          </p>
        </details>
        <details>
          <summary>Can I use the tools without Pro?</summary>
          <p>
            Yes, always. Every tool on{" "}
            <Link href="/">MiniToolbox</Link> is free with no limits — Pro is
            purely the ad-free option for people who want to support the site.
          </p>
        </details>
      </div>
    </>
  );
}
