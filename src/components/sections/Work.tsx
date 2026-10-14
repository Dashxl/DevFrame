import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Project = {
  title: string;
  category: string;
  role: string;
  desc: string;
  tags: string[];
  image?: string;
  liveUrl?: string;
  liveLabel?: string;
  repoUrl?: string;
};

const projects: Project[] = [
  {
    title: "Antoja",
    category: "Mobile · Marketplace",
    role: "Lead developer",
    desc: "Food delivery platform for Santiago Ixcuintla and Tuxpan, Nayarit, the first service of its kind in both towns. Three Flutter apps (for customers, restaurants and couriers) share one codebase and a Node.js backend.",
    tags: ["Flutter", "Dart", "Node.js"],
    liveUrl: "https://antoja.com.mx",
    liveLabel: "Visit site",
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

const appRoles = ["Customers", "Restaurants", "Couriers"];

const AppsPreview = () => (
  <div aria-hidden className="flex h-full items-center justify-center gap-4 sm:gap-8">
    {appRoles.map((role, i) => (
      <div key={role} className={cn("flex flex-col items-center gap-3", i === 1 && "-translate-y-3")}>
        <div className="flex aspect-[9/18] w-[4.5rem] flex-col gap-2 rounded-2xl border border-border bg-background p-2.5 sm:w-24">
          <div className="mx-auto h-1 w-6 rounded-full bg-border" />
          <div className={cn("h-10 rounded-md sm:h-14", i === 1 ? "bg-accent" : "bg-border")} />
          <div className="h-1.5 rounded-full bg-border" />
          <div className="h-1.5 w-3/4 rounded-full bg-border" />
          <div className="h-1.5 w-1/2 rounded-full bg-border" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{role}</span>
      </div>
    ))}
  </div>
);

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
    <section id="work" className="border-t border-border px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          label="Selected work"
          title={
            <>
              Products I&apos;ve <em className="text-accent">designed and shipped</em>.
            </>
          }
        />

        <div className="space-y-20 md:space-y-28">
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
                    "relative aspect-[3/2] overflow-hidden rounded-md border border-border bg-surface",
                    idx % 2 === 1 && "md:order-last"
                  )}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <AppsPreview />
                  )}
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
                  <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-xs text-muted-foreground">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <ProjectLinks project={project} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
