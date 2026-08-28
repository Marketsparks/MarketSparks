"use client";

import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { ReactNode } from "react";

type AdminStatCardProps = {
  title: string;

  value: number | string;

  subtitle?: string;

  icon: ReactNode;

  href?: string;
};

export default function AdminStatCard({
  title,
  value,
  subtitle,
  icon,
  href,
}: AdminStatCardProps) {
  const content = (
    <div
      className="
        flex
        h-full
        flex-col
        rounded-[var(--admin-card-radius)]
        border
        border-[var(--admin-card-border)]
        bg-[var(--admin-card-bg)]
        p-[var(--admin-card-padding)]
        shadow-[var(--admin-card-shadow)]
        transition-all
        duration-[var(--admin-card-transition)]
        hover:-translate-y-0.5
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-[var(--admin-surface-radius)]
            border
            border-[var(--admin-surface-border)]
            bg-[var(--admin-surface-bg)]
            text-[var(--admin-primary)]
            shrink-0
          "
        >
          {icon}
        </div>

        {href && (
          <ChevronRight
            size={16}
            className="
              text-[var(--admin-muted)]
            "
          />
        )}
      </div>

      <div
        className="
          mt-4
          space-y-1
        "
      >
        <p
          className="
            text-xs
            font-medium
            text-[var(--admin-muted)]
          "
        >
          {title}
        </p>

        <h2
          className="
            text-2xl
            font-bold
            leading-none
            text-[var(--admin-title)]
          "
        >
          {value}
        </h2>

        {subtitle && (
          <p
            className="
              text-xs
              text-[var(--admin-muted)]
            "
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block"
      >
        {content}
      </Link>
    );
  }

  return content;
}