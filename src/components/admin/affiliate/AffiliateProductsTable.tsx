"use client";

import Image from "next/image";

import {
  CalendarDays,
  UserRound,
} from "lucide-react";

import type {
  AdminAffiliateListing,
} from "@/types/admin-affiliate.types";

import AffiliatePublicationStatusBadge from "./AffiliatePublicationStatusBadge";
import AffiliateProductActions from "./AffiliateProductActions";

import type {
  AffiliateProductAction,
} from "./types";

import {
  getCloudinaryImageUrl,
} from "@/lib/cloudinary";

type AffiliateProductsTableProps = {
  listings: AdminAffiliateListing[];

  loading: boolean;

  actionLoading: {
    listingId: string;
    action: AffiliateProductAction;
  } | null;

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

export default function AffiliateProductsTable({
  listings,
  loading,
  actionLoading,
  onReview,
  onApprove,
  onReject,
  onPublish,
  onView,
}: AffiliateProductsTableProps) {
  if (loading) {
    return (
      <div
        className="
          overflow-hidden
          rounded-xl
          border
        "
        style={{
          background:
            "var(--surface)",
          borderColor:
            "var(--border)",
        }}
      >
        <div
          className="
            space-y-2
            p-3
          "
        >
          {Array.from({
            length: 6,
          }).map(
            (_, index) => (
              <div
                key={index}
                className="
                  h-14
                  animate-pulse
                  rounded-lg
                  bg-[var(--surface-hover)]
                "
              />
            ),
          )}
        </div>
      </div>
    );
  }

  if (
    listings.length ===
    0
  ) {
    return (
      <div
        className="
          rounded-xl
          border
          px-4
          py-10
          text-center
        "
        style={{
          background:
            "var(--surface)",
          borderColor:
            "var(--border)",
        }}
      >
        <p
          className="
            text-xs
            font-semibold
          "
          style={{
            color:
              "var(--foreground)",
          }}
        >
          No affiliate products found.
        </p>

        <p
          className="
            mt-1
            text-[11px]
          "
          style={{
            color:
              "var(--foreground-muted)",
          }}
        >
          Submitted affiliate products will appear here.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border
      "
      style={{
        background:
          "var(--surface)",
        borderColor:
          "var(--border)",
      }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full">
          <thead
            style={{
              background:
                "var(--surface-hover)",
            }}
          >
            <tr>
              <Header>
                Product
              </Header>

              <Header>
                Affiliate
              </Header>

              <Header>
                Plan
              </Header>

              <Header>
                Commission
              </Header>

              <Header>
                Status
              </Header>

              <Header>
                Submitted
              </Header>

              <Header align="right">
                Actions
              </Header>
            </tr>
          </thead>

          <tbody>
            {listings.map(
              (listing) => {
                const primaryImage =
                  listing.product.images.find(
                    (image) =>
                      image.isPrimary,
                  ) ??
                  listing.product.images[0] ??
                  null;

                const submittedDate =
                  listing.submittedAt
                    ? new Date(
                        listing.submittedAt,
                      ).toLocaleDateString(
                        undefined,
                        {
                          month:
                            "short",
                          day:
                            "numeric",
                          year:
                            "numeric",
                        },
                      )
                    : "Not submitted";

                const isLoading =
                  actionLoading
                    ?.listingId ===
                    listing.id;

                return (
                  <tr
                    key={
                      listing.id
                    }
                    className="
                      border-t
                      transition-colors
                      duration-150
                      hover:bg-[var(--surface-hover)]
                    "
                    style={{
                      borderColor:
                        "var(--border)",
                    }}
                  >
                    <Cell>
                      <div
                        className="
                          flex
                          min-w-[230px]
                          items-center
                          gap-2.5
                        "
                      >
                        <div
                          className="
                            relative
                            h-10
                            w-10
                            shrink-0
                            overflow-hidden
                            rounded-lg
                            bg-[var(--surface-hover)]
                          "
                        >
                          {primaryImage ? (
                            <Image
src={
  primaryImage
    ? getCloudinaryImageUrl(
        primaryImage.imageKey,
      ) ??
      "/placeholder.png"
    : "/placeholder.png"
}
                              alt={
                                primaryImage.altText ??
                                listing.product.name
                              }
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          ) : null}
                        </div>

                        <div className="min-w-0">
                          <p
                            className="
                              truncate
                              text-[11px]
                              font-semibold
                            "
                            style={{
                              color:
                                "var(--foreground)",
                            }}
                          >
                            {
                              listing
                                .product
                                .name
                            }
                          </p>

                          <p
                            className="
                              mt-0.5
                              truncate
                              text-[9px]
                            "
                            style={{
                              color:
                                "var(--foreground-muted)",
                            }}
                          >
                            {
                              listing
                                .product
                                .slug
                            }
                          </p>
                        </div>
                      </div>
                    </Cell>

                    <Cell>
                      <div
                        className="
                          flex
                          min-w-[150px]
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
                            overflow-hidden
                            rounded-full
                            bg-[var(--surface-hover)]
                          "
                        >
                          {listing.user.avatarKey ? (
                            <Image
src={
  getCloudinaryImageUrl(
    listing.user.avatarKey,
    "c_fill,w_80,h_80,f_auto,q_auto",
  ) ??
  "/placeholder.png"
}
                              alt=""
                              width={28}
                              height={28}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <UserRound
                              size={13}
                              strokeWidth={2}
                              className="text-[var(--foreground-muted)]"
                            />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p
                            className="
                              truncate
                              text-[10px]
                              font-semibold
                            "
                            style={{
                              color:
                                "var(--foreground)",
                            }}
                          >
                            {
                              listing
                                .user
                                .firstName
                            }{" "}
                            {
                              listing
                                .user
                                .lastName
                            }
                          </p>

                          <p
                            className="
                              truncate
                              text-[9px]
                            "
                            style={{
                              color:
                                "var(--foreground-muted)",
                            }}
                          >
                            {
                              listing
                                .user
                                .email
                            }
                          </p>
                        </div>
                      </div>
                    </Cell>

                    <Cell>
                      <div className="min-w-[100px]">
                        <p
                          className="
                            text-[10px]
                            font-semibold
                          "
                          style={{
                            color:
                              "var(--foreground)",
                          }}
                        >
                          {
                            listing
                              .subscription
                              .plan
                              .name
                          }
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-[9px]
                          "
                          style={{
                            color:
                              "var(--foreground-muted)",
                          }}
                        >
                          {
                            Number(
                              listing
                                .subscription
                                .commissionRate,
                            )
                          }
                          %
                        </p>
                      </div>
                    </Cell>

                    <Cell>
                      <span
                        className="
                          text-[10px]
                          font-semibold
                        "
                        style={{
                          color:
                            "var(--foreground)",
                        }}
                      >
                        {
                          Number(
                            listing
                              .subscription
                              .commissionRate,
                          )
                        }
                        %
                      </span>
                    </Cell>

                    <Cell>
                      <AffiliatePublicationStatusBadge
                        status={
                          listing.publicationStatus
                        }
                      />
                    </Cell>

                    <Cell>
                      <div
                        className="
                          flex
                          min-w-[105px]
                          items-center
                          gap-1.5
                        "
                        style={{
                          color:
                            "var(--foreground-muted)",
                        }}
                      >
                        <CalendarDays
                          size={12}
                          strokeWidth={
                            2
                          }
                        />

                        <span className="text-[9px]">
                          {
                            submittedDate
                          }
                        </span>
                      </div>
                    </Cell>

                    <Cell align="right">
                      <AffiliateProductActions
                        listing={
                          listing
                        }
                        loadingAction={
                          isLoading
                            ? actionLoading
                                ?.action ??
                              null
                            : null
                        }
                        onReview={
                          onReview
                        }
                        onApprove={
                          onApprove
                        }
                        onReject={
                          onReject
                        }
                        onPublish={
                          onPublish
                        }
                        onView={
                          onView
                        }
                      />
                    </Cell>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Header({
  children,
  align = "left",
}: {
  children: React.ReactNode;

  align?: "left" | "right";
}) {
  return (
    <th
      className={`
        px-3
        py-2.5
        text-[9px]
        font-semibold
        uppercase
        tracking-[0.08em]
        ${
          align ===
          "right"
            ? "text-right"
            : "text-left"
        }
      `}
      style={{
        color:
          "var(--foreground-muted)",
      }}
    >
      {children}
    </th>
  );
}

function Cell({
  children,
  align = "left",
}: {
  children: React.ReactNode;

  align?: "left" | "right";
}) {
  return (
    <td
      className={`
        px-3
        py-2.5
        ${
          align ===
          "right"
            ? "text-right"
            : "text-left"
        }
      `}
    >
      {children}
    </td>
  );
}