import { homepageContentSchema } from "./schema";
import type { HomepageContent } from "@/types/cms/homepage";
import homepageJson from "@/content/homepage.json";

/**
 * Single entry point for homepage content.
 * Today: reads local JSON. Later: swap the body for a fetch()
 * to Contentful/Sanity/Strapi/custom API — callers never change.
 */
export async function getHomepageContent(): Promise<HomepageContent> {
  const parsed = homepageContentSchema.safeParse(homepageJson);

  if (!parsed.success) {
    console.error(parsed.error.flatten());
    throw new Error("Invalid homepage CMS content");
  }

  return parsed.data as HomepageContent;
}
