"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLang } from "@/lib/i18n";

const navItems = [
  { en: "Experience", es: "Experiencia", href: "#experience" },
  { en: "Expertise", es: "Especialidades", href: "#expertise" },
  { en: "Work", es: "Proyectos", href: "#work" },
  { en: "Contact", es: "Contacto", href: "#contact" },
];

export const Navbar = () => {
  const { t } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        isScrolled || mobileMenuOpen
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5 text-sm font-medium tracking-tight">
          <span className="grid h-6 w-6 place-items-center rounded-[5px] bg-foreground font-mono text-[11px] text-background">
            S
          </span>
          Sandro Ramírez
        </a>

        <div className="flex items-center gap-4 md:gap-9">
          <ul className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(item.en, item.es)}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <button
            className="-mr-2 p-2 md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? t("Close menu", "Cerrar menú") : t("Open menu", "Abrir menú")}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <ul id="mobile-menu" className="border-t border-border px-6 pb-4 md:hidden">
          {navItems.map((item) => (
            <li key={item.href} className="border-b border-border last:border-b-0">
              <a
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-4 display text-3xl"
              >
                {t(item.en, item.es)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};
