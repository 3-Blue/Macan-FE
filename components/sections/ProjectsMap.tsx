"use client";

import { useEffect, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import { latLngBounds } from "leaflet";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/types/project";

type LocatedProject = Project & {
  coordinates: NonNullable<Project["coordinates"]>;
};

// Centre of Iran, used only until FitBounds zooms to the visible markers.
const DEFAULT_CENTER: [number, number] = [32.4, 53.7];
const DEFAULT_ZOOM = 5;

/** Re-fits the map to the visible markers whenever the filtered set changes. */
function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0) return;
    map.fitBounds(latLngBounds(points), { padding: [40, 40], maxZoom: 8 });
  }, [map, points]);

  return null;
}

// Map view of projects (#33). Loaded client-side only (Leaflet needs the
// browser) via next/dynamic in ProjectsListing. Projects without
// `coordinates` are simply left off the map.
export function ProjectsMap({ projects }: { projects: Project[] }) {
  const t = useTranslations("ProjectsPage");
  const theme = useTheme();

  const located = useMemo(
    () => projects.filter((p): p is LocatedProject => p.coordinates !== undefined),
    [projects],
  );
  const points = useMemo(
    () => located.map((p) => [p.coordinates.lat, p.coordinates.lng] as [number, number]),
    [located],
  );

  if (located.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        {t("noMapLocations")}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        height: { xs: 360, md: 520 },
        borderRadius: 1,
        overflow: "hidden",
        border: 1,
        borderColor: "divider",
      }}
    >
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} />
        {located.map((project) => (
          <CircleMarker
            key={project.slug}
            center={[project.coordinates.lat, project.coordinates.lng]}
            radius={10}
            pathOptions={{
              color: theme.palette.primary.main,
              fillColor: theme.palette.primary.main,
              fillOpacity: 0.75,
            }}
          >
            <Popup>
              <Typography variant="overline" component="div">
                {project.sector}
              </Typography>
              <Typography variant="subtitle2" component="div">
                {project.title}
              </Typography>
              <Typography variant="body2" component="div" sx={{ mb: 0.5 }}>
                {project.location} · {project.year}
              </Typography>
              <Link href={`/projects/${project.slug}`}>{t("viewProject")}</Link>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </Box>
  );
}
