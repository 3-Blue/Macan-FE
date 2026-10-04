"use client";

import { useMemo } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { createAppTheme } from "@/lib/theme";

/**
 * Sets up MUI with a direction-aware theme and emotion cache.
 *
 * For RTL (Farsi), the emotion cache runs the stylis RTL plugin so every
 * MUI/emotion rule is mirrored (margins, padding, positions, carousel arrows,
 * the progress bar, etc.), and the theme's `direction: "rtl"` flips MUI's own
 * direction-aware components. The cache key differs per direction so LTR and
 * RTL stylesheets never collide.
 */
export default function ThemeRegistry({
  direction = "ltr",
  children,
}: Readonly<{
  direction?: "ltr" | "rtl";
  children: React.ReactNode;
}>) {
  const theme = useMemo(() => createAppTheme(direction), [direction]);
  const isRtl = direction === "rtl";

  return (
    <AppRouterCacheProvider
      options={{
        key: isRtl ? "muirtl" : "mui",
        enableCssLayer: true,
        stylisPlugins: isRtl ? [prefixer, rtlPlugin] : [],
      }}
    >
      <ThemeProvider theme={theme}>
        {/* Normalizes browser default styles to match the MUI theme baseline */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
