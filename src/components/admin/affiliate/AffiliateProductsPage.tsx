"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  toast,
} from "sonner";

import {
  ClipboardList,
} from "lucide-react";

import {
  getAffiliateProducts,
  reviewAffiliateProduct,
  approveAffiliateProduct,
  rejectAffiliateProduct,
  publishAffiliateProduct,
} from "@/services/admin-affiliate.client";

import type {
  AdminAffiliateListing,
} from "@/types/admin-affiliate.types";

import AffiliateProductFilters, {
  type AffiliateProductFilter,
} from "./AffiliateProductFilters";

import AffiliateProductsTable from "./AffiliateProductsTable";

import AffiliateProductDetailsModal from "./AffiliateProductDetailsModal";

import type {
  AffiliateProductAction,
} from "./types";

type AffiliateProductsPageProps = {
  listings: AdminAffiliateListing[];

  loading?: boolean;

  onListingsChange?: (
    listings: AdminAffiliateListing[],
  ) => void;
};

export default function AffiliateProductsPage({
  listings: initialListings,
  loading = false,
  onListingsChange,
}: AffiliateProductsPageProps) {
  const [
    listings,
    setListings,
  ] = useState<
    AdminAffiliateListing[]
  >(
    initialListings,
  );

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    status,
    setStatus,
  ] = useState<AffiliateProductFilter>(
    "ALL",
  );

  const [
    actionLoading,
    setActionLoading,
  ] = useState<{
    listingId: string;
    action: AffiliateProductAction;
  } | null>(
    null,
  );

  const [
    selectedListing,
    setSelectedListing,
  ] =
    useState<AdminAffiliateListing | null>(
      null,
    );

  const [
    rejectionListingId,
    setRejectionListingId,
  ] =
    useState<string | null>(
      null,
    );

  const [
    rejectionReason,
    setRejectionReason,
  ] = useState("");

  function updateListings(
    nextListings: AdminAffiliateListing[],
  ) {
    setListings(
      nextListings,
    );

    onListingsChange?.(
      nextListings,
    );
  }

  const counts =
    useMemo(() => {
      const result: Record<
        AffiliateProductFilter,
        number
      > = {
        ALL: listings.length,
        SUBMITTED: 0,
        IN_REVIEW: 0,
        APPROVED: 0,
        REJECTED: 0,
        PUBLISHED: 0,
        DRAFT: 0,
      };

      for (const listing of listings) {
        result[
          listing.publicationStatus
        ] += 1;
      }

      return result;
    }, [listings]);

  const filteredListings =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return listings.filter(
        (listing) => {
          const matchesStatus =
            status ===
              "ALL" ||
            listing.publicationStatus ===
              status;

          if (
            !matchesStatus
          ) {
            return false;
          }

          if (
            !normalizedSearch
          ) {
            return true;
          }

          const productName =
            listing.product.name.toLowerCase();

          const productSlug =
            listing.product.slug.toLowerCase();

          const firstName =
            listing.user.firstName.toLowerCase();

          const lastName =
            listing.user.lastName.toLowerCase();

          const email =
            listing.user.email.toLowerCase();

          return (
            productName.includes(
              normalizedSearch,
            ) ||
            productSlug.includes(
              normalizedSearch,
            ) ||
            firstName.includes(
              normalizedSearch,
            ) ||
            lastName.includes(
              normalizedSearch,
            ) ||
            email.includes(
              normalizedSearch,
            )
          );
        },
      );
    }, [
      listings,
      search,
      status,
    ]);

