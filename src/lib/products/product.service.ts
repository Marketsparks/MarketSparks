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

  return products.map(toProductCard);
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetails | null> {
  const product =
    await prisma.product.findFirst({
      where: {
        slug,
        status: "ACTIVE",
      },

      include: productDetailsInclude,
    });

  if (!product) {
    return null;
  }

  return toProductDetails(product);
}