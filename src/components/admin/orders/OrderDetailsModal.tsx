"use client";

import {
  CheckCircle2,
  ChevronDown,
  X,
  XCircle,
} from "lucide-react";

import Image from "next/image";

import {
  useEffect,
  useState,
} from "react";

import type {
  AdminOrder,
} from "./types";

type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "NEAR_DESTINATION"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

type OrderDetailsModalProps = {
  open: boolean;

  order:
    | AdminOrder
    | null;

  loading?: boolean;

  onClose: () => void;

  onApprove: (
    order: AdminOrder,
  ) => Promise<void>;

  onReject: (
    order: AdminOrder,
    reason: string,
  ) => Promise<void>;

  onUpdateStatus: (
    order: AdminOrder,
    status: OrderStatus,
  ) => Promise<void>;
};

const ORDER_STATUS_OPTIONS:
  {
    value: OrderStatus;
    label: string;
  }[] = [
    {
      value: "PENDING",
      label: "Pending",
    },
    {
      value: "PROCESSING",
      label: "Processing",
    },
    {
      value: "NEAR_DESTINATION",
      label: "Near Destination",
    },
    {
      value: "SHIPPED",
      label: "Shipped",
    },
    {
      value: "DELIVERED",
      label: "Delivered",
    },
    {
      value: "CANCELLED",
      label: "Cancelled",
    },
  ];

