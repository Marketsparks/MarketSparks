"use client";

import {
  useState,
} from "react";

import {
  LoaderCircle,
} from "lucide-react";

type DepositActionProps = {
  disabled?: boolean;

  onContinue: () => Promise<void> | void;
};

export default function DepositAction({
  disabled = false,
  onContinue,
}: DepositActionProps) {
  const [loading, setLoading] =
    useState(false);

  async function handleContinue() {
    setLoading(true);

    await new Promise(
      (resolve) =>
        setTimeout(resolve, 300)
    );

    await onContinue();

    setLoading(false);
  }

  return (
    <section
      className="
        mt-8
      "
    >
      <button
        type="button"
        disabled={
          disabled || loading
        }
        onClick={handleContinue}
        className="
          inline-flex

          w-full

          items-center

          justify-center

          gap-2

          rounded-[var(--deposit-action-button-radius)]

          border

          border-[var(--deposit-action-button-border)]

          bg-[var(--deposit-action-button-bg)]

          px-6

          py-[var(--deposit-action-button-padding-y)]

          text-[16px]

          font-semibold

          text-[var(--deposit-action-button-text)]

          shadow-[var(--deposit-action-button-shadow)]

          transition-all
          duration-300

          hover:border-[var(--deposit-action-button-hover-border)]

          hover:bg-[var(--deposit-action-button-hover)]

          hover:text-[var(--deposit-action-button-hover-text)]

          disabled:cursor-not-allowed

          disabled:border-[var(--deposit-action-button-disabled-border)]

          disabled:bg-[var(--deposit-action-button-disabled-bg)]

          disabled:text-[var(--deposit-action-button-disabled-text)]

          disabled:shadow-none
        "
      >
        {loading ? (
          <>
            <LoaderCircle
              size={18}
              className="
                animate-spin
              "
            />

            Preparing Deposit...
          </>
        ) : (
          "Continue to Deposit"
        )}
      </button>

      <p
        className="
          mt-4

          text-center

          text-[13px]

          leading-6

          text-[var(--deposit-action-note)]
        "
      >
        You will review your deposit details and upload your payment receipt before submitting your request.
      </p>
    </section>
  );
}