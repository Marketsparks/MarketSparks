"use client";

import { motion } from "framer-motion";

type AuthMode =
  | "login"
  | "register";

type AuthTabsProps = {
  value: AuthMode;

  onChange: (
    value: AuthMode
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

        rounded-2xl

        border

        border-[var(--border)]

        bg-[var(--surface)]

        p-1
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

              rounded-xl

              px-4

              py-2.5

              text-[14px]

              font-semibold

              transition-colors
              duration-300
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

                  rounded-xl

                  border

                  border-[var(--services-cta-primary-bg)]

                  bg-[var(--services-cta-primary-bg)]

                  shadow-md
                "
              />
            )}

            <span
              className={`
                relative

                ${
                  active
                    ? "text-[var(--services-cta-primary-text)]"
                    : `
                      text-[var(--foreground-muted)]

                      hover:text-[var(--foreground)]
                    `
                }
              `}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}