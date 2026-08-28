"use client";

import { Plus } from "lucide-react";

type CategoriesToolbarProps = {
  onCreate: () => void;
};

export default function CategoriesToolbar({
  onCreate,
}: CategoriesToolbarProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
      "
    >
      <div>
        <h2
          className="
            text-xl
            font-semibold
            text-[var(--admin-title)]
          "
        >
          Categories
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-[var(--admin-muted)]
          "
        >
          Organize products into categories.
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
          bg-violet-600
          px-5
          text-sm
          font-medium
          text-white
          transition
          hover:bg-violet-700
          focus:outline-none
          focus:ring-2
          focus:ring-violet-500
          focus:ring-offset-2
        "
      >
        <Plus size={18} />

        <span>
          New Category
        </span>
      </button>
    </div>
  );
}