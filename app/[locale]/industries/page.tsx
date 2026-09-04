import { getTranslations, setRequestLocale } from "next-intl/server";
import Typography from "@mui/material/Typography";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { IndustriesGrid } from "@/components/industries/IndustriesGrid";
import { getIndustries, type Locale } from "@/lib/content";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

const INDUSTRIES_META = {
  en: {
    title: "Industries We Serve",
    description:
      "MACAN serves oil & gas, power, and infrastructure sectors with tailored engineering and construction solutions.",
  },
  fa: {
    title: "صنایع تحت پوشش",
    description:
      "ماکان با راهکارهای متناسب مهندسی و ساخت، صنایع نفت و گاز، برق و زیرساخت را پوشش می‌دهد.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = locale === "fa" ? INDUSTRIES_META.fa : INDUSTRIES_META.en;
  return buildMetadata({
    locale: locale as "en" | "fa" | "az" | "tr",
    path: "/industries",
    title: copy.title,
    description: copy.description,
  });
}

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
