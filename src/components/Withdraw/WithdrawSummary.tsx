"use client";

import {
  formatWithdrawAmount,
} from "./withdraw.utils";

import type {
  WithdrawSummary as WithdrawSummaryType,
} from "./withdraw.types";

type WithdrawSummaryProps = {
  summary: WithdrawSummaryType;
};

export default function WithdrawSummary({
  summary,
}: WithdrawSummaryProps) {
  return (
    <section
      className="
        mt-6

        rounded-[var(--withdraw-summary-radius)]

        border

        border-[var(--withdraw-summary-border)]

        bg-[var(--withdraw-summary-bg)]

        p-[var(--withdraw-summary-padding)]

        shadow-[var(--withdraw-summary-shadow)]

        transition-all

        duration-[var(--withdraw-summary-transition)]
      "
    >
      <h2
        className="
          text-[18px]

          font-bold

          text-[var(--withdraw-summary-title)]
        "
      >
        Withdrawal Summary
      </h2>

      <div
        className="
          mt-5

          space-y-3
        "
      >
        <SummaryRow
          label="Payment Method"
          value={summary.method}
        />

        <SummaryRow
          label="Withdrawal Amount"
          value={formatWithdrawAmount(
            summary.amount
          )}
        />

        <SummaryRow
          label="Network Fee"
          value={formatWithdrawAmount(
            summary.networkFee
          )}
        />
      </div>

      <div
        className="
          my-4

          border-t

          border-[var(--withdraw-summary-divider)]
        "
      />

      <div
        className="
          flex

          items-end

          justify-between

          gap-4
        "
      >
        <span
          className="
            text-[13px]

            font-semibold

            text-[var(--withdraw-summary-receive-label)]
          "
        >
          You Receive
        </span>

        <span
          className="
            text-[20px]

            font-extrabold

            tracking-[-0.02em]

            text-[var(--withdraw-summary-receive-value)]
          "
        >
          {formatWithdrawAmount(
            summary.youReceive
          )}
        </span>
      </div>
    </section>
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

        items-center

        justify-between

        gap-4
      "
    >
      <span
        className="
          text-[12px]

          text-[var(--withdraw-summary-label)]
        "
      >
        {label}
      </span>

      <span
        className="
          text-[12px]

          font-semibold

          text-[var(--withdraw-summary-value)]
        "
      >
        {value}
      </span>
    </div>
  );
}