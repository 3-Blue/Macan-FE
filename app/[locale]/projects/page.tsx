import { Suspense } from "react";
import { ProjectsPageContent } from "@/components/projects/ProjectsPageContent";

export default function ProjectsPage() {
  return (
    <Suspense fallback={null}>
      <ProjectsPageContent />
    </Suspense>
  );
}