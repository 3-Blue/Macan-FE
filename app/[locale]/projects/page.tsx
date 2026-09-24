import { setRequestLocale } from "next-intl/server";
import { ProjectsListing } from "@/components/sections/ProjectsListing";
import { getProjects, type Locale } from "@/lib/content";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

const PROJECTS_META = {
  en: {
    title: "Projects",
    description:
      "Browse MACAN's completed and ongoing projects across oil & gas, power, and infrastructure sectors.",
  },
  fa: {
    title: "پروژه‌ها",
    description:
      "پروژه‌های تکمیل‌شده و در حال اجرای ماکان در بخش‌های نفت و گاز، برق و زیرساخت را مشاهده کنید.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = locale === "fa" ? PROJECTS_META.fa : PROJECTS_META.en;
  return buildMetadata({
    locale: locale as "en" | "fa" | "az" | "tr",
    path: "/projects",
    title: copy.title,
    description: copy.description,
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // The content adapter already returns only published projects, sorted by order.
  const projects = await getProjects(locale as Locale);

  return <ProjectsListing projects={projects} />;
}