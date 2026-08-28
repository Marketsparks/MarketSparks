"use client";

import {
  forwardRef,
  useState,
} from "react";

import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

import SearchDropdown from "@/components/search/SearchDropdown";

import { useProductSearch } from "@/hooks/useProductSearch";

import { useRouter } from "next/navigation";

type SearchBarProps = {
  placeholder?: string;
  className?: string;
};

const SearchBar = forwardRef<
  HTMLInputElement,
  SearchBarProps
>(
  (
    {
      placeholder = "Search...",
      className,
    },
    ref
  ) => {
    const router = useRouter();

    const [open, setOpen] =
      useState(false);

    const {
      query,
      setQuery,
      results,
      loading,
      error,
    } = useProductSearch();

    function handleChange(
      value: string
    ) {
      setQuery(value);

      setOpen(
        value.trim().length > 0
      );
    }

    function handleProductSelect(
      slug: string
    ) {
      setOpen(false);

      setQuery("");

      router.push(
        `/Product/${slug}`
      );
    }

    function handleCategorySelect(
      slug: string
    ) {
      setOpen(false);

      setQuery("");

      router.push(
        `/Shop?category=${slug}`
      );
    }

    return (
      <div className="relative w-full">
        <div
          className={cn(
            `
              flex
              h-10
              w-full
              items-center
              gap-3
              rounded-full
              border
              border-[var(--border)]
              bg-[var(--surface)]
              px-4
              transition-all
              duration-300
              focus-within:border-[var(--primary)]
              focus-within:ring-2
              focus-within:ring-[var(--primary)]/15
            `,
            className
          )}
        >
          <Search
            size={17}
            className="
              shrink-0
              text-[var(--foreground-muted)]
            "
          />

          <input
            ref={ref}
            value={query}
            placeholder={
              placeholder
            }
            onFocus={() => {
              if (
                query.trim()
                  .length >= 2
              ) {
                setOpen(true);
              }
            }}
            onChange={(
              event
            ) =>
              handleChange(
                event.target.value
              )
            }
            className="
              h-full
              w-full
              border-0
              bg-transparent
              text-[14px]
              text-[var(--foreground)]
              outline-none
              placeholder:text-[13px]
              placeholder:text-[var(--foreground-muted)]
            "
          />
        </div>

        <SearchDropdown
          open={open}
          query={query}
          loading={loading}
          error={error}
          results={results}
          onClose={() =>
            setOpen(false)
          }
          onSelectProduct={
            handleProductSelect
          }
          onSelectCategory={
            handleCategorySelect
          }
        />
      </div>
    );
  }
);

SearchBar.displayName =
  "SearchBar";

export default SearchBar;