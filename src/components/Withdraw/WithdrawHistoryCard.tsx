"use client";

import Image from "next/image";

import {
  Building2,
} from "lucide-react";

import {
  formatWithdrawAmount,
} from "./withdraw.utils";

import type {
  WithdrawHistoryItem,
} from "./withdraw.types";

type WithdrawHistoryCardProps = {
  withdrawal: WithdrawHistoryItem;
};

export default function WithdrawHistoryCard({
  withdrawal,
}: WithdrawHistoryCardProps) {
  const statusStyles = {
    pending: `
      border-[var(--withdraw-history-status-pending-border)]

      bg-[var(--withdraw-history-status-pending-bg)]

      text-[var(--withdraw-history-status-pending-text)]
    `,

    successful: `
      border-[var(--withdraw-history-status-success-border)]

      bg-[var(--withdraw-history-status-success-bg)]

      text-[var(--withdraw-history-status-success-text)]
    `,

    rejected: `
      border-[var(--withdraw-history-status-rejected-border)]

      bg-[var(--withdraw-history-status-rejected-bg)]

      text-[var(--withdraw-history-status-rejected-text)]
    `,
  };

  return (
    <article
      className="
        rounded-[var(--withdraw-history-card-radius)]

        border

        border-[var(--withdraw-history-card-border)]

        bg-[var(--withdraw-history-card-bg)]

        p-[var(--withdraw-history-card-padding)]

        shadow-[var(--withdraw-history-card-shadow)]

        transition-all

        duration-[var(--withdraw-history-card-transition)]

        hover:border-[var(--withdraw-history-card-hover-border)]
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

            min-w-0

            items-start

            gap-3
          "
        >
          <div
            className="
              flex

              h-10

              w-10

              shrink-0

              items-center

              justify-center

              overflow-hidden

              rounded-lg

              border

              border-[var(--withdraw-history-card-icon-border)]

              bg-[var(--withdraw-history-card-icon-bg)]
            "
          >
{withdrawal.method.type ===
"bank" ? (
  <Building2
    size={19}
    strokeWidth={2}
    className="
      text-[var(--withdraw-history-card-icon-color)]
    "
  />
) : (
  <div
    className="
      relative

      h-full

      w-full
    "
  >
    <Image
      src={
        withdrawal.method.icon
      }
      alt={
        withdrawal.method.name
      }
      fill
      sizes="40px"
      className="
        object-contain

        p-1.5
      "
    />
  </div>
)}
          </div>

          <div
            className="
              min-w-0
            "
          >
            <div
              className="
                flex

                flex-wrap

                items-center

                gap-2
              "
            >
              <h3
                className="
                  truncate

                  text-[13px]

                  font-semibold

                  text-[var(--withdraw-history-card-title)]
                "
              >
                {
                  withdrawal.method
                    .name
                }
              </h3>

              <span
                className="
                  text-[10px]

                  font-medium

                  text-[var(--withdraw-history-card-symbol)]
                "
              >
                {
                  withdrawal.method
                    .symbol
                }
              </span>
            </div>

            <p
              className="
                mt-1

                max-w-[260px]

                truncate

                text-[11px]

                text-[var(--withdraw-history-card-text)]
              "
            >
              {
                withdrawal.destinationAddress
              }
            </p>

            <p
              className="
                mt-1

                text-[10px]

                text-[var(--withdraw-history-card-muted)]
              "
            >
              Ref:{" "}
              {
                withdrawal.reference
              }
            </p>

            <p
              className="
                mt-1

                text-[10px]

                text-[var(--withdraw-history-card-muted)]
              "
            >
              {
                withdrawal.createdAt
              }{" "}
              ·{" "}
              {
                withdrawal.createdTime
              }
            </p>
          </div>
        </div>

        <div
          className="
            shrink-0

            text-right
          "
        >
          <p
            className="
              text-[14px]

              font-bold

              text-[var(--withdraw-history-card-amount)]
            "
          >
            {formatWithdrawAmount(
              withdrawal.amount
            )}
          </p>

          <p
            className="
              mt-1

              text-[10px]

              text-[var(--withdraw-history-card-crypto)]
            "
          >
            {
              withdrawal.cryptoAmount
            }{" "}
            {
              withdrawal.method
                .symbol
            }
          </p>

          <span
            className={`
              mt-2

              inline-flex

              rounded-md

              border

              px-2

              py-1

              text-[10px]

              font-medium

              capitalize

              ${
                statusStyles[
                  withdrawal.status
                ]
              }
            `}
          >
            {
              withdrawal.status
            }
          </span>
        </div>
      </div>
    </article>
  );
}