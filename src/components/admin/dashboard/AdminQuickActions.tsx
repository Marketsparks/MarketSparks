"use client";

import Link from "next/link";

import {
  ArrowRight,
  CreditCard,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";

const actions = [
  {
    href: "/admin/products",
    label: "Products",
    icon: Package,
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: ShoppingBag,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: Users,
  },
  {
    href: "/admin/deposit-methods",
    label: "Deposits",
    icon: CreditCard,
  },
];

export default function AdminQuickActions() {
  return (
    <section
      className="
        rounded-[var(--admin-card-radius)]
        border
        border-[var(--admin-card-border)]
        bg-[var(--admin-card-bg)]
        p-[var(--admin-card-padding)]
        shadow-[var(--admin-card-shadow)]
      "
    >
      <div
        className="
          mb-4
          flex
          items-center
          justify-between
        "
      >
        <h2
          className="
            text-[15px]
            font-semibold
            text-[var(--admin-title)]
          "
        >
          Quick Actions
        </h2>

        <ArrowRight
          size={16}
          className="
            text-[var(--admin-muted)]
          "
        />
      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-3
        "
      >
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="
                flex
                items-center
                gap-3
                rounded-[var(--admin-surface-radius)]
                border
                border-[var(--admin-surface-border)]
                bg-[var(--admin-surface-bg)]
                p-3
                transition-all
                duration-[var(--admin-transition)]
                hover:border-[var(--admin-primary)]
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[var(--admin-stat-border)]
                  bg-[var(--admin-stat-bg)]
                "
              >
                <Icon
                  size={16}
                  className="
                    text-[var(--admin-primary)]
                  "
                />
              </div>

              <span
                className="
                  text-[13px]
                  font-medium
                  text-[var(--admin-text)]
                "
              >
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}