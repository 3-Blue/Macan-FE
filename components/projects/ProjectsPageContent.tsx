"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PROJECTS } from "@/lib/projects-data";

export function ProjectsPageContent() {
  const t = useTranslations("ProjectsPage");
  const searchParams = useSearchParams();

  const sector = searchParams.get("sector") ?? "";
  const service = searchParams.get("service") ?? "";
  const year = searchParams.get("year") ?? "";
  const location = searchParams.get("location") ?? "";

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (sector && p.sector !== sector) return false;
      if (service && p.service !== service) return false;
      if (year && String(p.year) !== year) return false;
      if (location && p.location !== location) return false;
      return true;
    });
  }, [sector, service, year, location]);

  return (
    <Section>
      <Container>
        <Typography variant="overline" sx={{ color: "secondary.main", letterSpacing: "0.18em" }}>
          {t("eyebrow")}
        </Typography>
        <Heading level={1}>{t("heading")}</Heading>

        <Box sx={{ mt: 6 }}>
          <ProjectFilters projects={PROJECTS} />
        </Box>

        {filtered.length === 0 ? (
          <Typography sx={{ color: "text.secondary", textAlign: "center", py: 8 }}>
            {t("noResults")}
          </Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Box>
        )}
      </Container>
    </Section>
  );
}