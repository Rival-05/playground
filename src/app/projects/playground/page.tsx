"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { projects } from "@/config/projects";
import { Container } from "@/components/common/Container";
import ProjectDisplay from "@/components/projects/ProjectDisplay";

export default function Page() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const path = "/projects/playground";
  const project = projects.find((p) => p.projectPage === path);
  if (!project) return <div className="p-8">Project not found</div>;

  const idx = projects.findIndex((p) => p.projectPage === project.projectPage);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  const imageToShow = mounted
    ? theme === "dark"
      ? project.imageDark || project.image
      : project.imageLight || project.image
    : project.image;

  return (
    <section className="w-full space-y-8 py-8 md:py-10">
      <Container>
        <ProjectDisplay
          project={project}
          imageToShow={imageToShow}
          prevHref={prev.projectPage}
          nextHref={next.projectPage}
        />
      </Container>
    </section>
  );
}
