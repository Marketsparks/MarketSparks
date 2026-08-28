import { prisma } from "@/lib/prisma";

import { getCurrentSession } from "@/lib/auth/session";

import { getCloudinaryImageUrl } from "@/lib/cloudinary/url";

import type {
  WishlistActionResponse,
  WishlistCountResponse,
  WishlistItem,
  WishlistResponse,
  WishlistStatusResponse,
} from "@/types/wishlist.types";

async function requireUser() {
  const session =
    await getCurrentSession();

  if (!session) {
    throw new Error(
      "Unauthorized.",
    );
  }

  return session.user.id;
}

async function getOrCreateWishlist(
  userId: string,
) {
  return prisma.wishlist.upsert({
    where: {
      userId,
    },

    update: {},

    create: {
      userId,
    },
  });
}

type PrismaWishlistItem = {
  id: string;

  productId: string;

  variantSizeId: string | null;

  createdAt: Date;

  product: {
    id: string;

    name: string;

    slug: string;

    description: string;

    price: unknown;

    compareAtPrice:
      | unknown
      | null;

    averageRating: unknown;

    totalRatings: number;

    featured: boolean;

    status: string;

    createdAt: Date;

    publishedAt: Date | null;

    category: {
      id: string;

      name: string;

      slug: string;
    };

    images: {
      id: string;

      imageKey: string;

      altText: string | null;

      isPrimary: boolean;

      sortOrder: number;
    }[];
  };

  variantSize: {
    id: string;

    size: string | null;

    sku: string | null;

    price: unknown | null;

    stock: number;

    reservedStock: number;

    incomingStock: number;

    allowPreorder: boolean;

variant: {
  id: string;

  type:
    | "DEFAULT"
    | "COLOR"
    | "STORAGE"
    | "MATERIAL"
    | "PACK_SIZE"
    | "STYLE"
    | "OTHER";

  label: string | null;

  images: {
    id: string;

    imageKey: string;

    altText: string | null;

    isPrimary: boolean;

    sortOrder: number;
  }[];
};
  } | null;
};

function mapWishlistItem(
  item: PrismaWishlistItem,
): WishlistItem {
  const primaryImage =
    item.product.images.find(
      (image) =>
        image.isPrimary,
    ) ??
    item.product.images[0] ??
    null;

  return {
    id: item.id,

    productId:
      item.productId,

    variantSizeId:
      item.variantSizeId,

    createdAt:
      item.createdAt,

    product: {
      id: item.product.id,

      slug:
        item.product.slug,

      name:
        item.product.name,

      description:
        item.product.description,

      price: Number(
        item.product.price,
      ),

      compareAtPrice:
        item.product
          .compareAtPrice === null
          ? null
          : Number(
              item.product
                .compareAtPrice,
            ),

      averageRating: Number(
        item.product.averageRating,
      ),

      totalRatings:
        item.product.totalRatings,

      featured:
        item.product.featured,

      status:
        item.product.status,

      createdAt:
        item.product.createdAt,

      publishedAt:
        item.product.publishedAt,

      category: {
        id:
          item.product.category.id,

        name:
          item.product.category.name,

        slug:
          item.product.category.slug,
      },

      images:
        item.product.images.map(
          (image) => ({
            id: image.id,

            imageKey:
              image.imageKey,

            imageUrl:
              getCloudinaryImageUrl(
                image.imageKey,
              ),

            altText:
              image.altText,

            isPrimary:
              image.isPrimary,

            sortOrder:
              image.sortOrder,
          }),
        ),
    },

    variantSize:
      item.variantSize === null
        ? null
        : {
            id:
              item.variantSize.id,

            size:
              item.variantSize
                .size,

            sku:
              item.variantSize
                .sku,

            price:
              item.variantSize
                    .price === null
                ? null
                : Number(
                    item.variantSize
                      .price,
                  ),

            stock:
              item.variantSize
                .stock,

            reservedStock:
              item.variantSize
                .reservedStock,

            incomingStock:
              item.variantSize
                .incomingStock,

            allowPreorder:
              item.variantSize
                .allowPreorder,

variant: {
  id:
    item.variantSize.variant.id,

  type:
    item.variantSize.variant.type,

  label:
    item.variantSize.variant.label,

  images:
    item.variantSize.variant.images.map(
      (image) => ({
        id: image.id,

        imageKey:
          image.imageKey,

        imageUrl:
          getCloudinaryImageUrl(
            image.imageKey,
          ),

        altText:
          image.altText,

        isPrimary:
          image.isPrimary,

        sortOrder:
          image.sortOrder,
      }),
    ),
},
    },
  };
}

