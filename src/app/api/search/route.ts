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

const synonymMap: Record<
  string,
  string[]
> = {
  iwatch: [
    "apple watch",
  ],

  "smart watch": [
    "apple watch",
  ],

  smartwatch: [
    "apple watch",
  ],

  wearable: [
    "apple watch",
    "galaxy watch",
  ],

  watch: [
    "apple watch",
    "galaxy watch",
  ],

  earbuds: [
    "airpods",
    "galaxy buds",
  ],

  "wireless earbuds": [
    "airpods",
    "galaxy buds",
  ],

  earphones: [
    "airpods",
    "galaxy buds",
  ],

  headphones: [
    "airpods",
    "galaxy buds",
  ],

  laptop: [
    "macbook",
  ],

  notebook: [
    "macbook",
  ],

  ultrabook: [
    "macbook",
  ],

  smartphone: [
    "iphone",
    "galaxy",
  ],

  "mobile phone": [
    "iphone",
    "galaxy",
  ],

  cellphone: [
    "iphone",
    "galaxy",
  ],

  "cell phone": [
    "iphone",
    "galaxy",
  ],

  android: [
    "galaxy",
    "pixel",
  ],

  charger: [
    "charging cable",
    "usb c",
    "lightning",
  ],

  cable: [
    "usb c",
    "lightning",
  ],

  powerbank: [
    "power bank",
  ],

  "power bank": [
    "powerbank",
  ],

  television: [
    "tv",
  ],

  tv: [
    "television",
  ],

  console: [
    "playstation",
    "xbox",
  ],

  gaming: [
    "playstation",
    "xbox",
    "gaming laptop",
  ],

  printer: [
    "wireless printer",
  ],

  camera: [
    "dslr",
    "mirrorless",
  ],
};

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

  const normalizedQuery =
    query.toLowerCase();

  const searchTerms = [
    query,
    ...(synonymMap[
      normalizedQuery
    ] ?? []),
  ];

  const products =
    await prisma.product.findMany({
      where: {
        status: "ACTIVE",

        OR: searchTerms.flatMap(
          (term) => [
            {
              name: {
                contains: term,
                mode: "insensitive",
              },
            },

            {
              description: {
                contains: term,
                mode: "insensitive",
              },
            },

            {
              categories: {
                some: {
                  category: {
                    name: {
                      contains: term,
                      mode: "insensitive",
                    },
                  },
                },
              },
            },
          ],
        ),
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