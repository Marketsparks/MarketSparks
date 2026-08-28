"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { appToast } from "@/lib/toast";

import {
  activateUser,
  approveDeletion,
  deactivateUser,
  deleteUser,
  getUsers,
  restoreUser,
} from "./user.service";

import { UserFilters } from "./UserFilters";
import { UsersTable } from "./UsersTable";

import type {
  AdminUser,
  UsersResponse,
  UserStatusFilter,
} from "./user.types";

import UserActionModal from "./UserActionModal";

const DEFAULT_PAGE = 1;

const DEFAULT_LIMIT = 10;

export function UserManagementPage() {
  const [users, setUsers] =
    useState<AdminUser[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState<UserStatusFilter>(
      "ALL",
    );

  const [page, setPage] =
    useState(DEFAULT_PAGE);

  const [totalPages, setTotalPages] =
    useState(1);

  const [totalUsers, setTotalUsers] =
    useState(0);

const [selectedUser, setSelectedUser] =
  useState<AdminUser | null>(null);

const [pendingAction, setPendingAction] =
  useState<
    | "activate"
    | "deactivate"
    | "restore"
    | "approveDeletion"
    | "delete"
    | null
  >(null);

const [submitting, setSubmitting] =
  useState(false);

  const loadUsers =
    useCallback(async () => {
      try {
        setLoading(true);

        const response: UsersResponse =
          await getUsers({
            page,
            limit:
              DEFAULT_LIMIT,
            search,
            status,
          });

        setUsers(
          response.data.users,
        );

        setTotalPages(
          response.data
            .pagination
            .totalPages,
        );

        setTotalUsers(
          response.data
            .pagination
            .total,
        );
      } catch (error) {
        appToast.error(
          error instanceof Error
            ? error.message
            : "Unable to load users.",
        );
      } finally {
        setLoading(false);
      }
    }, [
      page,
      search,
      status,
    ]);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  function handleSearchChange(
    value: string,
  ) {
    setPage(1);
    setSearch(value);
  }

  function handleStatusChange(
    value: UserStatusFilter,
  ) {
    setPage(1);
    setStatus(value);
  }

function handleUserAction(
  user: AdminUser,
  action:
    | "activate"
    | "deactivate"
    | "restore"
    | "approveDeletion"
    | "delete",
) {
  setSelectedUser(user);
  setPendingAction(action);
}

async function handleConfirmAction() {
  if (
    !selectedUser ||
    !pendingAction
  ) {
    return;
  }

  try {
    setSubmitting(true);

    switch (pendingAction) {
      case "activate":
        await activateUser(
          selectedUser.id,
        );
        break;

      case "deactivate":
        await deactivateUser(
          selectedUser.id,
        );
        break;

      case "restore":
        await restoreUser(
          selectedUser.id,
        );
        break;

      case "approveDeletion":
        await approveDeletion(
          selectedUser.id,
        );
        break;

      case "delete":
        await deleteUser(
          selectedUser.id,
        );
        break;
    }

    appToast.success(
      "User updated successfully.",
    );

    setSelectedUser(null);
    setPendingAction(null);

    await loadUsers();
  } catch (error) {
    appToast.error(
      error instanceof Error
        ? error.message
        : "Unable to update user.",
    );
  } finally {
    setSubmitting(false);
  }
}

    return (
    <>
      <header
        className="
          flex
          flex-col
          gap-2
        "
      >
        <h1
          className="
            text-3xl
            font-bold
          "
          style={{
            color:
              "var(--admin-title)",
          }}
        >
          User Management
        </h1>

        <p
          className="text-sm"
          style={{
            color:
              "var(--admin-muted)",
          }}
        >
          Manage user accounts, account status, and deletion requests.
        </p>

        <p
          className="text-sm"
          style={{
            color:
              "var(--admin-muted)",
          }}
        >
          Total Users: {totalUsers}
        </p>
      </header>

      <UserFilters
        search={search}
        status={status}
        onSearchChange={
          handleSearchChange
        }
        onStatusChange={
          handleStatusChange
        }
      />

      <UsersTable
        users={users}
        loading={loading}
        onAction={
          handleUserAction
        }
      />

      <footer
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <button
          type="button"
          onClick={() =>
            setPage(
              (current) =>
                Math.max(
                  1,
                  current - 1,
                ),
            )
          }
          disabled={
            page === 1 ||
            loading
          }
          className="
            rounded-xl
            border
            px-4
            py-2
            text-sm
            font-medium
            transition
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          style={{
            background:
              "var(--admin-button-secondary-bg)",
            borderColor:
              "var(--admin-button-secondary-border)",
            color:
              "var(--admin-button-secondary-text)",
          }}
        >
          Previous
        </button>

        <span
          className="text-sm"
          style={{
            color:
              "var(--admin-muted)",
          }}
        >
          Page {page} of{" "}
          {totalPages}
        </span>

        <button
          type="button"
          onClick={() =>
            setPage(
              (current) =>
                Math.min(
                  totalPages,
                  current + 1,
                ),
            )
          }
          disabled={
            page >=
              totalPages ||
            loading
          }
          className="
            rounded-xl
            border
            px-4
            py-2
            text-sm
            font-medium
            transition
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          style={{
            background:
              "var(--admin-button-primary-bg)",
            color:
              "var(--admin-button-primary-text)",
            borderColor:
              "transparent",
          }}
        >
          Next
        </button>
      </footer>

<UserActionModal
  open={
    selectedUser !== null &&
    pendingAction !== null
  }
  user={selectedUser}
  action={pendingAction}
  loading={submitting}
  onClose={() => {
    if (submitting) {
      return;
    }

    setSelectedUser(null);
    setPendingAction(null);
  }}
  onConfirm={
    handleConfirmAction
  }
/>
    </>

  );
}