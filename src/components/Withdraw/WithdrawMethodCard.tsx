"use client";

import Image from "next/image";

import {
  Building2,
  Check,
} from "lucide-react";

import type {
  WithdrawMethod,
} from "./withdraw.types";

type WithdrawMethodCardProps = {
  method: WithdrawMethod;

  selected: boolean;

  onSelect: (
    method: WithdrawMethod
  ) => void;
};

export default function WithdrawMethodCard({
  method,
  selected,
  onSelect,
}: WithdrawMethodCardProps) {
  return (
    <button
      type="button"
      onClick={() =>
        onSelect(method)
      }
      aria-pressed={selected}
      className={`
        relative

        flex

        min-w-[132px]

        flex-1

        items-center

        gap-3

        rounded-[var(--withdraw-method-card-radius)]

        border

        p-[var(--withdraw-method-card-padding)]

        text-left

        shadow-[var(--withdraw-method-card-shadow)]

        transition-all

        duration-[var(--withdraw-method-card-transition)]

        focus:outline-none

        focus:ring-2

        focus:ring-[var(--withdraw-method-card-focus)]

        focus:ring-offset-2

        focus:ring-offset-[var(--withdraw-method-card-focus-offset)]

        ${
          selected
            ? `
                border-[var(--withdraw-method-card-selected-border)]

                bg-[var(--withdraw-method-card-selected-bg)]

                text-[var(--withdraw-method-card-selected-text)]

                shadow-[var(--withdraw-method-card-selected-shadow)]
              `
            : `
                border-[var(--withdraw-method-card-border)]

                bg-[var(--withdraw-method-card-bg)]

                text-[var(--withdraw-method-card-text)]

                hover:border-[var(--withdraw-method-card-hover-border)]

                hover:bg-[var(--withdraw-method-card-hover-bg)]

                hover:text-[var(--withdraw-method-card-hover-text)]
              `
        }
      `}
    >
      {selected && (
        <span
          className="
            absolute

            right-2

            top-2

            flex

            h-4

            w-4

            items-center

            justify-center

            rounded-full

            bg-[var(--withdraw-method-card-check-bg)]

            text-[var(--withdraw-method-card-check-color)]
          "
          aria-hidden="true"
        >
          <Check
            size={10}
            strokeWidth={3}
          />
        </span>
      )}

<span
  className="
    relative

    flex

    h-9

    w-9

    shrink-0

    items-center

    justify-center

    overflow-hidden

    rounded-lg

    bg-[var(--withdraw-method-card-icon-bg)]
  "
>
  {method.type === "bank" ? (
    <Building2
      size={18}
      strokeWidth={2}
      className="
        text-[var(--withdraw-method-card-icon-color)]
      "
    />
  ) : (
    <Image
      src={method.icon}
      alt=""
      fill
      sizes="36px"
      className="
        object-contain

        p-1.5
      "
    />
  )}
</span>

      <span
        className="
          min-w-0
        "
      >
        <span
          className="
            block

            truncate

            text-[12px]

            font-semibold
          "
        >
          {method.name}
        </span>

        <span
          className="
            mt-0.5

            block

            text-[10px]

            font-medium

            opacity-75
          "
        >
          {method.symbol}
        </span>
      </span>
    </button>
  );
}