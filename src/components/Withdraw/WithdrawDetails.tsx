"use client";

import WithdrawAddressInput from "./WithdrawAddressInput";
import WithdrawAmount from "./WithdrawAmount";

import type {
  WithdrawDetailsProps,
} from "./withdraw.types";

export default function WithdrawDetails({
  method,
  address,
  onAddressChange,
  bankDetails,
  onBankDetailsChange,
  amount,
  onAmountChange,
  availableBalance,
  withdrawFrom,
  onWithdrawFromChange,
  disabled = false,
}: WithdrawDetailsProps) {
  const isBank =
    method.type === "bank";

  return (
    <section
      className="
        mt-6

        rounded-[var(--withdraw-details-radius)]

        border

        border-[var(--withdraw-details-border)]

        bg-[var(--withdraw-details-bg)]

        p-[var(--withdraw-details-padding)]

        shadow-[var(--withdraw-details-shadow)]

        transition-all

        duration-[var(--withdraw-details-transition)]
      "
    >
      <div>
        <h2
          className="
            text-[18px]

            font-bold

            text-[var(--withdraw-details-title)]
          "
        >
          Withdrawal Details
        </h2>

        <p
          className="
            mt-1.5

            text-[12px]

            leading-5

            text-[var(--withdraw-details-text)]
          "
        >
          {isBank
            ? "Enter your bank account details and the amount you want to withdraw."
            : "Enter the destination address and amount you want to withdraw."}
        </p>
      </div>

      <div
        className="
          mt-5
        "
      >
{isBank ? (
  <div className="space-y-4">
    <InputField
      id="withdraw-account-holder"
      label="Account Holder Name *"
      value={bankDetails.accountHolderName}
      onChange={(value) =>
        onBankDetailsChange({
          accountHolderName: value,
        })
      }
      placeholder="Enter account holder name"
      disabled={disabled}
    />

    <InputField
      id="withdraw-bank-name"
      label="Bank Name *"
      value={bankDetails.bankName}
      onChange={(value) =>
        onBankDetailsChange({
          bankName: value,
        })
      }
      placeholder="Enter bank name"
      disabled={disabled}
    />

    <InputField
      id="withdraw-account-number"
      label="Account Number *"
      value={bankDetails.accountNumber}
      onChange={(value) =>
        onBankDetailsChange({
          accountNumber: value,
        })
      }
      placeholder="Enter account number"
      disabled={disabled}
    />

    <InputField
      id="withdraw-country"
      label="Country *"
      value={bankDetails.country}
      onChange={(value) =>
        onBankDetailsChange({
          country: value,
        })
      }
      placeholder="Enter country"
      disabled={disabled}
    />

    <InputField
      id="withdraw-currency"
      label="Currency *"
      value={bankDetails.currency}
      onChange={(value) =>
        onBankDetailsChange({
          currency: value,
        })
      }
      placeholder="USD"
      disabled={disabled}
    />

    <InputField
      id="withdraw-bank-address"
      label="Bank Address"
      value={bankDetails.bankAddress}
      onChange={(value) =>
        onBankDetailsChange({
          bankAddress: value,
        })
      }
      placeholder="Optional"
      disabled={disabled}
    />

    <InputField
      id="withdraw-swift"
      label="SWIFT / BIC"
      value={bankDetails.swiftBic}
      onChange={(value) =>
        onBankDetailsChange({
          swiftBic: value,
        })
      }
      placeholder="Optional"
      disabled={disabled}
    />

    <InputField
      id="withdraw-routing"
      label="Routing Number"
      value={bankDetails.routingNumber}
      onChange={(value) =>
        onBankDetailsChange({
          routingNumber: value,
        })
      }
      placeholder="Optional"
      disabled={disabled}
    />
  </div>
) : (
<WithdrawAddressInput
  value={address}
  onChange={onAddressChange}
  placeholder={method.placeholder}
  disabled={disabled}
/>
        )}

<div className="mt-6">
  <p
    className="
      mb-3
      text-[12px]
      font-medium
      text-[var(--withdraw-details-label)]
    "
  >
    Withdraw From
  </p>

  <div className="space-y-3">
    <label
      className="
        flex
        cursor-pointer
        items-center
        gap-3
      "
    >
      <input
        type="radio"
        name="withdrawFrom"
checked={
  withdrawFrom ===
  "wallet"
}

onChange={() =>
  onWithdrawFromChange(
    "wallet",
  )
}
        disabled={disabled}
      />

      <span>
        Wallet Balance
      </span>
    </label>

    <label
      className="
        flex
        cursor-pointer
        items-center
        gap-3
      "
    >
      <input
        type="radio"
        name="withdrawFrom"
checked={
  withdrawFrom ===
  "profit"
}

onChange={() =>
  onWithdrawFromChange(
    "profit",
  )
}
        disabled={disabled}
      />

      <span>
        Profit Balance
      </span>
    </label>

  <label
  className="
    flex
    cursor-pointer
    items-center
    gap-3
  "
>
  <input
    type="radio"
    name="withdrawFrom"
    checked={
      withdrawFrom ===
      "affiliate"
    }
    onChange={() =>
      onWithdrawFromChange(
        "affiliate",
      )
    }
    disabled={disabled}
  />

  <span>
    Affiliate Balance
  </span>
</label>
  </div>
</div>

        <WithdrawAmount
          availableBalance={
            availableBalance
          }
          value={
            amount
          }
          onChange={
            onAmountChange
          }
          disabled={
            disabled
          }
        />
      </div>
    </section>
  );
}


type InputFieldProps = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  disabled?: boolean;
  onChange: (
    value: string
  ) => void;
};

function InputField({
  id,
  label,
  value,
  placeholder,
  disabled = false,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          mb-2
          block
          text-[12px]
          font-medium
          text-[var(--withdraw-details-label)]
        "
      >
        {label}
      </label>

      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        placeholder={placeholder}
        disabled={disabled}
        className="
          h-11
          w-full
          rounded-[var(--withdraw-details-input-radius)]
          border
          border-[var(--withdraw-details-input-border)]
          bg-[var(--withdraw-details-input-bg)]
          px-3
          text-[13px]
          text-[var(--withdraw-details-input-text)]
          outline-none
          transition-all
          duration-[var(--withdraw-details-transition)]
          placeholder:text-[var(--withdraw-details-input-placeholder)]
          focus:border-[var(--withdraw-details-input-focus)]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      />
    </div>
  );
}