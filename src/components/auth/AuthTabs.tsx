"use client";

import { motion } from "framer-motion";

type AuthMode =
  | "login"
  | "register";

type AuthTabsProps = {
  value: AuthMode;

  onChange: (
    value: AuthMode,
  ) => void;
};

const tabs = [
  {
    label: "Sign In",
    value: "login",
  },
  {
    label: "Create Account",
    value: "register",
  },
] as const;

export default function AuthTabs({
  value,
  onChange,
}: AuthTabsProps) {
  return (
    <div
      className="
        relative

        flex

        rounded-xl

        border

        border-[var(--border)]

        bg-[var(--surface)]

        p-0.5

        sm:rounded-2xl

        sm:p-1
      "
    >
      {tabs.map((tab) => {
        const active =
          value === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() =>
              onChange(tab.value)
            }
            className="
              relative

              z-10

              flex-1

              rounded-lg

              px-3

              py-2

              text-[13px]

              font-semibold

              transition-colors
              duration-300

              sm:rounded-xl

              sm:px-4

              sm:py-2.5

              sm:text-[14px]
            "
          >
            {active && (
              <motion.div
                layoutId="auth-tab"
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 34,
                }}
                className="
                  absolute

                  inset-0

                  rounded-lg

                  border

                  border-[var(--services-cta-primary-bg)]

                  bg-[var(--services-cta-primary-bg)]

                  shadow-md

                  sm:rounded-xl
                "
              />
            )}

            <span
              className={
                active
                  ? "relative text-[var(--services-cta-primary-text)]"
                  : `
                      relative
                      text-[var(--foreground-muted)]
                      hover:text-[var(--foreground)]
                    `
              }
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}