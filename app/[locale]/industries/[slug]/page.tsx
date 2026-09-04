import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import {
  getIndustry,
  getPublishedIndustrySlugs,
  getServices,
  type Locale,
} from "@/lib/content";

// TODO(#28): once PR #66 (lib/projects-data.ts) merges, replace this
// local title map with a real PROJECTS import + lookup by id.
const PROJECT_TITLES: Record<string, string> = {
  p1: "Offshore Platform Refit",
  p2: "Combined-Cycle Plant Expansion",
  p3: "Highway Interchange Upgrade",
  p4: "Modular Processing Skid Supply",
  p5: "District Cooling Network",
};

export async function generateStaticParams() {
  const slugs = await getPublishedIndustrySlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const industry = await getIndustry(slug, locale as Locale);
  if (!industry) return {};
  return buildMetadata({
    locale: locale as "en" | "fa" | "az" | "tr",
    path: `/industries/${slug}`,
    title: industry.name,
    description: industry.description,
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const industry = await getIndustry(slug, locale as Locale);

  if (!industry) {
    notFound();
  }

  const t = await getTranslations("IndustryDetailPage");

  const relatedProjects = industry.relatedProjectSlugs
    .map((id) => ({ id, title: PROJECT_TITLES[id] }))
    .filter((project): project is { id: string; title: string } =>
      Boolean(project.title),
    );

  const allServices = await getServices(locale as Locale);
  const relatedServices = allServices.filter((service) =>
    industry.relatedServiceSlugs.includes(service.slug),
  );

  return (
    <Section>
      <Container>
        <Typography
          variant="overline"
          sx={{ color: "secondary.main", letterSpacing: "0.18em" }}
        >
          {industry.summary}
        </Typography>
        <Heading level={1}>{industry.name}</Heading>

        <Typography variant="body1" sx={{ mt: 3, maxWidth: 720 }}>
          {industry.description}
        </Typography>

        <Box sx={{ mt: 6 }}>
          <Heading level={2}>{t("challengesHeading")}</Heading>
          <Box component="ul" sx={{ mt: 2, pis: 3 }}>
            {industry.challenges.map((challenge) => (
              <Typography
                key={challenge}
                component="li"
                variant="body1"
                sx={{ mb: 1 }}
              >
                {challenge}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Heading level={2}>{t("solutionsHeading")}</Heading>
          <Box component="ul" sx={{ mt: 2, pis: 3 }}>
            {industry.solutions.map((solution) => (
              <Typography
                key={solution}
                component="li"
                variant="body1"
                sx={{ mb: 1 }}
              >
                {solution}
              </Typography>
            ))}
          </Box>
        </Box>

        {relatedProjects.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Heading level={2}>{t("relatedProjectsHeading")}</Heading>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 2 }}>
              {relatedProjects.map((project) => (
                <Chip
                  key={project.id}
                  label={project.title}
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}

        {relatedServices.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Heading level={2}>{t("relatedServicesHeading")}</Heading>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 2 }}>
              {relatedServices.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`}>
                  <Chip label={service.title} variant="outlined" clickable />
                </Link>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Section>
  );
}