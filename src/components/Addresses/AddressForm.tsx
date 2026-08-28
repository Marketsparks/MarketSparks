"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Loader2,
} from "lucide-react";

import type {
  Address,
  AddressFormValues,
} from "./addresses.types";

type AddressFormProps = {
  address?: Address | null;

  submitting?: boolean;

  onSubmit: (
    values: AddressFormValues,
  ) => Promise<void> | void;

  onCancel?: () => void;
};

const EMPTY_VALUES: AddressFormValues = {
  fullName: "",
  phoneNumber: "",
  alternatePhoneNumber:
    null,
  addressLine1: "",
  addressLine2: null,
  city: "",
  state: null,
  country: "",
  postalCode: null,
  isPrimary: false,
};

export default function AddressForm({
  address,
  submitting = false,
  onSubmit,
  onCancel,
}: AddressFormProps) {
  const [
    values,
    setValues,
  ] = useState<AddressFormValues>(
    EMPTY_VALUES,
  );

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    if (!address) {
      setValues(
        EMPTY_VALUES,
      );

      return;
    }

    setValues({
      fullName:
        address.fullName,

      phoneNumber:
        address.phoneNumber,

      alternatePhoneNumber:
        address.alternatePhoneNumber,

      addressLine1:
        address.addressLine1,

      addressLine2:
        address.addressLine2,

      city:
        address.city,

      state:
        address.state,

      country:
        address.country,

      postalCode:
        address.postalCode,

      isPrimary:
        address.isPrimary,
    });

    setError("");
  }, [address]);

  const isEditing =
    Boolean(address);

  const canSubmit =
    useMemo(
      () =>
        values.fullName.trim() &&
        values.phoneNumber.trim() &&
        values.addressLine1.trim() &&
        values.city.trim() &&
        values.country.trim(),
      [values],
    );

  function updateField<
    K extends keyof AddressFormValues,
  >(
    field: K,
    value: AddressFormValues[K],
  ) {
    setValues(
      (current) => ({
        ...current,
        [field]:
          value,
      }),
    );

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    if (!canSubmit) {
      setError(
        "Complete all required address details.",
      );

      return;
    }

    try {
      setError("");

      await onSubmit({
        ...values,

        fullName:
          values.fullName.trim(),

        phoneNumber:
          values.phoneNumber.trim(),

        alternatePhoneNumber:
          values.alternatePhoneNumber
            ?.trim() || null,

        addressLine1:
          values.addressLine1.trim(),

        addressLine2:
          values.addressLine2
            ?.trim() || null,

        city:
          values.city.trim(),

        state:
          values.state
            ?.trim() || null,

        country:
          values.country.trim(),

        postalCode:
          values.postalCode
            ?.trim() || null,
      });
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to save address.",
      );
    }
  }

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="
        space-y-3
      "
    >
      <div
        className="
          grid
          gap-3
          sm:grid-cols-2
        "
      >
        <Field
          label="Full name"
          required
          value={
            values.fullName
          }
          disabled={
            submitting
          }
          onChange={(value) =>
            updateField(
              "fullName",
              value,
            )
          }
        />

        <Field
          label="Phone number"
          required
          type="tel"
          value={
            values.phoneNumber
          }
          disabled={
            submitting
          }
          onChange={(value) =>
            updateField(
              "phoneNumber",
              value,
            )
          }
        />
      </div>

      <Field
        label="Alternate phone"
        type="tel"
        value={
          values.alternatePhoneNumber ??
          ""
        }
        disabled={
          submitting
        }
        onChange={(value) =>
          updateField(
            "alternatePhoneNumber",
            value || null,
          )
        }
      />

      <Field
        label="Address line 1"
        required
        value={
          values.addressLine1
        }
        disabled={
          submitting
        }
        onChange={(value) =>
          updateField(
            "addressLine1",
            value,
          )
        }
      />

      <Field
        label="Address line 2"
        value={
          values.addressLine2 ??
          ""
        }
        disabled={
          submitting
        }
        onChange={(value) =>
          updateField(
            "addressLine2",
            value || null,
          )
        }
      />

      <div
        className="
          grid
          gap-3
          sm:grid-cols-2
        "
      >
        <Field
          label="City"
          required
          value={
            values.city
          }
          disabled={
            submitting
          }
          onChange={(value) =>
            updateField(
              "city",
              value,
            )
          }
        />

        <Field
          label="State"
          value={
            values.state ??
            ""
          }
          disabled={
            submitting
          }
          onChange={(value) =>
            updateField(
              "state",
              value || null,
            )
          }
        />
      </div>

      <div
        className="
          grid
          gap-3
          sm:grid-cols-2
        "
      >
        <Field
          label="Country"
          required
          value={
            values.country
          }
          disabled={
            submitting
          }
          onChange={(value) =>
            updateField(
              "country",
              value,
            )
          }
        />

        <Field
          label="Postal code"
          value={
            values.postalCode ??
            ""
          }
          disabled={
            submitting
          }
          onChange={(value) =>
            updateField(
              "postalCode",
              value || null,
            )
          }
        />
      </div>

      <label
        className="
          flex
          cursor-pointer
          items-center
          gap-2.5
          rounded-lg
          border
          border-[var(--user-card-border)]
          bg-[var(--user-stat-bg)]
          px-3
          py-2.5
        "
      >
        <input
          type="checkbox"
          checked={
            values.isPrimary
          }
          disabled={
            submitting
          }
          onChange={(
            event,
          ) =>
            updateField(
              "isPrimary",
              event.target
                .checked,
            )
          }
          className="
            h-3.5
            w-3.5
            accent-[var(--primary)]
          "
        />

        <span
          className="
            text-xs
            font-medium
            text-[var(--user-title)]
          "
        >
          Make this my primary
          delivery address
        </span>
      </label>

      {error && (
        <p
          className="
            text-xs
            leading-5
            text-[var(--user-badge-danger-text)]
          "
        >
          {error}
        </p>
      )}

      <div
        className="
          flex
          justify-end
          gap-2
          pt-1
        "
      >
        {onCancel && (
          <button
            type="button"
            disabled={
              submitting
            }
            onClick={
              onCancel
            }
            className="
              h-9
              rounded-lg
              border
              border-[var(--user-card-border)]
              px-3
              text-xs
              font-medium
              text-[var(--user-title)]
              transition
              hover:border-[var(--primary)]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={
            submitting ||
            !canSubmit
          }
          className="
            inline-flex
            h-9
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-[var(--primary)]
            px-3.5
            text-xs
            font-semibold
            text-[var(--primary-foreground)]
            transition
            hover:opacity-90
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {submitting ? (
            <>
              <Loader2
                size={14}
                className="animate-spin"
              />

              Saving
            </>
          ) : isEditing ? (
            "Save changes"
          ) : (
            "Add address"
          )}
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;

  value: string;

  onChange: (
    value: string,
  ) => void;

  required?: boolean;

  type?: "text" | "tel";

  disabled?: boolean;
};

function Field({
  label,
  value,
  onChange,
  required = false,
  type = "text",
  disabled = false,
}: FieldProps) {
  return (
    <div className="min-w-0">
      <label
        className="
          mb-1.5
          block
          text-[10px]
          font-medium
          text-[var(--user-text-muted)]
        "
      >
        {label}

        {required && (
          <span className="ml-0.5">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        required={required}
        disabled={
          disabled
        }
        onChange={(
          event,
        ) =>
          onChange(
            event.target
              .value,
          )
        }
        className="
          h-9
          w-full
          rounded-lg
          border
          border-[var(--user-card-border)]
          bg-[var(--user-card-bg)]
          px-3
          text-xs
          text-[var(--user-title)]
          outline-none
          placeholder:text-[var(--user-text-muted)]
          focus:border-[var(--primary)]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      />
    </div>
  );
}