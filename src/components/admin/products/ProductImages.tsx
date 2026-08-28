"use client";

import {
  GripVertical,
  Star,
  Trash2,
} from "lucide-react";

import CloudinaryUploader from "@/components/shared/CloudinaryUploader";

import type {
  ProductImageInput,
} from "@/validation/product.validation";

type ProductImagesProps = {
  value: ProductImageInput[];

  disabled?: boolean;

  onChange: (
    images: ProductImageInput[],
  ) => void;
};

const createImage = (
  imageKey: string,
): ProductImageInput => ({
  imageKey,
  altText: "",
  isPrimary: false,
  sortOrder: 0,
});

export default function ProductImages({
  value,
  disabled = false,
  onChange,
}: ProductImagesProps) {
  function normalize(
    images: ProductImageInput[],
  ): ProductImageInput[] {
    return images.map(
      (image, index) => ({
        ...image,
        sortOrder: index,
      }),
    );
  }

  function addImage(
    imageKey: string | null,
  ) {
    if (!imageKey) {
      return;
    }

    const next = normalize([
      ...value,
      {
        ...createImage(imageKey),
        isPrimary:
          value.length === 0,
      },
    ]);

    onChange(next);
  }

  function removeImage(
    index: number,
  ) {
    const next = value.filter(
      (_, current) =>
        current !== index,
    );

    if (
      next.length > 0 &&
      !next.some(
        (image) =>
          image.isPrimary === true,
      )
    ) {
      next[0] = {
        ...next[0],
        isPrimary: true,
      };
    }

    onChange(normalize(next));
  }

  function setPrimary(
    index: number,
  ) {
    onChange(
      normalize(
        value.map(
          (image, current) => ({
            ...image,
            isPrimary:
              current === index,
          }),
        ),
      ),
    );
  }

  function move(
    from: number,
    to: number,
  ) {
    if (
      to < 0 ||
      to >= value.length
    ) {
      return;
    }

    const next = [...value];

    const [item] =
      next.splice(from, 1);

    if (!item) {
      return;
    }

    next.splice(to, 0, item);

    onChange(
      normalize(next),
    );
  }

  function updateAlt(
    index: number,
    altText: string,
  ) {
    const next = [...value];

    const image = next[index];

    if (!image) {
      return;
    }

    next[index] = {
      ...image,
      altText,
    };

    onChange(next);
  }

  return (
    <section
      className="
        space-y-[var(--space-lg)]
      "
    >
      <div>
        <h3
          className="
            text-sm
            font-semibold
            text-[var(--admin-title)]
          "
        >
          Product Images
        </h3>

        <p
          className="
            mt-1
            text-xs
            text-[var(--admin-muted)]
          "
        >
          Upload one or more images.
          Select one as the primary
          product image.
        </p>
      </div>

      <CloudinaryUploader
        value={null}
        folder="products"
        disabled={disabled}
        onChange={addImage}
      />

      {value.length === 0 && (
        <div
          className="
            rounded-[var(--admin-surface-radius)]
            border
            border-dashed
            border-[var(--admin-card-border)]
            p-6
            text-center
            text-sm
            text-[var(--admin-muted)]
          "
        >
          No images uploaded yet.
        </div>
      )}

      {value.length > 0 && (
        <div
          className="
            space-y-[var(--space-md)]
          "
        >
          {value.map(
            (
              image,
              index,
            ) => (
              <div
                key={`${image.imageKey}-${index}`}
                className="
                  flex
                  flex-col
                  gap-[var(--space-md)]
                  rounded-[var(--admin-surface-radius)]
                  border
                  border-[var(--admin-card-border)]
                  bg-[var(--admin-card-bg)]
                  p-[var(--space-md)]
                  md:flex-row
                  md:items-center
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-[var(--space-sm)]
                  "
                >
                  <GripVertical
                    size={16}
                    className="
                      text-[var(--admin-muted)]
                    "
                  />

                  <img
                    src={`/api/image/${image.imageKey}`}
                    alt=""
                    className="
                      h-16
                      w-16
                      rounded-[var(--radius-md)]
                      border
                      border-[var(--admin-card-border)]
                      object-cover
                    "
                  />
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    value={
                      image.altText ??
                      ""
                    }
                    disabled={disabled}
                    placeholder="Alt text"
                    onChange={(
                      event,
                    ) =>
                      updateAlt(
                        index,
                        event.target.value,
                      )
                    }
                    className="
                      h-10
                      w-full
                      rounded-[var(--admin-input-radius)]
                      border
                      border-[var(--admin-input-border)]
                      bg-[var(--admin-input-bg)]
                      px-3
                      text-sm
                    "
                  />
                </div>

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                  "
                >
                  <button
                    type="button"
                    disabled={
                      disabled ||
                      index === 0
                    }
                    onClick={() =>
                      move(
                        index,
                        index - 1,
                      )
                    }
                    className="
                      rounded
                      border
                      px-3
                      py-2
                      text-xs
                      disabled:pointer-events-none
                      disabled:opacity-50
                    "
                    aria-label="Move image up"
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    disabled={
                      disabled ||
                      index ===
                        value.length -
                          1
                    }
                    onClick={() =>
                      move(
                        index,
                        index + 1,
                      )
                    }
                    className="
                      rounded
                      border
                      px-3
                      py-2
                      text-xs
                      disabled:pointer-events-none
                      disabled:opacity-50
                    "
                    aria-label="Move image down"
                  >
                    ↓
                  </button>

                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                      setPrimary(index)
                    }
                    className={`
                      inline-flex
                      items-center
                      gap-1
                      rounded
                      px-3
                      py-2
                      text-xs
                      ${
                        image.isPrimary
                          ? "bg-[var(--admin-plan-active-bg)] text-[var(--admin-status-success-text)]"
                          : "border bg-[var(--admin-button-secondary-bg)]"
                      }
                    `}
                  >
                    <Star
                      size={14}
                      fill={
                        image.isPrimary
                          ? "currentColor"
                          : "none"
                      }
                    />

                    Primary
                  </button>

                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                      removeImage(index)
                    }
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded
                      bg-[var(--admin-button-danger-bg)]
                      p-2
                      text-[var(--admin-button-danger-text)]
                    "
                    aria-label="Remove image"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </section>
  );
}