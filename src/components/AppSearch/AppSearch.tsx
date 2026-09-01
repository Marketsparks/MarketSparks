"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useSearchContext,
} from "@/context/AppSearchContext";

import {
  APP_SEARCH_MAX_WIDTH,
  APP_SEARCH_RADIUS,
  APP_SEARCH_TRANSITION,
  APP_SEARCH_Z_INDEX,
} from "./app-search.constants";

import {
  useAppSearch,
} from "./useAppSearch";

import AppSearchBackdrop from "./AppSearchBackdrop";
import AppSearchEmpty from "./AppSearchEmpty";
import AppSearchHeader from "./AppSearchHeader";
import AppSearchInput from "./AppSearchInput";
import AppSearchLoading from "./AppSearchLoading";
import AppSearchPopular from "./AppSearchPopular";
import AppSearchResults from "./AppSearchResults";

export default function AppSearch() {
  const {
    searchOpen,
    closeSearch,
    popularSearches,
  } =
    useSearchContext();

  const {
    query,
    setQuery,
    loading,
    results,
  } =
    useAppSearch();

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          <AppSearchBackdrop
            onClose={closeSearch}
          />

          <motion.div
            initial={{
              opacity: 0,
              y: -24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -24,
            }}
            transition={{
              duration:
                APP_SEARCH_TRANSITION,
            }}
            className="
              fixed
              left-1/2
              top-5
              flex
              w-[calc(100%-24px)]
              -translate-x-1/2
              flex-col
              border
              border-[var(--border)]
              bg-[var(--background)]
              shadow-2xl
            "
            style={{
              maxWidth:
                APP_SEARCH_MAX_WIDTH,
              borderRadius:
                APP_SEARCH_RADIUS,
              zIndex:
                APP_SEARCH_Z_INDEX +
                1,
            }}
          >
            <AppSearchHeader
              onClose={closeSearch}
            />

            <AppSearchInput
              value={query}
              onChange={setQuery}
              autoFocus
            />

            <div
              className="
                max-h-[calc(100vh-150px)]
                overflow-y-auto
                px-5
                pb-5
              "
            >
{query.trim() ? (
  loading ? (
    <AppSearchLoading />
  ) : results.length > 0 ? (
    <AppSearchResults
      loading={false}
      query={query}
      results={results}
      onSelect={closeSearch}
    />
  ) : (
    <AppSearchEmpty
      query={query}
    />
  )
) : (
  <AppSearchPopular
    searches={popularSearches}
    onSelect={setQuery}
  />
)}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}