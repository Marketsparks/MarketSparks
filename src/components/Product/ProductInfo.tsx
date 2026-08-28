"use client";

import {
  useCallback,
  useState,
} from "react";

import { toast } from "sonner";

import ProductActions from "./ProductActions";
import ProductPrice from "./ProductPrice";
import ProductQuantity from "./ProductQuantity";
import ProductShare from "./ProductShare";
import ProductShipping from "./ProductShipping";
import ProductVariantPicker, {
  type ProductVariantSelection,
} from "./ProductVariantPicker";
import RatingStars from "./RatingStars";

import {
  useCartContext,
} from "@/context/CartContext";

import {
  useAffiliateAction,
} from "@/hooks/useAffiliateAction";

import type {
  ProductVariant,
} from "@/lib/products/product.types";

type ProductInfoProps = {
  productId: string;

  name: string;

  description: string;

  rating: number;

  reviewCount: number;

  price: number;

  oldPrice?: number | null;

  variants?: ProductVariant[];

  onVariantChange?: (
    selection:
      | ProductVariantSelection
      | null,
  ) => void;

  shippingMethod: string;

  estimatedDelivery: string;

  returnPolicy: string;

  productUrl: string;
};

export default function ProductInfo({
  productId,
  name,
  description,
  rating,
  reviewCount,
  price,
  oldPrice,
  variants = [],
  onVariantChange,
  shippingMethod,
  estimatedDelivery,
  returnPolicy,
  productUrl,
}: ProductInfoProps) {
  const {
    addToCart,
    openCart,
  } = useCartContext();

  const {
    execute:
      executeAffiliate,
    loading:
      affiliateLoading,
    hasActiveSubscription,
  } =
    useAffiliateAction();

  const [
    quantity,
    setQuantity,
  ] = useState(1);

  const [
    addingToCart,
    setAddingToCart,
  ] = useState(false);

  const [
    buyingNow,
    setBuyingNow,
  ] = useState(false);

  const [
    selectedSelection,
    setSelectedSelection,
  ] =
    useState<ProductVariantSelection | null>(
      null,
    );

  const selectedVariant =
    selectedSelection?.variant ??
    null;

  const selectedInventory =
    selectedSelection?.inventory ??
    null;

  const activePrice =
    selectedInventory?.price ??
    price;

  const activeStock =
    selectedInventory
      ? Math.max(
          0,
          selectedInventory.stock -
            selectedInventory.reservedStock,
        )
      : 0;

  const stockLabel =
    !selectedInventory
      ? variants.length > 0
        ? "Select an option"
        : "Inventory unavailable"
      : activeStock <= 0
        ? selectedInventory.allowPreorder
          ? "Available for preorder"
          : "Out of stock"
        : activeStock <= 5
          ? `Only ${activeStock} remaining`
          : activeStock <= 10
            ? "Low stock"
            : "In stock";

  const stockClass =
    !selectedInventory
      ? "text-[var(--foreground-muted)]"
      : activeStock <= 0
        ? selectedInventory.allowPreorder
          ? "text-blue-500"
          : "text-red-500"
        : activeStock <= 5
          ? "text-orange-500"
          : activeStock <= 10
            ? "text-yellow-500"
            : "text-green-500";

  const handleVariantChange =
    useCallback(
      (
        selection:
          | ProductVariantSelection
          | null,
      ) => {
        setSelectedSelection(
          selection,
        );

        setQuantity(
          1,
        );

        onVariantChange?.(
          selection,
        );
      },
      [
        onVariantChange,
      ],
    );

  async function handleAddToCart() {
    if (!selectedInventory) {
      toast.error(
        "Please select an available product option.",
      );

      return;
    }

    if (
      activeStock <= 0 &&
      !selectedInventory.allowPreorder
    ) {
      toast.error(
        "This product is currently out of stock.",
      );

      return;
    }

    if (
      quantity > activeStock &&
      !selectedInventory.allowPreorder
    ) {
      toast.error(
        `Only ${activeStock} item${
          activeStock === 1
            ? ""
            : "s"
        } currently available.`,
      );

      return;
    }

    try {
      setAddingToCart(
        true,
      );

      await addToCart({
        productId,

        variantSizeId:
          selectedInventory.id,

        quantity,
      });

      toast.success(
        "Product added to cart.",
      );

      openCart();
    } catch (
      error
    ) {
      toast.error(
        error instanceof
          Error
          ? error.message
          : "Failed to add product to cart.",
      );
    } finally {
      setAddingToCart(
        false,
      );
    }
  }

  async function handleBuyNow() {
    if (!selectedInventory) {
      toast.error(
        "Please select an available product option.",
      );

      return;
    }

    if (
      activeStock <= 0 &&
      !selectedInventory.allowPreorder
    ) {
      toast.error(
        "This product is currently out of stock.",
      );

      return;
    }

    if (
      quantity > activeStock &&
      !selectedInventory.allowPreorder
    ) {
      toast.error(
        `Only ${activeStock} item${
          activeStock === 1
            ? ""
            : "s"
        } currently available.`,
      );

      return;
    }

    try {
      setBuyingNow(
        true,
      );

      await addToCart({
        productId,

        variantSizeId:
          selectedInventory.id,

        quantity,
      });

      toast.success(
        "Product added to cart.",
      );

      openCart();
    } catch (
      error
    ) {
      toast.error(
        error instanceof
          Error
          ? error.message
          : "Failed to process purchase.",
      );
    } finally {
      setBuyingNow(
        false,
      );
    }
  }

  async function handleAffiliate() {
    await executeAffiliate(
      productId,
    );
  }

  return (
    <div
      className="
        flex
        flex-col
      "
    >
      <h1
        className="
          text-[24px]
          font-bold
          leading-[1.2]
          tracking-[-0.02em]
          text-[var(--foreground)]
          lg:text-[30px]
        "
      >
        {name}
      </h1>

      <div
        className="
          mt-3
        "
      >
        <RatingStars
          rating={
            rating
          }
          totalRatings={
            reviewCount
          }
          showValue
          showCount
        />
      </div>

      <p
        className="
          mt-4
          max-w-[560px]
          text-[14px]
          leading-7
          text-[var(--foreground-muted)]
        "
      >
        {description}
      </p>

      <div
        className="
          mt-5
        "
      >
        <ProductPrice
          price={
            activePrice
          }
          oldPrice={
            oldPrice ??
            undefined
          }
        />
      </div>

      <div
        className="
          mt-4
          text-sm
          font-semibold
        "
      >
        <span
          className={
            stockClass
          }
        >
          {stockLabel}
        </span>
      </div>

      {variants.length >
        0 && (
        <div
          className="
            mt-6
          "
        >
          <ProductVariantPicker
            variants={
              variants
            }
            onVariantChange={
              handleVariantChange
            }
          />
        </div>
      )}

      <div
        className="
          mt-5
        "
      >
        <ProductQuantity
          quantity={
            quantity
          }
          stock={
            activeStock
          }
          onDecrease={() =>
            setQuantity(
              (prev) =>
                Math.max(
                  1,
                  prev - 1,
                ),
            )
          }
          onIncrease={() =>
            setQuantity(
              (prev) =>
                Math.min(
                  prev + 1,
                  activeStock,
                ),
            )
          }
          disabled={
            activeStock <= 0 ||
            !selectedInventory
          }
        />
      </div>

      <div
        className="
          mt-5
        "
      >
        <ProductActions
          disabled={
            !selectedInventory ||
            (
              activeStock <= 0 &&
              !selectedInventory
                ?.allowPreorder
            )
          }
          affiliateLabel={
            hasActiveSubscription
              ? "Submit for Review"
              : "Become Affiliate"
          }
          affiliateLoading={
            affiliateLoading
          }
          addingToCart={
            addingToCart
          }
          buyingNow={
            buyingNow
          }
          onAffiliate={
            handleAffiliate
          }
          onAddToCart={
            handleAddToCart
          }
          onBuyNow={
            handleBuyNow
          }
        />
      </div>

      <div
        className="
          mt-6
        "
      >
        <ProductShipping
          shippingMethod={
            shippingMethod
          }
          estimatedDelivery={
            estimatedDelivery
          }
          returnPolicy={
            returnPolicy
          }
        />
      </div>

      <div
        className="
          mt-6
        "
      >
        <ProductShare
          productUrl={
            productUrl
          }
        />
      </div>
    </div>
  );
}