import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// When deploying to a GitHub Pages *project* site the app is served from
// https://<user>.github.io/<repo>/, so it needs a base path. The CI workflow
// sets NEXT_PUBLIC_BASE_PATH to "/<repo>". For local builds / user or org
// pages it stays empty and the site is served from the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Produce a fully static site in ./out that GitHub Pages can serve.
  // Only applied in the GitHub Pages CI build (see .github/workflows) —
  // static export can't run API routes or middleware, so local dev and
  // any server-based deploy (e.g. Vercel, tracked in issue #18) must skip it.
  ...(process.env.GITHUB_PAGES_BUILD === "true" ? { output: "export" as const } : {}),
  // Emit /en/index.html instead of /en.html so sub-path routing works on Pages.
  trailingSlash: true,
  images: {
    // GitHub Pages has no Image Optimization server.
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default withNextIntl(nextConfig);