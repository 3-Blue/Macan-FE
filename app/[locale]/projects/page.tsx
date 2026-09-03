import { setRequestLocale } from "next-intl/server";
import { ProjectsListing } from "@/components/sections/ProjectsListing";
import { PROJECTS_MOCK } from "@/lib/projects-mock-data";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = PROJECTS_MOCK.filter((project) => project.published).sort(
    (a, b) => a.order - b.order
  );

  return <ProjectsListing projects={projects} />;
}