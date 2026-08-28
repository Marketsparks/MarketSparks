"use client";

import WalletUserRow from "./WalletUserRow";

import WalletLoadingSkeleton from "./WalletLoadingSkeleton";
import WalletEmptyState from "./WalletEmptyState";

import type {
  WalletUsersTableProps,
} from "./wallet.types";

export default function WalletUsersTable({
  users,
  loading,
  onManage,
}: WalletUsersTableProps) {
  if (loading) {
    return (
      <WalletLoadingSkeleton />
    );
  }

  if (
    users.length === 0
  ) {
    return (
      <WalletEmptyState />
    );
  }

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
        duration-300
      "
    >
      <div
        className="
          overflow-x-auto
        "
      >
        <table
          className="
            min-w-[960px]

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
              "
            >
              <th
                className="
                  px-6

                  py-4

                  text-left

                  text-xs

                  font-semibold

                  uppercase

                  tracking-[0.08em]

                  text-[var(--admin-table-header-text)]
                "
              >
                User
              </th>

              <th
                className="
                  px-6

                  py-4

                  text-left

                  text-xs

                  font-semibold

                  uppercase

                  tracking-[0.08em]

                  text-[var(--admin-table-header-text)]
                "
              >
                Email
              </th>

              <th
                className="
                  px-6

                  py-4

                  text-left

                  text-xs

                  font-semibold

                  uppercase

                  tracking-[0.08em]

                  text-[var(--admin-table-header-text)]
                "
              >
                Balance
              </th>

              <th
                className="
                  px-6

                  py-4

                  text-left

                  text-xs

                  font-semibold

                  uppercase

                  tracking-[0.08em]

                  text-[var(--admin-table-header-text)]
                "
              >
                Status
              </th>

              <th
                className="
                  px-6

                  py-4

                  text-right

                  text-xs

                  font-semibold

                  uppercase

                  tracking-[0.08em]

                  text-[var(--admin-table-header-text)]
                "
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody
            className="
              bg-[var(--admin-table-bg)]
            "
          >
            {users.map(
              (user) => (
                <WalletUserRow
                  key={user.id}
                  user={user}
                  onManage={
                    onManage
                  }
                />
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}