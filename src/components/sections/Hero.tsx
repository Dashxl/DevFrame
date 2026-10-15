"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useLang } from "@/lib/i18n";

export const Hero = () => {
  const { t } = useLang();

  const glance = [
    { label: t("Focus", "Enfoque"), value: t("Web & mobile products", "Productos web y móviles") },
    { label: t("Core stack", "Stack principal"), value: "Flutter · Next.js · Node.js" },
    { label: t("Currently", "Actualmente"), value: t("Building Antoja & ArmonyX", "Construyendo Antoja y ArmonyX") },
  ];

  return (
    <section id="top" className="px-6 pb-16 pt-28 md:pb-20 md:pt-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_auto] md:gap-16 lg:gap-24">
          <div>
            <Reveal>
              <p className="label mb-8 inline-flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {t("Open to new opportunities", "Abierto a nuevas oportunidades")}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="display text-[2.75rem] leading-[1.02] sm:text-6xl md:text-[3.75rem] lg:text-[5.5rem]">
                {t(
                  <>
                    <span className="block">Full Stack</span>
                    <span className="block">
                      and <em className="text-accent">Mobile</em>
                    </span>
                    <span className="block">Developer.</span>
                  </>,
                  <>
                    <span className="block">Desarrollador</span>
                    <span className="block">Full Stack</span>
                    <span className="block">
                      y <em className="text-accent">Móvil</em>.
                    </span>
                  </>
                )}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t(
                  "I build web and mobile products end to end with Flutter, Next.js and Node.js, taking features from the database to the screen. Most recently as founder and lead of Antoja, a three-app food delivery platform for Santiago Ixcuintla and Tuxpan, Nayarit.",
                  "Construyo productos web y móviles de principio a fin con Flutter, Next.js y Node.js, llevando cada función de la base de datos a la pantalla. Más recientemente como fundador y líder de Antoja, una plataforma de entrega de comida con tres apps para Santiago Ixcuintla y Tuxpan, Nayarit."
                )}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href="#contact"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-85"
                >
                  {t("Work with me", "Trabajemos juntos")}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
                <a href="#work" className="link-underline text-sm font-medium">
                  {t("See selected work", "Ver proyectos destacados")}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="order-first md:order-last">
            <figure className="w-28 sm:w-36 md:w-60 lg:w-80">
              <div className="relative aspect-square overflow-hidden rounded-full border border-border bg-surface">
                <Image
                  src="/profile.png"
                  alt={t("Portrait of Sandro Ramírez", "Retrato de Sandro Ramírez")}
                  fill
                  priority
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 240px, 144px"
                  className="origin-[48%_62%] scale-[1.55] object-cover saturate-[0.85]"
                />
              </div>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <dl className="mt-12 grid gap-y-6 border-t border-border pt-8 sm:grid-cols-3 sm:gap-x-8 md:mt-16">
            {glance.map((item) => (
              <div key={item.label}>
                <dt className="label mb-2">{item.label}</dt>
                <dd className="font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
};
