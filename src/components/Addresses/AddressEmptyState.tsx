"use client";

import {
  MapPin,
  Plus,
} from "lucide-react";

type AddressEmptyStateProps = {
  onAdd: () => void;
};

export default function AddressEmptyState({
  onAdd,
}: AddressEmptyStateProps) {
  return (
    <section
      className="
        rounded-xl
        border
        border-[var(--user-card-border)]
        bg-[var(--user-card-bg)]
        px-5
        py-8
        text-center
        shadow-[var(--user-card-shadow)]
      "
    >
      <div
        className="
          mx-auto
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-[var(--user-stat-bg)]
          text-[var(--primary)]
        "
      >
        <MapPin
          size={18}
        />
      </div>

      <h2
        className="
          mt-3
          text-sm
          font-semibold
          text-[var(--user-title)]
        "
      >
        No saved addresses
      </h2>

      <p
        className="
          mx-auto
          mt-1.5
          max-w-sm
          text-xs
          leading-5
          text-[var(--user-text-muted)]
        "
      >
        Add a delivery address once and
        reuse it during future checkouts.
      </p>

      <button
        type="button"
        onClick={onAdd}
        className="
          mt-4
          inline-flex
          h-9
          items-center
          gap-2
          rounded-lg
          bg-[var(--primary)]
          px-3.5
          text-xs
          font-semibold
          text-[var(--primary-foreground)]
          transition
          hover:opacity-90
        "
      >
        <Plus
          size={14}
        />

        Add address
      </button>
    </section>
  );
}