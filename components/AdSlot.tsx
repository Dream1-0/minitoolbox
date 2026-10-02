"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { usePro } from "@/lib/pro";

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT;

/** Pages that never show ads. */
const EXCLUDED = ["/pro", "/privacy-policy"];

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSlot() {
  const pathname = usePathname();
  const isPro = usePro();
  const pushed = useRef(false);
  // True once the Pro state has been read from localStorage on the client.
  // The ad script must NOT be injected before this, or a Pro user's first
  // paint would briefly load it (script tags cannot be unloaded).
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const disabled = !CLIENT || !SLOT || isPro || EXCLUDED.includes(pathname);

  useEffect(() => {
    if (disabled || !ready || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // ad script blocked or not loaded — leave the slot empty
    }
  }, [disabled, ready]);

  if (disabled) return null;

  // The AdSense script lives here (not in the layout) so that Pro users and
  // excluded pages load zero Google ad script requests at all.
  return (
    <div className="ad-slot">
      {ready && (
        <Script
          id="adsense"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
      <span className="ad-label">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={CLIENT}
        data-ad-slot={SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
