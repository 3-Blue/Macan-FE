import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPublishedIndustrySlugs } from "@/lib/content";
import { PROJECTS_MOCK } from "@/lib/projects-mock-data";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

// Locale-agnostic paths that exist for every locale.
const STATIC_PATHS = [
  "",
  "/about",
  "/services",
  "/industries",
  "/projects",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const industrySlugs = await getPublishedIndustrySlugs();
  const projectSlugs = PROJECTS_MOCK.map((project) => project.slug);
  const paths = [
    ...STATIC_PATHS,
    ...industrySlugs.map((slug) => `/industries/${slug}`),
    ...projectSlugs.map((slug) => `/projects/${slug}`),
  ];

  const now = new Date();

  return paths.map((path) => {
    // hreflang alternates: one URL per locale for this path.
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`]),
    );

    return {
      url: `${siteUrl}/${routing.defaultLocale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
      alternates: { languages },
    };
  });
}
