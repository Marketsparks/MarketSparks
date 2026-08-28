"use client";

import {
  Pencil,
  Power,
  PowerOff,
  Trash2,
} from "lucide-react";

type WithdrawalMethodActionsProps = {
  active: boolean;

  loading?: boolean;

  onEdit: () => void;

  onToggle: () => void;

  onDelete: () => void;
};

export default function WithdrawalMethodActions({
  active,
  loading = false,
  onEdit,
  onToggle,
  onDelete,
}: WithdrawalMethodActionsProps) {
  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        justify-end
        gap-2
      "
    >
      <button
        type="button"
        disabled={loading}
        onClick={onEdit}
        className="
          inline-flex
          h-10
          items-center
          justify-center
          gap-2
          rounded-[var(--admin-input-radius)]
          border
          border-[var(--admin-button-secondary-border)]
          bg-[var(--admin-button-secondary-bg)]
          px-4
          text-sm
          font-medium
          text-[var(--admin-button-secondary-text)]
          transition-all
          duration-300
          hover:bg-[var(--admin-button-secondary-hover)]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        <Pencil size={16} />

        Edit
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={onToggle}
        className="
          inline-flex
          h-10
          items-center
          justify-center
          gap-2
          rounded-[var(--admin-input-radius)]
          border
          border-[var(--admin-button-secondary-border)]
          bg-[var(--admin-button-secondary-bg)]
          px-4
          text-sm
          font-medium
          text-[var(--admin-button-secondary-text)]
          transition-all
          duration-300
          hover:bg-[var(--admin-button-secondary-hover)]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {active ? (
          <>
            <PowerOff size={16} />
            Disable
          </>
        ) : (
          <>
            <Power size={16} />
            Enable
          </>
        )}
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={onDelete}
        className="
          inline-flex
          h-10
          items-center
          justify-center
          gap-2
          rounded-[var(--admin-input-radius)]
          bg-[var(--admin-button-danger-bg)]
          px-4
          text-sm
          font-medium
          text-[var(--admin-button-danger-text)]
          transition-all
          duration-300
          hover:bg-[var(--admin-button-danger-hover)]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        <Trash2 size={16} />

        Delete
      </button>
    </div>
  );
}