"use client";

import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AppPhones, type AppShot } from "@/components/ui/AppPhones";
import { DesktopShots, type DesktopShot } from "@/components/ui/DesktopShots";
import { useLang, type Lang } from "@/lib/i18n";

type Project = {
  title: string;
  category: string;
  role: string;
  desc: string;
  highlights?: string[];
  tags: string[];
  image?: string;
  shots?: AppShot[];
  desktopShots?: DesktopShot[];
  liveUrl?: string;
  liveLabel?: string;
  repoUrl?: string;
  event?: string;
};

const getProjects = (lang: Lang): Project[] => {
  const t = <T,>(en: T, es: T): T => (lang === "es" ? es : en);

  const antojaShots: AppShot[] = [
    {
      name: "Antoja",
      headline: t("Thousands of cravings near you", "Miles de antojos cerca de ti"),
      src: "/antoja/antoja-customers-phone.webp",
      alt: t(
        "Antoja customer app home screen with search, deals and nearby restaurants",
        "Pantalla de inicio de la app Antoja para clientes con búsqueda, ofertas y restaurantes cercanos"
      ),
    },
    {
      name: "Antoja Negocios",
      headline: t("Your business, in real time", "Tu negocio, en tiempo real"),
      src: "/antoja/antoja-restaurants-phone.webp",
      alt: t(
        "Antoja Negocios dashboard with today's sales, key figures and an hourly sales chart",
        "Panel de Antoja Negocios con las ventas de hoy, cifras clave y una gráfica de ventas por hora"
      ),
    },
    {
      name: "Antoja Repartidor",
      headline: t("Clear deliveries, route in hand", "Entregas claras, ruta en mano"),
      src: "/antoja/antoja-couriers-phone.webp",
      alt: t(
        "Antoja Repartidor delivery route on a map with the customer's details",
        "Ruta de entrega de Antoja Repartidor en un mapa con los datos del cliente"
      ),
    },
  ];

  const armonyxShots: AppShot[] = [
    {
      name: t("Home", "Inicio"),
      headline: t("Your neighborhood, without the chaos", "Tu fraccionamiento, sin caos"),
      src: "/armonyx/armonyx-resident-home-phone.webp",
      alt: t(
        "ArmonyX resident app home with the active house, its incident reports with risk scores and recent visitor access",
        "Inicio de la app de residentes de ArmonyX con la casa activa, sus reportes de incidentes con nivel de riesgo y los accesos recientes de visitantes"
      ),
    },
    {
      name: t("Community map", "Mapa de la comunidad"),
      headline: t("Your community, on the map", "Tu comunidad, en el mapa"),
      src: "/armonyx/armonyx-resident-map-phone.webp",
      alt: t(
        "ArmonyX interactive map of Las Fincas Residencial with the resident's house highlighted and amenities marked",
        "Mapa interactivo de ArmonyX de Las Fincas Residencial con la casa del residente resaltada y las amenidades marcadas"
      ),
    },
    {
      name: t("QR access", "Acceso con QR"),
      headline: t("Secure access with a QR", "Acceso seguro con un QR"),
      src: "/armonyx/armonyx-resident-qr-phone.webp",
      alt: t(
        "ArmonyX visitor QR code with its remaining validity, visitor name and destination house",
        "Código QR de visitante de ArmonyX con su vigencia restante, el nombre del visitante y la casa de destino"
      ),
    },
  ];

  const civixShots: AppShot[] = [
    {
      name: t("Neighborhood risk", "Riesgo en la colonia"),
      headline: t("Your neighborhood's risk, today", "Riesgo de tu colonia, hoy"),
      src: "/civix/civix-citizen-home-phone.webp",
      alt: t(
        "CiviX citizen app home showing the neighborhood risk index, the zone card and nearby reports with their risk",
        "Inicio de la app ciudadana de CiviX con el índice de riesgo de la colonia, la tarjeta de la zona y los reportes cercanos con su riesgo"
      ),
    },
    {
      name: t("Risk heat map", "Mapa de calor"),
      headline: t("Heat map of urban risk", "Mapa de calor de riesgo"),
      src: "/civix/civix-citizen-map-phone.webp",
      alt: t(
        "CiviX dark map of Tepic with reports as points on a risk heat map, zone indexes and category filters",
        "Mapa oscuro de CiviX de Tepic con los reportes como puntos sobre un mapa de calor de riesgo, índices por zona y filtros por categoría"
      ),
    },
    {
      name: t("Risk estimate", "Estimación de riesgo"),
      headline: t("Reports ranked by risk", "Reportes priorizados por riesgo"),
      src: "/civix/civix-citizen-report-phone.webp",
      alt: t(
        "CiviX report confirmation screen with the automatic risk analysis showing the estimated level and its confidence",
        "Pantalla de confirmación de un reporte en CiviX con el análisis automático de riesgo, el nivel estimado y su confianza"
      ),
    },
  ];

  const cipherShots: DesktopShot[] = [
    {
      name: "Landing",
      light: "/cipher/cipher-landing-light.webp",
      dark: "/cipher/cipher-landing-dark.webp",
      alt: t(
        "Cipher AI landing page with the tagline Crack the code, decipher your legacy",
        "Página de inicio de Cipher AI con el lema Crack the code, decipher your legacy"
      ),
    },
    {
      name: t("Upload", "Subir"),
      light: "/cipher/cipher-upload-light.webp",
      dark: "/cipher/cipher-upload-dark.webp",
      alt: t(
        "Cipher AI upload screen to analyze a ZIP file or a public GitHub repository",
        "Pantalla de Cipher AI para subir un ZIP o analizar un repositorio público de GitHub"
      ),
    },
  ];

  return [
    {
      title: "Antoja",
      category: t("Mobile · Marketplace", "Móvil · Marketplace"),
      role: t("Founder & project lead", "Fundador y líder del proyecto"),
      desc: t(
        "Food delivery platform for Santiago Ixcuintla and Tuxpan, Nayarit, the first service of its kind in both towns. Three Flutter apps (for customers, restaurants and couriers) share one codebase and a Node.js backend.",
        "Plataforma de entrega de comida para Santiago Ixcuintla y Tuxpan, Nayarit, el primer servicio de su tipo en ambos municipios. Tres apps Flutter (para clientes, restaurantes y repartidores) comparten un mismo código y un backend en Node.js."
      ),
      highlights: t(
        [
          "Came up with the idea and lead the project end to end",
          "Designed the UI and UX of all three apps",
          "Integrated Google APIs and Firebase push notifications",
          "Built online payments with Mercado Pago",
        ],
        [
          "Tuve la idea y lidero el proyecto de principio a fin",
          "Diseñé la UI y UX de las tres apps",
          "Integré las APIs de Google y las notificaciones push de Firebase",
          "Construí los pagos en línea con Mercado Pago",
        ]
      ),
      tags: ["Flutter", "Dart", "Node.js", "Firebase", "Mercado Pago", "Google APIs"],
      shots: antojaShots,
      liveUrl: "https://antoja.com.mx",
      liveLabel: t("Visit site", "Visitar sitio"),
    },
    {
      title: "CiviX",
      category: t("Civic tech · Urban risk intelligence", "Tecnología cívica · Inteligencia de riesgo urbano"),
      role: t("Tech lead & backend developer", "Líder técnico y desarrollador backend"),
      desc: t(
        "A progressive web app that turns citizen reports into territorial intelligence. Every report gets a transparent urban risk index, so municipal teams attend what is most critical first, not what arrived last.",
        "Una aplicación web progresiva que convierte los reportes ciudadanos en inteligencia territorial. Cada reporte recibe un índice de riesgo urbano transparente, para que los equipos municipales atiendan primero lo más crítico y no lo que llegó al final."
      ),
      highlights: t(
        [
          "Accredited to the national ExpoCiencias 2026 in Monterrey after the Nayarit state fair",
          "Led the technical direction and designed the interfaces",
          "Transparent urban risk index that ranks reports by impact, not by date",
          "Duplicate detection that merges nearby reports and lets neighbors add support",
          "Admin heat map and crisis simulator, with real-time updates over Socket.IO and Web Push",
        ],
        [
          "Acreditados al ExpoCiencias nacional 2026 en Monterrey tras la feria estatal de Nayarit",
          "Lideré la dirección técnica y diseñé las interfaces",
          "Índice de riesgo urbano transparente que prioriza los reportes por impacto, no por fecha",
          "Detección de duplicados que une reportes cercanos y permite a los vecinos sumar apoyo",
          "Mapa de calor para administración y simulador de crisis, con actualizaciones en tiempo real por Socket.IO y Web Push",
        ]
      ),
      tags: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "Leaflet", "Socket.IO", "PWA"],
      shots: civixShots,
    },
    {
      title: "ArmonyX",
      category: t("SaaS · Residential communities", "SaaS · Comunidades residenciales"),
      role: t("Tech lead & backend developer", "Líder técnico y desarrollador backend"),
      desc: t(
        "A platform for managing private residential communities in Mexico. Administrators, residents and guards work on the same real-time system instead of WhatsApp groups, paper logs and spreadsheets.",
        "Una plataforma para administrar comunidades residenciales privadas en México. Administradores, residentes y guardias trabajan en un mismo sistema en tiempo real, en lugar de grupos de WhatsApp, bitácoras en papel y hojas de cálculo."
      ),
      highlights: t(
        [
          "Led the technical direction and designed the interfaces",
          "Incident reports with photo and map pin, validated by AI and scored for risk",
          "QR access for visitors and couriers, scanned by guards at the gate",
          "Multi-tenant Express and PostgreSQL backend with real-time updates over Socket.IO",
          "Interactive map of the community built with MapLibre GL",
        ],
        [
          "Lideré la dirección técnica y diseñé las interfaces",
          "Reportes de incidentes con foto y ubicación en el mapa, validados por IA y calificados por riesgo",
          "Acceso con QR para visitantes y paquetería, escaneado por los guardias en la caseta",
          "Backend multi-tenant en Express y PostgreSQL con actualizaciones en tiempo real por Socket.IO",
          "Mapa interactivo de la comunidad construido con MapLibre GL",
        ]
      ),
      tags: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "Socket.IO", "MapLibre GL"],
      shots: armonyxShots,
      liveUrl: "https://armony-x.vercel.app",
      liveLabel: t("Visit site", "Visitar sitio"),
    },
    {
      title: "Cipher-AI",
      category: t("Artificial Intelligence · Web", "Inteligencia artificial · Web"),
      role: t("Developer", "Desarrollador"),
      desc: t(
        "Transform legacy code into documented, secured, maintainable software in 30 seconds using Gemini 3's structured reasoning.",
        "Convierte código heredado en software documentado, seguro y mantenible en 30 segundos usando el razonamiento estructurado de Gemini 3."
      ),
      tags: ["Next.js", "TypeScript", "React", "Tailwind", "Google Gemini 3", "Redis"],
      desktopShots: cipherShots,
      liveUrl: "https://cipherai-app.vercel.app/",
      liveLabel: t("Live site", "Sitio en vivo"),
      repoUrl: "https://github.com/Dashxl/Cipher-AI",
      event: t("Built for the Gemini 3 Hackathon", "Creado para el Gemini 3 Hackathon"),
    },
  ];
};

