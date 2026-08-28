"use client";

import Image from "next/image";

import Link from "next/link";

import { useState } from "react";

import {
  Heart,
  Loader2,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import type {
  WishlistItem as WishlistItemType,
} from "@/types/wishlist.types";

type WishlistItemProps = {
  item: WishlistItemType;

  onRemove: (
    productId: string,
    variantSizeId?: string,
  ) => void | Promise<void>;

onAddToCart?: (
  productId: string,
  variantSizeId?: string,
) => void | Promise<void>;

  loading?: boolean;
};

export default function WishlistItem({
  item,
  onRemove,
  onAddToCart,
  loading = false,
}: WishlistItemProps) {
  const {
    product,
    variantSize,
  } = item;

const [
  actionLoading,
  setActionLoading,
] = useState<
  "cart" | "remove" | null
>(null);

const primaryImage =
  variantSize?.variant.images.find(
    (image) => image.isPrimary,
  ) ??
  variantSize?.variant.images[0] ??
  product.images.find(
    (image) => image.isPrimary,
  ) ??
  product.images[0] ??
  null;

  const availableStock =
    variantSize
      ? Math.max(
          0,
          variantSize.stock -
            variantSize.reservedStock,
        )
      : 0;

  const inStock =
    variantSize
      ? availableStock > 0 ||
        variantSize.allowPreorder
      : true;

async function handleAddToCart() {
  if (
    !onAddToCart ||
    actionLoading
  ) {
    return;
  }

  try {
    setActionLoading("cart");

await onAddToCart(
  product.id,

  variantSize?.id ??
    undefined,
);
  } finally {
    setActionLoading(null);
  }
}

async function handleRemove() {
  if (actionLoading) {
    return;
  }

  try {
    setActionLoading("remove");

    await onRemove(
      product.id,

      variantSize?.id ??
        undefined,
    );
  } finally {
    setActionLoading(null);
  }
}

  return (
    <article
      className="
        overflow-hidden

        rounded-[var(--user-radius-md)]

        border

        border-[var(--user-card-border)]

        bg-[var(--user-card-bg)]

        shadow-[var(--user-card-shadow)]

        transition-all

        duration-[var(--user-transition)]
      "
    >
      <div
        className="
          relative

          aspect-square

          overflow-hidden

          bg-[var(--user-surface-secondary)]
        "
      >
        <Link
          href={`/Market-Place/${product.slug}`}
          className="
            absolute

            inset-0
          "
        >
          {primaryImage ? (
            <Image
              src={
                primaryImage.imageUrl ??
                `/api/image/${primaryImage.imageKey}`
              }
              alt={
                primaryImage.altText ??
                product.name
              }
              fill
              sizes="
                (max-width:768px) 50vw,
                240px
              "
              className="
                object-cover

                transition-transform

                duration-[var(--user-transition)]

                hover:scale-105
              "
            />
          ) : (
            <div
              className="
                flex

                h-full

                items-center

                justify-center

                px-4

                text-center

                text-xs

                text-[var(--user-text-muted)]
              "
            >
              No image available
            </div>
          )}
        </Link>

        <button
          type="button"
          aria-label="Add to cart"
disabled={
  loading ||
  !inStock ||
  actionLoading !== null
}
onClick={handleAddToCart}
          className="
            absolute

            right-2.5

            top-2.5

            z-10

            flex

            h-8

            w-8

            items-center

            justify-center

            rounded-full

            border

            border-[var(--user-card-border)]

            bg-[var(--user-card-bg)]

            text-[var(--user-title)]

            shadow-sm

            backdrop-blur-md

            transition-all

            duration-[var(--user-transition)]

            hover:bg-[var(--user-hover)]

            hover:scale-105

            disabled:cursor-not-allowed

            disabled:opacity-50
          "
        >
{actionLoading === "cart" ? (
  <Loader2
    size={12}
    className="animate-spin"
  />
) : (
  <ShoppingCart
    size={12}
  />
)}
        </button>

        <button
          type="button"
          aria-label="Remove from wishlist"
disabled={
  loading ||
  actionLoading !== null
}
onClick={handleRemove}
className="
  absolute

  bottom-2.5

  right-2.5

  z-10

  flex

  h-8

  w-8

  items-center

  justify-center

  rounded-full

  border

  border-red-500

  bg-red-500

  text-white

  shadow-md

  transition-all

  duration-[var(--user-transition)]

  hover:bg-red-600

  hover:border-red-600

  hover:scale-105

  disabled:cursor-not-allowed

  disabled:opacity-50
"
        >
{actionLoading === "remove" ? (
  <Loader2
    size={12}
    className="animate-spin"
  />
) : (
  <Trash2
    size={12}
  />
)}
        </button>
      </div>

      <div
        className="
          flex

          flex-col

          gap-1.5

          p-2
        "
      >
        <Link
          href={`/Market-Place/${product.slug}`}
        >
          <h3
            className="
              line-clamp-2

              text-[12px]

              font-semibold

              leading-4

              text-[var(--user-title)]

              transition-colors

              duration-[var(--user-transition)]

              hover:text-[var(--user-link-hover)]
            "
          >
            {product.name}
          </h3>
        </Link>

        <div
          className="
            flex

            items-center

            justify-between

            gap-2
          "
        >
          <div>
            {product.compareAtPrice && (
              <p
                className="
                  text-[10px]

                  leading-3.5

                  text-[var(--user-text-muted)]

                  line-through
                "
              >
                $
                {product.compareAtPrice.toFixed(
                  2,
                )}
              </p>
            )}

            <p
              className="
                text-[13px]

                font-bold

                leading-4

                text-[var(--user-title)]
              "
            >
              $
              {(
                variantSize?.price ??
                product.price
              ).toFixed(2)}
            </p>
          </div>

          <span
            className={`
              rounded-full

              px-2

              py-0.5

              text-[9px]

              font-semibold

              leading-3.5

              ${
                inStock
                  ? `
                    bg-[var(--user-badge-success-bg)]

                    text-[var(--user-badge-success-text)]
                  `
                  : `
                    bg-[var(--user-badge-danger-bg)]

                    text-[var(--user-badge-danger-text)]
                  `
              }
            `}
          >
            {inStock
              ? "In Stock"
              : "Out of Stock"}
          </span>
        </div>

        <div
          className="
            flex

            items-center

            gap-1.5

            text-[9px]

            leading-3

            text-[var(--user-text-muted)]
          "
        >
          <Heart
            size={10}
            fill="currentColor"
          />

          Saved to wishlist
        </div>
      </div>
    </article>
  );
}