"use client";

import Button from "@/components/ui/Button";

import type {
  SubscriptionPlan,
} from "@/types/plan.types";

type PlanCardProps = {
  plan: SubscriptionPlan;

  current?: boolean;

  hasActiveSubscription?: boolean;

  disabled?: boolean;

  onSubscribe?: (
    plan: SubscriptionPlan,
  ) => void;
};

export function PlanCard({
  plan,
  current = false,
  hasActiveSubscription = false,
  disabled = false,
  onSubscribe,
}: PlanCardProps) {
const buttonLabel = current
  ? "Current"
  : hasActiveSubscription
    ? "Upgrade"
    : "Subscribe";

  return (
    <div
      className={`
        flex
        h-full
        flex-col
        rounded-[var(--user-radius-md)]
        border
        p-4
        transition-all
        ${
          disabled
            ? "opacity-60"
            : ""
        }
      `}
      style={{
        background:
          "var(--user-card-bg)",

        borderColor:
          current
            ? "var(--user-plan-active-border)"
            : "var(--user-card-border)",
      }}
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >
        <div className="min-w-0">
          <h3
            className="
              truncate
              text-base
              font-semibold
            "
            style={{
              color:
                "var(--user-title)",
            }}
          >
            {plan.name}
          </h3>

          {plan.description && (
            <p
              className="
                mt-1
                line-clamp-2
                text-xs
              "
              style={{
                color:
                  "var(--user-text-muted)",
              }}
            >
              {plan.description}
            </p>
          )}
        </div>

        <span
          className="
            shrink-0
            rounded-full
            border
            px-2.5
            py-1
            text-[11px]
            font-medium
          "
          style={{
            background:
              "var(--user-plan-popular-bg)",

            borderColor:
              "var(--user-plan-popular-border)",

            color:
              plan.badgeColor,
          }}
        >
          {plan.badgeName}
        </span>
      </div>

      <div
        className="
          mt-4
          space-y-2
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            rounded-lg
            border
            px-3
            py-2
          "
          style={{
            background:
              "var(--user-stat-bg)",

            borderColor:
              "var(--user-stat-border)",
          }}
        >
          <span
            className="
              text-xs
            "
            style={{
              color:
                "var(--user-text-muted)",
            }}
          >
            Price
          </span>

          <span
            className="
              text-sm
              font-semibold
            "
            style={{
              color:
                "var(--user-title)",
            }}
          >
            $
            {plan.price.toLocaleString()}
          </span>
        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-2
          "
        >
          <div
            className="
              rounded-lg
              border
              p-2.5
            "
            style={{
              background:
                "var(--user-stat-bg)",

              borderColor:
                "var(--user-stat-border)",
            }}
          >
            <p
              className="
                text-[11px]
              "
              style={{
                color:
                  "var(--user-text-muted)",
              }}
            >
              Commission
            </p>

            <p
              className="
                mt-1
                text-sm
                font-semibold
              "
              style={{
                color:
                  "var(--user-title)",
              }}
            >
              {plan.commissionRate}%
            </p>
          </div>

          <div
            className="
              rounded-lg
              border
              p-2.5
            "
            style={{
              background:
                "var(--user-stat-bg)",

              borderColor:
                "var(--user-stat-border)",
            }}
          >
            <p
              className="
                text-[11px]
              "
              style={{
                color:
                  "var(--user-text-muted)",
              }}
            >
              Products
            </p>

            <p
              className="
                mt-1
                text-sm
                font-semibold
              "
              style={{
                color:
                  "var(--user-title)",
              }}
            >
              {
                plan.maxPublishedProducts
              }
            </p>
          </div>

          <div
            className="
              col-span-2
              rounded-lg
              border
              p-2.5
            "
            style={{
              background:
                "var(--user-stat-bg)",

              borderColor:
                "var(--user-stat-border)",
            }}
          >
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-[11px]
                "
                style={{
                  color:
                    "var(--user-text-muted)",
                }}
              >
                Duration
              </span>

              <span
                className="
                  text-sm
                  font-semibold
                "
                style={{
                  color:
                    "var(--user-title)",
                }}
              >
                {
                  plan.durationInDays
                }{" "}
                days
              </span>
            </div>
          </div>
        </div>
      </div>

      <Button
        className="
          mt-4
          h-10
          w-full
        "
        disabled={
          current ||
          disabled
        }
        onClick={() =>
          onSubscribe?.(
            plan,
          )
        }
      >
        {buttonLabel}
      </Button>
    </div>
  );
}