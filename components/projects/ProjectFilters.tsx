"use client";

import { useMemo } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import type { ProjectItem } from "@/lib/projects-data";

interface ProjectFiltersProps {
  projects: ProjectItem[];
}

const FILTER_KEYS = ["sector", "service", "year", "location"] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

export function ProjectFilters({ projects }: ProjectFiltersProps) {
  const t = useTranslations("ProjectsPage");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const options = useMemo(() => {
    const unique = (key: FilterKey) =>
      Array.from(new Set(projects.map((p) => String(p[key])))).sort();
    return {
      sector: unique("sector"),
      service: unique("service"),
      year: unique("year").sort((a, b) => Number(b) - Number(a)),
      location: unique("location"),
    };
  }, [projects]);

  function handleChange(key: FilterKey, event: SelectChangeEvent) {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
        gap: 2,
        mb: 6,
      }}
    >
      {FILTER_KEYS.map((key) => (
        <FormControl key={key} size="small" fullWidth>
          <InputLabel id={`${key}-filter-label`}>{t(`${key}Label`)}</InputLabel>
          <Select
            labelId={`${key}-filter-label`}
            label={t(`${key}Label`)}
            value={searchParams.get(key) ?? ""}
            onChange={(e) => handleChange(key, e)}
          >
            <MenuItem value="">{t("allOption")}</MenuItem>
            {options[key].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Box>
  );
}