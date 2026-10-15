import { ArrowUpRight, Github, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Gengar } from "@/components/ui/Gengar";

const EMAIL = "sandro.ramirez.1102@gmail.com";

const channels = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/dscp-sandro-ramirez/", icon: <Linkedin size={16} /> },
  { name: "GitHub", href: "https://github.com/Dashxl", icon: <Github size={16} /> },
  { name: "Instagram", href: "https://www.instagram.com/dash._.xl/", icon: <Instagram size={16} /> },
  { name: "WhatsApp", href: "https://wa.me/523231025480", icon: <MessageCircle size={16} /> },
];

export const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border px-6 pb-10 pt-20 md:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <Reveal>
            <p className="label mb-6">
              <span className="text-accent">04</span>
              <span className="mx-3 text-border">/</span>
              Contact
            </p>
            <h2 className="display max-w-4xl text-5xl leading-[1.06] md:text-6xl lg:text-7xl">
              Hiring? <em className="text-accent">Let&apos;s talk.</em>
            </h2>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground">
              I&apos;m looking for a team where I can build web and mobile products end to end. If you have a role or
              a project in mind, I&apos;d like to hear about it.
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="group mt-10 inline-flex max-w-full items-center gap-2 text-lg font-medium sm:text-xl md:text-2xl"
            >
              <span className="link-underline break-all">{EMAIL}</span>
              <ArrowUpRight
                size={22}
                className="shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {channels.map((channel) => (
                <a
                  key={channel.name}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-border px-6 text-sm font-medium transition-colors hover:border-foreground"
                >
                  {channel.icon}
                  {channel.name}
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:justify-self-end">
            <Gengar />
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 Sandro Ramírez</p>
          <p>Full Stack &amp; Mobile Developer</p>
        </div>
      </div>
    </footer>
  );
};
