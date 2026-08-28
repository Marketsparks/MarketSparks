"use client";

import { motion } from "framer-motion";

export default function HeroDecoration() {
  return (
    <motion.div
      className="
        absolute
        bottom-30
        left-1/2
        hidden
        h-6
        w-6
        -translate-x-1/2
        rotate-45
        rounded-[2px]
        bg-[var(--hero-badge-bg)]
        lg:block
      "
      animate={{
        y: [0, -8, 0],
        rotate: [45, 55, 45],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}