"use client";

import Button from "@/components/ui/Button";

import type {
  WalletUserRowProps,
} from "./wallet.types";

import {
  formatCurrency,
  getFullName,
} from "./wallet.utils";

export default function WalletUserRow({
  user,
  onManage,
}: WalletUserRowProps) {
  return (
    <tr
      onClick={() =>
        onManage(user)
      }
      className="
        cursor-pointer

        border-b

        border-[var(--admin-table-border)]

        transition-colors
        duration-300

        hover:bg-[var(--admin-table-row-hover)]
      "
    >
      <td
        className="
          px-6

          py-5
        "
      >
        <div
          className="
            font-semibold

            text-[var(--admin-table-title)]
          "
        >
          {getFullName(user)}
        </div>

        <div
          className="
            mt-1

            text-sm

            text-[var(--admin-table-muted)]
          "
        >
          {user.role}
        </div>
      </td>

      <td
        className="
          px-6

          py-5

          text-[var(--admin-table-text)]
        "
      >
        {user.email}
      </td>

      <td
        className="
          px-6

          py-5

          font-semibold

          text-[var(--admin-table-title)]
        "
      >
        {formatCurrency(
          user.wallet
            ?.availableBalance ??
            0,
        )}
      </td>

      <td
        className="
          px-6

          py-5
        "
      >
        <span
          className="
            inline-flex

            rounded-full

            px-3

            py-1

            text-xs

            font-semibold
          "
        >
          {user.status}
        </span>
      </td>

      <td
        className="
          px-6

          py-5

          text-right
        "
      >
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={(
            event,
          ) => {
            event.stopPropagation();

            onManage(user);
          }}
        >
          Manage
        </Button>
      </td>
    </tr>
  );
}