"use client";

type AppSearchPopularProps = {
  searches: string[];

  onSelect: (
    value: string,
  ) => void;
};

export default function AppSearchPopular({
  searches,
  onSelect,
}: AppSearchPopularProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <section
      className="
        mt-8
      "
    >
      <div
        className="
          mb-3
          flex
          items-center
          justify-between
        "
      >
        <h2
          className="
            text-[13px]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-[var(--foreground-muted)]
          "
        >
          Popular Searches
        </h2>

        <div
          className="
            h-px
            flex-1
            ml-4
            bg-[var(--border)]
          "
        />
      </div>

      <div
        className="
          flex
          flex-wrap
          gap-2
        "
      >
        {searches.map(
          (search) => (
            <button
              key={search}
              type="button"
              onClick={() =>
                onSelect(
                  search,
                )
              }
              className="
                rounded-full
                border
                border-[var(--border)]
                bg-transparent
                px-3
                py-1.5
                text-[13px]
                font-medium
                text-[var(--foreground-muted)]
                transition-all
                duration-200
                hover:border-[var(--primary)]
                hover:text-[var(--primary)]
              "
            >
              {search}
            </button>
          ),
        )}
      </div>
    </section>
  );
}