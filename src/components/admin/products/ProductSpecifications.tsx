"use client";

import { Plus, Trash2 } from "lucide-react";

import type {
  ProductSpecificationSchema,
} from "@/validation/product.validation";

type ProductSpecificationsProps = {
  value: ProductSpecificationSchema[];

  disabled?: boolean;

  onChange: (
    specifications: ProductSpecificationSchema[]
  ) => void;
};

const emptySpecification =
  (): ProductSpecificationSchema => ({
    name: "",
    value: "",
    sortOrder: 0,
  });

export default function ProductSpecifications({
  value,
  disabled = false,
  onChange,
}: ProductSpecificationsProps) {
  function normalize(
    specifications: ProductSpecificationSchema[]
  ) {
    return specifications.map(
      (
        specification,
        index
      ) => ({
        ...specification,
        sortOrder: index,
      })
    );
  }

  function addSpecification() {
    onChange(
      normalize([
        ...value,
        emptySpecification(),
      ])
    );
  }

  function removeSpecification(
    index: number
  ) {
    onChange(
      normalize(
        value.filter(
          (
            _,
            current
          ) => current !== index
        )
      )
    );
  }

function updateSpecification(
  index: number,
  field: keyof ProductSpecificationSchema,
  fieldValue: string
) {
  const next = [...value];

  next[index] = {
    ...next[index],
    [field]: fieldValue,
  };

  onChange(normalize(next));
}

  return (
    <section
      className="
        space-y-[var(--space-lg)]
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
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
            Specifications
          </h3>

          <p
            className="
              mt-1
              text-xs
              text-[var(--admin-muted)]
            "
          >
            Technical details
            displayed on the
            product page.
          </p>
        </div>

<button
  type="button"
  disabled={disabled}
  onClick={addSpecification}
  className="
    inline-flex
    h-9
    items-center
    gap-2
    rounded-[var(--admin-input-radius)]
    bg-[#4F46E5]
    px-3
    text-xs
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
  <Plus size={14} />

  Add Specification
</button>
      </div>

      {value.length === 0 && (
        <div
          className="
            rounded-[var(--admin-surface-radius)]
            border
            border-dashed
            border-[var(--admin-card-border)]
            p-5
            text-center
            text-sm
            text-[var(--admin-muted)]
          "
        >
          No specifications added.
        </div>
      )}

      {value.map(
        (
          specification,
          index
        ) => (
          <div
            key={index}
            className="
              rounded-[var(--admin-surface-radius)]
              border
              border-[var(--admin-card-border)]
              bg-[var(--admin-card-bg)]
              p-[var(--space-lg)]
            "
          >
            <div
              className="
                grid
                gap-[var(--space-md)]
                md:grid-cols-[1fr_2fr_auto]
              "
            >
              <input
                placeholder="Name"
                value={
                  specification.name
                }
                disabled={disabled}
                onChange={(
                  event
                ) =>
                  updateSpecification(
                    index,
                    "name",
                    event.target
                      .value
                  )
                }
                className="
                  h-10
                  rounded-[var(--admin-input-radius)]
                  border
                  border-[var(--admin-input-border)]
                  bg-[var(--admin-input-bg)]
                  px-3
                  text-sm
                  text-[var(--admin-input-text)]
                "
              />

              <input
                placeholder="Value"
                value={
                  specification.value
                }
                disabled={disabled}
                onChange={(
                  event
                ) =>
                  updateSpecification(
                    index,
                    "value",
                    event.target
                      .value
                  )
                }
                className="
                  h-10
                  rounded-[var(--admin-input-radius)]
                  border
                  border-[var(--admin-input-border)]
                  bg-[var(--admin-input-bg)]
                  px-3
                  text-sm
                  text-[var(--admin-input-text)]
                "
              />

              <button
                type="button"
                disabled={disabled}
                onClick={() =>
                  removeSpecification(
                    index
                  )
                }
                className="
                  inline-flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-[var(--admin-input-radius)]
                  border
                  border-[var(--admin-button-secondary-border)]
                  bg-[var(--admin-button-secondary-bg)]
                  text-[var(--user-danger)]
                  transition
                  hover:bg-[var(--admin-button-secondary-hover)]
                "
              >
                <Trash2
                  size={16}
                />
              </button>
            </div>
          </div>
        )
      )}
    </section>
  );
}