"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  ProductSearchResponse,
} from "@/types/search.types";

const MIN_QUERY_LENGTH = 2;

const SEARCH_DELAY = 250;

export function useProductSearch() {
  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState<ProductSearchResponse>({
      query: "",
      categories: [],
      products: [],
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const abortRef =
    useRef<AbortController | null>(null);

  const timerRef =
    useRef<NodeJS.Timeout | null>(null);

  const clearResults =
    useCallback(() => {
      setResults({
        query: "",
        categories: [],
        products: [],
      });

      setLoading(false);

      setError(null);
    }, []);

  useEffect(() => {
    const trimmed = query.trim();

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (abortRef.current) {
      abortRef.current.abort();
    }

    if (trimmed.length < MIN_QUERY_LENGTH) {
      clearResults();
      return;
    }

    timerRef.current = setTimeout(
      async () => {
        const controller =
          new AbortController();

        abortRef.current = controller;

        setLoading(true);

        setError(null);

        try {
          const response =
            await fetch(
              `/api/products/search?q=${encodeURIComponent(
                trimmed
              )}`,
              {
                signal: controller.signal,
              }
            );

          if (!response.ok) {
            throw new Error(
              "Search request failed."
            );
          }

          const data:
            ProductSearchResponse =
            await response.json();

          setResults(data);
        } catch (err) {
          if (
            err instanceof DOMException &&
            err.name === "AbortError"
          ) {
            return;
          }

          setError(
            "Unable to search products."
          );

          clearResults();
        } finally {
          setLoading(false);
        }
      },
      SEARCH_DELAY
    );

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [query, clearResults]);

  return {
    query,
    setQuery,

    results,

    loading,

    error,

    clearResults,
  };
}