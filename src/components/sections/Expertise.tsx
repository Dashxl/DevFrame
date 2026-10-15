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
    desc: "APIs, relational data models and third-party integrations such as payments and push notifications.",
  },
  {
    name: "Interface Design",
    desc: "UI and UX designed in Figma and built with component libraries.",
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
  { group: "Frameworks", items: ["Flutter", "React", "Next.js", "Node.js", "Express", "Angular", "Laravel"] },
  { group: "Interface", items: ["Tailwind CSS", "shadcn/ui", "Framer Motion", "Bootstrap", "Figma"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "Prisma"] },
  { group: "Cloud", items: ["Vercel", "Google Cloud"] },
  { group: "Integrations", items: ["Mercado Pago", "Firebase", "Google APIs"] },
];

const strengths = [
  {
    name: "Leadership",
    desc: "Led Antoja from the first idea and acted as technical lead on ArmonyX and CiviX.",
  },
  {
    name: "Ownership",
    desc: "Takes a feature from the database to the screen and stays with it until it ships.",
  },
  {
    name: "Product mindset",
    desc: "Starts from the user's problem and designs the interface before writing the code.",
  },
  {
    name: "Fast learner",
    desc: "Moves between Flutter, Next.js, Node.js and AI APIs and becomes productive quickly.",
  },
  {
    name: "Teamwork",
    desc: "Comfortable in a development team, as at Honda Avante, and good at explaining technical decisions.",
  },
  {
    name: "Under pressure",
    desc: "Delivers on tight deadlines: a hackathon build and a state science fair that led to a national stage.",
  },
];

export const Expertise = () => {
  return (
    <section id="expertise" className="border-t border-border px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          label="Expertise"
          title={
            <>
              One developer across the <em className="text-accent">whole stack</em>.
            </>
          }
        />

        <Reveal>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
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
          <div className="mt-14 md:mt-20">
            <h3 className="label mb-8">Languages &amp; technologies</h3>
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
            <h3 className="label mb-8">Strengths</h3>
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
