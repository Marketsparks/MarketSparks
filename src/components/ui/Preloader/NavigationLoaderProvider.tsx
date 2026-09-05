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
import { usePathname } from "next/navigation";

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

  const [loading, setLoading] =
    useState(false);

  const previousPathname =
    useRef(pathname);

  const startNavigation =
    useCallback(() => {
      setLoading(true);
    }, []);

  useEffect(() => {
    if (
      !loading ||
      pathname === previousPathname.current
    ) {
      return;
    }

    previousPathname.current =
      pathname;

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () =>
      clearTimeout(timer);
  }, [pathname, loading]);

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