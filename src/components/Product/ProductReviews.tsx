"use client";

import {
  BadgeCheck,
  Star,
} from "lucide-react";

import type {
  ProductReview,
} from "@/lib/products/product.types";

type ProductReviewsProps = {
  reviews: ProductReview[];
};

export default function ProductReviews({
  reviews,
}: ProductReviewsProps) {
  if (reviews.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--surface)]
          p-6
          text-center
        "
      >
        <h3
          className="
            text-[18px]
            font-bold
            text-[var(--foreground)]
          "
        >
          No Reviews Yet
        </h3>

        <p
          className="
            mt-2
            text-[14px]
            text-[var(--foreground-muted)]
          "
        >
          Be the first person to review this product.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        space-y-4
      "
    >
      {reviews.map((review) => (
        <article
          key={review.id}
          className="
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--surface)]
            p-5
            transition-colors
            duration-300
          "
        >
          <div
            className="
              flex
              items-start
              justify-between
              gap-3
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]/10
                  text-[15px]
                  font-bold
                  uppercase
                  text-[var(--primary)]
                "
              >
                {review.customerName
                  .charAt(0)}
              </div>

              <div>
                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                  "
                >
                  <h3
                    className="
                      text-[15px]
                      font-semibold
                      text-[var(--foreground)]
                    "
                  >
                    {
                      review.customerName
                    }
                  </h3>

                  {review.verifiedPurchase && (
                    <span
                      className="
                        flex
                        items-center
                        gap-1
                        rounded-full
                        bg-emerald-500/10
                        px-2
                        py-0.5
                        text-[10px]
                        font-semibold
                        text-emerald-500
                      "
                    >
                      <BadgeCheck
                        size={11}
                      />

                      Verified Purchase
                    </span>
                  )}
                </div>

                <p
                  className="
                    mt-0.5
                    text-[12px]
                    text-[var(--foreground-muted)]
                  "
                >
                  {review.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>

            <div
              className="
                flex
                items-center
                gap-0.5
              "
              aria-label={`${review.rating} out of 5 stars`}
            >
              {Array.from({
                length: 5,
              }).map((_, index) => (
                <Star
                  key={index}
                  size={14}
                  strokeWidth={2}
                  fill={
                    index < review.rating
                      ? "currentColor"
                      : "none"
                  }
                  className={
                    index < review.rating
                      ? "text-yellow-400"
                      : "text-yellow-300"
                  }
                />
              ))}
            </div>
          </div>

          {review.title && (
            <h4
              className="
                mt-4
                text-[15px]
                font-semibold
                text-[var(--foreground)]
              "
            >
              {review.title}
            </h4>
          )}

          <p
            className="
              mt-2
              text-[14px]
              leading-7
              text-[var(--foreground-muted)]
            "
          >
            {review.comment}
          </p>
        </article>
      ))}
    </div>
  );
}