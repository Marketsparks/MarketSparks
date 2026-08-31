import { prisma } from "@/lib/prisma";

import {
  productDetailsInclude,
  productInclude,
} from "./product.select";

import {
  toProductCard,
  toProductDetails,
} from "./product.mapper";

import type {
  ProductCard,
  ProductDetails,
} from "./product.types";

export async function getPublishedProducts(
  categoryId?: string | null,
): Promise<ProductCard[]> {
  const products =
    await prisma.product.findMany({
      where: {
        status: "ACTIVE",

        ...(categoryId
          ? {
              categoryId,
            }
          : {}),
      },

      include: productInclude,

      orderBy: [
        {
          featured: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

  return products.map(
    toProductCard,
  );
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string,
): Promise<ProductCard[]> {
  const products =
    await prisma.product.findMany({
      where: {
        status: "ACTIVE",

        categoryId,

        NOT: {
          id: productId,
        },
      },

      include: productInclude,

      orderBy: [
        {
          featured: "desc",
        },
        {
          createdAt: "desc",
        },
      ],

      take: 8,
    });

  return products.map(
    toProductCard,
  );
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetails | null> {
  const product =
    await prisma.product.findUnique({
      where: {
        slug,
      },

      include:
        productDetailsInclude,
    });

  if (
    !product ||
    product.status !==
      "ACTIVE"
  ) {
    return null;
  }

  return toProductDetails(
    product,
  );
}