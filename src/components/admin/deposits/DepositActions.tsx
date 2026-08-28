"use client";

import {
  Check,
  Eye,
  X,
} from "lucide-react";

import Button from "@/components/ui/Button";

import type {
  Deposit,
} from "./types";

type DepositActionsProps = {
  deposit: Deposit;

  onView: (
    deposit: Deposit,
  ) => void;

  onApprove: (
    deposit: Deposit,
  ) => void;

  onReject: (
    deposit: Deposit,
  ) => void;
};

export default function DepositActions({
  deposit,
  onView,
  onApprove,
  onReject,
}: DepositActionsProps) {
  const isPending =
    deposit.status ===
    "PENDING";

  return (
    <div
      className="
        flex
        items-center
        justify-end
        gap-2
      "
    >
      <Button
        type="button"
        variant="ghost"
        onClick={() =>
          onView(deposit)
        }
      >
        <Eye
          size={18}
        />
      </Button>

      <Button
        type="button"
        variant="primary"
        disabled={!isPending}
        onClick={() =>
          onApprove(deposit)
        }
      >
        <Check
          size={18}
        />
      </Button>

      <Button
        type="button"
        variant="secondary"
        disabled={!isPending}
        onClick={() =>
          onReject(deposit)
        }
      >
        <X
          size={18}
        />
      </Button>
    </div>
  );
}