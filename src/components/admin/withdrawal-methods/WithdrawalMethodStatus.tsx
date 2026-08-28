"use client";

type WithdrawalMethodStatusProps = {
  active: boolean;
};

export default function WithdrawalMethodStatus({
  active,
}: WithdrawalMethodStatusProps) {
  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        transition-all
        duration-300

        ${
          active
            ? `
              bg-[var(--admin-status-success-bg)]
              text-[var(--admin-status-success-text)]
            `
            : `
              bg-[var(--admin-status-failed-bg)]
              text-[var(--admin-status-failed-text)]
            `
        }
      `}
    >
      {active
        ? "Active"
        : "Disabled"}
    </span>
  );
}