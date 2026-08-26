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
import type { Service } from "@/lib/content";

// Full services listing page. Content (services) is passed in, resolved for the
// active locale, by the page.
//
// NOTE: the four categories here (Engineering / Construction / Supply /
// Project Management) may not reflect the actual business (export-import /
// trade / customs). Reconcile the brand story before launch.
//
// Cards link to /services/[slug], which will 404 until service detail pages
// exist. This matches the homepage teaser behaviour.
export function ServicesListing({ services }: { services: Service[] }) {
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
          {services.map((service) => (
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