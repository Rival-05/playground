"use client";

import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { hoverPreviews, MusicPreviewData } from "@/config/hoverPreview";
import { getAdaptiveCardBackground } from "@/components/HoverCard/imageColor";

interface HoverPreviewProps {
  children: React.ReactNode;
  previewKey: string;
}

const HoverPreview: React.FC<HoverPreviewProps> = ({
  children,
  previewKey,
}) => {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const config = hoverPreviews[previewKey];
  const [isVisible, setIsVisible] = useState(false);

  if (!config) {
    return <span>{children}</span>;
  }

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsVisible(true);
    }, 80);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsVisible(false);
  };

  const handleClick = () => {
    window.open(config.href, "_blank", "noopener,noreferrer");
  };

  return (
    <span
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative inline-block cursor-pointer font-medium text-brand hover:text-brand/80"
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 12, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="hover-preview-popover absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2"
          >
            <div
              onMouseEnter={() => setIsVisible(true)}
              onMouseLeave={() => setIsVisible(false)}
            >
              {config.type === "music" && (
                <MusicPreviewCard
                  data={config.data as MusicPreviewData}
                  platformLabel={config.platformLabel}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default HoverPreview;

const MusicPreviewCard = ({
  data,
  platformLabel,
}: {
  data: MusicPreviewData;
  platformLabel: string;
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [bgGradient, setBgGradient] = useState<string>(
    "linear-gradient(135deg, rgb(17, 24, 39), rgb(15, 23, 42), rgb(0, 0, 0))",
  );

  useEffect(() => {
    let active = true;

    const extractColors = async () => {
      if (!imgRef.current) return;

      try {
        const gradient = await getAdaptiveCardBackground(imgRef.current);
        if (active && gradient) {
          setBgGradient(gradient);
        }
      } catch (error) {
        console.error("Color extraction error:", error);
      }
    };

    extractColors();

    return () => {
      active = false;
    };
  }, [data.image]);

  return (
    <div
      className="hover-preview-card w-72 overflow-hidden rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10 p-4 shadow-2xl"
      style={{
        background: bgGradient,
      }}
    >
      <div className="flex gap-4">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg shadow-lg">
          <img
            ref={imgRef}
            src={data.image}
            alt={data.title}
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
};
