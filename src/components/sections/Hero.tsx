"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, MousePointer2 } from "lucide-react";
import React from "react";

export const Hero = () => {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-primary/20 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        {/* Profile Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mb-10 h-32 w-32 md:h-40 md:w-40"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-accent opacity-20 blur-xl animate-pulse" />
          <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white/10 glass shadow-2xl shadow-primary/20">
            <img
              src="/profile.png" // <--- Cambia esto por el nombre de tu archivo en /public
              alt="Profile"
              className="h-full w-full object-cover transition-all duration-500"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </span>
          Available for new projects
        </motion.div>

        <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground md:text-8xl">
          Designing the <br />
          <span className="text-gradient">Digital Future</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
          I'm a Full Stack Developer specialized in creating exceptional web experiences, combining impeccable design with robust technical architecture.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-14 items-center gap-2 rounded-full bg-primary px-8 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            View Projects <ArrowRight size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-14 items-center gap-2 rounded-full bg-secondary px-8 font-semibold text-foreground border border-white/5 transition-all hover:bg-secondary/80"
          >
            Download Resume <Download size={20} />
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="h-6 w-px bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
};

