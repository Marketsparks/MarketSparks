"use client";

import type {
  SearchProductResult,
} from "@/types/search.types";

type SearchProductResultsProps = {
  products: SearchProductResult[];
  onSelectProduct: (
    slug: string
  ) => void;
};

export default function SearchProductResults({
  products,
  onSelectProduct,
}: SearchProductResultsProps) {
  if (products.length === 0) {
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
          Products
        </h3>
      </div>

      <div className="p-2">
        {products.map(
          (product) => (
            <button
              key={product.id}
              type="button"
              onClick={() =>
                onSelectProduct(
                  product.slug
                )
              }
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-[var(--search-item-radius)]
                bg-[var(--search-product-bg)]
                px-3
                py-2.5
                text-left
                transition-all
                duration-200
                hover:bg-[var(--search-product-hover)]
              "
            >
              <div
                className="
                  h-12
                  w-12
                  shrink-0
                  overflow-hidden
                  rounded-lg
                  bg-[var(--search-surface)]
                "
              >
{product.primaryImageUrl ? (
  <img
    src={product.primaryImageUrl}
    alt={product.name}
    className="
      h-full
      w-full
      object-cover
    "
  />
) : (
                  <div
                    className="
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      text-xs
                      text-[var(--search-icon)]
                    "
                  >
                    N/A
                  </div>
                )}
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
                  {product.name}
                </p>

                <p
                  className="
                    truncate
                    text-xs
                    text-[var(--text-secondary)]
                  "
                >
                  {product.categoryName}
                </p>
              </div>
            </button>
          )
        )}
      </div>
    </section>
  );
}