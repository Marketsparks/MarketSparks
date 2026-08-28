"use client";

import type {
  UserSubscription,
} from "@/types/subscription.types";

import {
  CalendarDays,
  Crown,
  Package,
  Percent,
} from "lucide-react";

type CurrentPlanCardProps = {
  subscription: UserSubscription | null;
  loading: boolean;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat(
    "en-NG",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  ).format(new Date(value));
}

function getDaysRemaining(
  expiresAt: string,
) {
  const now = Date.now();

  const end =
    new Date(expiresAt).getTime();

  return Math.max(
    Math.ceil(
      (end - now) /
        (1000 * 60 * 60 * 24),
    ),
    0,
  );
}

export function CurrentPlanCard({
  subscription,
  loading,
}: CurrentPlanCardProps) {

  if (loading) {
  return (
    <section
      className="
        rounded-[var(--user-radius-md)]
        border
        p-5
        animate-pulse
      "
      style={{
        background: "var(--user-card-bg)",
        borderColor: "var(--user-card-border)",
        boxShadow: "var(--user-card-shadow)",
      }}
    >
      <div className="space-y-4">
        <div
          className="h-6 w-40 rounded"
          style={{
            background:
              "var(--user-surface-secondary)",
          }}
        />

        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-20 rounded-[var(--user-radius-sm)]"
                style={{
                  background:
                    "var(--user-surface-secondary)",
                }}
              />
            ),
          )}
        </div>

        <div
          className="h-2 rounded-full"
          style={{
            background:
              "var(--user-surface-secondary)",
          }}
        />
      </div>
    </section>
  );
}

  if (!subscription) {
    return (
      <section
        className="
          rounded-[var(--user-radius-md)]
          border
          p-5
        "
        style={{
          background:
            "var(--user-card-bg)",
          borderColor:
            "var(--user-card-border)",
          boxShadow:
            "var(--user-card-shadow)",
        }}
      >
        <div className="space-y-1">
          <h2
            className="text-base font-semibold"
            style={{
              color:
                "var(--user-title)",
            }}
          >
            No Active Plan
          </h2>

          <p
            className="text-sm"
            style={{
              color:
                "var(--user-text-muted)",
            }}
          >
            Subscribe to a plan to begin
            publishing affiliate
            products.
          </p>
        </div>
      </section>
    );
  }

  const daysRemaining =
    getDaysRemaining(
      subscription.expiresAt,
    );

  return (
    <section
      className="
        rounded-[var(--user-radius-md)]
        border
        p-5
      "
      style={{
        background:
          "var(--user-card-bg)",
        borderColor:
          "var(--user-card-border)",
        boxShadow:
          "var(--user-card-shadow)",
      }}
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
              "
              style={{
                background:
                  "var(--user-surface-secondary)",
              }}
            >
              <Crown
                size={18}
                style={{
                  color:
                    "var(--user-icon)",
                }}
              />
            </div>

            <div>
              <h2
                className="text-lg font-semibold"
                style={{
                  color:
                    "var(--user-title)",
                }}
              >
                {subscription.badgeName}
              </h2>

              <p
                className="text-xs"
                style={{
                  color:
                    "var(--user-text-muted)",
                }}
              >
                Current Subscription
              </p>
            </div>
          </div>

          <div
            className="
              inline-flex
              rounded-full
              px-3
              py-1
              text-xs
              font-medium
            "
            style={{
              background:
                "var(--user-badge-success-bg)",
              color:
                "var(--user-badge-success-text)",
            }}
          >
            {subscription.status}
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-3
            md:min-w-[340px]
          "
        >
          <InfoItem
            icon={
              <Percent size={15} />
            }
            label="Commission"
            value={`${subscription.commissionRate}%`}
          />

          <InfoItem
            icon={
              <Package size={15} />
            }
            label="Products"
            value={String(
              subscription.maxPublishedProducts,
            )}
          />

          <InfoItem
            icon={
              <CalendarDays size={15} />
            }
            label="Started"
            value={formatDate(
              subscription.startsAt,
            )}
          />

          <InfoItem
            icon={
              <CalendarDays size={15} />
            }
            label="Expires"
            value={formatDate(
              subscription.expiresAt,
            )}
          />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between">
          <span
            className="text-xs"
            style={{
              color:
                "var(--user-text-muted)",
            }}
          >
            Days Remaining
          </span>

          <span
            className="text-sm font-semibold"
            style={{
              color:
                "var(--user-title)",
            }}
          >
            {daysRemaining} day
            {daysRemaining === 1
              ? ""
              : "s"}
          </span>
        </div>

        <div
          className="h-2 overflow-hidden rounded-full"
          style={{
            background:
              "var(--user-progress-bg)",
          }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.min(
                100,
                (daysRemaining / 30) *
                  100,
              )}%`,
              background:
                "var(--user-progress-fill)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoItem({
  icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div
      className="
        rounded-[var(--user-radius-sm)]
        border
        p-3
      "
      style={{
        background:
          "var(--user-surface-secondary)",
        borderColor:
          "var(--user-divider)",
      }}
    >
      <div
        className="
          mb-2
          flex
          items-center
          gap-2
        "
        style={{
          color:
            "var(--user-icon-muted)",
        }}
      >
        {icon}

        <span className="text-xs">
          {label}
        </span>
      </div>

      <p
        className="text-sm font-semibold"
        style={{
          color:
            "var(--user-title)",
        }}
      >
        {value}
      </p>
    </div>
  );
}