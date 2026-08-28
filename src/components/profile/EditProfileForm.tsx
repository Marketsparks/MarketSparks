"use client";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { CountrySelect } from "@/components/ui/CountrySelect";
import type { Country } from "@/lib/countries";

type ProfileValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  secondaryPhoneNumber: string;
  country: string;
};

type Props = {
  initialValues: ProfileValues;
  loading?: boolean;
  onSuccess: (values: ProfileValues) => void;
};

export function EditProfileForm({
  initialValues,
  loading = false,
  onSuccess,
}: Props) {
  const [values, setValues] =
    useState(initialValues);

  const [saving, setSaving] =
    useState(false);

  function updateField(
    field: keyof ProfileValues,
    value: string,
  ) {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function swapPhoneNumbers() {
    if (!values.secondaryPhoneNumber.trim()) {
      toast.error(
        "Add a secondary phone number first.",
      );

      return;
    }

    setValues((previous) => ({
      ...previous,
      phoneNumber:
        previous.secondaryPhoneNumber,
      secondaryPhoneNumber:
        previous.phoneNumber,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      setSaving(true);

      const response = await fetch(
        "/api/profile",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(values),
        },
      );

      const data =
        await response.json();

      if (!response.ok) {
        toast.error(
          data.error ??
            "Unable to update profile.",
        );

        return;
      }

      toast.success(
        "Profile updated successfully.",
      );

      onSuccess(values);
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to update profile.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="First Name"
          value={values.firstName}
          onChange={(value) =>
            updateField(
              "firstName",
              value,
            )
          }
        />

        <Field
          label="Last Name"
          value={values.lastName}
          onChange={(value) =>
            updateField(
              "lastName",
              value,
            )
          }
        />

        <Field
          label="Primary Phone"
          value={values.phoneNumber}
          onChange={(value) =>
            updateField(
              "phoneNumber",
              value,
            )
          }
        />

        <Field
          label="Secondary Phone"
          value={
            values.secondaryPhoneNumber
          }
          onChange={(value) =>
            updateField(
              "secondaryPhoneNumber",
              value,
            )
          }
        />

<CountrySelect
  label="Country"
  value={values.country as Country}
  onChange={(country) =>
    updateField("country", country)
  }
/>
      </div>

      <button
        type="button"
        onClick={swapPhoneNumbers}
        className="
          flex
          items-center
          gap-2
          rounded-[var(--user-radius-md)]
          border
          px-4
          py-2
          transition
        "
        style={{
          borderColor:
            "var(--user-input-border)",
          color:
            "var(--user-text)",
        }}
      >
        <ArrowUpDown size={18} />

        Make secondary phone primary
      </button>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={
            saving || loading
          }
          className="
            rounded-[var(--user-radius-md)]
            bg-[var(--user-button-bg)]
            px-6
            py-3
            font-medium
            text-[var(--user-button-text)]
            transition
            hover:bg-[var(--user-button-hover)]
            disabled:opacity-60
          "
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
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
};

function Field({
  label,
  value,
  onChange,
}: FieldProps) {
  return (
    <label className="space-y-2">
      <span
        className="
          text-sm
          font-medium
          text-[var(--user-text)]
        "
      >
        {label}
      </span>

      <input
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className="
          h-12
          w-full
          rounded-[var(--user-radius-md)]
          border
          bg-[var(--user-input-bg)]
          px-4
          text-[var(--user-input-text)]
          outline-none
          transition
          placeholder:text-[var(--user-input-placeholder)]
          focus:border-[var(--user-input-border-focus)]
        "
        style={{
          borderColor:
            "var(--user-input-border)",
        }}
      />
    </label>
  );
}