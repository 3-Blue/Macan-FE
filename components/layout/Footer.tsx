"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useTranslations } from "next-intl";
import { Link as LocaleLink } from "@/i18n/navigation";

// Locale-aware hrefs (the i18n <Link> prepends the active locale). Labels are
// pulled from the Nav / Footer namespaces so the footer is translated too.
const FOOTER_ITEMS = [
  { key: "about", href: "/about", ns: "Nav" },
  { key: "services", href: "/services", ns: "Nav" },
  { key: "industries", href: "/industries", ns: "Nav" },
  { key: "contact", href: "/contact", ns: "Nav" },
  { key: "privacy", href: "/privacy", ns: "Footer" },
  { key: "terms", href: "/terms", ns: "Footer" },
] as const;

const currentYear = new Date().getFullYear();

export function Footer() {
  const tNav = useTranslations("Nav");
  const tFooter = useTranslations("Footer");

  return (
    <Box component="footer" sx={{ borderTop: "1px solid", borderColor: "divider" }}>
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "flex-start" },
          justifyContent: { md: "space-between" },
          gap: 4,
          px: { xs: 2, sm: 3, lg: 4 },
          py: 6,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Macan
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, maxWidth: 320, color: "text.secondary" }}>
            {tFooter("tagline")}
          </Typography>
        </Box>

        <Box
          component="nav"
          aria-label={tFooter("navigation")}
          sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: { xs: 1, sm: 4 } }}
        >
          {FOOTER_ITEMS.map((item) => (
            <Link
              key={item.href}
              component={LocaleLink}
              href={item.href}
              underline="none"
              sx={{ fontSize: "0.875rem", fontWeight: 500, color: "text.secondary", "&:hover": { color: "text.primary" } }}
            >
              {item.ns === "Nav" ? tNav(item.key) : tFooter(item.key)}
            </Link>
          ))}
        </Box>
      </Box>

      <Box sx={{ borderTop: "1px solid", borderColor: "divider", px: { xs: 2, sm: 3, lg: 4 }, py: 3 }}>
        <Typography variant="body2" sx={{ color: "text.disabled" }}>
          © {currentYear} Macan. {tFooter("rights")}
        </Typography>
      </Box>
    </Box>
  );
}
