"use client";

import Link from "next/link";

import {
  Edit,
  Eye,
  Trash2,
} from "lucide-react";

import Image from "next/image";

import { getCloudinaryImageUrl } from "@/lib/cloudinary";

import type {
  Product,
} from "@/types/product.types";

import ProductStatusBadge from "./ProductStatusBadge";

type ProductsTableProps = {
  products: Product[];

  loading?: boolean;

  onEdit: (
    product: Product,
  ) => void;

  onDelete: (
    product: Product,
  ) => void;
};

function formatPrice(
  amount: number,
) {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    },
  ).format(amount);
}

function getAvailableStock(
  product: Product,
) {
  return product.variants.reduce(
    (
      total,
      variant,
    ) =>
      total +
      variant.sizes.reduce(
        (
          variantTotal,
          inventory,
        ) =>
          variantTotal +
          Math.max(
            0,
            inventory.stock -
              inventory.reservedStock,
          ),
        0,
      ),
    0,
  );
}

export default function ProductsTable({
  products,
  loading = false,
  onEdit,
  onDelete,
}: ProductsTableProps) {
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
        Loading products...
      </div>
    );
  }

  if (products.length === 0) {
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
        No products found.
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
                "Product",
                "Category",
                "Price",
                "Stock",
                "Status",
                "Featured",
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
            {products.map(
              (product) => (
                <tr
                  key={product.id}
                  className="
                    border-t
                    border-[var(--admin-card-border)]
                    transition
                    hover:bg-[var(--admin-hover-bg)]
                  "
                >
                  <td className="px-5 py-4">
                    <div
                      className="
                        flex
                        items-center
                        gap-4
                      "
                    >
                      <div
                        className="
                          relative
                          h-14
                          w-14
                          overflow-hidden
                          rounded-[var(--radius-md)]
                          border
                          border-[var(--admin-card-border)]
                          bg-[var(--admin-input-bg)]
                        "
                      >
                        {product.images?.[0] ? (
                          <Image
                            src={
                              getCloudinaryImageUrl(
                                product
                                  .images[0]
                                  .imageKey,
                              )!
                            }
                            alt={
                              product.name
                            }
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        ) : null}
                      </div>

                      <div>
                        <p
                          className="
                            font-medium
                            text-[var(--admin-title)]
                          "
                        >
                          {product.name}
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            text-[var(--admin-muted)]
                          "
                        >
                          {product.sku ||
                            "No SKU"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td
                    className="
                      px-5
                      py-4
                      text-sm
                    "
                  >
                    {product.category?.name ??
                      "Uncategorized"}
                  </td>

                  <td
                    className="
                      px-5
                      py-4
                      text-sm
                      font-medium
                    "
                  >
                    {formatPrice(
                      product.price,
                    )}
                  </td>

                  <td
                    className="
                      px-5
                      py-4
                      text-sm
                    "
                  >
                    {getAvailableStock(
                      product,
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <ProductStatusBadge
                      status={
                        product.status
                      }
                    />
                  </td>

                  <td
                    className="
                      px-5
                      py-4
                    "
                  >
                    {product.featured ? (
                      <span
                        className="
                          inline-flex
                          rounded-full
                          bg-[var(--admin-status-success-bg)]
                          px-2
                          py-1
                          text-xs
                          font-medium
                          text-[var(--admin-status-success-text)]
                        "
                      >
                        Featured
                      </span>
                    ) : (
                      <span
                        className="
                          text-xs
                          text-[var(--admin-muted)]
                        "
                      >
                        No
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <Link
                        href={`/admin/products/${product.id}`}
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
                        <Eye size={16} />
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          onEdit(
                            product,
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
                            product,
                          )
                        }
                        className="
                          inline-flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-[var(--admin-input-radius)]
                          bg-[var(--admin-button-danger-bg)]
                          text-[var(--admin-button-danger-text)]
                          transition
                          hover:opacity-90
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