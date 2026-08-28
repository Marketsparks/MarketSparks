"use client";

import type {
  WithdrawalMethodType,
} from "./withdrawal-method.types";

type WithdrawalMethodTypeSelectProps = {
  value: WithdrawalMethodType;

  onChange: (
    value: WithdrawalMethodType
  ) => void;

  disabled?: boolean;
};

export default function WithdrawalMethodTypeSelect({
  value,
  onChange,
  disabled = false,
}: WithdrawalMethodTypeSelectProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="withdrawal-method-type"
        className="
          block
          text-sm
          font-medium
          text-[var(--admin-text)]
        "
      >
        Withdrawal Method Type
      </label>

      <select
        id="withdrawal-method-type"
        value={value}
        disabled={disabled}
        onChange={(event) =>
          onChange(
            event.target
              .value as WithdrawalMethodType
          )
        }
        className="
          h-11
          w-full
          rounded-[var(--admin-input-radius)]
          border
          border-[var(--admin-input-border)]
          bg-[var(--admin-input-bg)]
          px-3
          text-sm
          text-[var(--admin-input-text)]
          outline-none
          transition-all
          duration-300
          focus:border-[var(--admin-input-focus)]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        <option value="crypto">
          Crypto
        </option>

        <option value="bank">
          Bank
        </option>
      </select>

      <p
        className="
          text-xs
          leading-5
          text-[var(--admin-muted)]
        "
      >
        Crypto allows users to withdraw to
        supported blockchain wallets. Bank
        allows users to submit international
        bank account details.
      </p>
    </div>
  );
}