"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";

import {
  Building2,
  Check,
  ChevronDown,
} from "lucide-react";

import type {
  WithdrawMethod as WithdrawMethodType,
} from "./withdraw.types";

type WithdrawMethodProps = {
  methods: WithdrawMethodType[];

  value: WithdrawMethodType | null;

  onChange: (
    method: WithdrawMethodType
  ) => void;
};

export default function WithdrawMethod({
  methods,
  value,
  onChange,
}: WithdrawMethodProps) {
  const [
    open,
    setOpen,
  ] = useState(false);

  const dropdownRef =
    useRef<HTMLDivElement | null>(
      null
    );

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  function handleSelect(
    method: WithdrawMethodType
  ) {
    onChange(method);
    setOpen(false);
  }

  return (
    <section
      className="
        mt-6

        rounded-[var(--withdraw-method-radius)]

        border

        border-[var(--withdraw-method-border)]

        bg-[var(--withdraw-method-bg)]

        p-[var(--withdraw-method-padding)]

        shadow-[var(--withdraw-method-shadow)]

        transition-all

        duration-[var(--withdraw-method-transition)]
      "
    >
      <div>
        <h2
          className="
            text-[18px]

            font-bold

            text-[var(--withdraw-method-title)]
          "
        >
          Withdrawal Method
        </h2>

        <p
          className="
            mt-1.5

            text-[12px]

            leading-5

            text-[var(--withdraw-method-text)]
          "
        >
          Choose where you want to withdraw
          your funds.
        </p>
      </div>

      <div
        ref={dropdownRef}
        className="
          relative

          mt-5
        "
      >
        <button
          type="button"
          onClick={() =>
            setOpen(
              (current) =>
                !current
            )
          }
          aria-haspopup="listbox"
          aria-expanded={open}
          className="
            flex

            w-full

            items-center

            justify-between

            gap-3

            rounded-[var(--withdraw-method-select-radius)]

            border

            border-[var(--withdraw-method-select-border)]

            bg-[var(--withdraw-method-select-bg)]

            px-[var(--withdraw-method-select-padding-x)]

            py-[var(--withdraw-method-select-padding-y)]

            text-left

            text-[var(--withdraw-method-select-text)]

            shadow-[var(--withdraw-method-select-shadow)]

            transition-all

            duration-[var(--withdraw-method-transition)]

            hover:border-[var(--withdraw-method-select-hover-border)]

            hover:bg-[var(--withdraw-method-select-hover-bg)]

            focus:outline-none

            focus:ring-2

            focus:ring-[var(--withdraw-method-select-focus)]

            focus:ring-offset-2

            focus:ring-offset-[var(--withdraw-method-select-focus-offset)]
          "
        >
          <MethodDisplay
            method={value}
            placeholder
          />

          <ChevronDown
            size={17}
            className={`
              shrink-0

              text-[var(--withdraw-method-select-icon)]

              transition-transform

              duration-[var(--withdraw-method-transition)]

              ${
                open
                  ? "rotate-180"
                  : ""
              }
            `}
          />
        </button>

        {open && (
          <div
            role="listbox"
            aria-label="Withdrawal methods"
            className="
              absolute

              left-0

              right-0

              top-full

              z-50

              mt-2

              max-h-72

              overflow-y-auto

              rounded-[var(--withdraw-method-dropdown-radius)]

              border

              border-[var(--withdraw-method-dropdown-border)]

              bg-[var(--withdraw-method-dropdown-bg)]

              p-[var(--withdraw-method-dropdown-padding)]

              shadow-[var(--withdraw-method-dropdown-shadow)]

              scrollbar-none
            "
          >
            <div
              className="
                space-y-1
              "
            >
              {methods.map(
                (method) => {
                  const selected =
                    value?.id ===
                    method.id;

                  return (
                    <button
                      key={
                        method.id
                      }
                      type="button"
                      role="option"
                      aria-selected={
                        selected
                      }
                      onClick={() =>
                        handleSelect(
                          method
                        )
                      }
                      className={`
                        flex

                        w-full

                        items-center

                        justify-between

                        gap-3

                        rounded-[var(--withdraw-method-option-radius)]

                        px-[var(--withdraw-method-option-padding-x)]

                        py-[var(--withdraw-method-option-padding-y)]

                        text-left

                        transition-all

                        duration-[var(--withdraw-method-transition)]

                        ${
                          selected
                            ? `
                                bg-[var(--withdraw-method-option-active-bg)]

                                text-[var(--withdraw-method-option-active-text)]
                              `
                            : `
                                text-[var(--withdraw-method-option-text)]

                                hover:bg-[var(--withdraw-method-option-hover-bg)]

                                hover:text-[var(--withdraw-method-option-hover-text)]
                              `
                        }
                      `}
                    >
                      <MethodDisplay
                        method={method}
                      />

                      {selected && (
                        <Check
                          size={16}
                          strokeWidth={2.5}
                          className="
                            shrink-0

                            text-[var(--withdraw-method-option-check)]
                          "
                        />
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

type MethodDisplayProps = {
  method:
    | WithdrawMethodType
    | null;

  placeholder?: boolean;
};

function MethodDisplay({
  method,
  placeholder = false,
}: MethodDisplayProps) {
  if (!method && placeholder) {
    return (
      <span
        className="
          text-[12px]

          font-medium

          text-[var(--withdraw-method-select-placeholder)]
        "
      >
        Select withdrawal method
      </span>
    );
  }

  if (!method) {
    return null;
  }

  return (
    <span
      className="
        flex

        min-w-0

        items-center

        gap-3
      "
    >
      <span
        className="
          relative

          flex

          h-8

          w-8

          shrink-0

          items-center

          justify-center

          overflow-hidden

          rounded-lg

          bg-[var(--withdraw-method-option-icon-bg)]
        "
      >
        {method.type ===
        "bank" ? (
          <Building2
            size={17}
            strokeWidth={2}
            className="
              text-[var(--withdraw-method-option-icon-color)]
            "
          />
        ) : (
          <Image
            src={method.icon}
            alt=""
            fill
            sizes="32px"
            className="
              object-contain

              p-1
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

            opacity-70
          "
        >
          {method.symbol}
        </span>
      </span>
    </span>
  );
}