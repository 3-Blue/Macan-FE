"use client";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("ErrorPage");

  useEffect(() => {
    console.error(error);
  }, [error]);

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
      <Typography variant="h5" component="h1">
        {t("heading")}
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 480 }}>
        {t("body")}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button onClick={() => reset()} variant="contained">
          {t("retry")}
        </Button>
        <Button component={Link} href="/" variant="outlined">
          {t("cta")}
        </Button>
      </Stack>
    </Box>
  );
}