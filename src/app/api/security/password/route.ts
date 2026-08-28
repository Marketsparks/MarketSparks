import {
  NextRequest,
  NextResponse,
} from "next/server";

import { prisma } from "@/lib/prisma";

import {
  requireUser,
} from "@/lib/auth/user";

import {
  requireAdmin,
} from "@/lib/auth/admin";

import {
  verifyPassword,
  hashPassword,
} from "@/lib/auth/password";

import {
  changePasswordSchema,
} from "@/components/security/security.validation";

async function getAuthenticatedSession() {
  try {
    return await requireAdmin();
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "FORBIDDEN"
    ) {
      return await requireUser();
    }

    throw error;
  }
}

export async function PATCH(
  request: NextRequest,
) {
  try {
    const session =
      await getAuthenticatedSession();

    const body =
      await request.json();

    const parsed =
      changePasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request.",
          fieldErrors:
            parsed.error.flatten()
              .fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const {
      currentPassword,
      newPassword,
    } = parsed.data;

    const user =
      await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          id: true,
          passwordHash: true,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found.",
        },
        {
          status: 404,
        },
      );
    }

    const passwordMatches =
      await verifyPassword(
        currentPassword,
        user.passwordHash,
      );

    if (!passwordMatches) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Your current password is incorrect.",
        },
        {
          status: 400,
        },
      );
    }

    const passwordHash =
      await hashPassword(
        newPassword,
      );

    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          passwordHash,
        },
      }),

      prisma.session.updateMany({
        where: {
          userId: user.id,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message:
        "Password updated successfully.",
    });
  } catch (error) {
    console.error(
      "Password change error:",
      error,
    );

    if (
      error instanceof Error &&
      error.message ===
        "UNAUTHENTICATED"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Session expired. Please sign in again.",
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to change password.",
      },
      {
        status: 500,
      },
    );
  }
}