import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { ProjectGallery } from "@/components/project-gallery";
import { routing } from "@/i18n/routing";
import { PROJECTS_MOCK, getProjectBySlug } from "@/lib/projects-mock-data";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PROJECTS_MOCK.filter((project) => project.published).map((project) => ({
      locale,
      slug: project.slug,
    }))
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);

  if (!project || !project.published) {
    notFound();
  }

  const t = await getTranslations("ProjectDetailPage");

  return (
    <Section>
      <Container>
                {project.featured && (
          <Box
            component="span"
            sx={{
              display: "block",
              width: "fit-content",
              mb: 1.5,
              px: 1.5,
              py: 0.5,
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderRadius: 999,
              bgcolor: "secondary.main",
              color: "secondary.contrastText",
            }}
          >
            {t("featuredBadge")}
          </Box>
        )}
        <Typography
          variant="overline"
          sx={{ color: "secondary.main", letterSpacing: "0.18em" }}
        >
          {project.sector}
        </Typography>
        <Heading level={1}>{project.title}</Heading>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 2, sm: 4 },
            mt: 3,
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {t("metaClient")}
            </Typography>
            <Typography variant="body1">{project.client}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {t("metaLocation")}
            </Typography>
            <Typography variant="body1">{project.location}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {t("metaYear")}
            </Typography>
            <Typography variant="body1">{project.year}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {t("metaStatus")}
            </Typography>
            <Typography variant="body1">
              {project.status === "completed"
                ? t("statusCompleted")
                : t("statusOngoing")}
            </Typography>
          </Box>
        </Box>

        {project.heroImage && (
          <Box
                        sx={{
              position: "relative",
              mt: 5,
              width: "100%",
              aspectRatio: "16 / 9",
              borderRadius: 2,
              overflow: "hidden",
              ...(project.featured && {
                border: "3px solid",
                borderColor: "secondary.main",
                boxShadow: 4,
              }),
            }}
          >
            <Image
              src={project.heroImage.url}
              alt={project.heroImage.alt}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </Box>
        )}

        <Box sx={{ mt: 6 }}>
          <Heading level={2}>{t("scopeHeading")}</Heading>
          <Typography variant="body1" sx={{ mt: 2, maxWidth: 720 }}>
            {project.scope}
          </Typography>
        </Box>

        {project.outcomes.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Heading level={2}>{t("outcomesHeading")}</Heading>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(3, 1fr)",
                },
                gap: 3,
                mt: 2,
              }}
            >
              {project.outcomes.map((outcome) => (
                <Box
                  key={outcome.label}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 2.5,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: "secondary.main", fontWeight: 700 }}
                  >
                    {outcome.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mt: 0.5 }}
                  >
                    {outcome.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {project.gallery.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Heading level={2}>{t("galleryHeading")}</Heading>
            <Box sx={{ mt: 2 }}>
              <ProjectGallery images={project.gallery} />
            </Box>
          </Box>
        )}
      </Container>
    </Section>
  );
}