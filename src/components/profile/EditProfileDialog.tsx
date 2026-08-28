"use client";

import { useEffect, useState } from "react";
import { X, UserPen } from "lucide-react";

import { EditProfileForm } from "./EditProfileForm";
import type { ProfileFormValues } from "./profile.types";

type Props = {
  open: boolean;
  onClose: () => void;
  initialValues: ProfileFormValues;
  onSuccess: (
    values: ProfileFormValues,
  ) => void;
};

export function EditProfileDialog({
  open,
  onClose,
  initialValues,
  onSuccess,
}: Props) {
  const [values, setValues] =
    useState(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleEscape(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    document.body.style.overflow =
      "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape,
      );

      document.body.style.overflow =
        "";
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        p-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        onClick={(event) =>
          event.stopPropagation()
        }
        className="
          w-full
          max-w-2xl
          rounded-[var(--user-radius-lg)]
          border
          bg-[var(--user-card-bg)]
          shadow-2xl
        "
        style={{
          borderColor:
            "var(--user-card-border)",
        }}
      >
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            px-6
            py-5
          "
          style={{
            borderColor:
              "var(--user-card-border)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-[var(--user-button-bg)]
                text-[var(--user-button-text)]
              "
            >
              <UserPen size={18} />
            </div>

            <div>
              <h2
                className="
                  text-lg
                  font-semibold
                  text-[var(--user-text)]
                "
              >
                Edit Profile
              </h2>

              <p
                className="
                  text-sm
                  text-[var(--user-text-muted)]
                "
              >
                Update your personal information.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-full
              p-2
              transition
              hover:bg-[var(--user-card-hover)]
            "
          >
            <X
              size={20}
              className="text-[var(--user-text)]"
            />
          </button>
        </div>

        <div className="p-6">
          <EditProfileForm
            initialValues={values}
onSuccess={(updatedValues) => {
  setValues(updatedValues);
  onSuccess(updatedValues);
  onClose();
}}
          />
        </div>
      </div>
    </div>
  );
}