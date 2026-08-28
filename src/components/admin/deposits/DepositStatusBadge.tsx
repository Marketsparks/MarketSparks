import clsx from "clsx";

import type {
  DepositStatus,
} from "./types";

type DepositStatusBadgeProps = {
  status: DepositStatus;
};

const STATUS_STYLES: Record<
  DepositStatus,
  string
> = {
  PENDING:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

  APPROVED:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

  REJECTED:
    "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

const STATUS_LABELS: Record<
  DepositStatus,
  string
> = {
  PENDING: "Pending",

  APPROVED: "Approved",

  REJECTED: "Rejected",
};

export default function DepositStatusBadge({
  status,
}: DepositStatusBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        STATUS_STYLES[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}