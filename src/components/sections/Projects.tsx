"use client";

import { motion } from "framer-motion";
import React from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Cipher-AI",
    category: "Artificial Intelligence",
    desc: "Transform legacy code into documented, secured, maintainable software in 30 seconds using Gemini 3's structured reasoning.",
    tags: ["Next.js", "TypeScript", "React", "Tailwind", "Google Gemini 3", "Redis"],
    image: "/Cipher.png",
    liveUrl: "https://cipherai-app.vercel.app/",
    repoUrl: "https://github.com/Dashxl/Cipher-AI",
  },
  {
    title: "EcoPulse Dashboard",
    category: "Analytics / FinTech",
    desc: "Complex data visualization for global environmental monitoring.",
    tags: ["React", "D3.js", "Tailwind"],
    image: "https://images.unsplash.com/photo-1551288049-bbda38a10ad1?q=80&w=2340&auto=format&fit=crop",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Vivid UI Stack",
    category: "Design System",
    desc: "Premium design system with highly interactive and accessible components.",
    tags: ["Radix UI", "TypeScript", "SCSS"],
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2340&auto=format&fit=crop",
    liveUrl: "#",
    repoUrl: "#",
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6 bg-background/50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">Featured Projects</h2>
            <p className="mt-4 text-muted-foreground">A selection of my most recent and challenging works.</p>
          </div>
          <button className="text-sm font-semibold text-primary hover:underline">View all projects →</button>
        </motion.div>


        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-secondary/20"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-8">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{project.category}</span>
                <h3 className="mt-2 text-2xl font-bold text-foreground">{project.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{project.desc}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                  >
                    <ExternalLink size={18} />
                  </a>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-muted-foreground hover:bg-white/10 transition-all"
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
