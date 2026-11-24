"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useLang } from "@/lib/i18n";

// The curve, in a 1600 x 900 space. Only the part that carries the band is shown (see VIEW_BOX).
const PATH = "M-900 440 C-300 20 100 720 700 400 S1400 10 2100 380 S2900 650 3500 220";
const VIEW_BOX = "0 25 1600 575";
const BAND_WIDTH = 155;
const FONT_SIZE = 86;
const LETTER_SPACING = 2;
const BASELINE = 33;
const BADGE_RADIUS = 50;
// The gap each badge sits in, in path units. It is a number rather than blank characters, so it cannot be changed
// by how a browser collapses or measures white space.
const SLOT_UNITS = 170;

// Motion: path units per second at speed 1, the resting speed, and how scrolling bends it.
const UNITS_PER_SECOND = 120;
const BASE_SPEED = 0.9;
const MAX_DT = 0.1;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const positiveMod = (v: number, m: number) => ((v % m) + m) % m;

const textStyle = {
  fontFamily: "var(--font-sans)",
  fontWeight: 700,
  fontSize: FONT_SIZE,
  letterSpacing: LETTER_SPACING,
} as const;

type Props = {
  /** The phrase that repeats along the curve, in capitals. */
  message: string;
  /** Accessible description of the ribbon, which is decorative text otherwise. */
  label: string;
};

