"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as LocaleLink } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { getConsent, setConsent, subscribeConsent } from "@/lib/consent";

export function CookieConsentBanner() {
  const t = useTranslations("CookieConsent");
  // Read consent from the shared client store. On the server we report "no
  // decision yet" as null but render nothing (SSR snapshot below) to avoid a
  // hydration flash; the client then reads the real cookie.
  const consent = useSyncExternalStore(
    subscribeConsent,
    () => getConsent(),
    () => "declined" as const, // server snapshot: hide banner during SSR
  );

  if (consent !== null) return null;

  return (
    <Box
      role="dialog"
      aria-live="polite"
      aria-label={t("ariaLabel")}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        px: { xs: 2, sm: 3, lg: 4 },
        py: 3,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { md: "center" },
        justifyContent: { md: "space-between" },
        gap: 2,
        boxShadow: "0 -2px 12px rgba(0,0,0,0.08)",
      }}
    >
      <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 640 }}>
        {t("message")}{" "}
        <Link component={LocaleLink} href="/privacy" underline="always">
          {t("learnMore")}
        </Link>
      </Typography>

      <Box sx={{ display: "flex", gap: 1.5, flexShrink: 0 }}>
        <Button onClick={() => setConsent("declined")} variant="secondary">
          {t("decline")}
        </Button>
        <Button onClick={() => setConsent("accepted")} variant="primary">
          {t("accept")}
        </Button>
      </Box>
    </Box>
  );
}
