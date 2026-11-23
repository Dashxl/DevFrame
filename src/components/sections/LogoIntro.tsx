"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { PORTRAIT, PORTRAIT_STROKE } from "@/components/ui/avatarPaths";
import { LOGO_VIEWBOX, WORDMARK_LINE_1, WORDMARK_LINE_2 } from "@/components/ui/logoIntroPaths";

// Timeline, in ms: draw -> fill -> hold -> fade out.
const DRAW_MS = 1200;
const FILL_AT = 1560; // after the last contour (latest delay 340ms + DRAW_MS) has finished drawing
const FILL_MS = 450;
const FADE_AT = 2400;
const TOTAL_MS = 2900;
const REDUCED_HOLD_MS = 1200;
const SEEN_KEY = "intro-seen";

const GLYPH_STROKE = 0.1;

const WORDMARK = [...WORDMARK_LINE_1, ...WORDMARK_LINE_2];

// Contours in drawing order: the portrait strokes (top of the hair first), then the two wordmark lines.
const WORDMARK_AT = PORTRAIT.length;
const CONTOURS: { d: string; delay: number; width: number }[] = [
  ...PORTRAIT.map((d, i) => ({ d, delay: (340 * i) / (PORTRAIT.length - 1), width: PORTRAIT_STROKE })),
  ...WORDMARK.map((glyph) => ({ ...glyph, width: GLYPH_STROKE })),
];

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(v));

export const LogoIntro = () => {
  const { t } = useLang();
  const [done, setDone] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGGElement>(null);
  const outlineRef = useRef<SVGGElement>(null);
  const filledRef = useRef<SVGGElement>(null);
  const strokeRefs = useRef<(SVGPathElement | null)[]>([]);

  // The clock lives in refs so the animation loop never re-renders React.
  const clock = useRef({ elapsed: 0, last: null as number | null, raf: 0 });
  const gates = useRef({ paused: false, hidden: false, offscreen: false, reduced: false });
  const syncRef = useRef<() => void>(() => {});

  const render = useCallback((time: number) => {
    strokeRefs.current.forEach((path, i) => {
      if (!path) return;
      const progress = ease((time - CONTOURS[i].delay) / DRAW_MS);
      path.style.strokeDashoffset = String(1 - progress);
      // A zero-length dash would still paint a round cap, so hide the stroke until it has started.
      path.style.strokeOpacity = progress > 0 ? "1" : "0";
    });
    const fill = ease((time - FILL_AT) / FILL_MS);
    const fade = 1 - ease((time - FADE_AT) / (TOTAL_MS - FADE_AT));
    if (filledRef.current) filledRef.current.style.opacity = String(fill);
    if (outlineRef.current) outlineRef.current.style.opacity = String(1 - fill);
    if (logoRef.current) logoRef.current.style.opacity = String(fade);
    if (backdropRef.current) backdropRef.current.style.opacity = String(fade);
  }, []);

  const finish = useCallback(() => {
    cancelAnimationFrame(clock.current.raf);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    setDone(true);
  }, []);

  useEffect(() => {
    // Returning visitors in the same session skip it: an inline script in <head> already hides the overlay via CSS.
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {}

    const root = rootRef.current;
    const state = gates.current;
    const time = clock.current;
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const frame = (now: number) => {
      // Elapsed time only advances while running, so a suspended tab never "catches up".
      if (time.last !== null) time.elapsed += Math.min(now - time.last, 100);
      time.last = now;
      if (time.elapsed >= TOTAL_MS) {
        render(TOTAL_MS);
        finish();
        return;
      }
      render(time.elapsed);
      time.raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      const running = !state.paused && !state.hidden && !state.offscreen && !state.reduced;
      cancelAnimationFrame(time.raf);
      time.last = null;
      if (running) time.raf = requestAnimationFrame(frame);
    };
    syncRef.current = sync;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let holdTimer: number | undefined;

    const applyReduced = () => {
      state.reduced = reducedQuery.matches;
      setReduced(state.reduced);
      window.clearTimeout(holdTimer);
      if (state.reduced) {
        // Show the finished logo for a moment, then continue to the page.
        render(FILL_AT + FILL_MS);
        holdTimer = window.setTimeout(finish, REDUCED_HOLD_MS);
      } else {
        time.elapsed = 0;
        render(0);
      }
      sync();
    };

    const onVisibility = () => {
      state.hidden = document.hidden;
      sync();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };

    const observer = new IntersectionObserver(([entry]) => {
      state.offscreen = !entry.isIntersecting;
      sync();
    });
    if (root) observer.observe(root);

    state.hidden = document.hidden;
    render(0);
    applyReduced();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("keydown", onKey);
    reducedQuery.addEventListener("change", applyReduced);

    return () => {
      cancelAnimationFrame(time.raf);
      window.clearTimeout(holdTimer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("keydown", onKey);
      reducedQuery.removeEventListener("change", applyReduced);
      html.style.overflow = previousOverflow;
    };
  }, [finish, render]);

  // Release the scroll lock as soon as the overlay is gone.
  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  const togglePause = () => {
    gates.current.paused = !gates.current.paused;
    setPaused(gates.current.paused);
    syncRef.current();
  };

  const replay = () => {
    clock.current.elapsed = 0;
    gates.current.paused = false;
    setPaused(false);
    render(0);
    syncRef.current();
  };

  if (done) return null;

  const stroke = (index: number) => (
    <path
      key={index}
      ref={(node) => {
        strokeRefs.current[index] = node;
      }}
      d={CONTOURS[index].d}
      pathLength={1}
      strokeWidth={CONTOURS[index].width}
      style={{ strokeDasharray: 1, strokeDashoffset: 1, strokeOpacity: 0 }}
    />
  );

  const controlClass =
    "grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-40";

  return (
    <div
      ref={rootRef}
      data-logo-intro
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden"
    >
      <div ref={backdropRef} aria-hidden className="absolute inset-0 bg-background" />

      <svg
        viewBox={LOGO_VIEWBOX}
        role="img"
        aria-label="made by Sandro"
        className="relative h-auto w-[clamp(280px,58vw,620px)] max-w-[84vw] max-[500px]:w-[84vw]"
      >
        <g ref={logoRef}>
          <g
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-foreground dark:[filter:drop-shadow(0_0_0.5px_var(--foreground))]"
          >
            {PORTRAIT.map((_, i) => stroke(i))}
          </g>
          <g
            ref={outlineRef}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-foreground"
          >
            {WORDMARK.map((_, i) => stroke(WORDMARK_AT + i))}
          </g>
          <g ref={filledRef} style={{ opacity: 0 }}>
            {WORDMARK.map((glyph, i) => (
              <path key={i} d={glyph.d} className="fill-foreground" />
            ))}
          </g>
        </g>
      </svg>

      <div className="absolute bottom-6 right-6 flex items-center gap-2">
        <button
          type="button"
          onClick={togglePause}
          disabled={reduced}
          aria-label={paused ? t("Play animation", "Reproducir animación") : t("Pause animation", "Pausar animación")}
          className={controlClass}
        >
          {paused ? <Play size={15} aria-hidden /> : <Pause size={15} aria-hidden />}
        </button>
        <button
          type="button"
          onClick={replay}
          disabled={reduced}
          aria-label={t("Replay animation", "Repetir animación")}
          className={controlClass}
        >
          <RotateCcw size={15} aria-hidden />
        </button>
        <button
          type="button"
          onClick={finish}
          className="h-9 rounded-full border border-border px-4 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          {t("Skip", "Saltar")}
        </button>
      </div>
    </div>
  );
};
