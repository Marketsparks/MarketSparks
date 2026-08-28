"use client";

import { useEffect, useState } from "react";

import {
  getKycSubmission,
  reviewKyc,
} from "./kyc.service";

import type {
  KycRecord,
} from "@/components/kyc/kyc.types";

import { getCloudinaryImageUrl } from "@/lib/cloudinary/url";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  open: boolean;

  submissionId: string | null;

  onClose: () => void;

  onReviewed: () => void;
};

export default function KycReviewModal({
  open,
  submissionId,
  onClose,
  onReviewed,
}: Props) {
  const [record, setRecord] =
    useState<KycRecord | null>(
      null
    );

  const [loading, setLoading] =
    useState(false);

const [
  approveLoading,
  setApproveLoading,
] = useState(false);

const [
  rejectLoading,
  setRejectLoading,
] = useState(false);

const [
  rejectModalOpen,
  setRejectModalOpen,
] = useState(false);

  const [
    rejectionReason,
    setRejectionReason,
  ] = useState("");

const isApproved =
  record?.status ===
  "APPROVED";

useEffect(() => {
if (!open || !submissionId) {
  return;
}

const id = submissionId;

let cancelled = false;

async function load() {

    try {
setLoading(true);
const data =
  await getKycSubmission(id);

      if (cancelled) {
        return;
      }

      setRecord(data);

      setRejectionReason(
        data.rejectionReason ?? ""
      );
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  }

  load();

  return () => {
    cancelled = true;
  };
}, [open, submissionId]);

useEffect(() => {
  if (!open) {
    setRecord(null);
    setRejectionReason("");
  }
}, [open]);

async function approve() {
  if (!submissionId) {
    return;
  }

  setApproveLoading(true);

  try {
    await reviewKyc(
      submissionId,
      {
        action: "approve",
      }
    );

    toast.success(
      "KYC approved successfully."
    );

    onReviewed();

    onClose();
  } catch (error) {
    console.error(error);

    toast.error(
      error instanceof Error
        ? error.message
        : "Unable to approve KYC."
    );
  } finally {
    setApproveLoading(false);
  }
}

async function reject() {
  if (!submissionId) {
    return;
  }

  if (!rejectionReason.trim()) {
    toast.error(
      "Please provide a rejection reason."
    );

    return;
  }

  setRejectLoading(true);

  try {
    await reviewKyc(
      submissionId,
      {
        action: "reject",
        rejectionReason,
      }
    );

    toast.success(
      "KYC rejected successfully."
    );

setRejectModalOpen(false);

setRejectionReason("");

onReviewed();

onClose();
  } catch (error) {
    console.error(error);

    toast.error(
      error instanceof Error
        ? error.message
        : "Unable to reject KYC."
    );
  } finally {
    setRejectLoading(false);
  }
}

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-[var(--admin-modal-overlay)]
        p-4
      "
    >
      <div
        className="
          max-h-[90vh]
          w-full
          max-w-5xl
          overflow-y-auto
          rounded-[var(--admin-modal-radius)]
          border
          border-[var(--admin-modal-border)]
          bg-[var(--admin-modal-bg)]
          shadow-[var(--admin-modal-shadow)]
        "
      >
        <div
          className="
            border-b
            border-[var(--admin-card-border)]
            bg-[var(--admin-modal-header-bg)]
            p-6
          "
        >
          <h2
            className="
              text-xl
              font-semibold
              text-[var(--admin-title)]
            "
          >
            Review KYC
          </h2>
        </div>

        {loading || !record ? (
          <div
            className="
              p-8
              text-center
              text-[var(--admin-text)]
            "
          >
            Loading...
          </div>
        ) : (
          <>
            <div className="space-y-8 p-6">
              <section className="grid gap-4 md:grid-cols-2">
                <Info
                  label="First Name"
                  value={
                    record.firstName
                  }
                />

                <Info
                  label="Last Name"
                  value={
                    record.lastName
                  }
                />

                <Info
                  label="Date of Birth"
                  value={
                    record.dateOfBirth
                  }
                />

                <Info
                  label="Nationality"
                  value={
                    record.nationality
                  }
                />

                <Info
                  label="Address"
                  value={
                    record.residentialAddress
                  }
                />

                <Info
                  label="Country"
                  value={
                    record.country
                  }
                />
              </section>

              <section className="grid gap-6 md:grid-cols-3">
                <ImageCard
                  title="Front Document"
                  image={
                    record.frontDocumentKey
                  }
                />

                {record.backDocumentKey && (
                  <ImageCard
                    title="Back Document"
                    image={
                      record.backDocumentKey
                    }
                  />
                )}

                <ImageCard
                  title="Selfie"
                  image={
                    record.selfieKey
                  }
                />
              </section>


            </div>

            <div
              className="
                flex
                flex-col-reverse
                gap-3
                border-t
                border-[var(--admin-card-border)]
                bg-[var(--admin-modal-footer-bg)]
                p-6
                sm:flex-row
                sm:justify-end
              "
            >
<button
  type="button"
  onClick={onClose}
  disabled={
    approveLoading ||
    rejectLoading
  }
  className="
    rounded-xl
    border
    border-[var(--admin-button-secondary-border)]
    bg-[var(--admin-button-secondary-bg)]
    px-5
    py-3
    text-[var(--admin-button-secondary-text)]
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  Cancel
</button>

              <button
                type="button"
disabled={
  approveLoading ||
  rejectLoading ||
  isApproved
}
onClick={() =>
  setRejectModalOpen(true)
}
                className="
                  rounded-xl
                  bg-[var(--admin-button-danger-bg)]
                  px-5
                  py-3
                  text-[var(--admin-button-danger-text)]
                "
              >
<>
  {rejectLoading && (
    <Loader2
      className="
        mr-2
        inline-block
        h-4
        w-4
        animate-spin
      "
    />
  )}

  {rejectLoading
    ? "Rejecting..."
    : "Reject"}
</>
              </button>

              <button
                type="button"
disabled={
  approveLoading ||
  rejectLoading ||
  isApproved
}
                onClick={
                  approve
                }
className="
  rounded-xl
  bg-purple-600
  px-5
  py-3
  text-white
  transition-colors
  duration-200
  hover:bg-purple-700
  disabled:cursor-not-allowed
  disabled:opacity-50
"
              >
<>
  {approveLoading && (
    <Loader2
      className="
        mr-2
        inline-block
        h-4
        w-4
        animate-spin
      "
    />
  )}

  {approveLoading
    ? "Approving..."
    : "Approve"}
</>
              </button>
            </div>
          </>
        )}
      </div>

      {rejectModalOpen && (
        <div
          className="
            fixed
            inset-0
            z-[60]
            flex
            items-center
            justify-center
            bg-black/50
            p-4
          "
        >
          <div
            className="
              w-full
              max-w-lg
              rounded-[var(--admin-modal-radius)]
              border
              border-[var(--admin-modal-border)]
              bg-[var(--admin-modal-bg)]
              p-6
              shadow-[var(--admin-modal-shadow)]
            "
          >
            <h3
              className="
                text-lg
                font-semibold
                text-[var(--admin-title)]
              "
            >
              Reject KYC
            </h3>

            <p
              className="
                mt-2
                text-sm
                text-[var(--admin-text)]
              "
            >
              Please provide a reason for rejecting this submission.
            </p>

            <textarea
              value={rejectionReason}
              onChange={(event) =>
                setRejectionReason(
                  event.target.value
                )
              }
              rows={5}
              className="
                mt-5
                w-full
                rounded-[var(--admin-input-radius)]
                border
                border-[var(--admin-input-border)]
                bg-[var(--admin-input-bg)]
                p-4
                text-[var(--admin-input-text)]
                outline-none
              "
            />

            <div
              className="
                mt-6
                flex
                justify-end
                gap-3
              "
            >
<button
  type="button"
  onClick={() => {
    setRejectModalOpen(false);
    setRejectionReason("");
  }}
  disabled={rejectLoading}
  className="
    rounded-xl
    border
    border-[var(--admin-button-secondary-border)]
    bg-[var(--admin-button-secondary-bg)]
    px-5
    py-3
    text-[var(--admin-button-secondary-text)]
  "
>
  Cancel
</button>

              <button
                type="button"
                onClick={reject}
disabled={
  rejectLoading ||
  isApproved
}
                className="
                  rounded-xl
                  bg-[var(--admin-button-danger-bg)]
                  px-5
                  py-3
                  text-[var(--admin-button-danger-text)]
                "
              >
                {rejectLoading ? (
                  <>
                    <Loader2
                      className="
                        mr-2
                        inline-block
                        h-4
                        w-4
                        animate-spin
                      "
                    />
                    Rejecting...
                  </>
                ) : (
                  "Reject KYC"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p
        className="
          text-sm
          text-[var(--admin-muted)]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-[var(--admin-text)]
        "
      >
        {value}
      </p>
    </div>
  );
}

function ImageCard({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <div>
      <p
        className="
          mb-3
          text-sm
          text-[var(--admin-muted)]
        "
      >
        {title}
      </p>

<Image
  src={
    getCloudinaryImageUrl(image) ??
    ""
  }
  alt={title}
  width={500}
  height={500}
  className="
    aspect-square
    w-full
    rounded-xl
    object-cover
  "
/>
    </div>
  );
}