"use client";

import {
  useEffect,
  useState,
} from "react";

import { X } from "lucide-react";

import Button from "@/components/ui/Button";

import type {
  CreatePlanInput,
  SubscriptionPlan,
} from "@/types/plan.types";

type EditPlanDialogProps = {
  open: boolean;
  loading?: boolean;
  plan: SubscriptionPlan | null;
  onClose: () => void;
  onSubmit: (
    planId: string,
    values: CreatePlanInput,
  ) => Promise<void> | void;
};

const emptyValues: CreatePlanInput = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  commissionRate: 0,
  maxPublishedProducts: 0,
  priorityLevel: 1,
  badgeName: "",
  badgeColor: "#2563eb",
  durationInDays: 30,
  isActive: true,
  sortOrder: 0,
};

export default function EditPlanDialog({
  open,
  loading = false,
  plan,
  onClose,
  onSubmit,
}: EditPlanDialogProps) {
  const [
    values,
    setValues,
  ] = useState<CreatePlanInput>(
    emptyValues,
  );

  useEffect(() => {
    if (!plan) {
      setValues(emptyValues);

      return;
    }

    setValues({
      name: plan.name,
      slug: plan.slug,
      description:
        plan.description ?? "",
      price: plan.price,
      commissionRate:
        plan.commissionRate,
      maxPublishedProducts:
        plan.maxPublishedProducts,
      priorityLevel:
        plan.priorityLevel,
      badgeName:
        plan.badgeName,
      badgeColor:
        plan.badgeColor,
      durationInDays:
        plan.durationInDays,
      isActive:
        plan.isActive,
      sortOrder:
        plan.sortOrder,
    });
  }, [plan]);

  if (!open || !plan) {
    return null;
  }

  function update<
    K extends keyof CreatePlanInput,
  >(
    key: K,
    value: CreatePlanInput[K],
  ) {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

const currentPlan = plan;

async function handleSubmit(
  e: React.FormEvent,
) {
  e.preventDefault();

  await onSubmit(
    currentPlan.id,
    values,
  );
}

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
      "var(--admin-modal-overlay)",
  }}
>
  <div className="flex min-h-full items-center justify-center py-6">
<div
  className="
    w-full
    max-w-2xl
    max-h-[calc(100vh-3rem)]
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
        <form
          onSubmit={
            handleSubmit
          }
        >
<div
  className="flex items-center justify-between border-b px-6 py-4"
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
    Edit Plan
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

<div
  className="
    grid
    gap-4
    overflow-y-auto
    p-6
    md:grid-cols-2
  "
  style={{
    maxHeight: "calc(100vh - 14rem)",
  }}
>
            <Input
              label="Name"
              value={
                values.name
              }
              onChange={(v) =>
                update(
                  "name",
                  v,
                )
              }
            />

<Input
  label="Slug"
  value={values.slug}
  onChange={(v) =>
    update(
      "slug",
      v
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-"),
    )
  }
/>

            <Input
              label="Price"
              type="number"
              value={
                values.price
              }
              onChange={(v) =>
                update(
                  "price",
                  Number(v),
                )
              }
            />

            <Input
              label="Commission (%)"
              type="number"
              value={
                values.commissionRate
              }
              onChange={(v) =>
                update(
                  "commissionRate",
                  Number(v),
                )
              }
            />

            <Input
              label="Products"
              type="number"
              value={
                values.maxPublishedProducts
              }
              onChange={(v) =>
                update(
                  "maxPublishedProducts",
                  Number(v),
                )
              }
            />

            <Input
              label="Duration"
              type="number"
              value={
                values.durationInDays
              }
              onChange={(v) =>
                update(
                  "durationInDays",
                  Number(v),
                )
              }
            />

            <Input
              label="Priority"
              type="number"
              value={
                values.priorityLevel
              }
              onChange={(v) =>
                update(
                  "priorityLevel",
                  Number(v),
                )
              }
            />

            <Input
              label="Sort Order"
              type="number"
              value={
                values.sortOrder
              }
              onChange={(v) =>
                update(
                  "sortOrder",
                  Number(v),
                )
              }
            />

            <Input
              label="Badge Name"
              value={
                values.badgeName
              }
              onChange={(v) =>
                update(
                  "badgeName",
                  v,
                )
              }
            />

            <Input
              label="Badge Color"
              type="color"
              value={
                values.badgeColor
              }
              onChange={(v) =>
                update(
                  "badgeColor",
                  v,
                )
              }
            />

            <div className="md:col-span-2">
              <label
                className="mb-2 block text-sm"
                style={{
                  color:
                    "var(--admin-text)",
                }}
              >
                Description
              </label>

              <textarea
                rows={3}
                value={
                  values.description
                }
                onChange={(
                  e,
                ) =>
                  update(
                    "description",
                    e.target
                      .value,
                  )
                }
                className="w-full rounded-[var(--admin-input-radius)] border px-3 py-2 outline-none"
                style={{
                  background:
                    "var(--admin-input-bg)",
                  borderColor:
                    "var(--admin-input-border)",
                  color:
                    "var(--admin-input-text)",
                }}
              />
            </div>

            <label className="flex items-center gap-2 md:col-span-2">
              <input
                type="checkbox"
                checked={
                  values.isActive
                }
                onChange={(
                  e,
                ) =>
                  update(
                    "isActive",
                    e.target
                      .checked,
                  )
                }
              />

              <span
                style={{
                  color:
                    "var(--admin-text)",
                }}
              >
                Active
              </span>
            </label>
          </div>

<div
className="
  sticky
  bottom-0
  flex
  justify-end
  gap-3
  border-t
  px-6
  py-4
"
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
                onClose
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                loading
              }
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
}

type InputProps = {
  label: string;
  type?: string;
  value: string | number;
  onChange: (
    value: string,
  ) => void;
};

function Input({
  label,
  type = "text",
  value,
  onChange,
}: InputProps) {
  return (
    <div>
      <label
        className="mb-2 block text-sm"
        style={{
          color:
            "var(--admin-text)",
        }}
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value,
          )
        }
        className="w-full rounded-[var(--admin-input-radius)] border px-3 py-2 outline-none"
        style={{
          background:
            "var(--admin-input-bg)",
          borderColor:
            "var(--admin-input-border)",
          color:
            "var(--admin-input-text)",
        }}
      />
    </div>
  );
}