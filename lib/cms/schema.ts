// lib/cms/schema.ts
import { z } from "zod";

const localizedText = z.object({
  en: z.string().min(1),
  fa: z.string().min(1),
});

const cmsImage = z.object({
  src: z.string().url().or(z.string().startsWith("/")),
  alt: localizedText,
  width: z.number().positive(),
  height: z.number().positive(),
});

const baseBlock = {
  id: z.string(),
  order: z.number(),
};

const heroBlockSchema = z.object({
  ...baseBlock,
  type: z.literal("hero"),
  headline: localizedText,
  subheadline: localizedText,
  image: cmsImage.optional(),
  primaryCta: z
    .object({ label: localizedText, href: z.string() })
    .optional(),
});

const highlightsBlockSchema = z.object({
  ...baseBlock,
  type: z.literal("highlights"),
  heading: localizedText.optional(),
  items: z
    .array(
      z.object({
        id: z.string(),
        icon: z.string().optional(),
        title: localizedText,
        description: localizedText,
      })
    )
    .min(1),
});

const statsBlockSchema = z.object({
  ...baseBlock,
  type: z.literal("stats"),
  heading: localizedText.optional(),
  items: z
    .array(
      z.object({
        id: z.string(),
        label: localizedText,
        value: z.number(),
        suffix: z.string().optional(),
      })
    )
    .min(1),
});

const ctaBlockSchema = z.object({
  ...baseBlock,
  type: z.literal("cta"),
  heading: localizedText,
  body: localizedText.optional(),
  button: z.object({ label: localizedText, href: z.string() }),
});

const homepageBlockSchema = z.discriminatedUnion("type", [
  heroBlockSchema,
  highlightsBlockSchema,
  statsBlockSchema,
  ctaBlockSchema,
]);

export const homepageContentSchema = z.object({
  slug: z.literal("home"),
  updatedAt: z.string(),
  blocks: z.array(homepageBlockSchema),
});
