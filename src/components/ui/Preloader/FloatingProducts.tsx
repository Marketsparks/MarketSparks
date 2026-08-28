"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Gift,
  Headphones,
  Tag,
} from "lucide-react";

import {
  PRELOADER_PRODUCT_SIZE,
  PRELOADER_SPARK_COLOR,
} from "./preloader.constants";
import { FloatingProductsProps } from "./preloader.types";

const PRODUCTS = [
  {
    Icon: Headphones,
    x: -70,
    rotate: -18,
    delay: 0,
  },
  {
    Icon: Gift,
    x: 0,
    rotate: 0,
    delay: 0.18,
  },
  {
    Icon: Tag,
    x: 70,
    rotate: 18,
    delay: 0.36,
  },
];

export default function FloatingProducts({
  active,
  onComplete,
}: FloatingProductsProps) {
  useEffect(() => {
    if (!active) {
      return;
    }

    const timer = setTimeout(() => {
      onComplete?.();
    }, 1350);

    return () => clearTimeout(timer);
  }, [active, onComplete]);

  if (!active) {
    return null;
  }

  return (
    <>
      {PRODUCTS.map(
        (
          {
            Icon,
            x,
            rotate,
            delay,
          },
          index
        ) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              scale: 0.2,
              x: 0,
              y: -18,
              rotate: 0,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.2, 1, 1, 0.65],
              x: [0, x, x * 0.35],
              y: [-18, -115, 34],
              rotate: [
                0,
                rotate,
                rotate / 3,
              ],
            }}
            transition={{
              duration: 1.2,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              pointer-events-none
            "
          >
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon
                size={PRELOADER_PRODUCT_SIZE}
                strokeWidth={2.2}
                color={PRELOADER_SPARK_COLOR}
              />
            </motion.div>
          </motion.div>
        )
      )}
    </>
  );
}