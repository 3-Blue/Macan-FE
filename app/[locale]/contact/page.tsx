import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Typography from "@mui/material/Typography";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ContactForm } from "@/components/sections/ContactForm";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

const CONTACT_META = {
  en: {
    title: "Contact MACAN",
    description:
      "Get in touch with MACAN for engineering, construction, supply, and project management inquiries.",
  },
  fa: {
    title: "تماس با ماکان",
    description:
      "برای درخواست‌های مهندسی، ساخت، تأمین و مدیریت پروژه با ماکان در تماس باشید.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = locale === "fa" ? CONTACT_META.fa : CONTACT_META.en;
  return buildMetadata({
    locale: locale as "en" | "fa" | "az" | "tr",
    path: "/contact",
    title: copy.title,
    description: copy.description,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Opt this route into static rendering (SSG) for the given locale.
  setRequestLocale(locale);

  const t = await getTranslations("Contact");

  return (
    <Section>
      <Container>
        <Typography
          variant="overline"
          sx={{ color: "primary.main", fontWeight: 600 }}
        >
          {t("eyebrow")}
        </Typography>
        <Heading level={1}>{t("heading")}</Heading>
        <Typography variant="body1" sx={{ mt: 2, mb: 5, maxWidth: 640 }}>
          {t("subheading")}
        </Typography>
        <ContactForm />
      </Container>
    </Section>
  );
}