"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SearchContextValue = {
  searchOpen: boolean;

  openSearch: () => void;

  closeSearch: () => void;

  toggleSearch: () => void;
};

const SearchContext =
  createContext<
    SearchContextValue | undefined
  >(undefined);

type SearchProviderProps = {
  children: ReactNode;
};

export function SearchProvider({
  children,
}: SearchProviderProps) {
  const [
    searchOpen,
    setSearchOpen,
  ] = useState(false);

  const openSearch =
    useCallback(() => {
      setSearchOpen(true);
    }, []);

  const closeSearch =
    useCallback(() => {
      setSearchOpen(false);
    }, []);

  const toggleSearch =
    useCallback(() => {
      setSearchOpen(
        (previous) =>
          !previous
      );
    }, []);

  const value = useMemo(
    () => ({
      searchOpen,

      openSearch,

      closeSearch,

      toggleSearch,
    }),
    [
      searchOpen,
      openSearch,
      closeSearch,
      toggleSearch,
    ]
  );

  return (
    <SearchContext.Provider
      value={value}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context =
    useContext(
      SearchContext
    );

  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchProvider."
    );
  }

  return context;
}