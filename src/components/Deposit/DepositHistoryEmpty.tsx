"use client";

import {
  Wallet,
} from "lucide-react";

export default function DepositHistoryEmpty() {
  return (
    <div
      className="
        flex

        flex-col

        items-center

        justify-center

        rounded-[var(--deposit-history-empty-radius)]

        border

        border-[var(--deposit-history-empty-border)]

        bg-[var(--deposit-history-empty-bg)]

        p-[var(--deposit-history-empty-padding)]

        text-center

        shadow-[var(--deposit-history-empty-shadow)]

        transition-all

        duration-[var(--deposit-history-empty-transition)]
      "
    >
      <div
        className="
          flex

          h-16

          w-16

          items-center

          justify-center

          rounded-full

          bg-[var(--deposit-history-empty-icon-bg)]
        "
      >
        <Wallet
          size={30}
          className="
            text-[var(--deposit-history-empty-icon-color)]
          "
        />
      </div>

      <h3
        className="
          mt-6

          text-xl

          font-bold

          text-[var(--deposit-history-empty-title)]
        "
      >
        No Deposits Yet
      </h3>

      <p
        className="
          mt-3

          max-w-md

          text-sm

          leading-7

          text-[var(--deposit-history-empty-text)]
        "
      >
        You have not submitted any deposit requests yet.
        Your recent deposits will appear here after they have
        been created.
      </p>
    </div>
  );
}