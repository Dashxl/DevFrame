"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useLang } from "@/lib/i18n";

const SKEW_DEG = -9.2;
const RUNWAY = "300svh"; // scroll distance the transition takes; the frame stays pinned for all of it
const WIDE = "(min-width: 1024px)";
// How much of the screen the band overlaps the section before it. The pinned frame is transparent, so the panels
// start sweeping across that section's last screen instead of arriving over an empty page.
const OVERLAP = 0.9;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const sineIn = (t: number) => 1 - Math.cos((t * Math.PI) / 2);
const sineInOut = (t: number) => (1 - Math.cos(t * Math.PI)) / 2;

const subscribeWide = (notify: () => void) => {
  const query = window.matchMedia(WIDE);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const useWide = () =>
  useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE).matches,
    () => false
  );

type Props = {
  /** The big word that settles on the final panel, in each language. */
  title: { en: string; es: string };
};

// A staggered diagonal grid of panels that sweeps through a pinned screen and settles into a solid section break.
// Everything derives from scroll progress, so scrolling back reverses it exactly. The panels are decorative and
// the headline repeats a heading that already exists in the page, so the whole band is hidden from assistive tech.
export const PanelTransition = ({ title }: Props) => {
  const { t } = useLang();
  const wide = useWide();
  const columns = wide ? 4 : 3;
  const rows = wide ? 3 : 4;

  const runwayRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const primaryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const accentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const runway = runwayRef.current;
    const frame = frameRef.current;
    if (!runway || !frame) return;

    // Each cell's delay: the bottom-right cell leads and the top-left one finishes last.
    const distances: number[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        distances.push(Math.hypot(col - (columns - 0.5), row - (rows - 0.5)));
      }
    }
    const min = Math.min(...distances);
    const max = Math.max(...distances);
    const delays = distances.map((d) => (3 * (d - min)) / (max - min));

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    // The overlap can never exceed the section before it, or the band would start above the top of the page.
    const previous = runway.previousElementSibling as HTMLElement | null;
    const overlap = () => {
      if (reducedQuery.matches) {
        runway.style.marginTop = "";
        return;
      }
      const room = previous ? previous.offsetHeight : 0;
      runway.style.marginTop = `${-Math.min(frame.clientHeight * OVERLAP, room)}px`;
    };

    const update = () => {
      raf = 0;
      overlap();
      // With reduced motion the layers are hidden and the section is shown directly, so nothing is driven.
      if (reducedQuery.matches) return;
      const range = runway.offsetHeight - frame.clientHeight;
      const p = range > 0 ? clamp01(-runway.getBoundingClientRect().top / range) : 0;

      delays.forEach((delay, i) => {
        const local = p * 5 - delay;
        const primary = 110 * (1 - sineIn(clamp01(local - 1)));
        const accent = 110 - 220 * sineInOut(clamp01(local / 2));
        const primaryEl = primaryRefs.current[i];
        const accentEl = accentRefs.current[i];
        if (primaryEl) primaryEl.style.transform = `translate3d(0, ${primary}%, 0)`;
        if (accentEl) accentEl.style.transform = `translate3d(0, ${accent}%, 0)`;
      });

      // The headline arrives over the second half of the transition.
      const reveal = (1 - Math.cos(clamp01((p - 0.5) / 0.5) * Math.PI)) / 2;
      if (contentRef.current) contentRef.current.style.opacity = String(reveal);
      if (headingRef.current) headingRef.current.style.transform = `translate3d(0, ${28 * (1 - reveal)}px, 0)`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(frame);
    if (previous) resizeObserver.observe(previous);
    window.addEventListener("scroll", schedule, { passive: true });
    reducedQuery.addEventListener("change", schedule);
    update();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      reducedQuery.removeEventListener("change", schedule);
    };
  }, [columns, rows]);

  // The grid is wider than the frame by one cell and shifted half a cell left, so the skew never exposes the edges.
  const grid = {
    left: `${-50 / (columns - 1)}%`,
    width: `${(100 * columns) / (columns - 1)}%`,
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    transform: `skewX(${SKEW_DEG}deg)`,
  };
  const cells = Array.from({ length: columns * rows }, (_, i) => i);
  const offscreen = { transform: "translate3d(0, 110%, 0)" };
  const cellClass = "relative overflow-hidden";

  return (
    <div
      ref={runwayRef}
      aria-hidden
      className="pointer-events-none relative motion-reduce:h-svh!"
      style={{ height: RUNWAY }}
    >
      <div ref={frameRef} className="sticky top-0 h-svh overflow-hidden motion-reduce:static">
        <div className="absolute inset-y-0 grid motion-reduce:hidden" style={grid}>
          {cells.map((i) => (
            <div key={i} className={cellClass} style={{ margin: "-0.5px" }}>
              <div
                ref={(node) => {
                  primaryRefs.current[i] = node;
                }}
                className="absolute bg-accent"
                style={{ inset: "-0.5px", ...offscreen }}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 grid motion-reduce:hidden" style={grid}>
          {cells.map((i) => (
            <div key={i} className={cellClass} style={{ margin: "-0.5px" }}>
              <div
                ref={(node) => {
                  accentRefs.current[i] = node;
                }}
                className="absolute bg-[color-mix(in_oklch,var(--accent)_45%,white)]"
                style={{ inset: "-0.5px", ...offscreen }}
              />
            </div>
          ))}
        </div>

        {/* No background of its own: the settled panels are the backdrop, except with reduced motion. */}
        <div
          ref={contentRef}
          className="absolute inset-0 flex items-start px-6 pt-28 text-accent-foreground motion-reduce:bg-accent motion-reduce:opacity-100!"
          style={{ opacity: 0 }}
        >
          <p
            ref={headingRef}
            className="display text-[clamp(3rem,13vw,13rem)] leading-[0.9] motion-reduce:transform-none!"
          >
            {t(title.en, title.es)}
          </p>
        </div>
      </div>
    </div>
  );
};
