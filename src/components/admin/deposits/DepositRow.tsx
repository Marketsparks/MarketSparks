"use client";

import Button from "@/components/ui/Button";

import DepositStatusBadge from "./DepositStatusBadge";

import type {
  Deposit,
} from "./types";

type DepositRowProps = {
  deposit: Deposit;

  onView: (
    deposit: Deposit,
  ) => void;
};

export default function DepositRow({
  deposit,
  onView,
}: DepositRowProps) {
  return (
    <tr
      className="
        border-b

        border-[var(--admin-table-border)]

        text-[var(--admin-table-text)]

        transition-all
        duration-300

        hover:bg-[var(--admin-table-row-hover)]
      "
    >
      <td
        className="
          px-4

          py-4

          sm:px-6
        "
      >
        <div
          className="
            font-semibold

            text-[var(--admin-table-title)]
          "
        >
          {[
            deposit.user.firstName,
            deposit.user.lastName,
          ]
            .filter(Boolean)
            .join(" ")}
        </div>

        <div
          className="
            mt-1

            text-sm

            text-[var(--admin-table-muted)]
          "
        >
          {deposit.user.email}
        </div>
      </td>

      <td
        className="
          px-4

          py-4

          sm:px-6
        "
      >
        <div
          className="
            font-semibold

            text-[var(--admin-table-title)]
          "
        >
          {deposit.depositMethod.symbol}
        </div>

        <div
          className="
            mt-1

            text-sm

            text-[var(--admin-table-muted)]
          "
        >
          {deposit.depositMethod.network}
        </div>
      </td>

      <td
        className="
          px-4

          py-4

          font-medium

          text-[var(--admin-table-text)]

          sm:px-6
        "
      >
        $
        {Number(
          deposit.amount,
        ).toLocaleString()}
      </td>

      <td
        className="
          px-4

          py-4

          sm:px-6
        "
      >
        <DepositStatusBadge
          status={deposit.status}
        />
      </td>

      <td
        className="
          px-4

          py-4

          text-sm

          text-[var(--admin-table-muted)]

          sm:px-6
        "
      >
        {new Date(
          deposit.createdAt,
        ).toLocaleDateString()}
      </td>

      <td
        className="
          px-4

          py-4

          text-right

          sm:px-6
        "
      >
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="
            h-9

            min-w-[84px]

            rounded-lg
          "
          onClick={() =>
            onView(deposit)
          }
        >
          View
        </Button>
      </td>
    </tr>
  );
}