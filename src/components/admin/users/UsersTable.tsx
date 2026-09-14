"use client";

import { useState } from "react";

import Image from "next/image";

import {
  ChevronDown,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User as UserIcon,
} from "lucide-react";

import {
  getCloudinaryImageUrl,
} from "@/lib/cloudinary";

import { appToast } from "@/lib/toast";

import { UserActions } from "./UserActions";
import { UserStatusBadge } from "./UserStatusBadge";

import type { AdminUser } from "./user.types";

type UserAction =
  | "activate"
  | "deactivate"
  | "restore"
  | "approveDeletion"
  | "delete";

type UserRole =
  | "USER"
  | "ADMIN";

type UsersTableProps = {
  users: AdminUser[];
  loading: boolean;

  onAction: (
    user: AdminUser,
    action: UserAction,
  ) => void;

  onRoleChange: (
    userId: string,
    role: UserRole,
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

function LoadingSkeleton() {
  return (
    <div
      className="
        w-full
        overflow-hidden
        rounded-xl
        border
        border-[var(--admin-card-border)]
        bg-[var(--admin-card-bg)]
        shadow-[var(--admin-card-shadow)]
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr
              className="
                border-b
                border-[var(--admin-table-border)]
                bg-[var(--admin-table-header-bg)]
              "
            >
              {[
                "User",
                "Contact",
                "Country",
                "Balance",
                "Status",
                "Actions",
              ].map((label) => (
                <th
                  key={label}
                  className="
                    px-3
                    py-2.5
                    text-left
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.08em]
                    text-[var(--admin-table-header-text)]
                    sm:px-4
                    sm:py-3
                  "
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 8 }).map((_, row) => (
              <tr
                key={row}
                className="
                  border-b
                  border-[var(--admin-table-border)]
                "
              >
                {Array.from({ length: 6 }).map((_, cell) => (
                  <td
                    key={cell}
                    className="
                      px-3
                      py-3
                      sm:px-4
                      sm:py-3.5
                    "
                  >
                    <div
                      className="
                        h-3
                        w-full
                        max-w-[140px]
                        animate-pulse
                        rounded
                        bg-[var(--admin-table-header-bg)]
                      "
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function UsersTable({
  users,
  loading,
  onAction,
  onRoleChange,
}: UsersTableProps) {
  const [updatingRole, setUpdatingRole] =
    useState<string | null>(null);

  async function handleRoleChange(
    user: AdminUser,
    nextRole: UserRole,
  ) {
    if (
      updatingRole === user.id ||
      nextRole === user.role
    ) {
      return;
    }

    const fullName =
      `${user.firstName} ${user.lastName}`.trim();

    const confirmed = window.confirm(
      nextRole === "ADMIN"
        ? `Are you sure you want to make ${fullName} an ADMIN? This will grant full administrative access.`
        : `Are you sure you want to remove ADMIN access from ${fullName}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setUpdatingRole(user.id);

      const response = await fetch(
        `/api/admin/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            action: "updateRole",
            role: nextRole,
          }),
        },
      );

      const data =
        await response.json().catch(
          () => null,
        );

      if (!response.ok) {
        throw new Error(
          data?.error ??
            "Unable to update user role.",
        );
      }

      onRoleChange(
        user.id,
        nextRole,
      );

      appToast.success(
        nextRole === "ADMIN"
          ? `${fullName} is now an admin.`
          : `${fullName} is now a regular user.`,
      );
    } catch (error) {
      appToast.error(
        error instanceof Error
          ? error.message
          : "Unable to update user role.",
      );
    } finally {
      setUpdatingRole(null);
    }
  }

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (users.length === 0) {
    return (
      <div
        className="
          flex
          min-h-56
          flex-col
          items-center
          justify-center
          gap-3
          rounded-[var(--admin-card-radius)]
          border
          border-[var(--admin-empty-border)]
          bg-[var(--admin-empty-bg)]
          p-6
          text-center
          shadow-[var(--admin-empty-shadow)]
          sm:min-h-80
          sm:gap-4
          sm:p-10
        "
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-[var(--admin-empty-icon-bg)]
            sm:h-16
            sm:w-16
          "
        >
          <UserIcon
            className="
              h-6
              w-6
              text-[var(--admin-empty-icon-color)]
              sm:h-8
              sm:w-8
            "
          />
        </div>

        <div
          className="
            space-y-1
            sm:space-y-2
          "
        >
          <h3
            className="
              text-sm
              font-semibold
              text-[var(--admin-empty-title)]
              sm:text-lg
            "
          >
            No users found
          </h3>

          <p
            className="
              max-w-md
              text-xs
              leading-5
              text-[var(--admin-empty-text)]
              sm:text-sm
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
        w-full
        overflow-hidden
        rounded-[var(--admin-card-radius)]
        border
        border-[var(--admin-table-border)]
        bg-[var(--admin-table-bg)]
        shadow-[var(--admin-card-shadow)]
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
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
                  px-3
                  py-2.5
                  text-left
                  text-[11px]
                  font-semibold
                  text-[var(--admin-table-header-text)]
                  sm:px-4
                  sm:py-3
                  sm:text-sm
                "
              >
                User
              </th>

              <th
                className="
                  px-3
                  py-2.5
                  text-left
                  text-[11px]
                  font-semibold
                  text-[var(--admin-table-header-text)]
                  sm:px-4
                  sm:py-3
                  sm:text-sm
                "
              >
                Contact
              </th>

              <th
                className="
                  px-3
                  py-2.5
                  text-left
                  text-[11px]
                  font-semibold
                  text-[var(--admin-table-header-text)]
                  sm:px-4
                  sm:py-3
                  sm:text-sm
                "
              >
                Country
              </th>

              <th
                className="
                  px-3
                  py-2.5
                  text-right
                  text-[11px]
                  font-semibold
                  text-[var(--admin-table-header-text)]
                  sm:px-4
                  sm:py-3
                  sm:text-sm
                "
              >
                Balance
              </th>

              <th
                className="
                  px-3
                  py-2.5
                  text-center
                  text-[11px]
                  font-semibold
                  text-[var(--admin-table-header-text)]
                  sm:px-4
                  sm:py-3
                  sm:text-sm
                "
              >
                Status
              </th>

              <th
                className="
                  px-3
                  py-2.5
                  text-right
                  text-[11px]
                  font-semibold
                  text-[var(--admin-table-header-text)]
                  sm:px-4
                  sm:py-3
                  sm:text-sm
                "
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const roleUpdating =
                updatingRole === user.id;

              return (
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
                  <td
                    className="
                      px-3
                      py-3
                      sm:px-4
                      sm:py-3.5
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2.5
                        sm:gap-3
                      "
                    >
                      <div
                        className="
                          relative
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          overflow-hidden
                          rounded-full
                          border
                          border-[var(--admin-table-border)]
                          bg-[var(--admin-surface-bg)]
                          sm:h-10
                          sm:w-10
                        "
                      >
                        {user.avatarKey ? (
                          <Image
                            src={
                              getCloudinaryImageUrl(
                                user.avatarKey,
                                "c_fill,w_80,h_80,f_auto,q_auto",
                              )!
                            }
                            alt={`${user.firstName} ${user.lastName}`}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        ) : (
                          <UserIcon
                            className="
                              h-4
                              w-4
                              text-[var(--admin-muted)]
                              sm:h-5
                              sm:w-5
                            "
                          />
                        )}
                      </div>

                      <div
                        className="
                          min-w-0
                          space-y-1
                        "
                      >
                        <p
                          className="
                            truncate
                            text-xs
                            font-medium
                            text-[var(--admin-table-title)]
                            sm:text-sm
                          "
                        >
                          {user.firstName}{" "}
                          {user.lastName}
                        </p>

                        <div
className="
  relative
  inline-flex
  h-5.5
  items-center
  sm:h-6
"
                        >
                          <select
                            value={user.role}
                            disabled={
                              roleUpdating
                            }
                            aria-label={`Change role for ${user.firstName} ${user.lastName}`}
                            onChange={(event) =>
                              void handleRoleChange(
                                user,
                                event.target
                                  .value as UserRole,
                              )
                            }
className="
  h-5.5
  appearance-none
  rounded
  border
  border-[var(--admin-table-border)]
  bg-[var(--admin-surface-bg)]
  py-0
  pl-1
  pr-4
  text-[8px]
  font-semibold
  tracking-[0.03em]
  text-[var(--admin-table-muted)]
  outline-none
  transition
  focus:border-[var(--admin-button-primary-bg)]
  disabled:cursor-not-allowed
  disabled:opacity-60
  sm:h-6
  sm:pl-1.5
  sm:pr-5
  sm:text-[10px]
"
                          >
                            <option value="USER">
                              USER
                            </option>

                            <option value="ADMIN">
                              ADMIN
                            </option>
                          </select>

                          {roleUpdating ? (
                            <Loader2
className="
  pointer-events-none
  absolute
  right-0.75
  h-2
  w-2
  text-[var(--admin-muted)]
  sm:right-1
  sm:h-2.5
  sm:w-2.5
"
                            />
                          ) : (
                            <ChevronDown
className="
  pointer-events-none
  absolute
  right-0.75
  h-2
  w-2
  text-[var(--admin-muted)]
  sm:right-1
  sm:h-2.5
  sm:w-2.5
"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td
                    className="
                      px-3
                      py-3
                      sm:px-4
                      sm:py-3.5
                    "
                  >
                    <div
                      className="
                        space-y-1
                        sm:space-y-1.5
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-1.5
                          text-xs
                          text-[var(--admin-table-text)]
                          sm:gap-2
                          sm:text-sm
                        "
                      >
                        <Mail
                          className="
                            h-3.5
                            w-3.5
                            shrink-0
                            sm:h-4
                            sm:w-4
                          "
                        />

                        <span className="truncate">
                          {user.email}
                        </span>
                      </div>

                      <div
                        className="
                          flex
                          items-center
                          gap-1.5
                          text-[11px]
                          text-[var(--admin-table-muted)]
                          sm:gap-2
                          sm:text-sm
                        "
                      >
                        <Phone
                          className="
                            h-3.5
                            w-3.5
                            shrink-0
                            sm:h-4
                            sm:w-4
                          "
                        />

                        <span>
                          {user.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td
                    className="
                      px-3
                      py-3
                      sm:px-4
                      sm:py-3.5
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-xs
                        text-[var(--admin-table-text)]
                        sm:gap-2
                        sm:text-sm
                      "
                    >
                      <MapPin
                        className="
                          h-3.5
                          w-3.5
                          shrink-0
                          sm:h-4
                          sm:w-4
                        "
                      />

                      <span>
                        {user.country}
                      </span>
                    </div>
                  </td>

                  <td
                    className="
                      px-3
                      py-3
                      text-right
                      text-xs
                      font-medium
                      text-[var(--admin-table-text)]
                      sm:px-4
                      sm:py-3.5
                      sm:text-sm
                    "
                  >
                    {currency.format(
                      Number(user.balance),
                    )}
                  </td>

                  <td
                    className="
                      px-3
                      py-3
                      text-center
                      sm:px-4
                      sm:py-3.5
                    "
                  >
                    <UserStatusBadge
                      status={user.status}
                    />
                  </td>

                  <td
                    className="
                      px-3
                      py-3
                      sm:px-4
                      sm:py-3.5
                    "
                  >
                    <div className="flex justify-end">
                      <UserActions
                        status={user.status}
                        onAction={(action) =>
                          onAction(
                            user,
                            action,
                          )
                        }
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}