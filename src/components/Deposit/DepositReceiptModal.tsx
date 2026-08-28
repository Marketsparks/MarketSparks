"use client";

import DepositReceiptUploader from "./DepositReceiptUploader";

import type {
  DepositMethod,
} from "./deposit.types";

import {
  formatDepositMoney,
} from "./deposit.utils";

type DepositReceiptModalProps = {
  open: boolean;

  method: DepositMethod;

  amount: number;

  file: File | null;

  submitting: boolean;

  onFileChange: (
    file: File
  ) => void;

  onClose: () => void;

  onSubmit: () => void;
};

export default function DepositReceiptModal({
  open,
  method,
  amount,
  file,
  submitting,
  onFileChange,
  onClose,
  onSubmit,
}: DepositReceiptModalProps) {
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

        bg-[var(--deposit-modal-overlay)]

        p-5
      "
    >
      <div
        className="
          w-full

          max-w-2xl

          rounded-[var(--deposit-modal-radius)]

          border

          border-[var(--deposit-modal-border)]

          bg-[var(--deposit-modal-bg)]

          p-[var(--deposit-modal-padding)]

          shadow-[var(--deposit-modal-shadow)]
        "
      >
        <h2
          className="
            text-2xl

            font-bold

            text-[var(--deposit-modal-title)]
          "
        >
          Proceed to Deposit
        </h2>

        <p
          className="
            mt-2

            text-sm

            text-[var(--deposit-modal-text)]
          "
        >
          Complete your payment using the
          details below.
        </p>

        <div
          className="
            mt-8

            space-y-4

            rounded-2xl

            border

            border-[var(--deposit-modal-summary-border)]

            bg-[var(--deposit-modal-summary-bg)]

            p-5
          "
        >
          <SummaryRow
            label="Payment Method"
            value={method.name}
          />

          <SummaryRow
            label="Wallet Address"
            value={method.address}
          />

          <SummaryRow
            label="Deposit Amount"
            value={formatDepositMoney(
              amount
            )}
          />
        </div>

        <DepositReceiptUploader
          file={file}
          onChange={onFileChange}
        />

        <div
          className="
            mt-8

            rounded-2xl

            border

            border-[var(--deposit-modal-summary-border)]

            bg-[var(--deposit-modal-summary-bg)]

            p-5
          "
        >
          <h3
            className="
              font-semibold

              text-[var(--deposit-modal-title)]
            "
          >
            Notes
          </h3>

          <ul
            className="
              mt-4

              list-disc

              space-y-2

              pl-5

              text-sm

              text-[var(--deposit-modal-text)]
            "
          >
            <li>
              Make sure the
              transaction hash is
              visible.
            </li>

            <li>
              Upload only after successful payment.
            </li>
          </ul>
        </div>

        <div
          className="
            mt-8

            flex

            justify-end

            gap-3
          "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="
              rounded-xl

              border

              border-[var(--deposit-modal-cancel-border)]

              bg-[var(--deposit-modal-cancel-bg)]

              px-6

              py-3

              font-medium

              text-[var(--deposit-modal-cancel-text)]

              transition-all
              duration-300

              hover:bg-[var(--deposit-modal-cancel-hover)]
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={!file || submitting}
            className="
              rounded-xl

              bg-[var(--deposit-modal-submit-bg)]

              px-6

              py-3

              font-semibold

              text-[var(--deposit-modal-submit-text)]

              transition-all
              duration-300

              hover:bg-[var(--deposit-modal-submit-hover)]

              disabled:cursor-not-allowed

              disabled:bg-[var(--deposit-modal-submit-disabled-bg)]

              disabled:text-[var(--deposit-modal-submit-disabled-text)]
            "
          >
{submitting
  ? "Submitting..."
  : "Submit Deposit"}
          </button>
        </div>
      </div>
    </div>
  );
}

type SummaryRowProps = {
  label: string;

  value: string;
};

function SummaryRow({
  label,
  value,
}: SummaryRowProps) {
  return (
    <div
      className="
        flex

        items-start

        justify-between

        gap-4
      "
    >
      <span
        className="
          text-sm

          text-[var(--deposit-modal-text)]
        "
      >
        {label}
      </span>

      <span
        className="
          max-w-[60%]

          break-all

          text-right

          font-medium

          text-[var(--deposit-modal-title)]
        "
      >
        {value}
      </span>
    </div>
  );
}