"use client";

import { motion } from "framer-motion";

export default function NavigationLoader() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.18,
      }}
      className="
        fixed
        inset-0
        z-[9998]
        flex
        items-center
        justify-center
        bg-black/8
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          gap-6
          select-none
        "
      >
        <div className="relative h-28 w-28">
          <motion.div
            className="
              absolute
              inset-0
              rounded-full
            "
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(99,102,241,.9) 70deg, transparent 150deg)",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity,
            }}
          />

          <motion.div
            className="
              absolute
              inset-[7px]
              rounded-full
              border
              border-white/10
              bg-white/10
              backdrop-blur-3xl
            "
            animate={{
              scale: [1, 1.03, 1],
              boxShadow: [
                "0 12px 35px rgba(99,102,241,.12)",
                "0 18px 65px rgba(99,102,241,.30)",
                "0 12px 35px rgba(99,102,241,.12)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
              "
            >
              <motion.span
                className="
                  text-[42px]
                  font-black
                  tracking-[-0.08em]
                  text-[#6366F1]
                "
                animate={{
                  scale: [1, 1.05, 1],
                  textShadow: [
                    "0 0 0px rgba(99,102,241,0)",
                    "0 0 22px rgba(99,102,241,.55)",
                    "0 0 0px rgba(99,102,241,0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                M
              </motion.span>
            </div>
          </motion.div>
        </div>

        <motion.span
          className="
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.45em]
            text-[var(--foreground)]
          "
          animate={{
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          MARKETSPARKS
        </motion.span>
      </div>
    </motion.div>
  );
}