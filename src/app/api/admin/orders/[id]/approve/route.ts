import { NextResponse } from "next/server";

import {
  requireAdmin,
} from "@/lib/auth/admin";

import {
  prisma,
} from "@/lib/prisma";

import {
  buildOrderPaymentApprovedEmail,
  sendMail,
} from "@/mail";

import {
  MAIL_CONFIG,
} from "@/mail/config";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function unauthorizedResponse() {
  return NextResponse.json(
    {
      success: false,
      error:
        "Session Timeout. Please login again.",
    },
    {
      status: 401,
    },
  );
}

function forbiddenResponse() {
  return NextResponse.json(
    {
      success: false,
      error:
        "Admin access required.",
    },
    {
      status: 403,
    },
  );
}

function handleAuthError(
  error: unknown,
) {
  if (
    error instanceof Error &&
    error.message ===
      "UNAUTHENTICATED"
  ) {
    return unauthorizedResponse();
  }

  if (
    error instanceof Error &&
    error.message ===
      "FORBIDDEN"
  ) {
    return forbiddenResponse();
  }

  return null;
}

export async function POST(
  _request: Request,
  {
    params,
  }: RouteContext,
) {
  try {
    const session =
      await requireAdmin();

    const { id } =
      await params;

    const order =
      await prisma.order.findUnique({
        where: {
          id,
        },

        include: {
user: {
  select: {
    id: true,
    firstName: true,
    email: true,
  },
},

          cryptoDeposit: {
            select: {
              id: true,
              status: true,
            },
          },
        },
      });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Order not found.",
        },
        {
          status: 404,
        },
      );
    }

    if (
      order.paymentMethod !==
      "CRYPTO"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Only crypto orders require payment approval.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      order.paymentStatus !==
      "PENDING"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Order payment has already been reviewed.",
        },
        {
          status: 409,
        },
      );
    }

    if (
      !order.cryptoDeposit
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Crypto payment record not found for this order.",
        },
        {
          status: 409,
        },
      );
    }

    if (
      order.cryptoDeposit.status !==
      "PENDING"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "The linked crypto payment has already been reviewed.",
        },
        {
          status: 409,
        },
      );
    }

    const updatedOrder =
      await prisma.$transaction(
        async (tx) => {
          const currentOrder =
            await tx.order.findUnique({
              where: {
                id,
              },

              select: {
                paymentMethod:
                  true,

                paymentStatus:
                  true,

                cryptoDepositId:
                  true,
              },
            });

          if (
            !currentOrder
          ) {
            throw new Error(
              "ORDER_NOT_FOUND",
            );
          }

          if (
            currentOrder.paymentMethod !==
            "CRYPTO"
          ) {
            throw new Error(
              "NOT_CRYPTO_ORDER",
            );
          }

          if (
            currentOrder.paymentStatus !==
            "PENDING"
          ) {
            throw new Error(
              "ORDER_ALREADY_REVIEWED",
            );
          }

          if (
            !currentOrder.cryptoDepositId
          ) {
            throw new Error(
              "CRYPTO_DEPOSIT_NOT_FOUND",
            );
          }

          const deposit =
            await tx.deposit.findUnique({
              where: {
                id:
                  currentOrder.cryptoDepositId,
              },

              select: {
                status: true,
              },
            });

          if (!deposit) {
            throw new Error(
              "CRYPTO_DEPOSIT_NOT_FOUND",
            );
          }

          if (
            deposit.status !==
            "PENDING"
          ) {
            throw new Error(
              "CRYPTO_DEPOSIT_ALREADY_REVIEWED",
            );
          }

          await tx.deposit.update({
            where: {
              id:
                currentOrder.cryptoDepositId,
            },

            data: {
              status:
                "APPROVED",

              reviewedAt:
                new Date(),

              reviewedById:
                session.user.id,
            },
          });

          return tx.order.update({
            where: {
              id,
            },

            data: {
              paymentStatus:
                "PAID",

              status:
                "PROCESSING",

              paidAt:
                new Date(),
            },
          });
        },
        {
          timeout:
            15000,
        },
      );

    try {
      await prisma.notification.create({
        data: {
          userId:
            order.user.id,

          type:
            "SYSTEM",

          title:
            "Order Payment Approved",

          message:
            `Your crypto payment for order ${order.orderNumber} has been approved. Your order is now being processed.`,
        },
      });
    } catch (notificationError) {
      console.error(
        "Failed to create order approval notification:",
        notificationError,
      );
    }

    try {
      await prisma.activityLog.create({
        data: {
          adminId:
            session.user.id,

          action:
            "ORDER_PAYMENT_APPROVED",

          entity:
            "Order",

          entityId:
            order.id,

          description:
            `Approved crypto payment for order ${order.orderNumber}.`,
        },
      });
    } catch (activityError) {
      console.error(
        "Failed to create order approval activity log:",
        activityError,
      );
    }

try {
  const orderUrl =
    new URL(
      `/orders?order=${encodeURIComponent(
        order.orderNumber,
      )}`,
      MAIL_CONFIG.appUrl,
    ).toString();

  const approvalEmail =
    buildOrderPaymentApprovedEmail({
      firstName:
        order.user.firstName,

      orderNumber:
        order.orderNumber,

      total:
        order.total.toString(),

      orderUrl,
    });

  await sendMail({
    to:
      order.user.email,

    subject:
      approvalEmail.subject,

    html:
      approvalEmail.html,

    text:
      approvalEmail.text,
  });
} catch (emailError) {
  console.error(
    "Failed to send order payment approval email:",
    emailError,
  );
}

    return NextResponse.json(
      {
        success: true,

        message:
          "Crypto order payment approved.",

        data: {
          id:
            updatedOrder.id,

          orderNumber:
            updatedOrder.orderNumber,

          paymentStatus:
            updatedOrder.paymentStatus,

          status:
            updatedOrder.status,

          paidAt:
            updatedOrder.paidAt,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    const authError =
      handleAuthError(error);

    if (authError) {
      return authError;
    }

    if (
      error instanceof Error
    ) {
      switch (
        error.message
      ) {
        case "ORDER_NOT_FOUND":
          return NextResponse.json(
            {
              success: false,
              error:
                "Order not found.",
            },
            {
              status: 404,
            },
          );

        case "NOT_CRYPTO_ORDER":
          return NextResponse.json(
            {
              success: false,
              error:
                "Only crypto orders require payment approval.",
            },
            {
              status: 400,
            },
          );

        case "ORDER_ALREADY_REVIEWED":
          return NextResponse.json(
            {
              success: false,
              error:
                "Order payment has already been reviewed.",
            },
            {
              status: 409,
            },
          );

        case "CRYPTO_DEPOSIT_NOT_FOUND":
          return NextResponse.json(
            {
              success: false,
              error:
                "Crypto payment record not found.",
            },
            {
              status: 409,
            },
          );

        case "CRYPTO_DEPOSIT_ALREADY_REVIEWED":
          return NextResponse.json(
            {
              success: false,
              error:
                "The linked crypto payment has already been reviewed.",
            },
            {
              status: 409,
            },
          );

        default:
          break;
      }
    }

    console.error(
      "Admin crypto order approval error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to approve order payment.",
      },
      {
        status: 500,
      },
    );
  }
}