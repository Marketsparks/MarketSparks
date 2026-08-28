"use client";

import { Search, X } from "lucide-react";

import {
  PRODUCT_STATUSES,
  type ProductStatus,
} from "@/constants/product-status";

export type ProductFiltersValue = {
  search: string;
  status: ProductStatus | "ALL";
  featured: boolean | null;
};

type ProductFiltersProps = {
  value: ProductFiltersValue;
  disabled?: boolean;
  onChange: (
    value: ProductFiltersValue
  ) => void;
};

const defaultFilters: ProductFiltersValue =
  {
    search: "",
    status: "ALL",
    featured: null,
  };

export default function ProductFilters({
  value,
  disabled = false,
  onChange,
}: ProductFiltersProps) {
  function update<
    K extends keyof ProductFiltersValue
  >(
    key: K,
    next: ProductFiltersValue[K]
  ) {
    onChange({
      ...value,
      [key]: next,
    });
  }

  function clearFilters() {
    onChange(defaultFilters);
  }

  const hasFilters =
    value.search.trim() !== "" ||
    value.status !== "ALL" ||
    value.featured !== null;

  return (
    <section
      className="
        rounded-[var(--admin-surface-radius)]
        border
        border-[var(--admin-card-border)]
        bg-[var(--admin-card-bg)]
        p-[var(--space-lg)]
      "
    >
      <div
        className="
          grid
          gap-[var(--space-md)]
          lg:grid-cols-[2fr_1fr_1fr_auto]
        "
      >
        <div className="relative">
          <Search
            size={16}
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-[var(--admin-muted)]
            "
          />

          <input
            type="text"
            value={value.search}
            disabled={disabled}
            placeholder="Search products..."
            onChange={(event) =>
              update(
                "search",
                event.target.value
              )
            }
            className="
              h-11
              w-full
              rounded-[var(--admin-input-radius)]
              border
              border-[var(--admin-input-border)]
              bg-[var(--admin-input-bg)]
              pl-10
              pr-4
              text-sm
              text-[var(--admin-input-text)]
              outline-none
              transition
              focus:border-[var(--admin-input-focus)]
            "
          />
        </div>

        <select
          value={value.status}
          disabled={disabled}
          onChange={(event) =>
            update(
              "status",
              event.target
                .value as ProductStatus | "ALL"
            )
          }
          className="
            h-11
            rounded-[var(--admin-input-radius)]
            border
            border-[var(--admin-input-border)]
            bg-[var(--admin-input-bg)]
            px-3
            text-sm
            text-[var(--admin-input-text)]
            outline-none
            transition
            focus:border-[var(--admin-input-focus)]
          "
        >
          <option value="ALL">
            All Statuses
          </option>

{PRODUCT_STATUSES.map((status) => (
  <option
    key={status}
    value={status}
  >
    {status}
  </option>
))}
        </select>

        <select
          value={
            value.featured === null
              ? "ALL"
              : value.featured
              ? "TRUE"
              : "FALSE"
          }
          disabled={disabled}
          onChange={(event) => {
            const next =
              event.target.value === "ALL"
                ? null
                : event.target.value ===
                  "TRUE";

            update(
              "featured",
              next
            );
          }}
          className="
            h-11
            rounded-[var(--admin-input-radius)]
            border
            border-[var(--admin-input-border)]
            bg-[var(--admin-input-bg)]
            px-3
            text-sm
            text-[var(--admin-input-text)]
            outline-none
            transition
            focus:border-[var(--admin-input-focus)]
          "
        >
          <option value="ALL">
            All Products
          </option>

          <option value="TRUE">
            Featured
          </option>

          <option value="FALSE">
            Non Featured
          </option>
        </select>

        <button
          type="button"
          disabled={
            disabled ||
            !hasFilters
          }
          onClick={clearFilters}
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-[var(--admin-input-radius)]
            border
            border-[var(--admin-button-secondary-border)]
            bg-[var(--admin-button-secondary-bg)]
            px-4
            text-sm
            font-medium
            text-[var(--admin-title)]
            transition
            hover:bg-[var(--admin-button-secondary-hover)]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <X size={16} />

          Clear
        </button>
      </div>
    </section>
  );
}