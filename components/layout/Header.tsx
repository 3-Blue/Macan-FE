"use client";

import { useState } from "react";
import NextLink from "next/link";
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

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Toolbar sx={{ maxWidth: "1280px", width: "100%", mx: "auto", px: { xs: 2, sm: 3, lg: 4 } }}>
        <Typography
          component={NextLink}
          href="/"
          variant="h6"
          sx={{ fontWeight: 700, textDecoration: "none", color: "text.primary", flexGrow: 1 }}
        >
          Macan
        </Typography>

        {/* Desktop nav */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              component={NextLink}
              href={link.href}
              underline="none"
              sx={{ fontSize: "0.875rem", fontWeight: 500, color: "text.secondary", "&:hover": { color: "text.primary" } }}
            >
              {link.label}
            </Link>
          ))}
        </Box>

        {/* Mobile menu toggle */}
        <IconButton
          sx={{ display: { xs: "inline-flex", md: "none" } }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>

      {/* Mobile nav */}
      <Drawer anchor="top" open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <List sx={{ mt: 8 }}>
          {navLinks.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                component={NextLink}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
