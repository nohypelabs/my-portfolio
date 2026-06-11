"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-border/50 animate-pulse" />
    );
  }

  const handleToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggle}
      className="relative w-9 h-9 rounded-lg bg-border/50 flex items-center justify-center hover:bg-border transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="w-5 h-5 text-foreground rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute w-5 h-5 text-foreground rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Current: {resolvedTheme}</span>
    </button>
  );
}
