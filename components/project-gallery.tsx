"use client";

import { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import { useTranslations } from "next-intl";

/**
 * Image gallery + lightbox for the project detail page (#31).
 * Follows the accessibility pass (#45) conventions: all interactive
 * elements have aria-labels, and the lightbox dialog traps focus
 * via MUI's Dialog (built on Base UI Modal), restoring focus to the
 * trigger thumbnail on close.
 */

export interface ProjectGalleryImage {
  url: string;
  alt: string;
}

interface ProjectGalleryProps {
  images: ProjectGalleryImage[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const t = useTranslations("ProjectGallery");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const isOpen = openIndex !== null;

  const showPrev = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex - 1 + images.length) % images.length);
  };

  const showNext = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + 1) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  };

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {images.map((image, index) => (
          <Box
            key={image.url}
            component="button"
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={t("openImage", { alt: image.alt })}
            sx={{
              position: "relative",
              aspectRatio: "4 / 3",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
              p: 0,
              bgcolor: "primary.main",
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "secondary.main",
                outlineOffset: 2,
              },
            }}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 600px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </Box>
        ))}
      </Box>

      <Dialog
        open={isOpen}
        onClose={() => setOpenIndex(null)}
        maxWidth="lg"
        fullWidth
        onKeyDown={handleKeyDown}
        aria-label={t("lightboxLabel")}
      >
        {isOpen && (
          <Box
            sx={{
              position: "relative",
              bgcolor: "common.black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: { xs: "60vh", sm: "70vh" },
            }}
          >
            <IconButton
              onClick={() => setOpenIndex(null)}
              aria-label={t("closeLightbox")}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "common.white",
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>

            <IconButton
              onClick={showPrev}
              aria-label={t("previousImage")}
              sx={{
                position: "absolute",
                left: 8,
                color: "common.white",
                zIndex: 1,
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: "60vh", sm: "70vh" },
              }}
            >
              <Image
                src={images[openIndex].url}
                alt={images[openIndex].alt}
                fill
                sizes="100vw"
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>

            <IconButton
              onClick={showNext}
              aria-label={t("nextImage")}
              sx={{
                position: "absolute",
                right: 8,
                color: "common.white",
                zIndex: 1,
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}