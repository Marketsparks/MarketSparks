"use client";

import Image from "next/image";
import {
  Copy,
  Download,
  ExternalLink,
  File,
  FileText,
  X,
} from "lucide-react";

import Button from "@/components/ui/Button";

import {
  getCloudinaryImageUrl,
} from "@/lib/cloudinary";

import type {
  Deposit,
} from "./types";

type DepositDetailsDrawerProps = {
  open: boolean;

  deposit: Deposit | null;

  onClose: () => void;

  onApprove: (
    deposit: Deposit,
  ) => void;

  onReject: (
    deposit: Deposit,
  ) => void;
};

export default function DepositDetailsDrawer({
  open,
  deposit,
  onClose,
  onApprove,
  onReject,
}: DepositDetailsDrawerProps) {
  if (!open || !deposit) {
    return null;
  }

const currentDeposit = deposit;

const receiptUrl =
  currentDeposit.receiptUrl
    ? getCloudinaryImageUrl(
        currentDeposit.receiptUrl,
      )
    : null;

const receiptExtension =
  currentDeposit.receiptUrl
    ?.split(".")
    .pop()
    ?.toLowerCase() ?? "";

const isImage =
  [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "gif",
    "avif",
  ].includes(
    receiptExtension,
  );

const isPdf =
  receiptExtension ===
  "pdf";


const fullName = [
  currentDeposit.user.firstName,
  currentDeposit.user.lastName,
]
  .filter(Boolean)
  .join(" ");

  async function copyReference() {
    try {
      await navigator.clipboard.writeText(
        currentDeposit.reference,
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
<div
  onClick={onClose}
  className="
    fixed
    inset-0
    z-[9998]
    bg-black/50
    backdrop-blur-sm
  "
/>

<aside
  className="
    fixed
    right-0
    top-0
    z-[9999]
    flex
    h-screen
    w-full
    max-w-xl
    flex-col
    bg-[var(--background)]
    shadow-2xl
  "
>
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[var(--border)]
            px-6
            py-5
          "
        >
          <div>
            <h2
              className="
                text-xl
                font-semibold
              "
            >
              Deposit Details
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-[var(--foreground-muted)]
              "
            >
              Review this deposit before taking action.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-full
              p-2
              hover:bg-[var(--surface)]
            "
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="
            flex-1
            space-y-6
            overflow-y-auto
            p-6
          "
        >
          <Section
            title="User"
          >
            <InfoRow
              label="Name"
              value={fullName}
            />

            <InfoRow
              label="Email"
              value={currentDeposit.user.email}
            />
          </Section>

          <Section
            title="Deposit"
          >
            <InfoRow
              label="Amount"
              value={`$${Number(
                currentDeposit.amount,
              ).toLocaleString()}`}
            />

            <InfoRow
              label="Coin"
              value={`${currentDeposit.depositMethod.name} (${currentDeposit.depositMethod.symbol})`}
            />

            <InfoRow
              label="Network"
              value={
                currentDeposit.depositMethod.network
              }
            />

            <InfoRow
              label="Reference"
              value={
                <button
                  type="button"
                  onClick={
                    copyReference
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-[var(--primary)]
                  "
                >
                  {currentDeposit.reference}

                  <Copy size={14} />
                </button>
              }
            />

            <InfoRow
              label="Submitted"
              value={new Date(
                currentDeposit.createdAt,
              ).toLocaleString()}
            />
          </Section>

<Section
  title="Receipt"
>
  {!receiptUrl ? (
    <div
      className="
        rounded-xl
        border
        border-dashed
        border-[var(--border)]
        p-8
        text-center
        text-sm
        text-[var(--foreground-muted)]
      "
    >
      No receipt uploaded.
    </div>
  ) : isImage ? (
    <>
      <Image
        src={receiptUrl}
        alt="Receipt"
        width={800}
        height={800}
        className="
          w-full
          rounded-2xl
          border
          border-[var(--border)]
        "
      />

      <div
        className="
          mt-4
          flex
          gap-3
        "
      >
<a
  href={receiptUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="flex-1"
>
  <Button
    type="button"
    variant="secondary"
    className="w-full"
  >
    <ExternalLink
      size={16}
    />

    Open
  </Button>
</a>

<a
  href={receiptUrl}
  download
  className="flex-1"
>
  <Button
    type="button"
    className="w-full"
  >
    <Download
      size={16}
    />

    Download
  </Button>
</a>
      </div>
    </>
  ) : (
    <div
      className="
        rounded-2xl
        border
        border-[var(--border)]
        p-6
      "
    >
      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        {isPdf ? (
          <FileText
            size={42}
          />
        ) : (
          <File
            size={42}
          />
        )}

        <div
          className="flex-1"
        >
          <p
            className="
              font-medium
            "
          >
            {isPdf
              ? "PDF Receipt"
              : "Receipt File"}
          </p>

          <p
            className="
              text-sm
              text-[var(--foreground-muted)]
            "
          >
            Open or download the uploaded receipt.
          </p>
        </div>
      </div>

      <div
        className="
          mt-5
          flex
          gap-3
        "
      >
<a
  href={receiptUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="flex-1"
>
  <Button
    type="button"
    variant="secondary"
    className="w-full"
  >
    <ExternalLink
      size={16}
    />

    Open
  </Button>
</a>

<a
  href={receiptUrl}
  download
  className="flex-1"
>
  <Button
    type="button"
    className="w-full"
  >
    <Download
      size={16}
    />

    Download
  </Button>
</a>
      </div>
    </div>
  )}
</Section>

          {currentDeposit.reviewNote && (
            <Section
              title="Review Note"
            >
              <p
                className="
                  text-sm
                  leading-7
                "
              >
                {currentDeposit.reviewNote}
              </p>
            </Section>
          )}
        </div>

<div
  className="
    shrink-0

    border-t
    border-[var(--border)]

    bg-[var(--background)]

    px-6
    py-5

    pb-[max(1.25rem,env(safe-area-inset-bottom))]

    shadow-[0_-8px_24px_rgba(0,0,0,0.08)]
  "
>
  <div
    className="
      flex
      flex-col
      gap-3

      sm:flex-row
    "
  >
    <Button
      type="button"
      variant="primary"
      className="w-full sm:flex-1"
      disabled={currentDeposit.status !== "PENDING"}
      onClick={() => onApprove(currentDeposit)}
    >
      Approve
    </Button>

    <Button
      type="button"
      variant="secondary"
      className="w-full sm:flex-1"
      disabled={currentDeposit.status !== "PENDING"}
      onClick={() => onReject(currentDeposit)}
    >
      Reject
    </Button>
  </div>
</div>
      </aside>
    </>
  );
}

type SectionProps = {
  title: string;

  children: React.ReactNode;
};

function Section({
  title,
  children,
}: SectionProps) {
  return (
    <section>
      <h3
        className="
          mb-4
          text-sm
          font-semibold
          uppercase
          tracking-wide
          text-[var(--foreground-muted)]
        "
      >
        {title}
      </h3>

      <div
        className="
          space-y-4
        "
      >
        {children}
      </div>
    </section>
  );
}

type InfoRowProps = {
  label: string;

  value: React.ReactNode;
};

function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-1
      "
    >
      <span
        className="
          text-xs
          uppercase
          tracking-wide
          text-[var(--foreground-muted)]
        "
      >
        {label}
      </span>

      <div
        className="
          break-all
          text-sm
        "
      >
        {value}
      </div>
    </div>
  );
}