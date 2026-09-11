"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { MusicPreviewData } from "@/config/hoverPreview";
import { getAdaptiveCardBackground } from "@/components/HoverCard/imageColor";

export default function MusicPreviewCard({
  data,
  platformLabel,
}: {
  data: MusicPreviewData;
  platformLabel: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [bgGradient, setBgGradient] = useState(
    "linear-gradient(135deg, rgb(17, 24, 39), rgb(15, 23, 42), rgb(0, 0, 0))",
  );

  useEffect(() => {
    let active = true;

    async function extractColors() {
      if (!imgRef.current) return;

      try {
        const gradient = await getAdaptiveCardBackground(imgRef.current);
        if (active && gradient) setBgGradient(gradient);
      } catch (error) {
        console.error("Color extraction error:", error);
      }
    }

    void extractColors();
    return () => {
      active = false;
    };
  }, [data.image]);

  return (
    <div
      className="hover-preview-popover hover-preview-card w-72 overflow-hidden rounded-xl ring-1 ring-inset ring-black/10 p-4 shadow-2xl transition-[opacity,transform] duration-200 ease-out"
      style={{
        background: bgGradient,
        opacity: 1,
        transform: "translateY(12px) scale(1)",
      }}
    >
      <div className="flex gap-4">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg shadow-lg">
          <Image
            ref={imgRef}
            src={data.image}
            alt={data.title}
            width={96}
            height={96}
            sizes="96px"
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <span className="text-[11px] uppercase tracking-[0.18em] text-emerald-400/90">
            {platformLabel}
          </span>
          <h3 className="truncate text-base font-semibold text-white">
            {data.title}
          </h3>
          <p className="mt-1 text-sm text-white/65">{data.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