export async function getWishlistService(): Promise<WishlistResponse> {
  const userId =
    await requireUser();

  const wishlist =
    await getOrCreateWishlist(
      userId,
    );

  const items =
    await prisma.wishlistItem.findMany(
      {
        where: {
          wishlistId:
            wishlist.id,
        },

include: {
  product: {
    include: {
      category: true,

      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  },

  variantSize: {
    include: {
      variant: {
        include: {
          images: {
            orderBy: {
              sortOrder: "asc",
            },
          },
        },
      },
    },
  },
},

orderBy: {
  createdAt: "desc",
    },
  },
);

  return {
    wishlist: {
      id:
        wishlist.id,

      userId,

      items:
        items.map(
          (item) =>
            mapWishlistItem(
              item,
            ),
        ),

      createdAt:
        wishlist.createdAt,

      updatedAt:
        wishlist.updatedAt,
    },

    summary: {
      itemCount:
        items.length,
    },
  };
}

export async function addToWishlistService(
  productId: string,
  variantSizeId?: string,
): Promise<WishlistActionResponse> {
  const userId =
    await requireUser();

  const wishlist =
    await getOrCreateWishlist(
      userId,
    );

  const product =
    await prisma.product.findUnique(
      {
        where: {
          id: productId,
        },

        select: {
          id: true,
        },
      },
    );

  if (!product) {
    throw new Error(
      "Product not found.",
    );
  }

  if (variantSizeId) {
    const inventory =
      await prisma.productVariantSize.findFirst(
        {
          where: {
            id:
              variantSizeId,

            variant: {
              productId,
            },
          },

          select: {
            id: true,
          },
        },
      );

    if (!inventory) {
      throw new Error(
        "Product inventory option not found.",
      );
    }
  }

  const existing =
    await prisma.wishlistItem.findFirst(
      {
        where: {
          wishlistId:
            wishlist.id,

          productId,

          variantSizeId:
            variantSizeId ??
            null,
        },

        select: {
          id: true,
        },
      },
    );

  if (existing) {
    return {
      success: true,

      message:
        "Product is already in your wishlist.",
    };
  }

  await prisma.wishlistItem.create({
    data: {
      wishlistId:
        wishlist.id,

      productId,

      variantSizeId:
        variantSizeId ??
        null,

      userId,
    },
  });

  return {
    success: true,

    message:
      "Product added to wishlist.",
  };
}

export async function removeFromWishlistService(
  productId: string,
): Promise<WishlistActionResponse> {
  const userId =
    await requireUser();

  const wishlist =
    await prisma.wishlist.findUnique(
      {
        where: {
          userId,
        },

        select: {
          id: true,
        },
      },
    );

  if (!wishlist) {
    return {
      success: true,

      message:
        "Wishlist is already empty.",
    };
  }

  await prisma.wishlistItem.deleteMany(
    {
      where: {
        wishlistId:
          wishlist.id,

        productId,
      },
    },
  );

  return {
    success: true,

    message:
      "Product removed from wishlist.",
  };
}

export async function clearWishlistService(): Promise<WishlistActionResponse> {
  const userId =
    await requireUser();

  const wishlist =
    await prisma.wishlist.findUnique(
      {
        where: {
          userId,
        },

        select: {
          id: true,
        },
      },
    );

  if (!wishlist) {
    return {
      success: true,

      message:
        "Wishlist is already empty.",
    };
  }

  await prisma.wishlistItem.deleteMany(
    {
      where: {
        wishlistId:
          wishlist.id,
      },
    },
  );

  return {
    success: true,

    message:
      "Wishlist cleared successfully.",
  };
}

export async function getWishlistStatusService(
  productId: string,
): Promise<WishlistStatusResponse> {
  const userId =
    await requireUser();

  const wishlist =
    await prisma.wishlist.findUnique(
      {
        where: {
          userId,
        },

        select: {
          id: true,
        },
      },
    );

  if (!wishlist) {
    return {
      success: true,

      inWishlist: false,
    };
  }

  const item =
    await prisma.wishlistItem.findFirst(
      {
        where: {
          wishlistId:
            wishlist.id,

          productId,
        },

        select: {
          id: true,
        },
      },
    );

  return {
    success: true,

    inWishlist:
      Boolean(item),
  };
}

export async function getWishlistCountService(): Promise<WishlistCountResponse> {
  const userId =
    await requireUser();

  const wishlist =
    await prisma.wishlist.findUnique(
      {
        where: {
          userId,
        },

        select: {
          id: true,
        },
      },
    );

  if (!wishlist) {
    return {
      success: true,

      count: 0,
    };
  }

  const count =
    await prisma.wishlistItem.count(
      {
        where: {
          wishlistId:
            wishlist.id,
        },
      },
    );

  return {
    success: true,

    count,
  };
}