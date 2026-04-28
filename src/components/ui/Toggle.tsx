"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Sun from "@/components/svgs/sun";
import Moon from "@/components/svgs/moon";

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

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(activeTheme === "dark" ? "light" : "dark")}
      className="w-8 h-8 p-0 rounded-md cursor-pointer"
    >
      {activeTheme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
