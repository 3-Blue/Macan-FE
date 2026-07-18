 client: string;
  sector: string;
  location: string;
  outcome: string; // headline metric, e.g. "42% faster commissioning"
  status: ProjectStatus;
  imageUrl?: string;
  href: string;
}

interface FeaturedProjectsCarouselProps {
  eyebrow?: string;
  heading?: string;
  projects: ProjectItem[];
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
  "use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";

/**
 * Featured projects carousel/scroll section
 * Issue: https://github.com/3-Blue/Macan-FE/issues/10
 * Depends on CMS model for projects (#29) — this component takes
 * `projects` as a prop so it can be wired to real data later without
 * changing anything here.
 *
 * Design direction: continues the "engineering drawing" system from
 * the stats section (#8). Each card reads as a numbered drawing
 * sheet ("SHT 01/06") with a corner status stamp, and the scroll
 * position is shown on a ruler-tick track — the same tape-measure
 * motif used for the stat counters.
 *
 * Tokens (shared with StatsCounterSection):
 *   --proj-bg:       #14181C  (graphite)
 *   --proj-panel:    #1C2B3A  (blueprint navy, card fill)
 *   --proj-accent:   #F2A93B  (safety amber)
 *   --proj-rule:     #3B4A57  (rivet gray, dividers/ticks)
 *   --proj-fg:       #EDEFF1  (off-white)
 *   --proj-fg-muted: #93A1AC
 */

export type ProjectStatus = "completed" | "ongoing";

export interface ProjectItem {
  id: string;
  title: string;
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

function StatusStamp({ status }: { status: ProjectStatus }) {
  const label = status === "completed" ? "AS BUILT" : "IN PROGRESS";
  return (
    <span
      className="absolute right-3 top-3 rotate-[-8deg] border px-2 py-0.5 text-[10px] font-semibold tracking-widest"
      style={{
        borderColor: "#F2A93B",
        color: "#F2A93B",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {label}
    </span>
  );
}

function ProjectCard({
  project,
  index,
  total,
}: {
  project: ProjectItem;
  index: number;
  total: number;
}) {
  const sheetNumber = String(index + 1).padStart(2, "0");
  const sheetTotal = String(total).padStart(2, "0");

  return (
    <a
      href={project.href}
      data-carousel-card
      className="group relative flex w-[78vw] shrink-0 snap-start flex-col overflow-hidden border sm:w-[380px]"
      style={{ borderColor: "#3B4A57", backgroundColor: "#1C2B3A" }}
    >
      <div
        className="relative h-44 w-full overflow-hidden sm:h-52"
        style={{ backgroundColor: "#0F1317" }}
      >
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-xs"
            style={{ color: "#3B4A57", fontFamily: "'Inter', sans-serif" }}
          >
            No image yet
          </div>
        )}
        <StatusStamp status={project.status} />
        <span
          className="absolute bottom-2 left-3 text-[11px] tabular-nums"
          style={{
            color: "#93A1AC",
            fontFamily: "'Oswald', 'Arial Narrow', sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          SHT {sheetNumber}/{sheetTotal}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <span
          className="text-[11px] uppercase"
          style={{
            color: "#F2A93B",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.14em",
          }}
        >
          {project.sector} · {project.location}
        </span>
        <h3
          style={{
            fontFamily: "'Oswald', 'Arial Narrow', sans-serif",
            fontWeight: 500,
            fontSize: "1.15rem",
            color: "#EDEFF1",
          }}
        >
          {project.title}
        </h3>
        <p
          className="mt-auto text-sm"
          style={{ color: "#93A1AC", fontFamily: "'Inter', sans-serif" }}
        >
          {project.client}
        </p>
        <p
          className="text-sm font-medium"
          style={{ color: "#EDEFF1", fontFamily: "'Inter', sans-serif" }}
        >
          {project.outcome}
        </p>
      </div>
    </a>
  );
}

export default function FeaturedProjectsCarousel({
  eyebrow = "Selected work",
  heading = "Featured projects",
  projects = DEFAULT_PROJECTS,
}: FeaturedProjectsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-carousel-card]");
    const cardWidth = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({
      left: direction * cardWidth,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [prefersReducedMotion]);

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
    <section
      className="w-full py-16 sm:py-24"
      style={{ backgroundColor: "#14181C" }}
      aria-label="Featured projects"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <p
              className="mb-3 text-xs uppercase sm:text-sm"
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.2em",
                color: "#F2A93B",
              }}
            >
              {eyebrow}
            </p>
            <Reveal>
              <h2
                style={{
                  fontFamily: "'Oswald', 'Arial Narrow', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                  color: "#EDEFF1",
                }}
              >
                {heading}
              </h2>
            </Reveal>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous project"
              className="flex h-9 w-9 items-center justify-center border transition-colors hover:border-[#F2A93B] hover:text-[#F2A93B]"
              style={{ borderColor: "#3B4A57", color: "#EDEFF1" }}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next project"
              className="flex h-9 w-9 items-center justify-center border transition-colors hover:border-[#F2A93B] hover:text-[#F2A93B]"
              style={{ borderColor: "#3B4A57", color: "#EDEFF1" }}
            >
              →
            </button>
          </div>
        </div>

        <RevealGroup>
          <div
            ref={trackRef}
            role="region"
            aria-label="Project cards, scrollable"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project, i) => (
              <Reveal key={project.id} variant="fade" as="div">
                <ProjectCard
                  project={project}
                  index={i}
                  total={projects.length}
                />
              </Reveal>
            ))}
          </div>
        </RevealGroup>

        {/* signature: ruler-tick progress track, matching the stats section */}
        <div className="mt-6 flex items-center gap-1">
          {projects.map((_, i) => (
            <motion.span
              key={i}
              className="h-1 flex-1"
              animate={{
                backgroundColor: i === activeIndex ? "#F2A93B" : "#3B4A57",
              }}
              transition={{ duration: 0.25 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}