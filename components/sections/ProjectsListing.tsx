"use client";

import { useMemo, useState } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/types/project";

const ALL = "all";

// Full projects listing page. Content (projects) is passed in by the page.
//
// Sector/service/year/location filters (Part of #30, tracked in #102).
export function ProjectsListing({ projects }: { projects: Project[] }) {
  const t = useTranslations("ProjectsPage");

  const [sector, setSector] = useState(ALL);
  const [service, setService] = useState(ALL);
  const [year, setYear] = useState(ALL);
  const [location, setLocation] = useState(ALL);

  const sectors = useMemo(
    () => Array.from(new Set(projects.map((p) => p.sector))).sort(),
    [projects],
  );
  const services = useMemo(
    () => Array.from(new Set(projects.map((p) => p.service))).sort(),
    [projects],
  );
  const years = useMemo(
    () => Array.from(new Set(projects.map((p) => p.year))).sort((a, b) => b - a),
    [projects],
  );
  const locations = useMemo(
    () => Array.from(new Set(projects.map((p) => p.location))).sort(),
    [projects],
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (sector !== ALL && p.sector !== sector) return false;
      if (service !== ALL && p.service !== service) return false;
      if (year !== ALL && String(p.year) !== year) return false;
      if (location !== ALL && p.location !== location) return false;
      return true;
    });
  }, [projects, sector, service, year, location]);

  const handleChange =
    (setter: (value: string) => void) => (event: SelectChangeEvent) => {
      setter(event.target.value);
    };

  return (
    <Section>
      <Container>
        <Typography variant="overline" component="p" color="text.secondary">
          {t("eyebrow")}
        </Typography>
        <Heading level={1}>{t("heading")}</Heading>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 720 }}>
          {t("intro")}
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mb: 4, flexWrap: "wrap" }}
        >
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="filter-sector-label">{t("filterSector")}</InputLabel>
            <Select
              labelId="filter-sector-label"
              label={t("filterSector")}
              value={sector}
              onChange={handleChange(setSector)}
            >
              <MenuItem value={ALL}>{t("filterAll")}</MenuItem>
              {sectors.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="filter-service-label">{t("filterService")}</InputLabel>
            <Select
              labelId="filter-service-label"
              label={t("filterService")}
              value={service}
              onChange={handleChange(setService)}
            >
              <MenuItem value={ALL}>{t("filterAll")}</MenuItem>
              {services.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="filter-year-label">{t("filterYear")}</InputLabel>
            <Select
              labelId="filter-year-label"
              label={t("filterYear")}
              value={year}
              onChange={handleChange(setYear)}
            >
              <MenuItem value={ALL}>{t("filterAll")}</MenuItem>
              {years.map((y) => (
                <MenuItem key={y} value={String(y)}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="filter-location-label">{t("filterLocation")}</InputLabel>
            <Select
              labelId="filter-location-label"
              label={t("filterLocation")}
              value={location}
              onChange={handleChange(setLocation)}
            >
              <MenuItem value={ALL}>{t("filterAll")}</MenuItem>
              {locations.map((l) => (
                <MenuItem key={l} value={l}>
                  {l}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {filteredProjects.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            {t("noResults")}
          </Typography>
        ) : (
          <Grid cols={4}>
            {filteredProjects.map((project) => (
              <Card key={project.slug} sx={{ height: "100%" }}>
                <CardActionArea
                  component={Link}
                  href={`/projects/${project.slug}`}
                  sx={{ height: "100%", alignItems: "flex-start" }}
                >
                  <CardContent>
                    <Typography variant="overline" color="secondary.main">
                      {project.sector}
                    </Typography>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {project.location} · {project.year}
                    </Typography>
                    <Typography variant="button" color="primary">
                      {t("viewProject")}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Grid>
        )}
      </Container>
    </Section>
  );
}