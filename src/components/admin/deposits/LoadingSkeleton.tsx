export default function LoadingSkeleton() {
  return (
    <div
      className="
        overflow-hidden

        rounded-[var(--admin-deposit-skeleton-radius)]

        border

        border-[var(--admin-deposit-skeleton-border)]

        bg-[var(--admin-deposit-skeleton-bg)]

        shadow-[var(--admin-deposit-skeleton-shadow)]

        transition-all
        duration-300
      "
    >
      <div
        className="
          animate-pulse

          p-4

          sm:p-5

          lg:p-6
        "
      >
        <div
          className="
            mb-5

            hidden

            h-12

            rounded-xl

            bg-[var(--admin-deposit-skeleton-block)]

            lg:block
          "
        />

        <div className="space-y-3">
          {Array.from({
            length: 8,
          }).map((_, index) => (
            <div
              key={index}
              className="
                flex

                items-center

                gap-3

                rounded-[var(--admin-deposit-skeleton-item-radius)]

                border

                border-[var(--admin-deposit-skeleton-item-border)]

                bg-[var(--admin-deposit-skeleton-item-bg)]

                p-3

                transition-colors

                sm:gap-4

                sm:p-4
              "
            >
              <div
                className="
                  h-10

                  w-10

                  shrink-0

                  rounded-full

                  bg-[var(--admin-deposit-skeleton-block)]

                  sm:h-12

                  sm:w-12
                "
              />

              <div className="flex-1 space-y-2">
                <div
                  className="
                    h-4

                    w-2/5

                    rounded-md

                    bg-[var(--admin-deposit-skeleton-block)]
                  "
                />

                <div
                  className="
                    h-3

                    w-3/5

                    rounded-md

                    bg-[var(--admin-deposit-skeleton-block)]
                  "
                />
              </div>

              <div
                className="
                  hidden

                  h-8

                  w-24

                  rounded-lg

                  bg-[var(--admin-deposit-skeleton-block)]

                  md:block
                "
              />

              <div
                className="
                  hidden

                  h-8

                  w-20

                  rounded-lg

                  bg-[var(--admin-deposit-skeleton-block)]

                  lg:block
                "
              />

              <div
                className="
                  h-9

                  w-20

                  rounded-lg

                  bg-[var(--admin-deposit-skeleton-block)]

                  sm:w-24
                "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}