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
        <div
          className="
            flex
            min-w-0
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
                "var(--user-surface-secondary)",

              color:
                "var(--user-text-muted)",
            }}
          >
            <MessageCircle
              size={14}
            />
          </div>

          <div className="min-w-0">
            <h3
              className="
                truncate
                text-sm
                font-semibold
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
                text-[9px]
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
            px-2
            py-1
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
          {interests.length}
        </span>
      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-2.5
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