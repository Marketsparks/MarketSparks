"use client";

import Image from "next/image";

import {
  BarChart3,
  CalendarDays,
  Eye,
  Heart,
  TrendingUp,
} from "lucide-react";

import Button from "@/components/ui/Button";

import type {
  AffiliateListing,
  AffiliatePublicationStatus,
} from "@/types/affiliate.types";

type AffiliateListingCardProps = {
  listing: AffiliateListing;

  onView?: (
    listing: AffiliateListing,
  ) => void;
};

export default function AffiliateListingCard({
  listing,
  onView,
}: AffiliateListingCardProps) {
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
            month: "short",
            day: "numeric",
            year: "numeric",
          },
        )
      : "Not published";

  return (
    <article
      className="
        overflow-hidden

        rounded-[var(--user-radius-md)]

        border

        transition-all
        duration-200

        hover:shadow-md
      "
      style={{
        background:
          "var(--user-card-bg)",

        borderColor:
          "var(--user-card-border)",

        boxShadow:
          "var(--user-card-shadow)",
      }}
    >
      <div
        className="
          flex

          gap-3

          p-3

          sm:p-3.5
        "
      >
        <div
          className="
            relative

            h-24
            w-24

            shrink-0

            overflow-hidden

            rounded-xl

            bg-[var(--user-surface-secondary)]

            sm:h-28
            sm:w-28
          "
        >
          {primaryImage ? (
            <Image
              src={
                primaryImage.imageUrl ??
                `/api/image/${primaryImage.imageKey}`
              }
              alt={
                primaryImage.altText ??
                listing.product.name
              }
              fill
              sizes="
                (max-width:640px) 96px,
                112px
              "
              className="
                object-cover

                transition-transform
                duration-300

                hover:scale-105
              "
            />
          ) : (
            <div
              className="
                flex

                h-full
                w-full

                items-center
                justify-center

                px-2

                text-center

                text-[10px]
              "
              style={{
                color:
                  "var(--user-text-muted)",
              }}
            >
              No image
            </div>
          )}
        </div>

        <div
          className="
            min-w-0
            flex-1
          "
        >
          <div
            className="
              flex
              items-start
              justify-between
              gap-2
            "
          >
            <div
              className="
                min-w-0
              "
            >
              <h3
                className="
                  line-clamp-2

                  text-sm

                  font-semibold

                  leading-5
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
              </h3>

              <div
                className="
                  mt-1

                  flex
                  flex-wrap
                  items-baseline
                  gap-x-2
                  gap-y-0.5
                "
              >
                {hasDiscount && (
                  <span
                    className="
                      text-[10px]

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
                    text-sm

                    font-bold
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
            </div>

            <PublicationBadge
              status={
                listing.publicationStatus
              }
            />
          </div>

          <div
            className="
              mt-3

              grid

              grid-cols-2

              gap-x-4
              gap-y-2

              sm:grid-cols-3
            "
          >
            <Stat
              icon={
                <BarChart3
                  size={12}
                />
              }
              label="Sales"
              value={listing.totalSales.toLocaleString()}
            />

            <Stat
              icon={
                <TrendingUp
                  size={12}
                />
              }
              label="Earned"
              value={`$${listing.totalCommission.toFixed(
                2,
              )}`}
            />

            <Stat
              icon={
                <CalendarDays
                  size={12}
                />
              }
              label="Published"
              value={publishedDate}
            />
          </div>
        </div>
      </div>

      <div
        className="
          flex

          items-center
          justify-between

          gap-3

          border-t

          px-3
          py-2.5

          sm:px-3.5
        "
        style={{
          borderColor:
            "var(--user-divider)",
        }}
      >
        <div
          className="
            flex

            min-w-0

            items-center

            gap-1.5
          "
          style={{
            color:
              "var(--user-text-muted)",
          }}
        >
          <Heart
            size={12}
          />

          <span
            className="
              truncate

              text-[10px]
            "
          >
            Affiliate product
          </span>
        </div>

        <Button
          type="button"
          onClick={() =>
            onView?.(
              listing,
            )
          }
          className="
            shrink-0

            !h-8

            !px-3

            !text-[11px]

            !rounded-lg
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
          <Eye
            size={13}
            className="mr-1.5"
          />

          View Details
        </Button>
      </div>
    </article>
  );
}

type StatProps = {
  icon: React.ReactNode;

  label: string;

  value: string;
};

function Stat({
  icon,
  label,
  value,
}: StatProps) {
  return (
    <div
      className="
        min-w-0
      "
    >
      <div
        className="
          flex
          items-center
          gap-1
        "
        style={{
          color:
            "var(--user-text-muted)",
        }}
      >
        {icon}

        <span
          className="
            text-[9px]
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-0.5

          truncate

          text-[11px]

          font-semibold
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

  let label = "DRAFT";

  if (
    status ===
    "SUBMITTED"
  ) {
    label = "SUBMITTED";
  }

  if (
    status ===
    "IN_REVIEW"
  ) {
    label = "IN REVIEW";
  }

  if (
    status ===
    "APPROVED"
  ) {
    background =
      "var(--user-badge-success-bg)";

    color =
      "var(--user-badge-success-text)";

    label = "APPROVED";
  }

  if (
    status ===
    "PUBLISHED"
  ) {
    background =
      "var(--user-badge-success-bg)";

    color =
      "var(--user-badge-success-text)";

    label = "PUBLISHED";
  }

  if (
    status ===
    "REJECTED"
  ) {
    background =
      "var(--user-badge-danger-bg)";

    color =
      "var(--user-badge-danger-text)";

    label = "REJECTED";
  }

  return (
    <span
      className="
        shrink-0

        rounded-full

        px-2

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