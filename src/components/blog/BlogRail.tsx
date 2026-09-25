"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type BlogHeading = {
  id: string;
  title: string;
};

function createHeadingId(title: string, index: number) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  return `section-${index}-${slug || "heading"}`;
}

export default function BlogRail() {
  const [headings, setHeadings] = useState<BlogHeading[]>([]);
  const [activeHeading, setActiveHeading] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const scanHeadings = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(
          "article .prose h2, article .prose h3",
        ),
      );

      const nextHeadings = elements.map((element, index) => {
        const title = element.textContent?.trim() ?? "Section";
        const id = element.id || createHeadingId(title, index);
        element.id = id;
        return { id, title };
      });

      setHeadings((currentHeadings) => {
        const hasChanged =
          currentHeadings.length !== nextHeadings.length ||
          currentHeadings.some(
            (heading, index) =>
              heading.id !== nextHeadings[index]?.id ||
              heading.title !== nextHeadings[index]?.title,
          );

        return hasChanged ? nextHeadings : currentHeadings;
      });
    };

    const frameId = window.requestAnimationFrame(scanHeadings);
    const observer = new MutationObserver(scanHeadings);
    const articleContent = document.querySelector("article .prose");

    if (articleContent) {
      observer.observe(articleContent, { childList: true, subtree: true });
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeading = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];

        if (!visibleHeading) return;

        const index = headings.findIndex(
          (heading) => heading.id === visibleHeading.target.id,
        );
        if (index >= 0) setActiveHeading(index);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100vw-1.5rem)] max-w-sm -translate-x-1/2">
      {isOpen && (
        <nav
          aria-label="On this page"
          className="mb-2 max-h-[min(60vh,28rem)] overflow-y-auto rounded-xl bg-foreground p-2 text-background shadow-2xl"
        >
          <p className="px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-background/50">
            Table of contents
          </p>
          <ol className="space-y-0.5">
            {headings.map((heading, index) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    activeHeading === index
                      ? "bg-background/10 text-background"
                      : "text-background/60 hover:bg-background/5 hover:text-background"
                  }`}
                  data-cuelume-hover="tick"
                >
                  <span className="min-w-0 flex-1 truncate">
                    {heading.title}
                  </span>
                  <span aria-hidden="true" className="text-xs">
                    {activeHeading === index ? "•" : ""}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={
          isOpen ? "Close table of contents" : "Open table of contents"
        }
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center gap-3 rounded-full bg-foreground px-4 py-3 text-left text-sm text-background shadow-2xl"
      >
        <span
          aria-hidden="true"
          className="size-2 shrink-0 rounded-full bg-green-500"
        />
        <span className="relative block h-5 min-w-0 flex-1 overflow-hidden">
          <motion.div
            animate={{ y: `${-activeHeading * 1.25}rem` }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-0 top-0 w-full"
          >
            {headings.map((heading) => (
              <div
                key={heading.id}
                className="flex h-5 min-w-0 items-center text-sm"
              >
                <span className="block w-full truncate">{heading.title}</span>
              </div>
            ))}
          </motion.div>
        </span>
        <span aria-hidden="true" className="text-background/60">
          {isOpen ? "×" : "↑"}
        </span>
      </button>
    </div>
  );
}
