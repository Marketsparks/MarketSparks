"use client";

import DepositRow from "./DepositRow";

import type {
  Deposit,
} from "./types";

type DepositTableProps = {
  deposits: Deposit[];

  onView: (
    deposit: Deposit,
  ) => void;
};

export default function DepositTable({
  deposits,
  onView,
}: DepositTableProps) {
  return (
<div
  className="
    mb-28

    overflow-hidden

    rounded-[var(--admin-card-radius)]

    border

    border-[var(--admin-card-border)]

    bg-[var(--admin-card-bg)]

    shadow-[var(--admin-card-shadow)]

    transition-all
    duration-[var(--admin-card-transition)]
  "
>
      <div
        className="
          overflow-x-auto
        "
      >
        <table
          className="
            min-w-[900px]

            w-full

            border-collapse
          "
        >
          <thead>
            <tr
              className="
                border-b

                border-[var(--admin-table-border)]

                bg-[var(--admin-table-header-bg)]

                transition-colors
              "
            >
              <th
                className="
                  px-4

                  py-4

                  text-left

                  text-xs

                  font-semibold

                  uppercase

                  tracking-[0.08em]

                  text-[var(--admin-table-muted)]

                  sm:px-6
                "
              >
                User
              </th>

              <th
                className="
                  px-4

                  py-4

                  text-left

                  text-xs

                  font-semibold

                  uppercase

                  tracking-[0.08em]

                  text-[var(--admin-table-muted)]

                  sm:px-6
                "
              >
                Deposit Method
              </th>

              <th
                className="
                  px-4

                  py-4

                  text-left

                  text-xs

                  font-semibold

                  uppercase

                  tracking-[0.08em]

                  text-[var(--admin-table-muted)]

                  sm:px-6
                "
              >
                Amount
              </th>

              <th
                className="
                  px-4

                  py-4

                  text-left

                  text-xs

                  font-semibold

                  uppercase

                  tracking-[0.08em]

                  text-[var(--admin-table-muted)]

                  sm:px-6
                "
              >
                Status
              </th>

              <th
                className="
                  px-4

                  py-4

                  text-left

                  text-xs

                  font-semibold

                  uppercase

                  tracking-[0.08em]

                  text-[var(--admin-table-muted)]

                  sm:px-6
                "
              >
                Date
              </th>

              <th
                className="
                  px-4

                  py-4

                  text-right

                  text-xs

                  font-semibold

                  uppercase

                  tracking-[0.08em]

                  text-[var(--admin-table-muted)]

                  sm:px-6
                "
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody
            className="
              divide-y

              divide-[var(--admin-table-border)]

              bg-[var(--admin-table-bg)]

              transition-colors
            "
          >
            {deposits.map(
              (deposit) => (
                <DepositRow
                  key={deposit.id}
                  deposit={deposit}
                  onView={onView}
                />
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}