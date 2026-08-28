"use client";

import type {
  SubscriptionPlan,
} from "@/types/plan.types";

import { X } from "lucide-react";

type ViewPlanDialogProps = {
  open: boolean;
  plan: SubscriptionPlan | null;
  onClose: () => void;
};

type RowProps = {
  label: string;
  value: React.ReactNode;
};

function Row({
  label,
  value,
}: RowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0">
      <span
        className="text-xs font-medium"
        style={{
          color:
            "var(--admin-text-muted)",
          borderColor:
            "var(--admin-card-border)",
        }}
      >
        {label}
      </span>

      <span
        className="max-w-[60%] break-words text-right text-sm font-medium"
        style={{
          color:
            "var(--admin-text)",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function ViewPlanDialog({
  open,
  plan,
  onClose,
}: ViewPlanDialogProps) {
  if (!open || !plan) {
    return null;
  }

  const currentPlan = plan;

  return (
<div
  className="
    fixed
    inset-0
    z-[100]
    overflow-y-auto
    p-4
    backdrop-blur-md
  "
  style={{
    background:
      "var(--admin-modal-overlay)",
  }}
  onClick={onClose}
>
  <div className="flex min-h-full items-center justify-center py-6">
<div
  onClick={(event) =>
    event.stopPropagation()
  }
  className="
    relative
    w-full
    max-w-xl
    max-h-[calc(100vh-3rem)]
    overflow-hidden
    rounded-[var(--admin-radius-lg)]
    border
  "
        style={{
          background:
            "var(--admin-card-bg)",
          borderColor:
            "var(--admin-card-border)",
          boxShadow:
            "var(--admin-shadow-lg)",
        }}
      >
<div
  className="relative border-b p-5"
  style={{
    borderColor:
      "var(--admin-card-border)",
  }}
>
  <button
    type="button"
    aria-label="Close dialog"
    onClick={onClose}
    className="
      absolute
      right-4
      top-4
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-full
      transition-colors
      hover:bg-white/10
    "
  >
    <X size={18} />
  </button>

  <h2
    className="text-lg font-semibold"
    style={{
      color:
        "var(--admin-text)",
    }}
  >
    Plan Details
  </h2>

  <p
    className="mt-1 text-sm"
    style={{
      color:
        "var(--admin-text-muted)",
    }}
  >
    View subscription plan information.
  </p>
</div>

<div
  className="
    space-y-4
    overflow-y-auto
    p-5
  "
  style={{
    maxHeight: "calc(100vh - 16rem)",
  }}
>
          <Row
            label="Name"
            value={currentPlan.name}
          />

          <Row
            label="Slug"
            value={currentPlan.slug}
          />

          <Row
            label="Description"
            value={
              currentPlan.description ??
              "No description"
            }
          />

          <Row
            label="Price"
            value={`$${currentPlan.price.toLocaleString()}`}
          />

          <Row
            label="Commission"
            value={`${currentPlan.commissionRate}%`}
          />

          <Row
            label="Product Limit"
            value={currentPlan.maxPublishedProducts}
          />

          <Row
            label="Priority"
            value={currentPlan.priorityLevel}
          />

          <Row
            label="Badge"
            value={
              <span
                className="inline-flex rounded-full px-2 py-1 text-xs font-medium text-white"
                style={{
                  backgroundColor:
                    currentPlan.badgeColor,
                }}
              >
                {currentPlan.badgeName}
              </span>
            }
          />

          <Row
            label="Duration"
            value={`${currentPlan.durationInDays} days`}
          />

          <Row
            label="Status"
            value={
              currentPlan.isActive
                ? "Active"
                : "Inactive"
            }
          />

          <Row
            label="Sort Order"
            value={currentPlan.sortOrder}
          />

          <Row
            label="Created"
            value={new Date(
              currentPlan.createdAt,
            ).toLocaleString()}
          />

          <Row
            label="Updated"
            value={new Date(
              currentPlan.updatedAt,
            ).toLocaleString()}
          />
        </div>
      </div>
    </div>
    </div>
  );
}