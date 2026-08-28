"use client";

import { Wallet } from "lucide-react";

import {
  formatWithdrawAmount,
} from "./withdraw.utils";

type WithdrawBalanceProps = {
  availableBalance: number;

  profitBalance: number;

  lockedBalance: number;
};

export default function WithdrawBalance({
  availableBalance,
  profitBalance,
  lockedBalance,
}: WithdrawBalanceProps) {
  const totalBalance =
    availableBalance +
    profitBalance +
    lockedBalance;

  return (
    <section
      className="
        rounded-[var(--withdraw-balance-radius)]
        border
        border-[var(--withdraw-balance-border)]
        bg-[var(--withdraw-balance-bg)]
        p-[var(--withdraw-balance-padding)]
        shadow-[var(--withdraw-balance-shadow)]
        transition-all
        duration-[var(--withdraw-balance-transition)]
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
        <div
          className="
            min-w-0
          "
        >
<p
  className="
    text-[12px]
    font-medium
    text-[var(--withdraw-balance-label)]
  "
>
  Total Balance
</p>

          <h2
            className="
              mt-2
              text-[28px]
              font-extrabold
              leading-none
              tracking-[-0.02em]
              text-[var(--withdraw-balance-value)]
              sm:text-[32px]
            "
          >
{formatWithdrawAmount(
  totalBalance
)}
          </h2>

          <div
            className="
              mt-4
              space-y-1
              text-[12px]
            "
          >

<div
  className="
    flex
    items-center
    justify-between
    gap-4
    text-[var(--withdraw-balance-text)]
  "
>
  <span>
    Wallet Balance
  </span>

  <span
    className="font-medium"
  >
    {formatWithdrawAmount(
      availableBalance
    )}
  </span>
</div>

            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                text-[var(--withdraw-balance-text)]
              "
            >
              <span>
                Profit Balance
              </span>

              <span
                className="font-medium"
              >
                {formatWithdrawAmount(
                  profitBalance
                )}
              </span>
            </div>

            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                text-[var(--withdraw-balance-text)]
              "
            >
              <span>
                Locked Balance
              </span>

              <span
                className="font-medium"
              >
                {formatWithdrawAmount(
                  lockedBalance
                )}
              </span>
            </div>
          </div>

          <p
            className="
              mt-4
              text-[12px]
              text-[var(--withdraw-balance-text)]
            "
          >
            Locked funds are awaiting
            withdrawal review.
          </p>
        </div>

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[var(--withdraw-balance-icon-bg)]
            text-[var(--withdraw-balance-icon-color)]
            shadow-[var(--withdraw-balance-icon-shadow)]
            sm:h-14
            sm:w-14
          "
        >
          <Wallet
            size={24}
            strokeWidth={2}
          />
        </div>
      </div>
    </section>
  );
}