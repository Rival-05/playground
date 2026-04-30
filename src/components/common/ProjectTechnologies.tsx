import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TechItem = {
  name: string;
  icon?: React.ReactNode;
  text?: string;
};

type ProjectTechnologiesProps = {
  technologies: TechItem[];
};

export default function ProjectTechnologies({
  technologies,
}: ProjectTechnologiesProps) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {technologies.map((item) => (
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
  );
}
