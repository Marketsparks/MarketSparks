"use client";

import { Plus } from "lucide-react";

type ProductsToolbarProps = {
  onCreate: () => void;
};

export default function ProductsToolbar({
  onCreate,
}: ProductsToolbarProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div>
        <h1
          className="
            text-2xl
            font-semibold
            tracking-tight
            text-[var(--admin-title)]
          "
        >
          Products
        </h1>

        <p
          className="
            mt-1
            text-sm
            text-[var(--admin-muted)]
          "
        >
          Manage your catalog, inventory, pricing and product information.
        </p>
      </div>

<button
  type="button"
  onClick={onCreate}
  className="
    inline-flex
    h-11
    items-center
    justify-center
    gap-2
    rounded-[var(--admin-input-radius)]
    bg-[#4F46E5]
    px-5
    text-sm
    font-medium
    text-white
    transition-colors
    hover:bg-[#4338CA]
    focus:outline-none
    focus:ring-2
    focus:ring-[#6366F1]
    focus:ring-offset-2
    disabled:pointer-events-none
    disabled:opacity-60
  "
>
  <Plus size={18} />

  <span>
    New Product
  </span>
</button>
    </div>
  );
}