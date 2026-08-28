"use client";

import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

import type {
  AdminAffiliatePublicationStatus,
} from "@/types/admin-affiliate.types";

export type AffiliateProductFilter =
  | "ALL"
  | AdminAffiliatePublicationStatus;

type AffiliateProductFiltersProps = {
  search: string;

  status: AffiliateProductFilter;

  onSearchChange: (
    value: string,
  ) => void;

  onStatusChange: (
    value: AffiliateProductFilter,
  ) => void;

  counts?: Partial<
    Record<
      AffiliateProductFilter,
      number
    >
  >;
};

const filters: {
  value: AffiliateProductFilter;

  label: string;
}[] = [
  {
    value: "ALL",
    label: "All",
  },

  {
    value: "SUBMITTED",
    label: "Submitted",
  },

  {
    value: "IN_REVIEW",
    label: "In Review",
  },

  {
    value: "APPROVED",
    label: "Approved",
  },

  {
    value: "REJECTED",
    label: "Rejected",
  },

  {
    value: "PUBLISHED",
    label: "Published",
  },
];

export default function AffiliateProductFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  counts,
}: AffiliateProductFiltersProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-2.5
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div
        className="
          relative
          w-full
          sm:max-w-[280px]
        "
      >
        <Search
          size={15}
          strokeWidth={2}
          className="
            pointer-events-none
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-[var(--foreground-muted)]
          "
        />

        <input
          type="search"
          value={search}
          onChange={(event) =>
            onSearchChange(
              event.target.value,
            )
          }
          placeholder="Search products or affiliates..."
          className="
            h-9
            w-full
            rounded-lg
            border
            border-[var(--border)]
            bg-[var(--surface)]
            pl-9
            pr-3
            text-[12px]
            text-[var(--foreground)]
            outline-none
            transition-all
            duration-200
            placeholder:text-[var(--foreground-muted)]
            focus:border-[var(--primary)]
            focus:ring-2
            focus:ring-[var(--primary)]/10
          "
        />
      </div>

      <div
        className="
          flex
          min-w-0
          items-center
          gap-2
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-[var(--border)]
            bg-[var(--surface)]
            text-[var(--foreground-muted)]
          "
          aria-hidden="true"
        >
          <SlidersHorizontal
            size={15}
            strokeWidth={2}
          />
        </div>

        <div
          className="
            min-w-0
            overflow-x-auto
          "
        >
          <div
            className="
              flex
              items-center
              gap-1.5
            "
          >
            {filters.map(
              (filter) => {
                const active =
                  status ===
                  filter.value;

                const count =
                  counts?.[
                    filter.value
                  ];

                return (
                  <button
                    key={
                      filter.value
                    }
                    type="button"
                    onClick={() =>
                      onStatusChange(
                        filter.value,
                      )
                    }
                    className="
                      inline-flex
                      h-8
                      shrink-0
                      items-center
                      gap-1.5
                      rounded-lg
                      border
                      px-2.5
                      text-[10px]
                      font-semibold
                      transition-all
                      duration-200
                    "
style={{
  background:
    "var(--surface)",

  color:
    active
      ? "var(--foreground)"
      : "var(--foreground-muted)",

  borderColor:
    active
      ? "var(--foreground-muted)"
      : "var(--border)",

  boxShadow:
    active
      ? "inset 0 0 0 1px var(--foreground-muted)"
      : "none",
}}
                  >
                    {filter.label}

                    {typeof count ===
                      "number" && (
                      <span
                        className="
                          rounded-full
                          px-1.5
                          py-0.5
                          text-[8px]
                          font-bold
                        "
                        style={{
background:
  "var(--surface-hover)",

color:
  "var(--foreground-muted)",
                        }}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              },
            )}
          </div>
        </div>
      </div>
    </div>
  );
}