import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withPayload } from "@payloadcms/next/withPayload";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Baseline security headers applied to every route. These are framework-agnostic
// and safe to enable without per-page tuning.
//
// A Content-Security-Policy is intentionally NOT set here: a strict CSP needs a
// nonce for the inline Plausible init script (components/legal/Analytics.tsx)
// and for emotion's injected styles, plus allowances for the Payload admin, so
// it must be added deliberately (ideally via middleware) and tested against
// /admin before enabling. See the template in the comment below.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // HSTS. Safe once the site is served over HTTPS only; remove `preload` unless
  // you intend to submit the domain to the HSTS preload list.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  images: {
    // Local SVGs live in /public; allow the optimizer to serve them safely.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Payload injects a webpack config; this avoids the Turbopack warning
  // noted in docs/CMS-PAYLOAD.md.
  turbopack: {},
};

export default withPayload(withNextIntl(nextConfig));
