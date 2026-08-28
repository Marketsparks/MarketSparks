"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
  useRef,
} from "react";

import { X } from "lucide-react";

import SearchBar from "./SearchBar";

type SearchOverlayProps = {
  open: boolean;

  onClose: () => void;
};

export default function SearchOverlay({
  open,
  onClose,
}: SearchOverlayProps) {
  const panelRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
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
            z-[120]
            flex
            items-start
            justify-center
            bg-[var(--search-backdrop)]
            px-4
            pt-16
            backdrop-blur-[var(--search-blur)]
          "
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            initial={{
              opacity: 0,
              y: -16,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -12,
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
            }}
            onClick={(
              event
            ) =>
              event.stopPropagation()
            }
            className="
              w-full
              max-w-2xl
              overflow-hidden
              rounded-[var(--search-radius)]
              border
              border-[var(--search-border)]
              bg-[var(--search-bg)]
              shadow-[var(--search-shadow)]
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-[var(--search-divider)]
                px-5
                py-4
              "
            >
              <h2
                className="
                  text-base
                  font-semibold
                  text-[var(--text-primary)]
                "
              >
                Search
              </h2>

              <button
                type="button"
                onClick={onClose}
                className="
                  rounded-full
                  p-2
                  transition-colors
                  hover:bg-[var(--search-surface-hover)]
                "
              >
                <X
                  size={18}
                  className="
                    text-[var(--search-icon)]
                  "
                />
              </button>
            </div>

            <div
              className="
                p-5
              "
            >
              <SearchBar />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}