"use client";

import {
  Search,
} from "lucide-react";

type SearchEmptyStateProps = {
  query: string;
};

export default function SearchEmptyState({
  query,
}: SearchEmptyStateProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-3
        rounded-[var(--search-item-radius)]
        border
        border-[var(--search-empty-border)]
        bg-[var(--search-empty-bg)]
        px-5
        py-8
        text-center
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-[var(--search-surface)]
        "
      >
        <Search
          size={18}
          className="
            text-[var(--search-icon)]
          "
        />
      </div>

      <div className="space-y-1">
        <p
          className="
            text-sm
            font-medium
            text-[var(--text-primary)]
          "
        >
          No results found
        </p>

        <p
          className="
            max-w-xs
            text-xs
            text-[var(--search-placeholder)]
          "
        >
          We couldn't find any products or categories matching{" "}
          <span className="font-medium">
            "{query}"
          </span>
          .
        </p>
      </div>
    </div>
  );
}