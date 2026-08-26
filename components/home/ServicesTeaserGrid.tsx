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

// "What we do" teaser grid -- links to service detail pages that don't exist
// yet (issue #22/#23 are still in the backlog), so these routes will 404
// until that work lands. Content is placeholder; see services-data.ts.
export function ServicesTeaserGrid() {
  const t = useTranslations("Home");
  return (
    <Section>
      <Container>
        <Heading level={2}>{t("servicesTeaserHeading")}</Heading>

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
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
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
