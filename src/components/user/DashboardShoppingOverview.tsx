import Link from "next/link";

import { Banknote, Bookmark, PackageCheck, Truck } from "lucide-react";

type DashboardShoppingOverviewProps = {
  activeOrders: number;
  pendingPayments: number;
  savedForLater: number;
  deliveredOrders: number;
};

type ShoppingMetricProps = {
  icon: React.ElementType;
  value: number;
  label: string;
  description: string;
  tone: string;
};

export default function DashboardShoppingOverview({
  activeOrders,
  pendingPayments,
  savedForLater,
  deliveredOrders,
}: DashboardShoppingOverviewProps) {
  const metrics: ShoppingMetricProps[] = [
{
  icon: Truck,
  value: activeOrders,
  label: "Active Orders",
  description: "In progress",
  tone: "var(--primary)",
},
{
  icon: Banknote,
  value: pendingPayments,
  label: "Pending Payment",
  description: "Action required",
  tone: "#f59e0b",
},
    {
      icon: Bookmark,
      value: savedForLater,
      label: "Saved for Later",
      description: "Items saved",
      tone: "#10b981",
    },
    {
      icon: PackageCheck,
      value: deliveredOrders,
      label: "Delivered",
      description: "Last 30 days",
      tone: "#60a5fa",
    },
  ];

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-xl
        border
        border-[var(--user-card-border)]
        bg-[var(--user-card-bg)]
        shadow-[var(--user-card-shadow)]
      "
    >
      <div
        className="
          relative
          z-10
          p-4
          sm:p-5
          lg:p-6
        "
      >
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
          <div>
            <h2
              className="
                text-sm
                font-semibold
                tracking-tight
                text-[var(--user-title)]
                sm:text-base
              "
            >
              Your Shopping
            </h2>

            <p
              className="
                mt-1
                text-[11px]
                leading-5
                text-[var(--user-text-muted)]
                sm:text-xs
              "
            >
              Stay up to date with your
              orders and saved items.
            </p>
          </div>

          <Link
            href="/orders"
            className="
              inline-flex
              w-fit
              shrink-0
              items-center
              gap-2
              rounded-xl
              border
              border-[var(--user-card-border)]
              bg-[var(--user-stat-bg)]
              px-3
              py-2
              text-[11px]
              font-medium
              text-[var(--user-title)]
              transition-all
              hover:border-[var(--primary)]
              hover:text-[var(--primary)]
              sm:px-3.5
              sm:text-xs
            "
          >
            View All Orders

            <span
              aria-hidden="true"
              className="text-sm"
            >
              →
            </span>
          </Link>
        </div>

        <div
          className="
            mt-5
            grid
            grid-cols-2
            gap-y-4
            sm:mt-6
            sm:grid-cols-4
            sm:gap-0
          "
        >
          {metrics.map(
            (
              metric,
              index,
            ) => {
              const Icon =
                metric.icon;

              return (
                <div
                  key={
                    metric.label
                  }
                  className={`
                    flex
                    min-w-0
                    items-center
                    gap-3
                    ${
                      index % 2 === 1
                        ? "border-l border-[var(--user-card-border)] pl-3 sm:border-l-0 sm:pl-0"
                        : ""
                    }
                    ${
                      index >= 2
                        ? "border-t border-[var(--user-card-border)] pt-4 sm:border-t-0 sm:pt-0"
                        : ""
                    }
                    ${
                      index > 0
                        ? "sm:border-l sm:border-[var(--user-card-border)] sm:pl-4 lg:pl-5"
                        : ""
                    }
                  `}
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                    "
                    style={{
                      background:
                        `color-mix(in srgb, ${metric.tone} 15%, transparent)`,

                      color:
                        metric.tone,
                    }}
                  >
                    <Icon
                      size={16}
                      strokeWidth={2}
                    />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        text-xl
                        font-semibold
                        leading-none
                        tracking-tight
                        text-[var(--user-title)]
                        sm:text-2xl
                      "
                    >
                      {metric.value}
                    </p>

                    <p
                      className="
                        mt-1
                        truncate
                        text-[10px]
                        font-medium
                        text-[var(--user-title)]
                        sm:text-xs
                      "
                    >
                      {metric.label}
                    </p>

                    <p
                      className="
                        mt-0.5
                        truncate
                        text-[9px]
                        text-[var(--user-text-muted)]
                        sm:text-[10px]
                      "
                    >
                      {
                        metric.description
                      }
                    </p>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-28px]
          right-[-10px]
          hidden
          h-40
          w-40
          opacity-[0.08]
          lg:block
        "
      >
        <div
          className="
            absolute
            bottom-0
            right-5
            h-28
            w-24
            rounded-b-[24px]
            rounded-t-lg
            border
            border-[var(--primary)]
          "
        />

        <div
          className="
            absolute
            bottom-20
            right-8
            h-9
            w-16
            rounded-t-full
            border
            border-b-0
            border-[var(--primary)]
          "
        />

        <div
          className="
            absolute
            bottom-[-2px]
            right-[-2px]
            h-24
            w-20
            rounded-b-[20px]
            rounded-t-lg
            border
            border-[var(--primary)]
          "
        />

        <div
          className="
            absolute
            bottom-16
            right-4
            h-8
            w-14
            rounded-t-full
            border
            border-b-0
            border-[var(--primary)]
          "
        />
      </div>
    </section>
  );
}