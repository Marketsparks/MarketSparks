"use client";

import {
  SearchX,
} from "lucide-react";

import type {
  AppSearchEmptyProps,
} from "./app-search.types";

export default function AppSearchEmpty({
  query,
}: AppSearchEmptyProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        py-14
        text-center
      "
    >
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[var(--surface-card)]
        "
      >
        <SearchX
          size={24}
          className="
            text-[var(--foreground-muted)]
          "
        />
      </div>

      <h3
        className="
          mt-5
          text-[17px]
          font-semibold
          text-[var(--foreground)]
        "
      >
        No products found
      </h3>

      <p
        className="
          mt-2
          max-w-sm
          text-[14px]
          leading-6
          text-[var(--foreground-muted)]
        "
      >
        We couldn't find any products matching{" "}
        <span
          className="
            font-semibold
            text-[var(--foreground)]
          "
        >
          "{query}"
        </span>
        . Try another keyword or browse one of our popular searches below.
      </p>
    </div>
  );
}