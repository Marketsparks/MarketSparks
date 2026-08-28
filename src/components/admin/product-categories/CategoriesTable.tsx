"use client";

import Image from "next/image";
import { Edit2, Trash2 } from "lucide-react";

import type {
  ProductCategory,
} from "@/types/category.types";

import {
  getCloudinaryImageUrl,
} from "@/lib/cloudinary";

type CategoriesTableProps = {
  categories: ProductCategory[];

  onEdit: (
    category: ProductCategory
  ) => void;

  onDelete: (
    category: ProductCategory
  ) => void;
};

export default function CategoriesTable({
  categories,
  onEdit,
  onDelete,
}: CategoriesTableProps) {
  if (categories.length === 0) {
    return (
      <div
        className="
          flex
          h-52
          items-center
          justify-center
          rounded-[var(--admin-surface-radius)]
          border
          border-[var(--admin-border)]
          bg-[var(--admin-surface-bg)]
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
        border-[var(--admin-border)]
        bg-[var(--admin-surface-bg)]
      "
    >
      <div className="overflow-x-auto">
        <table
          className="
            min-w-full
            divide-y
            divide-[var(--admin-border)]
          "
        >
          <thead
            className="
              bg-[var(--admin-bg)]
            "
          >
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide">
                Icon
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide">
                Name
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide">
                Slug
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide">
                Sort
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody
            className="
              divide-y
              divide-[var(--admin-border)]
            "
          >
            {categories.map(
              (category) => {
                const imageUrl =
                  getCloudinaryImageUrl(
                    category.imageKey
                  );

                return (
                  <tr
                    key={category.id}
                    className="
                      transition-colors
                      hover:bg-[var(--admin-bg)]
                    "
                  >
                    <td className="px-6 py-4">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={category.name}
                          width={42}
                          height={42}
                          className="
                            h-10
                            w-10
                            object-contain
                          "
                        />
                      ) : (
                        <div
                          className="
                            h-10
                            w-10
                            rounded-lg
                            bg-[var(--admin-bg)]
                          "
                        />
                      )}
                    </td>

                    <td
                      className="
                        px-6
                        py-4
                        font-medium
                        text-[var(--admin-title)]
                      "
                    >
                      {category.name}
                    </td>

                    <td
                      className="
                        px-6
                        py-4
                        text-sm
                        text-[var(--admin-muted)]
                      "
                    >
                      {category.slug}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={
                          category.isActive
                            ? `
                              rounded-full
                              bg-emerald-500/15
                              px-3
                              py-1
                              text-xs
                              font-medium
                              text-emerald-500
                            `
                            : `
                              rounded-full
                              bg-red-500/15
                              px-3
                              py-1
                              text-xs
                              font-medium
                              text-red-500
                            `
                        }
                      >
                        {category.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    <td
                      className="
                        px-6
                        py-4
                        text-sm
                      "
                    >
                      {category.sortOrder}
                    </td>

                    <td
                      className="
                        px-6
                        py-4
                      "
                    >
                      <div
                        className="
                          flex
                          justify-end
                          gap-2
                        "
                      >
                        <button
                          type="button"
                          onClick={() =>
                            onEdit(
                              category
                            )
                          }
                          className="
                            rounded-lg
                            border
                            border-[var(--admin-border)]
                            p-2
                            transition
                            hover:bg-[var(--admin-bg)]
                          "
                        >
                          <Edit2
                            size={16}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onDelete(
                              category
                            )
                          }
                          className="
                            rounded-lg
                            border
                            border-red-500/30
                            p-2
                            text-red-500
                            transition
                            hover:bg-red-500/10
                          "
                        >
                          <Trash2
                            size={16}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}