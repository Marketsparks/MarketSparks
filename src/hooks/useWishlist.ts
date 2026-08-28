"use client";

import { useCallback, useEffect, useState } from "react";

import {
  addToWishlist,
  clearWishlist,
  getWishlist,
  getWishlistCount,
  getWishlistStatus,
  removeFromWishlist,
} from "@/components/Wishlist";

import type {
  AddToWishlistInput,
  Wishlist,
  WishlistItem,
  WishlistSummary,
} from "@/types/wishlist.types";

import {
  useCartContext,
} from "@/context/CartContext";

import { useAuth } from "@/context/AuthContext";

export type UseWishlistResult = {
  wishlist: Wishlist | null;

  items: WishlistItem[];

  summary: WishlistSummary | null;

  loading: boolean;

  isLoading: boolean;

  error: string | null;

  itemCount: number;

  count: number;

  refetch: () => Promise<void>;

  refresh: () => Promise<void>;

  refreshCount: () => Promise<void>;

  addItem: (
    input: AddToWishlistInput,
  ) => Promise<void>;

  addToWishlist: (
    input: AddToWishlistInput,
  ) => Promise<void>;

removeItem: (
  productId: string,
  variantSizeId?: string,
) => Promise<void>;

removeFromWishlist: (
  productId: string,
  variantSizeId?: string,
) => Promise<void>;

  clear: () => Promise<void>;

  clearWishlist: () => Promise<void>;

  isInWishlist: (
    productId: string,
  ) => Promise<boolean>;

addWishlistItemToCart: (
  productId: string,
  variantSizeId?: string,
) => Promise<void>;
};

export function useWishlist(): UseWishlistResult {
  const [wishlist, setWishlist] =
    useState<Wishlist | null>(null);

const {
  user,
  loading: authLoading,
} = useAuth();

  const [summary, setSummary] =
    useState<WishlistSummary | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [itemCount, setItemCount] =
    useState(0);

const {
  addToCart,
} = useCartContext();

const refetch = useCallback(
  async () => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setWishlist(null);

      setSummary(null);

      setItemCount(0);

      setError(null);

      setLoading(false);

      return;
    }

    try {
      setLoading(true);

      setError(null);

      const response =
        await getWishlist();

      setWishlist(
        response.wishlist,
      );

      setSummary(
        response.summary,
      );

      setItemCount(
        response.summary
          .itemCount,
      );
    } catch (error) {
      setWishlist(null);

      setSummary(null);

      setItemCount(0);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load wishlist.",
      );
    } finally {
      setLoading(false);
    }
  },
  [
    authLoading,
    user,
  ],
);

  const refreshCount =
    useCallback(async () => {
      try {
        const response =
          await getWishlistCount();

        setItemCount(response.count);
      } catch {
        setItemCount(0);
      }
    }, []);

  const addItem = useCallback(
    async (
      input: AddToWishlistInput,
    ) => {
      await addToWishlist(input);

      await refetch();
    },
    [refetch],
  );

const removeItem =
  useCallback(
    async (
      productId: string,
      variantSizeId?: string,
    ) => {
      await removeFromWishlist(
        productId,
        variantSizeId,
      );

      await refetch();
    },
    [refetch],
  );

  const clear = useCallback(
    async () => {
      await clearWishlist();

      await refetch();
    },
    [refetch],
  );

  const isInWishlist =
    useCallback(
      async (
        productId: string,
      ) => {
        const response =
          await getWishlistStatus(
            productId,
          );

        return response.inWishlist;
      },
      [],
    );

async function addWishlistItemToCart(
  productId: string,
  variantSizeId?: string,
): Promise<void> {
  const item =
    wishlist?.items.find(
      (wishlistItem) =>
        wishlistItem.productId ===
          productId &&
        (
          variantSizeId ===
            undefined ||
          wishlistItem.variantSizeId ===
            variantSizeId
        ),
    );

  if (!item) {
    throw new Error(
      "Wishlist item not found.",
    );
  }

let resolvedVariantSizeId:
  | string
  | undefined =
  variantSizeId ??
  item.variantSizeId ??
  undefined;

  if (!resolvedVariantSizeId) {
    const response =
      await fetch(
        `/api/products/${encodeURIComponent(
          productId,
        )}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

    const data =
      await response.json();

    if (
      !response.ok ||
      !data.success ||
      !data.data
    ) {
      throw new Error(
        "Unable to load product options.",
      );
    }

    const variants =
      data.data.variants ?? [];

    const availableInventory =
      variants
        .flatMap(
          (
            variant: {
              sizes: Array<{
                id: string;
                stock: number;
                reservedStock: number;
                allowPreorder: boolean;
              }>;
            },
          ) => variant.sizes,
        )
        .find(
          (inventory: {
            id: string;
            stock: number;
            reservedStock: number;
            allowPreorder: boolean;
          }) =>
            inventory.stock -
              inventory.reservedStock >
              0 ||
            inventory.allowPreorder,
        );

    if (!availableInventory) {
      throw new Error(
        "This product is currently unavailable.",
      );
    }

    resolvedVariantSizeId =
      availableInventory.id;
  }

if (!resolvedVariantSizeId) {
  throw new Error(
    "A product variant could not be resolved.",
  );
}

await addToCart({
  productId:
    item.productId,

  variantSizeId:
    resolvedVariantSizeId,

  quantity: 1,
});

await removeFromWishlist(
  item.productId,
  resolvedVariantSizeId,
);

await refetch();
}

useEffect(() => {
  void refetch();
}, [refetch]);

  return {
    wishlist,

    items: wishlist?.items ?? [],

    summary,

    loading,

    isLoading: loading,

    error,

    itemCount,

    count: itemCount,

    refetch,

    refresh: refetch,

    refreshCount,

    addItem,

    addToWishlist: addItem,

    removeItem,

    removeFromWishlist: removeItem,

    clear,

    clearWishlist: clear,

    isInWishlist,

    addWishlistItemToCart,
  };
}