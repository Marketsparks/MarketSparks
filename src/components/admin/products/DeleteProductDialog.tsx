"use client";

import {
  AlertTriangle,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

type DeleteProductDialogProps = {
  open: boolean;
  productName: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
};

export default function DeleteProductDialog({
  open,
  productName,
  loading = false,
  onClose,
  onConfirm,
}: DeleteProductDialogProps) {
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
        bg-black/60
        p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-[var(--admin-surface-radius)]
          border
          border-[var(--admin-card-border)]
          bg-[var(--admin-card-bg)]
          shadow-2xl
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[var(--admin-card-border)]
            p-[var(--space-lg)]
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
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
                bg-[var(--admin-button-danger-bg)]
                text-[var(--admin-button-danger-text)]
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
                Delete Product
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-[var(--admin-muted)]
                "
              >
                This action cannot be
                undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="
              inline-flex
              h-9
              w-9
              items-center
              justify-center
              rounded-[var(--admin-input-radius)]
              border
              border-[var(--admin-button-secondary-border)]
              bg-[var(--admin-button-secondary-bg)]
              transition
              hover:bg-[var(--admin-button-secondary-hover)]
            "
          >
            <X size={16} />
          </button>
        </div>

        <div
          className="
            space-y-[var(--space-md)]
            p-[var(--space-lg)]
          "
        >
          <p
            className="
              text-sm
              leading-6
              text-[var(--admin-muted)]
            "
          >
            Are you sure you want to
            permanently delete
            <span
              className="
                mx-1
                font-semibold
                text-[var(--admin-title)]
              "
            >
              "{productName}"
            </span>
            ?
          </p>

          <div
            className="
              rounded-[var(--admin-input-radius)]
              border
              border-[var(--admin-status-warning-border)]
              bg-[var(--admin-status-warning-bg)]
              p-3
              text-xs
              leading-5
              text-[var(--admin-status-warning-text)]
            "
          >
            All associated images,
            variants and specifications
            will also be permanently
            removed.
          </div>
        </div>

        <div
          className="
            flex
            justify-end
            gap-3
            border-t
            border-[var(--admin-card-border)]
            p-[var(--space-lg)]
          "
        >
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
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
              transition
              hover:bg-[var(--admin-button-secondary-hover)]
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
              hover:opacity-90
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Delete Product
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}