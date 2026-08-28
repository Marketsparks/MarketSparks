"use client";

import {
  Plus,
  Trash2,
} from "lucide-react";

import CloudinaryUploader from "@/components/shared/CloudinaryUploader";

import {
  getCloudinaryImageUrl,
} from "@/lib/cloudinary";

import type {
  ProductVariantInput,
  ProductVariantSizeInput,
} from "@/validation/product.validation";

type ProductVariantsProps = {
  value:
    ProductVariantInput[];

  categorySlug?: string;

  disabled?: boolean;

  onChange: (
    variants:
      ProductVariantInput[],
  ) => void;
};

const sizeOptions = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
] as const;

const variantTypeOptions = [
  {
    value: "COLOR",
    label: "Color",
    description:
      "Use for colors such as Black, White, or Silver.",
  },
  {
    value: "STORAGE",
    label: "Storage",
    description:
      "Use for capacities such as 128 GB, 256 GB, or 1 TB.",
  },
  {
    value: "MATERIAL",
    label: "Material",
    description:
      "Use for materials such as Leather, Steel, or Cotton.",
  },
  {
    value: "PACK_SIZE",
    label: "Pack Size",
    description:
      "Use for quantities such as Pack of 6 or Pack of 12.",
  },
  {
    value: "STYLE",
    label: "Style",
    description:
      "Use for distinct styles or configurations.",
  },
  {
    value: "OTHER",
    label: "Custom Option",
    description:
      "Use for another product specific option.",
  },
  {
    value: "DEFAULT",
    label: "Standard Option",
    description:
      "Use for a simple product option.",
  },
] as const;

type VariantType =
  (typeof variantTypeOptions)[number]["value"];

function isFashionCategory(
  categorySlug?: string,
) {
  if (!categorySlug) {
    return false;
  }

  const normalized =
    categorySlug
      .trim()
      .toLowerCase();

  return (
    normalized === "fashion" ||
    normalized === "clothing" ||
    normalized === "apparel" ||
    normalized.includes(
      "fashion",
    )
  );
}

function isFashionColorVariant(
  categorySlug:
    | string
    | undefined,
  type: VariantType,
) {
  return (
    isFashionCategory(
      categorySlug,
    ) &&
    type === "COLOR"
  );
}

function getVariantTypeOption(
  type: VariantType,
) {
  return (
    variantTypeOptions.find(
      (option) =>
        option.value === type,
    ) ??
    variantTypeOptions[
      variantTypeOptions.length -
        1
    ]
  );
}

function createEmptySize(
  size = "",
): ProductVariantSizeInput {
  return {
    size,

    sku: "",

    price: null,

    stock: 0,

    reservedStock: 0,

    incomingStock: 0,

    allowPreorder: false,
  };
}

function createFashionSizes() {
  return sizeOptions.map(
    (size) =>
      createEmptySize(
        size,
      ),
  );
}

function createGenericInventory() {
  return [
    createEmptySize(),
  ];
}

function createEmptyVariant(
  categorySlug?: string,
): ProductVariantInput {
  return {
    type:
      isFashionCategory(
        categorySlug,
      )
        ? "COLOR"
        : "DEFAULT",

    label: "",

    images: [],

    sizes:
      isFashionCategory(
        categorySlug,
      )
        ? createFashionSizes()
        : createGenericInventory(),
  };
}

function normalizeImages(
  images:
    | ProductVariantInput["images"]
    | undefined,
) {
  return (
    images ?? []
  ).map(
    (
      image,
      index,
    ) => ({
      ...image,

      sortOrder:
        index,

      isPrimary:
        index === 0,
    }),
  );
}

function normalizeSizes(
  sizes:
    ProductVariantSizeInput[],
) {
  return sizes.map(
    (
      size,
    ) => ({
      ...size,

      size:
        size.size ??
        "",

      sku:
        size.sku ??
        "",

      price:
        size.price ??
        null,

      stock:
        Math.max(
          0,
          size.stock ??
            0,
        ),

      reservedStock:
        Math.max(
          0,
          size.reservedStock ??
            0,
        ),

      incomingStock:
        Math.max(
          0,
          size.incomingStock ??
            0,
        ),

      allowPreorder:
        size.allowPreorder ??
        false,
    }),
  );
}

function getVariantValueLabel(
  type: VariantType,
) {
  switch (type) {
    case "COLOR":
      return "Color";

    case "STORAGE":
      return "Storage";

    case "MATERIAL":
      return "Material";

    case "PACK_SIZE":
      return "Pack Size";

    case "STYLE":
      return "Style";

    case "OTHER":
      return "Option";

    case "DEFAULT":
    default:
      return "Option";
  }
}

