"use client";

import {
  Edit,
  Trash2,
} from "lucide-react";

import type {
  ProductCategory,
} from "@/types/category.types";

import CategoryStatusBadge from "./CategoryStatusBadge";

type CategoriesTableProps = {
  categories: ProductCategory[];

  loading?: boolean;

  onEdit: (
    category: ProductCategory,
  ) => void;

  onDelete: (
    category: ProductCategory,
  ) => void;
};

export default function CategoriesTable({
  categories,
  loading = false,
  onEdit,
  onDelete,
}: CategoriesTableProps) {
  if (loading) {
    return (
      <div
        className="
          rounded-[var(--admin-surface-radius)]
          border
          border-[var(--admin-card-border)]
          bg-[var(--admin-card-bg)]
          p-10
          text-center
          text-sm
          text-[var(--admin-muted)]
        "
      >
        Loading categories...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div
        className="
          rounded-[var(--admin-surface-radius)]
          border
          border-[var(--admin-card-border)]
          bg-[var(--admin-card-bg)]
          p-10
          text-center
          text-sm
          text-[var(--admin-muted)]
        "
      >
        No categories found.
      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-[var(--admin-surface-radius)]
        border
        border-[var(--admin-card-border)]
        bg-[var(--admin-card-bg)]
      "
    >
      <div className="overflow-x-auto">
        <table
          className="
            min-w-full
            border-collapse
          "
        >
          <thead
            className="
              bg-[var(--admin-table-header-bg)]
            "
          >
            <tr>
              {[
                "Category",
                "Slug",
                "Products",
                "Status",
                "Sort Order",
                "Actions",
              ].map((title) => (
                <th
                  key={title}
                  className="
                    px-5
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-[var(--admin-muted)]
                  "
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {categories.map(
              (category) => (
                <tr
                  key={category.id}
                  className="
                    border-t
                    border-[var(--admin-card-border)]
                    transition
                    hover:bg-[var(--admin-hover-bg)]
                  "
                >
                  <td
                    className="
                      px-5
                      py-4
                      font-medium
                      text-[var(--admin-title)]
                    "
                  >
                    {category.name}
                  </td>

                  <td
                    className="
                      px-5
                      py-4
                      text-sm
                      text-[var(--admin-muted)]
                    "
                  >
                    {category.slug}
                  </td>

                  <td
                    className="
                      px-5
                      py-4
                      text-sm
                    "
                  >
                    {category._count
                      ?.products ?? 0}
                  </td>

                  <td className="px-5 py-4">
                    <CategoryStatusBadge
                      isActive={
                        category.isActive
                      }
                    />
                  </td>

                  <td
                    className="
                      px-5
                      py-4
                      text-sm
                    "
                  >
                    {category.sortOrder}
                  </td>

                  <td className="px-5 py-4">
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <button
                        type="button"
                        onClick={() =>
                          onEdit(
                            category,
                          )
                        }
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
                        <Edit size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onDelete(
                            category,
                          )
                        }
                        className="
                          inline-flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-[var(--admin-input-radius)]
                          bg-red-600
                          text-white
                          transition
                          hover:bg-red-700
                        "
                      >
                        <Trash2
                          size={16}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}