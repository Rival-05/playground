"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Sun from "@/components/svgs/sun";
import Moon from "@/components/svgs/moon";
import { defineSound } from "@web-kits/audio";

const toggleSound = defineSound({
  source: {
    type: "sine",
    frequency: { start: 370, end: 275 },
  },
  envelope: {
    attack: 0.001,
    decay: 0.08,
    sustain: 0,
    release: 0.03,
  },
  gain: 0.2,
});

export default function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const activeTheme = theme === "system" ? resolvedTheme : theme;

  const isDark = resolvedTheme === "dark";
  const handleToggle = () => {
    toggleSound({
      volume: 1,
      velocity: isDark ? 0.6 : 1,
      detune: isDark ? -80 : 80,
      pan: 0,
    });

    setTheme(isDark ? "light" : "dark");
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
        <span className="text-sm">Toggle Mode</span>
      </TooltipContent>
    </Tooltip>
  );
}
