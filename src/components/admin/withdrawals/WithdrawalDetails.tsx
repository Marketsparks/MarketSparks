"use client";

import type {
  Withdrawal,
} from "./withdrawal.types";

import { formatCurrency } from "../Wallet/wallet.utils";

type WithdrawalDetailsProps = {
  withdrawal: Withdrawal;
};

export default function WithdrawalDetails({
  withdrawal,
}: WithdrawalDetailsProps) {
  const isCrypto =
    withdrawal.method.type ===
    "crypto";

  return (
    <div
      className="
        space-y-6
      "
    >
      <section
        className="
          rounded-xl

          border

          border-[var(--admin-border)]

          bg-[var(--admin-card-bg)]

          p-5
        "
      >
        <h3
          className="
            text-base

            font-semibold

            text-[var(--admin-foreground)]
          "
        >
          Withdrawal Information
        </h3>

        <div
          className="
            mt-5

            grid

            gap-4

            sm:grid-cols-2
          "
        >
          <DetailItem
            label="Reference"
            value={
              withdrawal.reference
            }
          />

          <DetailItem
            label="Status"
            value={
              withdrawal.status
            }
          />

          <DetailItem
            label="Method"
            value={
              withdrawal.method.name
            }
          />

          <DetailItem
            label="Type"
            value={
              withdrawal.method.type
            }
          />

          <DetailItem
            label="Amount"
            value={formatCurrency(
              withdrawal.amount
            )}
          />

          <DetailItem
            label="Fee"
            value={formatCurrency(
              withdrawal.fee
            )}
          />

          <DetailItem
            label="User Receives"
            value={formatCurrency(
              withdrawal.receiveAmount
            )}
          />

          <DetailItem
            label="Submitted"
            value={
              withdrawal.createdAt
            }
          />
        </div>
      </section>

      <section
        className="
          rounded-xl

          border

          border-[var(--admin-border)]

          bg-[var(--admin-card-bg)]

          p-5
        "
      >
        <h3
          className="
            text-base

            font-semibold

            text-[var(--admin-foreground)]
          "
        >
          User Information
        </h3>

        <div
          className="
            mt-5

            grid

            gap-4

            sm:grid-cols-2
          "
        >
          <DetailItem
            label="Full Name"
            value={
              [
  withdrawal.user.firstName,
  withdrawal.user.lastName,
]
  .filter(Boolean)
  .join(" ")
            }
          />

          <DetailItem
            label="Email"
            value={
              withdrawal.user.email
            }
          />
        </div>
      </section>

      <section
        className="
          rounded-xl

          border

          border-[var(--admin-border)]

          bg-[var(--admin-card-bg)]

          p-5
        "
      >
        <h3
          className="
            text-base

            font-semibold

            text-[var(--admin-foreground)]
          "
        >
          Destination
        </h3>

        {isCrypto ? (
          <div
            className="
              mt-5
            "
          >
            <DetailItem
              label="Wallet Address"
              value={
                withdrawal.destinationAddress
              }
            />
          </div>
        ) : (
          <div
            className="
              mt-5

              grid

              gap-4

              sm:grid-cols-2
            "
          >
            <DetailItem
              label="Account Holder"
              value={
                withdrawal.bankDetails
                  ?.accountHolderName
              }
            />

            <DetailItem
              label="Bank Name"
              value={
                withdrawal.bankDetails
                  ?.bankName
              }
            />

            <DetailItem
              label="Account Number"
              value={
                withdrawal.bankDetails
                  ?.accountNumber
              }
            />

            <DetailItem
              label="Country"
              value={
                withdrawal.bankDetails
                  ?.country
              }
            />

            <DetailItem
              label="Currency"
              value={
                withdrawal.bankDetails
                  ?.currency
              }
            />

            <DetailItem
              label="Bank Address"
              value={
                withdrawal.bankDetails
                  ?.bankAddress
              }
            />

            <DetailItem
              label="SWIFT / BIC"
              value={
                withdrawal.bankDetails
                  ?.swiftCode
              }
            />

            <DetailItem
              label="IBAN"
              value={
                withdrawal.bankDetails
                  ?.iban
              }
            />

            <DetailItem
              label="Routing Number"
              value={
                withdrawal.bankDetails
                  ?.routingNumber
              }
            />

            <DetailItem
              label="Sort Code"
              value={
                withdrawal.bankDetails
                  ?.sortCode
              }
            />

            <DetailItem
              label="IFSC Code"
              value={
                withdrawal.bankDetails
                  ?.ifscCode
              }
            />
          </div>
        )}
      </section>
    </div>
  );
}

type DetailItemProps = {
  label: string;

  value?: string | number | null;
};

function DetailItem({
  label,
  value,
}: DetailItemProps) {
  return (
    <div>
      <p
        className="
          text-xs

          font-medium

          text-[var(--admin-muted-foreground)]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1

          break-words

          text-sm

          font-semibold

          text-[var(--admin-foreground)]
        "
      >
        {value || "N/A"}
      </p>
    </div>
  );
}