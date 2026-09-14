"use client";

import { useState } from "react";

import Image from "next/image";

import {
  AlertTriangle,
  Check,
  ChevronDown,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User as UserIcon,
  X,
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

type PendingRoleChange = {
  user: AdminUser;
  nextRole: UserRole;
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

  const [pendingRoleChange, setPendingRoleChange] =
    useState<PendingRoleChange | null>(null);

  function handleRoleChange(
    user: AdminUser,
    nextRole: UserRole,
  ) {
    if (
      updatingRole === user.id ||
      pendingRoleChange ||
      nextRole === user.role
    ) {
      return;
    }

    setPendingRoleChange({
      user,
      nextRole,
    });
  }

  function cancelRoleChange() {
    if (updatingRole) {
      return;
    }

    setPendingRoleChange(null);
  }

  async function confirmRoleChange() {
    if (!pendingRoleChange) {
      return;
    }

    const {
      user,
      nextRole,
    } = pendingRoleChange;

    const fullName =
      `${user.firstName} ${user.lastName}`.trim();

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

      setPendingRoleChange(null);
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
    <>
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
                                roleUpdating ||
                                !!pendingRoleChange
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
                                  animate-spin
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

      {pendingRoleChange && (
        <div
          className="
            fixed
            inset-0
            z-[200]
            flex
            items-center
            justify-center
            bg-black/45
            p-3
            backdrop-blur-[3px]
            sm:p-5
          "
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              cancelRoleChange();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="role-change-title"
            aria-describedby="role-change-description"
            className="
              w-full
              max-w-[310px]
              overflow-hidden
              rounded-xl
              border
              border-[var(--admin-card-border)]
              bg-[var(--admin-card-bg)]
              shadow-[0_20px_60px_rgba(0,0,0,0.28)]
              sm:max-w-[420px]
              sm:rounded-2xl
            "
          >
            <div
              className="
                flex
                items-start
                gap-2.5
                px-3
                py-3
                sm:gap-3
                sm:px-5
                sm:py-4
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[var(--admin-table-header-bg)]
                  text-[var(--admin-button-primary-bg)]
                  sm:h-10
                  sm:w-10
                  sm:rounded-xl
                "
              >
                {pendingRoleChange.nextRole ===
                "ADMIN" ? (
                  <ShieldCheck
                    className="
                      h-4
                      w-4
                      sm:h-5
                      sm:w-5
                    "
                  />
                ) : (
                  <AlertTriangle
                    className="
                      h-4
                      w-4
                      sm:h-5
                      sm:w-5
                    "
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h2
                    id="role-change-title"
                    className="
                      text-[12px]
                      font-semibold
                      leading-4
                      text-[var(--admin-table-title)]
                      sm:text-sm
                      sm:leading-5
                    "
                  >
                    {pendingRoleChange.nextRole ===
                    "ADMIN"
                      ? "Grant admin access?"
                      : "Remove admin access?"}
                  </h2>

                  <button
                    type="button"
                    onClick={cancelRoleChange}
                    disabled={!!updatingRole}
                    aria-label="Close confirmation"
                    className="
                      flex
                      h-6
                      w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-md
                      text-[var(--admin-muted)]
                      transition
                      hover:bg-[var(--admin-table-header-bg)]
                      hover:text-[var(--admin-table-title)]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      sm:h-7
                      sm:w-7
                    "
                  >
                    <X
                      className="
                        h-3.5
                        w-3.5
                        sm:h-4
                        sm:w-4
                      "
                    />
                  </button>
                </div>

                <p
                  id="role-change-description"
                  className="
                    mt-1
                    text-[9px]
                    leading-3.5
                    text-[var(--admin-table-muted)]
                    sm:mt-1.5
                    sm:text-xs
                    sm:leading-5
                  "
                >
                  {pendingRoleChange.nextRole ===
                  "ADMIN"
                    ? `You're about to give ${pendingRoleChange.user.firstName} ${pendingRoleChange.user.lastName} full administrative access.`
                    : `You're about to remove administrative access from ${pendingRoleChange.user.firstName} ${pendingRoleChange.user.lastName}.`}
                </p>
              </div>
            </div>

            <div
              className="
                flex
                gap-2
                border-t
                border-[var(--admin-card-border)]
                px-3
                py-2.5
                sm:justify-end
                sm:px-5
                sm:py-3
              "
            >
              <button
                type="button"
                onClick={cancelRoleChange}
                disabled={!!updatingRole}
                className="
                  inline-flex
                  h-7
                  flex-1
                  items-center
                  justify-center
                  gap-1
                  rounded-md
                  border
                  border-[var(--admin-card-border)]
                  bg-[var(--admin-table-header-bg)]
                  px-2.5
                  text-[9px]
                  font-medium
                  text-[var(--admin-table-title)]
                  transition
                  hover:opacity-90
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:h-9
                  sm:flex-none
                  sm:px-4
                  sm:text-xs
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  void confirmRoleChange()
                }
                disabled={!!updatingRole}
                className="
                  inline-flex
                  h-7
                  flex-1
                  items-center
                  justify-center
                  gap-1
                  rounded-md
                  bg-[var(--admin-button-primary-bg)]
                  px-2.5
                  text-[9px]
                  font-semibold
                  text-[var(--admin-button-primary-text)]
                  shadow-sm
                  transition
                  hover:opacity-90
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:h-9
                  sm:flex-none
                  sm:px-4
                  sm:text-xs
                "
              >
                {updatingRole ? (
                  <>
                    <Loader2
                      className="
                        h-3
                        w-3
                        animate-spin
                      "
                    />
                    Updating
                  </>
                ) : (
                  <>
                    <Check
                      className="
                        h-3
                        w-3
                      "
                    />
                    Confirm
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}