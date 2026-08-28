"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

import UserContainer from "./DashboardContainer";

type UserFooterProps = {
  className?: string;
};

export default function UserFooter({
  className,
}: UserFooterProps) {
  const year =
    new Date().getFullYear();

  return (
    <footer
      className={cn(
        `
          border-t

          border-[var(--border)]

          bg-[var(--background)]

          transition-colors
          duration-300
        `,
        className
      )}
    >
      <UserContainer>
<div
  className="
    flex

    flex-col

    items-center

    justify-between

    gap-1

    py-2

    text-center

    text-[12px]

    text-[var(--foreground-muted)]

    sm:flex-row

    sm:text-left

    sm:text-[13px]

    lg:gap-3

    lg:py-5
  "
>
          <p>
            © {year} MarketSparks
          </p>

          <nav
            className="
              flex

              flex-wrap

              items-center

              justify-center

              gap-2

              sm:justify-end
            "
          >
            <Link
              href="/terms"
              className="
                transition-colors
                duration-300

                hover:text-[var(--foreground)]
              "
            >
              Terms
            </Link>

            <span>•</span>

            <Link
              href="/privacy"
              className="
                transition-colors
                duration-300

                hover:text-[var(--foreground)]
              "
            >
              Privacy
            </Link>

            <span>•</span>

            <Link
              href="/support"
              className="
                transition-colors
                duration-300

                hover:text-[var(--foreground)]
              "
            >
              Support
            </Link>

            <span>•</span>

            <span>
              Version 1.0.0
            </span>
          </nav>
        </div>
      </UserContainer>
    </footer>
  );
}