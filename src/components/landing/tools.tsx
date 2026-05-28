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
              <div className="flex flex-wrap items-baseline gap-3 text-muted-foreground hover:text-primary">
                <span className="text-base font-semibold">{tool.name}</span>
                <p className="text-sm leading-relaxed tracking-wide">
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