export default function OrderDetailsModal({
  open,
  order,
  loading = false,
  onClose,
  onApprove,
  onReject,
  onUpdateStatus,
}: OrderDetailsModalProps) {
  const [
    rejectionReason,
    setRejectionReason,
  ] = useState("");

  const [
    showRejectForm,
    setShowRejectForm,
  ] = useState(false);

  const [
    selectedStatus,
    setSelectedStatus,
  ] = useState<OrderStatus | "">(
    "",
  );

  const [
    updatingStatus,
    setUpdatingStatus,
  ] = useState(false);

  useEffect(() => {
    if (!open) {
      setRejectionReason("");
      setShowRejectForm(false);
      setSelectedStatus("");
      setUpdatingStatus(false);

      return;
    }

    if (order) {
      setSelectedStatus(
        order.status as OrderStatus,
      );
    }
  }, [
    open,
    order,
  ]);

  if (!open || !order) {
    return null;
  }

const currentOrder =
  order;

  const isCrypto =
    order.paymentMethod ===
    "CRYPTO";

  const canReview =
    isCrypto &&
    order.paymentStatus ===
      "PENDING" &&
    order.cryptoDeposit !==
      null;

  const paymentApproved =
    order.paymentStatus ===
    "PAID";

  const canManageStatus =
    paymentApproved;

  const customerName =
    [
      order.user.firstName,
      order.user.lastName,
    ]
      .filter(Boolean)
      .join(" ") ||
    "Unknown customer";

  async function handleApprove() {
    if (
      loading ||
      !canReview
    ) {
      return;
    }

await onApprove(
  currentOrder,
);
  }

  async function handleReject() {
    const reason =
      rejectionReason.trim();

    if (
      loading ||
      !canReview
    ) {
      return;
    }

    if (!reason) {
      return;
    }

await onReject(
  currentOrder,
  reason,
);
  }

  async function handleStatusUpdate() {
    if (
      loading ||
      updatingStatus ||
      !canManageStatus ||
      !selectedStatus
    ) {
      return;
    }

    const nextStatus =
      selectedStatus as OrderStatus;

if (
  nextStatus ===
  currentOrder.status
) {
  return;
}

    try {
      setUpdatingStatus(true);

await onUpdateStatus(
  currentOrder,
  nextStatus,
);
    } finally {
      setUpdatingStatus(false);
    }
  }

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
        p-3
      "
      role="presentation"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          if (
            !loading &&
            !updatingStatus
          ) {
            onClose();
          }
        }
      }}
    >
      <div
        className="
          flex
          max-h-[92vh]
          w-full
          max-w-2xl
          flex-col
          overflow-hidden
          rounded-xl
          border
          border-[var(--admin-modal-border)]
          bg-[var(--admin-modal-bg)]
          shadow-[var(--admin-modal-shadow)]
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-details-title"
      >
        <header
          className="
            flex
            items-start
            justify-between
            gap-3
            border-b
            border-[var(--admin-modal-border)]
            bg-[var(--admin-modal-header-bg)]
            px-4
            py-3.5
          "
        >
          <div className="min-w-0">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[var(--admin-muted)]
              "
            >
              Order details
            </p>

            <h2
              id="order-details-title"
              className="
                mt-1
                truncate
                text-sm
                font-semibold
                text-[var(--admin-title)]
              "
            >
              {order.orderNumber}
            </h2>

            <p
              className="
                mt-0.5
                text-[11px]
                text-[var(--admin-muted)]
              "
            >
              {formatDateTime(
                order.createdAt,
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close order details"
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-[var(--admin-modal-border)]
              text-[var(--admin-muted)]
              transition
              hover:text-[var(--admin-title)]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            disabled={
              loading ||
              updatingStatus
            }
          >
            <X
              size={16}
            />
          </button>
        </header>

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            p-4
          "
        >
          <div
            className="
              grid
              gap-3
              sm:grid-cols-2
            "
          >
            <InfoCard
              label="Customer"
              value={
                customerName
              }
              secondary={
                order.user.email
              }
            />

            <InfoCard
              label="Total"
              value={`$${Number(
                order.total,
              ).toLocaleString(
                undefined,
                {
                  minimumFractionDigits:
                    2,
                  maximumFractionDigits:
                    2,
                },
              )}`}
              secondary={`${order.paymentMethod === "CRYPTO" ? "Crypto" : "Wallet"} payment`}
            />
          </div>

          {order.cryptoDeposit && (
            <section
              className="
                mt-3
                rounded-lg
                border
                border-[var(--admin-card-border)]
                bg-[var(--admin-card-bg)]
                p-3
              "
            >
              <div
                className="
                  flex
                  flex-wrap
                  items-start
                  justify-between
                  gap-3
                "
              >
                <div>
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.08em]
                      text-[var(--admin-muted)]
                    "
                  >
                    Crypto payment
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      font-semibold
                      text-[var(--admin-title)]
                    "
                  >
                    {
                      order
                        .cryptoDeposit
                        .depositMethod
                        .name
                    }
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[11px]
                      text-[var(--admin-muted)]
                    "
                  >
                    {
                      order
                        .cryptoDeposit
                        .depositMethod
                        .symbol
                    }{" "}
                    •{" "}
                    {
                      order
                        .cryptoDeposit
                        .depositMethod
                        .network
                    }
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className="
                      text-[10px]
                      text-[var(--admin-muted)]
                    "
                  >
                    Reference
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[11px]
                      font-medium
                      text-[var(--admin-title)]
                    "
                  >
                    {
                      order
                        .cryptoDeposit
                        .reference
                    }
                  </p>
                </div>
              </div>

              {order.cryptoDeposit.receiptUrl ? (
                <div className="mt-3">
                  <p
                    className="
                      mb-2
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.08em]
                      text-[var(--admin-muted)]
                    "
                  >
                    Payment receipt
                  </p>

                  <ReceiptPreview
                    url={
                      order
                        .cryptoDeposit
                        .receiptUrl
                    }
                    name={
                      order
                        .cryptoDeposit
                        .reference
                    }
                  />
                </div>
              ) : (
                <div
                  className="
                    mt-3
                    rounded-lg
                    border
                    border-[var(--admin-card-border)]
                    bg-[var(--admin-card-bg)]
                    px-3
                    py-2.5
                    text-[11px]
                    text-[var(--admin-muted)]
                  "
                >
                  No receipt was attached.
                </div>
              )}
            </section>
          )}

          <section
            className="
              mt-3
              rounded-lg
              border
              border-[var(--admin-card-border)]
              bg-[var(--admin-card-bg)]
              p-3
            "
          >
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-[var(--admin-muted)]
              "
            >
              Delivery
            </p>

            <div
              className="
                mt-2
                grid
                gap-x-4
                gap-y-2
                sm:grid-cols-2
              "
            >
              <Detail
                label="Name"
                value={
                  order.deliveryFullName
                }
              />

              <Detail
                label="Phone"
                value={
                  order.deliveryPhoneNumber
                }
              />

              <Detail
                label="Address"
                value={[
                  order.deliveryAddressLine1,
                  order.deliveryAddressLine2,
                ]
                  .filter(Boolean)
                  .join(", ")}
              />

              <Detail
                label="Location"
                value={[
                  order.deliveryCity,
                  order.deliveryState,
                  order.deliveryCountry,
                  order.deliveryPostalCode,
                ]
                  .filter(Boolean)
                  .join(", ")}
              />
            </div>
          </section>

          <section
            className="
              mt-3
              rounded-lg
              border
              border-[var(--admin-card-border)]
              bg-[var(--admin-card-bg)]
              p-3
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-3
              "
            >
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.08em]
                  text-[var(--admin-muted)]
                "
              >
                Items
              </p>

              <p
                className="
                  text-[10px]
                  text-[var(--admin-muted)]
                "
              >
                {order.items.length}{" "}
                {order.items.length ===
                1
                  ? "item"
                  : "items"}
              </p>
            </div>

            <div
              className="
                mt-2
                divide-y
                divide-[var(--admin-table-border)]
              "
            >
              {order.items.map(
                (item) => (
                  <div
                    key={
                      item.id
                    }
                    className="
                      flex
                      items-center
                      gap-3
                      py-2.5
                    "
                  >
                    <div
                      className="
                        relative
                        h-10
                        w-10
                        shrink-0
                        overflow-hidden
                        rounded-md
                        border
                        border-[var(--admin-card-border)]
                        bg-[var(--admin-table-header-bg)]
                      "
                    >
                      {item.primaryImage ? (
                        <Image
                          src={
                            item.primaryImage
                          }
                          alt={
                            item.productName
                          }
                          fill
                          sizes="40px"
                          className="
                            object-cover
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-full
                            w-full
                            items-center
                            justify-center
                            text-[8px]
                            text-[var(--admin-muted)]
                          "
                        >
                          No image
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className="
                          truncate
                          text-xs
                          font-semibold
                          text-[var(--admin-title)]
                        "
                      >
                        {
                          item.productName
                        }
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-[10px]
                          text-[var(--admin-muted)]
                        "
                      >
                        Qty{" "}
                        {
                          item.quantity
                        }

                        {item.selectedSize &&
                          ` • ${item.selectedSize}`}

                        {item.selectedColor &&
                          ` • ${item.selectedColor}`}
                      </p>
                    </div>

                    <p
                      className="
                        shrink-0
                        text-xs
                        font-semibold
                        text-[var(--admin-title)]
                      "
                    >
                      $
                      {Number(
                        item.totalPrice,
                      ).toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits:
                            2,
                          maximumFractionDigits:
                            2,
                        },
                      )}
                    </p>
                  </div>
                ),
              )}
            </div>
          </section>

          <section
            className="
              mt-3
              rounded-lg
              border
              border-[var(--admin-card-border)]
              bg-[var(--admin-card-bg)]
              p-3
            "
          >
            <SummaryRow
              label="Subtotal"
              value={`$${Number(
                order.subtotal,
              ).toLocaleString(
                undefined,
                {
                  minimumFractionDigits:
                    2,
                  maximumFractionDigits:
                    2,
                },
              )}`}
            />

            <SummaryRow
              label="Discount"
              value={`$${Number(
                order.discount,
              ).toLocaleString(
                undefined,
                {
                  minimumFractionDigits:
                    2,
                  maximumFractionDigits:
                    2,
                },
              )}`}
            />

            <div
              className="
                mt-2
                border-t
                border-[var(--admin-table-border)]
                pt-2
              "
            >
              <SummaryRow
                label="Total"
                value={`$${Number(
                  order.total,
                ).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits:
                      2,
                    maximumFractionDigits:
                      2,
                  },
                )}`}
                strong
              />
            </div>
          </section>

          {order.notes && (
            <section
              className="
                mt-3
                rounded-lg
                border
                border-[var(--admin-card-border)]
                bg-[var(--admin-card-bg)]
                px-3
                py-2.5
              "
            >
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.08em]
                  text-[var(--admin-muted)]
                "
              >
                Customer note
              </p>

              <p
                className="
                  mt-1
                  whitespace-pre-wrap
                  text-xs
                  leading-5
                  text-[var(--admin-title)]
                "
              >
                {
                  order.notes
                }
              </p>
            </section>
          )}

          {canReview &&
            showRejectForm && (
              <section
                className="
                  mt-3
                  rounded-lg
                  border
                  border-[var(--admin-badge-danger-border)]
                  bg-[var(--admin-badge-danger-bg)]
                  p-3
                "
              >
                <label
                  className="
                    block
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.08em]
                    text-[var(--admin-muted)]
                  "
                >
                  Rejection reason
                </label>

                <textarea
                  value={
                    rejectionReason
                  }
                  onChange={(
                    event,
                  ) =>
                    setRejectionReason(
                      event.target
                        .value,
                    )
                  }
                  maxLength={1000}
                  rows={3}
                  placeholder="Enter the reason for rejecting this payment."
                  className="
                    mt-2
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-[var(--admin-input-border)]
                    bg-[var(--admin-input-bg)]
                    px-3
                    py-2.5
                    text-xs
                    text-[var(--admin-input-text)]
                    placeholder:text-[var(--admin-input-placeholder)]
                    outline-none
                    focus:border-[var(--admin-input-focus)]
                  "
                />

                <div
                  className="
                    mt-2
                    flex
                    justify-end
                    gap-2
                  "
                >
                  <button
                    type="button"
                    disabled={
                      loading
                    }
                    onClick={() =>
                      setShowRejectForm(
                        false,
                      )
                    }
                    className="
                      h-8
                      rounded-lg
                      border
                      border-[var(--admin-card-border)]
                      px-3
                      text-xs
                      font-medium
                      text-[var(--admin-muted)]
                      transition
                      hover:text-[var(--admin-title)]
                      disabled:opacity-50
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    disabled={
                      loading ||
                      !rejectionReason.trim()
                    }
                    onClick={() =>
                      void handleReject()
                    }
                    className="
                      h-8
                      rounded-lg
                      border
                      border-[var(--admin-badge-danger-border)]
                      bg-[var(--admin-badge-danger-bg)]
                      px-3
                      text-xs
                      font-semibold
                      text-[var(--admin-badge-danger-text)]
                      transition
                      hover:opacity-90
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    {loading
                      ? "Rejecting..."
                      : "Confirm rejection"}
                  </button>
                </div>
              </section>
            )}

          {canManageStatus && (
            <section
              className="
                mt-3
                rounded-lg
                border
                border-[var(--admin-card-border)]
                bg-[var(--admin-card-bg)]
                p-3
              "
            >
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-3
                "
              >
                <div>
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.08em]
                      text-[var(--admin-muted)]
                    "
                  >
                    Delivery status
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[11px]
                      text-[var(--admin-muted)]
                    "
                  >
                    Update the order's current
                    fulfilment stage.
                  </p>
                </div>

                <span
                  className="
                    rounded-full
                    border
                    border-[var(--admin-card-border)]
                    bg-[var(--admin-table-header-bg)]
                    px-2
                    py-1
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.06em]
                    text-[var(--admin-title)]
                  "
                >
                  {formatStatusLabel(
                    order.status,
                  )}
                </span>
              </div>

              <div
                className="
                  mt-3
                  flex
                  flex-col
                  gap-2
                  sm:flex-row
                "
              >
                <div className="relative min-w-0 flex-1">
                  <select
                    value={
                      selectedStatus
                    }
                    disabled={
                      loading ||
                      updatingStatus
                    }
                    onChange={(
                      event,
                    ) =>
                      setSelectedStatus(
                        event.target
                          .value as OrderStatus,
                      )
                    }
                    className="
                      h-9
                      w-full
                      appearance-none
                      rounded-lg
                      border
                      border-[var(--admin-input-border)]
                      bg-[var(--admin-input-bg)]
                      px-3
                      pr-9
                      text-xs
                      font-medium
                      text-[var(--admin-input-text)]
                      outline-none
                      transition
                      focus:border-[var(--admin-input-focus)]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {ORDER_STATUS_OPTIONS.map(
                      (option) => (
                        <option
                          key={
                            option.value
                          }
                          value={
                            option.value
                          }
                        >
                          {
                            option.label
                          }
                        </option>
                      ),
                    )}
                  </select>

                  <ChevronDown
                    size={14}
                    className="
                      pointer-events-none
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-[var(--admin-muted)]
                    "
                  />
                </div>

                <button
                  type="button"
                  disabled={
                    loading ||
                    updatingStatus ||
                    !selectedStatus ||
                    selectedStatus ===
                      order.status
                  }
                  onClick={() =>
                    void handleStatusUpdate()
                  }
                  className="
                    inline-flex
                    h-9
                    shrink-0
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-[var(--admin-badge-success-bg)]
                    px-3.5
                    text-xs
                    font-semibold
                    text-[var(--admin-badge-success-text)]
                    transition
                    hover:opacity-90
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {updatingStatus
                    ? "Updating..."
                    : "Update status"}
                </button>
              </div>
            </section>
          )}
        </div>

        {canReview && (
          <footer
            className="
              flex
              flex-col-reverse
              gap-2
              border-t
              border-[var(--admin-modal-border)]
              bg-[var(--admin-modal-footer-bg)]
              p-3
              sm:flex-row
              sm:justify-end
            "
          >
            {!showRejectForm && (
              <button
                type="button"
                disabled={
                  loading
                }
                onClick={() =>
                  setShowRejectForm(
                    true,
                  )
                }
                className="
                  inline-flex
                  h-9
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-[var(--admin-badge-danger-border)]
                  bg-[var(--admin-badge-danger-bg)]
                  px-3
                  text-xs
                  font-semibold
                  text-[var(--admin-badge-danger-text)]
                  transition
                  hover:opacity-90
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <XCircle
                  size={14}
                />

                Reject
              </button>
            )}

            <button
              type="button"
              disabled={
                loading
              }
              onClick={() =>
                void handleApprove()
              }
              className="
                inline-flex
                h-9
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-[var(--admin-badge-success-bg)]
                px-3
                text-xs
                font-semibold
                text-[var(--admin-badge-success-text)]
                transition
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <CheckCircle2
                size={14}
              />

              {loading
                ? "Processing..."
                : "Approve"}
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}

type InfoCardProps = {
  label: string;

  value: string;

  secondary?: string;
};

function InfoCard({
  label,
  value,
  secondary,
}: InfoCardProps) {
  return (
    <div
      className="
        rounded-lg
        border
        border-[var(--admin-card-border)]
        bg-[var(--admin-card-bg)]
        px-3
        py-2.5
      "
    >
      <p
        className="
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.08em]
          text-[var(--admin-muted)]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          truncate
          text-xs
          font-semibold
          text-[var(--admin-title)]
        "
      >
        {value}
      </p>

      {secondary && (
        <p
          className="
            mt-0.5
            truncate
            text-[10px]
            text-[var(--admin-muted)]
          "
        >
          {secondary}
        </p>
      )}
    </div>
  );
}

