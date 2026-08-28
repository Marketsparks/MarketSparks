"use client";

import {
  useMemo,
  useState,
} from "react";

import DepositHistoryCard from "./DepositHistoryCard";
import DepositHistoryEmpty from "./DepositHistoryEmpty";

import type {
  DepositHistoryItem,
  DepositStatus,
} from "./deposit.types";

type DepositHistoryProps = {
  deposits: DepositHistoryItem[];
};

const FILTERS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Successful",
    value: "successful",
  },
  {
    label: "Failed",
    value: "failed",
  },
] as const;

type Filter =
  | "all"
  | DepositStatus;

export default function DepositHistory({
  deposits,
}: DepositHistoryProps) {
  const [activeFilter, setActiveFilter] =
    useState<Filter>("all");

  const filteredDeposits =
    useMemo(() => {
      if (
        activeFilter === "all"
      ) {
        return deposits;
      }

      return deposits.filter(
        (deposit) =>
          deposit.status ===
          activeFilter
      );
    }, [
      deposits,
      activeFilter,
    ]);

  return (
    <section
      className="
        mt-12

        rounded-[var(--deposit-history-radius)]

        border

        border-[var(--deposit-history-border)]

        bg-[var(--deposit-history-bg)]

        p-[var(--deposit-history-padding)]

        shadow-[var(--deposit-history-shadow)]

        transition-all

        duration-[var(--deposit-history-transition)]
      "
    >
      <div
        className="
          flex

          flex-col

          gap-6

          lg:flex-row

          lg:items-center

          lg:justify-between
        "
      >
        <div>
          <h2
            className="
              text-2xl

              font-bold

              text-[var(--deposit-history-title)]
            "
          >
            Recent Deposits
          </h2>

          <p
            className="
              mt-2

              text-sm

              text-[var(--deposit-history-text)]
            "
          >
            View and monitor all your
            recent deposit requests.
          </p>
        </div>

        <div
          className="
            flex

            flex-wrap

            gap-1.5
          "
        >
          {FILTERS.map(
            (filter) => {
              const isActive =
                activeFilter ===
                filter.value;

              const filterStyles =
                {
                  all: isActive
                    ? `
                        border-[var(--deposit-history-filter-all-active-border)]

                        bg-[var(--deposit-history-filter-all-active-bg)]

                        text-[var(--deposit-history-filter-all-active-text)]
                      `
                    : `
                        border-[var(--deposit-history-filter-all-border)]

                        bg-[var(--deposit-history-filter-all-bg)]

                        text-[var(--deposit-history-filter-all-text)]

                        hover:border-[var(--deposit-history-filter-all-active-border)]

                        hover:bg-[var(--deposit-history-filter-all-active-bg)]

                        hover:text-[var(--deposit-history-filter-all-active-text)]
                      `,

                  pending: isActive
                    ? `
                        border-[var(--deposit-history-filter-pending-active-border)]

                        bg-[var(--deposit-history-filter-pending-active-bg)]

                        text-[var(--deposit-history-filter-pending-active-text)]
                      `
                    : `
                        border-[var(--deposit-history-filter-pending-border)]

                        bg-[var(--deposit-history-filter-pending-bg)]

                        text-[var(--deposit-history-filter-pending-text)]

                        hover:border-[var(--deposit-history-filter-pending-active-border)]

                        hover:bg-[var(--deposit-history-filter-pending-active-bg)]

                        hover:text-[var(--deposit-history-filter-pending-active-text)]
                      `,

                  successful: isActive
                    ? `
                        border-[var(--deposit-history-filter-successful-active-border)]

                        bg-[var(--deposit-history-filter-successful-active-bg)]

                        text-[var(--deposit-history-filter-successful-active-text)]
                      `
                    : `
                        border-[var(--deposit-history-filter-successful-border)]

                        bg-[var(--deposit-history-filter-successful-bg)]

                        text-[var(--deposit-history-filter-successful-text)]

                        hover:border-[var(--deposit-history-filter-successful-active-border)]

                        hover:bg-[var(--deposit-history-filter-successful-active-bg)]

                        hover:text-[var(--deposit-history-filter-successful-active-text)]
                      `,

                  failed: isActive
                    ? `
                        border-[var(--deposit-history-filter-failed-active-border)]

                        bg-[var(--deposit-history-filter-failed-active-bg)]

                        text-[var(--deposit-history-filter-failed-active-text)]
                      `
                    : `
                        border-[var(--deposit-history-filter-failed-border)]

                        bg-[var(--deposit-history-filter-failed-bg)]

                        text-[var(--deposit-history-filter-failed-text)]

                        hover:border-[var(--deposit-history-filter-failed-active-border)]

                        hover:bg-[var(--deposit-history-filter-failed-active-bg)]

                        hover:text-[var(--deposit-history-filter-failed-active-text)]
                      `,
                } as const;

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

                    duration-[var(--deposit-history-filter-transition)]

                    ${filterStyles[
                      filter.value
                    ]}
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
    mt-8

    max-h-[600px]

    space-y-4

    overflow-y-auto

    pr-1
  "
>
  {filteredDeposits.length >
  0 ? (
    filteredDeposits.map(
      (deposit) => (
        <DepositHistoryCard
          key={
            deposit.id
          }
          deposit={
            deposit
          }
        />
      )
    )
  ) : (
    <DepositHistoryEmpty />
  )}
</div>
    </section>
  );
}