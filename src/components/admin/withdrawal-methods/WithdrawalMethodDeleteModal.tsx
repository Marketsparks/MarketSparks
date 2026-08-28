"use client";

import { AlertTriangle } from "lucide-react";

import type {
  WithdrawalMethod,
} from "./withdrawal-method.types";

type WithdrawalMethodDeleteModalProps = {
  open: boolean;

  loading?: boolean;

  method?: WithdrawalMethod;

  onClose: () => void;

  onDelete?: () => void;
};

export default function WithdrawalMethodDeleteModal({
  open,
  loading = false,
  method,
  onClose,
  onDelete,
}: WithdrawalMethodDeleteModalProps) {
  if (!open || !method) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-[var(--admin-modal-overlay)]
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-lg
          overflow-hidden
          rounded-[var(--admin-modal-radius)]
          border
          border-[var(--admin-modal-border)]
          bg-[var(--admin-modal-bg)]
          shadow-[var(--admin-modal-shadow)]
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
            border-b
            border-[var(--admin-modal-border)]
            bg-[var(--admin-modal-header-bg)]
            px-6
            py-8
            text-center
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
              bg-[var(--admin-status-failed-bg)]
            "
          >
            <AlertTriangle
              size={30}
              className="
                text-[var(--admin-status-failed-text)]
              "
            />
          </div>

          <h2
            className="
              mt-5
              text-xl
              font-bold
              text-[var(--admin-title)]
            "
          >
            Delete Withdrawal Method
          </h2>

          <p
            className="
              mt-3
              max-w-md
              text-sm
              leading-6
              text-[var(--admin-muted)]
            "
          >
            You are about to permanently delete{" "}
            <span
              className="
                font-semibold
                text-[var(--admin-text)]
              "
            >
              {method.name}
            </span>
            .

            <br />

            This action cannot be undone.
          </p>
        </div>

        <div
          className="
            flex
            flex-col-reverse
            gap-3
            bg-[var(--admin-modal-footer-bg)]
            p-6

            sm:flex-row
            sm:justify-end
          "
        >
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="
              h-11
              rounded-[var(--admin-input-radius)]
              border
              border-[var(--admin-button-secondary-border)]
              bg-[var(--admin-button-secondary-bg)]
              px-5
              text-sm
              font-semibold
              text-[var(--admin-button-secondary-text)]
              transition-all
              duration-300
              hover:bg-[var(--admin-button-secondary-hover)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onDelete}
            className="
              h-11
              rounded-[var(--admin-input-radius)]
              bg-[var(--admin-button-danger-bg)]
              px-5
              text-sm
              font-semibold
              text-[var(--admin-button-danger-text)]
              transition-all
              duration-300
              hover:bg-[var(--admin-button-danger-hover)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? "Deleting..." : "Delete Method"}
          </button>
        </div>
      </div>
    </div>
  );
}