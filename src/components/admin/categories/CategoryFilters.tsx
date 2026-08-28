"use client";

import { Search } from "lucide-react";

export type CategoryFiltersValue = {
  search: string;
  status: "ALL" | "ACTIVE" | "INACTIVE";
};

type CategoryFiltersProps = {
  value: CategoryFiltersValue;
  onChange: (
    value: CategoryFiltersValue,
  ) => void;
  disabled?: boolean;
};

export default function CategoryFilters({
  value,
  onChange,
  disabled = false,
}: CategoryFiltersProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        rounded-[var(--admin-surface-radius)]
        border
        border-[var(--admin-card-border)]
        bg-[var(--admin-card-bg)]
        p-5
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <div className="relative flex-1">
        <Search
          size={18}
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
          placeholder="Search categories..."
          onChange={(event) =>
            onChange({
              ...value,
              search:
                event.target.value,
            })
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
          onChange({
            ...value,
            status:
              event.target
                .value as CategoryFiltersValue["status"],
          })
        }
        className="
          h-11
          min-w-[180px]
          rounded-[var(--admin-input-radius)]
          border
          border-[var(--admin-input-border)]
          bg-[var(--admin-input-bg)]
          px-3
          text-sm
          outline-none
          transition
          focus:border-[var(--admin-input-focus)]
        "
      >
        <option value="ALL">
          All Categories
        </option>

        <option value="ACTIVE">
          Active
        </option>

        <option value="INACTIVE">
          Inactive
        </option>
      </select>
    </div>
  );
}