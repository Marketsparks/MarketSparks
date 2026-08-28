"use client";

import CloudinaryUploader from "@/components/shared/CloudinaryUploader";

type CryptoMethodFieldsProps = {
  name: string;

  symbol: string;

  network: string;

  placeholder: string;

  fee: number | null;

  feeType: "fixed" | "percentage";

  minimumAmount: number | null;

  maximumAmount: number | null;

  icon: string | null;

  onChange: (
    values: Partial<{
      name: string;
      symbol: string;
      network: string;
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

export default function CryptoMethodFields({
  name,
  symbol,
  network,
  placeholder,
  fee,
  feeType,
  minimumAmount,
  maximumAmount,
  icon,
  onChange,
  disabled = false,
}: CryptoMethodFieldsProps) {
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
        id="crypto-name"
        label="Coin Name"
        value={name}
        placeholder="Bitcoin"
        disabled={disabled}
        onChange={(value) =>
          onChange({
            name: value,
          })
        }
      />

      <InputField
        id="crypto-symbol"
        label="Ticker"
        value={symbol}
        placeholder="BTC"
        disabled={disabled}
        onChange={(value) =>
          onChange({
            symbol: value.toUpperCase(),
          })
        }
      />

      <InputField
        id="crypto-network"
        label="Network"
        value={network}
        placeholder="Bitcoin"
        disabled={disabled}
        onChange={(value) =>
          onChange({
            network: value,
          })
        }
      />

      <InputField
        id="crypto-placeholder"
        label="Address Placeholder"
        value={placeholder}
        placeholder="Enter BTC Wallet Address"
        disabled={disabled}
        onChange={(value) =>
          onChange({
            placeholder: value,
          })
        }
      />

      <NumberField
        id="crypto-fee"
        label="Withdrawal Fee"
        value={fee}
        placeholder="0"
        disabled={disabled}
        onChange={(value) =>
          onChange({
            fee: value,
          })
        }
      />

      <div className="space-y-2">
        <label
          htmlFor="crypto-fee-type"
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
          id="crypto-fee-type"
          value={feeType}
          disabled={disabled}
          onChange={(e) =>
            onChange({
              feeType: e.target.value as
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

      <NumberField
        id="crypto-minimum"
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
    Crypto Icon Upload
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

  onChange: (
    value: number | null
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
        onChange={(e) =>
          onChange(e.target.value)
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
          placeholder:text-[var(--admin-input-placeholder)]
          focus:border-[var(--admin-input-focus)]
          outline-none
        "
      />
    </div>
  );
}

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