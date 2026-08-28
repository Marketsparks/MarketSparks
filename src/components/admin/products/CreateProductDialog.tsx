"use client";

import { X } from "lucide-react";

import type {
  ProductCategory,
} from "@/types/category.types";

import type {
  CreateProductInput,
} from "@/validation/product.validation";

import ProductForm from "./ProductForm";

type CreateProductDialogProps = {
  open: boolean;

  categories: ProductCategory[];

  loading?: boolean;

  onClose: () => void;

  onSubmit: (
    values: CreateProductInput,
  ) => Promise<void>;
};

export default function CreateProductDialog({
  open,
  categories,
  loading = false,
  onClose,
  onSubmit,
}: CreateProductDialogProps) {
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
        aria-labelledby="create-product-title"
        onClick={(event) =>
          event.stopPropagation()
        }
        className="
          flex
          h-[100dvh]
          w-full
          flex-col
          overflow-hidden
          rounded-none
          border
          border-[var(--admin-card-border)]
          bg-[var(--admin-card-bg)]
          shadow-2xl
          sm:h-auto
          sm:max-h-[92vh]
          sm:max-w-6xl
          sm:rounded-[var(--admin-surface-radius)]
        "
      >
        <header
          className="
            sticky
            top-0
            z-10
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
              id="create-product-title"
              className="
                text-xl
                font-semibold
                text-[var(--admin-title)]
              "
            >
              Create Product
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-[var(--admin-muted)]
              "
            >
              Add a new product to your marketplace.
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
            flex-1
            overflow-y-auto
            px-5
            py-6
            sm:px-8
          "
        >
          <ProductForm
            categories={categories}
            loading={loading}
            submitLabel="Create Product"
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}