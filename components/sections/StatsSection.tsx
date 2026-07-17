"use client";

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

interface StatItemData {
  value: number;
  suffix: string;
  label: string;
}

function useCountUp(target: number, start: boolean, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;

    function step(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    }

    const frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);

  return value;
}

function StatItem({ value, suffix, label }: StatItemData) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, inView);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={ref} sx={{ textAlign: "center" }}>
      <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: "primary.main" }}>
        {count}
        {suffix}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
        {label}
      </Typography>
    </Box>
  );
}

export function StatsSection() {
  const t = useTranslations("StatsSection");
  const items = t.raw("items") as StatItemData[];

  return (
    <Section>
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 4,
          }}
        >
          {items.map((item) => (
            <StatItem key={item.label} {...item} />
          ))}
        </Box>
      </Container>
    </Section>
  );
}