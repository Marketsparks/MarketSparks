"use client";

import {
  useEffect,
} from "react";

import {
  X,
} from "lucide-react";

import AddressForm from "./AddressForm";

import type {
  Address,
  AddressFormValues,
} from "./addresses.types";

type AddressModalProps = {
  open: boolean;

  address?: Address | null;

  submitting?: boolean;

  onClose: () => void;

  onSubmit: (
    values: AddressFormValues,
  ) => Promise<void> | void;
};

export default function AddressModal({
  open,
  address = null,
  submitting = false,
  onClose,
  onSubmit,
}: AddressModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (
        event.key === "Escape" &&
        !submitting
      ) {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [
    open,
    submitting,
    onClose,
  ]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-[var(--overlay)]
        p-3
        sm:p-5
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="address-modal-title"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          if (!submitting) {
            onClose();
          }
        }
      }}
    >
      <div
        className="
          w-full
          max-w-xl
          max-h-[calc(100vh-24px)]
          overflow-y-auto
          rounded-2xl
          border
          border-[var(--user-card-border)]
          bg-[var(--user-card-bg)]
          shadow-[var(--user-card-shadow)]
        "
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div
          className="
            sticky
            top-0
            z-10
            flex
            items-center
            justify-between
            gap-3
            border-b
            border-[var(--user-card-border)]
            bg-[var(--user-card-bg)]
            px-4
            py-3
          "
        >
          <div className="min-w-0">
            <h2
              id="address-modal-title"
              className="
                text-sm
                font-semibold
                text-[var(--user-title)]
              "
            >
              {address
                ? "Edit address"
                : "Add address"}
            </h2>

            <p
              className="
                mt-0.5
                text-[10px]
                text-[var(--user-text-muted)]
              "
            >
              {address
                ? "Update your saved delivery details."
                : "Save a delivery address for faster checkout."}
            </p>
          </div>

          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            aria-label="Close address dialog"
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-[var(--user-text-muted)]
              transition
              hover:bg-[var(--user-stat-bg)]
              hover:text-[var(--user-title)]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X
              size={16}
            />
          </button>
        </div>

        <div className="p-4 sm:p-5">
          <AddressForm
            address={address}
            submitting={submitting}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}