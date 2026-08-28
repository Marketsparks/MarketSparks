"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";

type AuthInputProps =
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;

    helperText?: string;

    error?: string;

    success?: string;

    leftIcon?: ReactNode;

    rightIcon?: ReactNode;

    required?: boolean;
  };

const AuthInput = forwardRef<
  HTMLInputElement,
  AuthInputProps
>(
  (
    {
      label,

      helperText,

      error,

      success,

      leftIcon,

      rightIcon,

      className = "",

      required,

      id,

      ...props
    },
    ref
  ) => {
    const hasError =
      Boolean(error);

    const hasSuccess =
      Boolean(success);

    return (
      <div
        className="
          w-full
        "
      >
        {label && (
          <label
            htmlFor={id}
            className="
              mb-2

              text-[13px]

              font-semibold

              text-[var(--foreground)]
            "
          >
            {label}
          </label>
        )}

        <div
          className={`
            flex

            h-11

            items-center

            gap-3

            rounded-xl

            border

            bg-[var(--surface)]

            px-3.5

            transition-all
            duration-300

            ${
              hasError
                ? `
                  border-red-500

                  focus-within:ring-2

                  focus-within:ring-red-500/20
                `
                : hasSuccess
                ? `
                  border-emerald-500

                  focus-within:ring-2

                  focus-within:ring-emerald-500/20
                `
                : `
                  border-[var(--border)]

                  focus-within:border-[var(--primary)]

                  focus-within:ring-2

                  focus-within:ring-[var(--primary)]/20
                `
            }
          `}
        >
          {leftIcon && (
            <span
              className="
                shrink-0

                text-[var(--foreground-muted)]
              "
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            required={required}
            {...props}
            className={`
              h-full

              w-full

              border-0

              bg-transparent

              text-[14px]

              text-[var(--foreground)]

              outline-none

              placeholder:text-[13px]

              placeholder:text-[var(--foreground-muted)]

              disabled:cursor-not-allowed

              disabled:opacity-60

              ${className}
            `}
          />

          {rightIcon && (
            <span
              className="
                shrink-0

                text-[var(--foreground-muted)]
              "
            >
              {rightIcon}
            </span>
          )}
        </div>

        {(helperText ||
          error ||
          success) && (
          <p
            className={`
              mt-2

              text-[12px]

              ${
                hasError
                  ? "text-red-500"
                  : hasSuccess
                  ? "text-emerald-500"
                  : "text-[var(--foreground-muted)]"
              }
            `}
          >
            {error ??
              success ??
              helperText}
          </p>
        )}
      </div>
    );
  }
);

AuthInput.displayName =
  "AuthInput";

export default AuthInput;