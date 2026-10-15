"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

export type AppShot = { name: string; headline: string; src: string; alt: string };

// The phones step down a diagonal and each leans a little. Only the phone tilts: the headline above and
// the name below stay upright so they remain easy to read. Offsets are a percentage of the column height.
const steps = [
  { y: "0%", rotate: -5 },
  { y: "9%", rotate: 1 },
  { y: "18%", rotate: 6 },
];

const column: Variants = {
  hidden: { opacity: 0, y: "30%" },
  show: (i: number) => ({
    opacity: 1,
    y: steps[i % steps.length].y,
    transition: { type: "spring", stiffness: 80, damping: 15, delay: i * 0.14 },
  }),
};

const tilt: Variants = {
  hidden: (i: number) => ({ rotate: steps[i % steps.length].rotate * 2.5, scale: 0.92 }),
  show: (i: number) => ({
    rotate: steps[i % steps.length].rotate,
    scale: 1,
    transition: { type: "spring", stiffness: 70, damping: 12, delay: i * 0.14 + 0.1 },
  }),
};

// Soft glow, rings and a fading dot grid behind the phones give the flat purple some depth.
const Backdrop = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle at 18% 12%, rgb(255 255 255 / 0.2), transparent 52%), radial-gradient(circle at 92% 96%, rgb(24 8 70 / 0.4), transparent 58%)",
      }}
    />
    <div
      className="absolute inset-0 opacity-60"
      style={{
        backgroundImage: "radial-gradient(rgb(255 255 255 / 0.28) 1.1px, transparent 1.3px)",
        backgroundSize: "22px 22px",
        maskImage: "radial-gradient(circle at 85% 12%, #000, transparent 55%)",
        WebkitMaskImage: "radial-gradient(circle at 85% 12%, #000, transparent 55%)",
      }}
    />
    <svg
      className="absolute left-1/2 top-[58%] h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2"
      viewBox="0 0 400 400"
      fill="none"
    >
      <circle cx="200" cy="200" r="70" stroke="white" strokeOpacity="0.16" />
      <circle cx="200" cy="200" r="110" stroke="white" strokeOpacity="0.12" />
      <circle cx="200" cy="200" r="150" stroke="white" strokeOpacity="0.08" />
      <circle cx="200" cy="200" r="190" stroke="white" strokeOpacity="0.05" />
    </svg>
  </div>
);

export const AppPhones = ({ shots }: { shots: AppShot[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="relative">
      <Backdrop />
      <div className="relative flex items-start justify-center gap-3 px-5 pb-24 pt-8 sm:gap-6 sm:px-8 sm:pb-32 sm:pt-10">
        {shots.map((shot, i) => (
          <motion.figure
            key={shot.name}
            custom={i}
            variants={column}
            initial={reduce ? false : "hidden"}
            animate={inView || reduce ? "show" : "hidden"}
            className="flex w-full max-w-[11rem] flex-col items-center gap-3"
          >
            <p className="min-h-[3.6em] text-balance text-center text-[11px] font-bold leading-[1.2] tracking-tight text-[#FBF5EC] sm:min-h-[2.5em] sm:text-sm">
              {shot.headline}
            </p>
            <motion.div custom={i} variants={tilt} className="w-full">
              {/* Hovering pops the phone closer; letting go springs it back */}
              <motion.div
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                whileHover={reduce ? undefined : { scale: 1.1, transition: { type: "spring", stiffness: 420, damping: 14 } }}
                whileTap={reduce ? undefined : { scale: 1.04 }}
                className="relative w-full cursor-default hover:z-10"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={640}
                  height={1250}
                  sizes="(min-width: 768px) 176px, 30vw"
                  className="h-auto w-full"
                />
              </motion.div>
            </motion.div>
            <figcaption className="text-balance text-center text-[11px] font-bold leading-[1.2] tracking-tight text-[#FBF5EC] sm:text-sm">
              {shot.name}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
};
