"use client";

import { useState } from "react";

import ProductDescription from "./ProductDescription";
import ProductReviews from "./ProductReviews";
import ProductReviewForm from "./ProductReviewForm";

import type {
  ProductReview,
} from "@/lib/products/product.types";

type ProductTabsProps = {
  description: string;

  reviews: ProductReview[];
};

export default function ProductTabs({
  description,
  reviews,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] =
    useState<
      "description" | "reviews"
    >("description");

  const activeButtonClasses = `
    border
    border-[var(--services-cta-primary-bg)]
    bg-[var(--services-cta-primary-bg)]
    text-[var(--services-cta-primary-text)]
    shadow-sm
  `;

  const inactiveButtonClasses = `
    border
    border-[var(--border)]
    bg-[var(--surface)]
    text-[var(--foreground)]
    hover:border-[var(--primary)]
    hover:bg-[var(--surface-card)]
    hover:text-[var(--primary)]
  `;

  return (
    <section
      className="
        mt-12
      "
    >
      <div
        className="
          flex
          flex-wrap
          gap-2.5
          border-b
          border-[var(--border)]
          pb-3
        "
      >
        <button
          type="button"
          onClick={() =>
            setActiveTab(
              "description",
            )
          }
          className={`
            rounded-lg
            px-4
            py-2
            text-[14px]
            font-semibold
            transition-all
            duration-300
            ${
              activeTab ===
              "description"
                ? activeButtonClasses
                : inactiveButtonClasses
            }
          `}
        >
          Description
        </button>

        <button
          type="button"
          onClick={() =>
            setActiveTab("reviews")
          }
          className={`
            rounded-lg
            px-4
            py-2
            text-[14px]
            font-semibold
            transition-all
            duration-300
            ${
              activeTab === "reviews"
                ? activeButtonClasses
                : inactiveButtonClasses
            }
          `}
        >
          Reviews ({reviews.length})
        </button>
      </div>

      <div
        className="
          mt-6
        "
      >
        {activeTab ===
        "description" ? (
          <ProductDescription
            description={description}
          />
        ) : (
          <>
            <ProductReviews
              reviews={reviews}
            />

            <ProductReviewForm />
          </>
        )}
      </div>
    </section>
  );
}