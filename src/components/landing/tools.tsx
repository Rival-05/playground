import { tools, colors } from "@/config/tools";
import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";

export default function Tools() {
  return (
    <Reveal>
      <section className="w-full space-y-6 py-4 md:py-6">
        <h2 className="text-xl font-medium tracking-tight text-foreground">
          Tools I use
        </h2>

        <div className="space-y-2">
          {tools.map((tool, index) => (
            <Link
              key={tool.name}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3"
            >
              <div
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${colors[index]}`}
              />
              <div className="w-full flex flex-wrap group items-baseline gap-1 md:gap-4 text-foreground/80">
                <span className="text-base font-semibold underline-none underline-offset-3 group-hover:underline transition-all duration-100">
                  {tool.name}
                </span>
                <p className="text-sm leading-relaxed tracking-wide md:text-[15px] text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
