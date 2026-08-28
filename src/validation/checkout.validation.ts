import {
  PaymentMethod,
} from "../../generated/prisma/client";

import { z } from "zod";

const checkoutDeliveryDetailsSchema =
  z.object({
    fullName: z
      .string()
      .trim()
      .min(
        2,
        "Full name is required.",
      )
      .max(200),

    phoneNumber: z
      .string()
      .trim()
      .min(
        7,
        "Phone number is invalid.",
      )
      .max(20),

    alternatePhoneNumber:
      z
        .string()
        .trim()
        .max(20)
        .optional()
        .nullable(),

    addressLine1: z
      .string()
      .trim()
      .min(
        3,
        "Address is required.",
      )
      .max(255),

    addressLine2:
      z
        .string()
        .trim()
        .max(255)
        .optional()
        .nullable(),

    city: z
      .string()
      .trim()
      .min(
        2,
        "City is required.",
      )
      .max(100),

    state:
      z
        .string()
        .trim()
        .max(100)
        .optional()
        .nullable(),

    country: z
      .string()
      .trim()
      .min(
        2,
        "Country is required.",
      )
      .max(100),

    postalCode:
      z
        .string()
        .trim()
        .max(20)
        .optional()
        .nullable(),
  });

const savedAddressSourceSchema =
  z.object({
    type:
      z.literal("SAVED"),

    addressId:
      z
        .string()
        .min(
          1,
          "Address is required.",
        ),
  });

const newAddressSourceSchema =
  z.object({
    type:
      z.literal("NEW"),

    details:
      checkoutDeliveryDetailsSchema,

    saveAsPrimary:
      z.boolean(),
  });

const checkoutAddressSourceSchema =
  z.discriminatedUnion(
    "type",
    [
      savedAddressSourceSchema,
      newAddressSourceSchema,
    ],
  );

const walletCheckoutSchema =
  z.object({
    paymentMethod:
      z.literal(
        PaymentMethod.WALLET,
      ),

    addressSource:
      checkoutAddressSourceSchema,

    notes:
      z
        .string()
        .trim()
        .max(1000)
        .optional()
        .nullable()
        .or(z.literal("")),
  });

const cryptoCheckoutSchema =
  z.object({
    paymentMethod:
      z.literal(
        PaymentMethod.CRYPTO,
      ),

    addressSource:
      checkoutAddressSourceSchema,

    depositMethodId:
      z
        .string()
        .uuid(
          "Invalid deposit method.",
        ),

    receiptUrl:
      z
        .string()
        .url(
          "Valid receipt upload is required.",
        ),

    notes:
      z
        .string()
        .trim()
        .max(1000)
        .optional()
        .nullable()
        .or(z.literal("")),
  });

export const checkoutSchema =
  z.discriminatedUnion(
    "paymentMethod",
    [
      walletCheckoutSchema,
      cryptoCheckoutSchema,
    ],
  );

export type CheckoutValidationInput =
  z.infer<
    typeof checkoutSchema
  >;

export type CheckoutDeliveryDetailsInput =
  z.infer<
    typeof checkoutDeliveryDetailsSchema
  >;

export type CheckoutAddressSourceInput =
  z.infer<
    typeof checkoutAddressSourceSchema
  >;