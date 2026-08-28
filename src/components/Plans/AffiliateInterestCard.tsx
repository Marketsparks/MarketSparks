"use client";

import {
  useState,
} from "react";

import Image from "next/image";

import {
  Check,
  Loader2,
  MessageSquareText,
  Phone,
  X,
} from "lucide-react";

import {
  toast,
} from "sonner";

import {
  getCloudinaryImageUrl,
} from "@/lib/cloudinary";

import {
  useAuth,
} from "@/context/AuthContext";

import type {
  AffiliateInterest,
  AffiliateTransactionStatus,
} from "@/types/affiliate.types";

type AffiliateInterestCardProps = {
  interest: AffiliateInterest;

  onAccept?: (
    interest: AffiliateInterest,
  ) => void;

  onReject?: (
    interest: AffiliateInterest,
  ) => void;

  onNegotiate?: (
    interest: AffiliateInterest,
  ) => void;
};

export default function AffiliateInterestCard({
  interest,
  onAccept,
  onReject,
  onNegotiate,
}: AffiliateInterestCardProps) {
  const {
    user,
  } = useAuth();

  const [
    currentInterest,
    setCurrentInterest,
  ] = useState(
    interest,
  );

  const [
    actionLoading,
    setActionLoading,
  ] = useState<
    | "accept"
    | "reject"
    | "negotiate"
    | null
  >(null);

  const [
    negotiateOpen,
    setNegotiateOpen,
  ] = useState(false);

const [
  actionDialogOpen,
  setActionDialogOpen,
] = useState(false);

  const buyer =
    currentInterest.testBuyer;

  const imageUrl =
    buyer.imageKey
      ? getCloudinaryImageUrl(
          buyer.imageKey,
          "c_fill,w_160,h_160,f_auto,q_auto",
        )
      : null;

  const isPending =
    currentInterest.status ===
    "PENDING";

  const isNegotiating =
    currentInterest.status ===
    "NEGOTIATING";

  const isAccepted =
    currentInterest.status ===
    "ACCEPTED";

  const isRejected =
    currentInterest.status ===
    "REJECTED";

  async function handleAccept() {
    if (actionLoading) {
      return;
    }

    try {
      setActionLoading(
        "accept",
      );

      const response =
        await fetch(
          `/api/affiliate/interests/${encodeURIComponent(
            currentInterest.id,
          )}/accept`,
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
            "Unable to accept offer.",
        );
      }

      const updatedInterest: AffiliateInterest =
        {
          ...currentInterest,

          status:
            data.data.status,

          updatedAt:
            data.data.updatedAt,

          offeredPrice:
            data.data.offeredPrice ??
            currentInterest.offeredPrice,

          transaction:
            data.data.transaction
              ? {
                  ...data.data
                    .transaction,

                  agreedPrice:
                    Number(
                      data.data
                        .transaction
                        .agreedPrice,
                    ),

                  commissionRate:
                    Number(
                      data.data
                        .transaction
                        .commissionRate,
                    ),

                  commissionAmount:
                    Number(
                      data.data
                        .transaction
                        .commissionAmount,
                    ),
                }
              : currentInterest.transaction,
        };

      setCurrentInterest(
        updatedInterest,
      );

      onAccept?.(
        updatedInterest,
      );

      toast.success(
        "Offer accepted.",
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to accept offer.",
      );
    } finally {
      setActionLoading(
        null,
      );
    }
  }

  async function handleReject() {
    if (actionLoading) {
      return;
    }

    try {
      setActionLoading(
        "reject",
      );

      const response =
        await fetch(
          `/api/affiliate/interests/${encodeURIComponent(
            currentInterest.id,
          )}/reject`,
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
            "Unable to reject offer.",
        );
      }

      const updatedInterest: AffiliateInterest =
        {
          ...currentInterest,

          status:
            data.data.status,

          updatedAt:
            data.data.updatedAt,
        };

      setCurrentInterest(
        updatedInterest,
      );

      onReject?.(
        updatedInterest,
      );

      toast.success(
        "Offer rejected.",
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to reject offer.",
      );
    } finally {
      setActionLoading(
        null,
      );
    }
  }

