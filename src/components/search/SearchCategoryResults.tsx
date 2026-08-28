"use client";

import type {
  SearchCategoryResult,
} from "@/types/search.types";

type SearchCategoryResultsProps = {
  categories: SearchCategoryResult[];

  onSelectCategory: (
    categoryId: string,
  ) => void;
};

export default function SearchCategoryResults({
  categories,
  onSelectCategory,
}: SearchCategoryResultsProps) {
  if (
    categories.length === 0
  ) {
    return null;
  }

  return (
    <section>
      <div
        className="
          border-b

          border-[var(--search-divider)]

          px-4

          py-3
        "
      >
        <h3
          className="
            text-xs

            font-semibold

            uppercase

            tracking-wide

            text-[var(--search-icon)]
          "
        >
          Categories
        </h3>
      </div>

      <div className="p-2">
        {categories.map(
          (category) => (
            <button
              key={category.id}
              type="button"
              onClick={() =>
                onSelectCategory(
                  category.id,
                )
              }
              className="
                flex

                w-full

                items-center

                gap-3

                rounded-[var(--search-item-radius)]

                bg-[var(--search-category-bg)]

                px-3

                py-2.5

                text-left

                transition-all

                duration-200

                hover:bg-[var(--search-category-hover)]

                focus:outline-none

                focus:ring-2

                focus:ring-[var(--search-input-focus)]
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

                  rounded-full

                  bg-[var(--search-surface)]

                  text-sm

                  font-semibold

                  text-[var(--search-icon)]
                "
              >
                {category.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div
                className="
                  min-w-0

                  flex-1
                "
              >
                <p
                  className="
                    truncate

                    text-sm

                    font-medium

                    text-[var(--text-primary)]
                  "
                >
                  {category.name}
                </p>

                <p
                  className="
                    truncate

                    text-xs

                    text-[var(--text-secondary)]
                  "
                >
                  Browse category
                </p>
              </div>
            </button>
          ),
        )}
      </div>
    </section>
  );
}