"use client";

import {
  Search,
  X,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import SearchDropdown from "./SearchDropdown";

import { useProductSearch } from "@/hooks/useProductSearch";

import { useSearchContext } from "@/context/SearchContext";

type SearchBarProps = {
  className?: string;
};

export default function SearchBar({
  className = "",
}: SearchBarProps) {
  const router = useRouter();

  const containerRef =
    useRef<HTMLDivElement>(null);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const [open, setOpen] =
    useState(false);

const {
  closeSearch,
} = useSearchContext();

const {
  query,
  setQuery,
  loading,
  error,
  results,
} = useProductSearch();

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent,
    ) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
  }, []);

function handleChange(
  value: string,
) {
  setQuery(value);
  setOpen(value.trim().length > 0);
}

  function clearSearch() {
    setQuery("");
    setOpen(false);
    inputRef.current?.focus();
  }

function handleProductSelect(
  slug: string,
) {
  setOpen(false);
  setQuery("");
  closeSearch();

  router.push(
    `/Product/${slug}`,
  );
}

function handleCategorySelect(
  categoryId: string,
) {
  setOpen(false);
  setQuery("");
  closeSearch();

  router.push(
    `/Shop?category=${encodeURIComponent(
      categoryId,
    )}`,
  );
}

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
    >
      <div
        className="
          flex
          h-11
          items-center
          gap-3
          rounded-[var(--search-input-radius)]
          border
          border-[var(--search-input-border)]
          bg-[var(--search-input-bg)]
          px-4
          transition-[border]
          duration-200
          focus-within:border-[var(--search-input-focus)]
        "
      >
        <Search
          size={18}
          className="
            shrink-0
            text-[var(--search-icon)]
          "
        />

        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) =>
            handleChange(
              event.target.value,
            )
          }
          onFocus={() => {
            if (
              query.trim()
                .length > 0
            ) {
              setOpen(true);
            }
          }}
          placeholder="Search products or categories..."
          className="
            h-full
            w-full
            bg-transparent
            text-sm
            text-[var(--text-primary)]
            outline-none
            placeholder:text-[var(--search-placeholder)]
          "
        />

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="
              rounded-full
              p-1
              transition-colors
              hover:bg-[var(--search-clear-hover)]
            "
          >
            <X
              size={16}
              className="
                text-[var(--search-icon)]
              "
            />
          </button>
        )}
      </div>

<SearchDropdown
  open={open}
  loading={loading}
  error={error}
  query={query}
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