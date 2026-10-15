"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useLang } from "@/lib/i18n";

const STORAGE_KEY = "theme";

export const ThemeToggle = () => {
  const { t } = useLang();
  // Follow OS changes while the visitor hasn't picked a theme explicitly.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {}
      document.documentElement.dataset.theme = event.matches ? "dark" : "light";
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("Toggle light and dark theme", "Cambiar entre tema claro y oscuro")}
      className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
    >
      <Sun size={16} className="hidden dark:block" aria-hidden />
      <Moon size={16} className="dark:hidden" aria-hidden />
    </button>
  );
};
