"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLang } from "@/lib/i18n";

export const Experience = () => {
  const { t } = useLang();

  const position = {
    company: "Honda Avante",
    location: "Tepic, Nayarit",
    role: t("Internship, Development department", "Prácticas profesionales, departamento de Desarrollo"),
    period: t("May – August 2025", "Mayo – agosto de 2025"),
  };

  const education = {
    school: "Universidad Tecnológica de la Costa",
    degrees: [
      {
        name: t("Software Development and Management Engineering", "Ingeniería en Desarrollo y Gestión de Software"),
        status: t("In progress · expected April 2027", "En curso · término previsto abril de 2027"),
      },
      {
        name: t(
          "TSU in Information Technologies, Multiplatform Software Development",
          "TSU en Tecnologías de la Información, Desarrollo de Software Multiplataforma"
        ),
        status: t("Completed", "Concluido"),
      },
    ],
  };

  return (
    <section id="experience" className="border-t border-border px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="01"
          label={t("Experience", "Experiencia")}
          title={t(
            <>
              Experience beyond <em className="text-accent">my own projects</em>.
            </>,
            <>
              Experiencia más allá de <em className="text-accent">mis propios proyectos</em>.
            </>
          )}
        />

        <div className="border-t border-border">
          <Reveal>
            <article className="grid gap-3 border-b border-border py-6 md:grid-cols-[1fr_1.4fr] md:gap-12 md:py-8">
              <div>
                <h3 className="display text-2xl md:text-3xl">{position.company}</h3>
                <p className="label mt-3">{position.location}</p>
              </div>
              <div>
                <p className="text-lg font-medium tracking-tight">{position.role}</p>
                <p className="label mt-2">{position.period}</p>
              </div>
            </article>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-16">
          <Reveal>
            <h3 className="label mb-6">{t("Education", "Educación")}</h3>
          </Reveal>
          <div className="border-t border-border">
            <Reveal>
              <article className="grid gap-3 border-b border-border py-6 md:grid-cols-[1fr_1.4fr] md:gap-12 md:py-8">
                <h4 className="display text-2xl md:text-3xl">{education.school}</h4>
                <ul className="space-y-5">
                  {education.degrees.map((degree) => (
                    <li key={degree.name}>
                      <p className="text-lg font-medium tracking-tight">{degree.name}</p>
                      <p className="label mt-2">{degree.status}</p>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
