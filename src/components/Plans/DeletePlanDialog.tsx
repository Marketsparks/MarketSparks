"use client";

import { X } from "lucide-react";

import Button from "@/components/ui/Button";

import type {
  SubscriptionPlan,
} from "@/types/plan.types";

type DeletePlanDialogProps = {
  open: boolean;
  loading?: boolean;
  plan: SubscriptionPlan | null;
  onClose: () => void;
  onConfirm: (
    planId: string,
  ) => Promise<void> | void;
};

export default function DeletePlanDialog({
  open,
  loading = false,
  plan,
  onClose,
  onConfirm,
}: DeletePlanDialogProps) {
  if (!open || !plan) {
    return null;
  }

  const currentPlan = plan;

  async function handleDelete() {
    await onConfirm(
      currentPlan.id,
    );
  }

  return (
<div
  className="
    fixed
    inset-0
    z-[100]
    overflow-y-auto
    bg-black/60
    backdrop-blur-md
    p-4
  "
>
  <div className="flex min-h-full items-center justify-center py-6">
<div
  className="
    w-full
    max-w-md
    overflow-hidden
    rounded-[var(--admin-modal-radius)]
    border
  "
        style={{
          background:
            "var(--admin-modal-bg)",
          borderColor:
            "var(--admin-modal-border)",
          boxShadow:
            "var(--admin-modal-shadow)",
        }}
      >
<div
  className="flex items-center justify-between border-b px-5 py-4"
  style={{
    background:
      "var(--admin-modal-header-bg)",
    borderColor:
      "var(--admin-modal-border)",
  }}
>
  <h2
    className="text-lg font-semibold"
    style={{
      color:
        "var(--admin-title)",
    }}
  >
    Delete Plan
  </h2>

  <button
    type="button"
    onClick={onClose}
    disabled={loading}
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
        color:
          "var(--admin-text-muted)",
      }}
    />
  </button>
</div>

        <div className="space-y-4 px-5 py-5">
          <p
            className="text-sm leading-6"
            style={{
              color:
                "var(--admin-text)",
            }}
          >
            Are you sure you want to
            permanently delete{" "}
            <span className="font-semibold">
              {currentPlan.name}
            </span>
            ?
          </p>

          <div
            className="rounded-[var(--admin-surface-radius)] border p-3"
            style={{
              background:
                "var(--admin-surface-bg)",
              borderColor:
                "var(--admin-surface-border)",
            }}
          >
            <p
              className="text-xs"
              style={{
                color:
                  "var(--admin-muted)",
              }}
            >
              This action cannot be
              undone.
            </p>
          </div>
        </div>

<div
  className="flex justify-end border-t px-5 py-4"
          style={{
            background:
              "var(--admin-modal-footer-bg)",
            borderColor:
              "var(--admin-modal-border)",
          }}
        >

          <Button
            type="button"
            onClick={
              handleDelete
            }
            disabled={loading}
            style={{
              background:
                "var(--admin-button-danger-bg)",
              color:
                "var(--admin-button-danger-text)",
            }}
          >
            {loading
              ? "Deleting..."
              : "Delete Plan"}
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
}