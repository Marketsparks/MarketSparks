"use client";

import type {
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";

import type {
  KycFormValues,
} from "./kyc.validation";

import { Controller } from "react-hook-form";

import {
  CountrySelect,
} from "@/components/ui/CountrySelect";

import type {
  Country,
} from "@/lib/countries";

type PersonalInformationSectionProps = {
  register: UseFormRegister<KycFormValues>;

  control: any;

  errors: FieldErrors<KycFormValues>;
};

function Input({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        space-y-1
      "
    >
      <label
        className="
          text-xs
          font-medium
          text-[var(--user-title)]
        "
      >
        {label}
      </label>

      {children}

      {error && (
        <p
          className="
            text-xs
            text-[var(--user-danger)]
          "
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default function PersonalInformationSection({
  register,
  control,
  errors,
}: PersonalInformationSectionProps) {
  return (
    <section
      className="
        rounded-[var(--user-radius-lg)]
        border
        border-[var(--user-card-border)]
        bg-[var(--user-card-bg)]
        p-3 sm:p-4
      "
    >
      <div
        className="
          mb-3
        "
      >
        <h2
          className="
            text-base
            font-semibold
            text-[var(--user-title)]
          "
        >
          Personal Information
        </h2>

        <p
          className="
            mt-0.5
            text-xs
            text-[var(--user-text-muted)]
          "
        >
          Enter your personal information exactly as it appears on your identity
          document.
        </p>
      </div>

      <div
        className="
          grid
          gap-3
          sm:grid-cols-2
        "
      >
        <Input
          label="First Name"
          error={errors.firstName?.message}
        >
          <input
            {...register("firstName")}
            className="
              w-full
              rounded-[var(--user-radius-md)]
              border
              border-[var(--user-input-border)]
              bg-[var(--user-input-bg)]
              px-4
              py-2
              text-[var(--user-input-text)]
              placeholder:text-[var(--user-input-placeholder)]
              outline-none
              transition-colors
              duration-[var(--user-transition)]
              focus:border-[var(--user-input-border-focus)]
            "
          />
        </Input>

        <Input
          label="Last Name"
          error={errors.lastName?.message}
        >
          <input
            {...register("lastName")}
            className="
              w-full
              rounded-[var(--user-radius-md)]
              border
              border-[var(--user-input-border)]
              bg-[var(--user-input-bg)]
              px-3
              py-3
              text-[var(--user-input-text)]
              placeholder:text-[var(--user-input-placeholder)]
              outline-none
              transition-colors
              duration-[var(--user-transition)]
              focus:border-[var(--user-input-border-focus)]
            "
          />
        </Input>

        <Input
          label="Date of Birth"
          error={errors.dateOfBirth?.message}
        >
          <input
            type="date"
            {...register("dateOfBirth")}
            className="
              w-full
              rounded-[var(--user-radius-md)]
              border
              border-[var(--user-input-border)]
              bg-[var(--user-input-bg)]
              px-4
              py-3
              text-[var(--user-input-text)]
              outline-none
              transition-colors
              duration-[var(--user-transition)]
              focus:border-[var(--user-input-border-focus)]
            "
          />
        </Input>

        <Input
          label="Nationality"
          error={errors.nationality?.message}
        >
          <input
            {...register("nationality")}
            className="
              w-full
              rounded-[var(--user-radius-md)]
              border
              border-[var(--user-input-border)]
              bg-[var(--user-input-bg)]
              px-4
              py-3
              text-[var(--user-input-text)]
              placeholder:text-[var(--user-input-placeholder)]
              outline-none
              transition-colors
              duration-[var(--user-transition)]
              focus:border-[var(--user-input-border-focus)]
            "
          />
        </Input>

        <div
          className="
            md:col-span-2
          "
        >
          <Input
            label="Residential Address"
            error={errors.residentialAddress?.message}
          >
            <input
              {...register(
                "residentialAddress"
              )}
              className="
                w-full
                rounded-[var(--user-radius-md)]
                border
                border-[var(--user-input-border)]
                bg-[var(--user-input-bg)]
                px-4
                py-3
                text-[var(--user-input-text)]
                placeholder:text-[var(--user-input-placeholder)]
                outline-none
                transition-colors
                duration-[var(--user-transition)]
                focus:border-[var(--user-input-border-focus)]
              "
            />
          </Input>
        </div>

        <Input
          label="City"
          error={errors.city?.message}
        >
          <input
            {...register("city")}
            className="
              w-full
              rounded-[var(--user-radius-md)]
              border
              border-[var(--user-input-border)]
              bg-[var(--user-input-bg)]
              px-4
              py-3
              text-[var(--user-input-text)]
              outline-none
              transition-colors
              duration-[var(--user-transition)]
              focus:border-[var(--user-input-border-focus)]
            "
          />
        </Input>

        <Input
          label="State / Province"
          error={errors.state?.message}
        >
          <input
            {...register("state")}
            className="
              w-full
              rounded-[var(--user-radius-md)]
              border
              border-[var(--user-input-border)]
              bg-[var(--user-input-bg)]
              px-4
              py-3
              text-[var(--user-input-text)]
              outline-none
              transition-colors
              duration-[var(--user-transition)]
              focus:border-[var(--user-input-border-focus)]
            "
          />
        </Input>

        <Input
          label="Postal Code"
          error={errors.postalCode?.message}
        >
          <input
            {...register("postalCode")}
            className="
              w-full
              rounded-[var(--user-radius-md)]
              border
              border-[var(--user-input-border)]
              bg-[var(--user-input-bg)]
              px-4
              py-3
              text-[var(--user-input-text)]
              outline-none
              transition-colors
              duration-[var(--user-transition)]
              focus:border-[var(--user-input-border-focus)]
            "
          />
        </Input>

<Input
  label="Country"
  error={errors.country?.message}
>
  <Controller
    name="country"
    control={control}
    render={({ field }) => (
      <CountrySelect
        label=""
        value={
          (field.value as Country) || ""
        }
        onChange={(country) =>
          field.onChange(country)
        }
      />
    )}
  />
</Input>
      </div>
    </section>
  );
}