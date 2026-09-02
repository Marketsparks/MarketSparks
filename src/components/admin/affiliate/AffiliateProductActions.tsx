"use client";

import {
  Check,
  Eye,
  Loader2,
  MessageSquare,
  Send,
  X,
} from "lucide-react";

import type {
  AdminAffiliateListing,
  AdminAffiliatePublicationStatus,
} from "@/types/admin-affiliate.types";

import type {
  AffiliateProductAction,
} from "./types";

type AffiliateProductActionsProps = {
  listing: AdminAffiliateListing;

  loadingAction:
    | AffiliateProductAction
    | null;

  onReview: (
    listingId: string,
  ) => void;

  onApprove: (
    listingId: string,
  ) => void;

  onReject: (
    listingId: string,
  ) => void;

  onPublish: (
    listingId: string,
  ) => void;

  onView: (
    listing: AdminAffiliateListing,
  ) => void;
};

export default function AffiliateProductActions({
  listing,
  loadingAction,
  onReview,
  onApprove,
  onReject,
  onPublish,
  onView,
}: AffiliateProductActionsProps) {
  const {
    publicationStatus,
  } = listing;

  return (
    <div
      className="
        flex
        items-center
        justify-end
        gap-1.5
      "
    >
      <ActionButton
        label="View"
        icon={
          <Eye
            size={13}
            strokeWidth={2}
          />
        }
        onClick={() =>
          onView(listing)
        }
      />

      {publicationStatus ===
        "SUBMITTED" && (
<ActionButton
  label="Review"
  icon={
    <MessageSquare
      size={13}
      strokeWidth={2}
    />
  }
  loading={
    loadingAction ===
    "review"
  }
  onClick={() =>
    onReview(
      listing.id,
    )
  }
/>
      )}

      {publicationStatus ===
        "IN_REVIEW" && (
        <>
          <ActionButton
            label="Approve"
            icon={
              <Check
                size={13}
                strokeWidth={2}
              />
            }
            loading={
              loadingAction ===
              "approve"
            }
            onClick={() =>
              onApprove(
                listing.id,
              )
            }
            success
          />

          <ActionButton
            label="Reject"
            icon={
              <X
                size={13}
                strokeWidth={2}
              />
            }
            loading={
              loadingAction ===
              "reject"
            }
            onClick={() =>
              onReject(
                listing.id,
              )
            }
            danger
          />
        </>
      )}

      {publicationStatus ===
        "APPROVED" && (
<ActionButton
  label="Publish"
  icon={
    <Send
      size={13}
      strokeWidth={2}
    />
  }
  loading={
    loadingAction ===
    "publish"
  }
  onClick={() =>
    onPublish(
      listing.id,
    )
  }
  primary
/>
      )}

      {publicationStatus ===
        "PUBLISHED" && (
        <span
          className="
            inline-flex
            h-7
            items-center
            rounded-md
            px-2
            text-[9px]
            font-semibold
          "
          style={{
            background:
              "var(--user-badge-success-bg)",

            color:
              "var(--user-badge-success-text)",
          }}
        >
          Live
        </span>
      )}

      {publicationStatus ===
        "REJECTED" && (
        <span
          className="
            inline-flex
            h-7
            items-center
            rounded-md
            px-2
            text-[9px]
            font-semibold
          "
          style={{
            background:
              "var(--user-badge-danger-bg)",

            color:
              "var(--user-badge-danger-text)",
          }}
        >
          Rejected
        </span>
      )}
    </div>
  );
}

type ActionButtonProps = {
  label: string;

  icon: React.ReactNode;

  onClick: () => void;

  loading?: boolean;

  primary?: boolean;

  success?: boolean;

  danger?: boolean;
};

function ActionButton({
  label,
  icon,
  onClick,
  loading = false,
  primary = false,
  success = false,
  danger = false,
}: ActionButtonProps) {
  let background =
    "var(--surface)";

  let color =
    "var(--foreground-muted)";

  let border =
    "var(--border)";

if (primary) {
  background =
    "#FFFFFF";

  color =
    "#9409be";

  border =
    "#9409be";
}

  if (success) {
    background =
      "var(--user-badge-success-bg)";

    color =
      "var(--user-badge-success-text)";

    border =
      "var(--user-badge-success-bg)";
  }

  if (danger) {
    background =
      "var(--user-badge-danger-bg)";

    color =
      "var(--user-badge-danger-text)";

    border =
      "var(--user-badge-danger-bg)";
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={onClick}
      className="
        inline-flex
        h-7
        items-center
        justify-center
        gap-1.5
        rounded-md
        border
        px-2
        text-[9px]
        font-semibold
        transition-all
        duration-200
        disabled:cursor-not-allowed
        disabled:opacity-60
        hover:brightness-105
      "
      style={{
        background,
        color,
        borderColor: border,
      }}
    >
      {loading ? (
        <Loader2
          size={13}
          className="animate-spin"
        />
      ) : (
        icon
      )}

      {label}
    </button>
  );
}