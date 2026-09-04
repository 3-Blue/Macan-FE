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

interface BuildMetadataParams {
  locale: Locale;
  /** Path WITHOUT locale prefix, e.g. "" for home, "/industries/oil-and-gas" */
  path: string;
  title: string;
  description: string;
  /** Optional OG image path, defaults to sitewide default if omitted */
  image?: string;
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
}: BuildMetadataParams): Metadata {
  const canonicalUrl = `${siteUrl}/${locale}${path}`;

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
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "MACAN",
      locale: OG_LOCALE_MAP[locale],
      type: "website",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
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
    description:
      "MACAN provides engineering, construction, supply, and project management solutions.",
  };
}