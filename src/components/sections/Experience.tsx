import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Position = {
  company: string;
  location: string;
  role: string;
  period?: string;
  summary?: string;
  highlights?: string[];
};

const positions: Position[] = [
  {
    company: "Honda Avante",
    location: "Tepic, Nayarit",
    role: "Internship, Development department",
    period: "May – August 2025",
  },
];

const education = {
  school: "Universidad Tecnológica de la Costa",
  degrees: [
    {
      name: "Software Development and Management Engineering",
      status: "In progress · expected April 2027",
    },
    {
      name: "TSU in Information Technologies, Multiplatform Software Development",
      status: "Completed",
    },
  ],
};

export const Experience = () => {
  return (
    <section id="experience" className="border-t border-border px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="01"
          label="Experience"
          title={
            <>
              Experience beyond <em className="text-accent">my own projects</em>.
            </>
          }
        />

        <div className="border-t border-border">
          {positions.map((position, idx) => (
            <Reveal key={`${position.company}-${position.role}`} delay={idx * 0.06}>
              <article className="grid gap-3 border-b border-border py-6 md:grid-cols-[1fr_1.4fr] md:gap-12 md:py-8">
                <div>
                  <h3 className="display text-2xl md:text-3xl">{position.company}</h3>
                  <p className="label mt-3">{position.location}</p>
                </div>
                <div>
                  <p className="text-lg font-medium tracking-tight">{position.role}</p>
                  {position.period && <p className="label mt-2">{position.period}</p>}
                  {position.summary && (
                    <p className="mt-4 leading-relaxed text-muted-foreground">{position.summary}</p>
                  )}
                  {position.highlights && (
                    <ul className="mt-5 space-y-2.5 text-sm">
                      {position.highlights.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span aria-hidden className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 md:mt-16">
          <Reveal>
            <h3 className="label mb-6">Education</h3>
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
