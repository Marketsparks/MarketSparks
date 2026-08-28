"use client";

import type {
  ChangeEvent,
} from "react";

import type {
  UserStatusFilter,
} from "./user.types";

type UserFiltersProps = {
  search: string;
  status: UserStatusFilter;
  onSearchChange: (
    value: string,
  ) => void;
  onStatusChange: (
    status: UserStatusFilter,
  ) => void;
};

const STATUS_OPTIONS: Array<{
  value: UserStatusFilter;
  label: string;
}> = [
  {
    value: "ALL",
    label: "All Users",
  },
  {
    value: "ACTIVE",
    label: "Active",
  },
  {
    value: "DEACTIVATED",
    label: "Deactivated",
  },
  {
    value: "PENDING_DELETION",
    label: "Pending Deletion",
  },
];

export function UserFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: UserFiltersProps) {
  function handleSearchChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    onSearchChange(
      event.target.value,
    );
  }

  function handleStatusChange(
    event: ChangeEvent<HTMLSelectElement>,
  ) {
    onStatusChange(
      event.target
        .value as UserStatusFilter,
    );
  }

  return (
    <section
      className="
        flex
        flex-col
        gap-4
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <input
        type="search"
        value={search}
        onChange={
          handleSearchChange
        }
        placeholder="Search by name or email..."
        className="
          w-full
          rounded-xl
          border
          px-4
          py-3
          text-sm
          outline-none
          transition
          lg:max-w-md
        "
        style={{
          background:
            "var(--admin-input-bg)",
          borderColor:
            "var(--admin-input-border)",
          color:
            "var(--admin-input-text)",
        }}
      />

      <select
        value={status}
        onChange={
          handleStatusChange
        }
        className="
          w-full
          rounded-xl
          border
          px-4
          py-3
          text-sm
          outline-none
          transition
          lg:w-64
        "
        style={{
          background:
            "var(--admin-input-bg)",
          borderColor:
            "var(--admin-input-border)",
          color:
            "var(--admin-input-text)",
        }}
      >
        {STATUS_OPTIONS.map(
          (option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ),
        )}
      </select>
    </section>
  );
}