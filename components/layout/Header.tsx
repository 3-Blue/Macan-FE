"use client";

import { useState } from "react";
import { Link as LocaleLink, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";

// href values are locale-agnostic; the i18n <Link> prepends the active locale.
const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "industries", href: "/industries" },
  { key: "contact", href: "/contact" },
] as const;

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const t = useTranslations("Nav");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Toolbar sx={{ maxWidth: "1280px", width: "100%", mx: "auto", px: { xs: 2, sm: 3, lg: 4 } }}>
        <Typography
          component={LocaleLink}
          href="/"
          variant="h6"
          sx={{ fontWeight: 700, textDecoration: "none", color: "text.primary", flexGrow: 1 }}
        >
          Macan
        </Typography>

        {/* Desktop nav */}
        <Box
          component="nav"
          aria-label={t("mainNavigation")}
          sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 4 }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                component={LocaleLink}
                href={item.href}
                underline="none"
                aria-current={isActive ? "page" : undefined}
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: isActive ? "text.primary" : "text.secondary",
                  "&:hover": { color: "text.primary" },
                }}
              >
                {t(item.key)}
              </Link>
            );
          })}
          <LocaleSwitcher />
        </Box>

        {/* Mobile: switcher + menu toggle */}
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1 }}>
          <LocaleSwitcher />
          <IconButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile nav */}
      <Drawer
        anchor="top"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        id="mobile-nav-menu"
        aria-label={t("mainNavigation")}
      >
        <List sx={{ mt: 8 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = isActivePath(pathname, item.href);
            return (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={LocaleLink}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <ListItemText primary={t(item.key)} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </AppBar>
  );
}
