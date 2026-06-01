"use client";

import ThemeToggle from "@/components/ui/Toggle";
import { Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavItemGitHub } from "@/components/landing/githubstars";
import { Kbd } from "@/components/ui/kbd";
import { useCommandPalette } from "@/hooks/useCommandPalette";

const LINKS = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/projects/playground" },
  { title: "Blog", href: "/blog" },
] as const;

type NavbarProps = {
  className?: string;
};

export default function Navbar({ className }: NavbarProps) {
  const { openPalette } = useCommandPalette();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 max-w-3xl mx-auto backdrop-blur-xl bg-background/40 ",
        className,
      )}
    >
      <div className="mx-auto flex w-full items-center justify-between py-4 px-2">
        <div className="flex items-center gap-5">
          {LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.title}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.title}
            </Link>
          ))}

          <button
            type="button"
            onClick={openPalette}
            className="hidden md:inline-flex h-8 items-center gap-2 rounded-lg border border-border/70 bg-background/40 px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground cursor-text"
            aria-label="Open command palette"
          >
            <Search className="size-3.5" aria-hidden="true" />
            <span>Search</span>
            <span className="inline-flex items-center gap-1">
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
            </span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <NavItemGitHub />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
