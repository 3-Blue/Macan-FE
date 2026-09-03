"use client";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/types/project";

// Full projects listing page. Content (projects) is passed in by the page.
//
// NOTE: this is the basic listing only (Part of #30). Sector/service/year/
// location filters are deliberately out of scope for this slice and will
// be added in a follow-up PR.
export function ProjectsListing({ projects }: { projects: Project[] }) {
  const t = useTranslations("ProjectsPage");

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

        <Grid cols={4}>
          {projects.map((project) => (
            <Card key={project.slug} sx={{ height: "100%" }}>
              <CardActionArea
                component={Link}
                href={`/projects/${project.slug}`}
                sx={{ height: "100%", alignItems: "flex-start" }}
              >
                <CardContent>
                  <Typography variant="overline" color="secondary.main">
                    {project.sector}
                  </Typography>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {project.location} · {project.year}
                  </Typography>
                  <Typography variant="button" color="primary">
                    {t("viewProject")}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}