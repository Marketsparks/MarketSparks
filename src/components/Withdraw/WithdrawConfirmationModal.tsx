"use client";

import {
  X,
} from "lucide-react";

import {
  formatWithdrawAmount,
} from "./withdraw.utils";

import type {
  WithdrawSummary,
  WithdrawMethod,
} from "./withdraw.types";

type WithdrawConfirmationModalProps = {
  open: boolean;

  method: WithdrawMethod;

  address: string;

bankDetails: {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  country: string;
  currency: string;
  bankAddress: string;
  swiftBic: string;
  iban: string;
  routingNumber: string;
  sortCode: string;
  ifsc: string;
};

  summary: WithdrawSummary;

  onClose: () => void;

  onConfirm: () => void;

  loading?: boolean;
};

export default function WithdrawConfirmationModal({
  open,
  method,
  address,
  bankDetails,
  summary,
  onClose,
  onConfirm,
  loading = false,
}: WithdrawConfirmationModalProps) {
  if (!open) {
    return null;
  }

  const isBank =
    method.type === "bank";

  return (
    <div
      className="
        fixed

        inset-0

        z-[999]

        flex

        items-center

        justify-center

        bg-[var(--withdraw-modal-overlay)]

        p-4

        sm:p-5
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="withdraw-confirmation-title"
    >
      <div
        className="
          w-full

          max-w-md

          rounded-[var(--withdraw-modal-radius)]

          border

          border-[var(--withdraw-modal-border)]

          bg-[var(--withdraw-modal-bg)]

          p-[var(--withdraw-modal-padding)]

          shadow-[var(--withdraw-modal-shadow)]
        "
      >
        <div
          className="
            flex

            items-start

            justify-between

            gap-4
          "
        >
          <div>
            <h2
              id="withdraw-confirmation-title"
              className="
                text-[18px]

                font-bold

                text-[var(--withdraw-modal-title)]
              "
            >
              Confirm Withdrawal
            </h2>

            <p
              className="
                mt-1.5

                text-[12px]

                leading-5

                text-[var(--withdraw-modal-text)]
              "
            >
              Review your withdrawal details
              before confirming.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close confirmation"
            className="
              flex

              h-8

              w-8

              shrink-0

              items-center

              justify-center

              rounded-lg

              border

              border-[var(--withdraw-modal-close-border)]

              bg-[var(--withdraw-modal-close-bg)]

              text-[var(--withdraw-modal-close-text)]

              transition-all

              duration-[var(--withdraw-modal-transition)]

              hover:bg-[var(--withdraw-modal-close-hover-bg)]

              disabled:cursor-not-allowed

              disabled:opacity-50
            "
          >
            <X
              size={16}
            />
          </button>
        </div>

        <div
          className="
            mt-5

            rounded-xl

            border

            border-[var(--withdraw-modal-summary-border)]

            bg-[var(--withdraw-modal-summary-bg)]

            p-4
          "
        >
          <div
            className="
              flex

              items-center

              justify-between

              gap-3
            "
          >
            <span
              className="
                text-[11px]

                text-[var(--withdraw-modal-label)]
              "
            >
              Withdrawal Method
            </span>

            <span
              className="
                text-[12px]

                font-semibold

                text-[var(--withdraw-modal-value)]
              "
            >
              {method.name}{" "}
              ({method.symbol})
            </span>
          </div>

{isBank ? (
  <>
    <InfoRow
      label="Account Holder"
      value={bankDetails.accountHolderName}
    />

    <InfoRow
      label="Bank Name"
      value={bankDetails.bankName}
    />

    <InfoRow
      label="Account Number"
      value={bankDetails.accountNumber}
    />

    <InfoRow
      label="Country"
      value={bankDetails.country}
    />

    <InfoRow
      label="Currency"
      value={bankDetails.currency}
    />

    <InfoRow
      label="Bank Address"
      value={bankDetails.bankAddress}
    />

    {bankDetails.swiftBic && (
      <InfoRow
        label="SWIFT / BIC"
        value={bankDetails.swiftBic}
      />
    )}

    {bankDetails.iban && (
      <InfoRow
        label="IBAN"
        value={bankDetails.iban}
      />
    )}

    {bankDetails.routingNumber && (
      <InfoRow
        label="Routing Number"
        value={bankDetails.routingNumber}
      />
    )}

    {bankDetails.sortCode && (
      <InfoRow
        label="Sort Code"
        value={bankDetails.sortCode}
      />
    )}

    {bankDetails.ifsc && (
      <InfoRow
        label="IFSC"
        value={bankDetails.ifsc}
      />
    )}
  </>
) : (
            <div
              className="
                mt-3

                flex

                items-start

                justify-between

                gap-3
              "
            >
              <span
                className="
                  shrink-0

                  text-[11px]

                  text-[var(--withdraw-modal-label)]
                "
              >
                Destination
              </span>

              <span
                className="
                  max-w-[65%]

                  break-all

                  text-right

                  text-[11px]

                  font-medium

                  text-[var(--withdraw-modal-value)]
                "
              >
                {address}
              </span>
            </div>
          )}

          <div
            className="
              my-3

              border-t

              border-[var(--withdraw-modal-divider)]
            "
          />

          <div
            className="
              flex

              items-center

              justify-between

              gap-3
            "
          >
            <span
              className="
                text-[11px]

                text-[var(--withdraw-modal-label)]
              "
            >
              Withdrawal Amount
            </span>

            <span
              className="
                text-[12px]

                font-semibold

                text-[var(--withdraw-modal-value)]
              "
            >
              {formatWithdrawAmount(
                summary.amount
              )}
            </span>
          </div>

          <div
            className="
              mt-2

              flex

              items-center

              justify-between

              gap-3
            "
          >
            <span
              className="
                text-[11px]

                text-[var(--withdraw-modal-label)]
              "
            >
              Network Fee
            </span>

            <span
              className="
                text-[12px]

                font-semibold

                text-[var(--withdraw-modal-value)]
              "
            >
              {formatWithdrawAmount(
                summary.networkFee
              )}
            </span>
          </div>

          <div
            className="
              mt-3

              border-t

              border-[var(--withdraw-modal-divider)]
            "
          />

          <div
            className="
              mt-3

              flex

              items-center

              justify-between

              gap-3
            "
          >
            <span
              className="
                text-[12px]

                font-semibold

                text-[var(--withdraw-modal-receive-label)]
              "
            >
              You Receive
            </span>

            <span
              className="
                text-[17px]

                font-extrabold

                text-[var(--withdraw-modal-receive-value)]
              "
            >
              {formatWithdrawAmount(
                summary.youReceive
              )}
            </span>
          </div>
        </div>

        <div
          className="
            mt-5

            flex

            gap-2.5
          "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex-1

              rounded-xl

              border

              border-[var(--withdraw-modal-cancel-border)]

              bg-[var(--withdraw-modal-cancel-bg)]

              px-4

              py-2.5

              text-[12px]

              font-semibold

              text-[var(--withdraw-modal-cancel-text)]

              transition-all

              duration-[var(--withdraw-modal-transition)]

              hover:bg-[var(--withdraw-modal-cancel-hover-bg)]

              disabled:cursor-not-allowed

              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="
              flex-1

              rounded-xl

              bg-[var(--withdraw-modal-confirm-bg)]

              px-4

              py-2.5

              text-[12px]

              font-semibold

              text-[var(--withdraw-modal-confirm-text)]

              shadow-[var(--withdraw-modal-confirm-shadow)]

              transition-all

              duration-[var(--withdraw-modal-transition)]

              hover:bg-[var(--withdraw-modal-confirm-hover-bg)]

              disabled:cursor-not-allowed

              disabled:opacity-50
            "
          >
            {loading
              ? "Processing..."
              : "Confirm Withdrawal"}
          </button>
        </div>
      </div>
    </div>
  );
}


type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <div
      className="
        mt-3
        flex
        items-start
        justify-between
        gap-3
      "
    >
      <span
        className="
          shrink-0
          text-[11px]
          text-[var(--withdraw-modal-label)]
        "
      >
        {label}
      </span>

      <span
        className="
          max-w-[65%]
          break-words
          text-right
          text-[11px]
          font-medium
          text-[var(--withdraw-modal-value)]
        "
      >
        {value}
      </span>
    </div>
  );
}