import { getTranslations } from "next-intl/server";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ClientsGrid } from "@/components/clients/ClientsGrid";
import { getClients, type Locale } from "@/lib/content";

export async function ClientsSection({ locale }: { locale: Locale }) {
  const t = await getTranslations("ClientsSection");
  const clients = await getClients(locale);

  if (clients.length === 0) return null;

  return (
    <Box component="section" sx={{ bgcolor: "background.default", py: { xs: 6, md: 8 } }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 600 }}>
            {t("eyebrow")}
          </Typography>
          <Heading level={2}>{t("heading")}</Heading>
        </Box>
        <ClientsGrid clients={clients} />
      </Container>
    </Box>
  );
}