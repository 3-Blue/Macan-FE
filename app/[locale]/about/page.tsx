import { setRequestLocale } from "next-intl/server";
import { AboutMissionVision } from "@/components/sections/AboutMissionVision";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
const ABOUT_META = {
  en: {
    title: "About MACAN",
    description:
      "Learn about MACAN's mission, history, leadership, and certifications in engineering, construction, and project management.",
  },
  fa: {
    title: "درباره ماکان",
    description:
      "با مأموریت، تاریخچه، رهبری و گواهینامه‌های ماکان در حوزه مهندسی، ساخت و مدیریت پروژه آشنا شوید.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = locale === "fa" ? ABOUT_META.fa : ABOUT_META.en;
  return buildMetadata({
    locale: locale as "en" | "fa" | "az" | "tr",
    path: "/about",
    title: copy.title,
    description: copy.description,
  });
}

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
    </>
  );
}