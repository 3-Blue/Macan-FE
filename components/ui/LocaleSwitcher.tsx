"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const localeLabels: Record<string, string> = {
  en: "English",
  fa: "فارسی",
  az: "Azərbaycan",
  tr: "Türkçe",
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(event: SelectChangeEvent) {
    const nextLocale = event.target.value;
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <FormControl size="small">
      <Select
        aria-label="Select language"
        value={locale}
        onChange={handleChange}
      >
        {routing.locales.map((loc) => (
          <MenuItem key={loc} value={loc}>
            {localeLabels[loc]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
