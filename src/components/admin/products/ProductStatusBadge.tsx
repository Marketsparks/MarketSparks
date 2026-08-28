"use client";

import type { ProductStatus } from "@/constants/product-status";

type ProductStatusBadgeProps = {
  status: ProductStatus;
};

const statusStyles: Record<
  ProductStatus,
  string
> = {
  ACTIVE: `
    bg-[var(--admin-status-success-bg)]
    text-[var(--admin-status-success-text)]
    border-[var(--admin-status-success-border)]
  `,

  DRAFT: `
    bg-[var(--admin-status-warning-bg)]
    text-[var(--admin-status-warning-text)]
    border-[var(--admin-status-warning-border)]
  `,

  ARCHIVED: `
    bg-[var(--admin-status-neutral-bg)]
    text-[var(--admin-status-neutral-text)]
    border-[var(--admin-status-neutral-border)]
  `,
};

export default function ProductStatusBadge({
  status,
}: ProductStatusBadgeProps) {
  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        border
        px-2.5
        py-1
        text-xs
        font-medium
        uppercase
        tracking-wide
        ${statusStyles[status]}
      `}
    >
      {status}
    </span>
  );
}