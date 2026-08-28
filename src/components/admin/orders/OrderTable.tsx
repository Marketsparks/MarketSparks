"use client";

import {
  Eye,
} from "lucide-react";

import type {
  AdminOrder,
} from "./types";

type OrderTableProps = {
  orders: AdminOrder[];

  onView: (
    order: AdminOrder,
  ) => void;
};

export default function OrderTable({
  orders,
  onView,
}: OrderTableProps) {
  return (
<div
  className="
    overflow-hidden
    rounded-xl
    border
    border-[var(--admin-card-border)]
    bg-[var(--admin-card-bg)]
    shadow-[var(--admin-card-shadow)]
  "
>
  <div
    className="
      max-h-[520px]
      overflow-auto
    "
  >
        <table
          className="
            min-w-[980px]
            w-full
            border-collapse
          "
        >
          <thead className="sticky top-0 z-10">
            <tr
              className="
                border-b
                border-[var(--admin-table-border)]
                bg-[var(--admin-table-header-bg)]
              "
            >
              <HeaderCell>
                Order
              </HeaderCell>

              <HeaderCell>
                Customer
              </HeaderCell>

              <HeaderCell>
                Total
              </HeaderCell>

              <HeaderCell>
                Payment
              </HeaderCell>

              <HeaderCell>
                Payment Status
              </HeaderCell>

              <HeaderCell>
                Order Status
              </HeaderCell>

              <HeaderCell>
                Created
              </HeaderCell>

              <HeaderCell align="right">
                View
              </HeaderCell>
            </tr>
          </thead>

          <tbody
            className="
              bg-[var(--admin-table-bg)]
            "
          >
            {orders.map(
              (order) => (
                <OrderRow
                  key={
                    order.id
                  }
                  order={order}
                  onView={
                    onView
                  }
                />
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type OrderRowProps = {
  order: AdminOrder;

  onView: (
    order: AdminOrder,
  ) => void;
};

function OrderRow({
  order,
  onView,
}: OrderRowProps) {
  const customerName =
    [
      order.user.firstName,
      order.user.lastName,
    ]
      .filter(Boolean)
      .join(" ") ||
    "Unknown customer";

  const canReview =
    order.paymentMethod ===
      "CRYPTO" &&
    order.paymentStatus ===
      "PENDING" &&
    order.cryptoDeposit !==
      null;

  return (
    <tr
      className="
        border-b
        border-[var(--admin-table-border)]
        transition-colors
        duration-200
        hover:bg-[var(--admin-table-row-hover)]
      "
    >
      <td
        className="
          px-4
          py-3.5
        "
      >
        <div
          className="
            text-xs
            font-semibold
            text-[var(--admin-table-title)]
          "
        >
          {order.orderNumber}
        </div>

        {order.cryptoDeposit && (
          <div
            className="
              mt-0.5
              text-[10px]
              text-[var(--admin-table-muted)]
            "
          >
            {order.cryptoDeposit.reference}
          </div>
        )}
      </td>

      <td
        className="
          px-4
          py-3.5
        "
      >
        <div
          className="
            truncate
            text-xs
            font-semibold
            text-[var(--admin-table-title)]
          "
        >
          {customerName}
        </div>

        <div
          className="
            mt-0.5
            max-w-[210px]
            truncate
            text-[10px]
            text-[var(--admin-table-muted)]
          "
        >
          {order.user.email}
        </div>
      </td>

      <td
        className="
          whitespace-nowrap
          px-4
          py-3.5
          text-xs
          font-semibold
          text-[var(--admin-table-title)]
        "
      >
        $
        {Number(
          order.total,
        ).toLocaleString(
          undefined,
          {
            minimumFractionDigits:
              2,

            maximumFractionDigits:
              2,
          },
        )}
      </td>

      <td
        className="
          px-4
          py-3.5
        "
      >
        <StatusPill
          value={
            order.paymentMethod ===
            "CRYPTO"
              ? "Crypto"
              : "Wallet"
          }
          tone={
            order.paymentMethod ===
            "CRYPTO"
              ? "info"
              : "neutral"
          }
        />
      </td>

      <td
        className="
          px-4
          py-3.5
        "
      >
        <StatusPill
          value={
            order.paymentStatus
          }
          tone={getPaymentTone(
            order.paymentStatus,
          )}
        />
      </td>

      <td
        className="
          px-4
          py-3.5
        "
      >
        <StatusPill
          value={
            order.status
          }
          tone={getOrderTone(
            order.status,
          )}
        />
      </td>

      <td
        className="
          whitespace-nowrap
          px-4
          py-3.5
          text-[11px]
          text-[var(--admin-table-muted)]
        "
      >
        {formatDate(
          order.createdAt,
        )}
      </td>

      <td
        className="
          px-4
          py-3.5
          text-right
        "
      >
        <button
          type="button"
          onClick={() =>
            onView(order)
          }
          aria-label={`View order ${order.orderNumber}`}
          title={
            canReview
              ? "View order and review payment"
              : "View order"
          }
          className="
            inline-flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            border
            border-[var(--admin-card-border)]
            bg-[var(--admin-card-bg)]
            text-[var(--admin-muted)]
            transition-all
            duration-200
            hover:border-[var(--primary)]
            hover:text-[var(--primary)]
            focus:outline-none
            focus:ring-2
            focus:ring-[var(--primary)]
            focus:ring-offset-2
            focus:ring-offset-[var(--admin-table-bg)]
          "
        >
          <Eye
            size={15}
            strokeWidth={2}
          />
        </button>
      </td>
    </tr>
  );
}

type HeaderCellProps = {
  children: React.ReactNode;

  align?: "left" | "right";
};

function HeaderCell({
  children,
  align = "left",
}: HeaderCellProps) {
  return (
    <th
      className={`
        px-4
        py-3.5
        text-${align}
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.08em]
        text-[var(--admin-table-header-text)]
      `}
    >
      {children}
    </th>
  );
}

type StatusTone =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

type StatusPillProps = {
  value: string;

  tone: StatusTone;
};

function StatusPill({
  value,
  tone,
}: StatusPillProps) {
  const toneClasses: Record<
    StatusTone,
    string
  > = {
    success:
      "border-[var(--admin-badge-success-border)] bg-[var(--admin-badge-success-bg)] text-[var(--admin-badge-success-text)]",

    warning:
      "border-[var(--admin-badge-warning-border)] bg-[var(--admin-badge-warning-bg)] text-[var(--admin-badge-warning-text)]",

    danger:
      "border-[var(--admin-badge-danger-border)] bg-[var(--admin-badge-danger-bg)] text-[var(--admin-badge-danger-text)]",

    info:
      "border-[var(--admin-badge-info-border)] bg-[var(--admin-badge-info-bg)] text-[var(--admin-badge-info-text)]",

    neutral:
      "border-[var(--admin-card-border)] bg-[var(--admin-card-bg)] text-[var(--admin-muted)]",
  };

  return (
    <span
      className={`
        inline-flex
        whitespace-nowrap
        rounded-full
        border
        px-2
        py-1
        text-[9px]
        font-semibold
        uppercase
        tracking-[0.05em]
        ${toneClasses[tone]}
      `}
    >
      {formatStatusLabel(
        value,
      )}
    </span>
  );
}

function getPaymentTone(
  status: AdminOrder["paymentStatus"],
): StatusTone {
  if (status === "PAID") {
    return "success";
  }

  if (status === "FAILED") {
    return "danger";
  }

  return "warning";
}

function getOrderTone(
  status: AdminOrder["status"],
): StatusTone {
  if (
    status === "PROCESSING" ||
    status === "SHIPPED" ||
    status === "DELIVERED"
  ) {
    return "success";
  }

  if (status === "CANCELLED") {
    return "danger";
  }

  return "warning";
}

function formatStatusLabel(
  value: string,
) {
  return value
    .replaceAll(
      "_",
      " ",
    )
    .toLowerCase()
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase(),
    );
}

function formatDate(
  value: string,
) {
  return new Date(
    value,
  ).toLocaleDateString(
    undefined,
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );
}