function replaceListing(
  updatedListing: Pick<
    AdminAffiliateListing,
    | "id"
    | "status"
    | "publicationStatus"
    | "publishedAt"
    | "submittedAt"
    | "reviewedAt"
    | "rejectionReason"
    | "removedAt"
    | "updatedAt"
  >,
) {
  const currentListing =
    listings.find(
      (listing) =>
        listing.id ===
        updatedListing.id,
    );

  if (!currentListing) {
    return;
  }

  const mergedListing: AdminAffiliateListing = {
    ...currentListing,

    ...updatedListing,
  };

  updateListings(
    listings.map(
      (listing) =>
        listing.id ===
        mergedListing.id
          ? mergedListing
          : listing,
    ),
  );

  setSelectedListing(
    mergedListing,
  );
}

  async function handleReview(
    listingId: string,
  ) {
    try {
      setActionLoading({
        listingId,
        action: "review",
      });

      const updated =
        await reviewAffiliateProduct(
          listingId,
        );

      replaceListing(
        updated,
      );

      toast.success(
        "Affiliate product moved into review.",
      );
    } catch (
      error
    ) {
      toast.error(
        error instanceof
          Error
          ? error.message
          : "Unable to move product into review.",
      );
    } finally {
      setActionLoading(
        null,
      );
    }
  }

  async function handleApprove(
    listingId: string,
  ) {
    try {
      setActionLoading({
        listingId,
        action: "approve",
      });

      const updated =
        await approveAffiliateProduct(
          listingId,
        );

      replaceListing(
        updated,
      );

      toast.success(
        "Affiliate product approved.",
      );
    } catch (
      error
    ) {
      toast.error(
        error instanceof
          Error
          ? error.message
          : "Unable to approve product.",
      );
    } finally {
      setActionLoading(
        null,
      );
    }
  }

  function openRejectDialog(
    listingId: string,
  ) {
    setRejectionListingId(
      listingId,
    );

    setRejectionReason("");
  }

  function closeRejectDialog() {
    if (
      actionLoading?.action ===
      "reject"
    ) {
      return;
    }

    setRejectionListingId(
      null,
    );

    setRejectionReason("");
  }

  async function handleReject(
    listingId: string,
    reason: string,
  ) {
    const trimmedReason =
      reason.trim();

    if (!trimmedReason) {
      toast.error(
        "Enter a rejection reason.",
      );

      return;
    }

    try {
      setActionLoading({
        listingId,
        action: "reject",
      });

      const updated =
        await rejectAffiliateProduct(
          listingId,
          trimmedReason,
        );

      replaceListing(
        updated,
      );

      closeRejectDialog();

      toast.success(
        "Affiliate product rejected.",
      );
    } catch (
      error
    ) {
      toast.error(
        error instanceof
          Error
          ? error.message
          : "Unable to reject product.",
      );
    } finally {
      setActionLoading(
        null,
      );
    }
  }

  async function handlePublish(
    listingId: string,
  ) {
    try {
      setActionLoading({
        listingId,
        action: "publish",
      });

      const updated =
        await publishAffiliateProduct(
          listingId,
        );

      replaceListing(
        updated,
      );

      toast.success(
        "Affiliate product published.",
      );
    } catch (
      error
    ) {
      toast.error(
        error instanceof
          Error
          ? error.message
          : "Unable to publish product.",
      );
    } finally {
      setActionLoading(
        null,
      );
    }
  }

  return (
    <div
      className="
        space-y-3
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <div className="min-w-0">
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <div
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-lg
              "
              style={{
                background:
                  "var(--surface-hover)",
                color:
                  "var(--primary)",
              }}
            >
              <ClipboardList
                size={14}
                strokeWidth={
                  2
                }
              />
            </div>

            <h1
              className="
                truncate
                text-sm
                font-bold
              "
              style={{
                color:
                  "var(--foreground)",
              }}
            >
              Affiliate Products
            </h1>
          </div>

          <p
            className="
              mt-1
              text-[10px]
            "
            style={{
              color:
                "var(--foreground-muted)",
            }}
          >
            Review and publish affiliate product submissions.
          </p>
        </div>

        <div
          className="
            shrink-0
            rounded-lg
            border
            px-2.5
            py-1.5
            text-[9px]
            font-semibold
          "
          style={{
            background:
              "var(--surface)",
            borderColor:
              "var(--border)",
            color:
              "var(--foreground-muted)",
          }}
        >
          {filteredListings.length} shown
        </div>
      </div>

      <AffiliateProductFilters
        search={
          search
        }
        status={
          status
        }
        counts={
          counts
        }
        onSearchChange={
          setSearch
        }
        onStatusChange={
          setStatus
        }
      />

      <AffiliateProductsTable
        listings={
          filteredListings
        }
        loading={
          loading
        }
        actionLoading={
          actionLoading
        }
        onReview={
          handleReview
        }
        onApprove={
          handleApprove
        }
        onReject={
          openRejectDialog
        }
        onPublish={
          handlePublish
        }
        onView={
          setSelectedListing
        }
      />

      <AffiliateProductDetailsModal
        listing={
          selectedListing
        }
        open={
          selectedListing !==
          null
        }
        onClose={() =>
          setSelectedListing(
            null,
          )
        }
      />

      {rejectionListingId && (
        <RejectReasonDialog
          reason={
            rejectionReason
          }
          loading={
            actionLoading?.listingId ===
              rejectionListingId &&
            actionLoading.action ===
              "reject"
          }
          onChange={
            setRejectionReason
          }
          onClose={
            closeRejectDialog
          }
          onSubmit={() =>
            handleReject(
              rejectionListingId,
              rejectionReason,
            )
          }
        />
      )}
    </div>
  );
}

