"use client";

import { toast } from "sonner";

import WishlistGrid from "./WishlistGrid";

import { useWishlist } from "@/hooks/useWishlist";

export default function WishlistPage() {
  const {
    items,
    isLoading,
    removeFromWishlist,
    addWishlistItemToCart,
  } = useWishlist();

async function handleRemove(
  productId: string,
  variantSizeId?: string,
) {
    try {
await removeFromWishlist(
  productId,
  variantSizeId,
);

      toast.success(
        "Removed from wishlist."
      );
    } catch {
      toast.error(
        "Unable to remove item."
      );
    }
  }

async function handleAddToCart(
  productId: string,
  variantSizeId?: string,
) {
  try {
    await addWishlistItemToCart(
      productId,
      variantSizeId,
    );

    toast.success(
      "Added to cart.",
    );
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Unable to add item to cart.",
    );
  }
}

  return (
<section
  className="
    space-y-5

    pb-28

    sm:pb-32
  "
>
      <header
        className="
          flex

          items-center

          justify-between

          gap-4
        "
      >
        <div>
          <h1
            className="
              text-xl

              font-bold

              text-[var(--user-title)]
            "
          >
            Wishlist
          </h1>

          <p
            className="
              mt-1

              text-sm

              text-[var(--user-text-muted)]
            "
          >
            {items.length}
            {" "}
            saved
            {items.length === 1
              ? " item"
              : " items"}
          </p>
        </div>
      </header>

      <WishlistGrid
        items={items}
        loading={isLoading}
        onRemove={
          handleRemove
        }
        onAddToCart={
          handleAddToCart
        }
      />
    </section>
  );
}