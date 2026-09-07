"use client";

import { useMemo, useState } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import type { Post } from "@/lib/content";

const POSTS_PER_PAGE = 6;
const EXCERPT_LENGTH = 140;

function excerpt(body: string, maxLength = EXCERPT_LENGTH): string {
  if (body.length <= maxLength) return body;
  return body.slice(0, maxLength).trimEnd() + "...";
}

// News listing page (#38). Uses `tags` as the filter facet - the Post model
// (#37) has no dedicated `category` field, so this doubles as that filter
// until/unless a real category field is added to the content model.
//
// Client-side filtering + pagination only (no URL query-param sync yet); the
// dataset is small (mock data) and no pagination pattern existed elsewhere
// in the codebase to follow. Revisit if post volume grows or deep-linking
// to a filtered/paginated state becomes a requirement.
//
// Cards link to /news/[slug], which doesn't exist until the post detail
// page (#39) is built.
export function NewsListing({ posts }: { posts: Post[] }) {
  const t = useTranslations("NewsPage");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(),
    [posts]
  );

  const filteredPosts = useMemo(
    () =>
      selectedTag ? posts.filter((post) => post.tags.includes(selectedTag)) : posts,
    [posts, selectedTag]
  );

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  function handleTagChange(tag: string | null) {
    setSelectedTag(tag);
    setPage(1);
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
            color={selectedTag === null ? "primary" : "default"}
            onClick={() => handleTagChange(null)}
          />
          {allTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              color={selectedTag === tag ? "primary" : "default"}
              onClick={() => handleTagChange(tag)}
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
              onChange={(_event, value) => setPage(value)}
              color="primary"
            />
          </Stack>
        )}
      </Container>
    </Section>
  );
}
