import { getTranslations, setRequestLocale } from "next-intl/server";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import { getIndustries, type Locale } from "@/lib/content";

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("IndustriesPage");
  // Already filtered to published and sorted by the content layer.
  const industries = await getIndustries(locale as Locale);

  return (
    <Section>
      <Container>
        <Typography variant="overline" sx={{ color: "secondary.dark", letterSpacing: "0.18em" }}>
          {t("eyebrow")}
        </Typography>
        <Heading level={1}>{t("heading")}</Heading>

        <Grid cols={4}>
          {industries.map((industry) => (
            <Card key={industry.slug} sx={{ height: "100%" }}>
              <CardActionArea
                component={Link}
                href={`/industries/${industry.slug}`}
                sx={{ height: "100%", alignItems: "flex-start" }}
              >
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {industry.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {industry.summary}
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
