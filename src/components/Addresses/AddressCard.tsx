"use client";

import {
  Check,
  Edit3,
  MapPin,
  MoreVertical,
  Star,
  Trash2,
} from "lucide-react";

import type {
  Address,
} from "./addresses.types";

type AddressCardProps = {
  address: Address;

  onEdit: (
    address: Address,
  ) => void;

  onDelete: (
    address: Address,
  ) => void;

  onSetPrimary: (
    address: Address,
  ) => void;

  updating?: boolean;
};

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetPrimary,
  updating = false,
}: AddressCardProps) {
  return (
    <article
      className="
        relative
        rounded-xl
        border
        border-[var(--user-card-border)]
        bg-[var(--user-card-bg)]
        p-3
        shadow-[var(--user-card-shadow)]
        transition-all
        duration-200
        hover:border-[var(--primary)]/30
      "
    >
      <div
        className="
          flex
          items-start
          gap-3
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
            rounded-lg
            bg-[var(--user-stat-bg)]
            text-[var(--primary)]
          "
        >
          <MapPin
            size={15}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <h3
              className="
                truncate
                text-sm
                font-semibold
                text-[var(--user-title)]
              "
            >
              {address.fullName}
            </h3>

            {address.isPrimary && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-1
                  rounded-full
                  border
                  border-[var(--user-badge-success-border)]
                  bg-[var(--user-badge-success-bg)]
                  px-2
                  py-0.5
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.06em]
                  text-[var(--user-badge-success-text)]
                "
              >
                <Star
                  size={9}
                  fill="currentColor"
                />

                Primary
              </span>
            )}
          </div>

          <div
            className="
              mt-2
              space-y-0.5
              text-xs
              leading-5
              text-[var(--user-text-muted)]
            "
          >
            <p className="break-words">
              {address.addressLine1}
            </p>

            {address.addressLine2 && (
              <p className="break-words">
                {address.addressLine2}
              </p>
            )}

            <p>
              {[
                address.city,
                address.state,
                address.postalCode,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>

            <p>
              {address.country}
            </p>

            <p className="pt-1">
              {address.phoneNumber}

              {address.alternatePhoneNumber && (
                <>
                  {" "}
                  •{" "}
                  {
                    address.alternatePhoneNumber
                  }
                </>
              )}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <div
            className="
              flex
              items-center
              gap-1
            "
          >
            {!address.isPrimary && (
              <button
                type="button"
                disabled={updating}
                onClick={() =>
                  onSetPrimary(
                    address,
                  )
                }
                aria-label="Set as primary address"
                title="Set as primary"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-[var(--user-text-muted)]
                  transition
                  hover:bg-[var(--user-stat-bg)]
                  hover:text-[var(--primary)]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <Check
                  size={15}
                />
              </button>
            )}

            <button
              type="button"
              disabled={updating}
              onClick={() =>
                onEdit(address)
              }
              aria-label="Edit address"
              title="Edit address"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                text-[var(--user-text-muted)]
                transition
                hover:bg-[var(--user-stat-bg)]
                hover:text-[var(--user-title)]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Edit3
                size={15}
              />
            </button>

            <button
              type="button"
              disabled={updating}
              onClick={() =>
                onDelete(address)
              }
              aria-label="Delete address"
              title="Delete address"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                text-[var(--user-text-muted)]
                transition
                hover:bg-[var(--user-stat-bg)]
                hover:text-[var(--user-badge-danger-text)]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Trash2
                size={15}
              />
            </button>

            <button
              type="button"
              disabled
              aria-hidden="true"
              tabIndex={-1}
              className="
                hidden
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                text-[var(--user-text-muted)]
              "
            >
              <MoreVertical
                size={15}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}