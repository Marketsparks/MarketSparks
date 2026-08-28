"use client";

import {
  useState,
} from "react";

import {
  LoaderCircle,
} from "lucide-react";

import {
  formatWithdrawAmount,
} from "./withdraw.utils";

type WithdrawActionProps = {
  amount: number;

  youReceive: number;

  disabled?: boolean;

  onWithdraw: () =>
    | Promise<void>
    | void;
};

export default function WithdrawAction({
  amount,
  youReceive,
  disabled = false,
  onWithdraw,
}: WithdrawActionProps) {
  const [loading, setLoading] =
    useState(false);

  async function handleWithdraw() {
    if (
      disabled ||
      loading
    ) {
      return;
    }

    setLoading(true);

    try {
      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            300
          )
      );

      await onWithdraw();
    } finally {
      setLoading(false);
    }
  }

  const buttonLabel =
    amount > 0
      ? `Withdraw ${formatWithdrawAmount(
          youReceive
        )}`
      : "Withdraw Funds";

  return (
    <section
      className="
        mt-6
      "
    >
      <button
        type="button"
        disabled={
          disabled ||
          loading
        }
        onClick={
          handleWithdraw
        }
        className="
          inline-flex

          w-full

          items-center

          justify-center

          gap-2

          rounded-[var(--withdraw-action-radius)]

          bg-[var(--withdraw-action-bg)]

          px-5

          py-[var(--withdraw-action-padding-y)]

          text-[14px]

          font-semibold

          text-[var(--withdraw-action-text)]

          shadow-[var(--withdraw-action-shadow)]

          transition-all

          duration-[var(--withdraw-action-transition)]

          hover:bg-[var(--withdraw-action-hover-bg)]

          hover:text-[var(--withdraw-action-hover-text)]

          disabled:cursor-not-allowed

          disabled:bg-[var(--withdraw-action-disabled-bg)]

          disabled:text-[var(--withdraw-action-disabled-text)]

          disabled:shadow-none
        "
      >
        {loading ? (
          <>
            <LoaderCircle
              size={17}
              className="
                animate-spin
              "
            />

            Processing Withdrawal...
          </>
        ) : (
          buttonLabel
        )}
      </button>

      <p
        className="
          mt-3

          text-center

          text-[11px]

          leading-5

          text-[var(--withdraw-action-note)]
        "
      >
        Review your withdrawal details
        carefully before continuing.
      </p>
    </section>
  );
}