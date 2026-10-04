/**
 * Canonical site origin, used for metadata, robots, sitemap, RSS and OG URLs.
 * Set NEXT_PUBLIC_SITE_URL in the environment (no trailing slash needed).
 *
 * In production an incorrect origin silently poisons every canonical, hreflang,
 * sitemap, RSS and OpenGraph URL, so we fail fast if it's missing rather than
 * fall back to a placeholder domain. In development we use localhost so local
 * work isn't blocked.
 */
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured && configured.trim().length > 0) {
    return configured.replace(/\/+$/, "");
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not set. It is required in production so " +
        "canonical, hreflang, sitemap, RSS and OpenGraph URLs are correct. " +
        "Set it to the public origin (e.g. https://macan.example) with no " +
        "trailing slash.",
    );
  }

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
