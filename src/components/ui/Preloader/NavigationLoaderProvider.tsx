"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { AnimatePresence } from "framer-motion";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";

import NavigationLoader from "./NavigationLoader";

type NavigationLoaderContextValue = {
  loading: boolean;
  startNavigation: () => void;
};

const NavigationLoaderContext =
  createContext<NavigationLoaderContextValue | null>(
    null,
  );

type NavigationLoaderProviderProps = {
  children: ReactNode;
};

export default function NavigationLoaderProvider({
  children,
}: NavigationLoaderProviderProps) {
  const pathname = usePathname();
  const searchParams =
    useSearchParams();

  const [loading, setLoading] =
    useState(false);

  const previousUrl =
    useRef(
      `${pathname}?${searchParams.toString()}`,
    );

  const startNavigation =
    useCallback(() => {
      setLoading(true);
    }, []);

  useEffect(() => {
    const currentUrl =
      `${pathname}?${searchParams.toString()}`;

    if (
      !loading ||
      currentUrl === previousUrl.current
    ) {
      return;
    }

    previousUrl.current =
      currentUrl;

    const timer = setTimeout(() => {
      setLoading(false);
    }, 250);

    return () =>
      clearTimeout(timer);
  }, [
    pathname,
    searchParams,
    loading,
  ]);

  const value = useMemo(
    () => ({
      loading,
      startNavigation,
    }),
    [loading, startNavigation],
  );

  return (
    <NavigationLoaderContext.Provider
      value={value}
    >
      {children}

      <AnimatePresence mode="wait">
        {loading && (
          <NavigationLoader />
        )}
      </AnimatePresence>
    </NavigationLoaderContext.Provider>
  );
}

export function useNavigationLoader() {
  const context = useContext(
    NavigationLoaderContext,
  );

  if (!context) {
    throw new Error(
      "useNavigationLoader must be used within NavigationLoaderProvider.",
    );
  }

  return context;
}