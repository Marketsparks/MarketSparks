"use client";

import NavigationLink from "@/components/ui/Preloader/NavigationLink";

import {
  ChevronRight,
  House,
} from "lucide-react";

type BreadcrumbItem = {
  label: string;

  href?: string;
};

type PageBreadcrumbProps = {
  homeHref?: string;

  items: BreadcrumbItem[];
};

export default function PageBreadcrumb({
  homeHref = "/",

  items,
}: PageBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="
        flex

        flex-wrap

        items-center

        justify-center

        gap-2

        text-[13px]

        font-medium

        text-[var(--foreground-muted)]

        sm:text-[14px]
      "
    >
<NavigationLink
  href={homeHref}
  className="
    flex
    items-center
    gap-1.5
    transition-colors
    duration-300
    hover:text-[var(--primary)]
  "
>
  <House
    size={15}
    strokeWidth={2}
  />

  Home
</NavigationLink>

      {items.map(
        (
          item,
          index
        ) => (
          <div
            key={`${item.label}-${index}`}
            className="
              flex

              items-center

              gap-2
            "
          >
            <ChevronRight
              size={16}
              strokeWidth={2}
              className="
                shrink-0

                text-[var(--foreground-muted)]
              "
            />

            {item.href ? (
<NavigationLink
  href={item.href}
  className="
    transition-colors
    duration-300
    hover:text-[var(--primary)]
  "
>
  {item.label}
</NavigationLink>
            ) : (
              <span
                className="
                  max-w-[220px]

                  truncate

                  font-semibold

                  text-[var(--foreground)]

                  sm:max-w-none
                "
              >
                {item.label}
              </span>
            )}
          </div>
        )
      )}
    </nav>
  );
}