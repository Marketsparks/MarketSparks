"use client";

import Image from "next/image";

import {
  ImagePlus,
  Loader2,
  Trash2,
} from "lucide-react";

type ImageUploaderProps = {
  label: string;

  description?: string;

  preview: string | null;

  loading?: boolean;

  required?: boolean;

  accept?: string;

  onSelect: (
    file: File
  ) => Promise<void>;

  onRemove: () => void;
};

export default function ImageUploader({
  label,
  description,
  preview,
  loading = false,
  required = false,
  accept = "image/*",
  onSelect,
  onRemove,
}: ImageUploaderProps) {
  return (
    <div
      className="
        space-y-2
      "
    >
      <div>
        <h3
          className="
            text-sm
            font-semibold
            text-[var(--user-title)]
          "
        >
          {label}

          {required && (
            <span
              className="
                ml-1
                text-[var(--user-danger)]
              "
            >
              *
            </span>
          )}
        </h3>

        {description && (
          <p
            className="
              mt-1
              text-xs
              text-[var(--user-text-muted)]
            "
          >
            {description}
          </p>
        )}
      </div>

      {preview ? (
        <div
          className="
            relative
            overflow-hidden
            rounded-xl
            border
            border-[var(--user-card-border)]
            bg-[var(--user-card-bg)]
          "
        >
          <div
            className="
              relative
              h-36
              sm:h-40
              md:h-44
              lg:h-48
              w-full
            "
          >
            <Image
              src={preview}
              alt={label}
              fill
              className="object-cover"
            />
          </div>

          <button
            type="button"
            onClick={onRemove}
            className="
              absolute
              right-2
              top-2
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-[var(--user-danger-bg)]
              text-[var(--user-danger)]
              transition-colors
              duration-[var(--user-transition)]
              hover:bg-[var(--user-danger-hover)]
            "
          >
            <Trash2 size={16} />
          </button>
        </div>
      ) : (
        <label
          className="
            flex
            h-36
            sm:h-40
            md:h-44
            lg:h-48
            w-full
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-xl
            border-2
            border-dashed
            border-[var(--user-card-border)]
            bg-[var(--user-card-bg)]
            px-4
            text-center
            transition-colors
            duration-[var(--user-transition)]
            hover:border-[var(--user-input-border-focus)]
          "
        >
          <input
            type="file"
            accept={accept}
            className="hidden"
            disabled={loading}
            onChange={async (event) => {
              const file =
                event.target.files?.[0];

              if (!file) {
                return;
              }

              await onSelect(file);

              event.target.value = "";
            }}
          />

          {loading ? (
            <>
              <Loader2
                size={22}
                className="
                  animate-spin
                  text-[var(--user-icon)]
                "
              />

              <p
                className="
                  mt-2
                  text-xs
                  sm:text-sm
                  text-[var(--user-text)]
                "
              >
                Uploading...
              </p>
            </>
          ) : (
            <>
              <div
                className="
                  flex
                  h-9
                  w-9
                  sm:h-10
                  sm:w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--user-surface)]
                "
              >
                <ImagePlus
                  size={18}
                  className="
                    text-[var(--user-icon)]
                  "
                />
              </div>

              <p
                className="
                  mt-2
                  text-xs
                  sm:text-sm
                  font-medium
                  text-[var(--user-title)]
                "
              >
                Upload image
              </p>

              <p
                className="
                  mt-1
                  text-[10px]
                  sm:text-xs
                  text-[var(--user-text-muted)]
                "
              >
                PNG • JPG • WEBP
              </p>
            </>
          )}
        </label>
      )}
    </div>
  );
}