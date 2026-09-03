"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";

import type { Deposit } from "./types";

type ApproveDepositDialogProps = {
  open: boolean;
  deposit: Deposit | null;
  onClose: () => void;
  onSuccess: () => Promise<void>;
};

export default function ApproveDepositDialog({
  open,
  deposit,
  onClose,
  onSuccess,
}: ApproveDepositDialogProps) {
  const [adminNote, setAdminNote] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  if (!open || !deposit) {
    return null;
  }

  const depositId = deposit.id;

  async function handleApprove() {
    try {
      setLoading(true);

      setError("");

      const response =
        await fetch(
          `/api/admin/deposits/${depositId}/approve`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              adminNote:
                adminNote.trim() ||
                undefined,
            }),
          },
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Unable to approve deposit.",
        );
      }

      setAdminNote("");

      await onSuccess();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to approve deposit.",
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
      z-[100]
      flex
      items-center
      justify-center
      bg-black/60
      p-4
      backdrop-blur-sm
    "
  >
    <div
      className="
        w-full
        max-w-lg
        rounded-2xl
        border
        border-[var(--admin-border)]
        bg-[var(--admin-card-bg)]
        p-6
        shadow-2xl
      "
    >
      <h2
        className="
          text-xl
          font-semibold
          text-[var(--admin-foreground)]
        "
      >
        Approve Deposit
      </h2>

      <p
        className="
          mt-2
          text-sm
          leading-6
          text-[var(--admin-muted-foreground)]
        "
      >
        This will approve the deposit request.
        Wallet crediting will occur after the
        approval process is completed.
      </p>

      <div className="mt-6">
        <label
          className="
            mb-2
            block
            text-sm
            font-medium
            text-[var(--admin-foreground)]
          "
        >
          Admin Note

          <span
            className="
              ml-1
              text-[var(--admin-muted-foreground)]
            "
          >
            (Optional)
          </span>
        </label>

        <textarea
          rows={5}
          value={adminNote}
          onChange={(event) =>
            setAdminNote(
              event.target.value,
            )
          }
          placeholder="Add an internal note..."
          className="
            w-full
            rounded-xl
            border
            border-[var(--admin-border)]
            bg-[var(--admin-background)]
            px-4
            py-3
            text-[var(--admin-foreground)]
            placeholder:text-[var(--admin-muted-foreground)]
            outline-none
            transition-colors
            focus:border-[var(--admin-primary)]
            focus:ring-2
            focus:ring-[var(--admin-primary)]/20
          "
        />
      </div>

      {error && (
        <div
          className="
            mt-4
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            px-4
            py-3
            text-sm
            text-red-400
          "
        >
          {error}
        </div>
      )}

      <div
        className="
          mt-8
          flex
          justify-end
          gap-3
        "
      >
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          type="button"
          onClick={handleApprove}
          disabled={loading}
        >
          {loading
            ? "Approving..."
            : "Approve Deposit"}
        </Button>
      </div>
    </div>
  </div>
);
}