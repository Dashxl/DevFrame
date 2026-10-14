import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const areas = [
  {
    name: "Mobile Development",
    desc: "Cross-platform apps from a single codebase, shipped for multiple user roles.",
  },
  {
    name: "Web Development",
    desc: "Responsive, performant web applications and landing pages.",
  },
  {
    name: "Backend & Data",
    desc: "APIs and relational data models that the clients can rely on.",
  },
  {
    name: "Interface Design",
    desc: "Interfaces designed in Figma and built with component libraries.",
  },
  {
    name: "Cloud & Delivery",
    desc: "Hosting and deployment in the cloud.",
  },
  {
    name: "Architecture",
    desc: "System design, scalability and performance optimization.",
  },
];

const technologies = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "Dart", "PHP"] },
  { group: "Frameworks", items: ["Flutter", "React", "Next.js", "Node.js", "Angular", "Laravel"] },
  { group: "Interface", items: ["Tailwind CSS", "shadcn/ui", "Framer Motion", "daisyUI", "Bootstrap", "Figma"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL"] },
  { group: "Cloud", items: ["Vercel", "Google Cloud"] },
];

export const Expertise = () => {
  return (
    <section id="expertise" className="border-t border-border px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="01"
          label="Expertise"
          title={
            <>
              One developer across the <em className="text-accent">whole stack</em>.
            </>
          }
        />

        <Reveal>
          <p className="mb-14 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            I&apos;m comfortable owning a feature from the database to the screen: designing the API, building the
            web or mobile client, and shipping it. Flutter and Node.js are my daily tools, and Antoja put them
            to work in a real product with three different kinds of users.
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
          <div className="mt-20 md:mt-28">
            <h3 className="label mb-8">Languages &amp; technologies</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:gap-x-8 lg:grid-cols-5">
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
      </div>
    </section>
  );
};
