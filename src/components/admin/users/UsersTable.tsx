"use client";

import Image from "next/image";

import {
  Loader2,
  Mail,
  MapPin,
  Phone,
  User as UserIcon,
} from "lucide-react";

import { UserActions } from "./UserActions";
import { UserStatusBadge } from "./UserStatusBadge";

import type { AdminUser } from "./user.types";

type UserAction =
  | "activate"
  | "deactivate"
  | "restore"
  | "approveDeletion"
  | "delete";

type UsersTableProps = {
  users: AdminUser[];
  loading: boolean;

  onAction: (
    user: AdminUser,
    action: UserAction,
  ) => void;
};

const currency = new Intl.NumberFormat(
  "en-US",
  {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  },
);

export function UsersTable({
  users,
  loading,
  onAction,
}: UsersTableProps) {
  if (loading) {
    return (
      <div
        className="
          flex
          min-h-80
          items-center
          justify-center
          rounded-[var(--admin-card-radius)]
          border
          border-[var(--admin-card-border)]
          bg-[var(--admin-card-bg)]
          p-8
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            text-[var(--admin-muted)]
          "
        >
          <Loader2
            className="h-5 w-5 animate-spin"
          />

          <span className="text-sm">
            Loading users...
          </span>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div
        className="
          flex
          min-h-80
          flex-col
          items-center
          justify-center
          gap-4
          rounded-[var(--admin-card-radius)]
          border
          border-[var(--admin-empty-border)]
          bg-[var(--admin-empty-bg)]
          p-10
          text-center
          shadow-[var(--admin-empty-shadow)]
        "
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-[var(--admin-empty-icon-bg)]
          "
        >
          <UserIcon
            className="
              h-8
              w-8
              text-[var(--admin-empty-icon-color)]
            "
          />
        </div>

        <div className="space-y-2">
          <h3
            className="
              text-lg
              font-semibold
              text-[var(--admin-empty-title)]
            "
          >
            No users found
          </h3>

          <p
            className="
              max-w-md
              text-sm
              text-[var(--admin-empty-text)]
            "
          >
            No users matched the current
            filters.
          </p>
        </div>
      </div>
    );
  }

    return (
    <div
      className="
        overflow-hidden
        rounded-[var(--admin-card-radius)]
        border
        border-[var(--admin-table-border)]
        bg-[var(--admin-table-bg)]
        shadow-[var(--admin-card-shadow)]
      "
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead
            className="
              border-b
              border-[var(--admin-table-border)]
              bg-[var(--admin-table-header-bg)]
            "
          >
            <tr>
              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
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
                  text-sm
                  font-semibold
                  text-[var(--admin-table-header-text)]
                "
              >
                Contact
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                  text-[var(--admin-table-header-text)]
                "
              >
                Country
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-right
                  text-sm
                  font-semibold
                  text-[var(--admin-table-header-text)]
                "
              >
                Balance
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-center
                  text-sm
                  font-semibold
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
                  text-sm
                  font-semibold
                  text-[var(--admin-table-header-text)]
                "
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="
                  border-b
                  border-[var(--admin-table-border)]
                  transition-colors
                  duration-200
                  hover:bg-[var(--admin-table-row-hover)]
                  last:border-b-0
                "
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        relative
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-full
                        border
                        border-[var(--admin-table-border)]
                        bg-[var(--admin-surface-bg)]
                      "
                    >
                      {user.avatarKey ? (
                        <Image
                          src={user.avatarKey}
                          alt={`${user.firstName} ${user.lastName}`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <UserIcon
                          className="
                            h-6
                            w-6
                            text-[var(--admin-muted)]
                          "
                        />
                      )}
                    </div>

                    <div className="space-y-1">
                      <p
                        className="
                          font-medium
                          text-[var(--admin-table-title)]
                        "
                      >
                        {user.firstName} {user.lastName}
                      </p>

                      <p
                        className="
                          text-xs
                          text-[var(--admin-table-muted)]
                        "
                      >
                        {user.role}
                      </p>
                    </div>
                  </div>
                </td>

                                <td className="px-6 py-5">
                  <div className="space-y-2">
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-[var(--admin-table-text)]
                      "
                    >
                      <Mail className="h-4 w-4 shrink-0" />

                      <span className="truncate">
                        {user.email}
                      </span>
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-[var(--admin-table-muted)]
                      "
                    >
                      <Phone className="h-4 w-4 shrink-0" />

                      <span>
                        {user.phoneNumber}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-[var(--admin-table-text)]
                    "
                  >
                    <MapPin className="h-4 w-4 shrink-0" />

                    <span>{user.country}</span>
                  </div>
                </td>

                <td
                  className="
                    px-6
                    py-5
                    text-right
                    font-medium
                    text-[var(--admin-table-text)]
                  "
                >
                  {currency.format(
                    Number(user.balance),
                  )}
                </td>

                <td className="px-6 py-5 text-center">
                  <UserStatusBadge
                    status={user.status}
                  />
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-end">
<UserActions
  status={user.status}
  onAction={(action) =>
    onAction(user, action)
  }
/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

          </div>
  );
}