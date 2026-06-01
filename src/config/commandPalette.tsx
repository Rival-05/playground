import type { ReactNode } from "react";
import { SunMoon, BookOpen, Home, FolderOpen } from "lucide-react";

export type PaletteGroupKey = "Navigation" | "Appearance";

export type CommandItem = {
  id: string;
  label: string;
  href?: string;
  action?: () => void;
  shortcuts: [string, string] | [string];
  group: PaletteGroupKey;
  icon: ReactNode;
};

export type ShortcutKey = "g" | "h" | "p" | "b" | "d";

export const CHORD_PREFIX = "g";

export const COMMAND_ITEMS: CommandItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    shortcuts: ["G", "H"],
    group: "Navigation",
    icon: <Home className="size-4" aria-hidden="true" />,
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects/playground",
    shortcuts: ["G", "P"],
    group: "Navigation",
    icon: <FolderOpen className="size-4" aria-hidden="true" />,
  },
  {
    id: "blog",
    label: "Blog",
    href: "/blog",
    shortcuts: ["G", "B"],
    group: "Navigation",
    icon: <BookOpen className="size-4" aria-hidden="true" />,
  },
  {
    id: "theme",
    label: "Toggle theme",
    action: () => undefined,
    shortcuts: ["D"],
    group: "Appearance",
    icon: <SunMoon className="size-4" aria-hidden="true" />,
  },
];

export const GROUP_ORDER: PaletteGroupKey[] = ["Navigation", "Appearance"];
