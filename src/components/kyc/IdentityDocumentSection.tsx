"use client";

import type {
  UseFormRegister,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";

import ImageUploader from "./ImageUploader";

import type {
  KycFormValues,
} from "./kyc.validation";

type IdentityDocumentSectionProps = {
  register: UseFormRegister<KycFormValues>;

  watch: UseFormWatch<KycFormValues>;

  errors: FieldErrors<KycFormValues>;

  frontPreview: string | null;

  backPreview: string | null;

  frontLoading: boolean;

  backLoading: boolean;

onFrontSelect: (
  file: File
) => Promise<void>;

onBackSelect: (
  file: File
) => Promise<void>;

  onRemoveFront: () => void;

  onRemoveBack: () => void;
};

export default function IdentityDocumentSection({
  register,
  watch,
  errors,
  frontPreview,
  backPreview,
  frontLoading,
  backLoading,
  onFrontSelect,
  onBackSelect,
  onRemoveFront,
  onRemoveBack,
}: IdentityDocumentSectionProps) {
  const documentType =
    watch("documentType");

  return (
    <section
      className="
        rounded-[var(--user-radius-lg)]
        border
        border-[var(--user-card-border)]
        bg-[var(--user-card-bg)]
        p-6
      "
    >
      <div className="mb-6">
        <h2
          className="
            text-lg
            font-semibold
            text-[var(--user-title)]
          "
        >
          Identity Document
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-[var(--user-text-muted)]
          "
        >
          Select your identification document and upload clear,
          uncropped images.
        </p>
      </div>

      <div className="space-y-6 pb-16">
        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-[var(--user-title)]
            "
          >
            Document Type
          </label>

          <select
            {...register(
              "documentType"
            )}
            className="
              w-full
              rounded-[var(--user-radius-md)]
              border
              border-[var(--user-input-border)]
              bg-[var(--user-select-bg)]
              px-4
              py-3
              text-[var(--user-select-text)]
              outline-none
              transition-colors
              duration-[var(--user-transition)]
              focus:border-[var(--user-input-border-focus)]
            "
          >
            <option value="">
              Select document
            </option>

            <option value="NATIONAL_ID">
              National ID Card
            </option>

            <option value="PASSPORT">
              International Passport
            </option>

            <option value="DRIVERS_LICENSE">
              Driver's License
            </option>
          </select>

          {errors.documentType && (
            <p
              className="
                mt-2
                text-xs
                text-[var(--user-danger)]
              "
            >
              {
                errors.documentType
                  .message
              }
            </p>
          )}
        </div>

        <ImageUploader
          label="Front Image"
          description="Upload the front of your document."
          required
          preview={frontPreview}
          loading={frontLoading}
          onSelect={
            onFrontSelect
          }
          onRemove={
            onRemoveFront
          }
        />

        {documentType !==
          "PASSPORT" && (
          <ImageUploader
            label="Back Image"
            description="Upload the back of your document."
            required
            preview={backPreview}
            loading={backLoading}
            onSelect={
              onBackSelect
            }
            onRemove={
              onRemoveBack
            }
          />
        )}
      </div>
    </section>
  );
}