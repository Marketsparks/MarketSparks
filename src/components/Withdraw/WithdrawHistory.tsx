"use client";

import {
  useMemo,
  useState,
} from "react";

import WithdrawHistoryCard from "./WithdrawHistoryCard";
import WithdrawHistoryEmpty from "./WithdrawHistoryEmpty";

import {
  WITHDRAW_FILTERS,
} from "./withdraw.constants";

import type {
  WithdrawHistoryItem,
  WithdrawFilter,
} from "./withdraw.types";

type WithdrawHistoryProps = {
  withdrawals: WithdrawHistoryItem[];
};

export default function WithdrawHistory({
  withdrawals,
}: WithdrawHistoryProps) {
  const [
    activeFilter,
    setActiveFilter,
  ] = useState<WithdrawFilter>(
    "all"
  );

  const filteredWithdrawals =
    useMemo(() => {
      if (
        activeFilter === "all"
      ) {
        return withdrawals;
      }

      return withdrawals.filter(
        (withdrawal) =>
          withdrawal.status ===
          activeFilter
      );
    }, [
      withdrawals,
      activeFilter,
    ]);

  return (
    <section
      className="
        mt-10

        rounded-[var(--withdraw-history-radius)]

        border

        border-[var(--withdraw-history-border)]

        bg-[var(--withdraw-history-bg)]

        p-[var(--withdraw-history-padding)]

        shadow-[var(--withdraw-history-shadow)]

        transition-all

        duration-[var(--withdraw-history-transition)]
      "
    >
      <div
        className="
          flex

          flex-col

          gap-4

          sm:flex-row

          sm:items-center

          sm:justify-between
        "
      >
        <div>
          <h2
            className="
              text-[18px]

              font-bold

              text-[var(--withdraw-history-title)]
            "
          >
            Withdrawal History
          </h2>

          <p
            className="
              mt-1.5

              text-[12px]

              leading-5

              text-[var(--withdraw-history-text)]
            "
          >
            View your recent withdrawal
            transactions.
          </p>
        </div>

        <div
          className="
            flex

            flex-wrap

            gap-1.5
          "
        >
          {WITHDRAW_FILTERS.map(
            (filter) => {
              const isActive =
                activeFilter ===
                filter.value;

              const statusStyles = {
                all: `
                  border-[var(--withdraw-history-filter-all-border)]

                  bg-[var(--withdraw-history-filter-all-bg)]

                  text-[var(--withdraw-history-filter-all-text)]
                `,

                pending: `
                  border-[var(--withdraw-history-filter-pending-border)]

                  bg-[var(--withdraw-history-filter-pending-bg)]

                  text-[var(--withdraw-history-filter-pending-text)]
                `,

                successful: `
                  border-[var(--withdraw-history-filter-success-border)]

                  bg-[var(--withdraw-history-filter-success-bg)]

                  text-[var(--withdraw-history-filter-success-text)]
                `,

                rejected: `
                  border-[var(--withdraw-history-filter-rejected-border)]

                  bg-[var(--withdraw-history-filter-rejected-bg)]

                  text-[var(--withdraw-history-filter-rejected-text)]
                `,
              };

              const activeStyles = {
                all: `
                  border-[var(--withdraw-history-filter-all-active-border)]

                  bg-[var(--withdraw-history-filter-all-active-bg)]

                  text-[var(--withdraw-history-filter-all-active-text)]
                `,

                pending: `
                  border-[var(--withdraw-history-filter-pending-active-border)]

                  bg-[var(--withdraw-history-filter-pending-active-bg)]

                  text-[var(--withdraw-history-filter-pending-active-text)]
                `,

                successful: `
                  border-[var(--withdraw-history-filter-success-active-border)]

                  bg-[var(--withdraw-history-filter-success-active-bg)]

                  text-[var(--withdraw-history-filter-success-active-text)]
                `,

                rejected: `
                  border-[var(--withdraw-history-filter-rejected-active-border)]

                  bg-[var(--withdraw-history-filter-rejected-active-bg)]

                  text-[var(--withdraw-history-filter-rejected-active-text)]
                `,
              };

              return (
                <button
                  key={
                    filter.value
                  }
                  type="button"
                  onClick={() =>
                    setActiveFilter(
                      filter.value
                    )
                  }
                  className={`
                    rounded-md

                    border

                    px-2

                    py-1

                    text-[11px]

                    font-medium

                    transition-all

                    duration-[var(--withdraw-history-transition)]

                    ${
                      isActive
                        ? activeStyles[
                            filter.value
                          ]
                        : statusStyles[
                            filter.value
                          ]
                    }

                    hover:opacity-85
                  `}
                >
                  {
                    filter.label
                  }
                </button>
              );
            }
          )}
        </div>
      </div>

<div
  className="
    mt-6

    max-h-[600px]

    space-y-3

    overflow-y-auto

    pr-1
  "
>
  {filteredWithdrawals.length >
  0 ? (
    filteredWithdrawals.map(
      (withdrawal) => (
        <WithdrawHistoryCard
          key={
            withdrawal.id
          }
          withdrawal={
            withdrawal
          }
        />
      )
    )
  ) : (
    <WithdrawHistoryEmpty />
  )}
</div>
    </section>
  );
}