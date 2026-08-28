import {
  buildBaseEmail,
} from "./base-email";

type OrderConfirmationItem = {
  name: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
};

type OrderConfirmationEmailInput = {
  firstName: string;

  orderNumber: string;

  total: string;

  paymentMethod: string;

  deliveryAddress: string;

  items: OrderConfirmationItem[];

  orderUrl?: string;
};

export function buildOrderConfirmationEmail({
  firstName,
  orderNumber,
  total,
  paymentMethod,
  deliveryAddress,
  items,
  orderUrl,
}: OrderConfirmationEmailInput) {
  const subject =
    `Order ${orderNumber} confirmed`;

  const itemSummary =
    items.length > 0
      ? items
          .map(
            (item) =>
              `${item.name} × ${item.quantity} = $${item.totalPrice}`,
          )
          .join("\n")
      : "No items available.";

  const email =
    buildBaseEmail({
      subject,

      preheader:
        `Your MarketSparks order ${orderNumber} has been successfully placed.`,

      title:
        `Your order is confirmed, ${firstName}`,

      message:
        `Your order ${orderNumber} has been successfully placed. We have received your order and it is now being processed.`,

      details: [
        {
          label:
            "Order",

          value:
            orderNumber,
        },

        {
          label:
            "Payment",

          value:
            paymentMethod,
        },

        {
          label:
            "Total",

          value:
            `$${total}`,
        },

        {
          label:
            "Delivery",

          value:
            deliveryAddress,
        },
      ],

      button: orderUrl
        ? {
            label:
              "View my order",

            url:
              orderUrl,
          }
        : undefined,

      footerMessage:
        "You will receive further updates as your order progresses.",
    });

  const text = [
    `Hi ${firstName},`,
    "",
    `Your order ${orderNumber} has been successfully placed.`,
    "",
    "Order details:",
    `Order: ${orderNumber}`,
    `Payment: ${paymentMethod}`,
    `Total: $${total}`,
    `Delivery: ${deliveryAddress}`,
    "",
    "Items:",
    itemSummary,
    "",
    "You will receive further updates as your order progresses.",
    "",
    "MarketSparks",
  ].join("\n");

  return {
    subject,
    html:
      email.html,
    text,
  };
}