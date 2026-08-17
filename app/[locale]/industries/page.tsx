"use client";

import { useTranslations } from "next-intl";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import { industriesData } from "@/lib/industries-data";

export default function IndustriesPage() {
  const t = useTranslations("IndustriesPage");

  return (
    <Section>
      <Container>
        <Typography variant="overline" sx={{ color: "secondary.dark", letterSpacing: "0.18em" }}>
          {t("eyebrow")}
        </Typography>
        <Heading level={1}>{t("heading")}</Heading>

        <Grid cols={4}>
          {industriesData.map((industry) => (
            <Card key={industry.slug} sx={{ height: "100%" }}>
              <CardActionArea
                component={Link}
                href={`/projects?sector=${encodeURIComponent(industry.sector)}`}
                sx={{ height: "100%", alignItems: "flex-start" }}
              >
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {industry.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {industry.description}
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