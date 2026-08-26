"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { getConsent, subscribeConsent } from "@/lib/consent";

/**
 * Loads Google Analytics on the client, but only after the visitor has
 * accepted cookies. Reading consent client-side (instead of via cookies() in
 * the server layout) keeps pages statically renderable.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  const consent = useSyncExternalStore(
    subscribeConsent,
    () => getConsent(),
    () => null, // server snapshot: never inject during SSR
  );

  if (!gaId || consent !== "accepted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
