"use client";

import {
  Minus,
  Plus,
} from "lucide-react";

type ProductQuantityProps = {
  quantity: number;

  stock: number;

  onDecrease: () => void;

  onIncrease: () => void;

  disabled?: boolean;
};

export default function ProductQuantity({
  quantity,
  stock,
  onDecrease,
  onIncrease,
  disabled = false,
}: ProductQuantityProps) {
  const canIncrease =
    stock > quantity;

  return (
    <div
      className="
        mt-5

        inline-flex

        items-center

        overflow-hidden

        rounded-xl

        border

        border-[var(--border)]

        bg-[var(--surface)]
      "
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={
          disabled ||
          quantity <= 1
        }
        onClick={onDecrease}
        className="
          flex

          h-10

          w-10

          items-center

          justify-center

          border-r

          border-[var(--border)]

          transition-all

          duration-300

          enabled:hover:bg-[var(--primary)]/10

          disabled:cursor-not-allowed

          disabled:opacity-40
        "
      >
        <Minus
          size={16}
          strokeWidth={2.4}
        />
      </button>

      <div
        className="
          flex

          h-10

          min-w-[58px]

          items-center

          justify-center

          px-4

          text-[15px]

          font-semibold

          text-[var(--foreground)]
        "
      >
        {quantity}
      </div>

      <button
        type="button"
        aria-label="Increase quantity"
        disabled={
          disabled ||
          !canIncrease
        }
        onClick={onIncrease}
        className="
          flex

          h-10

          w-10

          items-center

          justify-center

          border-l

          border-[var(--border)]

          transition-all

          duration-300

          enabled:hover:bg-[var(--primary)]/10

          disabled:cursor-not-allowed

          disabled:opacity-40
        "
      >
        <Plus
          size={16}
          strokeWidth={2.4}
        />
      </button>
    </div>
  );
}