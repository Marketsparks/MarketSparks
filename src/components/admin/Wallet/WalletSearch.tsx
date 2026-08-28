"use client";

import type {
  ChangeEvent,
} from "react";

import type {
  WalletSearchProps,
} from "./wallet.types";

export default function WalletSearch({
  value,
  onChange,
}: WalletSearchProps) {
  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    onChange(
      event.target.value,
    );
  }

  return (
    <div
      className="
        rounded-[var(--admin-card-radius)]

        border

        border-[var(--admin-card-border)]

        bg-[var(--admin-card-bg)]

        p-[var(--admin-card-padding)]

        shadow-[var(--admin-card-shadow)]

        transition-all

        duration-300
      "
    >
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Search by name or email..."
        autoComplete="off"
        spellCheck={false}
        className="
          h-12

          w-full

          rounded-[var(--admin-input-radius)]

          border

          border-[var(--admin-input-border)]

          bg-[var(--admin-input-bg)]

          px-4

          text-sm

          text-[var(--admin-input-text)]

          placeholder:text-[var(--admin-input-placeholder)]

          outline-none

          transition-colors

          focus:border-[var(--admin-input-focus)]
        "
      />
    </div>
  );
}