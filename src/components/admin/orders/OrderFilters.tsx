"use client";

import type {
  OrderPaymentStatus,
  OrderStatus,
  PaymentMethod,
} from "../../../../generated/prisma/client";

import type {
  AdminOrderFilters,
} from "./types";

type OrderFiltersProps = {
  filters: AdminOrderFilters;

  onChange: (
    filters: AdminOrderFilters,
  ) => void;
};

export default function OrderFilters({
  filters,
  onChange,
}: OrderFiltersProps) {
  function updateFilters(
    changes: Partial<AdminOrderFilters>,
  ) {
    onChange({
      ...filters,
      ...changes,
    });
  }

  function clearFilters() {
    onChange({
      search: "",
      paymentMethod: "ALL",
      paymentStatus: "ALL",
      status: "ALL",
    });
  }

  const hasActiveFilters =
    Boolean(
      filters.search.trim(),
    ) ||
    filters.paymentMethod !==
      "ALL" ||
    filters.paymentStatus !==
      "ALL" ||
    filters.status !==
      "ALL";

  return (
    <section
      className="
        rounded-xl
        border
        border-[var(--admin-card-border)]
        bg-[var(--admin-card-bg)]
        p-4
        shadow-[var(--admin-card-shadow)]
      "
    >
      <div
        className="
          grid
          gap-3
          lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(140px,0.75fr))_auto]
          lg:items-end
        "
      >
        <label className="min-w-0">
          <span
            className="
              mb-1.5
              block
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.08em]
              text-[var(--admin-muted)]
            "
          >
            Search
          </span>

          <input
            type="search"
            value={
              filters.search
            }
            onChange={(
              event,
            ) =>
              updateFilters({
                search:
                  event.target
                    .value,
              })
            }
            placeholder="Order number, reference, customer, email"
            className="
              h-10
              w-full
              rounded-lg
              border
              border-[var(--admin-input-border)]
              bg-[var(--admin-input-bg)]
              px-3
              text-sm
              text-[var(--admin-input-text)]
              placeholder:text-[var(--admin-input-placeholder)]
              outline-none
              transition
              focus:border-[var(--admin-input-focus)]
            "
          />
        </label>

        <FilterSelect
          label="Payment method"
          value={
            filters.paymentMethod
          }
          onChange={(
            value,
          ) =>
            updateFilters({
              paymentMethod:
                value as
                  | PaymentMethod
                  | "ALL",
            })
          }
          options={[
            {
              value: "ALL",
              label: "All methods",
            },
            {
              value:
                "WALLET",
              label:
                "Wallet",
            },
            {
              value:
                "CRYPTO",
              label:
                "Crypto",
            },
          ]}
        />

        <FilterSelect
          label="Payment status"
          value={
            filters.paymentStatus
          }
          onChange={(
            value,
          ) =>
            updateFilters({
              paymentStatus:
                value as
                  | OrderPaymentStatus
                  | "ALL",
            })
          }
          options={[
            {
              value: "ALL",
              label: "All payment status",
            },
            {
              value:
                "PENDING",
              label:
                "Pending",
            },
            {
              value:
                "PAID",
              label:
                "Paid",
            },
            {
              value:
                "FAILED",
              label:
                "Failed",
            },
          ]}
        />

        <FilterSelect
          label="Order status"
          value={
            filters.status
          }
          onChange={(
            value,
          ) =>
            updateFilters({
              status:
                value as
                  | OrderStatus
                  | "ALL",
            })
          }
          options={[
            {
              value: "ALL",
              label: "All order status",
            },
            {
              value:
                "PENDING",
              label:
                "Pending",
            },
            {
              value:
                "PROCESSING",
              label:
                "Processing",
            },
            {
              value:
                "SHIPPED",
              label:
                "Shipped",
            },
            {
              value:
                "DELIVERED",
              label:
                "Delivered",
            },
            {
              value:
                "CANCELLED",
              label:
                "Cancelled",
            },
          ]}
        />

        <button
          type="button"
          onClick={
            clearFilters
          }
          disabled={
            !hasActiveFilters
          }
          className="
            h-10
            rounded-lg
            border
            border-[var(--admin-card-border)]
            bg-[var(--admin-card-bg)]
            px-3
            text-xs
            font-medium
            text-[var(--admin-muted)]
            transition
            hover:border-[var(--primary)]
            hover:text-[var(--admin-title)]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          Clear
        </button>
      </div>
    </section>
  );
}

type FilterSelectProps = {
  label: string;

  value: string;

  options: {
    value: string;

    label: string;
  }[];

  onChange: (
    value: string,
  ) => void;
};

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <label className="min-w-0">
      <span
        className="
          mb-1.5
          block
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.08em]
          text-[var(--admin-muted)]
        "
      >
        {label}
      </span>

      <select
        value={value}
        onChange={(
          event,
        ) =>
          onChange(
            event.target.value,
          )
        }
        className="
          h-10
          w-full
          rounded-lg
          border
          border-[var(--admin-input-border)]
          bg-[var(--admin-input-bg)]
          px-3
          text-xs
          text-[var(--admin-input-text)]
          outline-none
          transition
          focus:border-[var(--admin-input-focus)]
        "
      >
        {options.map(
          (option) => (
            <option
              key={
                option.value
              }
              value={
                option.value
              }
            >
              {option.label}
            </option>
          ),
        )}
      </select>
    </label>
  );
}