"use client";

import { useMemo, useState } from "react";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import CategoryForm from "./CategoryForm";
import CategoriesTable from "./CategoriesTable";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

import type {
  ProductCategory,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/types/category.types";

type CategoriesPageProps = {
  categories: ProductCategory[];

  onCreate: (
    values: CreateCategoryInput
  ) => Promise<void>;

  onUpdate: (
    id: string,
    values: UpdateCategoryInput
  ) => Promise<void>;

  onDelete: (
    id: string
  ) => Promise<void>;
};

export default function CategoriesPage({
  categories,
  onCreate,
  onUpdate,
  onDelete,
}: CategoriesPageProps) {
  const [createOpen, setCreateOpen] =
    useState(false);

  const [editing, setEditing] =
    useState<ProductCategory | null>(null);

  const [deleting, setDeleting] =
    useState<ProductCategory | null>(null);

  const [loading, setLoading] =
    useState(false);

  const sortedCategories = useMemo(
    () =>
      [...categories].sort((a, b) => {
        if (
          a.sortOrder !== b.sortOrder
        ) {
          return (
            a.sortOrder -
            b.sortOrder
          );
        }

        return a.name.localeCompare(
          b.name
        );
      }),
    [categories]
  );

  async function handleCreate(
    values: CreateCategoryInput
  ) {
    try {
      setLoading(true);

      await onCreate(values);

      toast.success(
        "Category created."
      );

      setCreateOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to create category."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(
    values: UpdateCategoryInput
  ) {
    if (!editing) {
      return;
    }

    try {
      setLoading(true);

      await onUpdate(
        editing.id,
        values
      );

      toast.success(
        "Category updated."
      );

      setEditing(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update category."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!deleting) {
      return;
    }

    try {
      setLoading(true);

      await onDelete(
        deleting.id
      );

      toast.success(
        "Category deleted."
      );

      setDeleting(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to delete category."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        flex
        flex-col
        gap-[var(--space-lg)]
      "
    >
      <div
        className="
          flex
          flex-col
          gap-[var(--space-md)]
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h1
            className="
              text-xl
              font-semibold
              text-[var(--admin-title)]
            "
          >
            Product Categories
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-[var(--admin-muted)]
            "
          >
            Organize products with
            compact category
            management.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setCreateOpen(true)
          }
          className="
            inline-flex
            h-10
            items-center
            justify-center
            gap-2
            rounded-[var(--admin-input-radius)]
            bg-[var(--admin-button-primary-bg)]
            px-4
            text-sm
            font-medium
            text-[var(--admin-button-primary-text)]
            transition
            hover:bg-[var(--admin-button-primary-hover)]
          "
        >
          <Plus
            size={16}
          />

          New Category
        </button>
      </div>

      <CategoriesTable
        categories={
          sortedCategories
        }
        onEdit={setEditing}
        onDelete={setDeleting}
      />

      {createOpen && (
        <div
          className="
            fixed
            inset-0
            z-50
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
              max-w-2xl
              rounded-[var(--admin-modal-radius)]
              border
              border-[var(--admin-modal-border)]
              bg-[var(--admin-modal-bg)]
              p-5
              shadow-[var(--admin-modal-shadow)]
            "
          >
            <div
              className="
                mb-[var(--space-lg)]
              "
            >
              <h2
                className="
                  text-lg
                  font-semibold
                  text-[var(--admin-title)]
                "
              >
                Create Category
              </h2>
            </div>

            <CategoryForm
              loading={loading}
              submitLabel="Create Category"
              onSubmit={
                handleCreate
              }
            />

            <div
              className="
                mt-[var(--space-lg)]
                flex
                justify-end
              "
            >
              <button
                type="button"
                onClick={() =>
                  setCreateOpen(
                    false
                  )
                }
                className="
                  h-10
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
                "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {editing && (
        <div
          className="
            fixed
            inset-0
            z-50
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
              max-w-2xl
              rounded-[var(--admin-modal-radius)]
              border
              border-[var(--admin-modal-border)]
              bg-[var(--admin-modal-bg)]
              p-5
              shadow-[var(--admin-modal-shadow)]
            "
          >
            <div
              className="
                mb-[var(--space-lg)]
              "
            >
              <h2
                className="
                  text-lg
                  font-semibold
                  text-[var(--admin-title)]
                "
              >
                Edit Category
              </h2>
            </div>

<CategoryForm
  initialValues={{
    name: editing.name,
    slug: editing.slug,
    description: editing.description ?? "",
    imageKey: editing.imageKey ?? "",
    isActive: editing.isActive,
    sortOrder: editing.sortOrder,
  }}
  loading={loading}
  submitLabel="Save Changes"
  onSubmit={handleUpdate}
/>

<div
  className="
    mt-[var(--space-lg)]
    flex
    justify-end
  "
>
                <button
                  type="button"
                  onClick={() =>
                    setEditing(
                      null
                    )
                  }
                  className="
                    h-10
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
                  "
                >
                  Cancel
                </button>
            </div>
          </div>
        </div>
      )}

<DeleteCategoryDialog
  open={!!deleting}
  loading={loading}
  categoryName={deleting?.name ?? ""}
  onClose={() => setDeleting(null)}
  onConfirm={handleDelete}
/>
    </div>
  );
}