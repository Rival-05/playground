"use client";

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
    <>
      <nav
        aria-label="On this page"
        className="pointer-events-none fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      >
        {headings.map((heading) => {
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              aria-label={`Jump to ${heading.title}`}
              className="group pointer-events-auto relative flex h-5 w-10 items-center justify-start"
              data-cuelume-hover="tick"
            >
              <span
                aria-hidden="true"
                className="h-px w-5 bg-foreground/25 transition-all duration-200 group-hover:w-8 group-hover:bg-foreground"
              />
              <span className="pointer-events-none absolute left-full top-1/2 z-30 ml-2 w-max max-w-64 -translate-y-1/2 translate-x-1 rounded-sm bg-background px-2 py-1 text-xs text-foreground opacity-0 shadow-sm ring-1 ring-border/60 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                {heading.title}
              </span>
            </a>
          );
        })}
      </nav>

      <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100vw-1.5rem)] max-w-sm -translate-x-1/2 lg:hidden">
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
            className="size-2 shrink-0 rounded-full bg-background"
          />
          <span className="min-w-0 flex-1 truncate">
            {headings[activeHeading]?.title ?? "On this page"}
          </span>
          <span aria-hidden="true" className="text-background/60">
            {isOpen ? "×" : "↑"}
          </span>
        </button>
      </div>
    </>
  );
}
