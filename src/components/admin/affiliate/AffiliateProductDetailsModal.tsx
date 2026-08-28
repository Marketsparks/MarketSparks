"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import {
  CalendarDays,
  Check,
  Loader2,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  UserRound,
  X,
} from "lucide-react";

import { toast } from "sonner";

import type {
  AdminAffiliateInterest,
  AdminAffiliateListing,
} from "@/types/admin-affiliate.types";

import {
  getCloudinaryImageUrl,
} from "@/lib/cloudinary";

import AffiliatePublicationStatusBadge from "./AffiliatePublicationStatusBadge";
import AffiliateCreateInterestDialog from "./AffiliateCreateInterestDialog";

type AffiliateProductDetailsModalProps = {
  listing:
    | AdminAffiliateListing
    | null;

  open: boolean;

  onClose: () => void;
};

export default function AffiliateProductDetailsModal({
  listing,
  open,
  onClose,
}: AffiliateProductDetailsModalProps) {
  const [
    createInterestOpen,
    setCreateInterestOpen,
  ] = useState(false);

  const [
    currentListing,
    setCurrentListing,
  ] =
    useState<AdminAffiliateListing | null>(
      listing,
    );

  const [
    selectedInterestId,
    setSelectedInterestId,
  ] = useState<string | null>(
    null,
  );

  const [
    replyMessage,
    setReplyMessage,
  ] = useState("");

  const [
    replyPrice,
    setReplyPrice,
  ] = useState("");

  const [
    replyLoading,
    setReplyLoading,
  ] = useState(false);

const [
  transactionLoading,
  setTransactionLoading,
] = useState<
  | "payment"
  | "complete"
  | null
>(null);

  useEffect(() => {
    setCurrentListing(
      listing,
    );

    setSelectedInterestId(
      null,
    );

    setReplyMessage("");
    setReplyPrice("");
  }, [listing]);

  if (
    !open ||
    !currentListing
  ) {
    return null;
  }

  const primaryImage =
    currentListing.product.images.find(
      (image) =>
        image.isPrimary,
    ) ??
    currentListing.product.images[0] ??
    null;

  const submittedDate =
    currentListing.submittedAt
      ? new Date(
          currentListing.submittedAt,
        ).toLocaleDateString(
          undefined,
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          },
        )
      : "Not submitted";

  const reviewedDate =
    currentListing.reviewedAt
      ? new Date(
          currentListing.reviewedAt,
        ).toLocaleDateString(
          undefined,
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          },
        )
      : "Not reviewed";

  const publishedDate =
    currentListing.publishedAt
      ? new Date(
          currentListing.publishedAt,
        ).toLocaleDateString(
          undefined,
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          },
        )
      : "Not published";

  const planRate =
    Number(
      currentListing.subscription
        .commissionRate,
    );

  const selectedInterest =
    currentListing.interests.find(
      (interest) =>
        interest.id ===
        selectedInterestId,
    ) ?? null;

  function handleInterestCreated(
    interest: AdminAffiliateInterest,
  ) {
    setCurrentListing(
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,

          interests: [
            interest,
            ...current.interests,
          ],
        };
      },
    );

    setCreateInterestOpen(
      false,
    );
  }

  function openInterest(
    interest: AdminAffiliateInterest,
  ) {
    setSelectedInterestId(
      interest.id,
    );

    setReplyMessage("");
    setReplyPrice("");
  }

  function closeInterest() {
    if (replyLoading) {
      return;
    }

    setSelectedInterestId(
      null,
    );

    setReplyMessage("");
    setReplyPrice("");
  }

  async function handleBuyerReply(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      !selectedInterest
    ) {
      return;
    }

    const message =
      replyMessage.trim();

    if (!message) {
      toast.error(
        "Enter a reply message.",
      );


async function handleTransactionAction(
  action:
    | "payment"
    | "complete",
) {
  if (
    !selectedInterest ||
    transactionLoading
  ) {
    return;
  }

  const transaction =
    selectedInterest.transaction;

  if (!transaction) {
    toast.error(
      "No transaction exists for this interest.",
    );

    return;
  }

  const endpoint =
    action === "payment"
      ? `/api/admin/affiliate/interests/${encodeURIComponent(
          selectedInterest.id,
        )}/payment`
      : `/api/admin/affiliate/interests/${encodeURIComponent(
          selectedInterest.id,
        )}/complete`;

  try {
    setTransactionLoading(
      action,
    );

    const response =
      await fetch(
        endpoint,
        {
          method: "PATCH",

          credentials:
            "include",
        },
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ??
          (
            action ===
            "payment"
              ? "Unable to confirm payment."
              : "Unable to complete transaction."
          ),
      );
    }

    const updatedTransaction =
      data.data.transaction;

    setCurrentListing(
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,

          interests:
            current.interests.map(
              (interest) =>
                interest.id ===
                selectedInterest.id
                  ? {
                      ...interest,

                      transaction:
                        updatedTransaction,
                    }
                  : interest,
            ),
        };
      },
    );

    toast.success(
      action === "payment"
        ? "Payment confirmed. Transaction is now in escrow."
        : "Transaction completed successfully.",
    );
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : action === "payment"
          ? "Unable to confirm payment."
          : "Unable to complete transaction.",
    );
  } finally {
    setTransactionLoading(
      null,
    );
  }
}

      return;
    }

    const parsedPrice =
      replyPrice.trim()
        ? Number(
            replyPrice,
          )
        : null;

    if (
      parsedPrice !==
        null &&
      (!Number.isFinite(
        parsedPrice,
      ) ||
        parsedPrice <= 0)
    ) {
      toast.error(
        "Enter a valid proposed price.",
      );

      return;
    }

    try {
      setReplyLoading(
        true,
      );

      const response =
        await fetch(
          `/api/admin/affiliate/interests/${encodeURIComponent(
            selectedInterest.id,
          )}/negotiate`,
          {
            method: "POST",

            credentials:
              "include",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              message,

              offeredPrice:
                parsedPrice ??
                undefined,
            }),
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to send buyer reply.",
        );
      }

      const newMessage =
        data.data;

      setCurrentListing(
        (current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,

            interests:
              current.interests.map(
                (interest) =>
                  interest.id ===
                  selectedInterest.id
                    ? {
                        ...interest,

                        status:
                          newMessage
                            .interestStatus,

                        updatedAt:
                          newMessage
                            .createdAt,

                        messages: [
                          ...interest.messages,
                          {
                            id:
                              newMessage.id,

                            interestId:
                              newMessage
                                .interestId,

                            senderUserId:
                              newMessage
                                .senderUserId,

                            message:
                              newMessage
                                .message,

                            offeredPrice:
                              newMessage
                                .offeredPrice,

                            createdAt:
                              newMessage
                                .createdAt,

                            sender: {
                              id:
                                newMessage
                                  .senderUserId,

                              firstName:
                                newMessage
                                  .senderName,

                              lastName:
                                "",

                              role:
                                "ADMIN",
                            },
                          },
                        ],
                      }
                    : interest,
              ),
          };
        },
      );

      setReplyMessage("");
      setReplyPrice("");

      toast.success(
        "Buyer reply sent.",
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to send buyer reply.",
      );
    } finally {
      setReplyLoading(
        false,
      );
    }
  }

  async function handleTransactionAction(
  action:
    | "payment"
    | "complete",
) {
  if (
    !selectedInterest ||
    transactionLoading
  ) {
    return;
  }

  const transaction =
    selectedInterest.transaction;

  if (!transaction) {
    toast.error(
      "No transaction exists for this interest.",
    );

    return;
  }

  const endpoint =
    action === "payment"
      ? `/api/admin/affiliate/interests/${encodeURIComponent(
          selectedInterest.id,
        )}/payment`
      : `/api/admin/affiliate/interests/${encodeURIComponent(
          selectedInterest.id,
        )}/complete`;

  try {
    setTransactionLoading(
      action,
    );

    const response =
      await fetch(
        endpoint,
        {
          method: "PATCH",
          credentials:
            "include",
        },
      );

    const data =
      await response.json();

    if (
      !response.ok ||
      !data.success
    ) {
      throw new Error(
        data.error ??
          (
            action ===
            "payment"
              ? "Unable to confirm payment."
              : "Unable to complete transaction."
          ),
      );
    }

    const updatedTransaction =
      data.data.transaction;

    setCurrentListing(
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,

          interests:
            current.interests.map(
              (interest) =>
                interest.id ===
                selectedInterest.id
                  ? {
                      ...interest,

                      transaction:
                        updatedTransaction,
                    }
                  : interest,
            ),
        };
      },
    );

    toast.success(
      action === "payment"
        ? "Payment confirmed. Transaction is now in escrow."
        : "Transaction completed successfully.",
    );
  } catch (error) {
    console.error(
      "Affiliate transaction action failed:",
      error,
    );

    toast.error(
      error instanceof Error
        ? error.message
        : action === "payment"
          ? "Unable to confirm payment."
          : "Unable to complete transaction.",
    );
  } finally {
    setTransactionLoading(
      null,
    );
  }
}

  return (
    <>
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
          z-[100]
          flex
          items-center
          justify-center
          bg-black/50
          p-3
          backdrop-blur-sm
          sm:p-5
        "
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Affiliate product details"
          className="
            flex
            max-h-[90vh]
            w-full
            max-w-2xl
            flex-col
            overflow-hidden
            rounded-xl
            border
            shadow-2xl
          "
          style={{
            background:
              "var(--surface)",

            borderColor:
              "var(--border)",
          }}
        >
          <header
            className="
              flex
              items-center
              justify-between
              gap-3
              border-b
              px-4
              py-3
            "
            style={{
              borderColor:
                "var(--border)",
            }}
          >
            <div className="min-w-0">
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.1em]
                "
                style={{
                  color:
                    "var(--foreground-muted)",
                }}
              >
                Affiliate Product
              </p>

              <h2
                className="
                  mt-0.5
                  truncate
                  text-sm
                  font-bold
                "
                style={{
                  color:
                    "var(--foreground)",
                }}
              >
                {
                  currentListing
                    .product
                    .name
                }
              </h2>
            </div>

            <div
              className="
                flex
                items-center
                gap-1.5
              "
            >
              {currentListing
                .publicationStatus ===
                "PUBLISHED" && (
                <button
                  type="button"
                  onClick={() =>
                    setCreateInterestOpen(
                      true,
                    )
                  }
                  className="
                    inline-flex
                    h-7
                    items-center
                    justify-center
                    rounded-md
                    border
                    px-2
                    text-[9px]
                    font-semibold
                    transition
                    hover:bg-[var(--surface-hover)]
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
                  Create Interest
                </button>
              )}

              <AffiliatePublicationStatusBadge
                status={
                  currentListing
                    .publicationStatus
                }
              />

              <button
                type="button"
                onClick={
                  onClose
                }
                aria-label="Close"
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  border
                  transition
                  hover:bg-[var(--surface-hover)]
                "
                style={{
                  borderColor:
                    "var(--border)",

                  color:
                    "var(--foreground-muted)",
                }}
              >
                <X
                  size={14}
                />
              </button>
            </div>
          </header>

          <div
            className="
              min-h-0
              overflow-y-auto
              p-4
            "
          >
            <div
              className="
                grid
                gap-4
                sm:grid-cols-[120px_minmax(0,1fr)]
              "
            >
              <div
                className="
                  relative
                  aspect-square
                  overflow-hidden
                  rounded-lg
                  bg-[var(--surface-hover)]
                "
              >
                {primaryImage ? (
                  <Image
                    src={
                      getCloudinaryImageUrl(
                        primaryImage.imageKey,
                      ) ??
                      "/placeholder.png"
                    }
                    alt={
                      primaryImage.altText ??
                      currentListing
                        .product
                        .name
                    }
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      items-center
                      justify-center
                      text-[9px]
                    "
                    style={{
                      color:
                        "var(--foreground-muted)",
                    }}
                  >
                    No image
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div
                  className="
                    grid
                    grid-cols-2
                    gap-2
                    sm:grid-cols-3
                  "
                >
                  <Metric
                    label="Store Price"
                    value={`$${currentListing.product.price.toFixed(
                      2,
                    )}`}
                  />

                  <Metric
                    label="Commission"
                    value={`${planRate.toFixed(
                      2,
                    )}%`}
                  />

                  <Metric
                    label="Sales"
                    value={currentListing.product.totalSales.toLocaleString()}
                  />
                </div>

                <p
                  className="
                    mt-3
                    line-clamp-4
                    text-[11px]
                    leading-5
                  "
                  style={{
                    color:
                      "var(--foreground-muted)",
                  }}
                >
                  {
                    currentListing
                      .product
                      .description
                  }
                </p>
              </div>
            </div>

            <div
              className="
                mt-4
                grid
                gap-2
                sm:grid-cols-2
              "
            >
              <InfoRow
                label="Affiliate"
                value={`${currentListing.user.firstName} ${currentListing.user.lastName}`}
              />

              <InfoRow
                label="Plan"
                value={
                  currentListing
                    .subscription
                    .plan.name
                }
              />

              <InfoRow
                label="Email"
                value={
                  currentListing
                    .user
                    .email
                }
                icon={
                  <Mail
                    size={12}
                  />
                }
              />

              <InfoRow
                label="Phone"
                value={
                  currentListing
                    .user
                    .phoneNumber
                }
                icon={
                  <Phone
                    size={12}
                  />
                }
              />

              <InfoRow
                label="Submitted"
                value={
                  submittedDate
                }
                icon={
                  <CalendarDays
                    size={12}
                  />
                }
              />

              <InfoRow
                label="Reviewed"
                value={
                  reviewedDate
                }
                icon={
                  <Check
                    size={12}
                  />
                }
              />

              <InfoRow
                label="Published"
                value={
                  publishedDate
                }
                icon={
                  <CalendarDays
                    size={12}
                  />
                }
              />

              <InfoRow
                label="Interests"
                value={currentListing.interests.length.toString()}
              />
            </div>

            {currentListing.interests.length >
              0 && (
              <div className="mt-4 space-y-2">
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    border-b
                    pb-2
                  "
                  style={{
                    borderColor:
                      "var(--border)",
                  }}
                >
                  <div>
                    <p
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.08em]
                      "
                      style={{
                        color:
                          "var(--foreground-muted)",
                      }}
                    >
                      Buyer Interests
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[10px]
                      "
                      style={{
                        color:
                          "var(--foreground-muted)",
                      }}
                    >
                      Review offers and manage negotiations.
                    </p>
                  </div>

                  <span
                    className="
                      shrink-0
                      rounded-full
                      border
                      px-2
                      py-0.5
                      text-[8px]
                      font-semibold
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
                    {
                      currentListing
                        .interests
                        .length
                    }
                  </span>
                </div>

                {currentListing.interests.map(
                  (
                    interest,
                  ) => {
                    const isSelected =
                      selectedInterestId ===
                      interest.id;

                    return (
                      <div
                        key={
                          interest.id
                        }
                        className="
                          rounded-lg
                          border
                          p-3
                        "
                        style={{
                          background:
                            "var(--surface-hover)",

                          borderColor:
                            isSelected
                              ? "var(--foreground-muted)"
                              : "var(--border)",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            isSelected
                              ? closeInterest()
                              : openInterest(
                                  interest,
                                )
                          }
                          className="
                            flex
                            w-full
                            items-center
                            gap-2.5
                            text-left
                          "
                        >
                          <div
                            className="
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              overflow-hidden
                              rounded-full
                              bg-[var(--surface)]
                            "
                          >
                            {interest
                              .testBuyer
                              .imageKey ? (
                              <Image
                                src={
                                  getCloudinaryImageUrl(
                                    interest
                                      .testBuyer
                                      .imageKey,
                                    "c_fill,w_80,h_80,f_auto,q_auto",
                                  ) ??
                                  "/placeholder.png"
                                }
                                alt={
                                  interest
                                    .testBuyer
                                    .name
                                }
                                width={
                                  32
                                }
                                height={
                                  32
                                }
                                className="
                                  h-full
                                  w-full
                                  object-cover
                                "
                              />
                            ) : (
                              <UserRound
                                size={13}
                                className="text-[var(--foreground-muted)]"
                              />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div
                              className="
                                flex
                                items-center
                                justify-between
                                gap-2
                              "
                            >
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
                                  interest
                                    .testBuyer
                                    .name
                                }
                              </p>

                              <span
                                className="
                                  shrink-0
                                  rounded-full
                                  border
                                  px-2
                                  py-0.5
                                  text-[8px]
                                  font-semibold
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
                                {
                                  interest
                                    .status
                                }
                              </span>
                            </div>

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
                              Offer: $
                              {interest.offeredPrice.toFixed(
                                2,
                              )}
                            </p>
                          </div>
                        </button>

                        {isSelected && (
                          <div
                            className="
                              mt-3
                              border-t
                              pt-3
                            "
                            style={{
                              borderColor:
                                "var(--border)",
                            }}
                          >
                            <div
                              className="
                                space-y-2
                              "
                            >
                              {interest.messages.length ===
                              0 ? (
                                <p
                                  className="
                                    rounded-md
                                    border
                                    px-2.5
                                    py-2
                                    text-[9px]
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
                                  No negotiation messages yet.
                                </p>
                              ) : (
                                interest.messages.map(
                                  (
                                    message,
                                  ) => (
                                    <div
                                      key={
                                        message.id
                                      }
                                      className={`
                                        flex
                                        ${
                                          message.sender.role ===
                                          "ADMIN"
                                            ? "justify-end"
                                            : "justify-start"
                                        }
                                      `}
                                    >
                                      <div
                                        className="
                                          max-w-[85%]
                                          rounded-lg
                                          border
                                          px-2.5
                                          py-2
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
                                            flex
                                            items-center
                                            justify-between
                                            gap-3
                                          "
                                        >
                                          <p
                                            className="
                                              text-[8px]
                                              font-semibold
                                            "
                                            style={{
                                              color:
                                                "var(--foreground-muted)",
                                            }}
                                          >
                                            {message.sender.role ===
                                            "ADMIN"
                                              ? interest
                                                  .testBuyer
                                                  .name
                                              : `${message.sender.firstName} ${message.sender.lastName}`}
                                          </p>

                                          <p
                                            className="
                                              text-[8px]
                                            "
                                            style={{
                                              color:
                                                "var(--foreground-muted)",
                                            }}
                                          >
                                            {formatTime(
                                              message.createdAt,
                                            )}
                                          </p>
                                        </div>

                                        <p
                                          className="
                                            mt-1
                                            text-[10px]
                                            leading-4
                                          "
                                          style={{
                                            color:
                                              "var(--foreground)",
                                          }}
                                        >
                                          {
                                            message.message
                                          }
                                        </p>

                                        {message.offeredPrice !==
                                          null && (
                                          <p
                                            className="
                                              mt-1.5
                                              text-[9px]
                                              font-semibold
                                            "
                                            style={{
                                              color:
                                                "var(--foreground-muted)",
                                            }}
                                          >
                                            Offered: $
                                            {message.offeredPrice.toFixed(
                                              2,
                                            )}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  ),
                                )
                              )}
                            </div>

                            {interest.status !==
                              "ACCEPTED" &&
                              interest.status !==
                                "REJECTED" && (
                                <form
                                  onSubmit={
                                    handleBuyerReply
                                  }
                                  className="
                                    mt-3
                                    space-y-2
                                  "
                                >
                                  <div>
                                    <label
                                      className="
                                        mb-1
                                        block
                                        text-[8px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.06em]
                                      "
                                      style={{
                                        color:
                                          "var(--foreground-muted)",
                                      }}
                                    >
                                      Reply as{" "}
                                      {
                                        interest
                                          .testBuyer
                                          .name
                                      }
                                    </label>

                                    <textarea
                                      value={
                                        isSelected
                                          ? replyMessage
                                          : ""
                                      }
                                      onChange={(
                                        event,
                                      ) =>
                                        setReplyMessage(
                                          event
                                            .target
                                            .value,
                                        )
                                      }
                                      placeholder="Write the buyer's reply..."
                                      rows={
                                        3
                                      }
                                      disabled={
                                        replyLoading
                                      }
                                      className="
                                        w-full
                                        resize-none
                                        rounded-md
                                        border
                                        bg-transparent
                                        px-2.5
                                        py-2
                                        text-[10px]
                                        leading-4
                                        outline-none
                                        focus:border-[var(--foreground-muted)]
                                      "
                                      style={{
                                        color:
                                          "var(--foreground)",

                                        borderColor:
                                          "var(--border)",
                                      }}
                                    />
                                  </div>

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
                                        h-8
                                        min-w-0
                                        flex-1
                                        items-center
                                        rounded-md
                                        border
                                        px-2.5
                                      "
                                      style={{
                                        background:
                                          "var(--surface)",

                                        borderColor:
                                          "var(--border)",
                                      }}
                                    >
                                      <span
                                        className="
                                          mr-1
                                          text-[10px]
                                          font-semibold
                                        "
                                        style={{
                                          color:
                                            "var(--foreground-muted)",
                                        }}
                                      >
                                        $
                                      </span>

                                      <input
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        value={
                                          replyPrice
                                        }
                                        onChange={(
                                          event,
                                        ) =>
                                          setReplyPrice(
                                            event
                                              .target
                                              .value,
                                          )
                                        }
                                        placeholder="Optional price"
                                        disabled={
                                          replyLoading
                                        }
                                        className="
                                          h-full
                                          min-w-0
                                          flex-1
                                          bg-transparent
                                          text-[10px]
                                          outline-none
                                        "
                                        style={{
                                          color:
                                            "var(--foreground)",
                                        }}
                                      />
                                    </div>

                                    <button
                                      type="submit"
                                      disabled={
                                        replyLoading ||
                                        !replyMessage.trim()
                                      }
                                      className="
                                        inline-flex
                                        h-8
                                        shrink-0
                                        items-center
                                        gap-1.5
                                        rounded-md
                                        border
                                        px-2.5
                                        text-[9px]
                                        font-semibold
                                        transition
                                        hover:bg-[var(--surface)]
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                      "
                                      style={{
                                        background:
                                          "var(--surface-hover)",

                                        color:
                                          "var(--foreground-muted)",

                                        borderColor:
                                          "var(--border)",
                                      }}
                                    >
                                      {replyLoading ? (
                                        <Loader2
                                          size={
                                            12
                                          }
                                          className="animate-spin"
                                        />
                                      ) : (
                                        <Send
                                          size={
                                            12
                                          }
                                        />
                                      )}

                                      Reply
                                    </button>
                                  </div>
                                </form>
                              )}

                              {interest.transaction && (
  <div
    className="
      mt-3
      border-t
      pt-3
    "
    style={{
      borderColor:
        "var(--border)",
    }}
  >
    <div
      className="
        flex
        items-center
        justify-between
        gap-3
      "
    >
      <div>
        <p
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.07em]
          "
          style={{
            color:
              "var(--foreground-muted)",
          }}
        >
          Transaction
        </p>

        <p
          className="
            mt-0.5
            text-[10px]
            font-semibold
          "
          style={{
            color:
              "var(--foreground)",
          }}
        >
          $
          {interest.transaction.agreedPrice.toFixed(
            2,
          )}
        </p>
      </div>

      <span
        className="
          rounded-full
          border
          px-2
          py-0.5
          text-[8px]
          font-semibold
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
        {formatTransactionStatus(
          interest.transaction.status,
        )}
      </span>
    </div>

    <div
      className="
        mt-2
        grid
        grid-cols-3
        gap-2
      "
    >
      <TransactionMetric
        label="Agreed"
        value={`$${interest.transaction.agreedPrice.toFixed(
          2,
        )}`}
      />

      <TransactionMetric
        label="Rate"
        value={`${interest.transaction.commissionRate.toFixed(
          2,
        )}%`}
      />

      <TransactionMetric
        label="Commission"
        value={`$${interest.transaction.commissionAmount.toFixed(
          2,
        )}`}
      />
    </div>

    {interest.transaction.status ===
      "AWAITING_PAYMENT" && (
      <button
        type="button"
        disabled={
          transactionLoading !==
          null
        }
        onClick={() =>
          handleTransactionAction(
            "payment",
          )
        }
        className="
          mt-2
          inline-flex
          h-8
          items-center
          gap-1.5
          rounded-md
          border
          px-2.5
          text-[9px]
          font-semibold
          transition
          hover:bg-[var(--surface)]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
        style={{
          background:
            "var(--surface-hover)",

          color:
            "var(--foreground-muted)",

          borderColor:
            "var(--border)",
        }}
      >
        {transactionLoading ===
        "payment" ? (
          <Loader2
            size={12}
            className="animate-spin"
          />
        ) : (
          <Check
            size={12}
          />
        )}

        {transactionLoading ===
        "payment"
          ? "Confirming..."
          : "Confirm Payment"}
      </button>
    )}

    {interest.transaction.status ===
      "IN_ESCROW" && (
      <button
        type="button"
        disabled={
          transactionLoading !==
          null
        }
        onClick={() =>
          handleTransactionAction(
            "complete",
          )
        }
        className="
          mt-2
          inline-flex
          h-8
          items-center
          gap-1.5
          rounded-md
          border
          px-2.5
          text-[9px]
          font-semibold
          transition
          hover:bg-[var(--surface)]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
        style={{
          background:
            "var(--surface-hover)",

          color:
            "var(--foreground-muted)",

          borderColor:
            "var(--border)",
        }}
      >
        {transactionLoading ===
        "complete" ? (
          <Loader2
            size={12}
            className="animate-spin"
          />
        ) : (
          <Check
            size={12}
          />
        )}

        {transactionLoading ===
        "complete"
          ? "Completing..."
          : "Complete Order"}
      </button>
    )}

    {interest.transaction.status ===
      "COMPLETED" && (
      <div
        className="
          mt-2
          rounded-md
          border
          px-2.5
          py-2
        "
        style={{
          background:
            "var(--surface-hover)",

          borderColor:
            "var(--border)",
        }}
      >
        <p
          className="
            text-[9px]
            font-semibold
          "
          style={{
            color:
              "var(--foreground)",
          }}
        >
          Commission recorded
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
          $
          {interest.transaction.commissionAmount.toFixed(
            2,
          )}{" "}
          commission was recorded for
          this completed transaction.
        </p>
      </div>
    )}
  </div>
)}
                          </div>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            )}

            {currentListing
              .rejectionReason && (
              <div
                className="
                  mt-3
                  rounded-lg
                  border
                  px-3
                  py-2.5
                "
                style={{
                  background:
                    "var(--user-badge-danger-bg)",

                  borderColor:
                    "var(--user-badge-danger-bg)",

                  color:
                    "var(--user-badge-danger-text)",
                }}
              >
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.08em]
                  "
                >
                  Rejection Reason
                </p>

                <p
                  className="
                    mt-1
                    text-[11px]
                    leading-5
                  "
                >
                  {
                    currentListing
                      .rejectionReason
                  }
                </p>
              </div>
            )}

            <div
              className="
                mt-4
                border-t
                pt-3
              "
              style={{
                borderColor:
                  "var(--border)",
              }}
            >
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.08em]
                "
                style={{
                  color:
                    "var(--foreground-muted)",
                }}
              >
                Product
              </p>

              <div
                className="
                  mt-2
                  grid
                  grid-cols-2
                  gap-2
                "
              >
                <InfoRow
                  label="Category"
                  value={
                    currentListing
                      .product
                      .category
                      .name
                  }
                />

                <InfoRow
                  label="Slug"
                  value={
                    currentListing
                      .product
                      .slug
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AffiliateCreateInterestDialog
        listing={
          currentListing
        }
        open={
          createInterestOpen
        }
        onClose={() =>
          setCreateInterestOpen(
            false,
          )
        }
        onCreated={
          handleInterestCreated
        }
      />
    </>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div
      className="
        rounded-lg
        border
        px-2.5
        py-2
      "
      style={{
        background:
          "var(--surface-hover)",

        borderColor:
          "var(--border)",
      }}
    >
      <p
        className="
          text-[8px]
          font-medium
          uppercase
          tracking-[0.06em]
        "
        style={{
          color:
            "var(--foreground-muted)",
        }}
      >
        {label}
      </p>

      <p
        className="
          mt-0.5
          truncate
          text-[11px]
          font-bold
        "
        style={{
          color:
            "var(--foreground)",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;

  value: string;

  icon?: React.ReactNode;
}) {
  return (
    <div
      className="
        rounded-lg
        border
        px-2.5
        py-2
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
          flex
          items-center
          gap-1
        "
        style={{
          color:
            "var(--foreground-muted)",
        }}
      >
        {icon}

        <span
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.06em]
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-0.5
          break-words
          text-[10px]
          font-medium
        "
        style={{
          color:
            "var(--foreground)",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function TransactionMetric({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div
      className="
        rounded-md
        border
        px-2
        py-1.5
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
          text-[7px]
          font-medium
          uppercase
          tracking-[0.05em]
        "
        style={{
          color:
            "var(--foreground-muted)",
        }}
      >
        {label}
      </p>

      <p
        className="
          mt-0.5
          truncate
          text-[9px]
          font-semibold
        "
        style={{
          color:
            "var(--foreground)",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function formatTransactionStatus(
  status:
    | "AWAITING_PAYMENT"
    | "IN_ESCROW"
    | "COMPLETED"
    | "CANCELLED",
) {
  switch (status) {
    case "AWAITING_PAYMENT":
      return "Awaiting Payment";

    case "IN_ESCROW":
      return "In Escrow";

    case "COMPLETED":
      return "Completed";

    case "CANCELLED":
      return "Cancelled";

    default:
      return status;
  }
}

function formatTime(
  value: string,
) {
  return new Date(
    value,
  ).toLocaleString(
    undefined,
    {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    },
  );
}