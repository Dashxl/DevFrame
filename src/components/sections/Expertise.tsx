"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLang } from "@/lib/i18n";

export const Expertise = () => {
  const { t } = useLang();

  const areas = [
    {
      name: t("Mobile Development", "Desarrollo móvil"),
      desc: t(
        "Cross-platform apps from a single codebase, shipped for multiple user roles.",
        "Apps multiplataforma desde un solo código, entregadas para varios roles de usuario."
      ),
    },
    {
      name: t("Web Development", "Desarrollo web"),
      desc: t(
        "Responsive, performant web applications and landing pages.",
        "Aplicaciones web y landing pages responsivas y de alto rendimiento."
      ),
    },
    {
      name: t("Backend & Data", "Backend y datos"),
      desc: t(
        "APIs, relational data models and third-party integrations such as payments and push notifications.",
        "APIs, modelos de datos relacionales e integraciones de terceros como pagos y notificaciones push."
      ),
    },
    {
      name: t("Interface Design", "Diseño de interfaces"),
      desc: t(
        "UI and UX designed in Figma and built with component libraries.",
        "UI y UX diseñadas en Figma y construidas con librerías de componentes."
      ),
    },
    {
      name: t("Cloud & Delivery", "Nube y despliegue"),
      desc: t("Hosting and deployment in the cloud.", "Hosting y despliegue en la nube."),
    },
    {
      name: t("Architecture", "Arquitectura"),
      desc: t(
        "System design, scalability and performance optimization.",
        "Diseño de sistemas, escalabilidad y optimización del rendimiento."
      ),
    },
  ];

  const technologies = [
    { group: t("Languages", "Lenguajes"), items: ["JavaScript", "TypeScript", "Dart", "PHP"] },
    { group: "Frameworks", items: ["Flutter", "React", "Next.js", "Node.js", "Express", "Angular", "Laravel"] },
    { group: t("Interface", "Interfaz"), items: ["Tailwind CSS", "shadcn/ui", "Framer Motion", "Bootstrap", "Figma"] },
    { group: t("Databases", "Bases de datos"), items: ["PostgreSQL", "MySQL", "Prisma"] },
    { group: t("Cloud", "Nube"), items: ["Vercel", "Google Cloud"] },
    { group: t("Integrations", "Integraciones"), items: ["Mercado Pago", "Firebase", "Google APIs"] },
  ];

  const strengths = [
    {
      name: t("Leadership", "Liderazgo"),
      desc: t(
        "Led Antoja from the first idea and acted as technical lead on ArmonyX and CiviX.",
        "Lideré Antoja desde la primera idea y fui líder técnico en ArmonyX y CiviX."
      ),
    },
    {
      name: t("Ownership", "Responsabilidad"),
      desc: t(
        "Takes a feature from the database to the screen and stays with it until it ships.",
        "Lleva una función de la base de datos a la pantalla y la acompaña hasta que sale a producción."
      ),
    },
    {
      name: t("Product mindset", "Visión de producto"),
      desc: t(
        "Starts from the user's problem and designs the interface before writing the code.",
        "Parte del problema del usuario y diseña la interfaz antes de escribir el código."
      ),
    },
    {
      name: t("Fast learner", "Aprendizaje rápido"),
      desc: t(
        "Moves between Flutter, Next.js, Node.js and AI APIs and becomes productive quickly.",
        "Se mueve entre Flutter, Next.js, Node.js y APIs de IA y se vuelve productivo rápido."
      ),
    },
    {
      name: t("Teamwork", "Trabajo en equipo"),
      desc: t(
        "Comfortable in a development team, as at Honda Avante, and good at explaining technical decisions.",
        "Cómodo en un equipo de desarrollo, como en Honda Avante, y bueno explicando decisiones técnicas."
      ),
    },
    {
      name: t("Under pressure", "Bajo presión"),
      desc: t(
        "Delivers on tight deadlines: a hackathon build and a state science fair that led to a national stage.",
        "Entrega con plazos ajustados: un proyecto de hackathon y una feria de ciencias estatal que llevó a una etapa nacional."
      ),
    },
  ];

  return (
    <section id="expertise" className="border-t border-border px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          label={t("Expertise", "Especialidades")}
          title={t(
            <>
              One developer across the <em className="text-accent">whole stack</em>.
            </>,
            <>
              Un desarrollador para <em className="text-accent">todo el stack</em>.
            </>
          )}
        />

        <Reveal>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t(
              "I'm comfortable owning a feature from the database to the screen: designing the API, building the web or mobile client, and shipping it. Flutter and Node.js are my daily tools, and Antoja put them to work in a real product with three different kinds of users.",
              "Me siento cómodo responsabilizándome de una función de principio a fin: diseñar la API, construir el cliente web o móvil y llevarlo a producción. Flutter y Node.js son mis herramientas diarias, y Antoja las puso a prueba en un producto real con tres tipos de usuarios."
            )}
          </p>
        </Reveal>

        <dl className="border-t border-border">
          {areas.map((area, idx) => (
            <Reveal key={area.name} delay={idx * 0.04}>
              <div className="grid gap-2 border-b border-border py-6 md:grid-cols-[1fr_1.4fr] md:gap-12 md:py-7">
                <dt className="text-lg font-medium tracking-tight">{area.name}</dt>
                <dd className="text-muted-foreground">{area.desc}</dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal>
          <div className="mt-14 md:mt-20">
            <h3 className="label mb-8">{t("Languages & technologies", "Lenguajes y tecnologías")}</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:gap-x-8 lg:grid-cols-6">
              {technologies.map((tech) => (
                <div key={tech.group}>
                  <p className="mb-4 border-b border-border pb-3 text-sm font-medium">{tech.group}</p>
                  <ul className="space-y-2 text-muted-foreground">
                    {tech.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-14 md:mt-20">
          <Reveal>
            <h3 className="label mb-8">{t("Strengths", "Fortalezas")}</h3>
          </Reveal>
          <ul className="grid border-t border-border sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
            {strengths.map((item, idx) => (
              <li key={item.name} className="border-b border-border">
                <Reveal delay={idx * 0.04} className="py-6">
                  <p className="flex items-center gap-3 text-lg font-medium tracking-tight">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item.name}
                  </p>
                  <p className="mt-2 text-muted-foreground">{item.desc}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
