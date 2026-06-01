import Image from "next/image";
import HoverPreview from "@/components/HoverCard/HoverPreview";
import { Reveal } from "@/components/animations/reveal";

export default function Hero() {
  return (
    <Reveal>
      <section className="w-full space-y-4 py-8 text-base leading-8 md:py-10">
        <div className="flex items-center gap-3">
          <Image
            src="/shinchan.svg"
            alt="Shinchan"
            width={32}
            height={32}
            className="rounded-full"
          />
          <h2 className="py-4 text-lg font-medium leading-tight text-muted-foreground">
            Hey, I&apos;m <span className="text-foreground/80">Rajat.</span>
          </h2>
        </div>

        <h2 className="text-base font-normal text-muted-foreground">
          I&apos;m a <span className="text-brand">software developer</span>, I
          design and build modern web applications.
        </h2>

        <h2 className="text-base font-normal text-muted-foreground">
          I work with Next.js and TypeScript to create fast and scalable
          products.
        </h2>

        <h2 className="text-base font-normal text-muted-foreground">
          Apart from this, you&apos;ll find me listening to{" "}
          <HoverPreview previewKey="music">music</HoverPreview> or watching{" "}
          <HoverPreview previewKey="movies">movies</HoverPreview> but mostly
          spending time with my loved ones 🌸
        </h2>

        <h2 className="text-base font-normal text-muted-foreground">
          Exploring new things, learning photography and exploring new places
          and playing sports whenever I get to.
        </h2>
        <h2 className="text-base font-normal text-muted-foreground">
          I enjoy being <span className="text-brand">creative</span> and
          constantly improving myself.
        </h2>
      </section>
    </Reveal>
  );
}
