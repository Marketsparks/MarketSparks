"use client";

import type {
  AppSearchLoadingProps,
} from "./app-search.types";

export default function AppSearchLoading({
  rows = 5,
}: AppSearchLoadingProps) {
  return (
    <div
      className="
        py-2
      "
    >
      {Array.from({
        length: rows,
      }).map((_, index) => (
        <div
          key={index}
          className="
            relative
            flex
            items-center
            gap-3
            py-3
            animate-pulse
          "
        >
          <div
            className="
              h-14
              w-14
              flex-shrink-0
              rounded-xl
              bg-[var(--surface-card)]
            "
          />

          <div
            className="
              flex-1
              space-y-2
            "
          >
            <div
              className="
                h-4
                w-3/5
                rounded-full
                bg-[var(--surface-card)]
              "
            />

            <div
              className="
                h-3
                w-24
                rounded-full
                bg-[var(--surface-card)]
              "
            />
          </div>

          {index <
            rows - 1 && (
            <div
              className="
                absolute
                bottom-0
                left-[72px]
                right-0
                h-px
                bg-[var(--border)]
              "
            />
          )}
        </div>
      ))}
    </div>
  );
}