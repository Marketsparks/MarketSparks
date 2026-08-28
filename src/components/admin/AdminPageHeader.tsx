"use client";

import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export default function AdminPageHeader({
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-start
        sm:justify-between
      "
    >
      <div
        className="
          min-w-0
          flex-1
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
          "
        >
          {title}
        </h1>

        {description ? (
          <p
            className="
              mt-2
              max-w-3xl
              text-sm
              text-[var(--foreground-muted)]
            "
          >
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <div
          className="
            shrink-0
            self-start
          "
        >
          {action}
        </div>
      ) : null}
    </div>
  );
}