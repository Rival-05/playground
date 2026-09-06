import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
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
            <div className="columns-1 gap-4 sm:columns-2">
              {photography.map((photo, index) => (
                <figure
                  key={`${photo.src}-${index}`}
                  className="group mb-4 break-inside-avoid overflow-hidden rounded-lg border border-border/60 bg-muted/20"
                >
                  <div className="relative aspect-4/5 overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                  </div>
                  {photo.caption && (
                    <figcaption className="px-3 py-2 text-sm font-light text-muted-foreground">
                      {photo.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
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
