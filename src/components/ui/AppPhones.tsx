"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export type AppShot = { name: string; src: string; alt: string };

// Each phone rises into place with a slight tilt that settles; the outer ones lean opposite ways.
const entrance: Variants = {
  hidden: (i: number) => ({ opacity: 0, y: 48, rotate: i === 0 ? -5 : i === 2 ? 5 : 0, scale: 0.94 }),
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 15, delay: i * 0.14 },
  }),
};

export const AppPhones = ({ shots }: { shots: AppShot[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="flex items-start justify-center gap-3 p-5 sm:gap-6 sm:p-8">
      {shots.map((shot, i) => (
          <div key={shot.name} className={cn("w-full max-w-[11rem]", i === 1 && "-translate-y-3")}>
            <motion.figure
              custom={i}
              variants={entrance}
              initial={reduce ? false : "hidden"}
              animate={inView || reduce ? "show" : "hidden"}
              className="flex flex-col items-center gap-3"
            >
              {/* Hovering pops the phone closer; letting go springs it back */}
              <motion.div
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                whileHover={reduce ? undefined : { scale: 1.1, transition: { type: "spring", stiffness: 420, damping: 14 } }}
                whileTap={reduce ? undefined : { scale: 1.04 }}
                className="relative w-full cursor-default drop-shadow-[0_12px_20px_rgb(0_0_0_/_0.12)] hover:z-10"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={720}
                  height={1558}
                  sizes="(min-width: 768px) 176px, 30vw"
                  className="h-auto w-full rounded-xl border border-border"
                />
              </motion.div>
              <figcaption className="text-center text-[11px] font-medium leading-tight sm:text-xs">{shot.name}</figcaption>
            </motion.figure>
          </div>
      ))}
    </div>
  );
};
