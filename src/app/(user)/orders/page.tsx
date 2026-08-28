"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";

import {
  ChevronDown,
  ChevronUp,
  Package,
  Search,
} from "lucide-react";

import {
  toast,
} from "sonner";

import DashboardPageLayout from "@/components/dashboard/DashboardPage";
import { PageHeader } from "@/components/dashboard";

type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

type OrderPaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED";

type PaymentMethod =
  | "WALLET"
  | "CRYPTO";

type OrderItem = {
  id: string;

  productId: string;

  variantSizeId:
    | string
    | null;

  quantity: number;

  unitPrice: string;

  totalPrice: string;

  selectedColor:
    | string
    | null;

  selectedSize:
    | string
    | null;

  product: {
    id: string;

    name: string;

    slug: string;

    primaryImage:
      | string
      | null;
  };
};

type Order = {
  id: string;

  orderNumber: string;

  subtotal: string;

  discount: string;

  total: string;

  paymentMethod: PaymentMethod;

  paymentStatus:
    OrderPaymentStatus;

  status: OrderStatus;

  walletTransactionId:
    | string
    | null;

  cryptoDepositId:
    | string
    | null;

  paidAt:
    | string
    | null;

  createdAt: string;

  updatedAt: string;

  notes:
    | string
    | null;

  delivery: {
    fullName:
      | string
      | null;

    phoneNumber:
      | string
      | null;

    alternatePhoneNumber:
      | string
      | null;

    addressLine1:
      | string
      | null;

    addressLine2:
      | string
      | null;

    city:
      | string
      | null;

    state:
      | string
      | null;

    country:
      | string
      | null;

    postalCode:
      | string
      | null;
  };

  cryptoDeposit: {
    id: string;

    reference: string;

    amount: string;

    receiptUrl:
      | string
      | null;

    status:
      | "PENDING"
      | "APPROVED"
      | "REJECTED";

    depositMethod: {
      id: string;

      name: string;

      symbol: string;

      network: string;

      iconKey:
        | string
        | null;
    };
  } | null;

  items: OrderItem[];
};

type OrdersResponse = {
  success: boolean;

  data: Order[];
};

