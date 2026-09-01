"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useAuth,
} from "@/context/AuthContext";

import type {
  ProductCard,
} from "@/lib/products";

type AppSearchResultsProps = {
  loading: boolean;

  query: string;

  results: ProductCard[];

  onSelect: () => void;
};

export default function AppSearchResults({
  loading,
  query,
  results,
  onSelect,
}: AppSearchResultsProps) {
  const {
    user,
  } = useAuth();

  if (loading) {
    return (
      <div
        className="
          py-12
          text-center
          text-sm
          text-[var(--foreground-muted)]
        "
      >
        Searching...
      </div>
    );
  }

  if (!query.trim()) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div
        className="
          py-12
          text-center
        "
      >
        <p
          className="
            text-[15px]
            font-medium
            text-[var(--foreground)]
          "
        >
          No products found.
        </p>

        <p
          className="
            mt-2
            text-sm
            text-[var(--foreground-muted)]
          "
        >
          Try a different keyword.
        </p>
      </div>
    );
  }

  return (
    <div>
      {results.map(
        (
          product,
          index,
        ) => {
          const image =
            product.images.find(
              (
                image,
              ) =>
                image.isPrimary,
            ) ??
            product.images[0];

          const href = user
            ? `/Market-Place/${product.slug}`
            : `/Product/${product.slug}`;

          return (
            <Link
              key={
                product.id
              }
              href={href}
              onClick={
                onSelect
              }
              className="
                relative
                flex
                items-center
                gap-3
                py-3
                transition-opacity
                duration-200
                hover:opacity-80
              "
            >
              <div
                className="
                  relative
                  h-14
                  w-14
                  flex-shrink-0
                  overflow-hidden
                  rounded-xl
                  bg-[var(--surface-card)]
                "
              >
                {image && (
                  <Image
                    src={
                      image.imageUrl ??
                      ""
                    }
                    alt={
                      image.altText ??
                      product.name
                    }
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                )}
              </div>

              <div
                className="
                  min-w-0
                  flex-1
                "
              >
                <h3
                  className="
                    truncate
                    text-[15px]
                    font-semibold
                    text-[var(--foreground)]
                  "
                >
                  {product.name}
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    font-medium
                    text-[var(--primary)]
                  "
                >
                  $
                  {product.price.toFixed(
                    2,
                  )}
                </p>
              </div>

              {index !==
                results.length -
                  1 && (
                <div
                  className="
                    absolute
                    bottom-0
                    left-[72px]
                    right-0
                    h-px
                    bg-[var(--border)]
                  "
                />
              )}
            </Link>
          );
        },
      )}
    </div>
  );
}