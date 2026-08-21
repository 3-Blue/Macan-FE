"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { useTranslations } from "next-intl";

function TimelineCard({
  year,
  title,
  description,
}: {
  year: string;
  title: string;
  description: string;
}) {
  return (
    <Box
      sx={{
        flex: "0 0 auto",
        width: { xs: 260, md: 300 },
        scrollSnapAlign: "start",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 3,
      }}
    >
      <Typography
        variant="h4"
        component="p"
        sx={{ color: "primary.main", fontWeight: 700, mb: 1 }}
      >
        {year}
      </Typography>
      <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {description}
      </Typography>
    </Box>
  );
}

export function TimelineSection() {
  const t = useTranslations("Timeline");
  const items = t.raw("items") as {
    year: string;
    title: string;
    description: string;
  }[];

  return (
    <Box component="section" sx={{ bgcolor: "background.default", py: { xs: 6, md: 10 } }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography variant="overline" sx={{ color: "secondary.dark", fontWeight: 600 }}>
            {t("eyebrow")}
          </Typography>
          <Heading level={2}>{t("heading")}</Heading>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            pb: 2,
            "&::-webkit-scrollbar": { height: 8 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "divider",
              borderRadius: 4,
            },
          }}
        >
          {items.map((item, i) => (
            <TimelineCard key={i} {...item} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}