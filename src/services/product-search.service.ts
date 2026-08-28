import { prisma } from "@/lib/prisma";

import type {
  ProductSearchResponse,
} from "@/types/search.types";

import { getCloudinaryImageUrl } from "@/lib/cloudinary/url";

const MAX_CATEGORY_RESULTS = 5;

const MAX_PRODUCT_RESULTS = 8;

export async function searchProducts(
  rawQuery: string,
): Promise<ProductSearchResponse> {
  const query = rawQuery.trim();

  if (query.length < 2) {
    return {
      query,
      categories: [],
      products: [],
    };
  }

  const [
    categories,
    products,
  ] = await Promise.all([
    prisma.productCategory.findMany({
      where: {
        isActive: true,
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          name: "asc",
        },
      ],
      take: MAX_CATEGORY_RESULTS,
      select: {
        id: true,
        name: true,
        slug: true,
        imageKey: true,
      },
    }),

    prisma.product.findMany({
      where: {
        status: "ACTIVE",
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      orderBy: [
        {
          featured: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
      take: MAX_PRODUCT_RESULTS,
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        compareAtPrice: true,
        averageRating: true,
        featured: true,
        status: true,
        categoryId: true,

        category: {
          select: {
            name: true,
          },
        },

        images: {
          where: {
            isPrimary: true,
          },
          take: 1,
          select: {
            imageKey: true,
          },
        },
      },
    }),
  ]);

  return {
    query,

    categories,

    products: products.map(
      (product) => ({
        id: product.id,

        name: product.name,

        slug: product.slug,

        price: Number(
          product.price,
        ),

        compareAtPrice:
          product.compareAtPrice === null
            ? null
            : Number(
                product.compareAtPrice,
              ),

        averageRating: Number(
          product.averageRating,
        ),

        featured:
          product.featured,

        status: product.status,

        categoryId:
          product.categoryId,

        categoryName:
          product.category.name,

primaryImageUrl:
  getCloudinaryImageUrl(
    product.images[0]
      ?.imageKey ?? null,
  ),
      }),
    ),
  };
}