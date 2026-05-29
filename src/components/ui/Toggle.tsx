"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Sun from "@/components/svgs/sun";
import Moon from "@/components/svgs/moon";
import { Kbd, KbdGroup } from "./kbd";
import { toggleThemeWithSound } from "@/lib/themeToggle";

export default function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const isClient = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  if (!isClient) {
    return null;
  }

  const activeTheme = theme === "system" ? resolvedTheme : theme;

  const isDark = resolvedTheme === "dark";
  const handleToggle = () => {
    toggleThemeWithSound(setTheme, isDark);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          onClick={handleToggle}
          className="w-8 h-8 p-0 rounded-md cursor-pointer"
        >
          {activeTheme === "dark" ? <Sun /> : <Moon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span className="text-sm">
          <KbdGroup className="gap-1.5">
            <Kbd>D</Kbd>
          </KbdGroup>{" "}
          Toggle Mode
        </span>
      </TooltipContent>
    </Tooltip>
  );
}
