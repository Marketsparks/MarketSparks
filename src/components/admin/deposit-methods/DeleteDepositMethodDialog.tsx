"use client";

import { useState } from "react";

import Image from "next/image";

import {
  AlertTriangle,
  Loader2,
  Trash2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

import Button from "@/components/ui/Button";

import {
  getCloudinaryImageUrl,
} from "@/lib/cloudinary";

import type {
  DepositMethod,
} from "./types";

type DeleteDepositMethodDialogProps = {
  open: boolean;

  method: DepositMethod | null;

  onClose: () => void;

  onSuccess: () => void;
};

export default function DeleteDepositMethodDialog({
  open,
  method,
  onClose,
  onSuccess,
}: DeleteDepositMethodDialogProps) {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

if (!method) {
  return null;
}

const imageUrl = getCloudinaryImageUrl(method.iconKey);

  async function handleDelete() {
if (!method) {
 return;
}
    try {
      setLoading(true);

      setError("");

const response = await fetch(
  `/api/admin/deposit-methods/${method.id}`,
  {
    method: "DELETE",
  },
);

const text = await response.text();

const result = text ? JSON.parse(text) : {};

if (!response.ok) {
  throw new Error(
    result.error ?? "Failed to delete deposit method",
  );
}

      onSuccess();

      onClose();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete deposit method",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!loading && !value) {
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle
            className="
              flex
              items-center
              gap-2
            "
          >
            <AlertTriangle
              size={20}
              className="text-red-500"
            />

            Delete Deposit Method
          </DialogTitle>

          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div
          className="
            flex
            items-center
            gap-4

            rounded-xl
            border

            border-red-200

            bg-red-50

            p-4
          "
        >
{imageUrl ? (
  <Image
    src={imageUrl}
    alt={method.name}
    width={56}
    height={56}
    className="rounded-lg"
  />
) : (
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center

                rounded-lg

                bg-gray-200

                text-lg
                font-semibold
              "
            >
              {method.symbol.slice(0, 2)}
            </div>
          )}

          <div className="min-w-0">
            <p className="font-semibold">
              {method.name}
            </p>

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              {method.network}
            </p>

            <p
              className="
                mt-2
                text-sm
                text-red-600
              "
            >
              Deleting this method removes it from
              the platform immediately.
            </p>
          </div>
        </div>

        {error && (
          <p
            className="
              text-sm
              text-red-600
            "
          >
            {error}
          </p>
        )}

        <DialogFooter>
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
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2
                  size={16}
                  className="
                    mr-2
                    animate-spin
                  "
                />

                Deleting...
              </>
            ) : (
              <>
                <Trash2
                  size={16}
                  className="mr-2"
                />

                Delete Method
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}