async function handleAcceptNegotiation() {
  await handleAccept();

  setActionDialogOpen(false);
  setNegotiateOpen(false);
}

async function handleCloseNegotiation() {
  await handleReject();

  setActionDialogOpen(false);
  setNegotiateOpen(false);
}

  async function handleNegotiate(
    message: string,
    offeredPrice: number | null,
  ) {
    if (actionLoading) {
      return;
    }

    try {
      setActionLoading(
        "negotiate",
      );

      const response =
        await fetch(
          `/api/affiliate/interests/${encodeURIComponent(
            currentInterest.id,
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
                offeredPrice ??
                undefined,
            }),
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to send negotiation message.",
        );
      }

      const newMessage =
        data.data?.message;

      const updatedInterest: AffiliateInterest =
        {
          ...currentInterest,

          status:
            data.data.status,

          updatedAt:
            newMessage?.createdAt ??
            currentInterest.updatedAt,

          offeredPrice:
            offeredPrice ??
            currentInterest.offeredPrice,

          messages:
            newMessage
              ? [
                  ...currentInterest.messages,
                  newMessage,
                ]
              : currentInterest.messages,
        };

      setCurrentInterest(
        updatedInterest,
      );

      onNegotiate?.(
        updatedInterest,
      );

      setNegotiateOpen(
        false,
      );

      toast.success(
        "Negotiation message sent.",
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to send negotiation message.",
      );
    } finally {
      setActionLoading(
        null,
      );
    }
  }

  return (
    <>
      <article
        className="
          overflow-hidden
          rounded-xl
          border
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
            items-start
            gap-3
            p-3
          "
        >
          <div
            className="
              relative
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full
              bg-[var(--user-surface-secondary)]
            "
          >
            {imageUrl ? (
              <Image
                src={
                  imageUrl
                }
                alt={
                  buyer.name
                }
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  w-full
                  items-center
                  justify-center
                  text-[10px]
                  font-semibold
                "
                style={{
                  color:
                    "var(--user-text-muted)",
                }}
              >
                {buyer.name
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div
              className="
                flex
                items-start
                justify-between
                gap-2
              "
            >
              <div className="min-w-0">
                <h3
                  className="
                    truncate
                    text-[11px]
                    font-semibold
                  "
                  style={{
                    color:
                      "var(--user-title)",
                  }}
                >
                  {
                    buyer.name
                  }
                </h3>

                <p
                  className="
                    mt-0.5
                    flex
                    items-center
                    gap-1
                    truncate
                    text-[9px]
                  "
                  style={{
                    color:
                      "var(--user-text-muted)",
                  }}
                >
                  <Phone
                    size={10}
                  />

                  {
                    buyer.phone
                  }
                </p>
              </div>

              <InterestStatusBadge
                status={
                  currentInterest.status
                }
              />
            </div>

            {buyer.email && (
              <p
                className="
                  mt-1
                  truncate
                  text-[9px]
                "
                style={{
                  color:
                    "var(--user-text-muted)",
                }}
              >
                {
                  buyer.email
                }
              </p>
            )}
          </div>
        </div>

        <div
          className="
            border-t
            px-3
            py-2.5
          "
          style={{
            borderColor:
              "var(--user-divider)",
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
                    "var(--user-text-muted)",
                }}
              >
                {currentInterest.transaction
                  ? "Agreed Price"
                  : "Buyer Offer"}
              </p>

              <p
                className="
                  mt-0.5
                  text-sm
                  font-bold
                "
                style={{
                  color:
                    "var(--user-title)",
                }}
              >
                $
                {(
                  currentInterest
                    .transaction
                    ?.agreedPrice ??
                  currentInterest.offeredPrice
                ).toFixed(2)}
              </p>
            </div>

            <p
              className="
                text-[9px]
              "
              style={{
                color:
                  "var(--user-text-muted)",
              }}
            >
              {formatDate(
                currentInterest.createdAt,
              )}
            </p>
          </div>

          {isPending && (
            <div
              className="
                mt-3
                flex
                flex-wrap
                gap-1.5
              "
            >
              <InterestAction
                label="Accept Offer"
                icon={
                  <Check
                    size={12}
                  />
                }
                loading={
                  actionLoading ===
                  "accept"
                }
                onClick={
                  handleAccept
                }
              />

              <InterestAction
                label="Negotiate"
                icon={
                  <MessageSquareText
                    size={12}
                  />
                }
                loading={
                  actionLoading ===
                  "negotiate"
                }
                onClick={() =>
                  setNegotiateOpen(
                    true,
                  )
                }
              />

              <InterestAction
                label="Reject"
                icon={
                  <X
                    size={12}
                  />
                }
                loading={
                  actionLoading ===
                  "reject"
                }
                onClick={
                  handleReject
                }
              />
            </div>
          )}

          {isNegotiating && (
            <div
              className="
                mt-2
                space-y-2
              "
            >
              <p
                className="
                  text-[9px]
                  leading-4
                "
                style={{
                  color:
                    "var(--user-text-muted)",
                }}
              >
                Negotiation is in
                progress.
              </p>

              <InterestAction
                label="Continue Negotiation"
                icon={
                  <MessageSquareText
                    size={12}
                  />
                }
                loading={
                  actionLoading ===
                  "negotiate"
                }
                onClick={() =>
                  setNegotiateOpen(
                    true,
                  )
                }
              />
            </div>
          )}

          {isAccepted &&
            currentInterest.transaction && (
              <TransactionSummary
                status={
                  currentInterest
                    .transaction
                    .status
                }
                agreedPrice={
                  currentInterest
                    .transaction
                    .agreedPrice
                }
                commissionRate={
                  currentInterest
                    .transaction
                    .commissionRate
                }
                commissionAmount={
                  currentInterest
                    .transaction
                    .commissionAmount
                }
              />
            )}

          {isRejected && (
            <div
              className="
                mt-2
                rounded-lg
                border
                px-2.5
                py-2
              "
              style={{
                background:
                  "var(--user-surface-secondary)",

                borderColor:
                  "var(--user-divider)",
              }}
            >
              <p
                className="
                  text-[9px]
                  font-semibold
                "
                style={{
                  color:
                    "var(--user-title)",
                }}
              >
                Offer rejected
              </p>

              <p
                className="
                  mt-0.5
                  text-[9px]
                  leading-4
                "
                style={{
                  color:
                    "var(--user-text-muted)",
                }}
              >
                This buyer offer is no longer
                active.
              </p>
            </div>
          )}
        </div>
      </article>

<NegotiationDialog
  open={
    negotiateOpen
  }
  buyerName={
    buyer.name
  }
  currentOffer={
    currentInterest.offeredPrice
  }
  messages={
    currentInterest.messages
  }
  currentUserId={
    user?.id ??
    null
  }
  loading={
    actionLoading ===
    "negotiate"
  }
  onClose={() =>
    setNegotiateOpen(
      false,
    )
  }
  onAction={() =>
    setActionDialogOpen(
      true,
    )
  }
  onSubmit={
    handleNegotiate
  }
/>

{actionDialogOpen && (
  <FinalNegotiationActionDialog
    buyerName={
      buyer.name
    }
    loadingAction={
      actionLoading ===
      "accept"
        ? "accept"
        : actionLoading ===
            "reject"
          ? "reject"
          : null
    }
    onClose={() =>
      setActionDialogOpen(
        false,
      )
    }
    onAccept={
      handleAcceptNegotiation
    }
    onReject={
      handleCloseNegotiation
    }
  />
)}
    </>
  );
}

function TransactionSummary({
  status,
  agreedPrice,
  commissionRate,
  commissionAmount,
}: {
  status: AffiliateTransactionStatus;

  agreedPrice: number;

  commissionRate: number;

  commissionAmount: number;
}) {
  return (
    <div
      className="
        mt-3
        rounded-lg
        border
        px-2.5
        py-2.5
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
          grid
          grid-cols-3
          gap-2
        "
      >
        <TransactionMetric
          label="Agreed"
          value={`$${agreedPrice.toFixed(2)}`}
        />

        <TransactionMetric
          label="Rate"
          value={`${commissionRate.toFixed(2)}%`}
        />

        <TransactionMetric
          label="Commission"
          value={`$${commissionAmount.toFixed(2)}`}
        />
      </div>

      <div
        className="
          mt-2
          flex
          items-center
          justify-between
          gap-2
        "
      >
        <span
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.06em]
          "
          style={{
            color:
              "var(--user-text-muted)",
          }}
        >
          Transaction
        </span>

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
              "var(--user-card-bg)",

            color:
              "var(--user-text-muted)",

            borderColor:
              "var(--user-card-border)",
          }}
        >
          {formatTransactionStatus(
            status,
          )}
        </span>
      </div>
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
    <div className="min-w-0">
      <p
        className="
          truncate
          text-[8px]
          uppercase
          tracking-[0.05em]
        "
        style={{
          color:
            "var(--user-text-muted)",
        }}
      >
        {label}
      </p>

      <p
        className="
          mt-0.5
          truncate
          text-[10px]
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

function formatTransactionStatus(
  status: AffiliateTransactionStatus,
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

type InterestActionProps = {
  label: string;

  icon: React.ReactNode;

  onClick: () => void;

  loading?: boolean;
};

function InterestAction({
  label,
  icon,
  onClick,
  loading = false,
}: InterestActionProps) {
  return (
    <button
      type="button"
      disabled={
        loading
      }
      onClick={
        onClick
      }
      className="
        inline-flex
        h-7
        items-center
        gap-1.5
        rounded-md
        border
        px-2.5
        text-[9px]
        font-semibold
        transition
        hover:bg-[var(--user-surface-secondary)]
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
      style={{
        background:
          "var(--user-card-bg)",

        color:
          "var(--user-text-muted)",

        borderColor:
          "var(--user-card-border)",
      }}
    >
      {loading ? (
        <Loader2
          size={12}
          className="animate-spin"
        />
      ) : (
        icon
      )}

      {loading
        ? "Working..."
        : label}
    </button>
  );
}

function InterestStatusBadge({
  status,
}: {
  status:
    | "PENDING"
    | "NEGOTIATING"
    | "ACCEPTED"
    | "REJECTED";
}) {
  return (
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
          "var(--user-card-bg)",

        color:
          "var(--user-text-muted)",

        borderColor:
          "var(--user-card-border)",
      }}
    >
      {status}
    </span>
  );
}

type NegotiationDialogProps = {
  open: boolean;

  buyerName: string;

  currentOffer: number;

  messages: AffiliateInterest["messages"];

  currentUserId: string | null;

  loading: boolean;

  onClose: () => void;

  onAction: () => void;

  onSubmit: (
    message: string,
    offeredPrice: number | null,
  ) => void;
};

function NegotiationDialog({
  open,
  buyerName,
  currentOffer,
  messages,
  currentUserId,
  loading,
  onClose,
  onAction,
  onSubmit,
}: NegotiationDialogProps) {
  const [
    message,
    setMessage,
  ] = useState("");

  const [
    proposedPrice,
    setProposedPrice,
  ] = useState("");

  if (!open) {
    return null;
  }

  const hasMessages =
    messages.length > 0;

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const trimmedMessage =
      message.trim();

    if (!trimmedMessage) {
      toast.error(
        "Enter a negotiation message.",
      );

      return;
    }

    const parsedPrice =
      proposedPrice.trim()
        ? Number(
            proposedPrice,
          )
        : null;

    if (
      parsedPrice !== null &&
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

    onSubmit(
      trimmedMessage,
      parsedPrice,
    );
  }

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
        z-[150]
        flex
        items-center
        justify-center
        bg-black/45
        p-3
        backdrop-blur-sm
      "
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-label="Negotiate buyer offer"
        onSubmit={
          handleSubmit
        }
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
            "var(--user-card-bg)",

          borderColor:
            "var(--user-card-border)",
        }}
      >
        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >
          <div className="min-w-0">
            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.08em]
              "
              style={{
                color:
                  "var(--user-text-muted)",
              }}
            >
              Negotiation
            </p>

            <h2
              className="
                mt-0.5
                truncate
                text-sm
                font-semibold
              "
              style={{
                color:
                  "var(--user-title)",
              }}
            >
              {buyerName}
            </h2>
          </div>

          <button
            type="button"
            onClick={
              onClose
            }
            disabled={
              loading
            }
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
              hover:bg-[var(--user-surface-secondary)]
              disabled:opacity-50
            "
            style={{
              background:
                "var(--user-card-bg)",

              color:
                "var(--user-text-muted)",

              borderColor:
                "var(--user-card-border)",
            }}
            aria-label="Close"
          >
            <X
              size={14}
            />
          </button>
        </div>

        {!hasMessages && (
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
                "var(--user-surface-secondary)",

              borderColor:
                "var(--user-divider)",
            }}
          >
            <p
              className="
                text-[9px]
                font-semibold
              "
              style={{
                color:
                  "var(--user-title)",
              }}
            >
              A quicker negotiation may be
              possible offline.
            </p>

            <p
              className="
                mt-1
                text-[9px]
                leading-4
              "
              style={{
                color:
                  "var(--user-text-muted)",
              }}
            >
              You can continue negotiating
              here, but contact {buyerName}
              directly when possible. The
              buyer may not be online at the
              moment.
            </p>
          </div>
        )}

        {hasMessages && (
          <div
            className="
              mt-3
              max-h-52
              space-y-2
              overflow-y-auto
              rounded-lg
              border
              p-2.5
            "
            style={{
              background:
                "var(--user-surface-secondary)",

              borderColor:
                "var(--user-divider)",
            }}
          >
            {messages.map(
              (item) => {
                const isMine =
                  item.senderUserId ===
                  currentUserId;

                return (
                  <div
                    key={
                      item.id
                    }
                    className={`
                      flex
                      ${
                        isMine
                          ? "justify-end"
                          : "justify-start"
                      }
                    `}
                  >
                    <div
                      className="
                        max-w-[88%]
                        rounded-lg
                        border
                        px-2.5
                        py-2
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
                          justify-between
                          gap-3
                        "
                      >
                        <span
                          className="
                            text-[8px]
                            font-semibold
                          "
                          style={{
                            color:
                              "var(--user-text-muted)",
                          }}
                        >
                          {isMine
                            ? "You"
                            : buyerName}
                        </span>

                        <span
                          className="
                            text-[8px]
                          "
                          style={{
                            color:
                              "var(--user-text-muted)",
                          }}
                        >
                          {formatDateTime(
                            item.createdAt,
                          )}
                        </span>
                      </div>

                      <p
                        className="
                          mt-1
                          text-[10px]
                          leading-4
                        "
                        style={{
                          color:
                            "var(--user-title)",
                        }}
                      >
                        {
                          item.message
                        }
                      </p>

                      {item.offeredPrice !==
                        null && (
                        <p
                          className="
                            mt-1.5
                            text-[9px]
                            font-semibold
                          "
                          style={{
                            color:
                              "var(--user-text-muted)",
                          }}
                        >
                          Offered: $
                          {item.offeredPrice.toFixed(
                            2,
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                );
              },
            )}
          </div>
        )}

        <div
          className="
            mt-3
            space-y-2.5
          "
        >
          <div>
            <label
              htmlFor="affiliate-negotiation-message"
              className="
                mb-1
                block
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.06em]
              "
              style={{
                color:
                  "var(--user-text-muted)",
              }}
            >
              {hasMessages
                ? "Reply"
                : "Message"}
            </label>

            <textarea
              id="affiliate-negotiation-message"
              value={
                message
              }
              onChange={(
                event,
              ) =>
                setMessage(
                  event.target
                    .value,
                )
              }
              placeholder={
                hasMessages
                  ? "Write a reply..."
                  : "Write a professional message to the buyer..."
              }
              rows={
                hasMessages
                  ? 3
                  : 4
              }
              disabled={
                loading
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
                transition
                focus:border-[var(--primary)]
                disabled:opacity-60
              "
              style={{
                borderColor:
                  "var(--user-card-border)",

                color:
                  "var(--user-title)",
              }}
            />
          </div>

          <PriceField
            value={
              proposedPrice
            }
            setValue={
              setProposedPrice
            }
            placeholder={currentOffer.toFixed(
              2,
            )}
            loading={
              loading
            }
          />
        </div>

<div
  className="
    mt-4
    flex
    items-center
    justify-between
    gap-2
  "
>
  <button
    type="button"
    onClick={() =>
      onAction()
    }
    disabled={
      loading
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
      hover:bg-[var(--user-surface-secondary)]
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
    style={{
      background:
        "var(--user-card-bg)",

      color:
        "var(--user-text-muted)",

      borderColor:
        "var(--user-card-border)",
    }}
  >
    Take Action
  </button>

  <div
    className="
      flex
      items-center
      gap-2
    "
  >
    <button
      type="button"
      onClick={
        onClose
      }
      disabled={
        loading
      }
      className="
        h-8
        rounded-md
        border
        px-3
        text-[10px]
        font-semibold
        transition
        hover:bg-[var(--user-surface-secondary)]
        disabled:opacity-50
      "
      style={{
        background:
          "var(--user-card-bg)",

        color:
          "var(--user-text-muted)",

        borderColor:
          "var(--user-card-border)",
      }}
    >
      Close
    </button>

    <button
      type="submit"
      disabled={
        loading ||
        !message.trim()
      }
      className="
        inline-flex
        h-8
        items-center
        justify-center
        gap-1.5
        rounded-md
        border
        px-3
        text-[10px]
        font-semibold
        transition
        hover:bg-[var(--user-surface-secondary)]
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
      style={{
        background:
          "var(--user-card-bg)",

        color:
          "var(--user-text-muted)",

        borderColor:
          "var(--user-card-border)",
      }}
    >
      {loading ? (
        <>
          <Loader2
            size={12}
            className="animate-spin"
          />

          Sending...
        </>
      ) : hasMessages ? (
        "Reply"
      ) : (
        "Send Message"
      )}
    </button>
  </div>
</div>
      </form>
    </div>
  );
}

function FinalNegotiationActionDialog({
  buyerName,
  loadingAction,
  onClose,
  onAccept,
  onReject,
}: {
  buyerName: string;

  loadingAction:
    | "accept"
    | "reject"
    | null;

  onClose: () => void;

  onAccept: () => void;

  onReject: () => void;
}) {
  const loading =
    loadingAction !== null;
  return (
    <div
      role="presentation"
      className="
        fixed
        inset-0
        z-[180]
        flex
        items-center
        justify-center
        bg-black/50
        p-3
        backdrop-blur-sm
      "
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
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Negotiation action"
        className="
          w-full
          max-w-xs
          rounded-xl
          border
          p-4
          shadow-2xl
        "
        style={{
          background:
            "var(--user-card-bg)",

          borderColor:
            "var(--user-card-border)",
        }}
      >
        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
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
                  "var(--user-text-muted)",
              }}
            >
              Take Action
            </p>

            <h3
              className="
                mt-0.5
                text-sm
                font-semibold
              "
              style={{
                color:
                  "var(--user-title)",
              }}
            >
              {buyerName}
            </h3>
          </div>

          <button
            type="button"
            onClick={
              onClose
            }
            disabled={
              loading
            }
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-md
              border
              transition
              hover:bg-[var(--user-surface-secondary)]
              disabled:opacity-50
            "
            style={{
              background:
                "var(--user-card-bg)",

              color:
                "var(--user-text-muted)",

              borderColor:
                "var(--user-card-border)",
            }}
            aria-label="Close"
          >
            <X
              size={14}
            />
          </button>
        </div>

        <p
          className="
            mt-3
            text-[10px]
            leading-4
          "
          style={{
            color:
              "var(--user-text-muted)",
          }}
        >
          Choose how you want to conclude
          this negotiation.
        </p>

        <div
          className="
            mt-4
            space-y-2
          "
        >
          <button
            type="button"
            onClick={
              onAccept
            }
            disabled={
              loading
            }
            className="
              flex
              w-full
              items-center
              justify-between
              rounded-lg
              border
              px-3
              py-2.5
              text-left
              transition
              hover:bg-[var(--user-surface-secondary)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
            style={{
              background:
                "var(--user-card-bg)",

              borderColor:
                "var(--user-card-border)",

              color:
                "var(--user-title)",
            }}
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                "
              >
{loadingAction ===
"accept"
  ? "Accepting..."
  : "Accept negotiation"}
              </p>

              <p
                className="
                  mt-0.5
                  text-[8px]
                "
                style={{
                  color:
                    "var(--user-text-muted)",
                }}
              >
                Confirm that you have agreed to the buyer's offer and want to proceed.
              </p>
            </div>

{loadingAction ===
"accept" ? (
  <Loader2
    size={14}
    className="animate-spin"
  />
) : (
  <Check
    size={14}
  />
)}
          </button>

          <button
            type="button"
            onClick={
              onReject
            }
            disabled={
              loading
            }
            className="
              flex
              w-full
              items-center
              justify-between
              rounded-lg
              border
              px-3
              py-2.5
              text-left
              transition
              hover:bg-[var(--user-surface-secondary)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
            style={{
              background:
                "var(--user-card-bg)",

              borderColor:
                "var(--user-card-border)",

              color:
                "var(--user-title)",
            }}
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                "
              >
{loadingAction ===
"reject"
  ? "Closing..."
  : "Close negotiation"}
              </p>

              <p
                className="
                  mt-0.5
                  text-[8px]
                "
                style={{
                  color:
                    "var(--user-text-muted)",
                }}
              >
                End the negotiation without reaching an agreement with the buyer.

              </p>
            </div>

{loadingAction ===
"reject" ? (
  <Loader2
    size={14}
    className="animate-spin"
  />
) : (
  <X
    size={14}
  />
)}
          </button>
        </div>

        <button
          type="button"
          onClick={
            onClose
          }
          disabled={
            loading
          }
          className="
            mt-3
            h-8
            w-full
            rounded-md
            border
            text-[10px]
            font-semibold
            transition
            hover:bg-[var(--user-surface-secondary)]
            disabled:opacity-50
          "
          style={{
            background:
              "var(--user-card-bg)",

            color:
              "var(--user-text-muted)",

            borderColor:
              "var(--user-card-border)",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function PriceField({
  value,
  setValue,
  placeholder,
  loading,
}: {
  value: string;

  setValue: (
    value: string,
  ) => void;

  placeholder: string;

  loading: boolean;
}) {
  return (
    <div>
      <label
        htmlFor="affiliate-negotiation-price"
        className="
          mb-1
          block
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.06em]
        "
        style={{
          color:
            "var(--user-text-muted)",
        }}
      >
        Proposed Price
        <span className="ml-1 normal-case font-normal">
          Optional
        </span>
      </label>

      <div
        className="
          flex
          h-8
          items-center
          rounded-md
          border
          px-2.5
        "
        style={{
          borderColor:
            "var(--user-card-border)",

          background:
            "var(--user-card-bg)",
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
              "var(--user-text-muted)",
          }}
        >
          $
        </span>

        <input
          id="affiliate-negotiation-price"
          type="number"
          min="0.01"
          step="0.01"
          value={
            value
          }
          onChange={(
            event,
          ) =>
            setValue(
              event.target
                .value,
            )
          }
          placeholder={
            placeholder
          }
          disabled={
            loading
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
              "var(--user-title)",
          }}
        />
      </div>
    </div>
  );
}

function formatDate(
  value: string,
) {
  return new Date(
    value,
  ).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
    },
  );
}

function formatDateTime(
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