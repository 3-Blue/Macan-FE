"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as LocaleLink } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

const CONSENT_COOKIE_NAME = "cookie-consent";
const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 365 days

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${CONSENT_COOKIE_MAX_AGE}; SameSite=Lax`;
}

// No live subscription is needed: a choice triggers a full reload, so the next
// render reads the fresh cookie snapshot. On the server we report "consent
// present" so the banner is not rendered during SSR (no hydration flash);
// the client then reads the real cookie.
const emptySubscribe = () => () => {};

export function CookieConsentBanner() {
  const t = useTranslations("CookieConsent");
  const hasConsent = useSyncExternalStore(
    emptySubscribe,
    () => getCookie(CONSENT_COOKIE_NAME) !== null,
    () => true,
  );
  const visible = !hasConsent;

  const handleChoice = (choice: "accepted" | "declined") => {
    setCookie(CONSENT_COOKIE_NAME, choice);
    // Reload so the server-rendered layout picks up the new cookie value
    // and can decide whether to inject analytics scripts.
    window.location.reload();
  };

  if (!visible) return null;

  return (
    <Box
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
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
        <Button onClick={() => handleChoice("declined")} variant="secondary">
          {t("decline")}
        </Button>
        <Button onClick={() => handleChoice("accepted")} variant="primary">
          {t("accept")}
        </Button>
      </Box>
    </Box>
  );
}