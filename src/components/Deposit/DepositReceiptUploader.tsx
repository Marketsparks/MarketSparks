"use client";

import {
  DragEvent,
  useRef,
  useState,
} from "react";

import {
  FileImage,
  Upload,
} from "lucide-react";

type DepositReceiptUploaderProps = {
  file: File | null;

  onChange: (
    file: File
  ) => void;
};

export default function DepositReceiptUploader({
  file,
  onChange,
}: DepositReceiptUploaderProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [
    isDragging,
    setIsDragging,
  ] = useState(false);

  function openPicker() {
    inputRef.current?.click();
  }

  function handleFile(
    selectedFile?: File
  ) {
    if (!selectedFile) {
      return;
    }

    onChange(selectedFile);
  }

  function handleDragEnter(
    event: DragEvent<HTMLButtonElement>
  ) {
    event.preventDefault();

    setIsDragging(true);
  }

  function handleDragOver(
    event: DragEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
  }

  function handleDragLeave(
    event: DragEvent<HTMLButtonElement>
  ) {
    event.preventDefault();

    setIsDragging(false);
  }

  function handleDrop(
    event: DragEvent<HTMLButtonElement>
  ) {
    event.preventDefault();

    setIsDragging(false);

    handleFile(
      event.dataTransfer.files?.[0]
    );
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="
          image/png,
          image/jpeg,
          application/pdf
        "
        hidden
        onChange={(event) => {
          handleFile(
            event.target.files?.[0]
          );
        }}
      />

      <button
        type="button"
        onClick={openPicker}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          mt-6

          flex

          w-full

          flex-col

          items-center

          justify-center

          rounded-[var(--deposit-uploader-radius)]

          border-2

          border-dashed

          p-[var(--deposit-uploader-padding)]

          text-center

          shadow-[var(--deposit-uploader-shadow)]

          transition-all
          duration-300

          ${
            isDragging
              ? `
                  scale-[1.02]

                  border-[var(--deposit-uploader-border-hover)]

                  bg-[var(--deposit-uploader-drag-bg)]
                `
              : `
                  border-[var(--deposit-uploader-border)]

                  bg-[var(--deposit-uploader-bg)]

                  hover:border-[var(--deposit-uploader-border-hover)]
                `
          }
        `}
      >
        {file ? (
          <>
            <FileImage
              size={42}
              className="
                text-[var(--deposit-uploader-icon)]
              "
            />

            <h3
              className="
                mt-4

                text-lg

                font-semibold

                text-[var(--deposit-uploader-title)]
              "
            >
              {file.name}
            </h3>

            <p
              className="
                mt-2

                text-sm

                text-[var(--deposit-uploader-file-text)]
              "
            >
              {(
                file.size /
                1024 /
                1024
              ).toFixed(2)}
              {" "}
              MB
            </p>

<span
  className="
    mt-5

    rounded-full

    border

    border-white

    bg-[#0B3B91]

    px-4

    py-2

    text-sm

    font-medium

    text-white

    transition-colors

    duration-200

    hover:bg-[#082d6d]
  "
>
  Replace File
</span>
          </>
        ) : (
          <>
            <Upload
              size={42}
              className="
                text-[var(--deposit-uploader-icon)]
              "
            />

            <h3
              className="
                mt-4

                text-lg

                font-semibold

                text-[var(--deposit-uploader-title)]
              "
            >
              Drag &amp; Drop Receipt
            </h3>

            <p
              className="
                mt-2

                text-sm

                text-[var(--deposit-uploader-text)]
              "
            >
              or click anywhere to browse
            </p>

            <p
              className="
                mt-6

                text-xs

                font-medium

                tracking-wide

                text-[var(--deposit-uploader-text)]
              "
            >
              PNG • JPG • JPEG • PDF
            </p>
          </>
        )}
      </button>
    </>
  );
}