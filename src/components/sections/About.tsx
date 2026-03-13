"use client";

import { motion } from "framer-motion";
import React from "react";
import { Code2, Palette, Terminal, Cpu, Globe, Zap } from "lucide-react";

const skills = [
  { name: "Full Stack Dev", icon: <Terminal className="text-primary" />, desc: "Next.js, TypeScript, Node.js", level: "Expert" },
  { name: "UI/UX Design", icon: <Palette className="text-primary" />, desc: "Framer Motion, Tailwind, Figma", level: "Advanced" },
  { name: "Cloud & Ops", icon: <Globe className="text-primary" />, desc: "Vercel, AWS, Docker", level: "Advanced" },
  { name: "Performance", icon: <Zap className="text-primary" />, desc: "Bento Grids, Optimization", level: "Advanced" },
  { name: "Core Stack", icon: <Code2 className="text-primary" />, desc: "React, PostgreSQL, Prisma", level: "Expert" },
  { name: "Systems", icon: <Cpu className="text-primary" />, desc: "Architecture, Scalability", level: "Advanced" },
];

export const About = () => {
  return (
    <section id="about" className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">About Me</h2>
          <p className="mt-4 text-muted-foreground">Technologies and skills I master to create the web of the future.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-secondary/30 p-8 backdrop-blur-sm transition-all hover:bg-secondary/50"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                {skill.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">{skill.name}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{skill.desc}</p>
              <div className="flex items-center gap-2">
                <span className="h-1 w-full rounded-full bg-white/5">
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level === "Expert" ? "100%" : "85%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="block h-full rounded-full bg-primary"
                  />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{skill.level}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

