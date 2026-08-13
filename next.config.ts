import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

<<<<<<< HEAD
const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
=======
// When deploying to a GitHub Pages *project* site the app is served from
// https://<user>.github.io/<repo>/, so it needs a base path. The CI workflow
// sets NEXT_PUBLIC_BASE_PATH to "/<repo>". For local builds / user or org
// pages it stays empty and the site is served from the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Produce a fully static site in ./out that GitHub Pages can serve.
  output: "export",
  // Emit /en/index.html instead of /en.html so sub-path routing works on Pages.
  trailingSlash: true,
  // GitHub Pages has no Image Optimization server.
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
>>>>>>> origin/main
};

export default withNextIntl(nextConfig);
