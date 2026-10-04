import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

type Locale = (typeof routing.locales)[number];

const OG_LOCALE_MAP: Record<Locale, string> = {
  en: "en_US",
  fa: "fa_IR",
  az: "az_AZ",
  tr: "tr_TR",
};

/**
 * Sitewide default OpenGraph/Twitter preview image (1200x630).
 * Replace public/images/og-default.png with the real brand artwork before
 * launch; this placeholder just guarantees shared links have a valid preview.
 */
export const DEFAULT_OG_IMAGE = `${siteUrl}/images/og-default.png`;

/**
 * Serializes data for a <script type="application/ld+json"> tag, escaping `<`
 * as \u003c so a `</script>` sequence in (CMS-authored) data can't break out of
 * the tag. Use this instead of a bare JSON.stringify in dangerouslySetInnerHTML.
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

interface BuildMetadataParams {
  locale: Locale;
  /** Path WITHOUT locale prefix, e.g. "" for home, "/industries/oil-and-gas" */
  path: string;
  title: string;
  description: string;
  /** Optional OG image path, defaults to sitewide default if omitted */
  image?: string;
  /** OG type. Defaults to "website"; use "article" for post detail pages. */
  type?: "website" | "article";
  /** ISO 8601 date string. Required when type is "article". */
  publishedTime?: string;
  /** Author display name. Only used when type is "article". */
  author?: string;
}

/**
 * Builds a Metadata object with correct hreflang alternates, canonical URL,
 * and locale-correct OpenGraph data for a given page.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  image,
  type,
  publishedTime,
  author,
}: BuildMetadataParams): Metadata {
  const canonicalUrl = `${siteUrl}/${locale}${path}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${siteUrl}/${l}${path}`]),
  );
  // x-default points to the default locale version, per Google's guidance.
  languages["x-default"] = `${siteUrl}/${routing.defaultLocale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
      types: {
        "application/rss+xml": `${siteUrl}/rss.xml`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "MACAN",
      locale: OG_LOCALE_MAP[locale],
      ...(type === "article"
        ? {
            type: "article" as const,
            ...(publishedTime ? { publishedTime } : {}),
            ...(author ? { authors: [author] } : {}),
          }
        : { type: "website" as const }),
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Organization JSON-LD, reused sitewide. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MACAN",
    url: siteUrl,
    logo: DEFAULT_OG_IMAGE,
    description:
      "MACAN provides engineering, construction, supply, and project management solutions.",
  };
}

interface ArticleJsonLdParams {
  title: string;
  description: string;
  url: string;
  image?: string;
  author: string;
  datePublished: string;
}

/** Article JSON-LD for a single post detail page. */
export function articleJsonLd({
  title,
  description,
  url,
  image,
  author,
  datePublished,
}: ArticleJsonLdParams) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    ...(image ? { image: [image] } : {}),
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished: new Date(datePublished).toISOString(),
    publisher: {
      "@type": "Organization",
      name: "MACAN",
      url: siteUrl,
    },
  };
}
