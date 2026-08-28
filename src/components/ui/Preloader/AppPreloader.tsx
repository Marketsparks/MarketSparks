"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

import FloatingProducts from "./FloatingProducts";
import ParticleBurst from "./ParticleBurst";
import ShoppingBag from "./ShoppingBag";
import Spark from "./Spark";

import {
  PRELOADER_OVERLAY_FADE_DURATION,
  PRELOADER_Z_INDEX,
} from "./preloader.constants";
import { AppPreloaderProps } from "./preloader.types";

type Stage =
  | "bag"
  | "spark"
  | "products"
  | "glow"
  | "logo"
  | "particles"
  | "done";

export default function AppPreloader({
  children,
}: AppPreloaderProps) {
  const [stage, setStage] =
    useState<Stage>("bag");

  useEffect(() => {
    const sequence = [
      setTimeout(
        () => setStage("spark"),
        100,
      ),

      setTimeout(
        () => setStage("products"),
        220,
      ),

      setTimeout(
        () => setStage("glow"),
        500,
      ),

      setTimeout(
        () => setStage("logo"),
        650,
      ),

      setTimeout(
        () => setStage("particles"),
        800,
      ),

      setTimeout(
        () => setStage("done"),
        1000,
      ),
    ];

    return () =>
      sequence.forEach(
        clearTimeout,
      );
  }, []);

useEffect(() => {
  if (stage !== "done") {
    return;
  }

  const timer = setTimeout(() => {
    window.dispatchEvent(
      new CustomEvent(
        "marketsparks:preloader-complete",
      ),
    );
  }, 0);

  return () =>
    clearTimeout(timer);
}, [stage]);

  return (
    <>
      <AnimatePresence>
        {stage !== "done" && (
          <motion.div
            initial={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration:
                PRELOADER_OVERLAY_FADE_DURATION,
            }}
            className="
              fixed
              inset-0
              flex
              items-center
              justify-center
              overflow-hidden
            "
            style={{
              background:
                "var(--preloader-bg)",
              color:
                "var(--foreground)",
              zIndex:
                PRELOADER_Z_INDEX,
            }}
          >
            <div
              className="
                relative
                flex
                items-center
                justify-center
              "
            >
              <ShoppingBag
                glowing={
                  stage === "glow" ||
                  stage === "logo" ||
                  stage ===
                    "particles"
                }
                tilted={
                  stage ===
                  "glow"
                }
              />

              <Spark
                active={
                  stage !== "bag"
                }
              />

              <FloatingProducts
                active={
                  stage ===
                    "products" ||
                  stage ===
                    "glow"
                }
              />

              <AnimatePresence>
                {(stage ===
                  "logo" ||
                  stage ===
                    "particles") && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      -translate-x-1/2
                      translate-y-[16px]
                      whitespace-nowrap
                      text-[15px]
                      font-bold
                      tracking-[0.04em]
                    "
                  >
                    <span className="text-white">
                      Market
                    </span>

                    <span className="text-[#7C78FF]">
                      Sparks
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <ParticleBurst
                active={
                  stage ===
                  "particles"
                }
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {stage === "done" &&
        children}
    </>
  );
}