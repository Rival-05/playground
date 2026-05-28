import { Separator } from "@/components/ui/separator";
import { projects } from "@/config/projects";
import { Button } from "@/components/ui/button";
import ProjectStatusBadge from "@/components/projects/ProjectStatusBadge";
import ProjectTechnologies from "@/components/projects/ProjectTechnologies";
import LinkIcon from "@/components/svgs/link";
import Arrowright from "@/components/svgs/arrowright";
import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";

export default function Projects() {
  return (
    <Reveal>
      <section className="w-full space-y-8 py-8 md:py-10">
        <h2 className="text-xl font-medium tracking-tight text-foreground">
          Projects
        </h2>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={project.title} className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="cursor-pointer text-base font-medium text-muted-foreground link-underline hover:text-foreground">
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <LinkIcon />
                      {project.title}
                    </Link>
                  </h2>
                  <ProjectStatusBadge isworking={project.isworking} />
                  <ProjectTechnologies technologies={project.technologies} />
                </div>

                <Link href={project.projectPage}>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 group cursor-pointer text-muted-foreground hover:text-foreground"
                  >
                    <span>Details</span>
                    <Arrowright className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>

              <p className="text-sm tracking-wide text-muted-foreground md:text-[15px]">
                {project.overview}
              </p>

              {index < projects.length - 1 ? <Separator /> : null}
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