function getVariantValuePlaceholder(
  type: VariantType,
) {
  switch (type) {
    case "COLOR":
      return "Black";

    case "STORAGE":
      return "256 GB";

    case "MATERIAL":
      return "Leather";

    case "PACK_SIZE":
      return "Pack of 6";

    case "STYLE":
      return "Classic";

    case "OTHER":
      return "Option name";

    case "DEFAULT":
    default:
      return "Option name";
  }
}

export default function ProductVariants({
  value,
  categorySlug,
  disabled = false,
  onChange,
}: ProductVariantsProps) {
  const variants =
    value.map(
      (
        variant,
      ) => ({
        ...variant,

        images:
          variant.images ??
          [],

        sizes:
          variant.sizes ??
          [],
      }),
    );

  function updateVariant(
    variantIndex: number,
    changes:
      Partial<ProductVariantInput>,
  ) {
    onChange(
      variants.map(
        (
          variant,
          index,
        ) =>
          index ===
          variantIndex
            ? {
                ...variant,
                ...changes,
              }
            : variant,
      ),
    );
  }

  function addVariant() {
    onChange([
      ...variants,

      createEmptyVariant(
        categorySlug,
      ),
    ]);
  }

  function removeVariant(
    variantIndex: number,
  ) {
    onChange(
      variants.filter(
        (
          _,
          index,
        ) =>
          index !==
          variantIndex,
      ),
    );
  }

  function handleVariantTypeChange(
    variantIndex: number,
    type: VariantType,
  ) {
    const variant =
      variants[
        variantIndex
      ];

    if (!variant) {
      return;
    }

    const useFashionSizes =
      isFashionColorVariant(
        categorySlug,
        type,
      );

    updateVariant(
      variantIndex,
      {
        type,

        label: "",

        sizes:
          useFashionSizes
            ? createFashionSizes()
            : createGenericInventory(),
      },
    );
  }

  function updateVariantLabel(
    variantIndex: number,
    label: string,
  ) {
    updateVariant(
      variantIndex,
      {
        label,
      },
    );
  }

  function addVariantImage(
    variantIndex: number,
    imageKey:
      | string
      | null,
  ) {
    if (!imageKey) {
      return;
    }

    const variant =
      variants[
        variantIndex
      ];

    if (!variant) {
      return;
    }

    if (
      variant.images.length >=
      4
    ) {
      return;
    }

    updateVariant(
      variantIndex,
      {
        images:
          normalizeImages([
            ...variant.images,

            {
              imageKey,

              altText: "",

              sortOrder:
                variant.images
                  .length,

              isPrimary:
                variant.images
                  .length === 0,
            },
          ]),
      },
    );
  }

  function removeVariantImage(
    variantIndex: number,
    imageIndex: number,
  ) {
    const variant =
      variants[
        variantIndex
      ];

    if (!variant) {
      return;
    }

    updateVariant(
      variantIndex,
      {
        images:
          normalizeImages(
            variant.images.filter(
              (
                _,
                index,
              ) =>
                index !==
                imageIndex,
            ),
          ),
      },
    );
  }

  function updateImageAltText(
    variantIndex: number,
    imageIndex: number,
    altText: string,
  ) {
    const variant =
      variants[
        variantIndex
      ];

    if (!variant) {
      return;
    }

    updateVariant(
      variantIndex,
      {
        images:
          variant.images.map(
            (
              image,
              index,
            ) =>
              index ===
              imageIndex
                ? {
                    ...image,
                    altText,
                  }
                : image,
          ),
      },
    );
  }

  function updateSizeStock(
    variantIndex: number,
    sizeIndex: number,
    stock: number,
  ) {
    const variant =
      variants[
        variantIndex
      ];

    if (!variant) {
      return;
    }

    updateVariant(
      variantIndex,
      {
        sizes:
          normalizeSizes(
            variant.sizes.map(
              (
                size,
                index,
              ) =>
                index ===
                sizeIndex
                  ? {
                      ...size,

                      stock:
                        Math.max(
                          0,
                          stock,
                        ),
                    }
                  : size,
            ),
          ),
      },
    );
  }

  function updateGenericStock(
    variantIndex: number,
    stock: number,
  ) {
    const variant =
      variants[
        variantIndex
      ];

    if (!variant) {
      return;
    }

    const current =
      variant.sizes[0] ??
      createEmptySize();

    updateVariant(
      variantIndex,
      {
        sizes: [
          {
            ...current,

            size: "",

            stock:
              Math.max(
                0,
                stock,
              ),
          },
        ],
      },
    );
  }

  return (
    <section
      className="
        space-y-4
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
        <div className="min-w-0">
          <h3
            className="
              text-sm
              font-semibold
              text-[var(--admin-title)]
            "
          >
            Product Variants
          </h3>

          <p
            className="
              mt-0.5
              max-w-2xl
              text-[11px]
              leading-4
              text-[var(--admin-muted)]
            "
          >
            Add customer selectable
            options and define their
            inventory.
          </p>
        </div>

        <button
          type="button"
          disabled={
            disabled
          }
          onClick={
            addVariant
          }
          className="
            inline-flex
            h-8
            shrink-0
            items-center
            gap-1.5
            rounded-md
            bg-[#4F46E5]
            px-2.5
            text-[11px]
            font-medium
            text-white
            transition-colors
            hover:bg-[#4338CA]
            disabled:pointer-events-none
            disabled:opacity-60
          "
        >
          <Plus
            size={13}
          />

          Add Variant
        </button>
      </div>

      {variants.length ===
        0 && (
        <div
          className="
            rounded-lg
            border
            border-dashed
            border-[var(--admin-card-border)]
            px-4
            py-5
            text-center
          "
        >
          <p
            className="
              text-xs
              font-medium
              text-[var(--admin-title)]
            "
          >
            No variants added
          </p>

          <p
            className="
              mt-1
              text-[11px]
              leading-4
              text-[var(--admin-muted)]
            "
          >
            Add a variant only when
            customers need to choose an
            option.
          </p>
        </div>
      )}

      <div
        className="
          space-y-3
        "
      >
        {variants.map(
          (
            variant,
            variantIndex,
          ) => {
            const type =
              variant.type as VariantType;

            const typeOption =
              getVariantTypeOption(
                type,
              );

            const fashionColor =
              isFashionColorVariant(
                categorySlug,
                type,
              );

            const valueLabel =
              getVariantValueLabel(
                type,
              );

            return (
              <article
                key={
                  variant.id ??
                  `variant-${variantIndex}`
                }
                className="
                  rounded-lg
                  border
                  border-[var(--admin-card-border)]
                  bg-[var(--admin-card-bg)]
                  p-3
                  shadow-sm
                "
              >
                <div
                  className="
                    mb-3
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <div className="min-w-0">
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <span
                        className="
                          text-xs
                          font-semibold
                          text-[var(--admin-title)]
                        "
                      >
                        Variant{" "}
                        {variantIndex +
                          1}
                      </span>

                      <span
                        className="
                          rounded-full
                          bg-[var(--admin-input-bg)]
                          px-2
                          py-0.5
                          text-[10px]
                          font-medium
                          text-[var(--admin-muted)]
                        "
                      >
                        {
                          typeOption.label
                        }
                      </span>
                    </div>

                    <p
                      className="
                        mt-0.5
                        text-[10px]
                        leading-4
                        text-[var(--admin-muted)]
                      "
                    >
                      {
                        typeOption.description
                      }
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={
                      disabled
                    }
                    onClick={() =>
                      removeVariant(
                        variantIndex,
                      )
                    }
                    className="
                      inline-flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-md
                      border
                      border-[var(--admin-button-secondary-border)]
                      bg-[var(--admin-button-secondary-bg)]
                      text-[var(--user-danger)]
                      transition
                      hover:bg-[var(--admin-button-secondary-hover)]
                      disabled:pointer-events-none
                      disabled:opacity-50
                    "
                    aria-label={`Remove variant ${
                      variantIndex +
                      1
                    }`}
                  >
                    <Trash2
                      size={13}
                    />
                  </button>
                </div>

                <div
                  className="
                    grid
                    gap-2.5
                    sm:grid-cols-2
                  "
                >
                  <div>
                    <label
                      className="
                        mb-1
                        block
                        text-[10px]
                        font-medium
                        text-[var(--admin-title)]
                      "
                    >
                      Variant Type
                    </label>

                    <select
                      value={
                        type
                      }
                      disabled={
                        disabled
                      }
                      onChange={(
                        event,
                      ) =>
                        handleVariantTypeChange(
                          variantIndex,
                          event.target
                            .value as VariantType,
                        )
                      }
                      className="
                        h-8
                        w-full
                        rounded-md
                        border
                        border-[var(--admin-input-border)]
                        bg-[var(--admin-input-bg)]
                        px-2
                        text-xs
                        text-[var(--admin-input-text)]
                        outline-none
                        focus:border-[#6366F1]
                        focus:ring-2
                        focus:ring-[#6366F1]/15
                      "
                    >
                      {variantTypeOptions.map(
                        (
                          option,
                        ) => (
                          <option
                            key={
                              option.value
                            }
                            value={
                              option.value
                            }
                          >
                            {
                              option.label
                            }
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  <div>
                    <label
                      className="
                        mb-1
                        block
                        text-[10px]
                        font-medium
                        text-[var(--admin-title)]
                      "
                    >
                      {
                        valueLabel
                      }
                    </label>

                    <input
                      type="text"
                      value={
                        variant.label ??
                        ""
                      }
                      disabled={
                        disabled
                      }
                      placeholder={
                        getVariantValuePlaceholder(
                          type,
                        )
                      }
                      onChange={(
                        event,
                      ) =>
                        updateVariantLabel(
                          variantIndex,
                          event.target.value,
                        )
                      }
                      className="
                        h-8
                        w-full
                        rounded-md
                        border
                        border-[var(--admin-input-border)]
                        bg-[var(--admin-input-bg)]
                        px-2.5
                        text-xs
                        text-[var(--admin-input-text)]
                        outline-none
                        placeholder:text-[var(--admin-muted)]
                        focus:border-[#6366F1]
                        focus:ring-2
                        focus:ring-[#6366F1]/15
                      "
                    />
                  </div>
                </div>

                <div
                  className="
                    mt-3
                    rounded-md
                    border
                    border-[var(--admin-card-border)]
                    bg-[var(--admin-input-bg)]
                    p-2.5
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-2
                    "
                  >
                    <div>
                      <p
                        className="
                          text-[10px]
                          font-semibold
                          text-[var(--admin-title)]
                        "
                      >
                        Variant Images
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-[9px]
                          text-[var(--admin-muted)]
                        "
                      >
                        Up to 4 images for
                        this variant.
                      </p>
                    </div>

                    <span
                      className="
                        text-[9px]
                        font-medium
                        text-[var(--admin-muted)]
                      "
                    >
                      {
                        variant.images.length
                      }
                      /4
                    </span>
                  </div>

                  {variant.images.length <
                    4 && (
                    <div className="mt-2">
                      <CloudinaryUploader
                        value={
                          null
                        }
                        folder="products/variants"
                        disabled={
                          disabled
                        }
                        onChange={(
                          imageKey,
                        ) =>
                          addVariantImage(
                            variantIndex,
                            imageKey,
                          )
                        }
                      />
                    </div>
                  )}

                  {variant.images.length >
                    0 && (
                    <div
                      className="
                        mt-2
                        grid
                        grid-cols-4
                        gap-2
                      "
                    >
                      {variant.images.map(
                        (
                          image,
                          imageIndex,
                        ) => {
                          const previewUrl =
                            getCloudinaryImageUrl(
                              image.imageKey,
                              "c_fill,w_240,h_240,f_auto,q_auto",
                            );

                          return (
                            <div
                              key={
                                image.id ??
                                `${variantIndex}-${imageIndex}-${image.imageKey}`
                              }
                              className="
                                overflow-hidden
                                rounded-md
                                border
                                border-[var(--admin-card-border)]
                                bg-[var(--admin-card-bg)]
                              "
                            >
                              <div
                                className="
                                  relative
                                  aspect-square
                                "
                              >
                                <img
                                  src={
                                    previewUrl ??
                                    "/assets/images/placeholder-product.jpg"
                                  }
                                  alt={
                                    image.altText ??
                                    `Variant image ${
                                      imageIndex +
                                      1
                                    }`
                                  }
                                  className="
                                    h-full
                                    w-full
                                    object-cover
                                  "
                                />

                                {imageIndex ===
                                  0 && (
                                  <span
                                    className="
                                      absolute
                                      left-1
                                      top-1
                                      rounded
                                      bg-black/65
                                      px-1.5
                                      py-0.5
                                      text-[8px]
                                      font-medium
                                      text-white
                                    "
                                  >
                                    Primary
                                  </span>
                                )}

                                <button
                                  type="button"
                                  disabled={
                                    disabled
                                  }
                                  onClick={() =>
                                    removeVariantImage(
                                      variantIndex,
                                      imageIndex,
                                    )
                                  }
                                  className="
                                    absolute
                                    right-1
                                    top-1
                                    inline-flex
                                    h-5
                                    w-5
                                    items-center
                                    justify-center
                                    rounded
                                    bg-black/65
                                    text-white
                                    hover:bg-black/80
                                    disabled:pointer-events-none
                                    disabled:opacity-50
                                  "
                                  aria-label="Remove variant image"
                                >
                                  <Trash2
                                    size={
                                      10
                                    }
                                  />
                                </button>
                              </div>

                              <input
                                type="text"
                                value={
                                  image.altText ??
                                  ""
                                }
                                disabled={
                                  disabled
                                }
                                placeholder="Alt text"
                                onChange={(
                                  event,
                                ) =>
                                  updateImageAltText(
                                    variantIndex,
                                    imageIndex,
                                    event.target
                                      .value,
                                  )
                                }
                                className="
                                  h-6
                                  w-full
                                  border-0
                                  border-t
                                  border-[var(--admin-card-border)]
                                  bg-transparent
                                  px-1.5
                                  text-[9px]
                                  text-[var(--admin-input-text)]
                                  outline-none
                                "
                              />
                            </div>
                          );
                        },
                      )}
                    </div>
                  )}
                </div>

                {fashionColor ? (
                  <div className="mt-3">
                    <div
                      className="
                        mb-2
                      "
                    >
                      <p
                        className="
                          text-[10px]
                          font-semibold
                          text-[var(--admin-title)]
                        "
                      >
                        Size Stock
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-[9px]
                          text-[var(--admin-muted)]
                        "
                      >
                        Set available stock for
                        each size in this color.
                      </p>
                    </div>

                    <div
                      className="
                        grid
                        grid-cols-3
                        gap-2
                        sm:grid-cols-6
                      "
                    >
                      {variant.sizes.map(
                        (
                          size,
                          sizeIndex,
                        ) => (
                          <div
                            key={
                              size.id ??
                              `${variantIndex}-${sizeIndex}`
                            }
                            className="
                              rounded-md
                              border
                              border-[var(--admin-card-border)]
                              bg-[var(--admin-card-bg)]
                              p-2
                            "
                          >
                            <div
                              className="
                                mb-1.5
                                flex
                                items-center
                                justify-between
                                gap-1
                              "
                            >
                              <span
                                className="
                                  text-[10px]
                                  font-semibold
                                  text-[var(--admin-title)]
                                "
                              >
                                {
                                  size.size
                                }
                              </span>

                              <span
                                className="
                                  text-[8px]
                                  text-[var(--admin-muted)]
                                "
                              >
                                stock
                              </span>
                            </div>

                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={
                                size.stock ??
                                0
                              }
                              disabled={
                                disabled
                              }
                              onChange={(
                                event,
                              ) =>
                                updateSizeStock(
                                  variantIndex,
                                  sizeIndex,
                                  Number(
                                    event.target
                                      .value,
                                  ) || 0,
                                )
                              }
                              className="
                                h-7
                                w-full
                                rounded-md
                                border
                                border-[var(--admin-input-border)]
                                bg-[var(--admin-input-bg)]
                                px-2
                                text-[11px]
                                font-medium
                                text-[var(--admin-input-text)]
                                outline-none
                                focus:border-[#6366F1]
                                focus:ring-2
                                focus:ring-[#6366F1]/15
                              "
                            />
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    className="
                      mt-3
                      rounded-md
                      border
                      border-[var(--admin-card-border)]
                      bg-[var(--admin-card-bg)]
                      p-2.5
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-2
                      "
                    >
                      <div>
                        <p
                          className="
                            text-[10px]
                            font-semibold
                            text-[var(--admin-title)]
                          "
                        >
                          Stock
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-[9px]
                            text-[var(--admin-muted)]
                          "
                        >
                          Available units for{" "}
                          {variant.label ||
                            "this option"}.
                        </p>
                      </div>

                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={
                          variant.sizes[0]
                            ?.stock ??
                          0
                        }
                        disabled={
                          disabled
                        }
                        onChange={(
                          event,
                        ) =>
                          updateGenericStock(
                            variantIndex,
                            Number(
                              event.target
                                .value,
                            ) || 0,
                          )
                        }
                        className="
                          h-8
                          w-24
                          rounded-md
                          border
                          border-[var(--admin-input-border)]
                          bg-[var(--admin-input-bg)]
                          px-2
                          text-xs
                          font-medium
                          text-[var(--admin-input-text)]
                          outline-none
                          focus:border-[#6366F1]
                          focus:ring-2
                          focus:ring-[#6366F1]/15
                        "
                      />
                    </div>
                  </div>
                )}
              </article>
            );
          },
        )}
      </div>
    </section>
  );
}