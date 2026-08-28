"use client";

import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;

  description?: string;

  action?: ReactNode;

  className?: string;
};

export default function PageHeader({
  title,

  description,

  action,

  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        `
          mb-8

          flex

          flex-col

          gap-4

          sm:flex-row

          sm:items-end

          sm:justify-between
        `,
        className
      )}
    >
      <div>
<h1
  className="
    text-[22px]

    font-bold

    leading-tight

    tracking-[-0.03em]

    text-[var(--foreground)]

    sm:text-[24px]

    lg:text-[28px]
  "
>
  {title}
</h1>

        {description && (
          <p
            className="
              mt-2

              max-w-2xl

              text-[15px]

              leading-7

              text-[var(--foreground-muted)]
            "
          >
            {description}
          </p>
        )}
      </div>

      {action && (
        <div
          className="
            shrink-0
          "
        >
          {action}
        </div>
      )}
    </header>
  );
}