const STATUS_OPTIONS: {
  value:
    | "ALL"
    | OrderStatus;

  label: string;
}[] = [
  {
    value: "ALL",
    label: "All orders",
  },
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "PROCESSING",
    label: "Processing",
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

export default function OrdersPage() {
  const [
    orders,
    setOrders,
  ] = useState<Order[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    status,
    setStatus,
  ] = useState<
    "ALL" | OrderStatus
  >("ALL");

  const [
    expandedOrderId,
    setExpandedOrderId,
  ] = useState<string | null>(
    null,
  );

  const loadOrders =
    useCallback(
      async () => {
        try {
          setLoading(true);
          setError("");

          const params =
            new URLSearchParams();

          if (
            search.trim()
          ) {
            params.set(
              "search",
              search.trim(),
            );
          }

          if (
            status !== "ALL"
          ) {
            params.set(
              "status",
              status,
            );
          }

          const query =
            params.toString();

          const response =
            await fetch(
              query
                ? `/api/orders?${query}`
                : "/api/orders",
              {
                cache:
                  "no-store",
              },
            );

          const result: OrdersResponse =
            await response.json();

          if (
            !response.ok ||
            !result.success
          ) {
            throw new Error(
              "Unable to load orders.",
            );
          }

          setOrders(
            result.data,
          );
        } catch (error) {
          console.error(
            error,
          );

          const message =
            error instanceof Error
              ? error.message
              : "Unable to load orders.";

          setError(
            message,
          );

          toast.error(
            message,
          );
        } finally {
          setLoading(false);
        }
      },
      [
        search,
        status,
      ],
    );

  useEffect(() => {
    const timeout =
      window.setTimeout(
        () => {
          void loadOrders();
        },
        250,
      );

    return () =>
      window.clearTimeout(
        timeout,
      );
  }, [loadOrders]);

  const totalOrders =
    useMemo(
      () => orders.length,
      [orders],
    );

  function toggleOrder(
    orderId: string,
  ) {
    setExpandedOrderId(
      (current) =>
        current === orderId
          ? null
          : orderId,
    );
  }

  return (
    <DashboardPageLayout
      environment="user"
      breadcrumb={[
        {
          label: "Orders",
        },
      ]}
    >
      <div
        className="
          space-y-5
          pb-16
        "
      >
        <PageHeader
          title="My Orders"
          description="Track your purchases, payment status, and delivery progress."
        />

        <section
          className="
            rounded-xl
            border
            border-[var(--user-card-border)]
            bg-[var(--user-card-bg)]
            p-3
            shadow-[var(--user-card-shadow)]
          "
        >
          <div
            className="
              flex
              flex-col
              gap-2
              sm:flex-row
            "
          >
            <div
              className="
                relative
                min-w-0
                flex-1
              "
            >
              <Search
                size={15}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-[var(--user-text-muted)]
                "
              />

              <input
                type="search"
                value={search}
                onChange={(
                  event,
                ) =>
                  setSearch(
                    event.target
                      .value,
                  )
                }
                placeholder="Search order number or crypto reference"
                className="
                  h-10
                  w-full
                  rounded-lg
                  border
                  border-[var(--user-card-border)]
                  bg-[var(--user-card-bg)]
                  pl-9
                  pr-3
                  text-sm
                  text-[var(--user-title)]
                  outline-none
                  placeholder:text-[var(--user-text-muted)]
                  focus:border-[var(--primary)]
                "
              />
            </div>

            <select
              value={status}
              onChange={(
                event,
              ) =>
                setStatus(
                  event.target
                    .value as
                    | "ALL"
                    | OrderStatus,
                )
              }
              className="
                h-10
                rounded-lg
                border
                border-[var(--user-card-border)]
                bg-[var(--user-card-bg)]
                px-3
                text-xs
                text-[var(--user-title)]
                outline-none
                focus:border-[var(--primary)]
              "
            >
              {STATUS_OPTIONS.map(
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
          </div>
        </section>

        {!loading &&
          !error && (
            <p
              className="
                text-xs
                text-[var(--user-text-muted)]
              "
            >
              {totalOrders}{" "}
              {totalOrders ===
              1
                ? "order"
                : "orders"}
            </p>
          )}

        {loading ? (
          <OrdersLoading />
        ) : error ? (
          <section
            className="
              rounded-xl
              border
              border-[var(--user-card-border)]
              bg-[var(--user-card-bg)]
              p-6
              text-center
              shadow-[var(--user-card-shadow)]
            "
          >
            <p
              className="
                text-sm
                font-semibold
                text-[var(--user-title)]
              "
            >
              Unable to load orders
            </p>

            <p
              className="
                mt-1.5
                text-xs
                text-[var(--user-text-muted)]
              "
            >
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                void loadOrders()
              }
              className="
                mt-4
                h-9
                rounded-lg
                border
                border-[var(--user-card-border)]
                px-3
                text-xs
                font-medium
                text-[var(--user-title)]
                transition
                hover:border-[var(--primary)]
              "
            >
              Try again
            </button>
          </section>
        ) : orders.length ===
          0 ? (
          <section
            className="
              rounded-xl
              border
              border-[var(--user-card-border)]
              bg-[var(--user-card-bg)]
              p-8
              text-center
              shadow-[var(--user-card-shadow)]
            "
          >
            <div
              className="
                mx-auto
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-[var(--user-stat-bg)]
                text-[var(--user-text-muted)]
              "
            >
              <Package
                size={18}
              />
            </div>

            <h2
              className="
                mt-3
                text-sm
                font-semibold
                text-[var(--user-title)]
              "
            >
              No orders found
            </h2>

            <p
              className="
                mx-auto
                mt-1.5
                max-w-md
                text-xs
                leading-5
                text-[var(--user-text-muted)]
              "
            >
              Your completed and pending
              purchases will appear here.
            </p>
          </section>
        ) : (
<div
  className="
    max-h-[620px]
    space-y-2
    overflow-y-auto
    pr-1
  "
>
  {orders.map(
    (order) => {
      const expanded =
        expandedOrderId ===
        order.id;

      return (
        <OrderCard
          key={
            order.id
          }
          order={
            order
          }
          expanded={
            expanded
          }
          onToggle={() =>
            toggleOrder(
              order.id,
            )
          }
        />
      );
    },
  )}
</div>
        )}
      </div>
    </DashboardPageLayout>
  );
}

type OrderCardProps = {
  order: Order;

  expanded: boolean;

  onToggle: () => void;
};

function OrderCard({
  order,
  expanded,
  onToggle,
}: OrderCardProps) {
  return (
    <article
      className="
        overflow-hidden
        rounded-xl
        border
        border-[var(--user-card-border)]
        bg-[var(--user-card-bg)]
        shadow-[var(--user-card-shadow)]
      "
    >
      <button
        type="button"
        onClick={onToggle}
        className="
          flex
          w-full
          items-center
          gap-3
          px-3
          py-3
          text-left
          transition
          hover:bg-[var(--user-stat-bg)]
        "
        aria-expanded={
          expanded
        }
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-[var(--user-stat-bg)]
            text-[var(--primary)]
          "
        >
          <Package
            size={16}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-2
              gap-y-1
            "
          >
            <span
              className="
                text-xs
                font-semibold
                text-[var(--user-title)]
              "
            >
              {order.orderNumber}
            </span>

            <StatusPill
              value={
                order.status
              }
              tone={getOrderTone(
                order.status,
              )}
            />

            <StatusPill
              value={
                order.paymentStatus
              }
              tone={getPaymentTone(
                order.paymentStatus,
              )}
            />
          </div>

          <div
            className="
              mt-1
              flex
              flex-wrap
              items-center
              gap-x-2
              gap-y-0.5
              text-[10px]
              text-[var(--user-text-muted)]
            "
          >
            <span>
              {order.paymentMethod ===
              "CRYPTO"
                ? "Crypto"
                : "Wallet"}
            </span>

            <span>
              •
            </span>

            <span>
              {formatDate(
                order.createdAt,
              )}
            </span>

            {order.cryptoDeposit && (
              <>
                <span>
                  •
                </span>

                <span className="truncate">
                  {
                    order.cryptoDeposit
                      .reference
                  }
                </span>
              </>
            )}
          </div>
        </div>

        <div
          className="
            shrink-0
            text-right
          "
        >
          <p
            className="
              text-sm
              font-semibold
              text-[var(--user-title)]
            "
          >
            {formatCurrency(
              Number(
                order.total,
              ),
            )}
          </p>

          <span
            className="
              mt-1
              flex
              justify-end
              text-[var(--user-text-muted)]
            "
          >
            {expanded ? (
              <ChevronUp
                size={15}
              />
            ) : (
              <ChevronDown
                size={15}
              />
            )}
          </span>
        </div>
      </button>

      {expanded && (
        <div
          className="
            border-t
            border-[var(--user-card-border)]
            p-3
          "
        >
          <div
            className="
              grid
              gap-3
              md:grid-cols-[minmax(0,1.2fr)_minmax(240px,0.8fr)]
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.08em]
                  text-[var(--user-text-muted)]
                "
              >
                Items
              </p>

              <div
                className="
                  mt-2
                  space-y-2
                "
              >
                {order.items.map(
                  (
                    item,
                  ) => (
                    <div
                      key={
                        item.id
                      }
                      className="
                        flex
                        items-center
                        gap-2.5
                        rounded-lg
                        border
                        border-[var(--user-card-border)]
                        bg-[var(--user-stat-bg)]
                        p-2
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
                          border-[var(--user-card-border)]
                        "
                      >
                        {item.product
                          .primaryImage ? (
                          <Image
                            src={
                              item
                                .product
                                .primaryImage
                            }
                            alt={
                              item
                                .product
                                .name
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
                              text-[var(--user-text-muted)]
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
                            font-medium
                            text-[var(--user-title)]
                          "
                        >
                          {
                            item
                              .product
                              .name
                          }
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-[10px]
                            text-[var(--user-text-muted)]
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
                          text-[var(--user-title)]
                        "
                      >
                        {formatCurrency(
                          Number(
                            item.totalPrice,
                          ),
                        )}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div
              className="
                space-y-2
              "
            >
              <InfoBlock
                label="Payment"
                value={
                  order.paymentMethod ===
                  "CRYPTO"
                    ? `Crypto • ${order.cryptoDeposit?.depositMethod.symbol ?? ""}`
                    : "Wallet balance"
                }
              />

              <InfoBlock
                label="Delivery"
                value={[
                  order.delivery.addressLine1,
                  order.delivery.city,
                  order.delivery.state,
                  order.delivery.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
              />

              <InfoBlock
                label="Contact"
                value={[
                  order.delivery.fullName,
                  order.delivery.phoneNumber,
                ]
                  .filter(Boolean)
                  .join(" • ")}
              />

              <div
                className="
                  rounded-lg
                  border
                  border-[var(--user-card-border)]
                  bg-[var(--user-stat-bg)]
                  px-3
                  py-2.5
                "
              >
                <SummaryRow
                  label="Subtotal"
                  value={formatCurrency(
                    Number(
                      order.subtotal,
                    ),
                  )}
                />

                <SummaryRow
                  label="Discount"
                  value={formatCurrency(
                    Number(
                      order.discount,
                    ),
                  )}
                />

                <div
                  className="
                    mt-2
                    border-t
                    border-[var(--user-divider)]
                    pt-2
                  "
                >
                  <SummaryRow
                    label="Total"
                    value={formatCurrency(
                      Number(
                        order.total,
                      ),
                    )}
                    strong
                  />
                </div>
              </div>

              {order.cryptoDeposit && (
                <InfoBlock
                  label="Crypto reference"
                  value={
                    order
                      .cryptoDeposit
                      .reference
                  }
                />
              )}
            </div>
          </div>

          {order.notes && (
            <div
              className="
                mt-3
                rounded-lg
                border
                border-[var(--user-card-border)]
                bg-[var(--user-stat-bg)]
                px-3
                py-2.5
              "
            >
              <p
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.08em]
                  text-[var(--user-text-muted)]
                "
              >
                Note
              </p>

              <p
                className="
                  mt-1
                  whitespace-pre-wrap
                  text-xs
                  leading-5
                  text-[var(--user-title)]
                "
              >
                {
                  order.notes
                }
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function InfoBlock({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div
      className="
        rounded-lg
        border
        border-[var(--user-card-border)]
        bg-[var(--user-stat-bg)]
        px-3
        py-2.5
      "
    >
      <p
        className="
          text-[10px]
          font-medium
          uppercase
          tracking-[0.08em]
          text-[var(--user-text-muted)]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          break-words
          text-xs
          font-medium
          text-[var(--user-title)]
        "
      >
        {value || "Not provided"}
      </p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;

  value: string;

  strong?: boolean;
}) {
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
          text-[var(--user-text-muted)]
        "
      >
        {label}
      </span>

      <span
        className={
          strong
            ? "text-sm font-bold text-[var(--user-title)]"
            : "text-xs font-medium text-[var(--user-title)]"
        }
      >
        {value}
      </span>
    </div>
  );
}

type StatusTone =
  | "success"
  | "warning"
  | "danger"
  | "neutral";

function StatusPill({
  value,
  tone,
}: {
  value: string;

  tone: StatusTone;
}) {
  const classes: Record<
    StatusTone,
    string
  > = {
    success:
      "border-[var(--user-badge-success-border)] bg-[var(--user-badge-success-bg)] text-[var(--user-badge-success-text)]",

    warning:
      "border-[var(--user-badge-warning-border)] bg-[var(--user-badge-warning-bg)] text-[var(--user-badge-warning-text)]",

    danger:
      "border-[var(--user-badge-danger-border)] bg-[var(--user-badge-danger-bg)] text-[var(--user-badge-danger-text)]",

    neutral:
      "border-[var(--user-card-border)] bg-[var(--user-card-bg)] text-[var(--user-text-muted)]",
  };

  return (
    <span
      className={`
        inline-flex
        rounded-full
        border
        px-2
        py-0.5
        text-[9px]
        font-semibold
        uppercase
        tracking-[0.04em]
        ${classes[tone]}
      `}
    >
      {formatStatusLabel(
        value,
      )}
    </span>
  );
}

function getPaymentTone(
  value: OrderPaymentStatus,
): StatusTone {
  if (
    value === "PAID"
  ) {
    return "success";
  }

  if (
    value === "FAILED"
  ) {
    return "danger";
  }

  return "warning";
}

function getOrderTone(
  value: OrderStatus,
): StatusTone {
  if (
    value ===
      "PROCESSING" ||
    value ===
      "SHIPPED" ||
    value ===
      "DELIVERED"
  ) {
    return "success";
  }

  if (
    value ===
    "CANCELLED"
  ) {
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

function formatCurrency(
  value: number,
) {
  return `$${value.toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  )}`;
}

function OrdersLoading() {
  return (
    <div className="space-y-2">
      {Array.from({
        length: 5,
      }).map(
        (_, index) => (
          <div
            key={index}
            className="
              h-[68px]
              animate-pulse
              rounded-xl
              border
              border-[var(--user-card-border)]
              bg-[var(--user-card-bg)]
            "
          />
        ),
      )}
    </div>
  );
}