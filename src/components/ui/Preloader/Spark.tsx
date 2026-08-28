"use client";

import { motion } from "framer-motion";

import {
  PRELOADER_SPARK_COLOR,
  PRELOADER_SPARK_GLOW,
  PRELOADER_SPARK_SIZE,
} from "./preloader.constants";
import { SparkProps } from "./preloader.types";

export default function Spark({
  active,
}: SparkProps) {
  if (!active) {
    return null;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: [0, 0.8, 1.25, 1],
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="
        absolute
        left-1/2
        top-[34%]
        -translate-x-1/2
        -translate-y-1/2
        pointer-events-none
      "
    >
      {/* Aura */}

      <motion.div
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          inset-0
          rounded-full
        "
        style={{
          width: PRELOADER_SPARK_SIZE,
          height: PRELOADER_SPARK_SIZE,
          background: PRELOADER_SPARK_COLOR,
          filter: `blur(${PRELOADER_SPARK_GLOW}px)`,
        }}
      />

      {/* Core Spark */}

      <motion.svg
        width={PRELOADER_SPARK_SIZE * 2}
        height={PRELOADER_SPARK_SIZE * 2}
        viewBox="0 0 32 32"
        animate={{
          rotate: 360,
          scale: [1, 1.12, 1],
        }}
        transition={{
          rotate: {
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <path
          d="
            M16 2
            L18.6 13.4
            L30 16
            L18.6 18.6
            L16 30
            L13.4 18.6
            L2 16
            L13.4 13.4
            Z
          "
          fill="#FFFFFF"
        />
      </motion.svg>

      {/* Orbiting Sparks */}

      {[0, 120, 240].map((angle) => (
        <motion.div
          key={angle}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            inset-0
          "
          style={{
            transformOrigin: "50% 50%",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "-12px",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#FFFFFF",
              boxShadow: `0 0 12px ${PRELOADER_SPARK_COLOR}`,
              transform: `translateX(-50%) rotate(${angle}deg)`,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}