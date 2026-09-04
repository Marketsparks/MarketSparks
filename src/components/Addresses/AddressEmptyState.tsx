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
    mt-5
    inline-flex
    h-11
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-[#5658EC]
    px-5
    text-sm
    font-semibold
    text-white
    shadow-[0_8px_24px_rgba(86,88,236,0.35)]
    transition-all
    duration-300
    hover:scale-[1.02]
    hover:bg-[#4b4de0]
    hover:shadow-[0_12px_30px_rgba(86,88,236,0.45)]
    active:scale-[0.98]
  "
>
  <Plus
    size={16}
    strokeWidth={2.5}
  />

  Add address
</button>
    </section>
  );
}