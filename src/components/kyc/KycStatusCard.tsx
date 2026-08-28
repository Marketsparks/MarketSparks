"use client";

import {
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import type {
  KycStatus,
} from "./kyc.types";

type KycStatusCardProps = {
  status: KycStatus;

  submittedAt: string;

  reviewedAt?: string | null;

  rejectionReason?: string | null;
};

export default function KycStatusCard({
  status,
  submittedAt,
  reviewedAt,
  rejectionReason,
}: KycStatusCardProps) {
const config = {
  NOT_SUBMITTED: {
    icon: Clock3,

    title: "Verification Required",

    description:
      "You have not submitted your identity verification yet. Complete your KYC to unlock all account features.",

    badge:
      "bg-[var(--user-badge-warning-bg)] text-[var(--user-badge-warning-text)]",
  },

  PENDING: {
    icon: Clock3,

    title: "Verification Pending",

    description:
      "Your KYC documents have been submitted successfully. Our compliance team is currently reviewing them.",

    badge:
      "bg-[var(--user-badge-warning-bg)] text-[var(--user-badge-warning-text)]",
  },

  APPROVED: {
    icon: CheckCircle2,

    title: "Verification Approved",

    description:
      "Your identity has been verified successfully. Your account is now fully verified.",

    badge:
      "bg-[var(--user-badge-success-bg)] text-[var(--user-badge-success-text)]",
  },

  REJECTED: {
    icon: XCircle,

    title: "Verification Rejected",

    description:
      "Unfortunately, your verification could not be approved. Please review the reason below and submit a new verification.",

    badge:
      "bg-[var(--user-badge-danger-bg)] text-[var(--user-badge-danger-text)]",
  },
}[status];

  const Icon = config.icon;

  return (
    <section
      className="
        rounded-[var(--user-radius-lg)]
        border
        border-[var(--user-card-border)]
        bg-[var(--user-surface)]
        p-6
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5
          sm:flex-row
          sm:items-start
        "
      >
        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            ${config.badge}
          `}
        >
          <Icon size={28} />
        </div>

        <div className="flex-1">
          <h2
            className="
              text-xl
              font-bold
              text-[var(--user-title)]
            "
          >
            {config.title}
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-[var(--user-text-muted)]
            "
          >
            {config.description}
          </p>

          <div
            className="
              mt-6
              space-y-2
              text-sm
              text-[var(--user-text)]
            "
          >
            <div>
              <span className="font-medium">
                Submitted:
              </span>{" "}
              {submittedAt}
            </div>

            {reviewedAt && (
              <div>
                <span className="font-medium">
                  Reviewed:
                </span>{" "}
                {reviewedAt}
              </div>
            )}

            {status ===
              "REJECTED" &&
              rejectionReason && (
                <div
                  className="
                    mt-4
                    rounded-[var(--user-radius-md)]
                    border
                    border-[var(--user-danger-border)]
                    bg-[var(--user-danger-bg)]
                    p-4
                  "
                >
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-[var(--user-danger-text)]
                    "
                  >
                    Rejection Reason
                  </p>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-[var(--user-text)]
                    "
                  >
                    {rejectionReason}
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}