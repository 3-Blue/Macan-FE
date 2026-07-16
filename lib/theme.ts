import { createTheme } from "@mui/material/styles";

// Brand colors from design mockups (see PR #52 for the Tailwind-token equivalents)
const brand = {
  deepGreen: "#0f221c",   // primary
  lightGreen: "#173028",  // primary, lighter variant
  cream: "#f2ede3",       // background
  terracotta: "#bb6a45",  // accent
  peach: "#e0b69e",       // accent, light
};

// TODO: swap fontFamily to Vazirmatn (via next/font/google) once PR #52 merges
// and the font is available on this branch. Using a safe system-font fallback
// for now so the theme is usable independently of that PR.
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
    },
    background: {
      default: brand.cream,
      paper: brand.cream,
    },
  },
  typography: {
    fontFamily: [
      "var(--font-vazirmatn)", // will resolve once PR #52's font variable exists
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

export default theme;
