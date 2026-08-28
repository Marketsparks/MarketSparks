import Link from "next/link";

import { cn } from "@/lib/utils";

const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/Shop",
  },
  {
    label: "Services",
    href: "/Services",
  },
  {
    label: "Plans",
    href: "/Plans",
  },
  {
    label: "Blog",
    href: "/Blog",
  },
  {
    label: "Contact",
    href: "/Contact",
  },
];

type NavLinksProps = {
  className?: string;
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
};

export default function NavLinks({
  className,
  orientation = "horizontal",
  onNavigate,
}: NavLinksProps) {
  const isVertical = orientation === "vertical";

  return (
    <ul
      className={cn(
        "flex",
        isVertical
          ? "flex-col"
          : "items-center gap-7",
        className
      )}
    >
      {navigation.map((item) => (
        <li
          key={item.href}
          className={cn(
            isVertical &&
              "border-b border-[var(--border)] last:border-b-0"
          )}
        >
          <Link
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "font-medium transition-all duration-200 hover:text-[var(--primary)]",
              isVertical
                ? "flex min-h-12 items-center py-1 text-[15px]"
                : "text-[14px] font-bold uppercase tracking-[0.04em] text-[var(--foreground)]"
            )}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}