"use client";

import { ReactNode } from "react";

import AuthCard from "./AuthCard";

type AuthFormProps = {
  title: string;

  description?: string;

  children: ReactNode;

  footer?: ReactNode;

  className?: string;
};

export default function AuthForm({
  title,

  description,

  children,

  footer,

  className = "",
}: AuthFormProps) {
  return (
    <AuthCard className={className}>
      <header
        className="
          text-center
        "
      >
        <h1
          className="
            text-[26px]

            font-extrabold

            leading-tight

            tracking-[-0.02em]

            text-[var(--foreground)]
          "
        >
          {title}
        </h1>

        {description && (
          <p
            className="
              mx-auto

              mt-2

              max-w-[320px]

              text-[14px]

              leading-6

              text-[var(--foreground-muted)]
            "
          >
            {description}
          </p>
        )}
      </header>

      <div
        className="
          mt-8

          space-y-5
        "
      >
        {children}
      </div>

      {footer && (
        <footer
          className="
            mt-8

            border-t

            border-[var(--border)]

            pt-5
          "
        >
          {footer}
        </footer>
      )}
    </AuthCard>
  );
}