// A ribbon of text on an SVG textPath that glides along a curve at constant speed in path units. Every repetition
// is its own short textPath, placed by its own startOffset, with a badge in the gap before the next one. The badge
// sits at measured path coordinates and turns to the path's tangent. Scrolling the page speeds the ribbon up, or
// reverses it when scrolling up.
export const CurvedTicker = ({ message, label }: Props) => {
  const { t } = useLang();
  const pathId = `ticker-${useId().replace(/:/g, "")}`;

  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const textRefs = useRef<(SVGTextElement | null)[]>([]);
  const textPathRefs = useRef<(SVGTextPathElement | null)[]>([]);
  const badgeRefs = useRef<(SVGGElement | null)[]>([]);

  const [repeats, setRepeats] = useState(3);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const gates = useRef({ paused: false, inView: false, visible: true, reduced: false, ready: false });
  const syncRef = useRef<() => void>(() => {});
  const layout = useRef({ period: 1, slotAt: 0, total: 1, repeats: 3 });

  useEffect(() => {
    layout.current.repeats = repeats;
  }, [repeats]);

  useEffect(() => {
    const root = rootRef.current;
    const path = pathRef.current;
    if (!root || !path) return;

    const state = gates.current;
    let disposed = false;
    let raf = 0;
    let last = 0;
    let lastScrollY = 0;
    let offset = 0;
    let speed = BASE_SPEED;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const place = () => {
      const { period, slotAt, total, repeats: count } = layout.current;
      const start = -period - positiveMod(offset, period);
      for (let i = 0; i < count; i++) {
        textPathRefs.current[i]?.setAttribute("startOffset", String(start + i * period));
        const text = textRefs.current[i];
        if (state.ready && text && text.style.opacity !== "1") text.style.opacity = "1";
        const badge = badgeRefs.current[i];
        if (!badge) continue;
        const at = start + i * period + slotAt;
        if (at < 0 || at > total) {
          badge.style.visibility = "hidden";
          continue;
        }
        const point = path.getPointAtLength(at);
        const before = path.getPointAtLength(Math.max(0, at - 8));
        const after = path.getPointAtLength(Math.min(total, at + 8));
        const angle = (Math.atan2(after.y - before.y, after.x - before.x) * 180) / Math.PI;
        badge.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${angle})`);
        badge.style.visibility = "visible";
      }
    };

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min((now - last) / 1000, MAX_DT);
      last = now;

      // Real page scroll, as pixels per 60fps frame, bends the speed: down speeds it up, up can reverse it.
      const y = window.scrollY;
      const scrollDelta = (y - lastScrollY) / Math.max(dt * 60, 0.01) / 20;
      lastScrollY = y;
      const desired = clamp(BASE_SPEED + 0.5 * scrollDelta, -4, 5);
      const factor = Math.abs(desired - BASE_SPEED) > Math.abs(speed - BASE_SPEED) ? 0.12 : 0.03;
      speed += (desired - speed) * (1 - Math.pow(1 - factor, dt * 60));

      offset += UNITS_PER_SECOND * speed * dt;
      place();
      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      const running = state.ready && !state.paused && state.inView && state.visible && !state.reduced;
      if (!running) return;
      // The clock and the scroll reference restart here, so resuming never causes a jump.
      last = performance.now();
      lastScrollY = window.scrollY;
      raf = requestAnimationFrame(frame);
    };
    syncRef.current = sync;

    const onVisibility = () => {
      state.visible = !document.hidden;
      sync();
    };
    const onReduced = () => {
      state.reduced = reducedQuery.matches;
      setReduced(state.reduced);
      if (state.reduced) {
        // A composed, still ribbon.
        offset = 0;
        speed = BASE_SPEED;
        place();
      }
      sync();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        state.inView = entry.isIntersecting;
        sync();
      },
      { rootMargin: "100px" }
    );
    observer.observe(root);
    document.addEventListener("visibilitychange", onVisibility);
    reducedQuery.addEventListener("change", onReduced);

    // The phrase is measured as the browser actually draws it on the path, so the gap and the badge always agree
    // with the letters. It runs again whenever a font finishes loading, since a late font changes the width.
    // Engines disagree on whether the computed length includes letter spacing, so the end of the last glyph is
    // located on the path itself and the computed length is only the fallback.
    const phraseWidth = (textPath: SVGTextPathElement) => {
      const computed = textPath.getComputedTextLength();
      const chars = textPath.getNumberOfChars();
      // Once the ribbon is moving, its first phrase has left the start of the path and cannot be located reliably.
      const start = parseFloat(textPath.getAttribute("startOffset") ?? "0");
      if (!computed || !chars || start !== 0) return computed;
      const end = textPath.getEndPositionOfChar(chars - 1);
      let best = computed;
      let bestDistance = Infinity;
      for (let at = computed * 0.8; at <= computed * 1.2; at += 1) {
        const point = path.getPointAtLength(at);
        const distance = Math.hypot(point.x - end.x, point.y - end.y);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = at;
        }
      }
      // Trust the geometry only when the end position really sits on, or a line's width from, the path.
      return bestDistance < BASELINE * 2 ? best : computed;
    };
    const measure = () => {
      if (disposed) return false;
      const first = textPathRefs.current[0];
      const width = first ? phraseWidth(first) : 0;
      const total = path.getTotalLength();
      if (!width || !total) return false;
      const period = width + SLOT_UNITS;
      layout.current = { period, slotAt: width + SLOT_UNITS / 2, total, repeats: Math.ceil(total / period) + 2 };
      setRepeats(layout.current.repeats);
      return true;
    };
    const reveal = () => {
      // Wait for the repeated phrases and badges to be in the DOM before placing them.
      requestAnimationFrame(() => {
        if (disposed) return;
        state.ready = true;
        state.visible = !document.hidden;
        state.reduced = reducedQuery.matches;
        setReduced(state.reduced);
        place();
        sync();
      });
    };
    const onFontsLoaded = () => {
      if (measure() && state.ready) requestAnimationFrame(place);
    };
    void document.fonts.ready.then(() => {
      if (disposed) return;
      if (measure()) reveal();
    });
    document.fonts.addEventListener("loadingdone", onFontsLoaded);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reducedQuery.removeEventListener("change", onReduced);
      document.fonts.removeEventListener("loadingdone", onFontsLoaded);
    };
  }, [message]);

  const toggle = () => {
    gates.current.paused = !gates.current.paused;
    setPaused(gates.current.paused);
    syncRef.current();
  };

  return (
    <div ref={rootRef}>
      <svg viewBox={VIEW_BOX} role="img" aria-label={label} className="block h-auto w-full">
        <path
          id={pathId}
          ref={pathRef}
          d={PATH}
          fill="none"
          strokeWidth={BAND_WIDTH}
          className="stroke-foreground"
        />
        {Array.from({ length: repeats }, (_, i) => (
          <text
            key={i}
            ref={(node) => {
              textRefs.current[i] = node;
            }}
            aria-hidden
            dy={BASELINE}
            className="fill-background"
            style={{ ...textStyle, opacity: 0 }}
          >
            <textPath
              ref={(node) => {
                textPathRefs.current[i] = node;
              }}
              href={`#${pathId}`}
              startOffset={0}
            >
              {message}
            </textPath>
          </text>
        ))}
        {Array.from({ length: repeats }, (_, i) => (
          <g
            key={i}
            ref={(node) => {
              badgeRefs.current[i] = node;
            }}
            aria-hidden
            style={{ visibility: "hidden" }}
          >
            <circle r={BADGE_RADIUS} className="fill-accent" />
            <path
              d="M-24 0H24M-12 -20.8L12 20.8M-12 20.8L12 -20.8"
              fill="none"
              strokeWidth={9}
              strokeLinecap="round"
              className="stroke-background"
            />
          </g>
        ))}
      </svg>

      {!reduced && (
        <div className="mx-auto mt-3 flex max-w-[75rem] justify-end px-6">
          <button
            type="button"
            onClick={toggle}
            aria-pressed={paused}
            aria-label={paused ? t("Play the ticker", "Reanudar la cinta") : t("Pause the ticker", "Pausar la cinta")}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            {paused ? <Play size={15} aria-hidden /> : <Pause size={15} aria-hidden />}
          </button>
        </div>
      )}
    </div>
  );
};
