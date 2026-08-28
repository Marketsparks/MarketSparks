"use client";

import { Wallet } from "lucide-react";

type DepositBalanceProps = {
  balance: number;
};

export default function DepositBalance({
  balance,
}: DepositBalanceProps) {
  const formattedBalance = `$${balance.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <section
      className="
        rounded-[var(--deposit-balance-radius)]
        border
        border-[var(--deposit-balance-border)]
        bg-[var(--deposit-balance-bg)]
        p-[var(--deposit-balance-padding)]
        shadow-[var(--deposit-balance-shadow)]
        transition-all
        duration-[var(--deposit-balance-transition)]
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
          <p
            className="
              text-[13px]
              font-medium
              text-[var(--deposit-balance-title)]
              sm:text-[14px]
            "
          >
            Wallet Balance
          </p>

          <h2
            className="
              mt-2
              text-[30px]
              font-extrabold
              leading-none
              tracking-[-0.02em]
              text-[var(--deposit-balance-amount)]
              sm:text-[36px]
              lg:text-[42px]
            "
          >
            {formattedBalance}
          </h2>
        </div>

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-[var(--deposit-balance-icon-bg)]
            text-[var(--deposit-balance-icon-color)]
            shadow-md
            sm:h-16
            sm:w-16
          "
        >
          <Wallet
            size={28}
            strokeWidth={2}
          />
        </div>
      </div>

      <p
        className="
          mt-4
          text-[14px]
          leading-6
          text-[var(--deposit-balance-text)]
        "
      >
        Deposit funds into your wallet to purchase products, subscribe to plans, and access premium features.
      </p>
    </section>
  );
}