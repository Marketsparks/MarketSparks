"use client";

import {
  useState,
} from "react";

import {
  DEPOSIT_SUGGESTED_AMOUNTS,
} from "./deposit.constants";

type DepositAmountProps = {
  value: number;

  onChange: (
    amount: number
  ) => void;

  hidden?: boolean;
};

export default function DepositAmount({
  value,
  onChange,
  hidden = false,
}: DepositAmountProps) {
  const [
    isOtherSelected,
    setIsOtherSelected,
  ] = useState(false);

  if (hidden) {
    return null;
  }

  function handleSuggestedAmount(
    amount: number
  ) {
    setIsOtherSelected(false);

    onChange(amount);
  }

  function handleOtherSelect() {
    setIsOtherSelected(true);

    onChange(0);
  }

  function handleOtherAmountChange(
    amount: number
  ) {
    onChange(amount);
  }

  return (
    <section
      className="
        mt-8

        rounded-[var(--deposit-amount-radius)]

        border

        border-[var(--deposit-amount-border)]

        bg-[var(--deposit-amount-bg)]

        p-[var(--deposit-amount-padding)]

        shadow-[var(--deposit-amount-shadow)]

        transition-all

        duration-300
      "
    >
      <h2
        className="
          text-[20px]

          font-bold

          text-[var(--deposit-amount-title)]
        "
      >
        Deposit Amount
      </h2>

      <p
        className="
          mt-2

          text-[14px]

          leading-6

          text-[var(--deposit-amount-text)]
        "
      >
        Select one of the suggested amounts or enter your preferred amount.
      </p>

      <div
        className="
          mt-6

          flex

          flex-wrap

          gap-3
        "
      >
        {DEPOSIT_SUGGESTED_AMOUNTS.map(
          (amount) => {
            const isSelected =
              !isOtherSelected &&
              value === amount;

            return (
      <button
        key={amount}
        type="button"
        onClick={() =>
          handleSuggestedAmount(
            amount
          )
        }
        className={`
          rounded-md

          border

          px-2

          py-1

          text-[11px]

          font-medium

          transition-all
          duration-300

          ${
            isSelected
              ? `
                  border-[var(--deposit-amount-chip-active-border)]

                  bg-[var(--deposit-amount-chip-active-bg)]

                  text-[var(--deposit-amount-chip-active-text)]
                `
              : `
                  border-[var(--deposit-amount-chip-border)]

                  bg-[var(--deposit-amount-chip-bg)]

                  text-[var(--deposit-amount-chip-text)]

                  hover:border-[var(--deposit-amount-chip-hover-border)]

                  hover:bg-[var(--deposit-amount-chip-hover-bg)]

                  hover:text-[var(--deposit-amount-chip-hover-text)]
                `
          }
        `}
      >
        ${amount}
      </button>
    );
  }
)}

<button
  type="button"
  onClick={
    handleOtherSelect
  }
  className={`
    rounded-md

    border

    px-2

    py-1

    text-[11px]

    font-medium

    transition-all
    duration-300

    ${
      isOtherSelected
        ? `
            border-[var(--deposit-amount-chip-active-border)]

            bg-[var(--deposit-amount-chip-active-bg)]

            text-[var(--deposit-amount-chip-active-text)]
          `
        : `
            border-[var(--deposit-amount-chip-border)]

            bg-[var(--deposit-amount-chip-bg)]

            text-[var(--deposit-amount-chip-text)]

            hover:border-[var(--deposit-amount-chip-hover-border)]

            hover:bg-[var(--deposit-amount-chip-hover-bg)]

            hover:text-[var(--deposit-amount-chip-hover-text)]
          `
    }
  `}
>
  Other
</button>
      </div>

      {isOtherSelected && (
        <div
          className="
            mt-8
          "
        >
          <label
            className="
              mb-2

              block

              text-[14px]

              font-medium

              text-[var(--deposit-amount-title)]
            "
          >
            Other Amount
          </label>

          <input
            type="number"
            min="1"
            value={
              value || ""
            }
            onChange={(event) =>
              handleOtherAmountChange(
                Number(
                  event.target.value
                )
              )
            }
            placeholder="Enter amount in USD"
            autoFocus
            className="
              w-full

              rounded-2xl

              border

              border-[var(--deposit-amount-input-border)]

              bg-[var(--deposit-amount-input-bg)]

              px-4

              py-3

              text-[15px]

              text-[var(--deposit-amount-input-text)]

              outline-none

              transition-all
              duration-300

              placeholder:text-[var(--deposit-amount-input-placeholder)]

              focus:border-[var(--deposit-amount-input-focus)]
            "
          />
        </div>
      )}
    </section>
  );
}