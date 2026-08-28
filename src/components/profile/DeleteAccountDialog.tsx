"use client";

import { useRouter } from "next/navigation";

import {
  useState,
  useEffect,
} from "react";

import {
  AlertTriangle,
  X,
} from "lucide-react";

import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function DeleteAccountDialog({
  open,
  onClose,
}: Props) {
  const router = useRouter();

  const [confirmation, setConfirmation] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!open) {
      setConfirmation("");
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

  const canDelete =
    confirmation.trim() === "DELETE";

  async function handleDelete() {
    if (!canDelete) {
      return;
    }

    try {
      setLoading(true);

const response =
  await fetch("/api/profile/delete", {
    method: "DELETE",
  });
      const data =
        await response.json();

      if (!response.ok) {
        toast.error(
          data.error ??
            "Unable to delete account.",
        );

        return;
      }

      toast.success(
        "Your account has been deleted.",
      );

      router.replace("/Auth");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to delete account.",
      );
    } finally {
      setLoading(false);
    }
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
          max-w-lg
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
            <AlertTriangle
              className="text-[var(--user-danger)]"
              size={22}
            />

            <h2
              className="
                text-lg
                font-semibold
                text-[var(--user-text)]
              "
            >
              Delete Account
            </h2>
          </div>

          <button
            onClick={onClose}
            type="button"
          >
            <X
              size={20}
              className="text-[var(--user-text)]"
            />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <p className="text-sm leading-7 text-[var(--user-text-muted)]">
            This action will immediately remove
            your access to your account. You
            will no longer be able to sign in
            with your current credentials.
          </p>

          <p className="text-sm leading-7 text-[var(--user-text-muted)]">
            Type <strong>DELETE</strong> below
            to continue.
          </p>

          <input
            value={confirmation}
            onChange={(event) =>
              setConfirmation(
                event.target.value,
              )
            }
            placeholder="Type DELETE"
            className="
              h-12
              w-full
              rounded-[var(--user-radius-md)]
              border
              bg-[var(--user-input-bg)]
              px-4
              text-[var(--user-input-text)]
              outline-none
            "
            style={{
              borderColor:
                "var(--user-input-border)",
            }}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-[var(--user-radius-md)]
                border
                px-5
                py-3
              "
              style={{
                borderColor:
                  "var(--user-input-border)",
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={
                !canDelete || loading
              }
              onClick={handleDelete}
              className="
                rounded-[var(--user-radius-md)]
                bg-[var(--user-danger)]
                px-5
                py-3
                font-medium
                text-white
                transition
                disabled:opacity-50
              "
            >
              {loading
                ? "Deleting..."
                : "Delete Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}