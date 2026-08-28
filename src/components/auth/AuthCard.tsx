"use client";

import { ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;

  className?: string;
};

export default function AuthCard({
  children,
  className = "",
}: AuthCardProps) {
  return (
    <section
      className={`
        relative

        w-full

        max-w-[460px]

        overflow-hidden

        rounded-[28px]

        border

        border-[var(--border)]

        bg-[var(--auth-card-bg)]

        p-6

        shadow-[0_18px_60px_rgba(0,0,0,0.08)]

        backdrop-blur-2xl

        transition-all
        duration-300

        sm:p-8

        ${className}
      `}
    >
      {/* Decorative Glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute

          inset-x-0

          top-0

          h-px

          bg-gradient-to-r

          from-transparent

          via-[var(--primary)]

          to-transparent

          opacity-30
        "
      />

      {children}
    </section>
  );
}