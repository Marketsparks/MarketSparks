"use client";

import {
  Search,
} from "lucide-react";

type AppSearchInputProps = {
  value: string;
  onChange: (
    value: string,
  ) => void;
  autoFocus?: boolean;
};

export default function AppSearchInput({
  value,
  onChange,
  autoFocus = false,
}: AppSearchInputProps) {
  return (
    <div
      className="
        px-5
        py-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
          border-b
          border-[var(--border)]
          pb-3
        "
      >
        <Search
          size={18}
          className="
            shrink-0
            text-[var(--foreground-muted)]
          "
        />

        <input
          type="text"
          value={value}
          autoFocus={autoFocus}
          onChange={(event) =>
            onChange(
              event.target.value,
            )
          }
          placeholder="Search products..."
          className="
            w-full
            border-none
            bg-transparent
            text-[15px]
            text-[var(--foreground)]
            placeholder:text-[var(--foreground-muted)]
            focus:outline-none
          "
        />
      </div>
    </div>
  );
}