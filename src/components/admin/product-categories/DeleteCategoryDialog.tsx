"use client";

import {
  AlertTriangle,
  Loader2,
} from "lucide-react";

type DeleteCategoryDialogProps = {
  open: boolean;

  categoryName: string;

  loading?: boolean;

  onClose: () => void;

  onConfirm: () => Promise<void> | void;
};

export default function DeleteCategoryDialog({
  open,
  categoryName,
  loading = false,
  onClose,
  onConfirm,
}: DeleteCategoryDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-[var(--admin-modal-overlay)]
        p-[var(--space-lg)]
      "
    >
      <div
        className="
          w-full
          max-w-md
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
            items-center
            gap-[var(--space-md)]
            border-b
            border-[var(--admin-modal-border)]
            bg-[var(--admin-modal-header-bg)]
            px-[var(--space-xl)]
            py-[var(--space-lg)]
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-[var(--admin-plan-disabled-bg)]
              text-[var(--admin-button-danger-bg)]
            "
          >
            <AlertTriangle
              size={20}
            />
          </div>

          <div>
            <h2
              className="
                text-base
                font-semibold
                text-[var(--admin-title)]
              "
            >
              Delete Category
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-[var(--admin-muted)]
              "
            >
              This action cannot be
              undone.
            </p>
          </div>
        </div>

        <div
          className="
            px-[var(--space-xl)]
            py-[var(--space-lg)]
          "
        >
          <p
            className="
              text-sm
              leading-6
              text-[var(--admin-text)]
            "
          >
            Are you sure you want to
            permanently delete{" "}
            <span className="font-semibold">
              {categoryName}
            </span>
            ?
          </p>
        </div>

        <div
          className="
            flex
            flex-col-reverse
            gap-[var(--space-sm)]
            border-t
            border-[var(--admin-modal-border)]
            bg-[var(--admin-modal-footer-bg)]
            p-[var(--space-lg)]
            sm:flex-row
            sm:justify-end
          "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              inline-flex
              h-10
              items-center
              justify-center
              rounded-[var(--admin-input-radius)]
              border
              border-[var(--admin-button-secondary-border)]
              bg-[var(--admin-button-secondary-bg)]
              px-4
              text-sm
              font-medium
              text-[var(--admin-button-secondary-text)]
              transition
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
            onClick={onConfirm}
            className="
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-[var(--admin-input-radius)]
              bg-[var(--admin-button-danger-bg)]
              px-4
              text-sm
              font-medium
              text-[var(--admin-button-danger-text)]
              transition
              hover:bg-[var(--admin-button-danger-hover)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading && (
              <Loader2
                size={16}
                className="animate-spin"
              />
            )}

            {loading
              ? "Deleting..."
              : "Delete Category"}
          </button>
        </div>
      </div>
    </div>
  );
}