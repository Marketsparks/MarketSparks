"use client";

import Image from "next/image";

import {
  formatDepositMoney,
} from "./deposit.utils";

import type {
  DepositHistoryItem,
} from "./deposit.types";

type DepositHistoryCardProps = {
  deposit: DepositHistoryItem;
};

export default function DepositHistoryCard({
  deposit,
}: DepositHistoryCardProps) {
  const statusStyles = {
    pending: `
      bg-[var(--deposit-history-status-pending-bg)]

      text-[var(--deposit-history-status-pending-text)]
    `,

    successful: `
      bg-[var(--deposit-history-status-success-bg)]

      text-[var(--deposit-history-status-success-text)]
    `,

    failed: `
      bg-[var(--deposit-history-status-failed-bg)]

      text-[var(--deposit-history-status-failed-text)]
    `,
  };

  return (
    <article
      className="
        rounded-[var(--deposit-history-card-radius)]

        border

        border-[var(--deposit-history-card-border)]

        bg-[var(--deposit-history-card-bg)]

        p-[var(--deposit-history-card-padding)]

        shadow-[var(--deposit-history-card-shadow)]

        transition-all
        duration-300

        hover:border-[var(--deposit-history-card-hover-border)]
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

            gap-4
          "
        >
          <div
            className="
              relative

              h-12

              w-12

              shrink-0

              overflow-hidden

              rounded-xl

              border

              border-[var(--deposit-history-card-icon-border)]

              bg-[var(--deposit-history-card-icon-bg)]
            "
          >
            <Image
              src={deposit.method.icon}
              alt={deposit.method.name}
              fill
              sizes="48px"
              className="
                object-contain

                p-2
              "
            />
          </div>

          <div
            className="
              min-w-0
            "
          >
            <h3
              className="
                text-[16px]

                font-semibold

                text-[var(--deposit-history-card-title)]
              "
            >
              {deposit.method.name}
            </h3>

            <p
              className="
                mt-1

                text-sm

                text-[var(--deposit-history-card-text)]
              "
            >
              Ref: {deposit.reference}
            </p>

            <p
              className="
                mt-1

                text-sm

                text-[var(--deposit-history-card-text)]
              "
            >
              {deposit.createdAt}
            </p>
          </div>
        </div>

        <div
          className="
            text-right
          "
        >
          <p
            className="
              text-lg

              font-bold

              text-[var(--deposit-history-card-title)]
            "
          >
            {formatDepositMoney(
              deposit.amount
            )}
          </p>

          <span
            className={`
              mt-2

              inline-flex

              rounded-full

              px-3

              py-1

              text-xs

              font-semibold

              capitalize

              ${
                statusStyles[
                  deposit.status
                ]
              }
            `}
          >
            {deposit.status}
          </span>
        </div>
      </div>
    </article>
  );
}