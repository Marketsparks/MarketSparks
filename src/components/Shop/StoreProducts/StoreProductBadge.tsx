import type {
  ProductCard,
} from "@/lib/products/product.types";

import {
  STORE_BADGE_RADIUS,
} from "./storeProducts.constants";

import {
  STORE_PRODUCT_VARIANTS,
} from "./storeProducts.variants";

type StoreProductBadgeProps = {
  product: ProductCard;

  variant?: "default" | "compact";
};

export default function StoreProductBadge({
  product,

  variant = "default",
}: StoreProductBadgeProps) {
  const styles =
    STORE_PRODUCT_VARIANTS[
      variant
    ];

  const hasDiscount =
    product.compareAtPrice !== null &&
    product.compareAtPrice >
      product.price;

  if (!hasDiscount) {
    return null;
  }

  const discount = Math.round(
    ((product.compareAtPrice! -
      product.price) /
      product.compareAtPrice!) *
      100,
  );

  return (
    <span
      className="
        absolute
        z-30
        inline-flex
        items-center
        justify-center
        px-2.5
        font-bold
        leading-none
        tracking-[-0.01em]
        text-white
        shadow-md
      "
      style={{
        top:
          styles.badge.top,

        right:
          styles.badge.right,

        minWidth:
          styles.badge.minWidth,

        height:
          styles.badge.height,

        fontSize:
          styles.badge.fontSize,

        borderRadius:
          STORE_BADGE_RADIUS,

        background: "#FB4647",
      }}
    >
      -{discount}%
    </span>
  );
}