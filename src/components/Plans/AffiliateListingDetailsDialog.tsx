"use client";

import Image from "next/image";

import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  ExternalLink,
  X,
} from "lucide-react";

import type {
  AffiliateListing,
  AffiliatePublicationStatus,
} from "@/types/affiliate.types";

type AffiliateListingDetailsDialogProps = {
  listing:
    | AffiliateListing
    | null;

  open: boolean;

  onClose: () => void;
};

export default function AffiliateListingDetailsDialog({
  listing,
  open,
  onClose,
}: AffiliateListingDetailsDialogProps) {
  if (!open || !listing) {
    return null;
  }

  const primaryImage =
    listing.product.images.find(
      (image) =>
        image.isPrimary,
    ) ??
    listing.product.images[0] ??
    null;

  const hasDiscount =
    listing.product.compareAtPrice !==
      null &&
    listing.product.compareAtPrice >
      listing.product.price;

  const publishedDate =
    listing.publishedAt
      ? new Date(
          listing.publishedAt,
        ).toLocaleDateString(
          undefined,
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          },
        )
      : "Not published";

  const submittedDate =
    listing.submittedAt
      ? new Date(
          listing.submittedAt,
        ).toLocaleDateString(
          undefined,
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          },
        )
      : null;

  const reviewedDate =
    listing.reviewedAt
      ? new Date(
          listing.reviewedAt,
        ).toLocaleDateString(
          undefined,
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          },
        )
      : null;

  const lastSaleDate =
    listing.lastSaleAt
      ? new Date(
          listing.lastSaleAt,
        ).toLocaleDateString(
          undefined,
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          },
        )
      : "No sales yet";

  const removedDate =
    listing.removedAt
      ? new Date(
          listing.removedAt,
        ).toLocaleDateString(
          undefined,
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          },
        )
      : null;

  function handleBackdropClick(
    event: React.MouseEvent<HTMLDivElement>,
  ) {
    if (
      event.target ===
      event.currentTarget
    ) {
      onClose();
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>,
  ) {
    if (
      event.key ===
      "Escape"
    ) {
      onClose();
    }
  }

  return (
    <div
      role="presentation"
      tabIndex={-1}
      onKeyDown={
        handleKeyDown
      }
      onMouseDown={
        handleBackdropClick
      }
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/60
        p-3
        backdrop-blur-sm
        sm:p-5
        lg:p-6
      "
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="affiliate-listing-details-title"
        className="
          flex
          max-h-[92vh]
          w-full
          max-w-3xl
          flex-col
          overflow-hidden
          rounded-2xl
          border
        "
        style={{
          background:
            "var(--user-card-bg)",

          borderColor:
            "var(--user-card-border)",

          boxShadow:
            "0 24px 70px rgba(0, 0, 0, 0.22)",
        }}
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            border-b
            px-4
            py-3
            sm:px-5
          "
          style={{
            borderColor:
              "var(--user-divider)",
          }}
        >
          <div className="min-w-0">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
              "
              style={{
                color:
                  "var(--user-text-muted)",
              }}
            >
              Affiliate Listing
            </p>

            <h2
              id="affiliate-listing-details-title"
              className="
                mt-0.5
                truncate
                text-base
                font-bold
                sm:text-lg
              "
              style={{
                color:
                  "var(--user-title)",
              }}
            >
              {
                listing.product
                  .name
              }
            </h2>
          </div>

          <button
            type="button"
            onClick={
              onClose
            }
            aria-label="Close details"
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              transition-opacity
              hover:opacity-70
            "
            style={{
              color:
                "var(--user-title)",
              background:
                "var(--user-hover)",
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div
          className="
            overflow-y-auto
            p-4
            sm:p-5
          "
        >
          <div
            className="
              grid
              gap-5
              lg:grid-cols-[220px_minmax(0,1fr)]
              lg:items-start
            "
          >
            <div
              className="
                relative
                aspect-square
                overflow-hidden
                rounded-xl
                bg-[var(--user-surface-secondary)]
              "
            >
              {primaryImage ? (
                <Image
                  src={
                    primaryImage.imageUrl
                  }
                  alt={
                    primaryImage.altText ??
                    listing.product.name
                  }
                  fill
                  sizes="
                    (max-width:1024px) 100vw,
                    220px
                  "
                  className="
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-xs
                  "
                  style={{
                    color:
                      "var(--user-text-muted)",
                  }}
                >
                  No image available
                </div>
              )}
            </div>

            <div
              className="
                min-w-0
              "
            >
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-2
                "
              >
                <PublicationBadge
                  status={
                    listing.publicationStatus
                  }
                />

                {listing.publishedAt && (
                  <span
                    className="
                      text-[11px]
                    "
                    style={{
                      color:
                        "var(--user-text-muted)",
                    }}
                  >
                    Published{" "}
                    {
                      publishedDate
                    }
                  </span>
                )}
              </div>

              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  items-baseline
                  gap-x-2
                  gap-y-1
                "
              >
                {hasDiscount && (
                  <span
                    className="
                      text-sm
                      line-through
                    "
                    style={{
                      color:
                        "var(--user-text-muted)",
                    }}
                  >
                    $
                    {listing.product.compareAtPrice!.toFixed(
                      2,
                    )}
                  </span>
                )}

                <span
                  className="
                    text-2xl
                    font-extrabold
                  "
                  style={{
                    color:
                      "var(--user-title)",
                  }}
                >
                  $
                  {listing.product.price.toFixed(
                    2,
                  )}
                </span>
              </div>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                "
                style={{
                  color:
                    "var(--user-text-secondary)",
                }}
              >
                {
                  listing.product
                    .description
                }
              </p>

              <div
                className="
                  mt-4
                  grid
                  grid-cols-2
                  gap-2
                  sm:grid-cols-3
                "
              >
                <Metric
                  icon={
                    <BarChart3
                      size={14}
                    />
                  }
                  label="Sales"
                  value={listing.totalSales.toLocaleString()}
                />

                <Metric
                  icon={
                    <CircleDollarSign
                      size={14}
                    />
                  }
                  label="Revenue"
                  value={`$${listing.totalRevenue.toFixed(
                    2,
                  )}`}
                />

                <Metric
                  icon={
                    <CheckCircle2
                      size={14}
                    />
                  }
                  label="Commission"
                  value={`$${listing.totalCommission.toFixed(
                    2,
                  )}`}
                />
              </div>
            </div>
          </div>

          <div
            className="
              mt-5
              grid
              gap-3
              sm:grid-cols-2
            "
          >
            <DetailRow
              icon={
                <CalendarDays
                  size={15}
                />
              }
              label="Publication"
              value={
                publicationLabel(
                  listing.publicationStatus,
                )
              }
            />

            {submittedDate && (
              <DetailRow
                icon={
                  <Clock3
                    size={15}
                  />
                }
                label="Submitted"
                value={
                  submittedDate
                }
              />
            )}

            {reviewedDate && (
              <DetailRow
                icon={
                  <CheckCircle2
                    size={15}
                  />
                }
                label="Reviewed"
                value={
                  reviewedDate
                }
              />
            )}

            <DetailRow
              icon={
                <CalendarDays
                  size={15}
                />
              }
              label="Published"
              value={
                publishedDate
              }
            />

            <DetailRow
              icon={
                <Clock3
                  size={15}
                />
              }
              label="Last Sale"
              value={
                lastSaleDate
              }
            />

            <DetailRow
              icon={
                <BarChart3
                  size={15}
                />
              }
              label="Product ID"
              value={
                listing.productId
              }
              breakValue
            />

            <DetailRow
              icon={
                <CircleDollarSign
                  size={15}
                />
              }
              label="Subscription ID"
              value={
                listing.subscriptionId
              }
              breakValue
            />

            {listing.rejectionReason && (
              <DetailRow
                icon={
                  <X
                    size={15}
                  />
                }
                label="Rejection Reason"
                value={
                  listing.rejectionReason
                }
              />
            )}

            {removedDate && (
              <DetailRow
                icon={
                  <Clock3
                    size={15}
                  />
                }
                label="Removed"
                value={
                  removedDate
                }
              />
            )}
          </div>

          <div
            className="
              mt-5
              flex
              flex-col
              gap-2
              border-t
              pt-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
            style={{
              borderColor:
                "var(--user-divider)",
            }}
          >
            <div
              className="
                min-w-0
              "
            >
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                "
                style={{
                  color:
                    "var(--user-text-muted)",
                }}
              >
                Product Slug
              </p>

              <p
                className="
                  mt-1
                  break-all
                  text-xs
                  font-medium
                "
                style={{
                  color:
                    "var(--user-title)",
                }}
              >
                {
                  listing.product
                    .slug
                }
              </p>
            </div>

            <a
              href={`/Market-Place/${listing.product.slug}`}
              className="
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-1.5
                rounded-lg
                px-3
                py-2
                text-xs
                font-semibold
                transition-opacity
                hover:opacity-80
              "
              style={{
                background:
                  "var(--user-button-secondary-bg)",

                color:
                  "var(--user-button-secondary-text)",

                border:
                  "1px solid var(--user-button-secondary-border)",
              }}
            >
              View Product

              <ExternalLink
                size={13}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

type MetricProps = {
  icon: React.ReactNode;

  label: string;

  value: string;
};

function Metric({
  icon,
  label,
  value,
}: MetricProps) {
  return (
    <div
      className="
        rounded-xl
        border
        p-3
      "
      style={{
        background:
          "var(--user-surface-secondary)",

        borderColor:
          "var(--user-divider)",
      }}
    >
      <div
        className="
          flex
          items-center
          gap-1.5
        "
        style={{
          color:
            "var(--user-text-muted)",
        }}
      >
        {icon}

        <span
          className="
            text-[10px]
            font-medium
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-1
          truncate
          text-sm
          font-bold
        "
        style={{
          color:
            "var(--user-title)",
        }}
      >
        {value}
      </p>
    </div>
  );
}

type DetailRowProps = {
  icon: React.ReactNode;

  label: string;

  value: string;

  breakValue?: boolean;
};

function DetailRow({
  icon,
  label,
  value,
  breakValue = false,
}: DetailRowProps) {
  return (
    <div
      className="
        rounded-xl
        border
        p-3
      "
      style={{
        background:
          "var(--user-card-bg)",

        borderColor:
          "var(--user-divider)",
      }}
    >
      <div
        className="
          flex
          items-center
          gap-1.5
        "
        style={{
          color:
            "var(--user-text-muted)",
        }}
      >
        {icon}

        <span
          className="
            text-[10px]
            font-medium
          "
        >
          {label}
        </span>
      </div>

      <p
        className={`
          mt-1
          text-xs
          font-semibold
          ${
            breakValue
              ? "break-all"
              : "truncate"
          }
        `}
        style={{
          color:
            "var(--user-title)",
        }}
      >
        {value}
      </p>
    </div>
  );
}

type PublicationBadgeProps = {
  status: AffiliatePublicationStatus;
};

function PublicationBadge({
  status,
}: PublicationBadgeProps) {
  let background =
    "var(--user-badge-warning-bg)";

  let color =
    "var(--user-badge-warning-text)";

  let label =
    "DRAFT";

  if (
    status ===
    "SUBMITTED"
  ) {
    label =
      "SUBMITTED";
  }

  if (
    status ===
    "IN_REVIEW"
  ) {
    label =
      "IN REVIEW";
  }

  if (
    status ===
    "APPROVED"
  ) {
    background =
      "var(--user-badge-success-bg)";

    color =
      "var(--user-badge-success-text)";

    label =
      "APPROVED";
  }

  if (
    status ===
    "PUBLISHED"
  ) {
    background =
      "var(--user-badge-success-bg)";

    color =
      "var(--user-badge-success-text)";

    label =
      "PUBLISHED";
  }

  if (
    status ===
    "REJECTED"
  ) {
    background =
      "var(--user-badge-danger-bg)";

    color =
      "var(--user-badge-danger-text)";

    label =
      "REJECTED";
  }

  return (
    <span
      className="
        rounded-full
        px-2.5
        py-1
        text-[9px]
        font-semibold
      "
      style={{
        background,
        color,
      }}
    >
      {label}
    </span>
  );
}

function publicationLabel(
  status: AffiliatePublicationStatus,
) {
  switch (status) {
    case "DRAFT":
      return "Draft";

    case "SUBMITTED":
      return "Awaiting admin review";

    case "IN_REVIEW":
      return "Under admin review";

    case "APPROVED":
      return "Approved";

    case "REJECTED":
      return "Rejected";

    case "PUBLISHED":
      return "Published";

    default:
      return "Unknown";
  }
}