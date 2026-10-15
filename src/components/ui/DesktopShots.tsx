"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type DesktopShot = { name: string; light: string; dark: string; alt: string };

type Props = { shots: DesktopShot[]; url: string };

// Desktop captures in a browser frame. The capture follows the site theme, and the tabs switch between screens.
export const DesktopShots = ({ shots, url }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const shot = shots[active];

  return (
    <div ref={ref} className="p-5 sm:p-8">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
        animate={inView || reduce ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        whileHover={reduce ? undefined : { scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 18 } }}
        className="overflow-hidden rounded-lg border border-border bg-background drop-shadow-[0_16px_28px_rgb(0_0_0_/_0.14)]"
      >
        <div className="flex items-center gap-3 border-b border-border bg-surface px-3 py-2.5">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
          </div>
          <div className="min-w-0 flex-1 truncate rounded-md border border-border bg-background px-3 py-1 text-center font-mono text-[11px] text-muted-foreground">
            {url}
          </div>
          <div className="w-10 sm:w-12" aria-hidden />
        </div>

        <div className="relative aspect-[16/10]">
          <AnimatePresence mode="wait">
            <motion.div
              key={shot.name}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={shot.light}
                alt={shot.alt}
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover dark:hidden"
              />
              <Image
                src={shot.dark}
                alt={shot.alt}
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="hidden object-cover dark:block"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div role="tablist" aria-label="Cipher-AI screens" className="mt-5 flex justify-center gap-2">
        {shots.map((s, i) => (
          <button
            key={s.name}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full border px-3.5 py-1 text-xs font-medium transition-colors",
              i === active
                ? "border-accent bg-accent text-white"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
};
