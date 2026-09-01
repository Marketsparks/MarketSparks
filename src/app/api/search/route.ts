import {
  NextRequest,
  NextResponse,
} from "next/server";

import { prisma } from "@/lib/prisma";

import {
  productInclude,
} from "@/lib/products/product.select";

import {
  toProductCard,
} from "@/lib/products/product.mapper";

export async function GET(
  request: NextRequest,
) {
  const query =
    request.nextUrl.searchParams
      .get("q")
      ?.trim();

  const limit = Math.min(
    Number(
      request.nextUrl.searchParams.get(
        "limit",
      ) ?? "8",
    ),
    20,
  );

  if (!query) {
    return NextResponse.json([]);
  }

  const products =
    await prisma.product.findMany({
      where: {
        status: "ACTIVE",

        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },

          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },

          {
            category: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
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

      take: limit,
    });

  return NextResponse.json(
    products.map(
      toProductCard,
    ),
  );
}