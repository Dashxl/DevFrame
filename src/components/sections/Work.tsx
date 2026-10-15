import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AppPhones, type AppShot } from "@/components/ui/AppPhones";

type Project = {
  title: string;
  category: string;
  role: string;
  desc: string;
  highlights?: string[];
  tags: string[];
  image?: string;
  shots?: AppShot[];
  liveUrl?: string;
  liveLabel?: string;
  repoUrl?: string;
};

const antojaShots: AppShot[] = [
  {
    name: "Antoja",
    src: "/antoja/antoja-customers.webp",
    alt: "Antoja customer app home screen with search, deals and nearby restaurants",
  },
  {
    name: "Antoja Negocios",
    src: "/antoja/antoja-restaurants.webp",
    alt: "Antoja Negocios dashboard with today's sales, key figures and an hourly sales chart",
  },
  {
    name: "Antoja Repartidor",
    src: "/antoja/antoja-couriers.webp",
    alt: "Antoja Repartidor delivery route on a map with the customer's details",
  },
];

const armonyxShots: AppShot[] = [
  {
    name: "Home",
    src: "/armonyx/armonyx-resident-home.webp",
    alt: "ArmonyX resident app home with the active house, its incident reports with risk scores and recent visitor access",
  },
  {
    name: "Community map",
    src: "/armonyx/armonyx-resident-map.webp",
    alt: "ArmonyX interactive map of Las Fincas Residencial with the resident's house highlighted and amenities marked",
  },
  {
    name: "QR access",
    src: "/armonyx/armonyx-resident-qr.webp",
    alt: "ArmonyX visitor QR code with its remaining validity, visitor name and destination house",
  },
];

const civixShots: AppShot[] = [
  {
    name: "Neighborhood risk",
    src: "/civix/civix-citizen-home.webp",
    alt: "CiviX citizen app home showing the neighborhood risk index, the zone card and nearby reports with their risk",
  },
  {
    name: "Risk heat map",
    src: "/civix/civix-citizen-map.webp",
    alt: "CiviX dark map of Tepic with reports as points on a risk heat map, zone indexes and category filters",
  },
  {
    name: "Risk estimate",
    src: "/civix/civix-citizen-report.webp",
    alt: "CiviX report confirmation screen with the automatic risk analysis showing the estimated level and its confidence",
  },
];

const projects: Project[] = [
  {
    title: "Antoja",
    category: "Mobile · Marketplace",
    role: "Founder & project lead",
    desc: "Food delivery platform for Santiago Ixcuintla and Tuxpan, Nayarit, the first service of its kind in both towns. Three Flutter apps (for customers, restaurants and couriers) share one codebase and a Node.js backend.",
    highlights: [
      "Came up with the idea and lead the project end to end",
      "Designed the UI and UX of all three apps",
      "Integrated Google APIs and Firebase push notifications",
      "Built online payments with Mercado Pago",
    ],
    tags: ["Flutter", "Dart", "Node.js", "Firebase", "Mercado Pago", "Google APIs"],
    shots: antojaShots,
    liveUrl: "https://antoja.com.mx",
    liveLabel: "Visit site",
  },
  {
    title: "ArmonyX",
    category: "SaaS · Residential communities",
    role: "Tech lead & backend developer",
    desc: "A platform for managing private residential communities in Mexico. Administrators, residents and guards work on the same real-time system instead of WhatsApp groups, paper logs and spreadsheets.",
    highlights: [
      "Led the technical direction and designed the interfaces",
      "Incident reports with photo and map pin, validated by AI and scored for risk",
      "QR access for visitors and couriers, scanned by guards at the gate",
      "Multi-tenant Express and PostgreSQL backend with real-time updates over Socket.IO",
      "Interactive map of the community built with MapLibre GL",
    ],
    tags: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "Socket.IO", "MapLibre GL"],
    shots: armonyxShots,
    liveUrl: "https://armony-x.vercel.app",
    liveLabel: "Visit site",
  },
  {
    title: "CiviX",
    category: "Civic tech · Urban risk intelligence",
    role: "Tech lead & backend developer",
    desc: "A progressive web app that turns citizen reports into territorial intelligence. Every report gets a transparent urban risk index, so municipal teams attend what is most critical first, not what arrived last.",
    highlights: [
      "Accredited to the national ExpoCiencias 2026 in Monterrey after the Nayarit state fair",
      "Led the technical direction and designed the interfaces",
      "Transparent urban risk index that ranks reports by impact, not by date",
      "Duplicate detection that merges nearby reports and lets neighbors add support",
      "Admin heat map and crisis simulator, with real-time updates over Socket.IO and Web Push",
    ],
    tags: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "Leaflet", "Socket.IO", "PWA"],
    shots: civixShots,
  },
  {
    title: "Cipher-AI",
    category: "Artificial Intelligence · Web",
    role: "Developer",
    desc: "Transform legacy code into documented, secured, maintainable software in 30 seconds using Gemini 3's structured reasoning.",
    tags: ["Next.js", "TypeScript", "React", "Tailwind", "Google Gemini 3", "Redis"],
    image: "/Cipher.png",
    liveUrl: "https://cipherai-app.vercel.app/",
    liveLabel: "Live site",
    repoUrl: "https://github.com/Dashxl/Cipher-AI",
  },
];

const ProjectLinks = ({ project }: { project: Project }) => (
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
        aria-label={`${project.title} — source code`}
        className="link-underline inline-flex items-center gap-1.5"
      >
        <Github size={15} /> Code
      </a>
    )}
  </div>
);

export const Work = () => {
  return (
    <section id="work" className="border-t border-border px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          label="Selected work"
          title={
            <>
              Products I&apos;ve <em className="text-accent">designed and shipped</em>.
            </>
          }
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
                    "relative overflow-hidden rounded-md border border-border bg-surface",
                    project.image && "aspect-[3/2]",
                    idx % 2 === 1 && "md:order-last"
                  )}
                >
                  {project.shots ? (
                    <AppPhones shots={project.shots} />
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
                  <p className="mt-2 text-sm text-muted-foreground">Role: {project.role}</p>
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
