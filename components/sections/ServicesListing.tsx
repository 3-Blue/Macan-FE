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
import { servicesTeaserData } from "@/components/home/services-data";

// Full services listing page (issue #22). Reuses servicesTeaserData -- the
// same placeholder set consumed by the homepage's ServicesTeaserGrid.
//
// NOTE: the four categories here (Engineering / Construction / Supply /
// Project Management) come from issue #23 and may not reflect the actual
// business (export-import / trade / customs). Flagged for review in a
// follow-up issue -- do not treat these as final without checking that
// issue first.
//
// Cards link to /services/[slug], which will 404 until #23 lands. This is
// the same accepted pattern already in use on the homepage teaser.
export function ServicesListing() {
  const t = useTranslations("ServicesPage");

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
          {servicesTeaserData.map((service) => (
            <Card key={service.slug} sx={{ height: "100%" }}>
              <CardActionArea
                component={Link}
                href={`/services/${service.slug}`}
                sx={{ height: "100%", alignItems: "flex-start" }}
              >
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {service.description}
                  </Typography>
                  <Typography variant="button" color="primary">
                    {t("learnMore")}
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