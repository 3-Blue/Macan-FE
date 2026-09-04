import { setRequestLocale } from "next-intl/server";
import { AboutMissionVision } from "@/components/sections/AboutMissionVision";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import type { Locale } from "@/lib/content";
export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Opt this route into static rendering (SSG) for the given locale.
  setRequestLocale(locale);
  return (
    <>
      <AboutMissionVision />
      <CertificationsSection />
      <ClientsSection locale={locale as Locale} />
    </>
  );
}