type DetailProps = {
  label: string;

  value:
    | string
    | null
    | undefined;
};

function Detail({
  label,
  value,
}: DetailProps) {
  return (
    <div className="min-w-0">
      <p
        className="
          text-[10px]
          font-medium
          uppercase
          tracking-[0.08em]
          text-[var(--admin-muted)]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-0.5
          break-words
          text-xs
          font-medium
          text-[var(--admin-title)]
        "
      >
        {value ||
          "Not provided"}
      </p>
    </div>
  );
}

type SummaryRowProps = {
  label: string;

  value: string;

  strong?: boolean;
};

function SummaryRow({
  label,
  value,
  strong = false,
}: SummaryRowProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-3
      "
    >
      <span
        className="
          text-xs
          text-[var(--admin-muted)]
        "
      >
        {label}
      </span>

      <span
        className={
          strong
            ? "text-sm font-bold text-[var(--admin-title)]"
            : "text-xs font-medium text-[var(--admin-title)]"
        }
      >
        {value}
      </span>
    </div>
  );
}

function ReceiptPreview({
  url,
  name,
}: {
  url: string;
  name: string;
}) {
  const isPdf =
    /\.pdf(?:$|\?)/i.test(
      url,
    );

  if (isPdf) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex
          items-center
          justify-center
          rounded-lg
          border
          border-[var(--admin-card-border)]
          bg-[var(--admin-table-header-bg)]
          px-4
          py-8
          text-xs
          font-medium
          text-[var(--primary)]
          transition
          hover:opacity-80
        "
      >
        Open payment receipt
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        block
        overflow-hidden
        rounded-lg
        border
        border-[var(--admin-card-border)]
        bg-[var(--admin-table-header-bg)]
      "
    >
      <div
        className="
          relative
          mx-auto
          aspect-[16/10]
          max-h-[280px]
          w-full
        "
      >
        <Image
          src={url}
          alt={`Payment receipt ${name}`}
          fill
          sizes="(max-width: 640px) 90vw, 640px"
          className="
            object-contain
            p-2
          "
        />
      </div>
    </a>
  );
}

function formatStatusLabel(
  status:
    | string
    | null
    | undefined,
) {
  if (!status) {
    return "Unknown";
  }

  return status
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

function formatDateTime(
  value: string,
) {
  return new Date(
    value,
  ).toLocaleString(
    undefined,
    {
      dateStyle:
        "medium",
      timeStyle:
        "short",
    },
  );
}