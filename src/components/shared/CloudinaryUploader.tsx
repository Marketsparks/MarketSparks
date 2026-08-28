"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";

import { getCloudinaryImageUrl } from "@/lib/cloudinary";

import { toast } from "sonner";

type CloudinaryUploaderProps = {
  value: string | null;

  folder: string;

  disabled?: boolean;

  onChange: (
    publicId: string | null
  ) => void;
};

type UploadResponse = {
  success: boolean;

  data: {
    publicId: string;
    secureUrl: string;
  };

  error?: string;
};

export default function CloudinaryUploader({
  value,
  folder,
  disabled = false,
  onChange,
}: CloudinaryUploaderProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "folder",
        folder
      );

      const response =
        await fetch(
          "/api/admin/upload",
          {
            method: "POST",
            body: formData,
          }
        );

      const result: UploadResponse =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.error ??
            "Image upload failed."
        );
      }

      onChange(
        result.data.publicId
      );
} catch (error) {
  console.error(error);

  toast.error(
    error instanceof Error
      ? error.message
      : "Image upload failed."
  );
} finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  const imageUrl =
    getCloudinaryImageUrl(value);

  return (
    <div
      className="
        rounded-[var(--admin-surface-radius)]
        border-2
        border-dashed
        border-[var(--admin-input-border)]
        bg-[var(--admin-surface-bg)]
        p-6
      "
    >
      <input
        ref={inputRef}
        type="file"
        accept="
          image/png,
          image/jpeg,
          image/jpg,
          image/svg+xml,
          image/webp
        "
        hidden
        disabled={
          disabled ||
          uploading
        }
        onChange={handleUpload}
      />

      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          text-center
        "
      >
        <button
          type="button"
          disabled={
            disabled ||
            uploading
          }
          onClick={() =>
            inputRef.current?.click()
          }
          className="
            flex
            w-full
            flex-col
            items-center
            justify-center
            rounded-xl
            border
            border-[var(--admin-input-border)]
            bg-[var(--admin-card-bg)]
            px-6
            py-8
            transition-all
            duration-300
            hover:border-[var(--admin-input-focus)]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {uploading ? (
            <Loader2
              size={42}
              className="animate-spin"
            />
          ) : imageUrl ? (
            <Image
              src={imageUrl}
              alt="Uploaded icon"
              width={72}
              height={72}
              className="
                h-[72px]
                w-[72px]
                object-contain
              "
            />
          ) : (
            <ImagePlus
              size={42}
              className="
                text-[var(--admin-muted)]
              "
            />
          )}

          <p
            className="
              mt-5
              text-sm
              font-semibold
              text-[var(--admin-title)]
            "
          >
            {uploading
              ? "Uploading..."
              : imageUrl
                ? "Replace Icon"
                : "Upload Icon"}
          </p>

          <p
            className="
              mt-2
              text-xs
              text-[var(--admin-muted)]
            "
          >
            PNG, JPG, SVG or WebP.
            Maximum file size 2 MB.
          </p>
        </button>

        {imageUrl && (
          <button
            type="button"
            disabled={
              disabled ||
              uploading
            }
            onClick={() =>
              onChange(null)
            }
            className="
              mt-4
              text-sm
              font-medium
              text-[var(--user-danger)]
              transition-opacity
              hover:opacity-80
            "
          >
            Remove Image
          </button>
        )}
      </div>
    </div>
  );
}