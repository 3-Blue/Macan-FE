"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { useTranslations } from "next-intl";

const BADGE_FILES = [
  "/certifications/cert-1.svg",
  "/certifications/cert-2.svg",
  "/certifications/cert-3.svg",
  "/certifications/cert-4.svg",
];

export function CertificationsSection() {
  const t = useTranslations("CertificationsSection");
  const items = t.raw("items") as { name: string; description: string }[];

  return (
    <Box component="section" sx={{ bgcolor: "background.default", py: { xs: 6, md: 8 } }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 600 }}>
            {t("eyebrow")}
          </Typography>
          <Heading level={2}>{t("heading")}</Heading>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(4, 1fr)",
            },
            gap: { xs: 3, md: 4 },
          }}
        >
          {items.map((item, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 1,
              }}
            >
              <Box sx={{ width: 96, height: 96, position: "relative" }}>
                <Image
                  src={BADGE_FILES[i % BADGE_FILES.length]}
                  alt={item.name}
                  fill
                  sizes="96px"
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {item.name}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}