import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Typography from "@mui/material/Typography";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ContactForm } from "@/components/sections/ContactForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Enable static rendering (required for `output: export`).
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