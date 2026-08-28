type EmptyStateProps = {
  title?: string;

  description?: string;

  actionLabel?: string;

  onAction?: () => void;
};

export default function EmptyState({
  title = "No orders found",
  description = "Try changing your search or filter criteria.",
  actionLabel = "Clear Filters",
  onAction,
}: EmptyStateProps) {
  return (
    <div
      className="
        rounded-xl
        border
        border-[var(--admin-card-border)]
        bg-[var(--admin-card-bg)]
        px-5
        py-10
        text-center
        shadow-[var(--admin-card-shadow)]
      "
    >
      <h3
        className="
          text-sm
          font-semibold
          text-[var(--admin-title)]
        "
      >
        {title}
      </h3>

      <p
        className="
          mx-auto
          mt-1.5
          max-w-md
          text-xs
          leading-5
          text-[var(--admin-muted)]
        "
      >
        {description}
      </p>

      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="
            mt-4
            h-9
            rounded-lg
            border
            border-[var(--admin-card-border)]
            bg-[var(--admin-card-bg)]
            px-3
            text-xs
            font-medium
            text-[var(--admin-muted)]
            transition
            hover:border-[var(--primary)]
            hover:text-[var(--admin-title)]
          "
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}