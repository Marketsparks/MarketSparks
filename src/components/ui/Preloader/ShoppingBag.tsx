"use client";

import { motion } from "framer-motion";

import {
  PRELOADER_BAG_GLOW_BLUR,
  PRELOADER_BAG_HEIGHT,
  PRELOADER_BAG_TILT,
  PRELOADER_BAG_WIDTH,
  PRELOADER_SPARK_COLOR,
} from "./preloader.constants";
import { ShoppingBagProps } from "./preloader.types";

export default function ShoppingBag({
  glowing,
  tilted,
}: ShoppingBagProps) {
  return (
    <motion.div
      animate={{
        rotate: tilted
          ? PRELOADER_BAG_TILT
          : 0,

        scale: glowing
          ? 1.035
          : 1,
      }}
      transition={{
        duration: 0.28,
        ease: "easeOut",
      }}
      className="relative"
    >
      {/* Glow */}

      <motion.div
        animate={{
          opacity: glowing ? 1 : 0,
          scale: glowing ? 1.15 : 1,
        }}
        transition={{
          duration: 0.3,
        }}
        className="
          absolute
          inset-0
          rounded-[40px]
        "
        style={{
          filter: `blur(${PRELOADER_BAG_GLOW_BLUR}px)`,
          background:
            "rgba(91,94,247,.32)",
        }}
      />

      <svg
        width={PRELOADER_BAG_WIDTH}
        height={PRELOADER_BAG_HEIGHT}
        viewBox="0 0 240 240"
        fill="none"
        className="relative"
      >
        <defs>
          <linearGradient
            id="bagFill"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#18245E"
            />

            <stop
              offset="100%"
              stopColor="#0D143A"
            />
          </linearGradient>

          <linearGradient
            id="bagStroke"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#6F73FF"
            />

            <stop
              offset="100%"
              stopColor="#8C7CFF"
            />
          </linearGradient>

          <linearGradient
            id="logoGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop
              offset="0%"
              stopColor="#FFFFFF"
            />

            <stop
              offset="100%"
              stopColor="#7E7CFF"
            />
          </linearGradient>
        </defs>

        {/* Handle */}

        <path
          d="
            M78 78

            C78 40 96 24 120 24

            C144 24 162 40 162 78
          "
          stroke="url(#bagStroke)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Handle Connectors */}

        <circle
          cx="78"
          cy="78"
          r="5"
          fill="#7A7FFF"
        />

        <circle
          cx="162"
          cy="78"
          r="5"
          fill="#7A7FFF"
        />

        {/* Bag */}

        <path
          d="
            M56 78

            H184

            L172 205

            H68

            Z
          "
          fill="url(#bagFill)"
          stroke="url(#bagStroke)"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Top Highlight */}

        <path
          d="
            M70 90

            H170
          "
          stroke="rgba(255,255,255,.18)"
          strokeWidth="2"
        />

        {/* Brand */}

        <text
          x="120"
          y="150"
          textAnchor="middle"
          fontSize="18"
          fontWeight="700"
          fill="url(#logoGradient)"
          opacity=".92"
          style={{
            letterSpacing: ".02em",
            fontFamily:
              "var(--font-poppins)",
          }}
        >
          MarketSparks
        </text>
      </svg>
    </motion.div>
  );
}