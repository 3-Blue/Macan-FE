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

// "What we do" teaser grid. Content is passed in (resolved for the active
// locale) by the page; this component is purely presentational.
//
// Cards link to /services/[slug] detail pages that don't exist yet, so those
// routes will 404 until the service detail work lands.
export function ServicesTeaserGrid({ services }: { services: Service[] }) {
  const t = useTranslations("Home");
  return (
    <Section>
      <Container>
        <Heading level={2}>{t("servicesTeaserHeading")}</Heading>

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
