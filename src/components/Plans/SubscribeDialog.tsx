"use client";

import { useState } from "react";

import { X } from "lucide-react";

import Button from "@/components/ui/Button";

import type {
  SubscriptionPlan,
} from "@/types/plan.types";

type SubscribeDialogProps = {
  open: boolean;
  loading?: boolean;
  plan: SubscriptionPlan | null;
  hasActiveSubscription: boolean;
  onClose: () => void;
  onConfirm: (
    planId: string,
  ) => Promise<void> | void;
};

export default function SubscribeDialog({
  open,
  loading = false,
  plan,
  hasActiveSubscription,
  onClose,
  onConfirm,
}: SubscribeDialogProps) {
  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  if (!open || !plan) {
    return null;
  }

async function handleConfirm() {
  if (!plan) {
    return;
  }

  try {
    setSubmitting(true);

    await onConfirm(plan.id);
  } finally {
    setSubmitting(false);
  }
}

const busy =
  loading || submitting;

const isUpgrade =
  !!hasActiveSubscription;

  return (
<div
  className="
    fixed
    inset-0
    z-[100]
    overflow-y-auto
    backdrop-blur-md
    p-4
  "
  style={{
    background:
      "var(--user-overlay)",
  }}
>
  <div className="flex min-h-full items-center justify-center py-6">
<div
  className="
    w-full
    max-w-md
    max-h-[calc(100vh-3rem)]
    overflow-hidden
    rounded-[var(--user-radius-lg)]
    border
  "
        style={{
          background:
            "var(--user-card-bg)",
          borderColor:
            "var(--user-card-border)",
          boxShadow:
            "var(--user-card-shadow)",
        }}
      >
<div
  className="flex items-start justify-between border-b px-5 py-4"
  style={{
    borderColor: "var(--user-divider)",
  }}
>
  <div>
    <h2
      className="text-base font-semibold"
      style={{
        color: "var(--user-title)",
      }}
    >
{isUpgrade
  ? "Confirm Upgrade"
  : "Confirm Subscription"}
    </h2>

    <p
      className="mt-1 text-sm"
      style={{
        color: "var(--user-text-muted)",
      }}
    >
You are about to
{isUpgrade
  ? " upgrade to "
  : " subscribe to "}
      <span
        style={{
          color: "var(--user-title)",
        }}
      >
        {plan.name}
      </span>
      .
    </p>
  </div>

  <button
    type="button"
    onClick={onClose}
    disabled={busy}
    className="
      rounded-full
      p-2
      transition-opacity
      hover:opacity-70
    "
    aria-label="Close dialog"
  >
    <X
      size={18}
      style={{
        color: "var(--user-text-muted)",
      }}
    />
  </button>
</div>

<div
  className="
    space-y-3
    overflow-y-auto
    px-5
    py-4
  "
  style={{
    maxHeight: "calc(100vh - 16rem)",
  }}
>
          <Row
            label="Price"
            value={`$${plan.price.toLocaleString()}`}
          />

          <Row
            label="Commission"
            value={`${plan.commissionRate}%`}
          />

          <Row
            label="Products"
            value={String(
              plan.maxPublishedProducts,
            )}
          />

          <Row
            label="Duration"
            value={`${plan.durationInDays} days`}
          />
        </div>

<div
  className="flex justify-end border-t px-5 py-4"
          style={{
            borderColor:
              "var(--user-divider)",
          }}
        >


<Button
  type="button"
  disabled={busy}
  onClick={handleConfirm}
  className="min-w-28"
  style={{
    background:
      "var(--user-button-bg)",
    color:
      "var(--user-button-text)",
  }}
>
  {busy
    ? "Processing..."
    : hasActiveSubscription
      ? "Upgrade"
      : "Subscribe"}
</Button>
        </div>
      </div>
    </div>
  </div>
);
}

type RowProps = {
  label: string;
  value: string;
};

function Row({
  label,
  value,
}: RowProps) {


  return (
    <div className="flex items-center justify-between">
      <span
        className="text-sm"
        style={{
          color:
            "var(--user-text-muted)",
        }}
      >
        {label}
      </span>

      <span
        className="text-sm font-semibold"
        style={{
          color:
            "var(--user-title)",
        }}
      >
        {value}
      </span>
    </div>
  );
}