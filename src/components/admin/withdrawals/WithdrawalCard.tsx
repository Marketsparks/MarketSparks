"use client";

import {
  ArrowRight,
} from "lucide-react";

import WithdrawalStatus from "./WithdrawalStatus";

import { formatCurrency } from "../Wallet/wallet.utils";

import type {
  Withdrawal,
} from "./withdrawal.types";

type WithdrawalCardProps = {
  withdrawal: Withdrawal;

  onReview: (
    withdrawal: Withdrawal
  ) => void;

  mobile?: boolean;
};

export default function WithdrawalCard({
  withdrawal,
  onReview,
  mobile = false,
}: WithdrawalCardProps) {
  if (mobile) {
    return (
      <div
        className="
          rounded-xl

          border

          border-[var(--admin-border)]

          bg-[var(--admin-card-bg)]

          p-4

          shadow-sm
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
              min-w-0
            "
          >
            <p
              className="
                truncate

                text-sm

                font-semibold

                text-[var(--admin-foreground)]
              "
            >
              {withdrawal.reference}
            </p>

            <p
              className="
                mt-1

                text-xs

                text-[var(--admin-muted-foreground)]
              "
            >
              {[
  withdrawal.user.firstName,
  withdrawal.user.lastName,
]
  .filter(Boolean)
  .join(" ")}
            </p>

            <p
              className="
                mt-1

                text-xs

                text-[var(--admin-muted-foreground)]
              "
            >
              {withdrawal.method.name}
            </p>
          </div>

          <WithdrawalStatus
            status={
              withdrawal.status
            }
          />
        </div>

        <div
          className="
            mt-5

            grid

            grid-cols-2

            gap-4

            text-sm
          "
        >
          <div>
            <p
              className="
                text-xs

                text-[var(--admin-muted-foreground)]
              "
            >
              Amount
            </p>

            <p
              className="
                mt-1

                font-semibold

                text-[var(--admin-foreground)]
              "
            >
              {formatCurrency(
                withdrawal.amount
              )}
            </p>
          </div>

          <div>
            <p
              className="
                text-xs

                text-[var(--admin-muted-foreground)]
              "
            >
              Date
            </p>

            <p
              className="
                mt-1

                font-medium

                text-[var(--admin-foreground)]
              "
            >
              {
                withdrawal.createdAt
              }
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onReview(
              withdrawal
            )
          }
          className="
            mt-5

            flex

            w-full

            items-center

            justify-center

            gap-2

            rounded-lg

            bg-[var(--admin-primary)]

            px-4

            py-2.5

            text-sm

            font-semibold

            text-[var(--admin-primary-foreground)]

            transition-opacity

            hover:opacity-90
          "
        >
          Review

          <ArrowRight
            size={16}
          />
        </button>
      </div>
    );
  }

  return (
    <tr
      className="
        transition-colors

        hover:bg-[var(--admin-muted-bg)]
      "
    >
      <td
        className="
          whitespace-nowrap

          px-6

          py-5
        "
      >
        <p
          className="
            font-semibold

            text-[var(--admin-foreground)]
          "
        >
          {withdrawal.reference}
        </p>
      </td>

      <td
        className="
          px-6

          py-5
        "
      >
        <div>
          <p
            className="
              font-medium

              text-[var(--admin-foreground)]
            "
          >
            {[
  withdrawal.user.firstName,
  withdrawal.user.lastName,
]
  .filter(Boolean)
  .join(" ")}
          </p>

          <p
            className="
              mt-1

              text-xs

              text-[var(--admin-muted-foreground)]
            "
          >
            {withdrawal.user.email}
          </p>
        </div>
      </td>

      <td
        className="
          px-6

          py-5
        "
      >
        <div>
          <p
            className="
              font-medium

              text-[var(--admin-foreground)]
            "
          >
            {withdrawal.method.name}
          </p>

          <p
            className="
              mt-1

              text-xs

              text-[var(--admin-muted-foreground)]
            "
          >
            {withdrawal.method.type}
          </p>
        </div>
      </td>

      <td
        className="
          whitespace-nowrap

          px-6

          py-5

          font-semibold

          text-[var(--admin-foreground)]
        "
      >
        {formatCurrency(
          withdrawal.amount
        )}
      </td>

      <td
        className="
          whitespace-nowrap

          px-6

          py-5
        "
      >
        <WithdrawalStatus
          status={
            withdrawal.status
          }
        />
      </td>

      <td
        className="
          whitespace-nowrap

          px-6

          py-5

          text-sm

          text-[var(--admin-muted-foreground)]
        "
      >
        {withdrawal.createdAt}
      </td>

      <td
        className="
          whitespace-nowrap

          px-6

          py-5

          text-right
        "
      >
        <button
          type="button"
          onClick={() =>
            onReview(
              withdrawal
            )
          }
          className="
            inline-flex

            items-center

            gap-2

            rounded-lg

            border

            border-[var(--admin-border)]

            px-3

            py-2

            text-sm

            font-semibold

            text-[var(--admin-foreground)]

            transition-all

            hover:border-[var(--admin-primary)]

            hover:text-[var(--admin-primary)]
          "
        >
          Review

          <ArrowRight
            size={16}
          />
        </button>
      </td>
    </tr>
  );
}