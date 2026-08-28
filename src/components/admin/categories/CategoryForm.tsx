"use client";

import {
  useEffect,
  useState,
} from "react";

type CategoryFormValues = {
  name: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
};

type CategoryFormProps = {
  initialValues?: CategoryFormValues;
  loading?: boolean;
  submitLabel: string;
  onSubmit: (
    values: CategoryFormValues,
  ) => Promise<void>;
};

const defaultValues: CategoryFormValues =
  {
    name: "",
    slug: "",
    sortOrder: 0,
    isActive: true,
  };

function slugify(
  value: string,
) {
  return value
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

export default function CategoryForm({
  initialValues =
    defaultValues,
  loading = false,
  submitLabel,
  onSubmit,
}: CategoryFormProps) {
  const [
    values,
    setValues,
  ] = useState(
    initialValues,
  );

  useEffect(() => {
    setValues(
      initialValues,
    );
  }, [initialValues]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    await onSubmit(
      values,
    );
  }

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="
        space-y-6
      "
    >
      <div className="space-y-2">
        <label
          className="
            text-sm
            font-medium
          "
        >
          Name
        </label>

        <input
          type="text"
          value={values.name}
          disabled={loading}
          onChange={(
            event,
          ) =>
            setValues({
              ...values,
              name:
                event.target
                  .value,
              slug: slugify(
                event.target
                  .value,
              ),
            })
          }
          className="
            h-11
            w-full
            rounded-[var(--admin-input-radius)]
            border
            border-[var(--admin-input-border)]
            bg-[var(--admin-input-bg)]
            px-4
            text-sm
          "
          required
        />
      </div>

      <div className="space-y-2">
        <label
          className="
            text-sm
            font-medium
          "
        >
          Slug
        </label>

        <input
          type="text"
          value={values.slug}
          disabled={loading}
          onChange={(
            event,
          ) =>
            setValues({
              ...values,
              slug:
                event.target
                  .value,
            })
          }
          className="
            h-11
            w-full
            rounded-[var(--admin-input-radius)]
            border
            border-[var(--admin-input-border)]
            bg-[var(--admin-input-bg)]
            px-4
            text-sm
          "
          required
        />
      </div>

      <div className="space-y-2">
        <label
          className="
            text-sm
            font-medium
          "
        >
          Sort Order
        </label>

        <input
          type="number"
          value={
            values.sortOrder
          }
          disabled={loading}
          onChange={(
            event,
          ) =>
            setValues({
              ...values,
              sortOrder:
                Number(
                  event.target
                    .value,
                ),
            })
          }
          className="
            h-11
            w-full
            rounded-[var(--admin-input-radius)]
            border
            border-[var(--admin-input-border)]
            bg-[var(--admin-input-bg)]
            px-4
            text-sm
          "
        />
      </div>

      <label
        className="
          flex
          items-center
          gap-3
          text-sm
          font-medium
        "
      >
        <input
          type="checkbox"
          checked={
            values.isActive
          }
          disabled={loading}
          onChange={(
            event,
          ) =>
            setValues({
              ...values,
              isActive:
                event.target
                  .checked,
            })
          }
        />

        Active Category
      </label>

      <button
        type="submit"
        disabled={loading}
        className="
          inline-flex
          h-11
          items-center
          justify-center
          rounded-[var(--admin-input-radius)]
          bg-violet-600
          px-5
          text-sm
          font-medium
          text-white
          transition
          hover:bg-violet-700
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading
          ? "Saving..."
          : submitLabel}
      </button>
    </form>
  );
}