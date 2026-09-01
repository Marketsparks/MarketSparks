"use client";

import { X } from "lucide-react";

type AppSearchHeaderProps = {
  onClose: () => void;
};

export default function AppSearchHeader({
  onClose,
}: AppSearchHeaderProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        border-b
        border-[var(--border)]
        px-5
        py-4
      "
    >
      <div>
        <h2
          className="
            text-[15px]
            font-semibold
            text-[var(--foreground)]
          "
        >
          Search Products
        </h2>

        <p
          className="
            mt-1
            text-[13px]
            text-[var(--foreground-muted)]
          "
        >
          Find products instantly.
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close search"
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          text-[var(--foreground-muted)]
          transition-colors
          duration-200
          hover:bg-[var(--surface-hover)]
          hover:text-[var(--foreground)]
        "
      >
        <X
          size={18}
          strokeWidth={2}
        />
      </button>
    </div>
  );
}