import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as LocaleLink } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { ProjectItem } from "@/lib/projects-data";

export function ProjectCard({ project }: { project: ProjectItem }) {
  const t = useTranslations("ProjectsCarousel");
  const statusLabel =
    project.status === "completed" ? t("statusCompleted") : t("statusOngoing");

  return (
    <Link
      component={LocaleLink}
      href={project.href}
      underline="none"
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "background.paper",
        transition: "box-shadow 0.2s ease",
        "&:hover": { boxShadow: 3 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 208,
          bgcolor: "primary.main",
          backgroundImage: project.imageUrl ? `url(${project.imageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          component="span"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            px: 1.25,
            py: 0.25,
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
            borderRadius: 999,
            bgcolor: "background.default",
            color: project.status === "completed" ? "primary.main" : "secondary.main",
            border: "1px solid",
            borderColor: project.status === "completed" ? "primary.main" : "secondary.main",
          }}
        >
          {statusLabel}
        </Box>
      </Box>

      <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography variant="overline" sx={{ color: "secondary.main", letterSpacing: "0.08em" }}>
          {project.sector} · {project.location} · {project.year}
        </Typography>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
          {project.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {project.client}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
          {project.outcome}
        </Typography>
      </Box>
    </Link>
  );
}