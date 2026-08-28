"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
  PRELOADER_PARTICLE_COUNT,
  PRELOADER_PARTICLE_DURATION,
  PRELOADER_PARTICLE_SIZE,
  PRELOADER_SPARK_COLOR,
} from "./preloader.constants";
import { ParticleBurstProps } from "./preloader.types";

export default function ParticleBurst({
  active,
  onComplete,
}: ParticleBurstProps) {
  return (
    <AnimatePresence
      onExitComplete={onComplete}
    >
      {active && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="
            absolute
            inset-0
            pointer-events-none
          "
        >
          {Array.from({
            length:
              PRELOADER_PARTICLE_COUNT,
          }).map((_, index) => {
            const angle =
              (Math.PI * 2 * index) /
              PRELOADER_PARTICLE_COUNT;

            const radius =
              70 +
              Math.random() * 40;

            const size =
              PRELOADER_PARTICLE_SIZE +
              Math.random() * 5;

            return (
              <motion.div
                key={index}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  x:
                    Math.cos(angle) *
                    radius,

                  y:
                    Math.sin(angle) *
                    radius,

                  opacity: 0,

                  scale: [
                    1,
                    1.6,
                    0,
                  ],

                  rotate: 360,
                }}
                transition={{
                  duration:
                    PRELOADER_PARTICLE_DURATION +
                    Math.random() * 0.3,

                  ease: "easeOut",
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                "
                style={{
                  width: size,
                  height: size,
                  background:
                    index % 4 === 0
                      ? "#FFFFFF"
                      : PRELOADER_SPARK_COLOR,

                  boxShadow: `
                    0 0 18px ${PRELOADER_SPARK_COLOR},
                    0 0 34px ${PRELOADER_SPARK_COLOR}
                  `,
                }}
              />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}