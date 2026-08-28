"use client";

import { useState } from "react";

import {
  Star,
} from "lucide-react";

type ProductReviewFormProps = {
  onSubmit?: (
    review: {
      rating: number;

      comment: string;
    }
  ) => void;
};

export default function ProductReviewForm({
  onSubmit,
}: ProductReviewFormProps) {
  const [rating, setRating] =
    useState(0);

  const [hoveredRating, setHoveredRating] =
    useState(0);

  const [comment, setComment] =
    useState("");

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      rating === 0 ||
      comment.trim() === ""
    ) {
      return;
    }

    onSubmit?.({
      rating,
      comment,
    });

    setRating(0);

    setComment("");
  }

  return (
    <section
      className="
        mt-6

        rounded-2xl

        border

        border-[var(--border)]

        bg-[var(--surface)]

        p-5

        transition-colors
        duration-300

        lg:p-6
      "
    >
      <h2
        className="
          text-[18px]

          font-bold

          tracking-[-0.02em]

          text-[var(--foreground)]
        "
      >
        Write a Review
      </h2>

      <p
        className="
          mt-1.5

          text-[14px]

          text-[var(--foreground-muted)]
        "
      >
        Share your experience to help other shoppers.
      </p>

      <form
        onSubmit={handleSubmit}
        className="
          mt-6

          space-y-5
        "
      >
        {/* Rating */}

        <div>
          <label
            className="
              mb-2

              block

              text-[14px]

              font-semibold

              text-[var(--foreground)]
            "
          >
            Your Rating
          </label>

          <div
            className="
              flex

              gap-1.5
            "
          >
            {Array.from({
              length: 5,
            }).map((_, index) => {
              const value =
                index + 1;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setRating(value)
                  }
                  onMouseEnter={() =>
                    setHoveredRating(
                      value
                    )
                  }
                  onMouseLeave={() =>
                    setHoveredRating(0)
                  }
                  className="
                    transition-transform
                    duration-200

                    hover:scale-110
                  "
                >
                  <Star
                    size={22}
                    strokeWidth={2}
                    fill={
                      value <=
                      (hoveredRating ||
                        rating)
                        ? "currentColor"
                        : "none"
                    }
                    className={
                      value <=
                      (hoveredRating ||
                        rating)
                        ? "text-yellow-400"
                        : "text-yellow-300"
                    }
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Review */}

        <div>
          <label
            htmlFor="review"
            className="
              mb-2

              block

              text-[14px]

              font-semibold

              text-[var(--foreground)]
            "
          >
            Your Review
          </label>

          <textarea
            id="review"
            rows={4}
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
            placeholder="Tell others what you liked or disliked about this product..."
            className="
              w-full

              rounded-xl

              border

              border-[var(--border)]

              bg-[var(--background)]

              px-4

              py-3

              text-[14px]

              leading-6

              text-[var(--foreground)]

              outline-none

              transition-all
              duration-300

              placeholder:text-[var(--foreground-muted)]

              focus:border-[var(--primary)]

              focus:ring-2

              focus:ring-[var(--primary)]/20
            "
          />
        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={
            rating === 0 ||
            comment.trim() === ""
          }
          className="
            flex

            h-11

            items-center

            justify-center

            rounded-lg

            border

            border-[var(--services-cta-primary-bg)]

            bg-[var(--services-cta-primary-bg)]

            px-6

            text-[14px]

            font-semibold

            text-[var(--services-cta-primary-text)]

            shadow-md

            transition-all
            duration-300

            enabled:hover:scale-[1.02]

            enabled:hover:opacity-90

            enabled:hover:shadow-lg

            disabled:cursor-not-allowed

            disabled:opacity-50
          "
        >
          Submit Review
        </button>
      </form>
    </section>
  );
}