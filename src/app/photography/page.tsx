import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
import { PhotoGrid } from "@/components/photography/photo-grid";
import { photography } from "@/config/photography";

export const metadata = {
  title: "Photography",
  description: "A small collection of photographs I have captured.",
};

export default function PhotographyPage() {
  return (
    <section className="w-full space-y-8 py-4">
      <Link
        href="/"
        className="link-underline text-sm tracking-wide text-foreground"
        data-cuelume-hover="tick"
      >
        Home
      </Link>

      <Reveal>
        <section className="w-full space-y-6 py-2 md:py-4">
          <div className="space-y-1">
            <h1 className="text-base font-medium text-foreground">Captures</h1>
            <p className="text-sm font-light leading-6 text-muted-foreground">
              Frames from places, people, and passing moments.
            </p>
          </div>

          {photography.length > 0 ? (
            // full-bleed: breaks out of the centered container to use the full viewport width
            <div className="relative left-1/2 right-1/2 mx-[-50vw] w-screen px-4 sm:px-8">
              <PhotoGrid photos={photography} />
            </div>
          ) : (
            <div className="flex min-h-48 items-center justify-center rounded-lg border border-dashed border-border/70 px-6 py-12 text-center">
              <p className="text-sm font-light leading-6 text-muted-foreground">
                Photographs will find their way here soon.
              </p>
            </div>
          )}
        </section>
      </Reveal>
    </section>
  );
}
