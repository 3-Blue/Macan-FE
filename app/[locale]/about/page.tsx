import { setRequestLocale } from "next-intl/server";
import { AboutMissionVision } from "@/components/sections/AboutMissionVision";

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Enable static rendering (required for `output: export`).
  setRequestLocale(locale);

  return (
    <>
      <AboutMissionVision />
    </>
  );
}
