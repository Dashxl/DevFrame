"use client";

import { cn } from "@/lib/utils";
import { useLang, type Lang } from "@/lib/i18n";

const options: { code: Lang; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
];

export const LanguageToggle = () => {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t("Language", "Idioma")}
      className="flex h-9 items-center rounded-full border border-border p-0.5 font-mono text-[11px]"
    >
      {options.map((option) => (
        <button
          key={option.code}
          type="button"
          lang={option.code}
          aria-pressed={lang === option.code}
          aria-label={option.name}
          onClick={() => setLang(option.code)}
          className={cn(
            "h-full rounded-full px-2.5 transition-colors",
            lang === option.code
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
