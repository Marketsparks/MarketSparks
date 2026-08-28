"use client";

import Button from "@/components/ui/Button";

type WalletEmptyStateProps = {
  onRefresh?: () => void;
};

export default function WalletEmptyState({
  onRefresh,
}: WalletEmptyStateProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-[var(--admin-card-radius)]
        border
        border-dashed
        border-[var(--admin-card-border)]
        bg-[var(--admin-card-bg)]
        px-8
        py-16
        text-center
      "
    >
      <div
        className="
          mb-4
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-[var(--admin-muted-bg)]
          text-2xl
        "
      >
        💳
      </div>

      <h3
        className="
          text-xl
          font-semibold
          text-[var(--admin-title)]
        "
      >
        No wallet users found
      </h3>

      <p
        className="
          mt-2
          max-w-md
          text-sm
          text-[var(--admin-muted)]
        "
      >
        No users match your current search. Try another keyword or refresh the page.
      </p>

      {onRefresh && (
        <Button
          className="mt-6"
          onClick={onRefresh}
        >
          Refresh
        </Button>
      )}
    </div>
  );
}