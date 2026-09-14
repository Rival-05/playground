"use client";

import { useEffect, useState } from "react";

export function ScrollFadeHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function checkScroll() {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // hide once we're within ~40px of the bottom, or if there's nothing to scroll
      const nearBottom = scrollY + viewportHeight >= fullHeight - 40;
      setVisible(!nearBottom);
    }

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex h-28 items-end justify-center bg-linear-to-t from-background via-background/70 to-transparent transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="mb-3 flex h-6 w-6 animate-bounce items-center justify-center text-muted-foreground/70">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </div>
  );
}
