import { getTranslations, setRequestLocale } from "next-intl/server";
import Typography from "@mui/material/Typography";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { IndustriesGrid } from "@/components/industries/IndustriesGrid";
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

        <IndustriesGrid industries={industries} />
      </Container>
    </Section>
  );
}
