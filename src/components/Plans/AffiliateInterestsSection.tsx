"use client";

import {
  MessageCircle,
} from "lucide-react";

import type {
  AffiliateInterest,
} from "@/types/affiliate.types";

import AffiliateInterestCard from "./AffiliateInterestCard";

type AffiliateInterestsSectionProps = {
  interests: AffiliateInterest[];

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

export default function AffiliateInterestsSection({
  interests,
  onAccept,
  onReject,
  onNegotiate,
}: AffiliateInterestsSectionProps) {
  if (
    interests.length ===
    0
  ) {
    return null;
  }

  return (
    <section
      className="
        space-y-2.5
        sm:space-y-3
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-2.5
          sm:gap-3
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-1.5
            sm:gap-2
          "
        >
          <div
            className="
              flex
              h-6
              w-6
              shrink-0
              items-center
              justify-center
              rounded-md
              sm:h-7
              sm:w-7
              sm:rounded-lg
            "
            style={{
              background:
                "var(--user-surface-secondary)",

              color:
                "var(--user-text-muted)",
            }}
          >
            <MessageCircle
              size={13}
              className="sm:hidden"
            />

            <MessageCircle
              size={14}
              className="hidden sm:block"
            />
          </div>

          <div className="min-w-0">
            <h3
              className="
                truncate
                text-[12px]
                font-semibold
                sm:text-sm
              "
              style={{
                color:
                  "var(--user-title)",
              }}
            >
              Interested Buyers
            </h3>

            <p
              className="
                mt-0.5
                truncate
                text-[8px]
                sm:text-[9px]
              "
              style={{
                color:
                  "var(--user-text-muted)",
              }}
            >
              Review offers from interested buyers.
            </p>
          </div>
        </div>

        <span
          className="
            shrink-0
            rounded-full
            border
            px-1.5
            py-0.5
            text-[8px]
            font-semibold
            sm:px-2
            sm:py-1
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
          {interests.length}
        </span>
      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-2
          sm:gap-2.5
          xl:grid-cols-2
        "
      >
        {interests.map(
          (interest) => (
            <AffiliateInterestCard
              key={
                interest.id
              }
              interest={
                interest
              }
              onAccept={
                onAccept
              }
              onReject={
                onReject
              }
              onNegotiate={
                onNegotiate
              }
            />
          ),
        )}
      </div>
    </section>
  );
}