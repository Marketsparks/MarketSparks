import { NextResponse } from "next/server";

import { z } from "zod";

import { prisma } from "@/lib/prisma";

import { requireAdmin } from "@/lib/auth/admin";

import {
  OrderStatus,
} from "@/../generated/prisma/client";

import {
  buildOrderStatusUpdatedEmail,
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

const updateOrderStatusSchema =
  z.object({
    status: z.nativeEnum(
      OrderStatus,
    ),
  });

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

export async function PATCH(
  request: Request,
  { params }: RouteContext,
) {
  try {
    const session =
      await requireAdmin();

    const { id } =
      await params;

    const body: unknown =
      await request.json();

    const parsed =
      updateOrderStatusSchema.safeParse(
        body,
      );

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid order status.",
          fieldErrors:
            parsed.error.flatten()
              .fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const order =
      await prisma.order.findUnique({
        where: {
          id,
        },

        select: {
          id: true,
          orderNumber: true,
          userId: true,
          status: true,
          paymentStatus: true,

          user: {
            select: {
              firstName: true,
              email: true,
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
      order.paymentStatus !==
      "PAID"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Order payment must be approved before its delivery status can be changed.",
        },
        {
          status: 409,
        },
      );
    }

    const nextStatus =
      parsed.data.status;

    if (
      order.status ===
      nextStatus
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Order is already in that status.",
        },
        {
          status: 409,
        },
      );
    }

    const updatedOrder =
      await prisma.order.update({
        where: {
          id,
        },

        data: {
          status:
            nextStatus,
        },

        select: {
          id: true,
          orderNumber: true,
          status: true,
          paymentStatus: true,
          updatedAt: true,
        },
      });

    const previousStatus =
      formatStatus(
        order.status,
      );

    const updatedStatus =
      formatStatus(
        nextStatus,
      );

    try {
      await prisma.notification.create({
        data: {
          userId:
            order.userId,

          type:
            "SYSTEM",

          title:
            `Order ${updatedStatus}`,

          message:
            `Your order ${order.orderNumber} is now ${updatedStatus.toLowerCase()}.`,
        },
      });
    } catch (notificationError) {
      console.error(
        "Failed to create order status notification:",
        notificationError,
      );
    }

    try {
      await prisma.activityLog.create({
        data: {
          adminId:
            session.user.id,

          action:
            "ORDER_STATUS_UPDATED",

          entity:
            "Order",

          entityId:
            order.id,

          description:
            `Updated order ${order.orderNumber} status from ${previousStatus} to ${updatedStatus}.`,
        },
      });
    } catch (activityError) {
      console.error(
        "Failed to create order status activity log:",
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

      const statusEmail =
        buildOrderStatusUpdatedEmail({
          firstName:
            order.user.firstName,

          orderNumber:
            order.orderNumber,

          status:
            nextStatus,

          orderUrl,
        });

      await sendMail({
        to:
          order.user.email,

        subject:
          statusEmail.subject,

        html:
          statusEmail.html,

        text:
          statusEmail.text,
      });
    } catch (emailError) {
      console.error(
        "Failed to send order status email:",
        emailError,
      );
    }

    return NextResponse.json(
      {
        success: true,

        message:
          "Order status updated successfully.",

        data: updatedOrder,
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

    console.error(
      "Admin order status update error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to update order status.",
      },
      {
        status: 500,
      },
    );
  }
}

function formatStatus(
  status: OrderStatus,
) {
  return status
    .replaceAll(
      "_",
      " ",
    )
    .toLowerCase()
    .replace(
      /\b\w/g,
      (
        character: string,
      ) =>
        character.toUpperCase(),
    );
}