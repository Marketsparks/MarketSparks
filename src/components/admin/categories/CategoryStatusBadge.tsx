"use client";

type CategoryStatusBadgeProps = {
  isActive: boolean;
};

export default function CategoryStatusBadge({
  isActive,
}: CategoryStatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex",
        "items-center",
        "rounded-full",
        "px-2.5",
        "py-1",
        "text-xs",
        "font-medium",
        isActive
          ? "bg-[var(--admin-status-success-bg)] text-[var(--admin-status-success-text)]"
          : "bg-[var(--admin-status-danger-bg)] text-[var(--admin-status-danger-text)]",
      ].join(" ")}
    >
      {isActive
        ? "Active"
        : "Inactive"}
    </span>
  );
}