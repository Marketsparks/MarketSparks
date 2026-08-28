"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import {
  Loader2,
  UserRound,
  X,
} from "lucide-react";

import {
  toast,
} from "sonner";

import {
  createAffiliateInterest,
  type CreateAffiliateInterestInput,
} from "@/services/admin-affiliate-interest.client";

import {
  getAffiliateTestBuyers,
} from "@/components/admin/affiliate-test-buyers/test-buyer.service";

import type {
  AffiliateTestBuyer,
} from "@/components/admin/affiliate-test-buyers/types";

import type {
  AdminAffiliateInterest,
  AdminAffiliateListing,
} from "@/types/admin-affiliate.types";

type AffiliateCreateInterestDialogProps = {
  listing:
    | AdminAffiliateListing
    | null;

  open: boolean;

  onClose: () => void;

  onCreated?: (
    interest: AdminAffiliateInterest,
  ) => void;
};

export default function AffiliateCreateInterestDialog({
  listing,
  open,
  onClose,
  onCreated,
}: AffiliateCreateInterestDialogProps) {
  const [
    buyers,
    setBuyers,
  ] = useState<
    AffiliateTestBuyer[]
  >([]);

  const [
    selectedBuyerId,
    setSelectedBuyerId,
  ] = useState("");

  const [
    offeredPrice,
    setOfferedPrice,
  ] = useState("");

  const [
    loadingBuyers,
    setLoadingBuyers,
  ] = useState(false);

  const [
    saving,
    setSaving,
  ] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    setSelectedBuyerId("");
    setOfferedPrice("");

    async function loadBuyers() {
      try {
        setLoadingBuyers(
          true,
        );

        const response =
          await getAffiliateTestBuyers();

        setBuyers(
          response.data,
        );
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to load test buyers.",
        );
      } finally {
        setLoadingBuyers(
          false,
        );
      }
    }

    void loadBuyers();
  }, [open]);

  if (!open || !listing) {
    return null;
  }

const currentListing =
  listing;

  const selectedBuyer =
    buyers.find(
      (buyer) =>
        buyer.id ===
        selectedBuyerId,
    ) ?? null;

  const numericPrice =
    Number(
      offeredPrice,
    );

  const canSubmit =
    Boolean(
      selectedBuyerId &&
        offeredPrice.trim() &&
        Number.isFinite(
          numericPrice,
        ) &&
        numericPrice > 0 &&
        !saving,
    );

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    const input: CreateAffiliateInterestInput = {
affiliateListingId:
  currentListing.id,

      testBuyerId:
        selectedBuyerId,

      offeredPrice:
        numericPrice,
    };

    try {
      setSaving(true);

      const interest =
        await createAffiliateInterest(
          input,
        );

      onCreated?.(
        interest,
      );

      toast.success(
        "Buyer interest created successfully.",
      );

      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to create buyer interest.",
      );
    } finally {
      setSaving(false);
    }
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
        z-[130]
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
        aria-labelledby="create-affiliate-interest-title"
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
            "var(--surface)",

          borderColor:
            "var(--border)",
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
                  "var(--foreground-muted)",
              }}
            >
              Buyer Interest
            </p>

            <h2
              id="create-affiliate-interest-title"
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
              Create Interest
            </h2>

            <p
              className="
                mt-1
                line-clamp-2
                text-[10px]
                leading-4
              "
              style={{
                color:
                  "var(--foreground-muted)",
              }}
            >
              {listing.product.name}
            </p>
          </div>

          <button
            type="button"
            onClick={
              onClose
            }
            disabled={
              saving
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
              hover:bg-[var(--surface-hover)]
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
            aria-label="Close"
          >
            <X
              size={14}
            />
          </button>
        </div>

        <div
          className="
            mt-4
            space-y-3
          "
        >
          <div>
            <label
              htmlFor="affiliate-test-buyer"
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
                  "var(--foreground-muted)",
              }}
            >
              Test Buyer
            </label>

            <select
              id="affiliate-test-buyer"
              value={
                selectedBuyerId
              }
              onChange={(
                event,
              ) =>
                setSelectedBuyerId(
                  event.target
                    .value,
                )
              }
              disabled={
                loadingBuyers ||
                saving
              }
              className="
                h-9
                w-full
                rounded-md
                border
                bg-transparent
                px-2.5
                text-[10px]
                outline-none
                transition
                focus:border-[var(--primary)]
              "
              style={{
                borderColor:
                  "var(--border)",

                color:
                  "var(--foreground)",
              }}
            >
              <option
                value=""
              >
                {loadingBuyers
                  ? "Loading buyers..."
                  : "Select a test buyer"}
              </option>

              {buyers.map(
                (buyer) => (
                  <option
                    key={
                      buyer.id
                    }
                    value={
                      buyer.id
                    }
                  >
                    {
                      buyer.name
                    }
                    {" • "}
                    {
                      buyer.phone
                    }
                  </option>
                ),
              )}
            </select>
          </div>

          {selectedBuyer && (
            <div
              className="
                flex
                items-center
                gap-2.5
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
              <BuyerAvatar
                buyer={
                  selectedBuyer
                }
              />

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
                    selectedBuyer.name
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
                    selectedBuyer.phone
                  }

                  {selectedBuyer.email
                    ? ` • ${selectedBuyer.email}`
                    : ""}
                </p>
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="affiliate-offered-price"
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
                  "var(--foreground-muted)",
              }}
            >
              Offered Price
            </label>

            <div
              className="
                flex
                h-9
                items-center
                rounded-md
                border
                px-2.5
              "
              style={{
                borderColor:
                  "var(--border)",

                background:
                  "var(--surface)",
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
                id="affiliate-offered-price"
                type="number"
                min="0.01"
                step="0.01"
                value={
                  offeredPrice
                }
                onChange={(
                  event,
                ) =>
                  setOfferedPrice(
                    event.target
                      .value,
                  )
                }
                placeholder="0.00"
                disabled={
                  saving
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

            <p
              className="
                mt-1
                text-[9px]
              "
              style={{
                color:
                  "var(--foreground-muted)",
              }}
            >
              Store price: $
              {listing.product.price.toFixed(
                2,
              )}
            </p>
          </div>
        </div>

        <div
          className="
            mt-4
            flex
            justify-end
            gap-2
          "
        >
          <button
            type="button"
            onClick={
              onClose
            }
            disabled={
              saving
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
              background:
                "var(--surface)",

              color:
                "var(--foreground-muted)",

              borderColor:
                "var(--border)",
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={
              !canSubmit
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
            {saving ? (
              <>
                <Loader2
                  size={12}
                  className="animate-spin"
                />

                Creating...
              </>
            ) : (
              "Create Interest"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function BuyerAvatar({
  buyer,
}: {
  buyer: AffiliateTestBuyer;
}) {
  const imageUrl =
    buyer.imageKey
      ? `/api/image/${buyer.imageKey}`
      : null;

  return (
    <div
      className="
        relative
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
      {imageUrl ? (
        <Image
          src={
            imageUrl
          }
          alt={
            buyer.name
          }
          fill
          sizes="32px"
          className="object-cover"
        />
      ) : (
        <UserRound
          size={14}
          className="text-[var(--foreground-muted)]"
        />
      )}
    </div>
  );
}