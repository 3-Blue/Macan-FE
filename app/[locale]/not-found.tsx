"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
        gap: 2,
      }}
    >
      <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
        404
      </Typography>
      <Typography variant="h5" component="h2">
        {t("heading")}
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 480 }}>
        {t("body")}
      </Typography>
      <Button component={Link} href="/" variant="contained" sx={{ mt: 2 }}>
        {t("cta")}
      </Button>
    </Box>
  );
}