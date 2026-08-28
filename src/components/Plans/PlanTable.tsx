"use client";

import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import Button from "@/components/ui/Button";

import type {
  SubscriptionPlan,
} from "@/types/plan.types";



type PlanTableProps = {
  plans: SubscriptionPlan[];
  loading?: boolean;
  onView: (
    plan: SubscriptionPlan,
  ) => void;
  onEdit: (
    plan: SubscriptionPlan,
  ) => void;
  onDelete: (
    plan: SubscriptionPlan,
  ) => void;
};

export default function PlanTable({
  plans,
  loading = false,
  onView,
  onEdit,
  onDelete,
}: PlanTableProps) {
  if (loading) {
    return (
      <div
        className="rounded-[var(--admin-card-radius)] border p-8 text-center"
        style={{
          background:
            "var(--admin-card-bg)",
          borderColor:
            "var(--admin-card-border)",
          boxShadow:
            "var(--admin-card-shadow)",
        }}
      >
        <p
          className="text-sm"
          style={{
            color:
              "var(--admin-muted)",
          }}
        >
          Loading plans...
        </p>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div
        className="rounded-[var(--admin-card-radius)] border p-8 text-center"
        style={{
          background:
            "var(--admin-empty-bg)",
          borderColor:
            "var(--admin-empty-border)",
          boxShadow:
            "var(--admin-empty-shadow)",
        }}
      >
        <h3
          className="text-base font-semibold"
          style={{
            color:
              "var(--admin-empty-title)",
          }}
        >
          No subscription plans
        </h3>

        <p
          className="mt-2 text-sm"
          style={{
            color:
              "var(--admin-empty-text)",
          }}
        >
          Create your first plan to begin offering subscriptions.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="hidden overflow-hidden rounded-[var(--admin-card-radius)] border lg:block"
        style={{
          background:
            "var(--admin-table-bg)",
          borderColor:
            "var(--admin-table-border)",
          boxShadow:
            "var(--admin-card-shadow)",
        }}
      >
        <table className="w-full">
          <thead
            style={{
              background:
                "var(--admin-table-header-bg)",
            }}
          >
            <tr>
              <Header>
                Plan
              </Header>

              <Header>
                Price
              </Header>

              <Header>
                Commission
              </Header>

              <Header>
                Products
              </Header>

              <Header>
                Duration
              </Header>

              <Header>
                Status
              </Header>

              <Header align="center">
                Actions
              </Header>
            </tr>
          </thead>

          <tbody>
                        {plans.map((plan) => (
              <tr
                key={plan.id}
                className="transition-colors"
                style={{
                  borderColor:
                    "var(--admin-table-border)",
                }}
              >
                <Cell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {plan.name}
                      </span>

                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                        style={{
                          backgroundColor:
                            plan.badgeColor,
                        }}
                      >
                        {plan.badgeName}
                      </span>
                    </div>

                    <p
                      className="text-xs"
                      style={{
                        color:
                          "var(--admin-muted)",
                      }}
                    >
                      {plan.slug}
                    </p>
                  </div>
                </Cell>

                <Cell>
                  $
                  {plan.price.toLocaleString()}
                </Cell>

                <Cell>
                  {plan.commissionRate}%
                </Cell>

                <Cell>
                  {
                    plan.maxPublishedProducts
                  }
                </Cell>

                <Cell>
                  {
                    plan.durationInDays
                  }{" "}
                  days
                </Cell>

                <Cell>
                  <StatusBadge
                    active={
                      plan.isActive
                    }
                  />
                </Cell>

<Cell align="center">
  <div className="flex justify-center gap-2">
    <ActionButton
      label="View"
      onClick={() =>
        onView(plan)
      }
    >
      <Eye size={16} />
    </ActionButton>

    <ActionButton
      label="Edit"
      onClick={() =>
        onEdit(plan)
      }
    >
      <Pencil size={16} />
    </ActionButton>

    <ActionButton
      label="Delete"
      danger
      onClick={() =>
        onDelete(plan)
      }
    >
      <Trash2 size={16} />
    </ActionButton>
  </div>
</Cell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 lg:hidden">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-[var(--admin-card-radius)] border p-4"
            style={{
              background:
                "var(--admin-card-bg)",
              borderColor:
                "var(--admin-card-border)",
              boxShadow:
                "var(--admin-card-shadow)",
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3
                    className="font-semibold"
                    style={{
                      color:
                        "var(--admin-title)",
                    }}
                  >
                    {plan.name}
                  </h3>

                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                    style={{
                      backgroundColor:
                        plan.badgeColor,
                    }}
                  >
                    {plan.badgeName}
                  </span>
                </div>

                <p
                  className="mt-1 text-xs"
                  style={{
                    color:
                      "var(--admin-muted)",
                  }}
                >
                  {plan.slug}
                </p>
              </div>

              <StatusBadge
                active={
                  plan.isActive
                }
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Info
                label="Price"
                value={`$${plan.price.toLocaleString()}`}
              />

              <Info
                label="Commission"
                value={`${plan.commissionRate}%`}
              />

              <Info
                label="Products"
                value={
                  plan.maxPublishedProducts
                }
              />

              <Info
                label="Duration"
                value={`${plan.durationInDays} days`}
              />
            </div>

<div className="mt-4 flex gap-2">
  <ActionButton
    className="flex-1"
    label="View"
    onClick={() =>
      onView(plan)
    }
  >
    <Eye size={16} />
  </ActionButton>

  <ActionButton
    className="flex-1"
    label="Edit"
    onClick={() =>
      onEdit(plan)
    }
  >
    <Pencil size={16} />
  </ActionButton>

  <ActionButton
    className="flex-1"
    label="Delete"
    danger
    onClick={() =>
      onDelete(plan)
    }
  >
    <Trash2 size={16} />
  </ActionButton>
</div>
          </div>
        ))}
      </div>
    </>
  );
}

function Header({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <th
      className={`px-4 py-3 text-xs font-semibold ${
        align === "center"
          ? "text-center"
          : "text-left"
      }`}
      style={{
        color:
          "var(--admin-table-header-text)",
      }}
    >
      {children}
    </th>
  );
}

function Cell({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <td
      className={`border-t px-4 py-3 text-sm ${
        align === "center"
          ? "text-center"
          : "text-left"
      }`}
      style={{
        color:
          "var(--admin-table-text)",
        borderColor:
          "var(--admin-table-border)",
      }}
    >
      {children}
    </td>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p
        className="text-xs"
        style={{
          color:
            "var(--admin-muted)",
        }}
      >
        {label}
      </p>

      <p
        className="mt-1 font-medium"
        style={{
          color:
            "var(--admin-text)",
        }}
      >
        {value}
      </p>
    </div>
  );
}

type ActionButtonProps = {
  children: React.ReactNode;
  label: string;
  danger?: boolean;
  className?: string;
  onClick: () => void;
};

function ActionButton({
  children,
  label,
  danger = false,
  className,
  onClick,
}: ActionButtonProps) {
  return (
    <Button
      type="button"
      title={label}
      aria-label={label}
      className={`h-9 w-9 p-0 ${className ?? ""}`}
      onClick={onClick}
      style={
        danger
          ? {
              background:
                "var(--admin-button-danger-bg)",
              color:
                "var(--admin-button-danger-text)",
            }
          : undefined
      }
    >
      {children}
    </Button>
  );
}

function StatusBadge({
  active,
}: {
  active: boolean;
}) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold"
      style={{
        background: active
          ? "var(--admin-status-success-bg)"
          : "var(--admin-status-failed-bg)",
        color: active
          ? "var(--admin-status-success-text)"
          : "var(--admin-status-failed-text)",
      }}
    >
      {active
        ? "Active"
        : "Inactive"}
    </span>
  );
}
