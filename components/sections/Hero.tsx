"use client";
import NextLink from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("Hero");
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: { xs: "70vh", md: "90vh" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Image
        src="/hero/hero-placeholder.svg"
        alt=""
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      {/* Overlay for text legibility over the background image */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(15,34,28,0.65) 0%, rgba(15,34,28,0.45) 100%)",
        }}
      />
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ maxWidth: 640 }}>
          <Heading level={1} className="hero-headline">
            <Box component="span" sx={{ color: "background.default" }}>
              {t("headline")}
            </Box>
          </Heading>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "secondary.light", mt: 2, mb: 4, fontWeight: 400 }}
          >
            {t("subheadline")}
          </Typography>
          <Button
            component={NextLink}
            href="/services"
            variant="primary"
            size="large"
          >
            {t("cta")}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
