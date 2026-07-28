"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="border-border bg-background hover:bg-accent hover:text-accent-foreground relative inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors"
      aria-label="Alterar Tema"
    >
      {/*Ícone de Sol (some no dark mode)*/}
      <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      {/*Ícone de Lua (aparece no dark mode)*/}
      <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </button>
  );
}
