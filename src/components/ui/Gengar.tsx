"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// The sprite is 58x56 native pixels. Widths are whole multiples of that (3x, 4x, 5x) so every
// art pixel lands on the same number of screen pixels and stays crisp.
export const Gengar = () => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { scale: 1.08, rotate: -3, transition: { type: "spring", stiffness: 420, damping: 14 } }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-[174px] cursor-default sm:w-[232px] lg:w-[290px]"
    >
      <Image
        src="/gengar.png"
        alt="Pixel art of Gengar grinning"
        width={58}
        height={56}
        unoptimized
        className="h-auto w-full [image-rendering:pixelated]"
      />
    </motion.div>
  );
};
