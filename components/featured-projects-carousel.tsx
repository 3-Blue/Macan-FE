"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";

/**
 * Featured projects carousel/scroll section
 * Issue: https://github.com/3-Blue/Macan-FE/issues/10
 * Depends on CMS model for projects (#29) — takes `projects` as a
 * prop so it can be wired to real data later without layout changes.
 *
 * Rebuilt on the project's actual design system (MUI theme +
 * Section/Container/Heading, see lib/theme.ts) rather than a bespoke
 * palette. Cards use the brand's cream/deep-green/terracotta tokens.
 *
 * Performance pass (#12): card images now use next/image instead of
 * a CSS backgroundImage, so they're automatically resized, served in
 * modern formats, and lazy-loaded (default behavior — these are below
 * the fold, so no `priority` needed).
 */

export type ProjectStatus = "completed" | "ongoing";

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  sector: string;
  location: string;
  outcome: string;
  status: ProjectStatus;
  imageUrl?: string;
  href: string;
}

interface FeaturedProjectsCarouselProps {
  /** Optional overrides; falls back to messages/*.json (ProjectsCarousel) when omitted. */
  eyebrow?: string;
  heading?: string;
  projects?: ProjectItem[];
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    title: "Offshore Platform Refit",
    client: "Confidential Operator",
    sector: "Oil & Gas",
    location: "Caspian Sea",
    outcome: "42% faster commissioning",
    status: "completed",
    href: "/projects/offshore-platform-refit",
  },
  {
    id: "p2",
    title: "Combined-Cycle Plant Expansion",
    client: "Regional Utility",
    sector: "Power",
    location: "Aran Plain",
    outcome: "+180MW capacity added",
    status: "ongoing",
    href: "/projects/combined-cycle-expansion",
  },
  {
    id: "p3",
    title: "Highway Interchange Upgrade",
    client: "Ministry of Roads",
    sector: "Infrastructure",
    location: "Tabriz Corridor",
    outcome: "Zero lost-time incidents",
    status: "completed",
    href: "/projects/highway-interchange-upgrade",
  },
  {
    id: "p4",
    title: "Modular Processing Skid Supply",
    client: "Petrochemical JV",
    sector: "Supply",
    location: "Bandar Complex",
    outcome: "6 skids, 11-month cycle",
    status: "completed",
    href: "/projects/modular-skid-supply",
  },
  {
    id: "p5",
    title: "District Cooling Network",
    client: "Municipal Authority",
    sector: "Infrastructure",
    location: "Coastal District",
    outcome: "30% energy reduction",
    status: "ongoing",
    href: "/projects/district-cooling-network",
  },
];

function StatusBadge({ status }: { status: ProjectStatus }) {
  const t = useTranslations("ProjectsCarousel");
  const label = status === "completed" ? t("statusCompleted") : t("statusOngoing");
  return (
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
        color: status === "completed" ? "primary.main" : "secondary.main",
        border: "1px solid",
        borderColor: status === "completed" ? "primary.main" : "secondary.main",
        zIndex: 1,
      }}
    >
      {label}
    </Box>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <Link
      component={NextLink}
      href={project.href}
      underline="none"
      data-carousel-card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { xs: "78vw", sm: 360 },
        flexShrink: 0,
        scrollSnapAlign: "start",
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
          height: { xs: 176, sm: 208 },
          bgcolor: "primary.main",
          overflow: "hidden",
        }}
      >
        {project.imageUrl && (
          <Image
            src={project.imageUrl}
            alt=""
            fill
            sizes="(max-width: 600px) 78vw, 360px"
            style={{ objectFit: "cover" }}
          />
        )}
        <StatusBadge status={project.status} />
      </Box>

      <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography
          variant="overline"
          sx={{ color: "secondary.main", letterSpacing: "0.08em" }}
        >
          {project.sector} · {project.location}
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

export default function FeaturedProjectsCarousel({
  eyebrow,
  heading,
  projects = DEFAULT_PROJECTS,
}: FeaturedProjectsCarouselProps) {
  const t = useTranslations("ProjectsCarousel");
  const resolvedEyebrow = eyebrow ?? t("eyebrow");
  const resolvedHeading = heading ?? t("heading");
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.querySelector<HTMLElement>("[data-carousel-card]");
      const cardWidth = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
      track.scrollBy({
        left: direction * cardWidth,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [prefersReducedMotion]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const cards = Array.from(
        track.querySelectorAll<HTMLElement>("[data-carousel-card]")
      );
      const trackLeft = track.scrollLeft;
      let closest = 0;
      let closestDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - trackLeft);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") scrollByCard(1);
    if (e.key === "ArrowLeft") scrollByCard(-1);
  };

  return (
    <Section aria-label="Featured projects">
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "flex-end" },
            justifyContent: "space-between",
            gap: 2,
            mb: { xs: 4, sm: 6 },
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{ color: "secondary.main", letterSpacing: "0.18em" }}
            >
              {resolvedEyebrow}
            </Typography>
            <Reveal>
              <Heading level={2}>{resolvedHeading}</Heading>
            </Reveal>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={() => scrollByCard(-1)}
              aria-label={t("previousProject")}
              sx={{ border: "1px solid", borderColor: "divider" }}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => scrollByCard(1)}
              aria-label={t("nextProject")}
              sx={{ border: "1px solid", borderColor: "divider" }}
            >
              <ArrowForwardIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <RevealGroup>
          <Box
            ref={trackRef}
            role="region"
            aria-label="Project cards, scrollable"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            sx={{
              display: "flex",
              gap: 3,
              overflowX: "auto",
              pb: 2,
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            {projects.map((project) => (
              <Reveal key={project.id} variant="fade" as="div">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </Box>
        </RevealGroup>

        {/* progress indicator */}
        <Box sx={{ display: "flex", gap: 0.5, mt: 3 }}>
          {projects.map((_, i) => (
            <motion.div
              key={i}
              style={{ height: 3, flex: 1, borderRadius: 2 }}
              animate={{
                backgroundColor:
                  i === activeIndex
                    ? "var(--mui-palette-secondary-main, #bb6a45)"
                    : "var(--mui-palette-divider, #e0e0e0)",
              }}
              transition={{ duration: 0.25 }}
            />
          ))}
        </Box>
      </Container>
    </Section>
  );
}