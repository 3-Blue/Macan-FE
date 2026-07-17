"use client";

import NextLink from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

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
            Engineering, construction, and project management solutions.
          </Typography>
        </Box>

        <Box
          component="nav"
          sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: { xs: 1, sm: 4 } }}
        >
          {footerLinks.map((link) => (
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
      </Box>

      <Box sx={{ borderTop: "1px solid", borderColor: "divider", px: { xs: 2, sm: 3, lg: 4 }, py: 3 }}>
        <Typography variant="body2" sx={{ color: "text.disabled" }}>
          © {year} Macan. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
