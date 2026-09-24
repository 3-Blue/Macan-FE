import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Brand palette. The Tailwind-token equivalents live in app/globals.css
// (`@theme inline`), so the two styling systems share the same source colors.
const brand = {
  deepGreen: "#0f221c", // primary
  lightGreen: "#173028", // primary, lighter variant
  cream: "#f2ede3", // background
  terracotta: "#bb6a45", // accent
  terracottaDark: "#9c5433", // accent, darkened for WCAG AA text contrast (~4.83:1 on cream)
  peach: "#e0b69e", // accent, light
};

const theme = createTheme({
  palette: {
    mode: "light", // dark mode intentionally not supported
    primary: {
      main: brand.deepGreen,
      light: brand.lightGreen,
    },
    secondary: {
      main: brand.terracotta,
      light: brand.peach,
      dark: brand.terracottaDark,
    },
    background: {
      default: brand.cream,
      paper: brand.cream,
    },
  },
  typography: {
    // Vazirmatn is loaded as a local font in app/[locale]/layout.tsx and
    // exposed as the `--font-vazirmatn` CSS variable, so this resolves at
    // runtime. The system-font stack is a fallback for the first paint.
    fontFamily: [
      "var(--font-vazirmatn)",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "sans-serif",
    ].join(","),
  },
  shape: {
    borderRadius: 8,
  },
});

export default responsiveFontSizes(theme);
