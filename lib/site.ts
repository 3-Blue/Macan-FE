/**
 * Canonical site origin, used for metadata, robots and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL in the environment (no trailing slash needed).
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.macan-example.com"
).replace(/\/+$/, "");
