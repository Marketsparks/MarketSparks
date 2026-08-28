"use client";

import {
  useState,
} from "react";

import Button from "@/components/ui/Button";

import type {
  Deposit,
} from "./types";

type RejectDepositDialogProps = {
  open: boolean;

  deposit: Deposit | null;

  onClose: () => void;

  onSuccess: () => Promise<void>;
};

export default function RejectDepositDialog({
  open,
  deposit,
  onClose,
  onSuccess,
}: RejectDepositDialogProps) {
  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    adminNote,
    setAdminNote,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  if (
    !open ||
    !deposit
  ) {
    return null;
  }

  const currentDeposit = deposit;

  async function handleReject() {
    try {
      if (!adminNote.trim()) {
        setError(
          "Please provide a reason for rejecting this deposit.",
        );

        return;
      }

      setLoading(true);

      setError("");

      const response =
        await fetch(
          `/api/admin/deposits/${currentDeposit.id}/reject`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              adminNote,
            }),
          },
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Unable to reject deposit.",
        );
      }

      await onSuccess();

      setAdminNote("");

      onClose();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to reject deposit.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className="
          fixed
          inset-0
          z-50
          bg-black/50
        "
      />

      <div
        className="
          fixed
          left-1/2
          top-1/2
          z-[60]
          w-full
          max-w-lg
          -translate-x-1/2
          -translate-y-1/2
          rounded-3xl
          bg-[var(--card)]
          p-6
          shadow-2xl
        "
      >
        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Reject Deposit
        </h2>

        <p
          className="
            mt-2
            text-sm
            text-[var(--foreground-muted)]
          "
        >
          This action cannot be undone. Tell the user why this deposit was rejected.
        </p>

        <textarea
          value={adminNote}
          onChange={(event) =>
            setAdminNote(
              event.target.value,
            )
          }
          rows={5}
          placeholder="Reason for rejection..."
          className="
            mt-6
            w-full
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--surface)]
            p-4
            outline-none
            focus:border-[var(--primary)]
          "
        />

        {error && (
          <p
            className="
              mt-3
              text-sm
              text-red-500
            "
          >
            {error}
          </p>
        )}

        <div
          className="
            mt-6
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
            variant="primary"
            onClick={
              handleReject
            }
            disabled={loading}
          >
            {loading
              ? "Rejecting..."
              : "Reject Deposit"}
          </Button>
        </div>
      </div>
    </>
  );
}