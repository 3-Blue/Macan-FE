import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { RelatedPosts } from "@/components/news/RelatedPosts";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import {
  getPost,
  getPosts,
  getPublishedPostSlugs,
  type Locale,
  type Post,
} from "@/lib/content";

const RELATED_POSTS_LIMIT = 3;
const EXCERPT_LENGTH = 140;

function excerpt(body: string, maxLength = EXCERPT_LENGTH): string {
  if (body.length <= maxLength) return body;
  return body.slice(0, maxLength).trimEnd() + "...";
}

// Body is stored as a single localized string (#37), not markdown/rich-text.
// Split on blank lines so multi-paragraph copy still renders as paragraphs
// instead of one dense block. Revisit if the content model gains real
// rich-text/markdown support.
function bodyParagraphs(body: string): string[] {
  return body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function findRelatedPosts(current: Post, allPosts: Post[]): Post[] {
  return allPosts
    .filter(
      (post) =>
        post.slug !== current.slug &&
        post.tags.some((tag) => current.tags.includes(tag)),
    )
    .slice(0, RELATED_POSTS_LIMIT);
}

export async function generateStaticParams() {
  const slugs = await getPublishedPostSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug, locale as Locale);
  if (!post) return {};
  return buildMetadata({
    locale: locale as "en" | "fa" | "az" | "tr",
    path: `/news/${slug}`,
    title: post.title,
    description: excerpt(post.body),
    image: post.cover.url,
  });
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPost(slug, locale as Locale);

  if (!post) {
    notFound();
  }

  const t = await getTranslations("PostDetailPage");
  const tNews = await getTranslations("NewsPage");

  const allPosts = await getPosts(locale as Locale);
  const relatedPosts = findRelatedPosts(post, allPosts);

  return (
    <Section>
      <Container>
        <Typography variant="body2" sx={{ mb: 3 }}>
          <Link href="/news">{t("backToNews")}</Link>
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2, rowGap: 1, flexWrap: "wrap" }}>
          {post.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>

        <Heading level={1}>{post.title}</Heading>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2, mb: 4, color: "text.secondary" }}
        >
          <Typography variant="body2" color="text.secondary">
            {post.date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("byAuthor", { author: post.author })}
          </Typography>
        </Stack>

        <Box
          component="img"
          src={post.cover.url}
          alt={post.cover.alt}
          sx={{
            width: "100%",
            aspectRatio: "16 / 9",
            objectFit: "cover",
            borderRadius: 2,
            mb: 4,
          }}
        />

        <Box sx={{ maxWidth: 720 }}>
          {bodyParagraphs(post.body).map((paragraph, index) => (
            <Typography key={index} variant="body1" sx={{ mb: 2 }}>
              {paragraph}
            </Typography>
          ))}
        </Box>

        {relatedPosts.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Heading level={2}>{t("relatedPostsHeading")}</Heading>
            <Box sx={{ mt: 3 }}>
              <RelatedPosts posts={relatedPosts} readMoreLabel={tNews("readMore")} />
            </Box>
          </Box>
        )}
      </Container>
    </Section>
  );
}