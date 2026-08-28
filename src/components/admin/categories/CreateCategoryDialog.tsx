"use client";

import { X } from "lucide-react";

import type {
  CreateCategoryInput,
} from "@/types/category.types";

import CategoryForm from "./CategoryForm";

type CreateCategoryDialogProps = {
  open: boolean;

  loading?: boolean;

  onClose: () => void;

  onSubmit: (
    values: CreateCategoryInput,
  ) => Promise<void>;
};

export default function CreateCategoryDialog({
  open,
  loading = false,
  onClose,
  onSubmit,
}: CreateCategoryDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-end
        justify-center
        bg-black/60
        backdrop-blur-md
        p-0
        sm:items-center
        sm:p-6
      "
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-category-title"
        onClick={(event) =>
          event.stopPropagation()
        }
        className="
          flex
          h-auto
          w-full
          flex-col
          overflow-hidden
          rounded-none
          border
          border-[var(--admin-card-border)]
          bg-[var(--admin-card-bg)]
          shadow-2xl
          sm:max-w-2xl
          sm:rounded-[var(--admin-surface-radius)]
        "
      >
        <header
          className="
            flex
            items-center
            justify-between
            border-b
            border-[var(--admin-card-border)]
            bg-[var(--admin-card-bg)]
            px-6
            py-5
          "
        >
          <div>
            <h2
              id="create-category-title"
              className="
                text-xl
                font-semibold
                text-[var(--admin-title)]
              "
            >
              Create Category
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-[var(--admin-muted)]
              "
            >
              Add a new product category.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              text-[var(--admin-muted)]
              transition-colors
              hover:bg-[var(--admin-hover)]
              hover:text-[var(--admin-title)]
              disabled:pointer-events-none
              disabled:opacity-50
            "
          >
            <X size={20} />
          </button>
        </header>

        <div
          className="
            px-6
            py-6
          "
        >
          <CategoryForm
            loading={loading}
            submitLabel="Create Category"
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}