"use client";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useTranslations } from "next-intl";
import { Link as LocaleLink } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

interface ServiceCTAProps {
  serviceName: string;
}

export function ServiceCTA({ serviceName }: ServiceCTAProps) {
  const t = useTranslations("ServiceCTA");

  return (
    <Section>
      <Container
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "action.hover",
          borderRadius: 2,
          py: { xs: 6, sm: 8 },
          px: { xs: 3, sm: 6 },
        }}
      >
        <Heading level={2}>{t("heading", { service: serviceName })}</Heading>
        <Typography variant="body1" sx={{ mt: 2, mb: 4, maxWidth: 560 }}>
          {t("body")}
        </Typography>
        <Link href="/contact" component={LocaleLink}>
          <Button variant="primary" size="large">
            {t("cta")}
          </Button>
        </Link>
      </Container>
    </Section>
  );
}
