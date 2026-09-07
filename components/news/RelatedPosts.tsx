"use client";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@/components/ui/Grid";
import { Link } from "@/i18n/navigation";
import type { Post } from "@/lib/content";

// Related-posts grid for the post detail page (#39). Split out as its own
// "use client" component so `component={Link}` on MUI's CardActionArea stays
// inside a client boundary — same convention as NewsListing, IndustriesGrid,
// ProjectsListing, etc. The parent page is a Server Component and resolves
// post data + the "read more" label before passing plain props down here.
export function RelatedPosts({
  posts,
  readMoreLabel,
}: {
  posts: Post[];
  readMoreLabel: string;
}) {
  return (
    <Grid cols={3}>
      {posts.map((post) => (
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
              <Typography variant="button" color="primary">
                {readMoreLabel}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Grid>
  );
}