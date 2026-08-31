import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { generateToken, hashToken } from "@/lib/auth/tokens";
import { AUTH_CONSTANTS } from "@/lib/auth/constants";
import { registerSchema } from "@/lib/auth/validation";
import { MAIL_CONFIG } from "@/mail/config";
import {
  buildVerificationEmail,
  sendMail,
} from "@/mail";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid registration details",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

const {
  firstName,
  lastName,
  email,
  phoneNumber,
  country,
  password,
  heardFrom,
} = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "An account with this email already exists",
        },
        { status: 409 },
      );
    }

const existingPhone = await prisma.user.findUnique({
  where: {
    phoneNumber,
  },
  select: {
    id: true,
  },
});

if (existingPhone) {
  return NextResponse.json(
    {
      success: false,
      error: "An account with this phone number already exists",
    },
    { status: 409 },
  );
}

    const passwordHash = await hashPassword(password);

    const verificationToken = generateToken(
      AUTH_CONSTANTS.EMAIL_VERIFICATION_TOKEN_BYTES,
    );

    const verificationTokenHash = hashToken(verificationToken);

    const verificationTokenExpiresAt = new Date(
      Date.now() + AUTH_CONSTANTS.EMAIL_VERIFICATION_TOKEN_TTL_MS,
    );

const user = await prisma.$transaction(async (tx) => {
  const createdUser = await tx.user.create({
data: {
  firstName,
  lastName,
  phoneNumber,
  country,
  email,
  passwordHash,
  heardFrom: heardFrom || null,
  acceptedTermsAt: new Date(),
},
    select: {
      id: true,
      email: true,
      status: true,
    },
  });

  await tx.wallet.create({
    data: {
      userId: createdUser.id,
    },
  });

  await tx.emailVerificationToken.create({
    data: {
      userId: createdUser.id,
      tokenHash: verificationTokenHash,
      expiresAt: verificationTokenExpiresAt,
    },
  });

  return createdUser;
});

    const verificationUrl = new URL(
      "/verify-email",
      MAIL_CONFIG.appUrl,
    );

    verificationUrl.searchParams.set("token", verificationToken);

    const verificationEmail = buildVerificationEmail({
      firstName,
      verificationUrl: verificationUrl.toString(),
    });

void sendMail({
  to: user.email,
  subject: verificationEmail.subject,
  text: verificationEmail.text,
  html: verificationEmail.html,
}).catch((error) => {
  console.error(
    "[REGISTER] Background verification email failed",
    error,
  );
});

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          status: user.status,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to create account",
      },
      { status: 500 },
    );
  }
}
