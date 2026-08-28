"use client";

import {
  Loader2,
  X,
} from "lucide-react";

import WithdrawalDetails from "./WithdrawalDetails";

import type {
  Withdrawal,
} from "./withdrawal.types";

type WithdrawalReviewModalProps = {
  open: boolean;

  withdrawal: Withdrawal | null;

  loading: boolean;

  onClose: () => void;

  onApprove: () => void;

  onReject: () => void;
};

export default function WithdrawalReviewModal({
  open,
  withdrawal,
  loading,
  onClose,
  onApprove,
  onReject,
}: WithdrawalReviewModalProps) {
  if (
    !open ||
    !withdrawal
  ) {
    return null;
  }

  const canReview =
    withdrawal.status ===
      "pending" ||
    withdrawal.status ===
      "processing";

  return (
    <div
      className="
        fixed

        inset-0

        z-[200]

        flex

        items-center

        justify-center

        bg-black/60

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

          rounded-2xl

          border

          border-[var(--admin-border)]

          bg-[var(--admin-card-bg)]

          shadow-2xl
        "
      >
        <div
          className="
            flex

            items-center

            justify-between

            border-b

            border-[var(--admin-border)]

            px-6

            py-5
          "
        >
          <div>
            <h2
              className="
                text-xl

                font-bold

                text-[var(--admin-foreground)]
              "
            >
              Review Withdrawal
            </h2>

            <p
              className="
                mt-1

                text-sm

                text-[var(--admin-muted-foreground)]
              "
            >
              Review the withdrawal details before taking action.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-lg

              p-2

              transition-colors

              hover:bg-[var(--admin-muted-bg)]
            "
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="
            flex-1

            overflow-y-auto

            p-6
          "
        >
          <WithdrawalDetails
            withdrawal={
              withdrawal
            }
          />
        </div>

        <div
          className="
            flex

            flex-col-reverse

            gap-3

            border-t

            border-[var(--admin-border)]

            p-6

            sm:flex-row

            sm:justify-end
          "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-lg

              border

              border-[var(--admin-border)]

              px-5

              py-2.5

              text-sm

              font-semibold

              text-[var(--admin-foreground)]

              transition-all

              hover:bg-[var(--admin-muted-bg)]
            "
          >
            Close
          </button>

          {canReview && (
            <>
              <button
                type="button"
                onClick={onReject}
                disabled={loading}
                className="
                  rounded-lg

                  border

                  border-[var(--admin-danger)]

                  px-5

                  py-2.5

                  text-sm

                  font-semibold

                  text-[var(--admin-danger)]

                  transition-all

                  hover:bg-[var(--admin-danger)]

                  hover:text-white

                  disabled:opacity-60
                "
              >
                {loading ? (
                  <span
                    className="
                      flex

                      items-center

                      justify-center

                      gap-2
                    "
                  >
                    <Loader2
                      size={16}
                      className="
                        animate-spin
                      "
                    />

                    Processing...
                  </span>
                ) : (
                  "Reject"
                )}
              </button>

              <button
                type="button"
                onClick={onApprove}
                disabled={loading}
                className="
                  rounded-lg

                  bg-[var(--admin-primary)]

                  px-5

                  py-2.5

                  text-sm

                  font-semibold

                  text-[var(--admin-primary-foreground)]

                  transition-opacity

                  hover:opacity-90

                  disabled:opacity-60
                "
              >
                {loading ? (
                  <span
                    className="
                      flex

                      items-center

                      justify-center

                      gap-2
                    "
                  >
                    <Loader2
                      size={16}
                      className="
                        animate-spin
                      "
                    />

                    Processing...
                  </span>
                ) : (
                  "Approve"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}