const ProjectLinks = ({ project }: { project: Project }) => {
  const { t } = useLang();

  return (
    <div className="flex items-center gap-6 text-sm font-medium">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} — ${project.liveLabel?.toLowerCase()}`}
          className="link-underline inline-flex items-center gap-1.5"
        >
          {project.liveLabel} <ArrowUpRight size={15} />
        </a>
      )}
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} — ${t("source code", "código fuente")}`}
          className="link-underline inline-flex items-center gap-1.5"
        >
          <Github size={15} /> {t("Code", "Código")}
        </a>
      )}
    </div>
  );
};

// Each frame gets a large soft corner on one diagonal and a tight one on the other; they mirror on alternate rows.
const frameShapes = [
  "rounded-[2rem_0.5rem_2rem_0.5rem] md:rounded-[3.75rem_0.75rem_3.75rem_0.75rem]",
  "rounded-[0.5rem_2rem_0.5rem_2rem] md:rounded-[0.75rem_3.75rem_0.75rem_3.75rem]",
];

export const Work = () => {
  const { lang, t } = useLang();
  const projects = getProjects(lang);

  return (
    <section id="work" className="border-t border-border px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          label={t("Selected work", "Proyectos destacados")}
          title={t(
            <>
              Products I&apos;ve <em className="text-accent">designed and shipped</em>.
            </>,
            <>
              Productos que he <em className="text-accent">diseñado y lanzado</em>.
            </>
          )}
        />

        <div className="space-y-16 md:space-y-20">
          {projects.map((project, idx) => (
            <Reveal key={project.title}>
              <article
                className={cn(
                  "grid gap-8 md:items-center md:gap-14",
                  idx % 2 === 0 ? "md:grid-cols-[1.25fr_1fr]" : "md:grid-cols-[1fr_1.25fr]"
                )}
              >
                <div
                  className={cn(
                    "relative overflow-hidden border",
                    frameShapes[idx % 2],
                    project.shots ? "border-transparent bg-[#653EAD]" : "border-border bg-surface",
                    project.image && "aspect-[3/2]",
                    idx % 2 === 1 && "md:order-last"
                  )}
                >
                  {project.shots ? (
                    <AppPhones shots={project.shots} />
                  ) : project.desktopShots ? (
                    <DesktopShots shots={project.desktopShots} url="cipherai-app.vercel.app" />
                  ) : project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>

                <div>
                  <p className="label mb-4">
                    <span className="text-accent">0{idx + 1}</span>
                    <span className="mx-3 text-border">/</span>
                    {project.category}
                  </p>
                  <h3 className="display text-3xl md:text-4xl">{project.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("Role", "Rol")}: {project.role}
                  </p>
                  {project.event && <p className="mt-1 text-sm text-muted-foreground">{project.event}</p>}
                  <p className="mt-5 leading-relaxed text-muted-foreground">{project.desc}</p>
                  {project.highlights && (
                    <ul className="mt-6 space-y-2.5 text-sm">
                      {project.highlights.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span aria-hidden className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-xs text-muted-foreground">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  {(project.liveUrl || project.repoUrl) && (
                    <div className="mt-8">
                      <ProjectLinks project={project} />
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
