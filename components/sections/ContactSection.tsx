import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export function ContactSection() {
  const t = useTranslations("ContactSection");

  return (
    <Section>
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 6,
            alignItems: "start",
          }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 600 }}>
              {t("eyebrow")}
            </Typography>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mt: 1, mb: 4 }}>
              {t("heading")}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                  {t("addressLabel")}
                </Typography>
                <Typography variant="body1">{t("address")}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                  {t("phoneLabel")}
                </Typography>
                <Typography variant="body1">{t("phone")}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                  {t("emailLabel")}
                </Typography>
                <Typography variant="body1">{t("email")}</Typography>
              </Box>
            </Box>
          </Box>

          {/*
            TODO(#43): once the office address is finalized, swap this box
            for a real Google Maps embed, e.g.:

            <Box
              component="iframe"
              src="<paste the Google Maps embed URL here>"
              sx={{ width: "100%", height: "100%", minHeight: 320, border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          */}
          <Box
            sx={{
              minHeight: 320,
              borderRadius: 2,
              border: "1px dashed",
              borderColor: "divider",
              bgcolor: "action.hover",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              p: 3,
            }}
          >
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {t("mapPlaceholder")}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Section>
  );
}