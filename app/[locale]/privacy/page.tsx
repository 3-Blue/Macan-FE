import { getTranslations, setRequestLocale } from "next-intl/server";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default async function Privacy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("PrivacyPage");

  const sectionKeys = ["dataCollection", "dataUse", "cookies", "contact"] as const;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", px: { xs: 2, sm: 3, lg: 4 }, py: { xs: 6, md: 10 } }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
        {t("heading")}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
        {t("lastUpdated")}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {t("intro")}
      </Typography>

      {sectionKeys.map((key) => (
        <Box key={key} sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
            {t(`sections.${key}.title`)}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {t(`sections.${key}.body`)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}