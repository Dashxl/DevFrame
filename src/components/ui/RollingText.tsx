import { cn } from "@/lib/utils";

type Props = {
  children: string;
  /** Line height of the mask. It must leave room for ascenders and descenders, since the mask clips. */
  className?: string;
};

// A one-line mask that rolls its text up and replaces it with an identical copy coming from below. The trigger is
// the nearest ancestor marked `group/roll` (a link, or a whole card), so hovering anywhere on it, or moving keyboard
// focus into it, plays the roll and leaving reverses it. Both copies share the same box, so nothing around the
// text ever moves. The copy is hidden from assistive technology so the text is announced once.
export const RollingText = ({ children, className }: Props) => (
  <span className={cn("relative block overflow-hidden leading-[1.2]", className)}>
    <span
      className={cn(
        "block transition-transform duration-500 ease-[cubic-bezier(0,0,0.2,1)] motion-reduce:transition-none",
        "group-hover/roll:-translate-y-[105%] group-focus-visible/roll:-translate-y-[105%] group-has-[:focus-visible]/roll:-translate-y-[105%]"
      )}
    >
      {children}
    </span>
    <span
      aria-hidden
      className={cn(
        "absolute inset-0 block translate-y-[105%] transition-transform duration-500 ease-[cubic-bezier(0,0,0.2,1)] motion-reduce:transition-none",
        "group-hover/roll:translate-y-0 group-focus-visible/roll:translate-y-0 group-has-[:focus-visible]/roll:translate-y-0"
      )}
    >
      {children}
    </span>
  </span>
);
