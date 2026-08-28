"use client";

import { useFieldArray, useFormContext } from "react-hook-form";

import type {
  CreateProductInput,
} from "@/validation/product.validation";

type ProductReviewsProps = {
  disabled?: boolean;
};

export default function ProductReviews({
  disabled,
}: ProductReviewsProps) {
  const {
    control,
    register,
    formState: { errors },
  } =
    useFormContext<CreateProductInput>();

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "reviews",
  });

  return (
    <section
      className="
        rounded-[var(--admin-surface-radius)]
        border
        border-[var(--admin-card-border)]
        bg-[var(--admin-card-bg)]
        p-6
      "
    >
      <div
        className="
          mb-6
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h3
            className="
              text-lg
              font-semibold
              text-[var(--admin-title)]
            "
          >
            Customer Reviews
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-[var(--admin-muted)]
            "
          >
            Add as many reviews as you want.
          </p>
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            append({
              customerName: "",
              rating: 5,
              title: "",
              comment: "",
              verifiedPurchase: false,
              sortOrder: fields.length,
            })
          }
          className="
            rounded-[var(--admin-input-radius)]
            bg-[#4F46E5]
            px-4
            py-2
            text-sm
            font-medium
            text-white
            hover:bg-[#4338CA]
            disabled:opacity-60
          "
        >
          Add Review
        </button>
      </div>

      {fields.length === 0 && (
        <div
          className="
            rounded-lg
            border
            border-dashed
            border-[var(--admin-card-border)]
            p-8
            text-center
            text-sm
            text-[var(--admin-muted)]
          "
        >
          No reviews added yet.
        </div>
      )}

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="
              rounded-xl
              border
              border-[var(--admin-card-border)]
              p-5
            "
          >
            <div
              className="
                mb-5
                flex
                items-center
                justify-between
              "
            >
              <h4
                className="
                  font-medium
                  text-[var(--admin-title)]
                "
              >
                Review {index + 1}
              </h4>

              <button
                type="button"
                disabled={disabled}
                onClick={() => remove(index)}
                className="
                  text-sm
                  font-medium
                  text-[var(--user-danger)]
                "
              >
                Remove
              </button>
            </div>

            <div
              className="
                grid
                gap-5
                md:grid-cols-2
              "
            >
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Customer Name
                </label>

                <input
                  {...register(
                    `reviews.${index}.customerName`
                  )}
                  className="
                    h-11
                    w-full
                    rounded-[var(--admin-input-radius)]
                    border
                    border-[var(--admin-input-border)]
                    bg-[var(--admin-input-bg)]
                    px-4
                  "
                />

                <p className="text-xs text-[var(--user-danger)]">
                  {
                    errors.reviews?.[index]
                      ?.customerName?.message
                  }
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Rating
                </label>

                <input
                  type="number"
                  min={1}
                  max={5}
                  {...register(
                    `reviews.${index}.rating`,
                    {
                      valueAsNumber: true,
                    }
                  )}
                  className="
                    h-11
                    w-full
                    rounded-[var(--admin-input-radius)]
                    border
                    border-[var(--admin-input-border)]
                    bg-[var(--admin-input-bg)]
                    px-4
                  "
                />

                <p className="text-xs text-[var(--user-danger)]">
                  {
                    errors.reviews?.[index]
                      ?.rating?.message
                  }
                </p>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">
                  Review Title
                </label>

                <input
                  {...register(
                    `reviews.${index}.title`
                  )}
                  className="
                    h-11
                    w-full
                    rounded-[var(--admin-input-radius)]
                    border
                    border-[var(--admin-input-border)]
                    bg-[var(--admin-input-bg)]
                    px-4
                  "
                />

                <p className="text-xs text-[var(--user-danger)]">
                  {
                    errors.reviews?.[index]
                      ?.title?.message
                  }
                </p>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">
                  Comment
                </label>

                <textarea
                  rows={5}
                  {...register(
                    `reviews.${index}.comment`
                  )}
                  className="
                    w-full
                    rounded-[var(--admin-input-radius)]
                    border
                    border-[var(--admin-input-border)]
                    bg-[var(--admin-input-bg)]
                    px-4
                    py-3
                  "
                />

                <p className="text-xs text-[var(--user-danger)]">
                  {
                    errors.reviews?.[index]
                      ?.comment?.message
                  }
                </p>
              </div>

              <div className="md:col-span-2">
                <label
                  className="
                    inline-flex
                    items-center
                    gap-3
                    text-sm
                  "
                >
                  <input
                    type="checkbox"
                    {...register(
                      `reviews.${index}.verifiedPurchase`
                    )}
                  />

                  Verified Purchase
                </label>
              </div>

              <input
                type="hidden"
                {...register(
                  `reviews.${index}.sortOrder`,
                  {
                    valueAsNumber: true,
                  }
                )}
                value={index}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}