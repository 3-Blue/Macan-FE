import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { routing } from "@/i18n/routing";
import {
  getService,
  getPublishedServiceSlugs,
  type Locale,
} from "@/lib/content";

// TODO(#28): once PR #66 (lib/projects-data.ts) merges, replace this
// local title map with a real PROJECTS import + lookup by id. Matches the
// same pattern/TODO used in the industry detail page.
const PROJECT_TITLES: Record<string, string> = {
  p1: "Offshore Platform Refit",
  p2: "Combined-Cycle Plant Expansion",
  p3: "Highway Interchange Upgrade",
  p4: "Modular Processing Skid Supply",
  p5: "District Cooling Network",
};

// TODO(#24): once cross-linking lands, replace this local title map with a
// real industries lookup (e.g. via getIndustries()) instead of hardcoding.
const INDUSTRY_TITLES: Record<string, string> = {
  "oil-and-gas": "Oil & Gas",
  power: "Power",
  infrastructure: "Infrastructure",
  supply: "Supply",
};

export async function generateStaticParams() {
  const slugs = await getPublishedServiceSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = await getService(slug, locale as Locale);

  if (!service) {
    notFound();
  }

  const t = await getTranslations("ServiceDetailPage");

  const relatedProjects = service.relatedProjectSlugs
    .map((id) => ({ id, title: PROJECT_TITLES[id] }))
    .filter((project): project is { id: string; title: string } => Boolean(project.title));

  const relatedIndustries = service.relatedIndustrySlugs
    .map((slug) => ({ slug, title: INDUSTRY_TITLES[slug] }))
    .filter((industry): industry is { slug: string; title: string } => Boolean(industry.title));

  return (
    <Section>
      <Container>
        <Typography variant="overline" sx={{ color: "secondary.main", letterSpacing: "0.18em" }}>
          {service.summary}
        </Typography>
        <Heading level={1}>{service.title}</Heading>

        <Typography variant="body1" sx={{ mt: 3, maxWidth: 720 }}>
          {service.body}
        </Typography>

        {relatedIndustries.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Heading level={2}>{t("relatedIndustriesHeading")}</Heading>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 2 }}>
              {relatedIndustries.map((industry) => (
                <Chip key={industry.slug} label={industry.title} variant="outlined" />
              ))}
            </Box>
          </Box>
        )}

        {relatedProjects.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Heading level={2}>{t("relatedProjectsHeading")}</Heading>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 2 }}>
              {relatedProjects.map((project) => (
                <Chip key={project.id} label={project.title} variant="outlined" />
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Section>
  );
}