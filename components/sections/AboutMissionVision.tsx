"use client";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { useTranslations } from "next-intl";

function MissionVisionBlock({
  imageSrc,
  title,
  body,
  reverse = false,
}: {
  imageSrc: string;
  title: string;
  body: string;
  reverse?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: reverse ? "row-reverse" : "row",
        },
        alignItems: "center",
        gap: { xs: 4, md: 8 },
        py: { xs: 6, md: 8 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", md: "50%" },
          aspectRatio: "4 / 3",
          borderRadius: 2,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Image src={imageSrc} alt="" fill style={{ objectFit: "cover" }} />
      </Box>
      <Box sx={{ width: { xs: "100%", md: "50%" } }}>
        <Heading level={2}>{title}</Heading>
        <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
          {body}
        </Typography>
      </Box>
    </Box>
  );
}

export function AboutMissionVision() {
  const t = useTranslations("About");

  return (
    <Box component="section" sx={{ bgcolor: "background.default" }}>
      <Container>
        <Box sx={{ textAlign: "center", pt: { xs: 6, md: 10 }, pb: 2 }}>
          <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 600 }}>
            {t("eyebrow")}
          </Typography>
          <Heading level={1}>{t("heading")}</Heading>
        </Box>

        <MissionVisionBlock
          imageSrc="/about/mission-placeholder.svg"
          title={t("mission.title")}
          body={t("mission.body")}
        />

        <MissionVisionBlock
          imageSrc="/about/vision-placeholder.svg"
          title={t("vision.title")}
          body={t("vision.body")}
          reverse
        />
      </Container>
    </Box>
  );
}
