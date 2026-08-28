"use client";

import type {
  ProductCategory,
} from "@/types/category.types";

type DeleteCategoryDialogProps = {
  open: boolean;

  category: ProductCategory | null;

  loading?: boolean;

  onClose: () => void;

  onConfirm: () => Promise<void>;
};

export default function DeleteCategoryDialog({
  open,
  category,
  loading = false,
  onClose,
  onConfirm,
}: DeleteCategoryDialogProps) {
    
if (!open || !category) {
  return null;
}

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/60
        backdrop-blur-sm
        p-6
      "
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-category-title"
        onClick={(event) =>
          event.stopPropagation()
        }
        className="
          w-full
          max-w-md
          rounded-[var(--admin-surface-radius)]
          border
          border-[var(--admin-card-border)]
          bg-[var(--admin-card-bg)]
          p-6
          shadow-2xl
        "
      >
        <h2
          id="delete-category-title"
          className="
            text-xl
            font-semibold
            text-[var(--admin-title)]
          "
        >
          Delete Category
        </h2>

        <p
          className="
            mt-3
            text-sm
            leading-6
            text-[var(--admin-muted)]
          "
        >
          Are you sure you want to delete{" "}
<span className="font-semibold">
  {category.name}
</span>
          ? This action cannot be undone.
        </p>

        <div
          className="
            mt-6
            flex
            justify-end
            gap-3
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
              border-[var(--admin-card-border)]
              px-4
              text-sm
              font-medium
              transition
              hover:bg-[var(--admin-hover)]
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
              rounded-[var(--admin-input-radius)]
              bg-red-600
              px-4
              text-sm
              font-medium
              text-white
              transition
              hover:bg-red-700
              disabled:opacity-60
            "
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}