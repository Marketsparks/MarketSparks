import Link from "next/link";

import {
  getStorefrontCategoriesService,
} from "@/services/category.service";

type ShopSidebarProps = {
  selectedCategoryId?: string | null;
};

export default async function ShopSidebar({
  selectedCategoryId = null,
}: ShopSidebarProps) {
  const categories =
    await getStorefrontCategoriesService();

  return (
    <aside
      className="
        rounded-[24px]

        border

        border-white/10

        bg-[var(--surface)]

        p-5

        transition-all

        duration-300
      "
    >
      <div>
        <h2
          className="
            text-[18px]

            font-semibold

            tracking-[-0.02em]

            text-[var(--foreground)]
          "
        >
          Categories
        </h2>

        <div
          className="
            mt-4

            space-y-1
          "
        >
          <Link
            href="?"
            className={`
              flex

              h-10

              w-full

              items-center

              justify-between

              rounded-r-xl

              border-l-[3px]

              px-4

              text-left

              text-[14px]

              font-medium

              transition-all

              duration-300

              ${
                !selectedCategoryId
                  ? `
                    border-l-[var(--primary)]

                    bg-[rgba(86,88,236,0.14)]

                    text-[var(--foreground)]
                  `
                  : `
                    border-l-transparent

                    text-[var(--foreground-muted)]

                    hover:border-l-[var(--primary)]

                    hover:bg-white/5

                    hover:text-[var(--foreground)]
                  `
              }
            `}
          >
            <span>
              All Products
            </span>
          </Link>

          {categories.map(
            (category) => (
              <Link
                key={
                  category.id
                }
                href={`?category=${category.id}`}
                className={`
                  flex

                  h-10

                  w-full

                  items-center

                  justify-between

                  rounded-r-xl

                  border-l-[3px]

                  px-4

                  text-left

                  text-[14px]

                  font-medium

                  transition-all

                  duration-300

                  ${
                    selectedCategoryId ===
                    category.id
                      ? `
                        border-l-[var(--primary)]

                        bg-[rgba(86,88,236,0.14)]

                        text-[var(--foreground)]
                      `
                      : `
                        border-l-transparent

                        text-[var(--foreground-muted)]

                        hover:border-l-[var(--primary)]

                        hover:bg-white/5

                        hover:text-[var(--foreground)]
                      `
                  }
                `}
              >
                <span>
                  {category.name}
                </span>
              </Link>
            ),
          )}
        </div>
      </div>

      <div
        className="
          my-6

          border-t

          border-white/10
        "
      />

      <div>
        <h2
          className="
            text-[18px]

            font-semibold

            tracking-[-0.02em]

            text-[var(--foreground)]
          "
        >
          Brands
        </h2>

        <div
          className="
            mt-4

            space-y-1
          "
        >
          <button
            type="button"
            className="
              flex

              h-10

              w-full

              items-center

              rounded-r-xl

              border-l-[3px]

              border-l-[var(--primary)]

              bg-[rgba(86,88,236,0.14)]

              px-4

              text-left

              text-[14px]

              font-medium

              text-[var(--foreground)]
            "
          >
            All Brands
          </button>
        </div>
      </div>
    </aside>
  );
}