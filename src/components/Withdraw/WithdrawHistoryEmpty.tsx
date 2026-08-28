"use client";

import {
  Wallet,
} from "lucide-react";

export default function WithdrawHistoryEmpty() {
  return (
    <div
      className="
        flex

        flex-col

        items-center

        justify-center

        rounded-[var(--withdraw-history-empty-radius)]

        border

        border-[var(--withdraw-history-empty-border)]

        bg-[var(--withdraw-history-empty-bg)]

        p-[var(--withdraw-history-empty-padding)]

        text-center

        shadow-[var(--withdraw-history-empty-shadow)]

        transition-all

        duration-[var(--withdraw-history-empty-transition)]
      "
    >
      <div
        className="
          flex

          h-12

          w-12

          items-center

          justify-center

          rounded-full

          bg-[var(--withdraw-history-empty-icon-bg)]
        "
      >
        <Wallet
          size={22}
          strokeWidth={2}
          className="
            text-[var(--withdraw-history-empty-icon-color)]
          "
        />
      </div>

      <h3
        className="
          mt-4

          text-[16px]

          font-bold

          text-[var(--withdraw-history-empty-title)]
        "
      >
        No Withdrawals Yet
      </h3>

      <p
        className="
          mt-2

          max-w-sm

          text-[12px]

          leading-6

          text-[var(--withdraw-history-empty-text)]
        "
      >
        Your withdrawal transactions will
        appear here after you submit your
        first withdrawal request.
      </p>
    </div>
  );
}