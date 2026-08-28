"use client";

import Button from "@/components/ui/Button";

type EmptyStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({
  title = "No deposits found",
  description = "There are currently no deposits matching the selected filters.",
  actionLabel = "Clear Filters",
  onAction,
}: EmptyStateProps) {
  return (
    <div
      className="
        flex

        min-h-[260px]

        flex-col

        items-center

        justify-center

        rounded-[var(--admin-deposit-empty-radius)]

        border

        border-[var(--admin-deposit-empty-border)]

        bg-[var(--admin-deposit-empty-bg)]

        px-5

        py-10

        text-center

        shadow-[var(--admin-deposit-empty-shadow)]

        transition-all
        duration-300

        sm:min-h-[320px]

        sm:px-8

        sm:py-14
      "
    >
      <div
        className="
          mb-5

          flex

          h-16

          w-16

          items-center

          justify-center

          rounded-full

          border

          border-[var(--admin-deposit-empty-icon-border)]

          bg-[var(--admin-deposit-empty-icon-bg)]

          text-3xl

          shadow-[var(--admin-deposit-empty-icon-shadow)]

          sm:h-20

          sm:w-20

          sm:text-4xl
        "
      >
        💳
      </div>

      <h2
        className="
          text-lg

          font-semibold

          text-[var(--admin-deposit-empty-title)]

          sm:text-xl
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-3

          max-w-md

          text-sm

          leading-6

          text-[var(--admin-deposit-empty-text)]
        "
      >
        {description}
      </p>

      {onAction && (
        <div
          className="
            mt-7

            w-full

            sm:mt-8

            sm:w-auto
          "
        >
          <Button
            type="button"
            variant="secondary"
            className="
              h-11

              w-full

              px-6

              sm:h-12

              sm:w-auto
            "
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}