"use client";

import {
  Loader2,
  TriangleAlert,
} from "lucide-react";

import {
  useEffect,
  useRef,
} from "react";

import type { AdminUser } from "./user.types";

type UserAction =
  | "activate"
  | "deactivate"
  | "restore"
  | "approveDeletion"
  | "delete";

type UserActionModalProps = {
  open: boolean;
  user: AdminUser | null;
  action: UserAction | null;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ACTIONS: Record<
  UserAction,
  {
    title: string;
    description: (
      name: string,
    ) => string;
    confirm: string;
    danger: boolean;
  }
> = {
  activate: {
    title: "Activate User",
    description: (name) =>
      `Are you sure you want to activate ${name}?`,
    confirm: "Activate",
    danger: false,
  },

  deactivate: {
    title: "Deactivate User",
    description: (name) =>
      `Are you sure you want to deactivate ${name}?`,
    confirm: "Deactivate",
    danger: false,
  },

  restore: {
    title: "Restore Account",
    description: (name) =>
      `Restore ${name}'s account and cancel the deletion request?`,
    confirm: "Restore",
    danger: false,
  },

  approveDeletion: {
    title: "Approve Deletion",
    description: (name) =>
      `This action permanently deletes ${name}'s account and cannot be undone.`,
    confirm: "Approve Deletion",
    danger: true,
  },

  delete: {
    title: "Delete User",
    description: (name) =>
      `Permanently delete ${name}? This action cannot be undone.`,
    confirm: "Delete Permanently",
    danger: true,
  },
};

export default function UserActionModal({
  open,
  user,
  action,
  loading = false,
  onClose,
  onConfirm,
}: UserActionModalProps) {
  const confirmRef =
    useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previous =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    confirmRef.current?.focus();

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (
        event.key === "Escape" &&
        !loading
      ) {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previous;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    open,
    loading,
    onClose,
  ]);

  if (
    !open ||
    !user ||
    !action
  ) {
    return null;
  }

  const config =
    ACTIONS[action];

  const fullName =
    `${user.firstName} ${user.lastName}`;

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/70
        p-4
        backdrop-blur-sm
        animate-in
        fade-in
        duration-200
      "
      onClick={() => {
        if (!loading) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-action-title"
        onClick={(event) =>
          event.stopPropagation()
        }
        className="
          w-full
          max-w-lg
          rounded-2xl
          border
          p-6
          shadow-2xl
          animate-in
          zoom-in-95
          duration-200
        "
        style={{
          background:
            "var(--admin-card-bg)",
          borderColor:
            "var(--admin-card-border)",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-full
            "
            style={{
              background:
                config.danger
                  ? "rgba(220,38,38,.15)"
                  : "rgba(59,130,246,.15)",
            }}
          >
            <TriangleAlert
              className="h-6 w-6"
              color={
                config.danger
                  ? "#dc2626"
                  : "#2563eb"
              }
            />
          </div>

          <div className="space-y-2">
            <h2
              id="user-action-title"
              className="text-xl font-semibold"
              style={{
                color:
                  "var(--admin-title)",
              }}
            >
              {config.title}
            </h2>

            <p
              className="text-sm leading-6"
              style={{
                color:
                  "var(--admin-muted)",
              }}
            >
              {config.description(
                fullName,
              )}
            </p>
          </div>
        </div>

        <div
          className="
            mt-8
            flex
            justify-end
            gap-3
          "
        >
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="
              rounded-xl
              border
              px-5
              py-2.5
              text-sm
              font-medium
              transition
              disabled:opacity-50
            "
            style={{
              background:
                "var(--admin-button-secondary-bg)",
              color:
                "var(--admin-button-secondary-text)",
              borderColor:
                "var(--admin-button-secondary-border)",
            }}
          >
            Cancel
          </button>

          <button
            ref={confirmRef}
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              px-5
              py-2.5
              text-sm
              font-medium
              transition
              disabled:opacity-50
            "
            style={{
              background:
                config.danger
                  ? "var(--admin-button-danger-bg)"
                  : "var(--admin-button-primary-bg)",

              color:
                config.danger
                  ? "var(--admin-button-danger-text)"
                  : "var(--admin-button-primary-text)",
            }}
          >
            {loading && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}

            {loading
              ? "Processing..."
              : config.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}