"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { useTranslations } from "next-intl";

const LOGO_FILES = [
  "/partners/partner-1.svg",
  "/partners/partner-2.svg",
  "/partners/partner-3.svg",
  "/partners/partner-4.svg",
  "/partners/partner-5.svg",
  "/partners/partner-6.svg",
];

export function LogoWallMarquee() {
  const t = useTranslations("PartnersSection");
  const items = t.raw("items") as { name: string }[];

  // Duplicate the list so the CSS animation can loop seamlessly (scrolls
  // through the first copy, then wraps into the identical second copy).
  const track = [...items, ...items];

  return (
    <Box component="section" sx={{ bgcolor: "background.default", py: { xs: 6, md: 8 } }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
          <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 600 }}>
            {t("eyebrow")}
          </Typography>
          <Heading level={2}>{t("heading")}</Heading>
        </Box>
      </Container>

      <Box
        sx={{
          overflow: "hidden",
          maskImage:
            "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "max-content",
            animation: "logo-marquee 30s linear infinite",
            "@keyframes logo-marquee": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" },
            },
            "&:hover": {
              animationPlayState: "paused",
            },
          }}
        >
          {track.map((item, i) => (
            <Box
              key={i}
              sx={{
                flex: "0 0 auto",
                width: 180,
                height: 90,
                mx: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.7,
                transition: "opacity 0.2s",
                "&:hover": { opacity: 1 },
              }}
            >
              <Image
                src={LOGO_FILES[i % LOGO_FILES.length]}
                alt={item.name}
                width={160}
                height={64}
                style={{ objectFit: "contain" }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}