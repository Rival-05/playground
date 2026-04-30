import { projects } from "@/config/projects";
import { Container } from "@/components/common/Container";
import ProjectDisplay from "@/components/common/ProjectDisplay";

export default function Page() {
  const path = "/projects/credbind";
  const project = projects.find((p) => p.projectPage === path);
  if (!project) return <div className="p-8">Project not found</div>;

  const idx = projects.findIndex((p) => p.projectPage === project.projectPage);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <section className="w-full space-y-8 py-8 md:py-10">
      <Container>
        <ProjectDisplay
          project={project}
          prevHref={prev.projectPage}
          nextHref={next.projectPage}
        />
      </Container>
    </section>
  );
}
