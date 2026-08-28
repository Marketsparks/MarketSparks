"use client";

import type {
  DepositSummary as DepositSummaryType,
} from "./deposit.types";

import {
  formatDepositMoney,
} from "./deposit.utils";

type DepositSummaryProps = {
  summary: DepositSummaryType;
};

export default function DepositSummary({
  summary,
}: DepositSummaryProps) {
  const formatMoney = (
    value: number
  ) =>
    new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
      }
    ).format(value);

  return (
    <section
      className="
        mt-8

        rounded-[var(--deposit-summary-radius)]

        border

        border-[var(--deposit-summary-border)]

        bg-[var(--deposit-summary-bg)]

        p-[var(--deposit-summary-padding)]

        shadow-[var(--deposit-summary-shadow)]
      "
    >
      <h2
        className="
          text-[20px]

          font-bold

          text-[var(--deposit-summary-title)]
        "
      >
        Deposit Summary
      </h2>

      <div
        className="
          mt-6

          space-y-4
        "
      >
        <SummaryRow
          label="Payment Method"
          value={summary.method}
        />

        <SummaryRow
          label="Deposit Amount"
          value={formatDepositMoney(
            summary.amount
          )}
        />

        <SummaryRow
          label="Gateway Fee"
          value={formatDepositMoney(
            summary.gatewayFee
          )}
        />

        <SummaryRow
          label="Bonus"
          value={formatDepositMoney(
            summary.bonus
          )}
        />

        <div
          className="
            border-t

            border-[var(--deposit-summary-divider)]

            pt-4
          "
        >
          <SummaryRow
            label="Total Credit"
            value={formatDepositMoney(
              summary.totalCredit
            )}
            total
          />
        </div>
      </div>
    </section>
  );
}

type SummaryRowProps = {
  label: string;

  value: string;

  total?: boolean;
};

function SummaryRow({
  label,
  value,
  total = false,
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
          text-[14px]

          text-[var(--deposit-summary-label)]
        "
      >
        {label}
      </span>

      <span
        className={
          total
            ? `
                text-[18px]

                font-bold

                text-[var(--deposit-summary-total)]
              `
            : `
                text-[15px]

                font-semibold

                text-[var(--deposit-summary-value)]
              `
        }
      >
        {value}
      </span>
    </div>
  );
}