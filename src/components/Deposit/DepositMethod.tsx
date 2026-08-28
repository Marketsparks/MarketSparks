"use client";

import type {
  DepositMethod as DepositMethodType,
} from "./deposit.types";

type DepositMethodProps = {
  methods: DepositMethodType[];

  loading: boolean;

  value: DepositMethodType | null;

  onChange: (
    method: DepositMethodType,
  ) => void;
};

export default function DepositMethod({
  methods,
  loading,
  value,
  onChange,
}: DepositMethodProps) {
  return (
    <section
      className="
        mt-8

        rounded-[var(--deposit-method-radius)]

        border

        border-[var(--deposit-method-border)]

        bg-[var(--deposit-method-bg)]

        p-[var(--deposit-method-padding)]

        shadow-[var(--deposit-method-shadow)]

        transition-all

        duration-300
      "
    >
      <h2
        className="
          text-[20px]

          font-bold

          text-[var(--deposit-method-title)]
        "
      >
        Payment Method
      </h2>

      <p
        className="
          mt-2

          text-[14px]

          leading-6

          text-[var(--deposit-method-text)]
        "
      >
        Select the cryptocurrency you want to use for your deposit.
      </p>

      <select
        value={value?.id ?? ""}
        disabled={loading}
        onChange={(event) => {
          const method = methods.find(
            (item) =>
              item.id === event.target.value,
          );

          if (method) {
            onChange(method);
          }
        }}
        className="
          mt-6

          w-full

          rounded-2xl

          border

          border-[var(--deposit-method-select-border)]

          bg-[var(--deposit-method-select-bg)]

          px-4

          py-3

          text-[15px]

          text-[var(--deposit-method-select-text)]

          outline-none

          transition-all

          duration-300

          focus:border-[var(--deposit-method-select-focus)]
        "
      >
        <option value="">
          {loading
            ? "Loading payment methods..."
            : "Select a payment method"}
        </option>

        {methods.map((method) => (
          <option
            key={method.id}
            value={method.id}
          >
            {method.name}
          </option>
        ))}
      </select>
    </section>
  );
}