type RejectReasonDialogProps = {
  reason: string;

  loading: boolean;

  onChange: (
    value: string,
  ) => void;

  onClose: () => void;

  onSubmit: () => void;
};

function RejectReasonDialog({
  reason,
  loading,
  onChange,
  onClose,
  onSubmit,
}: RejectReasonDialogProps) {
  return (
    <div
      role="presentation"
      onMouseDown={(
        event,
      ) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
      className="
        fixed
        inset-0
        z-[120]
        flex
        items-center
        justify-center
        bg-black/45
        p-3
        backdrop-blur-sm
      "
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Reject affiliate product"
        className="
          w-full
          max-w-sm
          rounded-xl
          border
          p-4
          shadow-2xl
        "
        style={{
          background:
            "var(--surface)",
          borderColor:
            "var(--border)",
        }}
      >
        <h2
          className="
            text-sm
            font-bold
          "
          style={{
            color:
              "var(--foreground)",
          }}
        >
          Reject Product
        </h2>

        <p
          className="
            mt-1
            text-[10px]
            leading-5
          "
          style={{
            color:
              "var(--foreground-muted)",
          }}
        >
          Provide a clear reason so the affiliate knows what needs to be changed.
        </p>

        <textarea
          value={
            reason
          }
          onChange={(
            event,
          ) =>
            onChange(
              event.target
                .value,
            )
          }
          placeholder="Enter rejection reason..."
          rows={4}
          autoFocus
          className="
            mt-3
            w-full
            resize-none
            rounded-lg
            border
            bg-transparent
            px-3
            py-2.5
            text-[11px]
            outline-none
            transition
            focus:border-[var(--primary)]
            focus:ring-2
            focus:ring-[var(--primary)]/10
          "
          style={{
            borderColor:
              "var(--border)",
            color:
              "var(--foreground)",
          }}
        />

        <div
          className="
            mt-3
            flex
            justify-end
            gap-2
          "
        >
          <button
            type="button"
            disabled={
              loading
            }
            onClick={
              onClose
            }
            className="
              h-8
              rounded-md
              border
              px-3
              text-[10px]
              font-semibold
              transition
              hover:bg-[var(--surface-hover)]
              disabled:opacity-50
            "
            style={{
              borderColor:
                "var(--border)",
              color:
                "var(--foreground-muted)",
            }}
          >
            Cancel
          </button>

<button
  type="button"
  disabled={
    loading ||
    !reason.trim()
  }
  onClick={
    onSubmit
  }
  className="
    inline-flex
    h-8
    items-center
    justify-center
    rounded-md
    border
    px-3
    text-[10px]
    font-semibold
    transition
    hover:bg-[var(--surface-hover)]
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
  style={{
    background:
      "var(--surface)",

    color:
      "var(--foreground-muted)",

    borderColor:
      "var(--border)",
  }}
>
  {loading
    ? "Rejecting..."
    : "Reject Product"}
</button>
        </div>
      </div>
    </div>
  );
}