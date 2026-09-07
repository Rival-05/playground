"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Photo = {
  src: string;
  alt: string;
  caption?: string;
};

// Gives each card a slightly different tilt so the grid feels hand-arranged
const ROTATIONS = [-3, 2, -1, 3, -2, 1.5, 0, -2.5, 2];
const OFFSETS = ["", "sm:mt-10", "sm:mt-4"];

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const active = activeIndex !== null ? photos[activeIndex] : null;

  // close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveIndex(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // lock body scroll + trigger enter transition on next frame
  useEffect(() => {
    if (activeIndex === null) {
      setIsVisible(false);
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => setIsVisible(true));
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  return (
    <div className="relative w-full">
      <div
        className={`grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-x-12 gap-y-12 transition-[filter,transform,opacity] duration-500 ease-out sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] ${
          active
            ? "scale-[0.97] opacity-60 blur-md"
            : "scale-100 opacity-100 blur-0"
        }`}
      >
        {photos.map((photo, index) => (
          <button
            key={`${photo.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`group relative aspect-3/4 cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-muted/20 shadow-md transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md  ${OFFSETS[index % OFFSETS.length]}`}
            style={{
              transform: `rotate(${ROTATIONS[index % ROTATIONS.length]}deg)`,
            }}
            data-cuelume-hover="tick"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover "
              priority={index < 2}
              loading={index < 2 ? "eager" : "lazy"}
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background/30 px-6 backdrop-blur-sm transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setActiveIndex(null)}
        >
          <div
            className={`relative aspect-3/4 w-full max-w-sm sm:max-w-xs overflow-hidden rounded-2xl border border-border/60 bg-muted/20 shadow-xl transition-all duration-300 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="90vw"
              className="object-cover"
              priority
            />
          </div>

          {active.caption && (
            <p
              className={`max-w-sm text-center text-sm font-light leading-6 text-muted-foreground transition-all delay-100 duration-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1 opacity-0"
              }`}
            >
              {active.caption}
            </p>
          )}

          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="flex h-9 cursor-pointer w-9 items-center justify-center rounded-full border border-border/60 bg-background text-foreground transition-colors hover:bg-muted"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
