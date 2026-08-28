"use client";

import ImageUploader from "./ImageUploader";

type SelfieVerificationSectionProps = {
  selfiePreview: string | null;

  selfieLoading: boolean;

onSelfieSelect: (
  file: File,
) => Promise<void>;

  onRemoveSelfie: () => void;
};

export default function SelfieVerificationSection({
  selfiePreview,
  selfieLoading,
  onSelfieSelect,
  onRemoveSelfie,
}: SelfieVerificationSectionProps) {
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
          Selfie Verification
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-[var(--user-text-muted)]
          "
        >
          Upload a clear selfie while holding the same identity document.
          Your face and the document must both be clearly visible.
        </p>
      </div>

      <ImageUploader
        label="Selfie with ID"
        description="PNG, JPG or JPEG."
        required
        preview={selfiePreview}
        loading={selfieLoading}
        onSelect={onSelfieSelect}
        onRemove={onRemoveSelfie}
      />
    </section>
  );
}