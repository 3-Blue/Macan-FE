"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/lib/theme";

export default function ThemeRegistry({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider theme={theme}>
      {/* Normalizes browser default styles to match the MUI theme baseline */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
