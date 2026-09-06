import HoverPreview from "@/components/HoverCard/HoverPreview";
import Mail from "@/components/landing/mail";
import { Reveal } from "@/components/animations/reveal";
import Link from "next/link";
import LocalTime from "@/components/LocalTime";
import { navigation } from "@/config/navigation";

export default function Hero() {
  return (
    <Reveal>
      <section className="w-full space-y-2 py-6 text-[15px] leading-6 tracking-wide md:py-8">
        <div className="flex flex-col gap-1 py-3 font-normal text-muted-foreground">
          <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
            <div className="flex flex-col gap-1">
              <Link
                href="https://x.com/Rival_o5"
                className="link-underline w-fit text-base text-primary"
                data-cuelume-hover="tick"
              >
                Rajat Tripathi
              </Link>
              <LocalTime />
            </div>
            <nav className="flex flex-wrap items-center gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground/80 transition-colors hover:text-primary"
                  data-cuelume-hover="tick"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <h2 className="font-light text-muted-foreground">
          Hi, I&apos;m a software developer who designs and builds modern web
          products.
        </h2>

        <h2 className="font-light text-muted-foreground">
          Besides, I listen to{" "}
          <HoverPreview previewKey="music">music</HoverPreview> and watch{" "}
          <HoverPreview previewKey="movies">movies.</HoverPreview> I also play
          sports whenever I get to and lately, learning photography.
        </h2>

        <h2 className="font-light text-muted-foreground">
          ~ Inquisitive about astrodynamics.
        </h2>

        <h2 className="font-light text-muted-foreground">
          I enjoy being creative and constantly improving myself.
        </h2>

        <h2 className="font-light text-muted-foreground">
          open to full time or freelance work — <Mail />
        </h2>
      </section>
    </Reveal>
  );
}
