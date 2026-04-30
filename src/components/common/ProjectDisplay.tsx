import Image from "next/image";
import { ProjectItem } from "@/config/projects";
import ProjectNav from "@/components/common/ProjectNav";
import ProjectStatusBadge from "@/components/common/ProjectStatusBadge";
import ProjectTechnologies from "@/components/common/ProjectTechnologies";
import LinkIcon from "@/components/svgs/link";
import Link from "next/link";

type ProjectDisplayProps = {
  project: ProjectItem;
  imageToShow?: string;
  prevHref: string;
  nextHref: string;
};

export default function ProjectDisplay({
  project,
  imageToShow,
  prevHref,
  nextHref,
}: ProjectDisplayProps) {
  const displayImage = imageToShow || project.image;

  return (
    <>
      <div className="flex flex-col items-start space-y-3 px-2 py-3">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-medium tracking-tight text-foreground/80 link-underline cursor-pointer hover:text-foreground">
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <LinkIcon className="w-5 h-5" />
              {project.title}
            </Link>
          </h1>
          <ProjectStatusBadge isworking={project.isworking} />
          <div
            data-orientation="vertical"
            role="none"
            data-slot="separator"
            className="shrink-0 bg-muted-foreground data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:h-4 data-vertical:self-center"
          />

          <ProjectTechnologies technologies={project.technologies} />
        </div>

        <p className="text-base text-muted-foreground ">{project.overview}</p>
      </div>

      {displayImage ? (
        <Image
          src={displayImage}
          alt={project.title}
          className="w-full max-w-3xl rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-none mb-6"
          width={1100}
          height={600}
          loading="eager"
        />
      ) : null}

      {project.description && (
        <section className="py-4 px-2 w-full max-w-3xl">
          <h2 className="text-xl font-medium text-foreground mb-2 tracking-tight">
            Features
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            {project.description.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </section>
      )}

      <div className="w-full max-w-3xl">
        <ProjectNav prevHref={prevHref} nextHref={nextHref} />
      </div>
    </>
  );
}
