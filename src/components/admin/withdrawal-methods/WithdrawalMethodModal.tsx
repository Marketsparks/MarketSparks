"use client";

import WithdrawalMethodForm from "./WithdrawalMethodForm";

import type {
  WithdrawalMethodFormValues,
} from "./withdrawal-method.types";

type WithdrawalMethodModalProps = {
  open: boolean;

  title: string;

  description: string;

  value: WithdrawalMethodFormValues;

  loading?: boolean;

  submitLabel?: string;

onChange: (
  value: WithdrawalMethodFormValues
) => void;

  onSubmit: () => void;

  onClose: () => void;
};

export default function WithdrawalMethodModal({
  open,
  title,
  description,
  value,
  loading = false,
  submitLabel = "Save Method",
  onChange,
  onSubmit,
  onClose,
}: WithdrawalMethodModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-[var(--admin-modal-overlay)]
        p-4
      "
    >
      <div
        className="
          flex
          max-h-[90vh]
          w-full
          max-w-4xl
          flex-col
          overflow-hidden
          rounded-[var(--admin-modal-radius)]
          border
          border-[var(--admin-modal-border)]
          bg-[var(--admin-modal-bg)]
          shadow-[var(--admin-modal-shadow)]
        "
      >
        <div
          className="
            flex
            items-start
            justify-between
            border-b
            border-[var(--admin-modal-border)]
            bg-[var(--admin-modal-header-bg)]
            px-6
            py-5
          "
        >
          <div>
            <h2
              className="
                text-xl
                font-bold
                text-[var(--admin-title)]
              "
            >
              {title}
            </h2>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-[var(--admin-muted)]
              "
            >
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              text-[var(--admin-text)]
              transition-all
              duration-300
              hover:bg-[var(--admin-button-secondary-hover)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            ✕
          </button>
        </div>

        <div
          className="
            flex-1
            overflow-y-auto
            px-6
            py-6
          "
        >
          <WithdrawalMethodForm
            value={value}
            loading={loading}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </div>

        <div
          className="
            flex
            items-center
            justify-end
            gap-3
            border-t
            border-[var(--admin-modal-border)]
            bg-[var(--admin-modal-footer-bg)]
            px-6
            py-5
          "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-[var(--admin-input-radius)]
              border
              border-[var(--admin-button-secondary-border)]
              bg-[var(--admin-button-secondary-bg)]
              px-5
              py-3
              text-sm
              font-semibold
              text-[var(--admin-button-secondary-text)]
              transition-all
              duration-300
              hover:bg-[var(--admin-button-secondary-hover)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="
              rounded-[var(--admin-input-radius)]
              bg-[var(--admin-button-primary-bg)]
              px-5
              py-3
              text-sm
              font-semibold
              text-[var(--admin-button-primary-text)]
              transition-all
              duration-300
              hover:bg-[var(--admin-button-primary-hover)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading
              ? "Saving..."
              : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}