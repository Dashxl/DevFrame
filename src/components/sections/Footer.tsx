"use client";

import { motion } from "framer-motion";
import React from "react";
import { Github, Linkedin, Twitter, Instagram, Send, ArrowUpRight } from "lucide-react";

export const Footer = () => {
  const socials = [
    { icon: <Github />, href: "https://github.com/Dashxl" },
    { icon: <Linkedin />, href: "https://www.linkedin.com/in/dscp-sandro-ramirez/" },
    { icon: <Twitter />, href: "#" },
    { icon: <Instagram />, href: "https://www.instagram.com/dash._.xl/" },
  ];

  return (
    <footer id="contact" className="relative pt-32 pb-16 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl mb-6">
              Have a <span className="text-gradient">great idea</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              I'm always open to discussing new projects, creative ideas or vision about your digital presence.
            </p>

            <motion.a
              href="mailto:contact@example.com"
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-3 text-2xl font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Let's talk <Send size={24} />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] border border-white/5 bg-secondary/30 p-12 backdrop-blur-xl"
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Follow me</h3>
              <div className="flex gap-4">
                {socials.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    whileHover={{ y: -5, color: "var(--primary)" }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-muted-foreground border border-white/5 transition-colors"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Location</h3>
              <p className="text-muted-foreground mb-1 flex items-center gap-2">
                Working remotely worldwide <ArrowUpRight size={14} className="text-primary" />
              </p>
              <p className="text-sm text-white/40">Available 24/7 (GMT+1)</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Professional Portfolio. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary">Inspiration</a>
            <a href="#" className="hover:text-primary">Source</a>
            <a href="#" className="hover:text-primary">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

