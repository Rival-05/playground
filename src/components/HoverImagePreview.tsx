"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useState } from "react";

type HoverImagePreviewProps = {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
};

export default function HoverImagePreview({
  imageSrc,
  imageAlt,
  children,
}: HoverImagePreviewProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-full z-50 mt-2 h-32 w-64 overflow-hidden rounded-lg bg-muted shadow-2xl ring-1 ring-border/60 transition-all duration-300 ease-out ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {isVisible && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="256px"
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}
