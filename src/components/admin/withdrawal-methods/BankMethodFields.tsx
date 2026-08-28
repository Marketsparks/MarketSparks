"use client";

import CloudinaryUploader from "@/components/shared/CloudinaryUploader";

type BankMethodFieldsProps = {
  name: string;

  symbol: string;

  placeholder: string;

  fee: number | null;

  feeType: "fixed" | "percentage";

  minimumAmount: number | null;

  maximumAmount: number |null;

  icon: string | null;

  onChange: (
    values: Partial<{
      name: string;
      symbol: string;
      placeholder: string;
      fee: number | null;
      feeType: "fixed" | "percentage";
      minimumAmount: number | null;
      maximumAmount: number | null;
      icon: string | null;
    }>
  ) => void;

  disabled?: boolean;
};

export default function BankMethodFields({
  name,
  symbol,
  placeholder,
  fee,
  feeType,
  minimumAmount,
  maximumAmount,
  icon,
  onChange,
  disabled = false,
}: BankMethodFieldsProps) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-5
        md:grid-cols-2
      "
    >
<InputField
  id="bank-name"
  label="Bank Name"
  value={name}
  placeholder="Bank Transfer"
  disabled={disabled}
  onChange={(value) =>
    onChange({
      name: value,
    })
  }
/>

<InputField
  id="bank-symbol"
  label="Ticker"
  value={symbol}
  placeholder="BANK"
  disabled={disabled}
  onChange={(value) =>
    onChange({
      symbol: value.toUpperCase(),
    })
  }
/>

<NumberField
  id="bank-fee"
  label="Withdrawal Fee"
  value={fee}
  placeholder="5"
  disabled={disabled}
  onChange={(value) =>
    onChange({
      fee: value,
    })
  }
/>

<div className="space-y-2">
  <label
    htmlFor="bank-fee-type"
    className="
      block
      text-sm
      font-medium
      text-[var(--admin-text)]
    "
  >
    Fee Type
  </label>

  <select
    id="bank-fee-type"
    value={feeType}
    disabled={disabled}
    onChange={(event) =>
      onChange({
        feeType: event.target.value as
          | "fixed"
          | "percentage",
      })
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
    "
  >
    <option value="fixed">Fixed</option>
    <option value="percentage">
      Percentage
    </option>
  </select>
</div>

      <InputField
        id="bank-placeholder"
        label="Placeholder"
        value={placeholder}
        placeholder="Enter your bank account details"
        disabled={disabled}
        onChange={(value) =>
          onChange({
            placeholder: value,
          })
        }
      />

<NumberField
  id="bank-minimum"
  label="Minimum Withdrawal"
  value={minimumAmount}
  placeholder="20"
  disabled={disabled}
  onChange={(value) =>
    onChange({
      minimumAmount: value,
    })
  }
/>

<div
  className="
    md:col-span-2
    rounded-[var(--admin-surface-radius)]
    border-2
    border-dashed
    border-[var(--admin-input-border)]
    bg-[var(--admin-surface-bg)]
    p-6
  "
>
  <h3
    className="
      text-sm
      font-semibold
      text-[var(--admin-title)]
    "
  >
    Bank Icon Upload
  </h3>

  <p
    className="
      mt-2
      text-xs
      leading-5
      text-[var(--admin-muted)]
    "
  >
    Upload a bank logo. Supported formats are PNG, JPG, SVG, and WebP.
    The uploaded image will be stored in Cloudinary and automatically
    attached to this withdrawal method.
  </p>

  <div className="mt-6">
    <CloudinaryUploader
      folder="withdrawal-methods"
      value={icon}
      disabled={disabled}
      onChange={(publicId) =>
        onChange({
          icon: publicId,
        })
      }
    />
  </div>
</div>

      <div
        className="
          md:col-span-2
          rounded-[var(--admin-surface-radius)]
          border
          border-[var(--admin-input-border)]
          bg-[var(--admin-surface-bg)]
          p-4
        "
      >
        <h3
          className="
            text-sm
            font-semibold
            text-[var(--admin-title)]
          "
        >
          User Bank Details
        </h3>

        <p
          className="
            mt-2
            text-xs
            leading-6
            text-[var(--admin-muted)]
          "
        >
          When this withdrawal method is active,
          users will automatically be required to
          provide the following information before
          submitting a withdrawal request:
        </p>

        <ul
          className="
            mt-4
            grid
            grid-cols-1
            gap-2
            text-xs
            text-[var(--admin-text)]
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          <li>• Account Holder Name *</li>
          <li>• Bank Name *</li>
          <li>• Account Number *</li>
          <li>• Country *</li>
          <li>• Currency *</li>
          <li>• Bank Address *</li>
          <li>• SWIFT / BIC</li>
          <li>• IBAN</li>
          <li>• Routing Number</li>
          <li>• Sort Code</li>
          <li>• IFSC</li>
        </ul>
      </div>
    </div>
  );
}

type InputFieldProps = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

type NumberFieldProps = {
  id: string;
  label: string;
  value: number | null;
  placeholder: string;
  nullable?: boolean;
  disabled?: boolean;
  onChange: (value: number | null) => void;
};

function NumberField({
  id,
  label,
  value,
  placeholder,
  nullable = false,
  disabled = false,
  onChange,
}: NumberFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="
          block
          text-sm
          font-medium
          text-[var(--admin-text)]
        "
      >
        {label}
      </label>

      <input
        id={id}
        type="number"
        value={value ?? ""}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => {
          const raw = event.target.value;

          if (raw === "") {
            onChange(nullable ? null : 0);
            return;
          }

          const parsed = Number(raw);

          onChange(
            Number.isNaN(parsed)
              ? nullable
                ? null
                : 0
              : parsed
          );
        }}
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
          placeholder:text-[var(--admin-input-placeholder)]
          focus:border-[var(--admin-input-focus)]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      />
    </div>
  );
}

function InputField({
  id,
  label,
  value,
  placeholder,
  disabled = false,
  onChange,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="
          block
          text-sm
          font-medium
          text-[var(--admin-text)]
        "
      >
        {label}
      </label>

      <input
        id={id}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
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
          placeholder:text-[var(--admin-input-placeholder)]
          focus:border-[var(--admin-input-focus)]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      />
    </div>
  );
}