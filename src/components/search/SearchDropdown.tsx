"use client";

import type {
  ProductSearchResponse,
} from "@/types/search.types";

import SearchCategoryResults from "./SearchCategoryResults";
import SearchProductResults from "./SearchProductResults";
import SearchEmptyState from "./SearchEmptyState";

type SearchDropdownProps = {
  open: boolean;
  query: string;
  loading: boolean;
  error: string | null;
  results: ProductSearchResponse;
  onClose: () => void;
  onSelectProduct: (
    slug: string
  ) => void;
onSelectCategory: (
  categoryId: string
) => void;
};

export default function SearchDropdown({
  open,
  query,
  loading,
  error,
  results,
  onClose,
  onSelectProduct,
  onSelectCategory,
}: SearchDropdownProps) {
  const hasCategories =
    results.categories.length > 0;

  const hasProducts =
    results.products.length > 0;

  const hasResults =
    hasCategories || hasProducts;

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        absolute
        left-0
        right-0
        top-[calc(100%+10px)]
        z-50
        overflow-hidden
        rounded-[var(--search-radius)]
        border
        border-[var(--search-border)]
        bg-[var(--search-bg)]
        shadow-[var(--search-shadow)]
        backdrop-blur-[var(--search-blur)]
      "
    >
      {loading && (
        <div
          className="
            flex
            items-center
            justify-center
            p-6
            text-sm
            text-[var(--search-icon)]
          "
        >
          Searching...
        </div>
      )}

      {!loading && error && (
        <div
          className="
            p-5
            text-center
            text-sm
            text-[var(--user-danger)]
          "
        >
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        !hasResults && (
          <SearchEmptyState
            query={query}
          />
        )}

      {!loading &&
        !error &&
        hasResults && (
          <div
            className="
              max-h-[420px]
              overflow-y-auto
            "
          >
            {hasCategories && (
              <SearchCategoryResults
                categories={
                  results.categories
                }
onSelectCategory={(
  categoryId
) => {
  onClose();

  onSelectCategory(
    categoryId
  );
}}
              />
            )}

            {hasProducts && (
<SearchProductResults
  products={results.products}
  onSelectProduct={(
    slug: string
  ) => {
    onClose();
    onSelectProduct(slug);
  }}
/>
            )}
          </div>
        )}
    </div>
  );
}