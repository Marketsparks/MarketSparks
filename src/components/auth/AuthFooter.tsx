"use client";

import { ReactNode } from "react";

type AuthFooterProps = {
  children: ReactNode;
};

export default function AuthFooter({
  children,
}: AuthFooterProps) {
  return (
    <footer
      className="
        mt-8

        border-t

        border-[var(--border)]

        pt-5

        text-center
      "
    >
      <div
        className="
          text-[13px]

          leading-6

          text-[var(--foreground-muted)]
        "
      >
        {children}
      </div>
    </footer>
  );
}