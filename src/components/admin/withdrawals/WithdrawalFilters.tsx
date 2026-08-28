"use client";

import Button from "@/components/ui/Button";

import type {
  WithdrawalFilters,
  WithdrawalMethod,
} from "./withdrawal.types";

type WithdrawalFiltersProps = {
  filters: WithdrawalFilters;

  methods: WithdrawalMethod[];

  onChange: (
    filters: WithdrawalFilters,
  ) => void;
};

export default function WithdrawalFilters({
  filters,
  methods,
  onChange,
}: WithdrawalFiltersProps) {
  function update<
    T extends keyof WithdrawalFilters,
  >(
    key: T,
    value: WithdrawalFilters[T],
  ) {
    onChange({
      ...filters,
      [key]: value,
    });
  }

  const inputClasses = `
    h-11
    w-full
    rounded-[var(--admin-input-radius)]
    border
    border-[var(--admin-input-border)]
    bg-[var(--admin-input-bg)]
    px-4
    text-sm
    text-[var(--admin-input-text)]
    outline-none
    transition-all
    duration-300
    placeholder:text-[var(--admin-input-placeholder)]
    focus:border-[var(--admin-input-focus)]
    focus:ring-2
    focus:ring-[var(--admin-input-focus)]/20
    sm:h-12
  `;

  return (
    <section
      className="
        rounded-[var(--admin-card-radius)]
        border
        border-[var(--admin-card-border)]
        bg-[var(--admin-card-bg)]
        p-4
        shadow-[var(--admin-card-shadow)]
        transition-all
        duration-[var(--admin-card-transition)]
        sm:p-5
      "
    >
      <div
        className="
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >
        <div className="space-y-2">
          <label
            className="
              block
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-[var(--admin-muted)]
              sm:text-sm
            "
          >
            Search
          </label>

          <input
            type="text"
            placeholder="Name, email or reference..."
            value={filters.search}
            onChange={(event) =>
              update(
                "search",
                event.target.value,
              )
            }
            className={inputClasses}
          />
        </div>

        <div className="space-y-2">
          <label
            className="
              block
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-[var(--admin-muted)]
              sm:text-sm
            "
          >
            Withdrawal Method
          </label>

          <select
            value={filters.methodId}
            onChange={(event) =>
              update(
                "methodId",
                event.target.value as WithdrawalFilters["methodId"],
              )
            }
            className={inputClasses}
          >
            <option value="ALL">
              All Methods
            </option>

            {methods.map((method) => (
              <option
                key={method.id}
                value={method.id}
              >
                {method.symbol}
                {" • "}
                {method.network}
              </option>
            ))}
          </select>
        </div>

        <div
          className="
            flex
            items-end
          "
        >
          <Button
            type="button"
            size="md"
            className="
              h-11
              w-full
              border
              border-[var(--admin-button-secondary-border)]
              bg-[var(--admin-button-secondary-bg)]
              text-[var(--admin-button-secondary-text)]
              transition-all
              duration-300
              hover:bg-[var(--admin-button-secondary-hover)]
              sm:h-12
            "
            onClick={() =>
              onChange({
                search: "",
                methodId: "ALL",
              })
            }
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </section>
  );
}