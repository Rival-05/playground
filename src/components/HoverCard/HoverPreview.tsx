"use client";

import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
import { hoverPreviews, MusicPreviewData } from "@/config/hoverPreview";

const MusicPreviewCard = dynamic(() => import("./MusicPreviewCard"), {
  ssr: false,
});

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

      {isVisible && config.type === "music" && (
        <div
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <MusicPreviewCard
            data={config.data as MusicPreviewData}
            platformLabel={config.platformLabel}
          />
        </div>
      )}
    </span>
  );
};

export default HoverPreview;
