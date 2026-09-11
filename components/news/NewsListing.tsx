"use client";

import { useMemo } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import type { Post } from "@/lib/content";

const POSTS_PER_PAGE = 6;
const EXCERPT_LENGTH = 140;
const CATEGORY_PARAM = "category";
const PAGE_PARAM = "page";

function excerpt(body: string, maxLength = EXCERPT_LENGTH): string {
  if (body.length <= maxLength) return body;
  return body.slice(0, maxLength).trimEnd() + "...";
}

// News listing page (#38). Filters by the dedicated `category` field on the
// Post model rather than `tags` (tags remain free-form, multi-valued, and
// unused here). Filter + pagination state is synced to the URL via
// `category`/`page` query params, so the current view is shareable/bookmarkable.
//
// Cards link to /news/[slug] (#39).
export function NewsListing({ posts }: { posts: Post[] }) {
  const t = useTranslations("NewsPage");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get(CATEGORY_PARAM);
  const requestedPage = Number(searchParams.get(PAGE_PARAM));
  const requestedPageValid =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const allCategories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category))).sort(),
    [posts]
  );

  const filteredPosts = useMemo(
    () =>
      selectedCategory
        ? posts.filter((post) => post.category === selectedCategory)
        : posts,
    [posts, selectedCategory]
  );

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const page = Math.min(requestedPageValid, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  function updateQuery(next: { category?: string | null; page?: number }) {
    const params = new URLSearchParams(searchParams.toString());

    if (next.category !== undefined) {
      if (next.category) {
        params.set(CATEGORY_PARAM, next.category);
      } else {
        params.delete(CATEGORY_PARAM);
      }
    }

    if (next.page !== undefined) {
      if (next.page > 1) {
        params.set(PAGE_PARAM, String(next.page));
      } else {
        params.delete(PAGE_PARAM);
      }
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function handleCategoryChange(category: string | null) {
    updateQuery({ category, page: 1 });
  }

  function handlePageChange(nextPage: number) {
    updateQuery({ page: nextPage });
  }

  return (
    <Section>
      <Container>
        <Typography variant="overline" component="p" color="text.secondary">
          {t("eyebrow")}
        </Typography>
        <Heading level={1}>{t("heading")}</Heading>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 720 }}>
          {t("intro")}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 4, rowGap: 1, flexWrap: "wrap" }}>
          <Chip
            label={t("allCategories")}
            color={selectedCategory === null ? "primary" : "default"}
            onClick={() => handleCategoryChange(null)}
          />
          {allCategories.map((category) => (
            <Chip
              key={category}
              label={category}
              color={selectedCategory === category ? "primary" : "default"}
              onClick={() => handleCategoryChange(category)}
            />
          ))}
        </Stack>

        {paginatedPosts.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            {t("noPosts")}
          </Typography>
        ) : (
          <Grid cols={3}>
            {paginatedPosts.map((post) => (
              <Card key={post.slug} sx={{ height: "100%" }}>
                <CardActionArea
                  component={Link}
                  href={`/news/${post.slug}`}
                  sx={{ height: "100%", alignItems: "flex-start" }}
                >
                  <CardMedia
                    component="img"
                    image={post.cover.url}
                    alt={post.cover.alt}
                    sx={{ aspectRatio: "16 / 9", objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="caption" color="text.secondary">
                      {post.date}
                    </Typography>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {excerpt(post.body)}
                    </Typography>
                    <Typography variant="button" color="primary">
                      {t("readMore")}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Grid>
        )}

        {totalPages > 1 && (
          <Stack sx={{ mt: 6, alignItems: "center" }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_event, value) => handlePageChange(value)}
              color="primary"
            />
          </Stack>
        )}
      </Container>
    </Section>
  );
}