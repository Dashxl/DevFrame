"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

// One screen of an app: the promo headline changes together with the capture.
export type AppSlide = { headline: string; src: string; alt: string };
export type AppShot = { name: string; slides: AppSlide[] };

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

type ColumnProps = { shot: AppShot; index: number; inView: boolean; reduce: boolean };

const PhoneColumn = ({ shot, index, inView, reduce }: ColumnProps) => {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = shot.slides.length;
  const slide = shot.slides[active];
  const isCarousel = count > 1;

  // Each phone advances on its own, slightly out of step with its neighbours. Hovering pauses it.
  useEffect(() => {
    if (!isCarousel || reduce || paused || !inView) return;
    const id = window.setTimeout(() => setActive((current) => (current + 1) % count), 3600 + index * 500);
    return () => window.clearTimeout(id);
  }, [active, count, index, inView, isCarousel, paused, reduce]);

  return (
    <motion.figure
      custom={index}
      variants={column}
      initial={reduce ? false : "hidden"}
      animate={inView || reduce ? "show" : "hidden"}
      role={isCarousel ? "group" : undefined}
      aria-roledescription={isCarousel ? "carousel" : undefined}
      aria-label={isCarousel ? shot.name : undefined}
      onPointerEnter={(event) => event.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setPaused(false)}
      className="flex w-full max-w-[11rem] flex-col items-center gap-3"
    >
      <div className="min-h-[3.6em] text-center text-[11px] font-bold leading-[1.2] tracking-tight text-[#FBF5EC] sm:min-h-[2.5em] sm:text-sm">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={active}
            aria-live={isCarousel ? "polite" : undefined}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="text-balance"
          >
            {slide.headline}
          </motion.p>
        </AnimatePresence>
      </div>

      <motion.div custom={index} variants={tilt} className="w-full">
        {/* Hovering pops the phone closer; letting go springs it back */}
        <motion.div
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={reduce ? undefined : { scale: 1.1, transition: { type: "spring", stiffness: 420, damping: 14 } }}
          whileTap={reduce ? undefined : { scale: 1.04 }}
          onClick={isCarousel ? () => setActive((current) => (current + 1) % count) : undefined}
          className={cn("relative aspect-[582/1131] w-full hover:z-10", isCarousel ? "cursor-pointer" : "cursor-default")}
        >
          {shot.slides.map((s, slideIndex) => (
            <motion.div
              key={s.src}
              aria-hidden={slideIndex !== active}
              initial={false}
              animate={{ opacity: slideIndex === active ? 1 : 0, scale: slideIndex === active ? 1 : 0.96 }}
              transition={{ duration: reduce ? 0 : 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 768px) 176px, 30vw"
                className="object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {isCarousel && (
        <div className="-my-1 flex items-center">
          {shot.slides.map((_, dot) => (
            <button
              key={dot}
              type="button"
              aria-label={`${shot.name}: ${t("screen", "pantalla")} ${dot + 1} / ${count}`}
              aria-current={dot === active}
              onClick={() => setActive(dot)}
              className="grid h-5 place-items-center px-[3px]"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full bg-[#FBF5EC] transition-all duration-300",
                  dot === active ? "w-4 opacity-100" : "w-1.5 opacity-40"
                )}
              />
            </button>
          ))}
        </div>
      )}

      <figcaption className="text-balance text-center text-[11px] font-bold leading-[1.2] tracking-tight text-[#FBF5EC] sm:text-sm">
        {shot.name}
      </figcaption>
    </motion.figure>
  );
};

export const AppPhones = ({ shots }: { shots: AppShot[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion() ?? false;

  return (
    <div ref={ref} className="relative">
      <Backdrop />
      <div className="relative flex items-start justify-center gap-3 px-5 pb-24 pt-8 sm:gap-6 sm:px-8 sm:pb-32 sm:pt-10">
        {shots.map((shot, i) => (
          <PhoneColumn key={shot.name} shot={shot} index={i} inView={inView} reduce={reduce} />
        ))}
      </div>
    </div>
  );
};
