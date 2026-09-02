"use client";

import {
  useEffect,
  useRef,
} from "react";

import { toast } from "sonner";

import {
  FormProvider,
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  PRODUCT_STATUSES,
} from "@/constants/product-status";

import {
  createProductSchema,
  type CreateProductInput,
  type CreateProductSchema,
} from "@/validation/product.validation";

import type {
  ProductCategory,
} from "@/types/category.types";

import ProductImages from "./ProductImages";
import ProductVariants from "./ProductVariants";
import ProductSpecifications from "./ProductSpecifications";
import ProductReviews from "./ProductReviews";
import CategoryMultiSelect from "@/components/ui/CategoryMultiSelect";

type FormValues =
  CreateProductInput;

type ProductFormProps = {
  categories:
    ProductCategory[];

  initialValues?:
    Partial<FormValues>;

  loading?: boolean;

  submitLabel?: string;

  onSubmit: (
    values: FormValues,
  ) =>
    | Promise<void>
    | void;
};

function slugify(
  value: string,
) {
  return value
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9\s-]/g,
      "",
    )
    .replace(
      /\s+/g,
      "-",
    )
    .replace(
      /-+/g,
      "-",
    );
}

export default function ProductForm({
  categories,
  initialValues,
  loading = false,
  submitLabel =
    "Save Product",
  onSubmit,
}: ProductFormProps) {
  const methods =
    useForm<
      CreateProductInput,
      any,
      CreateProductSchema
    >({
      resolver:
        zodResolver(
          createProductSchema,
        ),

      defaultValues: {
        name: "",

        slug: "",

        description: "",

        sku: "",

        price: 0,

        compareAtPrice:
          null,

        initialRating: 0,

        featured: false,

        status: "ACTIVE",

        metaTitle: "",

        metaDescription:
          "",

        categoryIds: [],

        images: [],

        variants: [],

        specifications: [],

        reviews: [],
      },
    });

  const {
    register,

    handleSubmit,

    watch,

    setValue,

    reset,

    formState: {
      errors,
    },
  } = methods;

  const slugEditedRef =
    useRef(false);

  const name =
    watch("name");

  const slug =
    watch("slug");

const categoryIds =
  watch("categoryIds") ?? [];

useEffect(() => {
  register("categoryIds");
}, [
  register,
]);

const selectedCategory =
  categories.find((category) =>
    categoryIds.includes(category.id),
  );

  const selectedCategorySlug =
    selectedCategory?.slug ??
    "";

  useEffect(() => {
    if (!slug) {
      slugEditedRef.current =
        false;
    }

    if (
      slugEditedRef.current
    ) {
      return;
    }

    setValue(
      "slug",
      slugify(
        name ?? "",
      ),
      {
        shouldDirty:
          true,

        shouldValidate:
          true,
      },
    );
  }, [
    name,
    slug,
    setValue,
  ]);

  useEffect(() => {
    if (!initialValues) {
      return;
    }

    reset({
      name:
        initialValues.name ??
        "",

      slug:
        initialValues.slug ??
        "",

      description:
        initialValues.description ??
        "",

      sku:
        initialValues.sku ??
        "",

      price:
        initialValues.price ??
        0,

      compareAtPrice:
        initialValues.compareAtPrice ??
        null,

initialRating:
  initialValues.initialRating ??
  0,

      featured:
        initialValues.featured ??
        false,

      status:
        initialValues.status ??
        "ACTIVE",

      metaTitle:
        initialValues.metaTitle ??
        "",

      metaDescription:
        initialValues.metaDescription ??
        "",

categoryIds:
  initialValues.categoryIds ??
  [],

      images:
        initialValues.images ??
        [],

      variants:
        initialValues.variants ??
        [],

      specifications:
        initialValues.specifications ??
        [],

      reviews:
        initialValues.reviews ??
        [],
    });
  }, [
    initialValues,
    reset,
  ]);

  return (
    <FormProvider
      {...methods}
    >
      <form
        onSubmit={handleSubmit(
          onSubmit,
          (
            submitErrors,
          ) => {
            const firstError =
              Object.values(
                submitErrors,
              )[0];

            const message =
              firstError?.message;

            toast.error(
              typeof message ===
                "string"
                ? message
                : "Please fix the highlighted fields before submitting.",
            );
          },
        )}
        className="
          flex
          flex-col
          gap-[var(--space-xl)]
        "
      >
        <section
          className="
            grid
            gap-[var(--space-lg)]
            lg:grid-cols-2
          "
        >
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="
                text-sm
                font-medium
                text-[var(--admin-title)]
              "
            >
              Product Name
            </label>

            <input
              id="name"
              placeholder="Premium Hoodie"
              {...register(
                "name",
              )}
              className="
                h-11
                w-full
                rounded-[var(--admin-input-radius)]
                border
                border-[var(--admin-input-border)]
                bg-[var(--admin-input-bg)]
                px-4
                text-sm
                text-[var(--admin-input-text)]
                outline-none
                transition
                focus:border-[var(--admin-input-focus)]
              "
            />

            {errors.name && (
              <p
                className="
                  text-xs
                  text-[var(--user-danger)]
                "
              >
                {
                  errors.name
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="slug"
              className="
                text-sm
                font-medium
                text-[var(--admin-title)]
              "
            >
              Slug
            </label>

            <input
              id="slug"
              placeholder="premium-hoodie"
              {...register(
                "slug",
                {
                  onChange:
                    (
                      event,
                    ) => {
                      slugEditedRef.current =
                        event.target.value.trim() !==
                        "";
                    },
                },
              )}
              className="
                h-11
                w-full
                rounded-[var(--admin-input-radius)]
                border
                border-[var(--admin-input-border)]
                bg-[var(--admin-input-bg)]
                px-4
                text-sm
                text-[var(--admin-input-text)]
                outline-none
                transition
                focus:border-[var(--admin-input-focus)]
              "
            />

            {errors.slug && (
              <p
                className="
                  text-xs
                  text-[var(--user-danger)]
                "
              >
                {
                  errors.slug
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="categoryIds"
              className="
                text-sm
                font-medium
                text-[var(--admin-title)]
              "
            >
              Category
            </label>

<CategoryMultiSelect
  options={categories}
  value={categoryIds}
  onChange={(value) =>
    setValue(
      "categoryIds",
      value,
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    )
  }
/>

{errors.categoryIds && (
  <p
    className="
      text-xs
      text-[var(--user-danger)]
    "
  >
    {errors.categoryIds.message}
  </p>
)}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="sku"
              className="
                text-sm
                font-medium
                text-[var(--admin-title)]
              "
            >
              SKU
            </label>

            <input
              id="sku"
              placeholder="HD001"
              {...register(
                "sku",
              )}
              className="
                min-h-40
                w-full
                rounded-[var(--admin-input-radius)]
                border
                border-[var(--admin-input-border)]
                bg-[var(--admin-input-bg)]
                px-4
                text-sm
                text-[var(--admin-input-text)]
                outline-none
                transition
                focus:border-[var(--admin-input-focus)]
              "
            />

            {errors.sku && (
              <p
                className="
                  text-xs
                  text-[var(--user-danger)]
                "
              >
                {
                  errors.sku
                    .message
                }
              </p>
            )}
          </div>
        </section>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="
              text-sm
              font-medium
              text-[var(--admin-title)]
            "
          >
            Description
          </label>

          <textarea
            id="description"
            rows={5}
            placeholder="Write a detailed product description..."
            {...register(
              "description",
            )}
            className="
              w-full
              resize-none
              rounded-[var(--admin-input-radius)]
              border
              border-[var(--admin-input-border)]
              bg-[var(--admin-input-bg)]
              px-4
              py-3
              text-sm
              text-[var(--admin-input-text)]
              outline-none
              transition
              focus:border-[var(--admin-input-focus)]
            "
          />

          {errors.description && (
            <p
              className="
                text-xs
                text-[var(--user-danger)]
              "
            >
              {
                errors.description
                  .message
              }
            </p>
          )}
        </div>

        <section
          className="
            grid
            gap-[var(--space-lg)]
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          <div className="space-y-2">
            <label
              htmlFor="price"
              className="
                text-sm
                font-medium
                text-[var(--admin-title)]
              "
            >
              Price
            </label>

            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              {...register(
                "price",
                {
                  valueAsNumber:
                    true,
                },
              )}
              className="
                h-11
                w-full
                rounded-[var(--admin-input-radius)]
                border
                border-[var(--admin-input-border)]
                bg-[var(--admin-input-bg)]
                px-4
                text-sm
                text-[var(--admin-input-text)]
                outline-none
                transition
                focus:border-[var(--admin-input-focus)]
              "
            />

            {errors.price && (
              <p
                className="
                  text-xs
                  text-[var(--user-danger)]
                "
              >
                {
                  errors.price
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="compareAtPrice"
              className="
                text-sm
                font-medium
                text-[var(--admin-title)]
              "
            >
              Compare Price
            </label>

            <input
              id="compareAtPrice"
              type="number"
              min="0"
              step="0.01"
              {...register(
                "compareAtPrice",
                {
                  setValueAs:
                    (
                      value,
                    ) =>
                      value ===
                      ""
                        ? null
                        : Number(
                            value,
                          ),
                },
              )}
              className="
                h-11
                w-full
                rounded-[var(--admin-input-radius)]
                border
                border-[var(--admin-input-border)]
                bg-[var(--admin-input-bg)]
                px-4
                text-sm
                text-[var(--admin-input-text)]
                outline-none
                transition
                focus:border-[var(--admin-input-focus)]
              "
            />

            {errors.compareAtPrice && (
              <p
                className="
                  text-xs
                  text-[var(--user-danger)]
                "
              >
                {
                  errors.compareAtPrice
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="initialRating"
              className="
                text-sm
                font-medium
                text-[var(--admin-title)]
              "
            >
              Initial Product Rating
            </label>

            <input
              id="initialRating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              {...register(
                "initialRating",
                {
                  valueAsNumber:
                    true,
                },
              )}
              className="
                h-11
                w-full
                rounded-[var(--admin-input-radius)]
                border
                border-[var(--admin-input-border)]
                bg-[var(--admin-input-bg)]
                px-4
                text-sm
                text-[var(--admin-input-text)]
                outline-none
                transition
                focus:border-[var(--admin-input-focus)]
              "
            />

            <p
              className="
                text-[11px]
                leading-4
                text-[var(--admin-muted)]
              "
            >
              Optional rating from 0 to 5.
              This is separate from customer
              reviews.
            </p>

            {errors.initialRating && (
              <p
                className="
                  text-xs
                  text-[var(--user-danger)]
                "
              >
                {
                  errors.initialRating
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="status"
              className="
                text-sm
                font-medium
                text-[var(--admin-title)]
              "
            >
              Status
            </label>

            <select
              id="status"
              {...register(
                "status",
              )}
              className="
                h-11
                w-full
                rounded-[var(--admin-input-radius)]
                border
                border-[var(--admin-input-border)]
                bg-[var(--admin-input-bg)]
                px-4
                text-sm
                text-[var(--admin-input-text)]
                outline-none
                transition
                focus:border-[var(--admin-input-focus)]
              "
            >
              {PRODUCT_STATUSES.map(
                (
                  status,
                ) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ),
              )}
            </select>

            {errors.status && (
              <p
                className="
                  text-xs
                  text-[var(--user-danger)]
                "
              >
                {
                  errors.status
                    .message
                }
              </p>
            )}
          </div>
        </section>

        <label
          className="
            inline-flex
            items-center
            gap-3
            text-sm
            font-medium
            text-[var(--admin-title)]
          "
        >
          <input
            type="checkbox"
            {...register(
              "featured",
            )}
            className="
              h-4
              w-4
            "
          />

          Featured Product
        </label>

        <section
          className="
            grid
            gap-[var(--space-lg)]
          "
        >
          <div className="space-y-2">
            <label
              htmlFor="metaTitle"
              className="
                text-sm
                font-medium
                text-[var(--admin-title)]
              "
            >
              SEO Title
            </label>

            <input
              id="metaTitle"
              {...register(
                "metaTitle",
              )}
              placeholder="Optional"
              className="
                h-11
                w-full
                rounded-[var(--admin-input-radius)]
                border
                border-[var(--admin-input-border)]
                bg-[var(--admin-input-bg)]
                px-4
                text-sm
                text-[var(--admin-input-text)]
                outline-none
                transition
                focus:border-[var(--admin-input-focus)]
              "
            />

            {errors.metaTitle && (
              <p
                className="
                  text-xs
                  text-[var(--user-danger)]
                "
              >
                {
                  errors.metaTitle
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="metaDescription"
              className="
                text-sm
                font-medium
                text-[var(--admin-title)]
              "
            >
              SEO Description
            </label>

            <textarea
              id="metaDescription"
              rows={3}
              {...register(
                "metaDescription",
              )}
              placeholder="Optional"
              className="
                w-full
                resize-none
                rounded-[var(--admin-input-radius)]
                border
                border-[var(--admin-input-border)]
                bg-[var(--admin-input-bg)]
                px-4
                py-3
                text-sm
                text-[var(--admin-input-text)]
                outline-none
                transition
                focus:border-[var(--admin-input-focus)]
              "
            />

            {errors.metaDescription && (
              <p
                className="
                  text-xs
                  text-[var(--user-danger)]
                "
              >
                {
                  errors.metaDescription
                    .message
                }
              </p>
            )}
          </div>
        </section>

        <ProductImages
          value={
            watch(
              "images",
            ) ?? []
          }
          disabled={
            loading
          }
          onChange={(
            images,
          ) =>
            setValue(
              "images",
              images,
              {
                shouldDirty:
                  true,

                shouldValidate:
                  true,
              },
            )
          }
        />

        <ProductVariants
          value={
            watch(
              "variants",
            ) ?? []
          }
          categorySlug={
            selectedCategorySlug
          }
          disabled={
            loading
          }
          onChange={(
            variants,
          ) =>
            setValue(
              "variants",
              variants,
              {
                shouldDirty:
                  true,

                shouldValidate:
                  true,
              },
            )
          }
        />

        <ProductSpecifications
          value={(
            watch(
              "specifications",
            ) ?? []
          ).map(
            (
              specification,
              index,
            ) => ({
              ...specification,

              sortOrder:
                specification.sortOrder ??
                index,
            }),
          )}
          disabled={
            loading
          }
          onChange={(
            specifications,
          ) =>
            setValue(
              "specifications",
              specifications,
              {
                shouldDirty:
                  true,

                shouldValidate:
                  true,
              },
            )
          }
        />

        <ProductReviews
          disabled={
            loading
          }
        />

        <div
          className="
            flex
            justify-end
            pt-[var(--space-md)]
          "
        >
          <button
            type="submit"
            disabled={
              loading
            }
            className="
              inline-flex
              h-11
              items-center
              justify-center
              rounded-[var(--admin-input-radius)]
              bg-[#4F46E5]
              px-5
              text-sm
              font-medium
              text-white
              transition-colors
              hover:bg-[#4338CA]
              focus:outline-none
              focus:ring-2
              focus:ring-[#6366F1]
              focus:ring-offset-2
              disabled:pointer-events-none
              disabled:opacity-60
            "
          >
            {loading
              ? "Saving..."
              : submitLabel}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}