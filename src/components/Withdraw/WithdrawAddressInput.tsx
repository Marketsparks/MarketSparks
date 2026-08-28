"use client";

import {
  useState,
} from "react";

import {
  Check,
  Copy,
} from "lucide-react";

type WithdrawAddressInputProps = {
  value: string;

  onChange: (
    value: string
  ) => void;

  placeholder: string;

  disabled?: boolean;
};

export default function WithdrawAddressInput({
  value,
  onChange,
  placeholder,
  disabled = false,
}: WithdrawAddressInputProps) {
  const [copied, setCopied] =
    useState(false);

  async function handleCopy() {
    if (!value) {
      return;
    }

    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(
          value
        );
      } else {
        const textarea =
          document.createElement(
            "textarea"
          );

        textarea.value = value;

        textarea.style.position =
          "fixed";

        textarea.style.opacity = "0";

        textarea.style.pointerEvents =
          "none";

        document.body.appendChild(
          textarea
        );

        textarea.focus();

        textarea.select();

        const success =
          document.execCommand(
            "copy"
          );

        document.body.removeChild(
          textarea
        );

        if (!success) {
          throw new Error(
            "Copy command failed"
          );
        }
      }

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Failed to copy withdrawal address:",
        error
      );
    }
  }

  return (
    <div>
      <label
        htmlFor="withdrawal-address"
        className="
          mb-2

          block

          text-[12px]

          font-medium

          text-[var(--withdraw-address-label)]
        "
      >
        Destination Address
      </label>

      <div
        className="
          flex

          min-w-0

          items-stretch
        "
      >
        <input
          id="withdrawal-address"
          type="text"
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          spellCheck={false}
          className="
            min-w-0

            flex-1

            rounded-l-xl

            border

            border-r-0

            border-[var(--withdraw-address-border)]

            bg-[var(--withdraw-address-bg)]

            px-3

            py-2.5

            text-[12px]

            text-[var(--withdraw-address-text)]

            outline-none

            transition-all

            duration-[var(--withdraw-address-transition)]

            placeholder:text-[var(--withdraw-address-placeholder)]

            focus:border-[var(--withdraw-address-focus)]

            disabled:cursor-not-allowed

            disabled:opacity-60
          "
        />

        <button
          type="button"
          onClick={handleCopy}
          disabled={
            !value || disabled
          }
          aria-label={
            copied
              ? "Address copied"
              : "Copy destination address"
          }
          title={
            copied
              ? "Copied"
              : "Copy address"
          }
          className="
            flex

            w-11

            shrink-0

            items-center

            justify-center

            rounded-r-xl

            border

            border-[var(--withdraw-address-copy-border)]

            bg-[var(--withdraw-address-copy-bg)]

            text-[var(--withdraw-address-copy-text)]

            transition-all

            duration-[var(--withdraw-address-transition)]

            hover:bg-[var(--withdraw-address-copy-hover)]

            disabled:cursor-not-allowed

            disabled:opacity-50
          "
        >
          {copied ? (
            <Check
              size={16}
              strokeWidth={2.5}
            />
          ) : (
            <Copy
              size={16}
            />
          )}
        </button>
      </div>
    </div>
  );
}