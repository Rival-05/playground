import { Separator } from "@/components/ui/separator";
import { projects } from "@/config/projects";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import LinkIcon from "@/components/svgs/link";
import Arrowright from "@/components/svgs/arrowright";
import Link from "next/link";

export default function Projects() {
  return (
    <section className="w-full space-y-8 py-8 md:py-10">
      <h2 className="text-xl font-medium tracking-tight text-foreground ">
        Projects
      </h2>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={project.title} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap items-center">
                <h2 className=" text-base font-medium text-muted-foreground hover:underline-offset-4 hover:underline cursor-pointer hover:text-foreground/80">
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <LinkIcon />
                    {project.title}
                  </Link>
                </h2>
                <div
                  data-orientation="vertical"
                  role="none"
                  data-slot="separator"
                  className="shrink-0 bg-muted-foreground data-horizontal:h-px data-horizontal:w-full data-vertical:w-px mx-2 data-vertical:h-4 data-vertical:self-center"
                ></div>
                <div className="flex flex-wrap items-center gap-2">
                  {project.technologies.map((item) => (
                    <div key={item.name} className="flex items-center gap-1">
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex size-5 items-center justify-center [&>svg]:h-4 [&>svg]:w-4 [&>svg]:fill-current">
                            {"icon" in item ? (
                              item.icon
                            ) : (
                              <span className="text-[8px] font-semibold tracking-[0.15em] text-white/85">
                                {item.text}
                              </span>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{item.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              </div>
              <Link href={project.projectPage}>
                <Button
                  variant="ghost"
                  className="flex item-center gap-1 group cursor-pointer text-muted-foreground hover:text-foreground"
                >
                  <span>Details</span>
                  <Arrowright className="group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>

            <p className="text-sm  text-muted-foreground md:text-[15px]">
              {project.overview}
            </p>

            {index < projects.length - 1 ? (
              <Separator className="bg-white/10" />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
