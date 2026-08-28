type UserStatusBadgeProps = {
  status:
    | "PENDING_VERIFICATION"
    | "ACTIVE"
    | "SUSPENDED"
    | "DEACTIVATED"
    | "PENDING_DELETION";
};

const STATUS_STYLES = {
  PENDING_VERIFICATION: {
    label: "Pending Verification",
    background:
      "var(--admin-status-pending-bg)",
    color:
      "var(--admin-status-pending-text)",
  },

  ACTIVE: {
    label: "Active",
    background:
      "var(--admin-status-success-bg)",
    color:
      "var(--admin-status-success-text)",
  },

  SUSPENDED: {
    label: "Suspended",
    background:
      "var(--admin-status-failed-bg)",
    color:
      "var(--admin-status-failed-text)",
  },

  DEACTIVATED: {
    label: "Deactivated",
    background:
      "var(--admin-status-failed-bg)",
    color:
      "var(--admin-status-failed-text)",
  },

  PENDING_DELETION: {
    label: "Pending Deletion",
    background:
      "var(--admin-status-pending-bg)",
    color:
      "var(--admin-status-pending-text)",
  },
} as const;

export function UserStatusBadge({
  status,
}: UserStatusBadgeProps) {
  const config =
    STATUS_STYLES[status];

  return (
    <span
      className="
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        whitespace-nowrap
      "
      style={{
        background:
          config.background,
        color: config.color,
      }}
    >
      {config.label}
    </span>
  );
}