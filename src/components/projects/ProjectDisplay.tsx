import Image from "next/image";
import ProjectNav from "@/components/projects/ProjectNav";
import ProjectStatusBadge from "@/components/projects/ProjectStatusBadge";
import ProjectTechnologies from "@/components/projects/ProjectTechnologies";
import LinkIcon from "@/components/svgs/link";
import ArrowLeft from "@/components/svgs/arrowleft";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectItem } from "@/config/projects";

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
      <div className="flex flex-col items-start space-y-3 ">
        <Button asChild variant="ghost">
          <Link href="/" className="group inline-flex items-center gap-2">
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back</span>
          </Link>
        </Button>
        <div className="flex flex-col py-4 gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-medium tracking-tight text-foreground/80 link-underline cursor-pointer hover:text-foreground">
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <LinkIcon className="w-5 h-5" />
                {project.title}
              </Link>
            </h1>
            <ProjectStatusBadge isworking={project.isworking} />
            <ProjectTechnologies technologies={project.technologies} />
          </div>

          <p className="text-base text-muted-foreground text-wrap">
            {project.overview}
          </p>
        </div>
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
