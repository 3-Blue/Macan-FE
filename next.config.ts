import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withPayload } from "@payloadcms/next/withPayload";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Local SVGs live in /public; allow the optimizer to serve them safely.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Payload injects a webpack config; this avoids the Turbopack warning
  // noted in docs/CMS-PAYLOAD.md.
  turbopack: {},
};

export default withPayload(withNextIntl(nextConfig));
