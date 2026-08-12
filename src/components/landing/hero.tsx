import HoverPreview from "@/components/HoverCard/HoverPreview";
import Mail from "@/components/landing/mail";
import { Reveal } from "@/components/animations/reveal";
import Link from "next/link";
import LocalTime from "@/components/LocalTime";

export default function Hero() {
  return (
    <Reveal>
      <section className="w-full space-y-4 py-6 text-base leading-8 md:py-8">
        <div className="flex flex-col gap-1 py-3 text-lg font-medium leading-tight text-muted-foreground">
          <Link
            href="https://x.com/Rival_o5"
            className="link-underline w-fit text-foreground/80"
          >
            Rajat Tripathi
          </Link>
          <LocalTime />
        </div>

        <h2 className="text-base font-normal text-muted-foreground">
          Hi, I&apos;m a software developer. I design and build modern web
          applications.
        </h2>

        <h2 className="text-base font-normal text-muted-foreground">
          Primarily use Next.js and TypeScript to create fast and scalable
          products.
        </h2>

        <h2 className="text-base font-normal text-muted-foreground">
          Apart from this, you&apos;ll find me listening to{" "}
          <HoverPreview previewKey="music">music</HoverPreview> or watching{" "}
          <HoverPreview previewKey="movies">movies</HoverPreview> but mostly
          spending time with my close ones.
        </h2>

        <h2 className="text-base font-normal text-muted-foreground">
          Exploring new places, learning photography and playing sports whenever
          I get to.
        </h2>

        <h2 className="text-base font-normal text-muted-foreground">
          I enjoy being creative and constantly improving myself.
        </h2>

        <h2 className="text-base font-normal text-muted-foreground">
          <Mail /> for 1 : 1 or freelance work.
        </h2>
      </section>
    </Reveal>
  );
}
