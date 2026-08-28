"use client";

import {
  useEffect,
  useState,
} from "react";

import Button from "@/components/ui/Button";

import type {
  WalletAction,
  WalletBalanceType,
  WalletActionModalProps,
} from "./wallet.types";

import {
  formatCurrency,
  getFullName,
} from "./wallet.utils";

export default function WalletActionModal({
  open,
  user,
  loading,
  onClose,
  onSubmit,
}: WalletActionModalProps) {
  const [
    action,
    setAction,
  ] =
    useState<WalletAction | null>(
      null,
    );

  const [
    amount,
    setAmount,
  ] = useState("");

  const [
    balanceType,
    setBalanceType,
  ] = useState<WalletBalanceType>(
    "wallet",
  );

  useEffect(() => {
    if (!open) {
      setAction(null);
      setAmount("");
      setBalanceType("wallet");
    }
  }, [open]);

  if (!open || !user) {
    return null;
  }

  async function handleSubmit() {
    const value =
      Number(amount);

    if (!value || value <= 0) {
      return;
    }

    if (!action) {
      return;
    }

    await onSubmit(
      balanceType,
      action,
      value,
    );
  }

  const selectedBalance =
    balanceType === "wallet"
      ? user.wallet
          ?.availableBalance ?? "0"
      : balanceType === "profit"
        ? user.profit
        : balanceType ===
            "totalDeposit"
          ? user.totalDeposit
          : user.affiliateCommission;

  const balanceLabel =
    balanceType === "wallet"
      ? "Wallet Balance"
      : balanceType === "profit"
        ? "Profit Balance"
        : balanceType ===
            "totalDeposit"
          ? "Total Deposit"
          : "Affiliate Commission";

  const actionLabel =
    action === "CREDIT"
      ? `Credit ${balanceLabel}`
      : `Debit ${balanceLabel}`;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-[var(--admin-modal-overlay)]
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          overflow-hidden
          rounded-[var(--admin-modal-radius)]
          border
          border-[var(--admin-modal-border)]
          bg-[var(--admin-modal-bg)]
          shadow-[var(--admin-modal-shadow)]
        "
      >
        <div
          className="
            border-b
            border-[var(--admin-modal-border)]
            bg-[var(--admin-modal-header-bg)]
            px-6
            py-5
          "
        >
          <h2
            className="
              text-xl
              font-semibold
              text-[var(--admin-title)]
            "
          >
            Manage Wallet
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-[var(--admin-muted)]
            "
          >
            {getFullName(user)}
          </p>

          <p
            className="
              text-sm
              text-[var(--admin-muted)]
            "
          >
            {user.email}
          </p>

          <div
            className="
              mt-5
              space-y-3
            "
          >
            <p
              className="
                text-sm
                font-medium
                text-[var(--admin-muted)]
              "
            >
              Choose Balance
            </p>

            <div className="space-y-2">
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
                  name="balanceType"
                  checked={
                    balanceType ===
                    "wallet"
                  }
                  onChange={() =>
                    setBalanceType(
                      "wallet",
                    )
                  }
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
                  name="balanceType"
                  checked={
                    balanceType ===
                    "profit"
                  }
                  onChange={() =>
                    setBalanceType(
                      "profit",
                    )
                  }
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
                  name="balanceType"
                  checked={
                    balanceType ===
                    "totalDeposit"
                  }
                  onChange={() =>
                    setBalanceType(
                      "totalDeposit",
                    )
                  }
                />

                <span>
                  Total Deposit
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
                  name="balanceType"
                  checked={
                    balanceType ===
                    "affiliateCommission"
                  }
                  onChange={() =>
                    setBalanceType(
                      "affiliateCommission",
                    )
                  }
                />

                <span>
                  Affiliate Commission
                </span>
              </label>
            </div>

            <div
              className="
                rounded-xl
                border
                border-[var(--admin-modal-border)]
                bg-[var(--admin-card-bg)]
                p-4
              "
            >
              <p
                className="
                  text-xs
                  uppercase
                  tracking-wide
                  text-[var(--admin-muted)]
                "
              >
                {balanceLabel}
              </p>

              <p
                className="
                  mt-1
                  text-lg
                  font-semibold
                  text-[var(--admin-title)]
                "
              >
                {formatCurrency(
                  selectedBalance,
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div
            className="
              grid
              grid-cols-2
              gap-3
            "
          >
            <Button
              type="button"
              variant={
                action ===
                "CREDIT"
                  ? "primary"
                  : "secondary"
              }
              onClick={() =>
                setAction(
                  "CREDIT",
                )
              }
            >
              Credit
            </Button>

            <Button
              type="button"
              variant={
                action ===
                "DEBIT"
                  ? "primary"
                  : "secondary"
              }
              onClick={() =>
                setAction(
                  "DEBIT",
                )
              }
            >
              Debit
            </Button>
          </div>

          {action && (
            <div className="space-y-4">
              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(
                  event,
                ) =>
                  setAmount(
                    event.target
                      .value,
                  )
                }
                placeholder="Enter amount"
                className="
                  h-12
                  w-full
                  rounded-[var(--admin-input-radius)]
                  border
                  border-[var(--admin-input-border)]
                  bg-[var(--admin-input-bg)]
                  px-4
                  text-[var(--admin-input-text)]
                  placeholder:text-[var(--admin-input-placeholder)]
                  outline-none
                  transition-colors
                  focus:border-[var(--admin-input-focus)]
                "
              />

              <Button
                type="button"
                variant={
                  action ===
                  "DEBIT"
                    ? "secondary"
                    : "primary"
                }
                className="w-full"
                loading={
                  loading
                }
                onClick={
                  handleSubmit
                }
              >
                {actionLabel}
              </Button>
            </div>
          )}
        </div>

        <div
          className="
            flex
            justify-end
            border-t
            border-[var(--admin-modal-border)]
            bg-[var(--admin-modal-footer-bg)]
            px-6
            py-4
          "
        >
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}