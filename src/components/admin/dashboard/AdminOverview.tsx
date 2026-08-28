import Link from "next/link";

import {
  ArrowRight,
  CreditCard,
  ShieldCheck,
  ShoppingBag,
  Wallet,
} from "lucide-react";

type AdminOverviewProps = {
  pendingUsers: number;

  pendingDeposits: number;

  pendingWithdrawals: number;

  pendingAffiliateProducts: number;
};

export default function AdminOverview({
  pendingUsers,
  pendingDeposits,
  pendingWithdrawals,
  pendingAffiliateProducts,
}: AdminOverviewProps) {
  const items = [
    {
      title: "User Verifications",
      value: pendingUsers,
      href: "/admin/kyc",
      icon: ShieldCheck,
    },

    {
      title: "Pending Deposits",
      value: pendingDeposits,
      href: "/admin/deposits",
      icon: CreditCard,
    },

    {
      title: "Pending Withdrawals",
      value: pendingWithdrawals,
      href: "/admin/withdrawals",
      icon: Wallet,
    },

    {
      title: "Affiliate Reviews",
      value: pendingAffiliateProducts,
      href: "/admin/affiliate",
      icon: ShoppingBag,
    },
  ];

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
          mb-5
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h2
            className="
              text-base
              font-semibold
              text-[var(--admin-title)]
            "
          >
            Overview
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-[var(--admin-muted)]
            "
          >
            Items requiring attention.
          </p>
        </div>
      </div>

      <div
        className="
          grid
          gap-3
          sm:grid-cols-2
        "
      >
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="
                group
                flex
                items-center
                justify-between
                rounded-[var(--admin-surface-radius)]
                border
                border-[var(--admin-surface-border)]
                bg-[var(--admin-surface-bg)]
                p-4
                transition-all
                duration-[var(--admin-transition)]
                hover:opacity-90
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--admin-stat-bg)]
                    border
                    border-[var(--admin-stat-border)]
                    text-[var(--admin-primary)]
                  "
                >
                  <Icon size={18} />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      text-[var(--admin-muted)]
                    "
                  >
                    {item.title}
                  </p>

                  <p
                    className="
                      mt-1
                      text-lg
                      font-bold
                      text-[var(--admin-title)]
                    "
                  >
                    {item.value}
                  </p>
                </div>
              </div>

              <ArrowRight
                size={16}
                className="
                  text-[var(--admin-muted)]
                  transition-transform
                  duration-[var(--admin-transition)]
                  group-hover:translate-x-1
                "
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}